const employeeController = {};
import employeeModel from "../models/employee.js";


employeeController.getEmployee = async (req, res) => {
  const employees = await employeeModel.find();
  res.json(employee);
};


employeeController.insertEmployee = async (req, res) => {
  const { name, email, password, telephone,  address,  hireDate, salary, status} = req.body;
  const newEmployee = new employeeModel({name, email, password, telephone,  address,  hireDate, salary, status});
  await newEmployee.save();
  res.json({ message: "employee saved" });
};


employeeController.deleteEmployee = async (req, res) => {
  await employeeModel.findByIdAndDelete(req.params.id);
  res.json({ message: "employee deleted" });
};


employeeController.updateEmployee = async (req, res) => {
  const { name, email, password, telephone,  address,  hireDate, salary, status} = req.body;
  const updateEmployee = await employeeModel.findByIdAndUpdate( req.params.id,{ name, email, password, telephone,  address,  hireDate, salary, status},{ new: true }
  );

  if(!updateEmployee){
    res.json({ message: "employee not found" });
  }else {
    res.json({ message: "employee updated" });
  }
};

export default employeeController;