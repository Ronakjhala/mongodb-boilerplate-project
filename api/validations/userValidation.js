const mongoose=require('mongoose');
const Joi=require('joi');

function registrationValidation(user_val)
{
    const schema=Joi.object({
        
        firstname:Joi.string().min(3).max(30).required().messages({
         'string.base': `"firstname" should be a type of 'text'`,
         'string.empty': `"firstname" cannot be an empty field`,
         'string.min': `"firstname" should have a minimum length of 3`,
         'any.required': `"firstname" is a required field`
        }),

        lastname:Joi.string().min(3).max(30).required().messages({
            'string.base': `"lastname" should be a type of 'text'`,
            'string.empty': `"lastname" cannot be an empty field`,
            'string.min': `"lastname" should have a minimum length of 3`,
            'any.required': `"lastname" is a required field`
           }),

        email:Joi.string().min(11).max(50).required().email().messages({
         'string.empty': `"email" cannot be an empty field`,
         'any.required': `"email" is a required field`
        }),
       
        gender:Joi.string().required().messages({
            'any.required': `"gender" is a required field`
          }),

        password:Joi.string().min(8).max(250).required().messages({
         'string.base': `"password" should contain at least 1 uppercase,1 lowercase,1 digit'`,
         'string.empty': `"password" cannot be an empty field`,
         'string.min': `"password" should have a minimum length of 8 `,
         'any.required': `"password" is a required field`
        }),
        mobile:Joi.string().length(10).required().messages({
            'any.required': `"mobile" is a required field`,
            'string.empty': `"mobile" cannot be an empty field`,
            'string.length': `"mobile" should have a length of 10 characters`
        })
       
    });
    return schema.validate(user_val);
}
function verify_email(user_val)
{
  const schema=Joi.object({
    email:Joi.string().min(11).max(50).required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
     }),
     
    });
    return schema.validate(user_val);
}
function verify_otp(user_val)
{
  const schema=Joi.object({
    email:Joi.string().min(11).max(50).required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
     }),
     otp:Joi.required().messages({
      'string.base': `"otp is required'`,
  })
     
    });
    return schema.validate(user_val);
}
function loginValidation(user_val)
{
  const schema=Joi.object({
    email:Joi.string().min(11).max(50).required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
     }),
     password:Joi.string().min(8).max(250).required().messages({
      'string.base': `"password" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
      'string.empty': `"password" cannot be an empty field`,
      'string.min': `"password" should have a minimum length of 8 `,
      'any.required': `"password" is a required field`
     }),
    });
    return schema.validate(user_val);
}

function newPasswordValidation(user_val)
{
  const schema=Joi.object({
    email:Joi.string().min(11).max(50).required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
     }),
     newPassword:Joi.string().min(8).max(250).required().messages({
      'string.base': `"newPassword" should contain at least 1 uppercase,1 lowercase,1 digit'`,
      'string.empty': `"newPassword" cannot be an empty field`,
      'string.min': `"newPassword" should have a minimum length of 8 `,
      'any.required': `"newPassword" is a required field`
     }),
     confirmPassword:Joi.valid(Joi.ref('newPassword')).required().messages({
      'string.base': `"confirmPassword" and password should be same'`,
      'any.required': `"newPassword" is a required field`
  }),
 
    }); 
    return schema.validate(user_val);
}

function resetpasswordValidation(user_val)
{
  const schema=Joi.object({
    email:Joi.string().min(11).max(50).required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
     }),
     oldPassword:Joi.string().min(8).max(250).required().messages({
      'string.base': `"password" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
      'string.empty': `"password" cannot be an empty field`,
      'string.min': `"password" should have a minimum length of 8 `,
      'any.required': `"password" is a required field`
     }),
     newPassword:Joi.string().min(8).max(250).required().messages({
      'string.base': `"newPassword" should contain atleast 1 uppercase,1 lowercase,1 digit'`,
      'string.empty': `"newPassword" cannot be an empty field`,
      'string.min': `"newPassword" should have a minimum length of 8 `,
      'any.required': `"newPassword" is a required field`
     }),
     confirmPassword:Joi.valid(Joi.ref('newPassword')).required().messages({
      'string.base': `"confirm password" and password should be same'`,
  })
    });
    return schema.validate(user_val);

}

function updateProfileValidation(user_val)
{
  const schema=Joi.object({
    
    firstname:Joi.string().min(3).max(30).required().messages({
      'string.base': `"firstname" should be a type of 'text'`,
      'string.empty': `"firstname" cannot be an empty field`,
      'string.min': `"firstname" should have a minimum length of 3`,
      'any.required': `"firstname" is a required field`
     }),

     lastname:Joi.string().min(3).max(30).required().messages({
         'string.base': `"lastname" should be a type of 'text'`,
         'string.empty': `"lastname" cannot be an empty field`,
         'string.min': `"lastname" should have a minimum length of 3`,
         'any.required': `"lastname" is a required field`
        }),
  
     gender:Joi.string().required().messages({
         'any.required': `"gender" is a required field`
       }),

     mobile:Joi.string().length(10).required().messages({
         'any.required': `"mobile" is a required field`,
         'string.empty': `"mobile" cannot be an empty field`,
         'string.length': `"mobile" should have a length of 10 characters`
     }),
     id:Joi.string().required().messages({
      'any.required': `"id" is a required field`,
        }),
    
    
});
return schema.validate(user_val);

}

exports.updateProfileValidation=updateProfileValidation;
exports.registrationValidation=registrationValidation;
exports.loginValidation=loginValidation;
exports.newPasswordValidation=newPasswordValidation;
exports.resetpasswordValidation=resetpasswordValidation;
exports.verify_email=verify_email;
exports.registrationValidation=registrationValidation;
exports.verify_otp=verify_otp;

