const Provider = require('./provider');const axios = require('axios'); class SsoService extends Provider {    /**     * 构造函数     * @param {Object} opts 更多配置项     */    constructor(opts) {        super(opts);    }    /* eslint-disable class-methods-use-this */    get readAPIs() {        return {            /**              *获取应用后台免登的accessToken             */            async gettoken(opts = {corpid:this.options.corpId,corpsecret:this.options.ssoSecret}) {                return this.fetch({                    url: `${this._apiHost}/sso/gettoken?corpid=${opts.corpid}&corpsecret=${opts.corpsecret}`,                });            },            /**             * 获取应用管理员的身份信息             */            async getuserinfo(opts = {access_token:"",code:""}) {                return this.fetch(await this.fg({                    url: `${this._apiHost}/sso/getuserinfo`,                    query: opts,                }));            },        };    }    /* eslint-enable class-methods-use-this */};module.exports =SsoService;