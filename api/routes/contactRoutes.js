const express = require('express');
const con_route = express();
const contact_controller = require('../controllers/contactusController');

con_route.post('/add_contact', contact_controller.add_contact);
con_route.post('/update_contact', contact_controller.update_contact);
con_route.post('/get_contact', contact_controller.view_contact);
con_route.post('/delete_contact', contact_controller.delete_contact);
con_route.post('/delete_all_contact', contact_controller.delete_all);
con_route.post('/delete_multiple_contact', contact_controller.delete_multiple);
con_route.get('/get_all_contact', contact_controller.get_contact);

module.exports = con_route;
