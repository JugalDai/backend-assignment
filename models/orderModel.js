const mongoose= require ('mongoose');
const RowOfOrder=require('./orderRowModel')

const OrderSchema= new mongoose.Schema
({
  userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
  },
  
  product:[RowOfOrder]

},{ timestamps: true });

module.exports = mongoose.model('Order',OrderSchema)