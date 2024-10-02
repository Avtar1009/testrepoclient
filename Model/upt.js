const mongoose  =require("mongoose");
const Schema =mongoose.Schema;


const uptres =new Schema({
  uptNumber: { type: Number, required: true },
  mobileNo: { type: String, required: true },
  uptodate: { type: Date, required: true },
})

const UptNumber = mongoose.model('Upt', uptres);
module.exports = UptNumber;
