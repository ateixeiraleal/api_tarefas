var Tarefas = require('./tarefas-model')

exports.cadastrarTarefa = function (req, res) {
    let tarefa = new Tarefas({
        descricao: req.body.descricao,
        prazo: req.body.prazo,
        completa: req.body.completa
    })
    tarefa.save(function (err){
        if (err) {
            return next(err)
        }
    })
    res.send('Tarefa cadastrada com sucesso!')
}

exports.listarTarefas = function (req, res) {
    Tarefas.find({}, function (err, tarefas) {
        if (err) return next(err)
        return res.json(tarefas);
    })
}

exports.buscarTarefa = function (req, res) {
    Tarefas.findById(req.params.id, function(err, tarefa){
        if (err) return next(err)
        return res.json(tarefa)
    })
}

exports.alterarTarefa = function (req, res) {
    Tarefas.findOneAndUpdate({_id: req.params.id}, {$set: {
        descricao: "Jantar com o rei",
        prazo: "2021-07-01",
        completa: false
        }}, function(err, tarefa){
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Tarefa não foi alterada :-("
        })
    })
    return res.json({
        error: false,
        message: "Tarefa alterada com sucesso :-)"
    })
}

exports.deletarTarefa = function (req, res) {
    Tarefas.deleteOne({_id: req.params.id}, function(err, tarefa){
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Tarefa não foi excluída :-("
        })
    })

    return res.json({
        error: false,
        message: "Tarefa excluída com sucesso :-)"
    })
}