const contactmodel = require("../model/contactmodel");

// إضافة رسالة
const createcontact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newdata = new contactmodel({ name, email, message });
    const savedata = await newdata.save();

    res.status(201).send({
      message: "Message saved successfully",
      data: savedata
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
};

// قراءة كل الرسائل
const readcontact = async (req, res) => {
  try {
    const contacts = await contactmodel.find().sort({ createdAt: -1 });
    res.send(contacts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
};

// حذف رسالة
const deletecontact = async (req, res) => {
  try {
    const removedata = await contactmodel.deleteOne({ _id: req.params.id });
    if (removedata.deletedCount > 0) {
      res.send({ message: "Message deleted successfully" });
    } else {
      res.status(404).json({ error: "Message not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error" });
  }
};

module.exports = { createcontact, readcontact, deletecontact };
