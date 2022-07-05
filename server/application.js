const mysql=require('mysql')
const {mysqlConfig}=require('./config')
const {generateCode}=require('./utils')
module.exports=function CodeGeneratorApplication(middilewares,devServer){
    if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
    }
    const conn=mysql.createConnection(mysqlConfig)
    devServer.app.get('/api/users', (_, response) => {
        conn.query("select t1.TABLE_NAME,t1.`ENGINE`,t1.TABLE_COMMENT,t1.CREATE_TIME from information_schema.`TABLES` t1",function(error,result,fields){
            if(error) throw error
            response.json(result);
        })
    });
    devServer.app.get('/api/template',(_,response)=>{
        console.log(generateCode('wms_shop'))
        response.send(generateCode('wms_shop'))
    })
    return middilewares
}
