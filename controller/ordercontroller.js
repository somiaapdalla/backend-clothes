const ordermodel = require("../model/ordermodel");
const productmodel = require("../model/productmodel");

const createOrder = async (req, res) => {
  const { customer, products } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ error: "product is required" });
  }

  let totalAmount = 0;
  let orderProduct = [];

  for (let item of products) {
    const findproduct = await productmodel.findById(item.productId);
    if (!findproduct) {
      return res.status(400).json({ error: "product not found" });
    }

    // quantity
    const quantity = item.quantity;
    if (quantity > findproduct.quantity) {
      return res.status(400).json({ error: "not enough in store" });
    }

    // update stock
    findproduct.quantity -= quantity;
    await findproduct.save();

    // price
    const price = findproduct.price;
    const total = price * quantity;
    totalAmount += total;

    // push product to order
    orderProduct.push({
      productId: findproduct._id,
      name: findproduct.name,
      price: price,
      quantity: quantity,
      total: total
    });
  }
  if(!customer){
    return res.status(400).json({message: "customer is required"})
  }

  const saveOrder = new ordermodel({
    products: orderProduct,
    customer: customer,
    totalAmount: totalAmount
  });

  await saveOrder.save();
  res.send(saveOrder);
};

const readOrder = async (req, res) => {
  try {
    const getorder = await ordermodel
      .find()
      .populate("customer", "name email") // مثلاً تجيب بس اسم وإيميل العميل
      .populate("products.productId", "name price"); // 👈 هنا نجيب فقط اسم وسعر المنتج

    if (!getorder || getorder.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(getorder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//total oncome
const getTotalIncome = async(req,res)=>{
  const totalAmount = await ordermodel.aggregate([
    {
      $group: {_id: null, totalIncome: {$sum:"$totalAmount"}}
    }
  ])
  if(totalAmount){
    res.send(totalAmount)
  }
}


const getTopCustomer = async(req ,res)=>{
  const topCustomer = await ordermodel.aggregate([
    {
      $group:{
        _id: "$customer",
        totalSpend: {$sum: "$totalAmount"},
        ordercount: {$sum: 1}
      }
    } ,
    {$sort:{ totalSpend: -1 }},
    {$limit: 5}
  ])

  if(topCustomer.length === 0){
    return res.staus(404).json({message:"no custometr found"})
  }
   res.json(
    topCustomer.map(item =>({
      customer: item._id,
      totalSpend: item.totalSpend,
      ordercount: item.ordercount
    }))
   )
} 


module.exports = { createOrder,readOrder,getTotalIncome,getTopCustomer };
