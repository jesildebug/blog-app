const express= require('express');
const  router = express.Router();
const Post= require('../models/Post')




// 
// GET/
// HOME
// 



// router

router.get('' , async(req,res)=>{
    try {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog Created with NodeJs, Express & MongoDb."
        }
        let perPage=5;
        let page = req.query.page||1
        
        const data = await Post.aggregate([ { $sort: {createdAt: -1}}]).skip(perPage * page-perPage).limit(perPage).exec();
        
        
        const count = await Post.count();
        const nextPage = parseInt(page)+1;
        const hasNextPage = nextPage <= Math.ceil(count/perPage)



        // const data = await Post.find()
        res.render('index', {locals,data,current:page,nextPage: hasNextPage ?nextPage :null})
    } catch (error) {
        console.log(error);
    }

})

router.get('/about' , (req,res)=>{
    res.render('about')
})

router.get('/contact' , (req,res)=>{
    res.render('contact')
})



// 
// GET/
// POST :id 
// 

router.get('/post/:id', async (req, res) => {
    try {
     
        const locals = {
          title: "NodeJs Blog",
          description: "Simple Blog created with NodeJs, Express & MongoDb.",
        }

        let slug = req.params.id;


        const data = await Post.findById({ _id: slug });
        res.render('post', { locals,data });
      } catch (error) {
        console.log(error);
      }
    
    });
  
       
// 
// Post/
// Post - searchTerm
// 
  
router.post('/search', async (req, res) => {
    try {
     
        const locals = {
          title: "Search",
          description: "Simple Blog created with NodeJs, Express & MongoDb.",
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await Post.find({
            $or:[
                {title: { $regex: new RegExp(searchNoSpecialChar ,"i")}},
                {body: {$regex: new RegExp(searchNoSpecialChar ,"i")}}
            ]
        });
        res.render('search', { data,locals});
      } catch (error) {
        console.log(error);
      }
    
    });
  
  


// function insertPostData() {
//     Post.insertMany([
//         {
//             title:"Building a Blog",
//             body:"This is the body text"
//         },
//         {
//             title:"NodeJs limiting network Traffic",
//             body:"How to limit incoming and outgoing traffic in node js?"
//         },
//         {
//             title:"Learn Morgan-Http Request logger for NodeJs",
//             body:"Learn Morgan"
//         },
//         {
//             title:"Learn Basics of NodeJs and its Architecture",
//             body:"Understand basics about nodejs architecture like event loop etc.."
//         },
//         {
//             title:"Deploying your Nodejs app on Heroku or AWS EC2 instance.",
//             body:"Steps required while deploying an application using heroku."
//         },
//         {
//             title: "Introduction To MongoDB With Examples In NodeJS Application Development ",
//             body :"In this article we will learn how to use Mongodb with examples in our Node JS"
//         },
//         {
//             title : 'What Is JWT And How It Can Be Used For Authentication',
//             body  : `JWT stands for JSON Web Token which can be used as authentication method over HTTP`
//         }
//     ])
// }
// insertPostData()















module.exports = router;


