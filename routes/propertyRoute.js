const express = require('express');
const router = express.Router();
const propertyController = require("../Controllers/propertyController");

//router.get('/listProperty',propertyController.getPropertyList);
router.post('/listProperty',propertyController.postPropertyList);
// router.patch('/updateProperty',propertyController.patchUpdateProperty);
router.get('/filter',propertyController.filterProperties);
router.get('/allProperty',propertyController.getAllProperty);
router.get('/myProperty/:id',propertyController.getMyProperty)

module.exports = router;
