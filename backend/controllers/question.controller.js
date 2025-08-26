import Questions from "../models/questions.js"

export async function getQuestions(req, res) {
  const topic = req.params.topic;
  try {
    const question = await Questions.find({ topic });
    if (!question) {
      return res.send({ message: "Ejercicios no encontrados" , data:question});
    }
    res.send({ message: "Ejercicios encontrados", data:question });
  } catch (err) {
    res.send({
      message: `No se ha encontrado ejercicios de tipo: ${topic}`,
      err,
    });
  }
}