var M=require("ming_node");var app=M.server();app.listen(8889);app.get("/getById",(req,res)=>{    console.log(req.params);    res.send("ok");})