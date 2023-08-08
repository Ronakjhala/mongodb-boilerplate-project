const express = require('express');
const port_route = express();
const bodyParser = require('body-parser');
port_route.use(bodyParser.json());
port_route.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const path = require('path');
port_route.use(express.static('public'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, '../public/userImages'),
      function (error, success) {
        if (error) throw error;
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name, function (error1, success1) {
      if (error1) throw error;
    });
  },
});
const upload = multer({ storage: storage });
const port_controller = require('../controllers/PortfolioController');

port_route.post(
  '/add_port',
  upload.array('image', 5),
  port_controller.add_port
);
//port_route.post('/add_port',port_controller.add_port);
port_route.post('/update_portfolio', port_controller.update_port);
port_route.post('/view_port', port_controller.view_port);
port_route.post('/delete_portfolio', port_controller.delete_port);
port_route.post('/delete_all_portfolio', port_controller.delete_all);
port_route.post('/delete_multiple_portfolio', port_controller.delete_multiple);
port_route.get('/get_all_portfolio', port_controller.get_all_portfolio);
port_route.post('/get_portfolio', port_controller.get_portfolio);


module.exports = port_route;
