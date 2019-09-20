const mongoose=require('mongoose');
const schema=mongoose.Schema;

const postModelSchema=new schema(
    {
        postId:
        {
            type:String,
            unique:true,
            index:true
        },
        postName:
        {
            type:String,
            default:''
        },
        postDescription:
        {
            type:String,
            default:''
        },
        postCategory:
        {
            type:String,
            default:''
        },
        postStatus:
        {
            type:String,
            default:''
        },
        createdOn:
        {
            type:String,
            default:Date.now()
        }
    }
);

mongoose.model('postModel',postModelSchema);