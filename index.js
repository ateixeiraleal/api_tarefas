const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('teste oi')
})

/* Se houver uma variável de ambiente, denominada porta, no sistema onde a aplicação estiver rodando,
ela será utilizada. E caso ela seja nula, a porta 3000 será utilizada. */
let porta = process.env.PORT || 4000

app.listen(porta, () => {
    console.log("servidor em execucao na porta " + porta)
})