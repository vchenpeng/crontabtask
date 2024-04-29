const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

function getLowdb () {
  const adapter = new FileSync('./db.json', {
    serialize: (data) => JSON.stringify(data),
    deserialize: (data) => JSON.parse(data)
  });
  const db = low(adapter);
  db.defaults({
    '.etch.market': '',
    'yiyuan': null
  }).write();
  return db;
}

module.exports = {
  db: null,
  getDB () {
    // if (this.db) {
    //   return this.db;
    // } else {
    //   this.db = getLowdb();
    //   return this.db;
    // }
    this.db = getLowdb();
    return this.db;
  },
  get (key) {
    // let result = this.getDB().get(`submits['${signal.bar_time}']['OPEN']`).value();
    return this.getDB().get(key).value();
  },
  set (key, value) {
    return this.getDB().set(key, value).write();
  }
};