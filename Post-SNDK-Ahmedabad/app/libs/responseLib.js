/**
 * Standartize all resposes
 */

let generate=(error,message,status,data)=>
{
    let responseMessage=
    {
        error:error,
        message:message,
        status:status,
        data:data
    }
    return responseMessage;
}//end generate func

module.exports=
{
    generate:generate
}