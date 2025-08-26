import Student from "../models/students.js"

export async function getStudent(req, res) {
  const id = req.params.id;
  try {
    const student = await Student.findOne({ id });
    if (!student) {
      return res.status(404).json({
        message: "Usuario no encontrado",
        data: null,
      });
    }
    res.json({ message: "Usuario encontrado", data: student });
  } catch (err) {
    res.status(500).json({
      message: `Error buscando el estudiante con código: ${id}`,
      error: err.message,
    });
  }
}

export async function getStudents(req, res) {
  try {
    const students = await Student.find();
    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ message: "Usuarios no encontrados", data: [] });
    }
    res.json({ message: "Usuarios encontrados", data: students });
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener los usuarios",
      error: err.message,
    });
  }
}
