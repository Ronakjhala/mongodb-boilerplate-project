const express=require('express');
const tes_route=express();

const bodyParser=require('body-parser');
tes_route.use(bodyParser.json());
tes_route.use(bodyParser.urlencoded({extended:true}));
const multer=require('multer');
const path=require('path');
tes_route.use(express.static('public'));
const storage=multer.diskStorage({
destination:function(req,file,cb){
    cb(null,path.join(__dirname,'../public/userImages'),function(error,success){
if(error) throw error
    });
},
filename:function(req,file,cb)
{
   const name= Date.now()+'-'+file.originalname;
   cb(null,name,function(error1,success1)
   {
if(error1)
 throw error
   })
}
});
const upload=multer({storage:storage});
const testimonial_controller=require('../controllers/testimonialControlller');
const auth=require('../validations/Authentication');

//tes_route.post('/add_testimonial',upload.single('image'),testimonial_controller.add_testimonial);
tes_route.post('/add_testimonial',upload.array('image',5),testimonial_controller.add_testimonial);
 tes_route.post('/update_testimonial',testimonial_controller.update_testimonial);
tes_route.post('/get_testimonial',testimonial_controller.get_testimonial);
tes_route.post('/delete_testimonial',testimonial_controller.delete_testimonial);
tes_route.post('/delete_all_testimonial',testimonial_controller.delete_all);
tes_route.post('/delete_multiple_testimonial',testimonial_controller.delete_multiple);
 tes_route.get('/get_all_testimonial',testimonial_controller.get_all_testimonial);

module.exports=tes_route;
