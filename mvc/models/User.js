const mongoose = require('mongoose');
// const router=require('express')


const UserSignUP=new mongoose.Schema({
    
    Email:{
        type:String,
        required:[true,'email Is Required Field'],
        unique:true

    },
    password:{
        type:String,
        required:[true,'pwd Is Required Field']
    },
});





// Define the Profile schema
const profileSchema = new mongoose.Schema({
  profileFor: {
    type: String,
    enum: ['Myself', 'My Son'],
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    day: {
      type: Number,
      min: 1,
      max: 31,
      required: true
    },
    month: {
      type: Number,
      min: 1,
      max: 12,
      required: true
    },
    year: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
      required: true
    }
  },
  religion: {
    type: String,
    enum: ['Islam', 'Christianity', 'Hinduism'],
    required: true
  },
  community: {
    type: String,
    enum: ['Urdu', 'English', 'Chinese', 'German'],
    required: true
  },
  country: {
    type: String,
    enum: ['Pakistan', 'USA', 'UK'],
    required: true
  },
  measurements: {
    weight: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    skinColor: {
      type: String,
      enum: ['Brown', 'Blue', 'Black', 'White', 'Golden'],
      required: true
    },
    hairColor: {
      type: String,
      enum: ['Brown', 'Black', 'Blonde', 'Red', 'Gray'],
      required: true
    }
  },
  lifestyle: {
    occupation: {
      type: String,
      enum: ['Student', 'Service', 'Business', 'Retired', 'Unemployed'],
      required: true
    },
    educationLevel: {
      type: String,
      enum: ['Bachelors', 'Masters', 'PhD', 'O Levels', 'A Levels', 'None'],
      required: true
    },
    exerciseHabits: {
      type: String,
      enum: ['None', 'Occasionally', 'Regularly'],
      required: true
    },
    favoriteSports: {
      type: [String],
      enum: ['Football', 'Cricket', 'Tennis', 'Badminton', 'Basketball', 'Swimming'],
      default: []
    }
  }
}, { timestamps: true });





const UserModel=mongoose.model('UserSignUPModel',UserSignUP);
const profileModel=mongoose.model('profile_Model',profileSchema);

module.exports = {UserModel,profileModel};


