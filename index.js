import express from "express";
const app = express();
app.use(express.json());

// Rota para validar webhook com o Meta
app.get("/webhook", (req, res) => {
  const verify_token = "MEU_TOKEN_SECRETO"; // troque por um token que você inventar

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === verify_token) {
    res.status(200).send(challenge); // responde o hub.challenge
  } else {
    res.sendStatus(403);
  }
});

// Rota para receber mensagens
app.post("/webhook", (req, res) => {
  console.log("Mensagem recebida:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200); // confirma recebimento para o WhatsApp
});

// Inicia servidor na porta 3000
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
