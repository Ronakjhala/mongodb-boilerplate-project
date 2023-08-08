const Category = require('../models/categoryModel');
const validation=require('../validations/CategoryValidation');
const add_category = async (req, res) => {
  try {
    const {error}=validation.CategoryValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const cat = new Category({
    
      categoryname: req.body.categoryname,
      categorytype: req.body.categorytype,
    });
    // Create category
    const cat_data = await cat.save();
    if (cat_data) {
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

const update_catorgy = async (req, res) => {
  try {
    const ID = req.body.ID;
    const cat = {
      categoryname: req.body.categoryname,
      categorytype: req.body.categorytype,
    };
  
    const {error}=validation.CategoryValidation(cat);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    
    const data = await Category.findOne({_id: ID });
    if (data) {
      const UserData = await Category.updateMany(
        { ID: ID },
        {
          $set: {
            categoryname: req.body.categoryname,
            categorytype: req.body.categorytype,
          },
        }
      );
      res.status(200).send({ success: true, msg: 'Catorgy is updated' });
    } else {
      res.status(200).send({ success: false, msg: 'something getting wrong' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_category = async (req, res) => {
  try {
    const ID = req.body.ID;
    const UserData = await Category.findOne({_id: ID });
    if (UserData) {
      const userResult = {
        categoryname: UserData.categoryname,
        categorytype: UserData.categorytype,
      };
      const response = {
        success: true,
        msg: 'Category Details',
        data: userResult,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ success: false, msg: 'Category is not found' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_category = async (req, res) => {
  try {
    const ID = req.body.ID;
    const UserData = await Category.deleteOne({ _id: ID });

    const response = {
      success: true,
      msg: 'Category Deleted',
      data: UserData,
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_all = async (req, res) => {
  try {
    const UserData = await Category.deleteMany({});

    const response = {
      success: true,
      msg: 'All Category Deleted',
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_multiple = async (req, res) => {
  try {
    const IDS = req.body.IDS;
    const UserData = await Category.deleteMany({ _id: { $in: IDS } });

    const response = {
      success: true,
      IDS: IDS,
      msg: ' Category Deleted',
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_category = async (req, res) => {
  try {
    const userdata = await Category.find({});
    const response = {
      success: true,
      msg: 'Category Details',
      data: userdata,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  add_category,
  update_catorgy,
  view_category,
  delete_category,
  get_category,
  delete_all,
  delete_multiple,
};
