/*
 * @Author: detailyang
 * @Date:   2015-02-19 14:09:05
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-10 20:25:49
 */
const config = module.exports;

config.paginator = {
  per_page: 30,
};

if (process.env.NODE_ENV === 'dev') {
  config.database = {
    username: 'root',
    password: '123456',
    database: 'cas',
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    logging: false,
  };
  config.redis = {
    host: '127.0.0.1',
    port: '6379',
    ttl: 3600,
    db: 0,
    key: 'momtellmewhy',
  };
  config.password = {
    'default': process.env.CAS_PASSWORD_DEFAULT || 'password',
    'bcryptlength': 12,
  };
  config.avatar = {
    width: 100,
    cache: 3 * 24 * 60 * 60,
    maxsize: 512 * 1024 * 1024,
  };
  config.notp = {
    label: process.env.CAS_NOTP_LABEL || 'cas',
    delta: process.env.CAS_NOTP_DELTA || '-3',
    salt: process.env.CAS_NOTP_SALT || '$2a$10$jsZ0onecMnHOeKUfRG9AYe',
  };
} else if (process.env.NODE_ENV === 'test') {
  console.log('test');
} else {
  console.log('prod');
}
