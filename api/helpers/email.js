var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: 'shrutisachpara.shivinfotech@gmail.com',
      pass: 'mlnouydlcywezkhn'
    }
  });

const sendEmail = async (email, otp)=>{
    var mailOptions = {
      to: email,
      subject: 'Sending Email using Node.js',
      text: `It's OTP: ${otp}`
    };
    
    return transporter.sendMail(mailOptions, function(error, info){
      console.log('error', error);
      console.log('info', info.response);
      if (error) {
        throw error;
      } else {
        console.log(info.response);
      }
    });
}  
  module.exports = {
    sendEmail
  };

  

