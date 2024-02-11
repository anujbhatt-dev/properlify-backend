const Property = require("../models/propertySchema");
const axios = require('axios');
const connectedClients = require('../index');
const User = require("../models/userSchema")

// exports.getPropertyList = (req,res)=>{
//    res.render();
// }

exports.postPropertyList = async (req, res) => {
  let { location, price, propertyType, amenities, propertyAge, Image } = req.body;
  amenities = amenities.split(",");
  try {
    const { latitude, longitude } = await getCoordinates(location);
    console.log(req.session.User);
    const property = new Property({
      location,
      latitude,
      longitude,
      price,
      propertyType,
      amenities,
      propertyAge,
      Image
    });

    const newProperty = await property.save();

    for (const clientId in connectedClients) {
      connectedClients[clientId].emit('newPropertyAdded', newProperty);
    } 
    res.status(201).json(newProperty);
  } catch (error) {
    console.log(error);
    res.status(400).json('Internal Servor error');
  }
}

exports.patchUpdateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (req.body.location) property.location = req.body.location;
    if (req.body.price) property.price = req.body.price;
    if (req.body.propertyType) property.propertyType = req.body.propertyType;
    if (req.body.amenities) property.amenities = req.body.amenities;
    if (req.body.propertyAge) property.propertyAge = req.body.propertyAge;
    if (req.body.Image) property.Image = req.body.Image;

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    console.log(error);
    res.status(400).json('Internal Server error');
  }
}

async function getCoordinates(location) {

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    throw new Error('Error fetching coordinates');
  }
}

exports.filterProperties = async (req, res) => {
  try {
    let query = {};

    // Filter by location
    if (req.query.location) {
      query.location = { $regex: new RegExp(req.query.location, 'i') };
    }

    // Filter by price range
    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { $gte: parseInt(req.query.minPrice), $lte: parseInt(req.query.maxPrice) };
    } else if (req.query.minPrice) {
      query.price = { $gte: parseInt(req.query.minPrice) };
    } else if (req.query.maxPrice) {
      query.price = { $lte: parseInt(req.query.maxPrice) };
    }

    // Filter by property type
    if (req.query.propertyType) {
      query.propertyType = req.query.propertyType;
    }

    // Filter by amenities
    if (req.query.amenities) {
      query.amenities = { $all: req.query.amenities.split(',') };
    }

    // Filter by property age
    if (req.query.minPropertyAge) {
      query.propertyAge = { $gte: parseInt(req.query.minPropertyAge) };
    }

    // Find properties based on the constructed query
    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

exports.getAllProperty = async (req, res) => {
  try {
    const properties = await Property.find({});
    // Only send the necessary property data to the client
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getMyProperty = async (req, res) => {
  try {
    const properties = await Property.find({owner:req.param.id});
    // Only send the necessary property data to the client
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



