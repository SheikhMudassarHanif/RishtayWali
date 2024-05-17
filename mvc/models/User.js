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



const Schema = mongoose.Schema;
// Define the schema for the user profile
const profileSchema = new mongoose.Schema({
  profileFor: {
    type: String,
    enum: ['Myself', 'My Son', 'My Daughter'],
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
  cnic:{
type: Number,
required: true,
unique:true
  },
  dateOfBirth: {
    day: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  religion: {
    type: String,
    required: true
  },
  community: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
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
    required: true
  },
  hairColor: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  educationLevel: {
    type: String,
    required: true
  },
  exerciseHabits: {
    type: String,
    enum: ['None', 'Occasionally', 'Regularly'],
    required: true
  },
  sports: [{
    type: String
  }]
});

// const profileSchema = new Schema({
//   profileFor: {
//     type: String,
//     enum: ['Myself', 'My Son', 'My Daughter'],
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female'],
//     required: true
//   },
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   dateOfBirth: {
//     day: {
//       type: Number,
//       min: 1,
//       max: 31,
//       required: true
//     },
//     month: {
//       type: Number,
//       min: 1,
//       max: 12,
//       required: true
//     },
//     year: {
//       type: Number,
//       min: 1900,
//       max: 2024, // Update the maximum year if needed
//       required: true
//     }
//   },
//   religion: {
//     type: String,
//     enum: ['Islam', 'Christianity', 'Hinduism'],
//     required: true
//   },
//   community: {
//     type: String,
//     enum: ['Urdu', 'English', 'Chinese', 'German'],
//     required: true
//   },
//   country: {
//     type: String,
//     enum: ['Pakistan', 'India', 'United States', 'Canada'],
//     required: true
//   }
// });



// Create a model based on the schema
const Profile = mongoose.model('Profile', profileSchema);





const UserModel=mongoose.model('UserSignUPModel',UserSignUP);
const profileModel=mongoose.model('profile_Model',profileSchema);

module.exports = {UserModel,profileModel};


