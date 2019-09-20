const logger=require('pino')();
const time=require('./timeLib');

/**
 * capture error logs using pino module
 */

 let captureError=(errorMessage,errorOrgin,errorLevel)=>
 {
     let timestamp=time.getLocalTime();
     let errorResponse=
     {
         errorMessage:errorMessage,
         errorOrgin:errorOrgin,
         errorLevel:errorLevel,
         timestamp:timestamp
     }
     logger.error(errorResponse);
 }//end capture error func

 /**
  * capture info logs using pino module
  */
 
  let captureInfo=(infoMessage,infoOrgin,infoLevel)=>
  {
      let timestamp=time.getLocalTime();
      let infoResponse=
      {
          infoMessage:infoMessage,
          infoOrgin:infoOrgin,
          infoLevel:infoLevel,
          timestamp:timestamp
      };
      logger.info(infoResponse);
  }//end capture info func

  module.exports=
  {
      captureError:captureError,
      captureInfo:captureInfo
  }