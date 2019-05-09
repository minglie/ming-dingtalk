const DingTalk = require('./dingtalk/DingTalk');

dingtalk=new DingTalk({
    corpId: 'dingqy4fr3r9fzserjvn',
    corpSecret: 's0tqfENW0JOrEPWrPZLGQky8EdQwCF6VZ2KyqhLZABLGFUlCcUKN7ODuvTUx7MLn',
})




//获取用户详情
//dingtalk.user.get({userid:"manager6712"}).then(res => console.log(res.data));

//获取部门用户userid列表
//dingtalk.user.getDeptMember({deptId:"71433174"}).then(res => console.log(res.data));

//获取部门用户
//dingtalk.user.simplelist({department_id:"71433174",offset:0,size:5}).then(res => console.log(res.data));


//获取部门用户详情
dingtalk.user.listbypage({department_id:"71433174",offset:0,size:5}).then(res => console.log(res.data));


//dingtalk.user.readMembers({department_id:71433174}).then(res => console.log(res.data));






