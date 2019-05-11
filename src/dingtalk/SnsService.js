const Provider = require('./provider');const axios = require('axios'); class SnsService extends Provider {    /**     * 构造函数     * @param {Object} opts 更多配置项     */    constructor(opts) {        super(opts);    }    /* eslint-disable class-methods-use-this */    get readAPIs() {        return {            /**              *获取应用后台免登的accessToken             */            async getuserinfo_bycode(tmp_auth_code) {                return this.fetch({                    method:"POST",                    url: `${this._apiHost}/sns/getuserinfo_bycode`,                    data:{tmp_auth_code}                });            },        };    }    /* eslint-enable class-methods-use-this */};module.exports =SnsService;