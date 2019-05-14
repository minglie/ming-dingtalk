

const axios = require('axios');
const Provider = require('./provider');
var urlencode = require('urlencode');
const CryptoJS=require("crypto-js")





 class SnsService  extends Provider{
    /**
     * 构造函数
     * @param {Object} opts 更多配置项
     */
    constructor(opts) {
        super(opts);
        this.fetch=axios;
        this._snstoken = {
            value: null,
            expires: null,
        };
    }

     get snstoken() {
         const snstoken = this._snstoken;
         if (!snstoken.expires || snstoken.expires < +new Date()) {
             return this.getSnstoken();
         }
         return snstoken.value;
     }

     set snstoken(val) {
         this._token = val;
         return this._token;
     }

     /**
      * 获取Token
      */
     async getSnstoken() {
         return this.fetch({
             method: 'get',
             url: `${this._apiHost}/sns/gettoken?appid=${this.options.sweepCodeLoginAppID}&appsecret=${this.options.sweepCodeLoginAppsecret}`,
         }).then(res => {
             const snstoken = res.data;
             const now = +new Date();
             this.snstoken = {
                 value: snstoken.access_token,
                 // 钉钉颁发的token有效期为7200秒
                 // 提前 300秒 重新获取token
                 expires: now + ((7200 - 300) * 1000),
             };
             return snstoken.access_token;
         });
     }



    /**
      *获取应用后台免登的accessToken
     */
    async getuserinfo_bycode(tmp_auth_code) {
        const timeStamp = new Date().getTime();
        let signature = CryptoJS.HmacSHA256(timeStamp+"", this.options.sweepCodeLoginAppsecret);
        signature = CryptoJS.enc.Base64.stringify(signature);
        signature = urlencode.encode(signature,"utf-8")
        const accessKey=this.options.sweepCodeLoginAppID;
        const query={signature,timeStamp,accessKey}
        return this.fetch({
            method:"POST",
            url: `${this._apiHost}/sns/getuserinfo_bycode?signature=${query.signature}&timestamp=${query.timeStamp}&accessKey=${query.accessKey}`,
            data:{tmp_auth_code}
        });
    }


    async getQRParmasUrl(opts = {appid:this.options.sweepCodeLoginAppID,redirectUri:"http://127.0.0.1:8888/callback"}) {
       const url=`https://oapi.dingtalk.com/connect/qrconnect?` +
            `appid=${opts.appid}&` +
            `response_type=code&` +
            `scope=snsapi_login&` +
            `state=STATE&` +
            `redirect_uri=${opts.redirectUri}`
        return url;
    }






    /* eslint-enable class-methods-use-this */
};


module.exports =SnsService;