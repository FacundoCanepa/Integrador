import express from "express";
import userModel from "../model/user.model.js";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password,
      role,
    });

    res.redirect("/login");
    
  } catch (error) {
    res.status(500).send(`Error de registro. ${error}`);
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
  
      const user = await userModel.findOne({ email, password });
      console.log("user =", user);
      if (!user) {
        return res
          .status(401)
          .send({ status: "error", error: "Usuario o contraseña incorrecto" });
      }
  
      res.redirect("/profile");
    } catch (error) {
      res.status(500).send(`Error de inicio de sesión. ${error}`);
    }
  });
  

export default router;
