
const Provider = require('./provider');



 class ExtcontactService extends Provider {
    /**
     * 构造函数
     * @param {Object} opts 更多配置项
     */
    constructor(opts) {
        super(opts);
    }



    /* eslint-disable class-methods-use-this */
    get readAPIs() {
        return {
            /**
              *获取外部联系人标签列表
             */
            async listlabelgroups(opts = {size:20,offset:0}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/extcontact/listlabelgroups`,
                    data: opts,
                }));
            },

            /**
             * 获取外部联系人列表
             */
            async list(opts = {size:20,offset:0}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/extcontact/list`,
                    data: opts,
                }));
            },

            /**
             * 获取企业外部联系人详情
             */
            async get(user_id,opts = {}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/extcontact/get`,
                    query: opts,
                    data:{user_id}
                }));
            },

        };
    }
    get writeAPIs() {
        return {
            /**
             * 添加外部联系人
             */
            async create(opts={contact:{}}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/extcontact/create`,
                    data: opts,
                }));
            },

            /**
             * 更新外部联系人
             */
            async update(opts={contact:{}}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/extcontact/update`,
                    data: opts,
                }));
            },


            /**
             * 删除外部联系人
             */
            async delete(user_id,opts = {}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/extcontact/delete`,
                    query: opts,
                    data: {user_id},
                }));
            },

        };
    }
    /* eslint-enable class-methods-use-this */
};


module.exports =ExtcontactService;