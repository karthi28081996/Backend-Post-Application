const express=require('express');
const app=express();
const http=require('http');
const mongoose=require('mongoose');
const fs=require('fs');
const bodyParser=require('body-parser');
const appConfig=require('./config/appConfig');
const morgan=require('morgan');

//libs 
const logger=require('./app/libs/loggerLib');
//end libs

/**
 * middlewares
 */

 const appErrHandler=require('./app/middlewares/appErrorHandler');
 const routeLogger=require('./app/middlewares/routeLogger');
 
 app.use(morgan('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded());
 app.use(routeLogger.logIp);
 app.use(appErrHandler.globalErrorHandler);

 /**
 * cors config
 */
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
});//end cors config


 /**
 * include all models here
 */

 let modelPath='./app/models';
 fs.readdirSync(modelPath).forEach(function(file)
 {
    if(~file.indexOf('.js'))
    {
        require(modelPath+'/'+file);
    }
 });//end models


 /**
  * include all routes here
  */

  let routePath='./app/routes';
  fs.readdirSync(routePath).forEach(function(file)
  {
        if(~file.indexOf('.js'))
        {
            let route=require(routePath+'/'+file);
            route.setRoute(app);
        }
  });//end routes

 app.use(appErrHandler.globalNotFoundHandler);

 /**
  * create server using http module
  * listening server
  */
 const server=http.createServer(app);
 console.log(appConfig);
 server.listen(appConfig.port);
 server.on('error',onError);
 server.on('listening',onListening);
 //end lisetning server code

 /**
  * hadnling server error
  */

  function onError(error)
  {
      if(error.syscall != 'listen')
      {
          logger.captureError(error.code+'Syscall is not listening','app.js:onError()',10);
          throw error;
      }

      switch(error.code)
      {
            case 'EACCES':
                    logger.captureError(error.code+'Elevated priveleges is missing','app.js:onError()',10);
                    process.exit(1);
                    break;
            case 'EADDRINUSE':
                    logger.captureError(error.code+'Port address is using somewhere else','app.js:onError()',10);
                    process.exit(1);
                    break;
            default:
                    logger.captureError(error.code+'Some unknown error occured','app.js:onError()',10);
                    throw error;  
      }
  } //end onError func

  /**
   * event handler for listening event
   */

  function onListening()
  {
      let addr=server.address();
      let bind= typeof addr === 'string' ? 'pipe'+addr : 'port '+ addr.port;
      logger.captureInfo('Server is listening on '+bind,'app.js:onListening()',10);
      let db=mongoose.connect(appConfig.database.url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
  }//end onlistening func


  /**
   * handling unhandledrejection
   */

   process.on('unhandledRejection',function(reason,p)
   {
        logger.captureError('Unhandled rejection at : promise :'+p+' reason : '+reason,'app.js:process.on()',10);
   });


   /**
    * handling mongoose connection
    */

    mongoose.connection.on('error',function(error)
    {
        logger.captureError(error,'Mongoose connection error handler : app.js',10);
    });

    mongoose.connection.on('open',function(error)
    {
        if(error)
        {
            logger.captureError(error,'Mongoose connection open handler : app.js',10);
        }
        else
        {
            logger.captureInfo('Datebase connection established successfully','Mongoose connection open handler : app.js',10);
        }
    });

