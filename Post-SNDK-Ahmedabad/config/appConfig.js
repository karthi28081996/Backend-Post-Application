/**
 * Post application configuration
 */

 let appConfig=
 {
     port:3000,
     allowedOrgins:"*",
     env:"dev",
     database:
     {
         url:'mongodb://localhost:27017/postDB'
     },
     apiVersion:'/api/v1.0.0'
 }

 module.exports=
 {
     port:appConfig.port,
     allowedOrgins:appConfig.allowedOrgins,
     env:appConfig.env,
     database:appConfig.database,
     apiVersion:appConfig.apiVersion
 }