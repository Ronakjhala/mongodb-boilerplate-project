const mongoose=require('mongoose');
const Joi=require('joi').extend(require('@joi/date'));;

function ContactValidation(user_val)
{
    const schema=Joi.object({

        contactName:Joi.string().min(3).max(30).required().messages({
         'string.base': `"contactName" should be a type of 'text'`,
         'string.empty': `"contactName" cannot be an empty field`,
         'string.min': `"contactName" should have a minimum length of 3`,
         'any.required': `"contactName" is a required field`
        }),

        message:Joi.string().min(8).max(50).required().messages({
            'string.base': `"message" should be a type of 'text'`,
            'string.empty': `"message" cannot be an empty field`,
            'string.min': `"message" should have a minimum length of 8`,
            'any.required': `"message" is a required field`
           }),

           contactNumber:Joi.string().length(10).required().messages({
            'any.required': `"mobile" is a required field`,
            'string.empty': `"mobile" cannot be an empty field`,
            'string.length': `"mobile" should have a length of 10 characters`
        }),
        email:Joi.string().min(11).max(50).required().email().messages({
            'string.empty': `"email" cannot be an empty field`,
            'any.required': `"email" is a required field`
           }),
           date:Joi.date().format('DD-MM-YYYY').utc(),

        
              
    });
    return schema.validate(user_val);
}
exports.ContactValidation=ContactValidation;
