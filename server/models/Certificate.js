const mongoose = require('mongoose');
// const Client = require('./Client');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const certificateSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    certificateIndex: { type: Number, unique: true },
    certificateNo: { type: String, },
    issueDate: {type: String, require: true},
    nameOfFumigant: { type: String, require: true},
    dateOfFumigation: { type: String, require: true},
    placeOfFumigation: { type: String, require: true},
    dosageOfFumigation: { type: String, require: true},
    durationOfFumigation: { type: String, require: true},
    minTempOfFumigation: { type: String, require: true},
    fumigationSheet: { type: String, require: true},
    descOfGoods: { type: String, require: true},
    invoiceNo: { type: String, require: true},
    invoiceDate: { type: String, require: true},
    portOfLoading: { type: String, require: true},
    portOfDischarge: { type: String, require: true},
    containerOrSealNo: { type: String, require: true},
    exporterName: { type: String, require: true},
    exporterAddress: { type: String, require: true},
    importerName: { type: String, require: true},
    importerAddress: { type: String, require: true},
    typeOfCargo: { type: String, require: true},
    quantity: { type: String, require: true},
    descriptionOfPackaging: { type: String, require: true},
    grossWeight: { type: String, require: true}
});

certificateSchema.index({ certificateNo: 'text' });
// certificateSchema.plugin(AutoIncrement, {inc_field: 'certificateIndex'});
// WildCard Indexing
//certificateSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Certificate', certificateSchema);