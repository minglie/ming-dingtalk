const DingTalk = require('./dingtalk/DingTalk');

dingtalk=new DingTalk({
    corpId:"ding43b3a65d280ba98835c2f4657eb6378f",
    corpSecret:"dufgB390RGxOMDLXn_j-hHVmEieCkCVlUZlF3i9G0gGQq-7YLJuhwQeZftj-e0O",
    ssoSecret:"Os-K1XTRI1axu3GxRF3MlIxryWu8fnke-4ewwF9rrjZSbGeAUmHB5BVR_v0EfRgw",
    appkey: 'dingqy4fr3r9fzserjvn',
    appsecret: 's0tqfENW0JOrEPWrPZLGQky8EdQwCF6VZ2KyqhLZABLGFUlCcUKN7ODuvTUx7MLn',
    sweepCodeLoginAppID:"dingoakle1mbzknj6xhbc0",
    sweepCodeLoginAppsecret:"l9V6p2vT0prP4QwkL1otNksh75EyPSHTL5Hln9Hux0FNwEQnGaaKf1-YYks_eTDM"
})



if(0)
 dingtalk.auth.getToken().then(res => console.log(res));




//获取二维码
if(0)
dingtalk.sns.getQRParmasUrl().then(res => console.log(res));

if(1)
dingtalk.sns.getSnstoken().then(res => console.log(res))