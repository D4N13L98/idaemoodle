import Assessments from "../models/assessments.js";

export async function getAssessment(req, res) {
  const code = req.params.code;
  try {
    const assessment = await Assessments.findOne({ code });
    if (!assessment) {
      return res.status(404).json({
        message: "Evaluación no encontrada",
        data: null,
      });
    }
    res.json({ message: "Evaluación encontrada", data: assessment });
  } catch (err) {
    res.status(500).json({
      message: `Error buscando la evaluación con código: ${code}`,
      error: err.message,
    });
  }
}

export async function getAssessments(req, res) {
  try {
    const assessments = await Assessments.find();
    if (!assessments || assessments == []) {
      return res
        .status(404)
        .json({ message: "Evaluaciones no encontradas", data: assessments });
    }
    res.json({ message: "Evaluaciones encontradas", data: assessments });
  } catch (err) {
    res.status(500).json({
      message: "Error al obtener las evaluaciones",
      error: err.message,
    });
  }
}

export async function createAssessment(req, res) {
  try {
    const { code } = req.body;

    const existing = await Assessments.findOne({ code });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Ya existe una evaluación con este código" });
    }

    const assessment = new Assessments(req.body);
    await assessment.save();

    res.status(201).json({
      message: "Evaluación creada exitosamente",
      data: assessment,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error al crear la evaluación",
      error: err.message,
    });
  }
}

export async function updateAssessment(req, res) {
  const code = req.params.code;
  try {
    const updated = await Assessments.findOneAndUpdate({ code }, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Evaluación no encontrada",
        data: null,
      });
    }

    res.json({
      message: "Evaluación actualizada exitosamente",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error actualizando la evaluación con código: ${code}`,
      error: err.message,
    });
  }
}

export async function deleteAssessment(req, res) {
  const code = req.params.code;
  try {
    const deleted = await Assessments.findOneAndDelete({ code });

    if (!deleted) {
      return res.status(404).json({
        message: "Evaluación no encontrada",
        data: null,
      });
    }

    res.json({
      message: "Evaluación eliminada exitosamente",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error eliminando la evaluación con código: ${code}`,
      error: err.message,
    });
  }
}
