/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-11T12:16:28+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-20T16:34:49+08:00
* @License: The MIT License (MIT)
*/


import React from 'react';
import Antd, {
  Modal,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
} from 'antd';
import OauthEditModel from '../models/OauthEdit';
import FormValidate from '../mixins/FormValidate';
import EditModal from '../mixins/EditModal';

const noop = () => {};

export default React.createClass({
  propTypes: {
    id: React.PropTypes.number,
    visible: React.PropTypes.bool,
    onOk: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  },

  mixins: [
    FormValidate, EditModal,
  ],

  getDefaultProps() {
    return {
      id: 0,
      visible: false,
      onOk: noop,
      onCancel: noop,
    };
  },

  getInitialState() {
    this.model = new OauthEditModel({ id: this.props.id });

    return {
      formData: this.model.toJSON(),
      formErrors: {},
      confirmLoading: false,
    };
  },

  componentWillMount() {
    if (this.props.id) {
      this.model.fetch().done(() => {
        this.setState({ formData: this.model.toJSON() });
      }).fail((msg) => {
        Antd.message.error(msg, 3);
      });
    }
  },

  render() {
    const formData = this.state.formData;
    const formErrors = this.state.formErrors;
    const errorStatus = (field) => formErrors[field] ? 'error' : '';
    const help = (field) => formErrors[field];
    const switchStyle = {
      marginLeft: 15,
    };

    return (
      <Modal title={this.props.id ? '编辑' : '新建'}
        visible={this.props.visible}
        confirmLoading={this.state.confirmLoading}
        onOk={this.handleEditModalOk}
        onCancel={this.handleEditModalCancel}
      >
        <Form>
          <Form.Item label="name: " validateStatus={errorStatus('name')} help={help('username')}>
            <Input
              value={formData.name}
              placeholder="填写字母、下划线、数字"
              onChange={this.setValue.bind(this, 'name')}
            />
          </Form.Item>
          <Form.Item label="secret: " validateStatus={errorStatus('secret')} help={help('secret')}>
            <Input
              disabled
              value={formData.secret}
              onChange={this.setValue.bind(this, 'secret')}
            />
          </Form.Item>
          <Form.Item label="identify: "
            validateStatus={errorStatus('secret')}
            help={help('secret')}
          >
            <Input
              disabled
              value={formData.identify}
              onChange={this.setValue.bind(this, 'identify')}
            />
          </Form.Item>
              <Form.Item
                label="domain: "
                validateStatus={errorStatus('domain')}
                help={help('domain')}
              >
                <Input value={formData.domain}
                  onChange={this.setValue.bind(this, 'domain')}
                />
              </Form.Item>
            <Row>
              <Col span="11">
                <Form.Item
                  label="callback: "
                  validateStatus={errorStatus('callback')}
                  help={help('callback')}
                >
                  <Input
                    value={formData.callback}
                    onChange={this.setValue.bind(this, 'callback')}
                  />
                </Form.Item>
              </Col>
              <Col span="12" offset="1">
                <Form.Item
                  label="callback_debug: "
                  validateStatus={errorStatus('callback_debug')}
                  help={help('callback_debug')}
                >
                  <Input
                    value={formData.callback_debug}
                    onChange={this.setValue.bind(this, 'callback_debug')}
                  />
                </Form.Item>
              </Col>
            </Row>
          <Form.Item label="desc: " validateStatus={errorStatus('desc')} help={help('desc')}>
            <Input
              value={formData.desc}
              onChange={this.setValue.bind(this, 'desc')}
            />
          </Form.Item>
          <Row>
            <Col span="11">
              <Form.Item
                validateStatus={errorStatus('is_admin')} help={help('is_admin')}
              >
                    <Checkbox
                      checked={+formData.is_admin}
                      onChange={this.setValue.bind(this, 'is_admin')}
                    /> assign admin permission
              </Form.Item>
            </Col>
            <Col span="12" offset="1">
              <Form.Item
                validateStatus={errorStatus('is_received')} help={help('is_received')}
              >
                    <Checkbox
                      checked={+formData.is_received}
                      onChange={this.setValue.bind(this, 'is_received')}
                    /> receive event
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  },
});
