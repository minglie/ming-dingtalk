
const Provider = require('./provider');



 class MessageService extends Provider {
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


        };
    }
    get writeAPIs() {
        return {
            /**
             * 发送消息
             */
            async corpconversation_asyncsend_v2(
                opts={ agent_id:this.options.agentId,
                       userid_list:"manager6712",
                      // dept_id_list:"71482134",
                       msg:{"msgtype":"text","text":{"content":"000只有一个人收dd到11"}}}

                ) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/message/corpconversation/asyncsend_v2`,
                    data: opts
                }));
            },

            //查询工作通知消息的发送进度
            async corpconversation_getsendprogress(task_id,
                opts={ agent_id:this.options.agentId}

            ) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/message/corpconversation/getsendprogress`,
                    data: { ...opts, task_id }
                }));
            },

            //查询工作通知消息的发送结果
            async corpconversation_getsendresult(task_id, opts={ agent_id:this.options.agentId}
            ) {
                return this.fetch(await this.fg({
                    method: 'POST',
                    url: `${this._apiHost}/topapi/message/corpconversation/getsendresult`,
                    data: { ...opts, task_id }
                }));
            },







            



        };
    }
    /* eslint-enable class-methods-use-this */
};


module.exports =MessageService;