const mongoose=require('mongoose');
const Joi=require('joi').extend(require('@joi/date'));;

function PortfolioValidation(user_val)
{
    const schema=Joi.object({

        projectCategory:Joi.string().min(3).max(30).required().messages({
         'string.base': `"projectCategory" should be a type of 'text'`,
         'string.empty': `"projectCategory" cannot be an empty field`,
         'string.min': `"projectCategory" should have a minimum length of 3`,
         'any.required': `"projectCategory" is a required field`
        }),

        projectName:Joi.string().min(8).max(50).required().messages({
            'string.base': `"projectName" should be a type of 'text'`,
            'string.empty': `"projectName" cannot be an empty field`,
            'string.min': `"projectName" should have a minimum length of 8`,
            'any.required': `"projectName" is a required field`
           }),
           projectTitle:Joi.string().min(8).max(50).required().messages({
            'string.base': `"projectTitle" should be a type of 'text'`,
            'string.empty': `"projectTitle" cannot be an empty field`,
            'string.min': `"projectTitle" should have a minimum length of 8`,
            'any.required': `"projectTitle" is a required field`
           }),
           ID:Joi.string(),
          
        
           projectDate:Joi.date().format('DD-MM-YYYY').utc(),

        
              
    });
    return schema.validate(user_val);
}
exports.PortfolioValidation=PortfolioValidation;
