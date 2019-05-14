
const Provider = require('./provider');



 class UserService extends Provider {
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
             * 获取用户详情
             * @param opts
             * @returns {Promise.<*>}
             */
            async get(userid,opts = {lang:"zh_CN"}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/user/get`,
                    query: { ...opts, userid },
                }));
            },
            /**
             * 获取部门用户userid列表
             * @param opts
             * @returns {Promise.<*>}
             */
            async getDeptMember(deptId,opts = { deptId: 1}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/user/getDeptMember`,
                    query: { ...opts, deptId },
                }));
            },
            /**
             * 获取部门用户
             * @param opts
             * @returns {Promise.<*>}
             */
            async simplelist(opts = {department_id: 1,offset:0,size:5}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/user/simplelist`,
                    query: opts,
                }));
            },

            /**
             * 获取部门用户详情
             * @param opts
             * @returns {Promise.<*>}
             */
            async listbypage(opts = {department_id: 1,offset:0,size:5}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/user/listbypage`,
                    query: opts,
                }));
            },


            /**
             * 获取管理员列表
             * @param opts
             * @returns {Promise.<*>}
             */
            async get_admin(opts = {}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/user/get_admin`,
                    query: opts,
                }));
            },

            /**
             * 获取管理员通讯录权限范围
             * @param opts
             * @returns {Promise.<*>}
             */
            async get_admin_scope(userid,opts = {}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/topapi/user/get_admin_scope`,
                    query: { ...opts, userid },
                }));
            },

            /**
             * 根据unionid获取userid
             * @param opts
             * @returns {Promise.<*>}
             */
            async getUseridByUnionid(unionid,opts = {}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/user/getUseridByUnionid`,
                    query: { ...opts, unionid },
                }));
            },

            /**
             *获取用户userid
             */
            async getuserinfo(code,opts = {}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/user/getuserinfo`,
                    query: {code},
                }));
            },

        };
    }
    get writeAPIs() {
        return {
            /**
             * 创建用户
             * @param {Object} member 成员
             * @param {Object} opts   其余参数
             */
            async create(member, opts = {}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/user/create`,
                    query: opts,
                    data: member,
                }));
            },


            /**
             * 更新用户
             * @param {Object} member 成员
             * @param {Object} opts   其余参数
             */
            async update(member, opts = {}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/user/update`,
                    query: opts,
                    data: member,
                }));
            },


            /**
             * 删除成员
             * @param {String} id   成员ID
             * @param {Object} opts 其余参数
             */
            async delete(userid,opts = {}) {
                return this.fetch(await this.fg({
                    method: 'GET',
                    url: `${this._apiHost}/user/delete`,
                    query: { ...opts, userid },
                }));
            },
        };
    }
    /* eslint-enable class-methods-use-this */
};


module.exports =UserService;