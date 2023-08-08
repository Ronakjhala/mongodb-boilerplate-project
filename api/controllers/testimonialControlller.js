const Testimonial = require('../models/testimonialModel');
const validation=require('../validations/testimonialValidation');
const add_testimonial = async (req, res) => {
  try {
    const {error}=validation.TestimonialValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    console.log('req.body', req.body);
    const img = req.files.map((image) => image.filename);
    const tes = new Testimonial({
      name: req.body.name,
      testimonialtype: req.body.testimonialtype,
      designation: req.body.designation,
      testimonialdescription: req.body.testimonialdescription,
      image: img,
      //image: req.file.filename
    });

    const tes_data = await tes.save();
    if (tes_data) {
      return res.status(200).send({
        success: true,
        message: 'Added successfully.',
        //data: port_data,
        statusCode: 201,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_testimonial = async (req, res) => {
  try {
    const ID = req.body.ID;
    const UserData = await Testimonial.findOne({ _id: ID });
    if (UserData) {
      const userResult = {
        name: UserData.name,
        testimonialtype: UserData.testimonialtype,
        designation: UserData.designation,
        testimonialdescription: UserData.testimonialdescription,
        image:UserData.image,
      };
      const response = {
        success: true,
        msg: 'Testimonial Details',
        data: userResult,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ success: false, msg: 'Testimonial is not found' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_all_testimonial = async (req, res) => {
  try {
    const userdata = await Testimonial.find({});
    const response = {
      success: true,
      msg: 'All Testimonials',
      data: userdata,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update_testimonial = async (req, res) => {
  try {
    const ID = req.body.ID;
    const {error}=validation.TestimonialValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const data = await Testimonial.findOne({ _id: ID });
    if (data) {
      const UserData = await Testimonial.updateOne(
        { _id: ID },
        {
          $set: {
            name: req.body.name,
            testimonialtype: req.body.testimonialtype,
            designation: req.body.designation,
            testimonialdescription: req.body.testimonialdescription
          },
        }
      );
      res.status(200).send({ success: true, msg: 'Testimonial is updated' });
    } else {
      res.status(200).send({ success: false, msg: 'something getting wrong' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_testimonial = async (req, res) => {
  try {
    const ID = req.body.ID;
    const UserData = await Testimonial.deleteOne({ _id: ID });

    const response = {
      success: true,
      msg: 'Testimonial Deleted',
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_all = async (req, res) => {
  try {
    const UserData = await Testimonial.deleteMany({});

    const response = {
      success: true,
      msg: 'All Testimonials Deleted',
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_multiple = async (req, res) => {
  try {
    const ID = req.body.ID;
    const UserData = await Testimonial.deleteMany({ _id: { $in: ID } });

    const response = {
      success: true,
      ID: ID,
      msg: ' Testimonial Deleted',
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  add_testimonial,
  get_testimonial,
  get_all_testimonial,
  update_testimonial,
  delete_testimonial,
  delete_all,
  delete_multiple,
};
