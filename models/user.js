const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  mail: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String
  },
  gender: {
    type: String,
    required: true
  }
},
{
  timestamps: true  // Corrected option name
});

//Model
const user=mongoose.model("user",userSchema);

module.exports=user;