# ming-dingtalk
dingdingSDK


    
```javascript
const DingTalk = require('ming-dingtalk');

dingtalk=new DingTalk({
    corpId:"ding43b3a65d280ba98835c2f4657eb6378f",
    corpSecret:"dufgB390RGxOMDLXn_j-hHVmEieCkCVlUZlF3i9G0gGQq-7YLJuhwQeZftj-e0O",
    ssoSecret:"Os-K1XTRI1axu3GxRF3MlIxryWu8fnke-4ewwF9rrjZSbGeAUmHB5BVR_v0EfRgw",
    appkey: 'dingqy4fr3r9fzserjvn',
    appsecret: 's0tqfENW0JOrEPWrPZLGQky8EdQwCF6VZ2KyqhLZABLGFUlCcUKN7ODuvTUx7MLn',
    agentId:223960246,
    sweepCodeLoginAppID:"dingoakle1mbzknj6xhbc0", //ɨ���½��appId
    sweepCodeLoginAppsecret:"l9V6p2vT0prP4QwkL1otNksh75EyPSHTL5Hln9Hux0FNwEQnGaaKf1-YYks_eTDM"// //ɨ���½��Appsecret
})

//��ȡaccessToken
if(0)
dingtalk.auth.getToken().then(res => console.log(res));



//��ȡ�û�����
dingtalk.user.get("manager6712").then(res => console.log(res.data));
//��ȡ�����û�userid�б�
//dingtalk.user.getDeptMember("71433174").then(res => console.log(res.data));
//��ȡ�����û�
//dingtalk.user.simplelist({department_id:"71433174",offset:0,size:5}).then(res => console.log(res.data));
//��ȡ�����û�����
//dingtalk.user.listbypage({department_id:"71433174",offset:0,size:5}).then(res => console.log(res.data));
//��ȡ����Ա�б�
//dingtalk.user.get_admin().then(res => console.log(res.data));
//��ȡ����ԱͨѶ¼Ȩ�޷�Χ
//dingtalk.user.get_admin_scope("manager6712").then(res => console.log(res.data));
//����unionid��ȡuserid
//dingtalk.user.getUseridByUnionid("O6VquZgrammhMIIWPXM2egiEiE").then(res => console.log(res.data));

if(0)
dingtalk.user.getuserinfo("199a57636b713257b6ab002b2603ab1e").then(res => console.log(res.data));



//�����û�
if(0)
dingtalk.user.create({
    "userid": "zhangsan00",
    "name": "����",
    "department": [71528142],
    "position": "��Ʒ����",
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
        "����":"����",
        "����":"24"
    }
}).then(res => console.log(res.data));



//�����û�
if(0)
    dingtalk.user.update({
        "userid": "zhangsan",
        "name": "����4",
        "department": [71528142],
        "position": "��Ʒ����",
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
            "����":"����",
            "����":"24"
        }
    }).then(res => console.log(res.data));


//ɾ���û�
if(0)
dingtalk.user.delete("zhangsan00").then(res => console.log(res.data));



//��ȡ�Ӳ���ID�б�
if(0)
dingtalk.department.list_ids("71528142").then(res => console.log(res.data));


//��ȡ�����б�
if(0)
dingtalk.department.list({id:"71433174",fetch_child:true}).then(res => console.log(res.data));


//��ȡ��������

if(0)
dingtalk.department.get("71433174").then(res => console.log(res.data));

//��ѯ���ŵ������ϼ�������·��
if(0)
dingtalk.department.list_parent_depts_by_dept("71433174").then(res => console.log(res.data));


//��ѯָ���û��������ϼ�������·��
if(0)
dingtalk.department.list_parent_depts("manager6712").then(res => console.log(res.data));


//��ȡ��ҵԱ������
if(0)
dingtalk.department.get_org_user_count().then(res => console.log(res.data));


//��������
if(0)
dingtalk.department.create(
    {
        "name": "������ҵ��",
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




//���²���
if(0)
dingtalk.department.update(
    {
        id:"114433438",
        "name": "������ҵ��1",
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


//��ȡ��ɫ�б�
if(0)
dingtalk.role.list().then(res => console.log(JSON.stringify(res.data)));


//��ȡ��ɫ�µ�Ա���б�
if(0)
dingtalk.role.simplelist( {role_id:"327619019",size:20,offset:0}).then(res => console.log(res.data));

//��ȡ��ɫ��
if(0)
dingtalk.role.getrolegroup( "327619001").then(res => console.log(res.data));

//��ȡ��ɫ����
if(0)
dingtalk.role.getrole(327619016).then(res => console.log(res.data));

if(0)
dingtalk.role.add_role({roleName:"ϵ����5",groupId:327619006}).then(res => console.log(res.data));

if(0)
dingtalk.role.update_role({roleName:"ϵ����1",roleId:447810818}).then(res => console.log(res.data));

//ɾ����ɫ
if(0)
dingtalk.role.deleterole(447864441).then(res => console.log(res.data));


if(0)
dingtalk.role.add_role_group("��1").then(res => console.log(res.data));


if(0)
dingtalk.role.addrolesforemps({roleIds:"327619009,327619025",userIds:"manager6712"}).then(res => console.log(res.data));


//����ɾ��Ա����ɫ
if(0)
dingtalk.role.removerolesforemps({roleIds:"327619009,327619025",userIds:"manager6712"}).then(res => console.log(res.data));


//��ȡ�ⲿ��ϵ�˱�ǩ�б�
if(0)
 dingtalk.extcontact.listlabelgroups().then(res => console.log(res.data));


//��ȡ�ⲿ��ϵ�˱�ǩ�б�
if(0)
 dingtalk.extcontact.list().then(res => console.log(res.data));

//��ȡ��ҵ�ⲿ��ϵ������

if(0)
dingtalk.extcontact.get("1918472868114179").then(res => console.log(res.data));

if(0)
dingtalk.sso.gettoken().then(res => console.log(res.data));

if(0)
dingtalk.sso.ming_getuserinfoByCode("121a2aabe42e3778af25201bf4c73cb7").then(res => console.log(res.data));

if(0)
dingtalk.sns.getuserinfo_bycode("ee2f9b56e1d53939aebf537466665011").then(res => console.log(res.data));


if(0)
    dingtalk.auth.getToken().then(res => console.log(res));




//��ȡ��ά��
if(0)
    dingtalk.sns.getQRParmasUrl().then(res => console.log(res));

if(0)
    dingtalk.sns.getSnstoken().then(res => console.log(res))



if(0)
    dingtalk.message.corpconversation_asyncsend_v2().then(res => console.log(res.data))


if(0)
    dingtalk.message.corpconversation_getsendprogress(35138977623).then(res => console.log(res.data))



if(0)
    dingtalk.message.corpconversation_getsendresult(35138977623).then(res => console.log(res.data))



if(0)
    dingtalk.jsapi.getTicket().then(res => console.log(res))


if(0)
dingtalk.jsapi.getJSConfig("https://github.com/").then(res => console.log(res))


 ```