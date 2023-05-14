const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

/**
 * App Routes 
*/
router.get('/view-certificates', certificateController.getCertificateList);
router.get('/create-certificate', certificateController.createCertificate);
router.post('/create-certificate', certificateController.storeCertificate);
router.get('/print-certificate/:id', certificateController.printCertificate );
router.get('/download-certificate/:id', certificateController.downloadCertificate );

 
module.exports = router;