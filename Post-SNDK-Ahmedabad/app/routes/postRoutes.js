const appConfig=require('./../../config/appConfig');
const postControllers=require('./../controllers/postControllers');

let setRoute=(app)=>
{
    let apiUrl=`${appConfig.apiVersion}/post`;

    app.post(`${apiUrl}/create`,postControllers.createPost);
    
    app.put(`${apiUrl}/update/:postId`,postControllers.updatePost);

    app.get(`${apiUrl}/details/:postId`,postControllers.getPostDetails);

    app.get(`${apiUrl}/get/all`,postControllers.getPost);
    
    app.post(`${apiUrl}/delete/:postId`,postControllers.deletePost);


}//end setRoute

module.exports=
{
    setRoute:setRoute
}