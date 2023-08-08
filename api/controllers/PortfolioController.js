const portfolio = require("../models/portfolioModel");
const Category = require("../models/categoryModel");
const validation=require('../validations/portfolioValidation');


const add_port = async (req, res) => {
  try {
    const {error}=validation.PortfolioValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    const img = req.files.map((image) => image.filename);
    const port = new portfolio({
      //ID:req.body.ID,
      projectCategory: req.body.projectCategory,
      projectName: req.body.projectName,
      projectTitle: req.body.projectTitle,
      projectDate: req.body.projectDate,
      image: img,
    });

    const port_data = await port.save();
    if (port_data) {
      return res.status(200).send({
        success: true,
        message: "Added successfully.",
        //data: port_data,
        statusCode: 201,
      });
    }
  } catch (error) {
    console.log("ddfdfdf", error);
    res.status(500).send(error.message);
  }
};

const update_port = async (req, res) => {
  try {
    const {error}=validation.PortfolioValidation(req.body);
    if(error) 
    {
        return res.status(400).send(error.details[0].message);
    }
    
    const ID = req.body.ID;
    
    const data = await portfolio.findOne({ _id: ID });
    const date=new Date();
    if (data) {
      
      const UserData = await portfolio.updateMany(
        { _id: ID },
        {
          $set: {
            projectCategory: req.body.projectCategory,
            ProjectName: req.body.ProjectName,
            projectTitle: req.body.projectTitle,
            ProjectDate: date,
          },
        }
      );
      res.status(200).send({ success: true, msg: "Portfolio is updated" });
    } else {
      res.status(200).send({ success: false, msg: "something getting wrong" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const get_portfolio = async (req, res) => {
  try {
    const ID = req.body.ID;
    const UserData = await portfolio.findOne({_id: ID });
    if (UserData) {
     
      const response = {
        success: true,
        msg: 'Portfolio Details',
        data: UserData,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ success: false, msg: 'Portfoloio is not found' });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};



const view_port = async (req, res) => {
  try {
    const data = await portfolio.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_ID",
          as: "cat_data",
        },
      },
      { $unwind: "$cat_data" },
    ]);
    res.status(200).send({ success: true, data: data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_port = async (req, res) => {
  try {
    const ID = req.body.ID;
    const UserData = await portfolio.deleteOne({_id:ID});

    const response = {
      success: true,
      msg: "Portfolio Deleted",
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_all = async (req, res) => {
  try {
    const UserData = await portfolio.deleteMany({});

    const response = {
      success: true,
      msg: "All Portfolio Deleted",
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const delete_multiple = async (req, res) => {
  try {
    const IDS = req.body.ID;
    const UserData = await portfolio.deleteMany({
      _id: { $in: IDS },
    });

    const response = {
      success: true,
      IDS: IDS,
      msg: " Portfolio Deleted",
      data: UserData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_all_portfolio = async (req, res) => {
  try {
    const userData = await portfolio.find({});
    const response = {
      success: true,
      msg: "Portfolio Details",
      data: userData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  add_port,
  update_port,
  view_port,
  delete_port,
  get_portfolio,
  get_all_portfolio,
  delete_all,
  delete_multiple,
};
