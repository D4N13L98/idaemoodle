import Teacher from "../models/teachers.js";

export const getTeacherById = async (req, res) => {
  try {
    const { code } = req.params;
    const teacher = await Teacher.findOne({ id: code });

    if (!teacher) {
      return res.status(404).json({ message: "Docente no encontrado" });
    }
    res.json({ message: "Usuario encontrado", data: teacher });
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el docente", error });
  }
};
