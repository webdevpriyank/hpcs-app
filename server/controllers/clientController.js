require('../models/database');
const Client = require('../models/Client');

/**
 * GET /
 * Homepage 
*/
exports.getClientList = async (req, res) => {
  try {
    const clients = await Client.find({})
      .then((clients) => {
        console.log(clients);
        res.render('view-client', { title: 'Clients List', clients });
      })
      .catch((err) => {
        console.error(err);
      });

  } catch (error) {
    res.send({ message: error.message || "Error Occured" });
  }
}

/**
 * GET /
 * Homepage 
*/
exports.createClient = async (req, res) => {
  try {

    res.render('create-client', { title: 'Clients List' });

  } catch (error) {
    res.send({ message: error.message || "Error Occured" });
  }
}

/**
 * POST /
 *  
*/
exports.storeClient = async (req, res) => {
  try {
    const clientData = req.body;

    if (clientData.clientName == "" || clientData.clientAddress == "" || clientData.clientMobile == "" || clientData.clientEmail == "") {
      console.log("No client data");
      const clients = await Client.find({})
        .then((clients) => {
          console.log(clients);
          res.render('create-client', { successMessage: 'Client Data Requried!', title: 'Clients List', clients });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {

      const newClientData = new Client({
        clientName: req.body.clientName,
        clientAddress: req.body.clientAddress,
        clientEmail: req.body.clientEmail,
        clientMobile: req.body.clientMobile
      });
      
      newClientData.save()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });


      const clients = await Client.find({})
        .then((clients) => {
          console.log(clients);
          res.render('view-client', { successMessage: 'Client Added successfuly!', title: 'Clients List', clients });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } catch (error) {
    res.send({ message: error.message || "Error Occured" });
  }
}