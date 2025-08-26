import app from "./api/index.js";
import db from "./db/db.js";

const port = 5000;

app.listen(port, () => {
  try {
    db();
    console.log(`Servidor backend corriendo en el puerto ${port}`);
    app.get("/", (req, res) => {
      res.send("¡Backend activo y funcionando! ✅");
    });
  } catch (error) {
    console.log(error);
  }
});
