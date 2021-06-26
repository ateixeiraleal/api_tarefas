const express = require("express")
const mongoose = require("mongoose")

const tarefa_controller = require('./tarefas-controller')

// Efetua a conexão com o Banco de Dados criado no MongoDB Atlas.
mongoose.connect('mongodb+srv://ateixeiraleal:RkzVdrIPpkTRHl8c@cluster0.wwvsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise
try {
    let db = mongoose.connection
    db.on('errr', console.error.bind(console, 'erro de conexao no banco'))
} catch (e) {
    console.log(e)
}

const router = express.Router()

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('teste oi')
})

router.post('/tarefas', tarefa_controller.cadastrarTarefa)
router.get('/tarefas', tarefa_controller.listarTarefas)
router.get('/tarefas/:id', tarefa_controller.buscarTarefa)
router.put('/tarefas/:id', tarefa_controller.alterarTarefa)
router.delete('/tarefas/:id', tarefa_controller.deletarTarefa)

app.use('/', router)

/* Se houver uma variável de ambiente, denominada porta, no sistema onde a aplicação estiver rodando,
ela será utilizada. E caso ela seja nula, a porta 3000 será utilizada. */
let porta = process.env.PORT || 4000

app.listen(porta, () => {
    console.log("servidor em execucao na porta " + porta)
})