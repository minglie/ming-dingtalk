const querystring = require('querystring');


const config = {
    baseUrl: 'https://oapi.dingtalk.com',
    name: 'Dingtalk1',
};


class Provider {
  constructor(opts) {
      if (typeof opts.appkey !== 'string') throw Error('Params Error: opts.appkey must be a String.');
      if (typeof opts.appsecret !== 'string') throw Error('Params Error: opts.appsecret must be a String.');
      this.name = opts.name || config.name;
      // API Host
      this._apiHost = opts.baseUrl || config.baseUrl;
      // 钉钉授予的组织ID
      this._appkey = opts.appkey;
      // 钉钉授予的组织秘钥
      this._appsecret = opts.appsecret;
      this.options = opts || {};
      // 缓存token
      this._token = {
          value: null,
          expires: null,
      };
  }

    get token() {
      // return "8673bb7f09fa3855b8812948b4b3cbda";

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


    /**
     * 请求参数构造器
     * 将基础参数进行封装, 用于适配suqin.fetch()
     * @param {Object} opts 基础参数
     */
    async fg(opts = {}) {
        return {
            method: opts.method ? opts.method.toLowerCase() : 'get',
            url: `${opts.url}?${querystring.stringify({
                access_token: await this.token,
                ...opts.query,
            })}`,
            headers: opts.headers || {},
            data: opts.data,
        };
    }


    /**
     * 获取Token
     */
    async getToken() {
        return this.fetch({
            method: 'get',
            url: `${this._apiHost}/gettoken?appkey=${this._appkey}&appsecret=${this._appsecret}`,
        })
            .then(res => {
                const token = res.data;
                const now = +new Date();
                this.token = {
                    value: token.access_token,
                    // 钉钉颁发的token有效期为7200秒
                    // 提前 300秒 重新获取token
                    expires: now + ((7200 - 300) * 1000),
                };
                return token.access_token;
            });
    }

  get fetch() {
    return this._fetch;
  }
  set fetch(axios) {
    let agent = axios.create(this.options.request || {timeout:10000});

      if(1)
      agent.interceptors.request.use(config => {
          M.log(config.method,config.url,JSON.stringify(config.data))
          return config;
      },error=>{
           Promise.reject(error)
         }
      );


      if(0)
      agent.interceptors.response.use(
          response=>{
              return response;
          },
          error => {
              return Promise.reject(error)
          }
        )


       this._fetch = agent.request;
  }



}

module.exports = Provider;
