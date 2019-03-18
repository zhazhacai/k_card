const state = require('../utils/redux/weappx');
import connector from '../utils/redux/connector/index';
import user from './user'

const store = state();
store.init({ connector });

// 用户相关状态
store.model(user);

// 开始状态树
store.start();

module.exports = {
  state,
  connector
}