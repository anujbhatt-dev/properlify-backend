const mongoose = require("../DbConnection/db");

const propertySchema = mongoose.Schema({
     owner:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users'
     },
     location: {
        type: String,
        required: true
      },
      longitude:{
        type:String
      },
      latitude:{
      type:String
      },
      price: {
        type: Number,
        required: true
      },
      propertyType: {
        type: String,
        enum: ['1BHK', '2BHK', '3BHK', '1RK', 'Commercial Space'],
        required: true
      },
      amenities: [{
        type: String,
        enum: ['Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security', 'Balcony', 'Fireplace', 'Air Conditioning', 'Furnished', 'Pet Friendly', 'Elevator', 'Ocean View', 'Mountain View', 'City View']
      }],
      propertyAge: {
        type: Number,
        required: true
      },
      Image:{
      type:String
      } 
    });

const Property = mongoose.model('properties',propertySchema);
module.exports = Property;