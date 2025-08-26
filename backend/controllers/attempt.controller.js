import Attempt from "../models/attempts.js";

export async function createAttempt(req, res) {
  try {
    const { attemptId } = req.body;

    const existing = await Attempt.findOne({ attemptId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Ya realizaste esta evaluación" });
    }

    const attempt = new Attempt(req.body);
    await attempt.save();

    res.status(201).json({
      message: "Evaluación creada exitosamente",
      data: attempt,
    });
    
  } catch (err) {
    res.status(500).json({
      message: "Error al crear la evaluación",
      error: err.message,
    });
  }
}

export async function getAttempts(req, res) {
  try {
    const attempt = await Attempt.find();
    if (!attempt || attempt == []) {
      return res
        .status(404)
        .json({ message: "Evaluaciones no encontradas", data: attempt });
    }
    res.json({ message: "Evaluaciones encontradas", data: attempt });
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener las evaluaciones",
      error: err.message,
    });
  }
}