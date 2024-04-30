
const orderService = require("../services/order.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
};

const confirmedOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.confirmedOrder(orderId);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const shippOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.shipOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deliverOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.deliveredOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const cancelledOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.cancelledOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deleteOrder = await orderService.deleteOrder(orderId);
    res
      .status(202)
      .json({deleteOrder, message: "Order Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};



module.exports = {
  getAllOrders,
  confirmedOrder,
  shippOrder,
  deliverOrder,
  cancelledOrder,
  deleteOrder,
};
