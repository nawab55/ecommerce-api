const express=require("express");
// const authenticate = require("../middleware/authenticat.js");
const router=express.Router();
const adminOrderController=require("../controllers/adminOrder.controller.js")

// router.get("/",authenticate,adminOrderController.getAllOrders);
// router.put("/:orderId/confirmed",authenticate,adminOrderController.confirmedOrder);
// router.put("/:orderId/ship",authenticate,adminOrderController.shippOrder);
// router.put("/:orderId/deliver",authenticate,adminOrderController.deliverOrder);
// router.put("/:orderId/cancel",authenticate,adminOrderController.cancelledOrder);
// router.delete("/:orderId/delete",authenticate,adminOrderController.deleteOrder);



router.get("/",adminOrderController.getAllOrders);
router.put("/:orderId/confirmed",adminOrderController.confirmedOrder);
router.put("/:orderId/ship",adminOrderController.shippOrder);
router.put("/:orderId/deliver",adminOrderController.deliverOrder);
router.put("/:orderId/cancel",adminOrderController.cancelledOrder);
router.delete("/:orderId/delete",adminOrderController.deleteOrder);

module.exports=router;