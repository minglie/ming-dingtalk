
const Provider = require('./provider');
const axios = require('axios');

M=require('ming_node');

 class AuthService  extends Provider{

    constructor(opts) {
        super(opts);
        this.fetch=axios;
    }

     get token() {
         const token = this._token;
         if (!token.expires || token.expires < +new Date()) {
             return this.getToken();
         }
         return token.value;
     }

     set token(val) {
         this._token = val;
         return this._token;
     }

     async getToken() {
         return this.fetch({
             method: 'get',
             url: `https://oapi.dingtalk.com/gettoken?appkey=${this._appkey}&appsecret=${this._appsecret}`,
         }).then(res => {
                 const token = res.data;
                 const now = +new Date();
                 this.token = {
                     value: token.access_token,
                     // 钉钉颁发的token有效期为7200秒
                     // 提前 300秒 重新获取token
                     expires: now + ((7200 - 300) * 1000),
                 };
                  if(0)
                  M.setAttribute("accessToken",this._token)
                 return token.access_token;
             });
     }










};










module.exports =AuthService;