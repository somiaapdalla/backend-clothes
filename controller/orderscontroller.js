const ordermodel = require("../model/ordermodel");
const productmodel = require("../model/productmodel");

// ✅ إنشاء طلب (Create Order)
const createOrder = async (req, res) => {
  try {
    const { customer, products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "Products are required" });
    }

    let totalAmount = 0;
    let orderProducts = [];

    for (let item of products) {
      const findproduct = await productmodel.findById(item.productId);
      if (!findproduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (item.quantity > findproduct.quantity) {
        return res.status(400).json({ error: "Not enough stock" });
      }

      // تحديث المخزون
      findproduct.quantity -= item.quantity;
      await findproduct.save();

      const price = findproduct.price;
      const total = price * item.quantity;
      totalAmount += total;

      orderProducts.push({
        productId: findproduct._id,
        price: price,
        quantity: item.quantity,
      });
    }

    if (!customer) {
      return res.status(400).json({ message: "Customer is required" });
    }

    const saveOrder = new ordermodel({
      customer,
      products: orderProducts,
      totalAmount,
    });

    await saveOrder.save();
    res.status(201).json(saveOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ قراءة كل الطلبات (Read Orders) - Admin
const readOrders = async (req, res) => {
  try {
    const getOrders = await ordermodel
      .find()
      .populate("products.productId", "name price image");

    if (!getOrders || getOrders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(
      getOrders.map(order => ({
        _id: order._id,
        customer: order.customer,
        totalAmount: order.totalAmount,
        products: order.products.map(p => ({
          name: p.productId?.name || "Deleted",
          price: p.price,
          quantity: p.quantity,
          total: p.price * p.quantity,
        })),
        createdAt: order.createdAt,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ إجمالي الدخل (Total Income)
const getTotalIncome = async (req, res) => {
  try {
    const totalAmount = await ordermodel.aggregate([
      { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } },
    ]);

    res.json(totalAmount[0] || { totalIncome: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ أفضل العملاء (Top Customers)
const getTopCustomer = async (req, res) => {
  try {
    const topCustomer = await ordermodel.aggregate([
      {
        $group: {
          _id: "$customer",
          totalSpend: { $sum: "$totalAmount" },
          orderCount: { $sum: 1 },
        },
      },
      { $sort: { totalSpend: -1 } },
      { $limit: 5 },
    ]);

    if (!topCustomer || topCustomer.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    res.json(
      topCustomer.map(item => ({
        customer: item._id,
        totalSpend: item.totalSpend,
        orderCount: item.orderCount,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ تصدير الدوال
module.exports = { createOrder, readOrders, getTotalIncome, getTopCustomer };
