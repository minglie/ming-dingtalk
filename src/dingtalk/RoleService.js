
const Provider = require('./provider');



 class RoleService extends Provider {
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
              *获取角色列表
             */
            async list(opts = {size:20,offset:0}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/topapi/role/list`,
                    query: opts,
                }));
            },

            /**
             * 获取角色下的员工列表
             */
            async simplelist(opts = {role_id:"1",size:20,offset:0}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/topapi/role/simplelist`,
                    query: opts,
                }));
            },

            /**
             * 获取角色组
             * @param {String} id
             * @param {Object} opts 其余参数
             */
            async getrolegroup(group_id,opts = {}) {
                return this.fetch(await this.fg({
                    url: `${this._apiHost}/topapi/role/getrolegroup`,
                    query: { ...opts, group_id },
                }));
            },

            /**
             * 获取角色详情
             */
            async getrole(roleId,opts = {}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/role/getrole`,
                    query: { ...opts},
                    data:{roleId}
                }));
            },

        };
    }
    get writeAPIs() {
        return {
            /**
             * 创建角色
             */
            async add_role(role = {roleName:"xx",groupId:1},opts) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/role/add_role`,
                    query: opts,
                    data: role,
                }));
            },

            /**
             * 更新角色
             */
            async update_role(role = {roleName:"xx",roleId:1},opts) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/role/update_role`,
                    query: opts,
                    data: role,
                }));
            },


            /**
             * 删除角色
             * @param {String} id   群组ID
             * @param {Object} opts 其余参数
             */
            async deleterole(role_id,opts = {}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/role/deleterole`,
                    query: opts,
                    data: {role_id},
                }));
            },



            /**
             * 创建角色组
             */
            async add_role_group(name,opts = {}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/role/add_role_group`,
                    query: opts,
                    data: {name},
                }));
            },

            /**
             * 批量增加员工角色
             */
            async addrolesforemps(opts = {roleIds:"",userIds:""}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/role/addrolesforemps`,
                    data: opts,
                }));
            },


            /**
             * 批量删除员工角色
             */
            async removerolesforemps(opts = {roleIds:"",userIds:""}) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/role/removerolesforemps`,
                    data: opts,
                }));
            },



        };
    }
    /* eslint-enable class-methods-use-this */
};


module.exports =RoleService;