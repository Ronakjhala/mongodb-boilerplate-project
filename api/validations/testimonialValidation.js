const mongoose=require('mongoose');
const Joi=require('joi');

function TestimonialValidation(user_val)
{
    const schema=Joi.object({

        name:Joi.string().min(3).max(30).required().messages({
         'string.base': `"Name" should be a type of 'text'`,
         'string.empty': `"Name" cannot be an empty field`,
         'string.min': `"Name" should have a minimum length of 3`,
         'any.required': `"Name" is a required field`
        }),
        designation:Joi.string().min(3).max(30).required().messages({
            'string.base': `"designation" should be a type of 'text'`,
            'string.empty': `"designation" cannot be an empty field`,
            'string.min': `"designation" should have a minimum length of 3`,
            'any.required': `"designation" is a required field`
           }),
           testimonialtype:Joi.string().min(3).max(30).required().messages({
            'string.base': `"testimonialtype" should be a type of 'text'`,
            'string.empty': `"testimonialtype" cannot be an empty field`,
            'string.min': `"testimonialtype" should have a minimum length of 3`,
            'any.required': `"testimonialtype" is a required field`
           }),
           testimonialdescription:Joi.string().min(8).max(50).required().messages({
            'string.base': `"testimonialdescription" should be a type of 'text'`,
            'string.empty': `"testimonialdescription" cannot be an empty field`,
            'string.min': `"testimonialdescription" should have a minimum length of 8`,
            'any.required': `"testimonialdescription" is a required field`
           }),

           
        
              
    });
    return schema.validate(user_val);
}
exports.TestimonialValidation=TestimonialValidation;
