const Property = require("../models/propertySchema");

exports.getPropertyList = (req,res)=>{
   res.render();
}

exports.postPropertyList = async(req,res)=>{
   try {
    const property = new Property({
        location: req.body.location,
        price: req.body.price,
        propertyType: req.body.propertyType,
        amenities: req.body.amenities,
        propertyAge: req.body.propertyAge,
        Image: req.body.Image
      });
      
      const newProperty = await property.save();
      res.status(201).json(newProperty);
   } catch (error) {
    console.log(error);
    res.status(400).send('Internal Servor error');
   }
}

exports.patchPropertyList = async(req,res)=>{

}