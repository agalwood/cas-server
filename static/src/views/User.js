/**
* @Author: BingWu Yang <detailyang>
* @Date:   2016-03-14T10:30:11+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-03-14T17:00:13+08:00
* @License: The MIT License (MIT)
*/


import _ from 'underscore';
import React from 'react';
import Antd, { Table, Button, Input, Icon, Popconfirm } from 'antd';

import UserEditModal from '../components/UserEditModal';
import ModelMixin from '../mixins/model';
import UserModel from '../models/User';


const InputGroup = Input.Group;

export default React.createClass({

  mixins: [ModelMixin],

  getInitialState() {
    this.model = new UserModel();
    return _.extend({
      editModalVisible: false,
      editModalId: 0,
    }, this.model.toJSON());
  },

  handleCreateClick() {
    this.setState({ editModalVisible: true, editModalId: 0 });
  },

  handleEditClick(record) {
    this.setState({ editModalVisible: true, editModalId: record.id });
  },

  handleResetClick(record) {
    this.model.reset(record.id).done(() => {
      Antd.message.success('重置成功');
    }).fail(() => {
      Antd.message.error('重置失败');
    });
  },

  handleDeleteClick(record) {
    this.model.delete(record.id).done(() => {
      Antd.message.success('删除成功');
      this.model.fetch();
    }).fail(() => {
      Antd.message.error('删除失败');
    });
  },

  handleKeywordChange(e) {
    const keyword = e.target.value;
    this.setState({ keyword });
  },

  handleKeywordKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSearchClick();
    }
  },

  handleSearchClick() {
    this.setState({ loading: true });
    this.model.set({
      status: this.state.status,
      field: this.state.field,
      keyword: this.state.keyword,
      page: 1,
    }).fetch();
  },

  handleTableChange(pagination, filters) {
    this.setState({ loading: true });
    this.model.set({
      page: pagination.current,
      is_delete: filters.is_delete,
      keyword: this.state.keyword || '',
    }).fetch();
  },

  renderTable() {
    const _this = this;
    const model = this.model;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '状态',
        dataIndex: 'is_delete',
        key: 'is_delete',
        filters: [
          {
            text: '在职',
            value: '0',
          }, {
            text: '离职',
            value: '1',
          },
        ],
        render(value) {
          return (
            <div>
              {value === false
                ? <span className="green-point" style={{ marginRight: 4 }}>
              </span>
                : <span className="black-point" style={{ marginRight: 4 }}>
                </span>}
              {value === false
                ? '在职'
                : '离职'}
            </div>
          );
        },
      }, {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      }, {
        title: '真实姓名',
        dataIndex: 'realname',
        key: 'realname',
      }, {
        title: '花名',
        dataIndex: 'aliasname',
        key: 'aliasname',
      }, {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
      }, {
        title: '手机',
        dataIndex: 'mobile',
        key: 'mobile',
      }, {
        title: '操作',
        dataIndex: 'x',
        key: 'x',
        className: 'text-rigth',
        render(value, record) {
          return (
            <div>
              <Popconfirm
                placement="left"
                title="确认重置？"
                onConfirm={_this.handleResetClick.bind(_this, record)}
              >
                <Button type="ghost" size="small">重置</Button>
              </Popconfirm>
              <Button type="ghost" size="small"
                onClick={_this.handleEditClick.bind(_this, record)}
              >
                编辑
              </Button>
              <Popconfirm
                placement="left"
                title="确认删除？"
                onConfirm={_this.handleDeleteClick.bind(_this, record)}
              >
                <Button type="ghost" size="small">删除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    const pagination = {
      total: model.get('total'),
      current: model.get('page'),
      pageSize: model.get('per_page'),
      showTotal: (total) => `共 ${total} 条`,
    };
    return (
            <Table
              dataSource={this.state.value}
              loading={this.state.loading}
              columns={columns}
              pagination={pagination}
              onChange={this.handleTableChange}
            />);
  },

  renderEditModal() {
    if (!this.state.editModalVisible) {
      return '';
    }

    const handleOk = () => {
      this.setState({ editModalVisible: false });
      this.model.fetch();
    };

    const handleCancel = () => {
      this.setState({ editModalVisible: false });
    };

    return (
      <UserEditModal
        id={this.state.editModalId}
        visible={this.state.editModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />);
  },

  renderFilter() {
    return (
      <div style={{ marginBottom: '10px' }}>
        <Button type="primary" onClick={this.handleCreateClick}>
          <Icon type="plus" />新建
        </Button>
        <div style={{ float: 'right' }}>
          <InputGroup className="ant-search-input" sytle={{ float: 'left' }}
            size="large"
          >
            <Input
              defaultValue={this.state.keyword}
              onChange={this.handleKeywordChange}
              onKeyDown={this.handleKeywordKeyDown}
            />
            <div className="ant-input-group-wrap">
              <Button className="ant-search-btn" onClick={this.handleSearchClick}>
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
      </div>
    );
  },

  render() {
    return (
      <div>
        {this.renderEditModal()}
        {this.renderFilter()}
        {this.renderTable()}
      </div>
    );
  },
});
