

const config = {
    baseUrl: 'https://oapi.dingtalk.com',
    name: 'Dingtalk1',
};


class Provider {
  constructor(opts) {
      if (typeof opts.corpId !== 'string') throw Error('Params Error: opts.corpId must be a String.');
      if (typeof opts.corpSecret !== 'string') throw Error('Params Error: opts.corpSecret must be a String.');
      this.name = opts.name || config.name;
      // API Host
      this._apiHost = opts.baseUrl || config.baseUrl;
      // �����������֯ID
      this._corpId = opts.corpId;
      // �����������֯��Կ
      this._corpSecret = opts.corpSecret;
      this.options = opts || {};
      // ����token
      this._token = {
          value: null,
          expires: null,
      };
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

    /**
     * ��ȡToken
     */
    async getToken() {
        return this.fetch({
            method: 'get',
            url: `${this._apiHost}/gettoken?appkey=${this._corpId}&appsecret=${this._corpSecret}`,
        })
            .then(res => {
                const token = res.data;
                const now = +new Date();
                this.token = {
                    value: token.access_token,
                    // �����䷢��token��Ч��Ϊ7200��
                    // ��ǰ 300�� ���»�ȡtoken
                    expires: now + ((7200 - 300) * 1000),
                };
                return token.access_token;
            });
    }

  get fetch() {
    return this._fetch;
  }
  set fetch(axios) {
    let agent = axios.create(this.options.request || {});
    this._fetch = agent.request;
  }



}

module.exports = Provider;
