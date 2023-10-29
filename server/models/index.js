const mongoose = require('mongoose')
const { Schema } = mongoose;

const transactionSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  });

const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    dob: {
        type: String,
        required: true
      },
    address: {
        type: String,
        required: true
      },  
    hashedPassword: {
        type:String,
        required: true
    },
    transactions: [transactionSchema]
  });

exports.User = mongoose.model('User', userSchema);

