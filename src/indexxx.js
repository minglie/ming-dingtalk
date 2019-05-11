const DingTalk = require('./dingtalk/DingTalk');

dingtalk=new DingTalk({
    corpId:"ding43b3a65d280ba98835c2f4657eb6378f",
    corpSecret:"dufgB390RGxOMDLXn_j-hHVmEieCkCVlUZlF3i9G0gGQq-7YLJuhwQeZftj-e0O",
    ssoSecret:"Os-K1XTRI1axu3GxRF3MlIxryWu8fnke-4ewwF9rrjZSbGeAUmHB5BVR_v0EfRgw",
    appkey: 'dingqy4fr3r9fzserjvn',
    appsecret: 's0tqfENW0JOrEPWrPZLGQky8EdQwCF6VZ2KyqhLZABLGFUlCcUKN7ODuvTUx7MLn',
})

//获取accessToken
if(0)
dingtalk.auth.getToken().then(res => console.log(res));



//获取用户详情
//dingtalk.user.get("manager6712").then(res => console.log(res.data));
//获取部门用户userid列表
//dingtalk.user.getDeptMember("71433174").then(res => console.log(res.data));
//获取部门用户
//dingtalk.user.simplelist({department_id:"71433174",offset:0,size:5}).then(res => console.log(res.data));
//获取部门用户详情
//dingtalk.user.listbypage({department_id:"71433174",offset:0,size:5}).then(res => console.log(res.data));
//获取管理员列表
//dingtalk.user.get_admin().then(res => console.log(res.data));
//获取管理员通讯录权限范围
//dingtalk.user.get_admin_scope("manager6712").then(res => console.log(res.data));
//根据unionid获取userid
//dingtalk.user.getUseridByUnionid("O6VquZgrammhMIIWPXM2egiEiE").then(res => console.log(res.data));

if(0)
dingtalk.user.getuserinfo("199a57636b713257b6ab002b2603ab1e").then(res => console.log(res.data));



//创建用户
if(0)
dingtalk.user.create({
    "userid": "zhangsan00",
    "name": "张三",
    "department": [71528142],
    "position": "产品经理",
    "mobile": "13325478946",
    "tel" : "xxxx-xxxxxxx",
    "workPlace" :"",
    "remark" : "",
    "email": "test@xxx.com",
    "orgEmail": "test@xxx.com",
    "jobnumber": "xxx",
    "isHide": false,
    "isSenior": false,
    "extattr": {
        "爱好":"旅游",
        "年龄":"24"
    }
}).then(res => console.log(res.data));



//更新用户
if(0)
    dingtalk.user.update({
        "userid": "zhangsan",
        "name": "张三4",
        "department": [71528142],
        "position": "产品经理",
        "mobile": "13325478946",
        "tel" : "xxxx-xxxxxxx",
        "workPlace" :"",
        "remark" : "",
        "email": "test@xxx.com",
        "orgEmail": "test@xxx.com",
        "jobnumber": "xxx",
        "isHide": false,
        "isSenior": false,
        "extattr": {
            "爱好":"旅游",
            "年龄":"24"
        }
    }).then(res => console.log(res.data));


//删除用户
if(0)
dingtalk.user.delete("zhangsan00").then(res => console.log(res.data));



//获取子部门ID列表
if(0)
dingtalk.department.list_ids("71528142").then(res => console.log(res.data));


//获取部门列表
if(0)
dingtalk.department.list({id:"71433174",fetch_child:true}).then(res => console.log(res.data));


//获取部门详情

if(0)
dingtalk.department.get("71433174").then(res => console.log(res.data));

//查询部门的所有上级父部门路径
if(0)
dingtalk.department.list_parent_depts_by_dept("71433174").then(res => console.log(res.data));


//查询指定用户的所有上级父部门路径
if(0)
dingtalk.department.list_parent_depts("manager6712").then(res => console.log(res.data));


//获取企业员工人数
if(0)
dingtalk.department.get_org_user_count().then(res => console.log(res.data));


//创建部门
if(0)
dingtalk.department.create(
    {
        "name": "钉钉事业部",
        "parentid": "1",
        "order": "1",
        "createDeptGroup": true,
        "deptHiding" : true,
        "deptPermits" : "3|4",
        "userPermits" : "userid1|userid2",
        "outerDept" : true,
        "outerPermitDepts" : "1|2",
        "outerPermitUsers" : "userid3|userid4",
        "sourceIdentifier" : "source"
    }
).then(res => console.log(res.data));




//更新部门
if(0)
dingtalk.department.update(
    {
        id:"114433438",
        "name": "钉钉事业部1",
        "parentid": "1",
        "order": "1",
        "createDeptGroup": true,
        "deptHiding" : true,
        "deptPermits" : "3|4",
        "userPermits" : "userid1|userid2",
        "outerDept" : true,
        "outerPermitDepts" : "1|2",
        "outerPermitUsers" : "userid3|userid4",
        "sourceIdentifier" : "source"
    }
).then(res => console.log(res.data));


if(0)
dingtalk.department.delete("114433438").then(res => console.log(res.data));


//获取角色列表
if(0)
dingtalk.role.list().then(res => console.log(JSON.stringify(res.data)));


//获取角色下的员工列表
if(0)
dingtalk.role.simplelist( {role_id:"327619019",size:20,offset:0}).then(res => console.log(res.data));

//获取角色组
if(0)
dingtalk.role.getrolegroup( "327619001").then(res => console.log(res.data));

//获取角色详情
if(0)
dingtalk.role.getrole(327619016).then(res => console.log(res.data));

if(0)
dingtalk.role.add_role({roleName:"系搜索5",groupId:327619006}).then(res => console.log(res.data));

if(0)
dingtalk.role.update_role({roleName:"系搜索1",roleId:447810818}).then(res => console.log(res.data));

//删除角色
if(0)
dingtalk.role.deleterole(447864441).then(res => console.log(res.data));


if(0)
dingtalk.role.add_role_group("名1").then(res => console.log(res.data));


if(0)
dingtalk.role.addrolesforemps({roleIds:"327619009,327619025",userIds:"manager6712"}).then(res => console.log(res.data));


//批量删除员工角色
if(0)
dingtalk.role.removerolesforemps({roleIds:"327619009,327619025",userIds:"manager6712"}).then(res => console.log(res.data));


//获取外部联系人标签列表
if(0)
 dingtalk.extcontact.listlabelgroups().then(res => console.log(res.data));


//获取外部联系人标签列表
if(0)
 dingtalk.extcontact.list().then(res => console.log(res.data));

//获取企业外部联系人详情

if(0)
dingtalk.extcontact.get("1918472868114179").then(res => console.log(res.data));

if(0)
dingtalk.sso.gettoken().then(res => console.log(res.data));

if(0)
dingtalk.sso.ming_getuserinfoByCode("121a2aabe42e3778af25201bf4c73cb7").then(res => console.log(res.data));

if(1)
dingtalk.sns.getuserinfo_bycode("ee2f9b56e1d53939aebf537466665011").then(res => console.log(res.data));
