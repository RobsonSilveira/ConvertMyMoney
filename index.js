const express = require("express");
const path = require("path");
const app = express();
const convert = require("./lib/convert");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Cria o diretório completo com '/'

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cotacao", (req, res) => {
  const { cotacao, quantidade } = req.query;

  if (cotacao && quantidade) {
    const conversao = convert.convert(cotacao, quantidade);
    console.log("Query: ", conversao);
    res.render("cotacao", {
      error: false,
      cotacao: convert.toMoney(cotacao),
      quantidade: convert.toMoney(quantidade),
      conversao: convert.toMoney(conversao),
    });
  } else {
    res.render("cotacao", { error: "Valores inválidos" });
  }
});

app.listen(3008, (err) => {
  if (err) {
    console.log("Não foi possível iniciar o servidor.");
  } else {
    console.log("Servidor rodando com sucesso na porta 3008.");
  }
});
