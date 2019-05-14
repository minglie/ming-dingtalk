const querystring = require('querystring');
const Provider = require('./provider');



 class DepartmentService extends Provider {
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
             * 获取子部门ID列表
             * @param opts
             * @returns {Promise.<*>}
             */
            async list_ids(id,opts = {}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/department/list_ids`,
                    query: { ...opts, id },
                }));
            },



            /**
             * 获取部门列表
             */
            async list(opts ={id:"1",fetch_child:false }) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/department/list`,
                    query: opts,
                }));
            },

            /**
             * 获取部门详情
             * @param {String} id
             * @param {Object} opts 其余参数
             */
            async get(id,opts = {}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/department/get`,
                    query: { ...opts, id },
                }));
            },

            /**
             * 查询部门的所有上级父部门路径
             */
            async list_parent_depts_by_dept(id,opts = {}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/department/list_parent_depts_by_dept`,
                    query: { ...opts, id },
                }));
            },

            /**
             * 查询指定用户的所有上级父部门路径
             * @param opts
             * @returns {Promise.<*>}
             */
            async list_parent_depts(userId,opts = {}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/department/list_parent_depts`,
                    query: { ...opts, userId },
                }));
            },

            /**
             * 获取企业员工人数
             * @param opts
             * @returns {Promise.<*>}
             */
            async get_org_user_count(onlyActive=0) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/user/get_org_user_count`,
                    query: {onlyActive},
                }));
            },


        };
    }
    get writeAPIs() {
        return {
            /**
             * 创建群组
             * @param {Object} group 群组
             * @param {Object} opts  其余参数
             */
            async create(group, opts = {}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/department/create`,
                    query: opts,
                    data: group,
                }));
            },

            /**
             * 更新部门
             * @param {Object} group 群组
             * @param {Object} opts  其余参数
             */
            async update(group, opts = {}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/department/update`,
                    query: opts,
                    data:  group,
                }));
            },


            /**
             * 删除部门
             * @param {String} id   群组ID
             * @param {Object} opts 其余参数
             */
            async delete(id,opts = {}) {
                return this.fetch(await this.fg({
                    method: 'GET',
                    url: `${this._apiHost}/department/delete`,
                    query: { ...opts, id },
                }));
            },

        };
    }
    /* eslint-enable class-methods-use-this */
};


module.exports =DepartmentService;