const response=require('../libs/responseLib');

let errorHandler=(err,req,res,next)=>
{
    console.log("Application error handler called");
    console.log(err);

    let apiResponse=response.generate(true,'Some error handler called',500,null);
    res.status(500).send(apiResponse);

}//end error handler func

let notFoundHandler=(req,res,next)=>
{
    console.log('Route not found in the application');
    let apiResponse=response.generate(true,'Route not found in the application',404,null);
    res.status(500).send(apiResponse);
}//end not found handler func

module.exports=
{
    globalErrorHandler:errorHandler,
    globalNotFoundHandler:notFoundHandler
}