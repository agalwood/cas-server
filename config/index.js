/*
 * @Author: detailyang
 * @Date:   2016-02-18 16:08:50
* @Last modified by:   detailyang
* @Last modified time: 2016-03-17T18:13:53+08:00
 */


module.exports = {
  'mysql': require('./mysql'),
  'session': require('./session'),
  'syslog': require('./syslog'),
  'queue': require('./queue'),
  'cache': require('./cache'),
  'mailgun': {
    'key': process.env.CAS_MAILGUN_KEY,
    'domain': process.env.CAS_MAILGUN_DOMAIN,
    'from': process.env.CAS_MAILGUN_FROM,
  },
  'email': {
    host: process.env.CAS_EMAIL_HOST,
    port: process.env.CAS_EMAIL_PORT,
    secure: process.env.CAS_EMAIL_SECURE,
    user: process.env.CAS_EMAIL_USER,
    pass: process.env.CAS_EMAIL_PASS,
    from: process.env.CAS_EMAIL_FROM,
  },
  'cas': {
    port: process.env.CAS_CAS_PORT || 3000,
  },
  'password': {
    'default': process.env.CAS_PASSWORD_DEFAULT || 'password',
    'bcryptlength': +process.env.CAS_PASSWORD_BCRYPTLENGTH || 12,
  },
  'avatar': {
    width: 100,
    cache: 3 * 24 * 60 * 60,
    maxsize: 512 * 1024 * 1024,
  },
  'notp': {
    label: process.env.CAS_NOTP_LABEL || 'cas',
    delta: process.env.CAS_NOTP_DELTA || '-3',
    salt: process.env.CAS_NOTP_SALT || '$2a$10$jsZ0onecMnHOeKUfRG9AYe',
  },
  'oauth': {
    ttl: 1 * 60,
  },
  'paginator': 30,
};
