const Provider = require('./provider');
const axios = require('axios');

class Client {

  constructor(provider) {

     let name = provider.name;
      if (!name) {
          throw new Error('Need a `Name` for provider.');
      }
      // provider 参数必须是 Provider 的实例
      if (!(provider instanceof Provider)) {
          throw new Error('Need a available Provider.');
      }
      provider.fetch = axios;
      this._applyAPI(provider);
      // 默认第一个加入的 provider 是主 provider
       this.mainProvider = provider;
  }



  get _handler() {
    return {
      /**
       * 读操作器
       * @param {String} APIName Provider 的 API 名称
       * @param {String|Boolean} providerName 可选。不传，提供主 provider 结果；传入 true 时，提供所有 provider 结果；传入指定 provider 名称时，提供相应结果。
       */
      readAPIs: function (APIName, ...args) {
           let result;
            result = this._findAPI(this.mainProvider.readAPIs, APIName).bind(this.mainProvider)(...args);
            return result;
      },
    

      writeAPIs: function (APIName, ...args) {
            let result = {};
            result = this._findAPI(this.mainProvider.writeAPIs, APIName).bind(this.mainProvider)(providerName, ...args);
            return result;
      }
    };
  }

  /**
   * 检查是否实现了相应 API 接口
   * @param {Object} APIs API 集合
   * @param {String} APIName API 名称
   */
  _findAPI(APIs, APIName) {
    if (!APIs[APIName]) {
      throw new Error(`No API:${APIName}.`);
    }
    return APIs[APIName];
  }

  /**
   * 注册 API
   * @param {Provider} provider Provider 对象
   */
  _applyAPI(provider) {
    for (let rw in this._handler) {
      let handler = this._handler[rw].bind(this);
      for (let name in provider[rw]) {
        // 已有同名方法，不再注册
        if (!this[name]) {
          // 注册成为一个形式方法，被调用时仍用 handler 处理。
          this[name] = function(...args) {
            return handler(name, ...args);
          }
        }
      }
    };
  }
}

module.exports = Client;
