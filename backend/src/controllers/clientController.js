const clientsController = {};
import clientModel from "../models/client.js";


clientController.getClient = async (req, res) => {
  const clients = await productsModel.find();
  res.json(clients);
};


clientController.insertClient = async (req, res) => {
  const { name, email, password, telephone, address, status } = req.body;
  const newClient = new clientModel({ name, email, password, telephone, address, status });
  await newClient.save();
  res.json({ message: "client saved" });
};


clientsController.deleteClient = async (req, res) => {
  await clientModel.findByIdAndDelete(req.params.id);
  res.json({ message: "client deleted" });
};


clientController.updateClient = async (req, res) => {
  const { name, email, password, telephone, address, status  } = req.body;
  const updateClient = await clientModel.findByIdAndUpdate(req.params.id,{  name, email, password, telephone, address, status  }, { new: true });

  if(!updateClient){
    res.json({ message: "client not found" });
  }else {
    res.json({ message: "client updated" });
  }
};

export default clientController;