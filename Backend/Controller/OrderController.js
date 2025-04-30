const OrderModel = require("../Model/OrderModel");

// POST /api/order/create
const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    const {
      orderId,
      reference,
      payment_status,
      total_amount,
      payment_method,
      cartItem,
      shippingAddress,
    } = req.body;

    const newOrder = new OrderModel({
      orderId,
      reference,
      payment_status,
      total_amount,
      payment_method,
      cartItem,
      shippingAddress,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /api/order/update/:reference
const updateByOrderId = async (req, res) => {
  const { reference } = req.params;
  const updateFields = req.body;

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { reference },
      { ...updateFields, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {createOrder,updateByOrderId}