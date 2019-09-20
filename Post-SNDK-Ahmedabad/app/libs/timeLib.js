/**
 * Time and timezone utility function
 */

const moment=require('moment');
const momentTimezone=require('moment-timezone');
const timezone='Asia/Calcutta';

let now=()=>
{
    return moment.utc().format();
}

let getLocalTime=()=>
{
    return moment().format('LLLL'); 
}

let convertToLocalTime=(time)=>
{
    return momentTimezone.tz(time,timezone).format('LLLL');
}

module.exports=
{
    now:now,
    getLocalTime:getLocalTime,
    convertToLocalTime:convertToLocalTime
}