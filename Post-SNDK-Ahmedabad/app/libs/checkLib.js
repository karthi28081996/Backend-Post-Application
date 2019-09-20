/**
 * variable checking library
 * ***isEmpty()
 * ***trim()
 */

 let trim=(value)=>
 {
     let str=String(value);
     return str.replace(/^\s+|\s+$/,'');
 }//end trim function

 let isEmpty=(value)=>
 {
     if(value === null || 
        value === undefined ||
        value.length === 0 || 
        trim(value) === '')
        {
            return true;
        }
        else
        {
            return false;
        }
 }//end isempty function

 module.exports=
 {
     trim:trim,
     isEmpty:isEmpty
 }