var M=require("ming_node");var app=M.server();app.listen(3000);const DingTalk = require('../src/dingtalk/DingTalk');//微应用,E应用随便用一个appkey,appsecret//appkey,appsecret的作用主要是域名拦截与权限控制dingtalk=new DingTalk({    appkey: 'dingqy4fr3r9fzserjvn',    appsecret: 's0tqfENW0JOrEPWrPZLGQky8EdQwCF6VZ2KyqhLZABLGFUlCcUKN7ODuvTUx7MLn'})app.post("/login",async (req,res)=>{    console.log("AAAAA",req.params)    let r1=await dingtalk.user.getuserinfo(req.params.authCode)    let r2=await dingtalk.user.get(r1.data.userid)    let r3={};    r3.result={userId:r2.data.userid, userName:r2.data.name};    console.log("BBBBBBBB",r3)    res.send(JSON.stringify(r3));})