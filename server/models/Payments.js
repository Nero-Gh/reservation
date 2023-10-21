import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    channels: {
      type: String,
      
    },
    callback_urls: {
      type: String,
    
    },
    username:{
        type:String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
