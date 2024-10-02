// vehicleModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  vehicleNo: { type: String, required: true },
  chassisNo: { type: String, required: true },
  mobileNo: { type: String, required: true },
  vehiclePermitType: { type: String, required: true },
  seatingCapacityExcludingDriver: { type: String},
  sleeperCap: { type: String },
  borderBarrier: { type: String, required: true },
  permitType: { type: String, required: true },
  permitUpto: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  ownerName: { type: String, required: true },
  fromState: { type: String, required: true },
  vehicleClass: { type: String, required: true },
  serviceType: { type: String, required: true },
  taxMode: { type: String, required: true },
  taxFromDate: { type: Date, required: true },
  taxUptoDate: { type: Date, required: true },
  grossVehicleWeight: { type: Number},
  unladenWeight: { type: Number},
  permitNumber: { type: String, required: true },
  adminname: { type: String, required: true },
  uptNumber:{type:Number,required:true}
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
