const express = require('express');
const user_route = express();
const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const  {validator} = require('../helpers/validator');
const path = require('path');
user_route.use(express.static('public'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, '../public/userImages'),
      function (error, success) {
        if (error) throw error;
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name, function (error1, success1) {
      if (error1) throw error;
    });
  },
});
const upload = multer({ storage: storage });
const user_controller = require('../controllers/userControlller');
const auth = require('../validations/Authentication');
user_route.get('/test',auth,function(req,res){
    res.status(200).send({success:true,msg:'Authenticated'})
});

user_route.post('/register_user',upload.single('image'),user_controller.register_user);
user_route.post('/login',user_controller.user_login);
user_route.post('/view_profile', auth, user_controller.view_profile);
user_route.post('/update_password', auth, user_controller.update_password);
user_route.post('/update_profile', auth, user_controller.update_profile);
user_route.post('/verify_email', user_controller.verify_email);
user_route.post('/verify_otp', user_controller.verify_otp);
user_route.post('/forget_password', user_controller.forget_password);
user_route.post('/reset_password', user_controller.reset_password);

module.exports = user_route;  
