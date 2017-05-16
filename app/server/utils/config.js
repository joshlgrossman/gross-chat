const args = require('./command-line-args');
const config = args['no-config'] ? {} : require('../../../config.json');

const defaults = {
  "debug": true,
  "port": 3000,
	"secret": "abc@123",
  "ssl": false,
  "ssl_key": "",
  "ssl_cert": "",
  "sql_database_host": "localhost",
  "sql_database_user": "root",
  "sql_database_password": "",
  "sql_database_name": "",
  "nosql_database_host": "localhost",
  "nosql_database_user": "root",
  "nosql_database_password": "",
  "nosql_database_name": ""
};

for(let key in config) defaults[key] = config[key];
for(let key in args) defaults[key] = args[key];

module.exports = defaults;
