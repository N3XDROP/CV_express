import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API inicial funcionando" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});