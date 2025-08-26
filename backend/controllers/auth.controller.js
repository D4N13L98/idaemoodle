import jwt from "jsonwebtoken";
import Student from "../models/students.js";

export const login = async (req, res) => {
  try {
    const { grade, code } = req.body;

    if (!grade || !code) {
      return res.status(400).json({ message: "Debe ingresar curso y código" });
    }

    const user = await User.findOne({ code });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.grade !== grade) {
      return res.status(401).json({ message: "El código no corresponde al curso" });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, grade: user.grade },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login exitoso",
      user: { id: user._id, name: user.name, grade: user.grade },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor", error: err.message });
  }
};
