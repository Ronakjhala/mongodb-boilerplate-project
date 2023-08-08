const User = require("../models/UserModel");
const Otp = require("../models/otpModel");

const bcryptjs = require("bcryptjs");
const validation=require('../validations/userValidation');
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sendEmail } = require("../helpers/email");
const res = require("express/lib/response");

const create_token = async (id, email) => {
  try {
    //return await jwt.sign({ _id: id, email:email }, config.secret_jwt);
    const payload = { _id: id, email: email }; // Include id and email in the payload
    return await jwt.sign(payload, config.secret_jwt);
    //return token;
  } catch (error) {
    //res.status(400).send(error.message);
    throw error;
  }
};

const securePassword = async (password) => {
  try {
    const passwordHash = bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const register_user = async (req, res,next) => {
  try {
    const {error}=validation.registrationValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const spassword = await securePassword(req.body.password);
   
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: spassword,
      gender: req.body.gender,
      mobile: req.body.mobile,
      image: req.file.filename,
    });
    const userData = await User.findOne({ email: req.body.email });
    if (userData) {
      res.status(200).send({ success: false, msg: "email already exists" });
    } else {
      const user_data = await user.save();
       return res.status(200).send({
        success: true,
        message: 'Added successfully.',
        //data: port_data,
        statusCode: 201,
    });}
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const user_login = async (req, res) => {
  try {
    const {error}=validation.loginValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    const userData = await User.findOne({email: email});
    if (userData) {
    
      console.log(userData);
      const passwordMatch = await bcryptjs.compare(password, userData.password);
      if (passwordMatch) {
        console.log(userData);
      //  const tokendata = await create_token(userData._id);
      const tokendata = await create_token(userData._id, userData.email);
        console.log(userData);
        const userResult = {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          gender: userData.gender,
          mobile: userData.mobile,
          token: tokendata,
        };
        const response = {
          success: true,
          msg: "user Details",
          //data: userResult,
          token: tokendata,
          id:userData.id
        };
        res.status(200).send(response);
      } else {
        res
          .status(200)
          .send({ success: false, msg: "Login Details are incorrect" });
      }
    }
     else {
      res.status(200).send({ success: false, msg: "Login Details are incorrect" });
      
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update_password = async (req, res) => {
  try {
    const {error}=validation.loginValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const email = req.body.email;
    const password = req.body.password;
    const data = await User.findOne({ email: email });
    if (data) {
      const newPassword = await securePassword(password);
      const UserData = await User.updateOne(
        { email: email },
        { $set: { password: newPassword } }
      );
      res
        .status(200)
        .send({ success: true, msg: "Your Password has been updated" });
    } else {
      res.status(200).send({ success: false, msg: "something getting wrong" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update_profile = async (req, res) => {
  try {
    const {error}=validation.updateProfileValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const id = req.body.id;
    const data = await User.findOne({ _id: id });
    if (data) {
      const UserData = await User.updateOne(
        { _id: id},
        {
          $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            mobile: req.body.mobile,
          },
        }
      );
      res.status(200).send({ success: true, msg: "Profile is updated" });
    } else {
      res.status(200).send({ success: false, msg: "something getting wrong" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_profile = async (req, res) => {
  try {
    const id = req.body.id;
    const UserData = await User.findOne({ _id: id });
    if (UserData) {
      const userResult = {
        firstname: UserData.firstname,
        lastname: UserData.lastname,
        email: UserData.email,
        gender: UserData.gender,
        mobile: UserData.mobile,
      };
      const response = {
        success: true,
        msg: "user Details",
        data: userResult,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ success: false, msg: "something getting wrong" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const verify_email = async(req, res) => {
    try {
      const {error}=validation.verify_email(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
      let otp = Math.random();
      otp = otp * 1000000;
      otp = parseInt(otp);

      let { email } = req.body;
      const user = await User.findOne({ email }).catch((err) => {
        throw err;
      });

      // if (user && user.length <= 0) {
      if (!user) {
        return res.status(400).send("User doesn't exist");
      }
      const otpData = new Otp({
        email: req.body.email,
        otp,
      });

      sendEmail(email, otp);
      const data = await otpData.save();

      if (data) {
        res.status(200).send({ success: true, msg: "Otp sended successfully" });
      }
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  };

const verify_otp = async(req, res) => {
    try {

      const {error}=validation.verify_otp(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
      let { email, otp } = req.body;
      if (!otp) {
        return res
          .status(400)
          .json({ error: "Email not found or OTP has expired" });
      }
      const otp1 = await Otp.findOne({ otp }).catch((err) => {
        console.log("found");
      });
      console.log(otp1);
      if (otp1 && Object.keys(otp1).length > 0) {
        if (otp1.otp == otp) {
          await Otp.deleteOne({ email, otp }).exec();
          return res.status(200).json({ error: "OTP Matched Successfully" });
        } else {
          res.status(400).json({ message: "OTP Matched Successfully" });
        }
      } else {
        res.status(404).json({ message: "OTP not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while verifying the OTP." });
    }
  };

const forget_password = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  const {error}=validation.newPasswordValidation(req.body);
  if(error) 
  {
      return res.status(400).send(error.details[0].message);
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(404).json({ error: "password do not match" });
    }

    const saltRounds = 10;
    const hashedNewPassword = await securePassword(newPassword);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "password reset successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const reset_password = async (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;
  
  const {error}=validation.resetpasswordValidation(req.body);
  if(error) 
  {
      return res.status(400).send(error.details[0].message);
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(404).json({ error: "password do not match" });
    }
    const passwordMatch = await bcryptjs.compare(oldPassword, user.password);
    if (passwordMatch) {
      const saltRounds = 10;
      const hashedNewPassword = await securePassword(newPassword);

      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: "password reset successful" });
    }
    {
      return res.status(404).json({ error: " Current password is wrong " });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  register_user,
  user_login,
  update_password,
  verify_email,
  verify_otp,
  forget_password,
  reset_password,
  view_profile,
  update_profile,
};
