
const Provider = require('./provider');
const axios = require('axios');
const utils = require('./Utils');



 class JsapiService extends Provider {
    /**
     * 构造函数
     * @param {Object} opts 更多配置项
     */
    constructor(opts) {
        super(opts);
        this.fetch=axios;
        this._ticket = {
            value: null,
            expires: null,
        };
    }


     get ticket() {
         const ticket = this._ticket;
         if (!ticket.expires || ticket.expires < +new Date()) {
             return this.getTicket();
         }
         return token.value;
     }

     set ticket(val) {
         this._token = val;
         return this._token;
     }


     /**
      * 获取Token
      */
     async getTicket() {
         return this.get_jsapi_ticket().then(res => {
                 const ticket = res.data;
                 const now = +new Date();
                 this.ticket = {
                     value: ticket.ticket,
                     // 钉钉颁发的token有效期为7200秒
                     // 提前 300秒 重新获取token
                     expires: now + ((7200 - 300) * 1000),
                 };
                 return ticket.ticket;
             });
     }



    /**
     * 获取jsapi_ticket
     */
    async get_jsapi_ticket(opts = {type:"jsapi"}) {
        return this.fetch(await this.fg({
            url: `${this._apiHost}/get_jsapi_ticket`,
            query: { ...opts},
        }));
    }


     /**
      * 获取签名参数
      */
     async getJSConfig(url) {
         let  r= utils.getSign(await this.ticket,url)
         r.agentId=this.options.agentId;
         r.corpId=this.options.corpId;
         return r;
     }




};


module.exports =JsapiService;