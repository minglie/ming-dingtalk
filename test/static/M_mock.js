//20190120

(function (window, undefined) {

    var M = {};

    M.host = "";


    var App = {
        reqMap: new Map(),
        resMap: new Map(),

        // 缓存ajax方法
        ajax: $.ajax,
        _get: {},
        _post: {},
        _begin: function () {
        },
        _end: function () {
        },

        begin(callback) {
            App._begin = callback;
        },
        end(callback) {
            App._end = callback;
        },
        /**
         * 注册get方法
         */
        get (string, callback) {
            //在M.IO上注册一个方法
            M.IO.reg(string.replace("/", ""), "get");
            string = M.formatUrl(string);
            App._get[string] = callback;
        },
        /**
         * 注册post方法
         */
        post(string, callback) {
            M.IO.reg(string.replace("/", ""), "post");
            string = M.formatUrl(string);
            App._post[string] = callback;
        },
        doget(pureUrl, options) {
            req = {};
            res = {};
            req.params = App.reqMap.get("get:" + pureUrl);
            req.method = "get";
            req.pureUrl = pureUrl;
            if (Object.keys(req.params).length) {
                req.url = pureUrl.substr(0, pureUrl.length - 1) + "?" + M.urlStringify(req.params);
            } else {
                req.url = pureUrl;
            }
            res.send = function (d) {
                this.resMap.set("get:" + pureUrl, d);
                data = App.resMap.get(options.type + ":" + pureUrl);
                App._end(data);
                options.success(data);
            }.bind(this);
            App._begin(req);
            App._get[pureUrl](req, res);
        },
        dopost(pureUrl, options) {
            req = {};
            res = {};
            req.params = App.reqMap.get("post:" + pureUrl);
            req.method = "post";
            req.pureUrl = pureUrl;
            req.url = pureUrl;
            res.send = function (d) {
                this.resMap.set("post:" + pureUrl, d);
                data = App.resMap.get(options.type + ":" + pureUrl);
                App._end(data);
                options.success(data);
            }.bind(this);
            App._begin(req, res);
            App._post[pureUrl](req, res);
        }
    };


    /**
     * ----------------------其他工具函数START--------------------------------------------
     */
    M.sleep = function (numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    };

    /**
     * ----------------------服务器端START--------------------------------------------
     */
    M.get = function (url, param) {
        let u;
        M.ajax({
            url: url,
            async: false,
            type: 'get',
            data: param,
            dataType: 'json',
            success: function (data) {
                u = data;
            }
        });
        return u;
    };


    M.post = function (url, param) {
        let u;
        M.ajax({
            url: url,
            async: false,
            type: 'post',
            data: param,
            dataType: 'json',
            success: function (data) {
                u = data;
            }
        });
        return u;
    };


    M.result = function (data, success) {
        var r = {};
        if (success == false) {
            r.code = 3003;
            r.message = "操作失败";
            r.success = success;
        } else {
            r.code = 3002;
            r.message = "操作成功";
            r.success = true;
        }
        try {
            var obj = JSON.parse(data);
            if (typeof obj == 'object' && obj) {
                r.data = obj;
            } else {
                r.data = data;
            }
        } catch (e) {
            r.data = data;
        }
        return r;
    };

    M.urlStringify = function (obj) {
        if (obj !== null && typeof obj === 'object') {
            var keys = Object.keys(obj);
            var len = keys.length;
            var flast = len - 1;
            var fields = '';
            for (var i = 0; i < len; ++i) {
                var k = keys[i];
                var v = obj[k];
                var ks = k + "=";
                fields += ks + v;
                if (i < flast)
                    fields += "&";
            }
            return fields;
        }
        return '';
    };

    M.urlParse = function (url) {
        url = url.substr(url.indexOf("?") + 1);
        var t, n, r, i = url, s = {};
        t = i.split("&"),
            r = null,
            n = null;
        for (var o in t) {
            var u = t[o].indexOf("=");
            u !== -1 && (r = t[o].substr(0, u),
                n = t[o].substr(u + 1),
                s[r] = n)
        }
        return s
    };

    /**
     * 去掉参数加让斜杠
     */
    M.formatUrl = function (url) {
        if (url.indexOf("?") > 0) {
            url = url.substr(0, url.indexOf("?"));
        } else {
            url = url;
        }
        if (!url.endsWith('/')) {
            url = url + '/';
        }
        if (!url.startsWith('/')) {
            url = '/' + url;
        }
        return url;
    };


    M.encodeURIComponentObj = function (data) {
        let ret = '';
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    };

    M.fetchGet = function (url, callback, data) {
        var getData = "";
        if (data) {
            getData = M.urlStringify(data);
            if (url.indexOf("?") > 0) {
                getData = "&" + getData;
            } else {
                getData = "?" + getData;
            }
        }
        url = M.host + url + getData;
        fetch(url, {
                method: 'GET',
                mode: 'cors'
            }
        ).then((res) => {
            return res.json()
        }).then((res) => callback(res)).catch((error) => {
            console.error(error)
        });
    };

    M.fetchPost = function (url, callback, data) {
        fetch(M.host + url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: M.encodeURIComponentObj(data)
        }).then(function (response) {
            return response.json();
        }).then((resonseData) => {
            callback(resonseData);
        })
            .catch((error) => {
                console.error(error)
            });
    };


    M.doSql = function (sql, callback) {
        fetch(M.host + '/doSql', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: M.encodeURIComponentObj({sql})
        }).then(function (response) {
            return response.json();
        }).then((resonseData) => {
            callback(resonseData);
        })
            .catch((error) => {
                console.error(error)
            });
    };


    M.axiosDoSql = function (sql, callback) {
        axios({
            url: M.host + '/doSql',
            method: 'post',
            data: {
                sql
            },
            transformRequest: [function (data) {
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (response) {
            callback(response.data);
        })
            .catch(function (error) {
                console.err(error);
            });
    };


    M.getObjByFile = function (file) {
        data = localStorage.getItem(file);
        var obj;
        if (data) obj = JSON.parse(data.toString());
        return obj;
    };
    M.writeObjToFile = function (file, obj) {
        localStorage.setItem(file, JSON.stringify(obj))
    };

    M.addObjToFile = function (file, obj) {
        try {
            var d = M.getObjByFile(file);
            M.writeObjToFile(file, [...d, obj]);
        } catch (e) {
            M.writeObjToFile(file, [obj]);
        }
    };
    M.deleteObjByIdFile = function (file, id) {
        var d = M.getObjByFile(file);
        for (var i = 0; i < d.length; i++) {
            if (d[i].id == id) {
                d.splice(i, 1);
                break;
            }
        }
        M.writeObjToFile(file, d);
    };

    M.updateObjByIdFile = function (file, obj) {
        var d = M.getObjByFile(file);
        for (var i = 0; i < d.length; i++) {
            if (d[i].id == obj.id) {
                d.splice(i, 1, obj);
                break;
            }
        }
        M.writeObjToFile(file, d);
    };


    M.fileDownload = function (content, filename) {
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
    };


    //获取地址栏数据
    M.getParameter = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.href.substr(window.location.href.indexOf('?')).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    //说话函数
    M.speak = function (speakStr) {
        var myAudio = document.createElement("AUDIO");
        myAudio.src = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=9&text=" + speakStr;
        myAudio.type = "audio/mpeg";
        myAudio.play();
    };

    /*
    * getTemplate(id tplID)  参数,模板容器的id
    * getTemplate.assign(key,value)  赋值,将数据赋值到模板中
    * getTemplate.display(str elementID)   加载模板内容,将模板内容放置到elementID中
    *           如果elementID为空，说明模板容器与放置容器是同一个
    * getTemplate.action.setLimitR/setLimitL(str)  设置左右定界符
    */
    M.getTemplate=function(tplID){
        var _this=this;         //保存自身指针
        var assignArr=[];       //定义一个哈希数组，存放assign的k,v
        var config={           //配置项
            limitL:"{",
            limitR:"}",
            voidModify:'',      //如果模板元素无值，则显示为空
        };
        var limitArr={          //私有变量，存储转义定界符
            '<':'&lt;',
            '>':'&gt;',
        };
        var encodeLimter=function(str){     //私有方法，转义字符
            for(var tmp in limitArr){
                if(str.search(tmp)>=0){
                    str=str.replace(tmp,limitArr[tmp]);
                }
            }
            return str;
        };
        this.action={                       //公有方法，修改定界符，空参数
            setLimitL:function(str){
                config.limitL=encodeLimter(str);
                return _this;
            },
            setLimitR:function(str){
                config.limitR=encodeLimter(str);
                return _this;
            },
            setVoidModify:function(str){
                config.voidModify=str;
                return _this;
            }
        };
        this.assign=function(key,value){
            //赋值，创建带有定界符哈希数组
            assignArr[config.limitL+key+config.limitR]=value;
            return this;
        };
        this.display=function(elementID){
            try{
                var targetID=elementID||tplID;          //如果elementID为空，说明模板容器与放置容器是同一个
                var tmplate=document.getElementById(tplID).innerHTML;  //获取模板容器的内容
                var ptn=new RegExp(config.limitL+'(\\w+)?'+config.limitR,'g');    //创建正则表达式
                var tmpRegArr=tmplate.match(ptn);               //存储所有符合条件的模板元素
                for(var i=0;i<tmpRegArr.length;i++){
                    //移除模板内容中的标签，替换为值
                    var changeStr=assignArr[tmpRegArr[i]]||config.voidModify;
                    tmplate=tmplate.replace(tmpRegArr[i],changeStr);
                }
            }catch(e){
                console.log(e.message);
                console.log("The limit code is not accord with your set");
            }
            document.getElementById(targetID).innerHTML= tmplate;
            return this;
        }
    };

    /**
     *改写ajax方法
     */
    M.ajax = function (options) {
        d = M.urlParse(options.url);
        options.data = Object.assign(d, options.data);
        App.ajax({
            url: options.url,
            beforeSend(XHR) {
                let pureUrl = M.formatUrl(options.url);
                //往reqMap里加数据
                App.reqMap.set(options.type + ":" + pureUrl, options.data);

                if (options.type == "get") {
                    App.doget(pureUrl, options);
                } else {
                    App.dopost(pureUrl, options);
                }


                return false;
            },
            success(data) {

                options.success(data)
            }
        })
    };


    //服务方法注册
    M.IO = {};
    M.IO.reg = function (methed, type) {
        M.IO[methed] = (param) => {
            return new Promise(
                function (reslove) {
                    M.ajax({
                        url: "/" + methed,
                        data: param,
                        type: type,
                        success: function (data) {
                            reslove(data)
                        }
                    });
                }
            )
        }
    };


    M.Db = function (dbname) {
        var Db = {};
        Db.display_sql_enable = false;

        Db = openDatabase(dbname, '1.0', '', 2 * 1024 * 1024);

        Db.getInsertObjSql = function (tableName, obj) {
            var fields = "(";
            var values = "(";
            for (let field in obj) {
                fields += field + ",";
                values += `'${obj[field]}'` + ",";
            }
            fields = fields.substr(0, fields.lastIndexOf(","));
            values = values.substr(0, values.lastIndexOf(","));
            fields += ")";
            values += ")";
            let sql = "insert into " + tableName + fields + " values " + values;
            return sql;
        };

        Db.getDeleteObjSql = function (tableName, obj) {
            var fields = [];
            for (let field in obj) {
                fields.push(field);
            }
            let sql = `delete from ${tableName} where ${fields.map(u => u + "='" + obj[u] + "'")}`;
            sql = sql.replace(/,/g, " and ");
            return sql;
        };

        Db.getUpdateObjSql = function (tableName, obj, caseObj) {
            var fields = [];
            for (let field in obj) {
                if (field != "id")
                    fields.push(field);
            }
            let sql = "";
            if (!caseObj) {
                sql = `update ${tableName} set ${fields.map(u => u + "='" + obj[u] + "'")} where id=${obj.id}`;
            } else {
                var caseObjfields = [];
                for (let caseObjfield in caseObj) {
                    caseObjfields.push(caseObjfield)
                }
                sql = `update ${tableName} set ${fields.map(u => u + "='" + obj[u] + "'")} where ${caseObjfields.map(u => u + "='" + caseObj[u] + "'").join(" and ")}`;
            }

            return sql;
        };


        Db.getSelectObjSql = function (tableName, obj) {
            var fields = [];
            for (let field in obj) {
                fields.push(field);
            }
            let sql = `select * from ${tableName} where ${fields.map(u => u + "='" + obj[u] + "'")}`;
            sql = sql.replace(/,/g, " and ");
            return sql;
        };


        Db.doSql = function (sql) {
            if (Db.display_sql_enable) console.log(sql + ";");
            var promise = new Promise(function (reslove, reject) {
                Db.transaction(function (context) {
                    context.executeSql(sql, [], function (context, results) {
                        reslove(results);
                    });
                }, function (error) {
                    console.error(error.message);
                }, function () {

                });

            });
            return promise;
        };
        return Db;
    };


    M.init = function () {
        /***
         * 下划线命名转为驼峰命名
         */
        String.prototype.underlineToHump = function () {
            var re = /_(\w)/g;
            str = this.replace(re, function ($0, $1) {
                return $1.toUpperCase();
            });
            return str;
        };

        /***
         * 驼峰命名转下划线
         */
        String.prototype.humpToUnderline = function () {
            var re = /_(\w)/g;
            str = this.replace(/([A-Z])/g, "_$1").toLowerCase();
            return str;
        };

        //首字母变大写
        String.prototype.firstChartoUpper = function () {
            return this.replace(/^([a-z])/g, function (word) {
                return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
            });
        };
        //首字母变小写
        String.prototype.firstChartoLower = function () {
            return this.replace(/^([A-Z])/g, function (word) {
                return word.replace(word.charAt(0), word.charAt(0).toLowerCase());
            });
        };
        //格式化日期
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份
                "d+": this.getDate(),                    //日
                "h+": this.getHours(),                   //小时
                "m+": this.getMinutes(),                 //分
                "s+": this.getSeconds(),                 //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
    };

    M.init();

    window.app = App;
    window.M = M;

   // $.ajax = M.ajax;

})(window);