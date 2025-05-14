const registerEmployeesController = {};
import employee from "../models/employee.js";
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js";


registerEmployeeController.register = async (req, res) => {
  const { name, email, password, telephone,  address,  hireDate, salary, status} = req.body;
  try{

    //Verifica si existe el empleado
    const existEmployee = await Employee.findOne({email})
    if(existEmployee){
        return res.json({ message: "employee already exist" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newEmployee = new Employee({name, email, password: passwordHash, telephone,  address,  hireDate, salary, status});
    await newEmployee.save();
    res.json({ message: "employee saved" });

    jsonwebtoken.sign(
        //1- que voy a guardar
        {id: newEmployee._id},
        //2- clave secreta
        config.JWT.secret,
        //3- cuando expira
        {expiresIn: config.JWT.expiresIn},
        //4- funcion flecha
        (error, token) => {
            if(error) console.log (error);
            res.cookie("authToken", token);
        }
    );
  }
  catch (error) {
     console.log(error);
     res.json({ message: "error register employee" });
  }
};

export default registerEmployeeController;