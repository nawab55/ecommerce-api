const express=require("express");
const router=express.Router();
const productController=require("../controllers/product.controller.js");
const authenticate = require("../middleware/authenticat.js");


router.post('/', authenticate, productController.createProduct);
router.post('/creates', authenticate, productController.createMultipleProduct);
router.delete('/:id', authenticate, productController.deleteProduct);
router.put('/:id', authenticate, productController.updateProduct);

module.exports=router;