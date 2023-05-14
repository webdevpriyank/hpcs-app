require('../models/database');
const Certificate = require('../models/Certificate');
const Clients = require('../models/Client');
const pdf = require('html-pdf');
const ejs = require('ejs');
const fs = require('fs');

/**
 * GET /
 * Homepage 
*/
exports.getCertificateList = async(req, res) => {
  try {

    // const limitNumber = 5;
    // const certificates = await Certificate.find({}).limit(limitNumber);
    const certificates = await Certificate.find({})
    .populate('client')
    .then((certificates) => {
      console.log(certificates);
      res.render('view-certificates', { title: 'Certificate List', certificates } );
    })
    .catch((err) => {
      console.error(err);
    });
      
  } catch (error) {
    res.send({message: error.message || "Error Occured" });
  }
}



/**
 * GET /
 * Homepage 
*/
exports.createCertificate = async(req, res) => {

  if(req.method === "GET"){
    try {

      // Get the last certificate number from the database
      const lastCertificate = await Certificate.findOne({}, {}, { sort: { 'certificateIndex' : -1 } });
      let certificateNumber = 1; // Set the default certificate number to 1
      
      
      // If there is a last certificate number, increment it by 1
      if (lastCertificate) {
        certificateIndex = lastCertificate.certificateIndex + 1;
        certificateNumber = lastCertificate.certificateIndex + 1;
        certificateNumber = 'GDM/ MBR/2023-24/00' + certificateNumber;
      }
      
      // console.log("****************Last certificate :", lastCertificate.certificateIndex);

      const clients = await Clients.find({})
        .then((clients) => {
          console.log(clients);
          res.render('create-certificate', { title: 'Create Certificate', clients, certificateNumber, certificateIndex } );
        }).catch((err) => {
        console.error(err);
    });
    } catch (error) {
      res.send({message: error.message || "Error Occured" });
    }
  }
}

exports.storeCertificate = async(req, res) => {

  if(req.method === "POST"){
    try {
      const newCertificateData =  new Certificate({
        client: req.body.client,
        certificateIndex: req.body.certificateIndex,
        certificateNo: req.body.certificateNo,
        issueDate: req.body.dateOfIssue,
        nameOfFumigant: req.body.nameOfFumigant,
        dateOfFumigation: req.body.dateOfFumigation,
        placeOfFumigation: req.body.placeOfFumigation,
        dosageOfFumigation: req.body.dosageOfFumigation,
        durationOfFumigation: req.body.durationOfFumigation,
        minTempOfFumigation: req.body.minTempOfFumigation,
        fumigationSheet: req.body.fumigationSheet,
        descOfGoods: req.body.descOfGoods,
        invoiceNo: req.body.invoiceNo,
        invoiceDate: req.body.invoiceDate,
        portOfLoading: req.body.portOfLoading,
        portOfDischarge: req.body.portOfDischarge,
        containerOrSealNo: req.body.containerOrSealNo,
        exporterName: req.body.clientName,
        exporterAddress: req.body.clientAddress,
        importerName: req.body.importerName,
        importerAddress: req.body.importerAddress,
        typeOfCargo: req.body.typeOfCargo,
        quantity: req.body.quantity,
        descriptionOfPackaging: req.body.descriptionOfPackaging,
        grossWeight: req.body.grossWeight
      });
       
      newCertificateData.save()
        .then((result) => {
        console.log("Result", result);
        res.send('Certificate Created');
      }).catch((err) => {
        console.error(err);
        res.status(500).send('Error creating certificate');
      });

    } catch (error){
      console.log(error);
      res.send("message" . error);
    }  
  }
}



/**
 * GET /:id
 * 
*/
exports.printCertificate = async(req, res) => { 
  try {
    let certificateId = req.params.id;
    console.log(certificateId);
    
    const certificateToPrint = await Certificate.find({ '_id': certificateId });
    console.log(certificateToPrint);

    res.render('certificate_template', { title: 'Print',  layout: false, certificateToPrint } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
}



/**
 * GET /:id
 * 
*/
exports.downloadCertificate = async(req, res) => { 
  try {
   

  } catch (error) {
    res.send({message: error.message || "Error Occured" });
  }
} 