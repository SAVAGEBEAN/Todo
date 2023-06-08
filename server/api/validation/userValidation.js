const Joi = require('@hapi/joi');

const userValidation = async(data)=>{

    const schema = Joi.object({
        email : Joi.string().required().email(),
        password : Joi.string().required().min(8)
    });
    
        return schema.validate({email : data.email, password : data.password});
        
  
}
module.exports = userValidation;