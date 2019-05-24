var M=require('ming_node')
var https = require('https');
var url_module=require('url');
var http=require('http');
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
var ding={};

M.i=0;

//转向钉钉扫码的url
con_url1="https://oapi.dingtalk.com/connect/qrconnect?" +
    "appid=dingoakle1mbzknj6xhbc0&" +
    "response_type=code&" +
    "scope=snsapi_login&" +
    "state=STATE&" +
    "redirect_uri=http://127.0.0.1:7005/user/callback"

con_appid="dingoakle1mbzknj6xhbc0";
con_appsecret="l9V6p2vT0prP4QwkL1otNksh75EyPSHTL5Hln9Hux0FNwEQnGaaKf1-YYks_eTDM";
con_corpID="ding43b3a65d280ba98835c2f4657eb6378f";
con_corpSecret="3dufgB390RGxOMDLXn_j-hHVmEieCkCVlUZlF3i9G0gGQq-7YLJuhwQeZftj-e0O";
con_SSOsecret="Os-K1XTRI1axu3GxRF3MlIxryWu8fnke-4ewwF9rrjZSbGeAUmHB5BVR_v0EfRgw";
con_ChannelSecret="dAjUH5olN3wy4iyvgA2zd3Uyf_4pWJEw05a2HI9HWFZ5wQYatZYd8Nr9XaYpNRdk";


M.resultObj=null;


console.log(con_url1)







//1.获取扫码后的code
var server=http.createServer(function (request, response) {
    if(M.i==1) return;
    M.i=1;
    var urlObj=url_module.parse(request.url,true);
    ding.code=urlObj.query.code;
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end("0.code-->"+ ding.code);
    event.emit('0');
    event.emit('closeServer');
}).listen(7005);

console.log('等用户扫码...');
event.on('closeServer', function() {
    server.close(function () {
        console.log("server close");
    });
})




//2.拿到钉钉的access_token
//需要appid与appsecret两个常量
event.on('0', function(){
        console.log("------------"+ding.code);
        //获取access_token
        M.getHttps(
            "https://oapi.dingtalk.com/sns/gettoken",
            function (date) {
                M.resultJSON=date;
                console.log("1.已获取access_token的JSON")
                console.log("1.1 -->"+M.resultJSON);
                var resultObj=JSON.parse(M.resultJSON);
                ding.access_token=resultObj.access_token;
                event.emit('1');
            },
            {
                appid:con_appid,
                appsecret:con_appsecret
            }
        )
    }
)



//3.获取persistent_code,openId,unionid
//需要access_token与code
event.on('1', function() {
    console.log("2.-->ding.access_token="+ding.access_token);
    console.log("2.1-->tmp_auth_code="+ding.code);

    var html='';
    var options = {
        hostname:url_module.parse("https://oapi.dingtalk.com").hostname,
        port: 443,				// 端口固定
        path: '/sns/get_persistent_code?access_token='+ding.access_token,
        method: "POST",			// get和post请求
        json: true,				// 此地方表示json
        rejectUnauthorized: true,  //请校验服务器证书，否则ssl没有意义。
        headers: {
            'Accept': 'application/json;version=2.0',
            'Content-Type': 'application/json',    //此地方和json很有关联，需要注意
        }
    }

    var post_data = {
        "tmp_auth_code": ding.code
    }
    var json = JSON.stringify(post_data);
    var req = https.request(options, function (res) {
        console.log('Status:',res.statusCode);
        res.setEncoding('utf-8');
        res.on('data',function(chunk){
            html+=chunk;
        });
        res.on('end',function(){
            M.resultJSON=html;
            console.log("3-->"+M.resultJSON);
            var resultObj=JSON.parse(M.resultJSON);
            ding.openid=resultObj.openid;
            ding.persistent_code=resultObj.persistent_code;
            ding.unionid=resultObj.unionid;
            event.emit('2');

        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(json);
    req.end();


});




//4.获取用户授权的 sns_token
event.on('2', function() {
    var html='';
    var options = {
        hostname:url_module.parse("https://oapi.dingtalk.com").hostname,
        port: 443,				// 端口固定
        path: '/sns/get_sns_token?access_token='+ding.access_token,
        method: "POST",			// get和post请求
        json: true,				// 此地方表示json
        rejectUnauthorized: true,  //请校验服务器证书，否则ssl没有意义。
        headers: {
            'Accept': 'application/json;version=2.0',
            'Content-Type': 'application/json',             //此地方和json很有关联，需要注意
        }
    }

    var post_data = {
        "openid":  ding.openid,
        "persistent_code": ding.persistent_code
    }
    var json = JSON.stringify(post_data);
    var req = https.request(options, function (res) {
        console.log('Status:',res.statusCode);
        res.setEncoding('utf-8');
        res.on('data',function(chunk){
            html+=chunk;
        });
        res.on('end',function(){
            M.resultJSON=html;
            console.log("4 -->"+M.resultJSON);
            var resultObj=JSON.parse(M.resultJSON);
            ding.sns_token=resultObj.sns_token;
            console.log("4.1-->");
            console.log(ding);
            event.emit('3');
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(json);
    req.end();
});





//5.用 sns_token拿用户信息
event.on('3', function() {
    var html='';
    var options = {
        hostname:url_module.parse("https://oapi.dingtalk.com").hostname,
        port: 443,				// 端口固定
        path: "/sns/getuserinfo?sns_token="+ding.sns_token,
        method: "GET",			// get和post请求
        json: true,				// 此地方表示json
        rejectUnauthorized: true,  //请校验服务器证书，否则ssl没有意义。
        headers: {
            'Accept': 'application/json;version=2.0',
            'Content-Type': 'application/json',             //此地方和json很有关联，需要注意
        }
    }

    var req = https.request(options, function (res) {
        console.log('Status:',res.statusCode);
        res.setEncoding('utf-8');
        res.on('data',function(chunk){
            html+=chunk;
        });
        res.on('end',function(){
            M.resultJSON=html;
            var user=JSON.parse(M.resultJSON);
            console.log("5.user-->")
            console.log(user);
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
})



