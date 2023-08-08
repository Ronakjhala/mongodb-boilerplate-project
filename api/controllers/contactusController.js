const contact = require('../models/ContactUsModel');
const validation=require('../validations/contactValidation');
const add_contact = async (req, res) => {
  try {
    const {error}=validation.ContactValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const con = new contact({
      //ID:req.body.ID,
      contactName: req.body.contactName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
      message: req.body.message,
      date: req.body.date,
    });

    const con_data = await con.save();
    if (con_data) {
      return res.status(200).send({
        success: true,
        message: 'Added successfully.',
        //data: port_data,
        statusCode: 201,
      });
    }
  } catch (error) {
    console.log('ddfdfdf', error);
    res.status(500).send(error.message);
  }
};

const update_contact = async (req, res) => {
  try {
    const {error}=validation.ContactValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    
    const date=  new Date();

    const email = req.body.email;
    const data = await contact.findOne({ email: email });
    if (data) {
      const UserData = await contact.updateMany(
        { email: email },
        {
          $set: {
            contactName: req.body.contactName,
            contactNumber: req.body.contactNumber,
            message: req.body.message,
            date: date,
          },
        }
      );
      res.status(200).send({ success: true, msg: 'Contact is updated' });
    } else {
      res.status(200).send({ success: false, msg: 'something getting wrong' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const view_contact = async (req, res) => {
  try {
    const email = req.body.email;
    const UserData = await contact.findOne({ email: email });
    if (UserData) {
      const userResult = {
        contactName: UserData.contactName,
        contactNumber: UserData.contactNumber,
        message: UserData.message,
        date: UserData.date,
      };
      const response = {
        success: true,
        msg: 'Contact us Details',
        data: userResult,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ success: false, msg: 'Contact us is not found' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const delete_contact = async (req, res) => {
  try {
    const email = req.body.email;
    const UserData = await contact.deleteOne({ email: email });

    const response = {
      success: true,
      msg: 'contact Deleted',
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_all = async (req, res) => {
  try {
    const UserData = await contact.deleteMany({});

    const response = {
      success: true,
      msg: 'All Contact Us Deleted',
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_multiple = async (req, res) => {
  try {
    const emails = req.body.email;
    const UserData = await contact.deleteMany({ email: { $in: emails } });

    const response = {
      success: true,
      emails: emails,
      msg: ' Contact us Deleted',
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_contact = async (req, res) => {
  try {
    const userData = await contact.find({});
    const response = {
      success: true,
      msg: 'contact Details',
      data: userData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  add_contact,
  update_contact,
  view_contact,
  delete_contact,
  get_contact,
  delete_all,
  delete_multiple,
};
