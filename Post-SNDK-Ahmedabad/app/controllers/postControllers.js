const mongoose=require('mongoose');
const shortId=require('shortid');

//inlcude libs here
const timeLib=require('./../libs/timeLib');
const response=require('./../libs/responseLib');
const logger=require('./../libs/loggerLib');
const checkLib=require('./../libs/checkLib');

//include model here
const postModel=mongoose.model('postModel');


let createPost=(req,res)=>
{
    let newPost=new postModel(
         {
            postId:shortId.generate(),
            postName:req.body.name,
            postDescription:req.body.description,
            postCategory:req.body.category,
            postStatus:req.body.status,
            createdOn:timeLib.getLocalTime()
        }
    );
    newPost.save(
        (err,data)=>
        {
            if(err)
            {
                logger.captureError('Error while creating post','postCOntroller.js:createPost',10);
                let apiResponse=response.generate(true,'Error while creating post . Please try again',500,null);
                res.send(apiResponse);
            }
            else
            {

                logger.captureInfo('Post created successfully','postCOntroller.js:createPost',10);
                let apiResponse=response.generate(false,'Post created successfully',200,data);
                res.send(apiResponse);
            }
        }
    )

}//end create post func


let updatePost=(req,res)=>
{

    let findPostDetails=()=>
    {
        return new Promise((resolve,reject)=>
        {
            postModel.findOne({postId:req.params.postId})
            .select('-_id -__v')
            .lean()
            .exec(
                (err,data)=>
                {
                    if(err)
                    {
                        logger.captureError('Error while updating post','postCOntroller.js:updatePost',10);
                        let apiResponse=response.generate(true,'Error while updating post . Please try again',500,null);
                        reject(apiResponse);
                    }
                    else if(checkLib.isEmpty(data))
                    {
                        logger.captureError('Post not found','postCOntroller.js:updatePost',10);
                        let apiResponse=response.generate(true,'Post not found . Please create one',404,null);
                        reject(apiResponse);
                    }
                    else
                    {
                           resolve(data);
                    }
                }
            )
        });
    }//end find post details func

    let update=(data)=>
    {
        return new Promise(
            (resolve,reject)=>
            {
                let details=req.body;
                postModel.updateOne({postId:data.postId},details,{multi:true})
                .exec(
                    (err,updatedData)=>
                    {
                        if(err)
                        {
                            logger.captureError('Error while updating post','postCOntroller.js:updatePost',10);
                            let apiResponse=response.generate(true,'Error while updating post . Please try again',500,null);
                            reject(apiResponse);
                        }
                        else
                        {
            
                            logger.captureInfo('Post updated successfully','postCOntroller.js:updatePost',10);
                            let apiResponse=response.generate(false,'Post updated successfully',200,updatedData);
                            resolve(apiResponse);
                        }
                    }
                )
            }
        )
    } //end update inner func 

    findPostDetails(req,res)
    .then(update)
    .then(
        (success)=>
        {
            res.send(success);
        }
    )
    .catch(
        (err)=>
        {
            res.status(err.status).send(err);
        }
    )

}//end update func

let getPostDetails=(req,res)=>
{
    postModel.findOne({postId:req.params.postId})
    .select('-__v -_id')
    .lean()
    .exec(
        (err,data)=>
        {
            if(err)
                    {
                        logger.captureError('Error while getting details of post','postCOntroller.js:getPostDetails',10);
                        let apiResponse=response.generate(true,'Error while getting details of post . Please try again',500,null);
                        res.send(apiResponse);
                    }
                    else if(checkLib.isEmpty(data))
                    {
                        logger.captureError('Post not found','postCOntroller.js:getPostDetails',10);
                        let apiResponse=response.generate(true,'Post not found . Please create one',404,null);
                        res.send(apiResponse);
                    }
                    else
                    {
                        logger.captureInfo('Post found successfully','postCOntroller.js:getPostDetails',10);
                        let apiResponse=response.generate(false,'Post found successfully',200,data);
                        res.send(apiResponse);
                    }
        }
    )
}//end getPostDetails

let deletePost=(req,res)=>
{
    
    let findPostDetails=()=>
    {
        return new Promise((resolve,reject)=>
        {
            postModel.findOne({postId:req.params.postId})
            .select('-_id -__v')
            .lean()
            .exec(
                (err,data)=>
                {
                    if(err)
                    {
                        logger.captureError('Error while deleting post','postCOntroller.js:deletePost',10);
                        let apiResponse=response.generate(true,'Error while deleting post . Please try again',500,null);
                        reject(apiResponse);
                    }
                    else if(checkLib.isEmpty(data))
                    {
                        logger.captureError('Post not found','postCOntroller.js:deletepost',10);
                        let apiResponse=response.generate(true,'Post not found . Please create one',404,null);
                        reject(apiResponse);
                    }
                    else
                    {
                           resolve(data);
                    }
                }
            )
        });
    }//end find post details func

    let delPost=(data)=>
    {
        return new Promise(
            (resolve,reject)=>
            {
                postModel.findOneAndDelete({postId:data.postId})
                .exec(
                    (err,updatedData)=>
                    {
                        if(err)
                        {
                            logger.captureError('Error while deleting post','postCOntroller.js:deletePost',10);
                            let apiResponse=response.generate(true,'Error while deleting post . Please try again',500,null);
                            reject(apiResponse);
                        }
                        else
                        {
            
                            logger.captureInfo('Post deleted successfully','postCOntroller.js:deletPost',10);
                            let apiResponse=response.generate(false,'Post deleted successfully',200,updatedData);
                            resolve(apiResponse);
                        }
                    }
                )
            }
        )
    } //del post func end

    
    findPostDetails(req,res)
    .then(delPost)
    .then(
        (success)=>
        {
            res.send(success);
        }
    )
    .catch(
        (err)=>
        {
            res.status(err.status).send(err);
        }
    )
}//end delete post


let getAllPost=(req,res)=>
{
    
    postModel.find()
    .select('-__v -_id')
    .lean()
    .exec(
        (err,data)=>
        {
            if(err)
                    {
                        logger.captureError('Error while getting details of post','postCOntroller.js:getAllPost',10);
                        let apiResponse=response.generate(true,'Error while getting details of post . Please try again',500,null);
                        res.send(apiResponse);
                    }
                    else if(checkLib.isEmpty(data))
                    {
                        logger.captureError('Post not found','postCOntroller.js:getAllPost',10);
                        let apiResponse=response.generate(true,'Post not found . Please create one',404,null);
                        res.send(apiResponse);
                    }
                    else
                    {
                        logger.captureInfo('Post found successfully','postCOntroller.js:getAllPost',10);
                        let apiResponse=response.generate(false,'Post found successfully',200,data);
                        res.send(apiResponse);
                    }
        }
    )

}

module.exports=
{
    createPost:createPost,
    getPostDetails:getPostDetails,
    deletePost:deletePost,
    updatePost:updatePost,
    getPost:getAllPost
}