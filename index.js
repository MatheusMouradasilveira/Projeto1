const express = require('express')
const server = express()
const fs = require('fs')
const cors = require('cors')

const dadosCliente = require('./data/cliente.json')
const dadosFornecedor = require('./data/fornecedor.json')
const dadosMedicamento = require('./data/medicamento.json')
const dadosVenda = require('./data/venda.json')

server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
    return res.json({mensagem: 'Nossa API está funcionando'})
})

server.listen(3000, () => {
console.log("Servidor está funcionando!")
});

// GET API

server.get('/clientes', (req, res) => {
    return res.json(dadosCliente.Cliente)
})

server.get('/fornecedores', (req, res) => {
    return res.json(dadosFornecedor.Fornecedor)
})

server.get('/medicamentos', (req, res) => {
    return res.json(dadosMedicamento.Medicamento)
})

server.get('/vendas', (req, res) => {
    return res.json(dadosVenda.Venda)
})

function salvarDadosCliente(){
    fs.writeFileSync(__dirname + '/data/cliente.json', JSON.stringify(dadosCliente, null, 2))
}

function salvarDadosFornecedor(){
    fs.writeFileSync(__dirname + '/data/fornecedor.json', JSON.stringify(dadosFornecedor, null, 2))
}

function salvarDadosMedicamento(){
    fs.writeFileSync(__dirname + '/data/medicamento.json', JSON.stringify(dadosMedicamento, null, 2))
}

function salvarDadosVenda(){
    fs.writeFileSync(__dirname + '/data/venda.json', JSON.stringify(dadosVenda, null, 2))
}

// POST API

server.post('/clientes', (req, res) => {
    const novoCliente = req.body

    if(!novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone){
        return res.status(400).json({mensagem:"Dados incompletos, tente novamente"})
    } else {
        dadosCliente.Cliente.push(novoCliente)
        salvarDadosCliente(dadosCliente)

        return res.status(201).json({mensagem:"Cadastro de Cliente completo!"})
    }
})

server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body

    if(!novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone){
        return res.status(400).json({mensagem:"Dados incompletos, tente novamente"})
    } else {
        dadosFornecedor.Fornecedor.push(novoFornecedor)
        salvarDadosFornecedor(dadosFornecedor)

        return res.status(201).json({mensagem:"Cadastro de Fornecedor completo!"})
    }
})

server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body

    if(!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preço || !novoMedicamento.quantidade){
        return res.status(400).json({mensagem:"Dados incompletos, tente novamente"})
    } else {
        dadosMedicamento.Medicamento.push(novoMedicamento)
        salvarDadosMedicamento(dadosMedicamento)

        return res.status(201).json({mensagem:"Cadastro de Medicamento completo!"})
    }
})

server.post('/vendas', (req, res) => {
    const novaVenda = req.body

    if(!novaVenda.data || !novaVenda.id_medicamento || !novaVenda.id_cliente){
        return res.status(400).json({mensagem:"Dados incompletos, tente novamente"})
    } else {
        dadosVenda.Venda.push(novaVenda)
        salvarDadosVenda(dadosVenda)

        return res.status(201).json({mensagem:"Cadastro de Venda completo!"})
    }
})

// UPDATE API

server.put('/clientes/:id', (req, res) => {
    const clienteID = parseInt(req.params.id)
    const atualizarCliente = req.body

    const indiceCliente = dadosCliente.Cliente.findIndex(cliente => cliente.id === clienteID)

    if (indiceCliente === -1){
        return res.status(404).json({mensagem:"Cliente não encontrado"})
    }


    // Atualiza ou não modifica o nome
    dadosCliente.Cliente[indiceCliente].nome = atualizarCliente.nome || dadosCliente.Cliente[indiceCliente].nome

    // Atualiza ou não modifica o endereço
    dadosCliente.Cliente[indiceCliente].endereco = atualizarCliente.endereco || dadosCliente.Cliente[indiceCliente].endereco

    // Atualiza ou não modifica o email
    dadosCliente.Cliente[indiceCliente].email = atualizarCliente.email || dadosCliente.Cliente[indiceCliente].email

    // Atualiza ou não modifica o telefone
    dadosCliente.Cliente[indiceCliente].telefone = atualizarCliente.telefone || dadosCliente.Cliente[indiceCliente].telefone

    salvarDadosCliente(dadosCliente)

    return res.json({mensagem:"Cliente atualizado com sucesso", cliente: dadosCliente.Cliente[indiceCliente]})
})

server.put('/fornecedores/:id', (req, res) => {
    const fornecedorID = parseInt(req.params.id)
    const atualizarFornecedor = req.body

    const indiceFornecedor = dadosFornecedor.Fornecedor.findIndex(fornecedor => fornecedor.id === fornecedorID)

    if (indiceFornecedor === -1){
        return res.status(404).json({mensagem:"Fornecedor não encontrado"})
    }


    // Atualiza ou não modifica o nome
    dadosFornecedor.Fornecedor[indiceFornecedor].nome = atualizarFornecedor.nome || dadosFornecedor.Fornecedor[indiceFornecedor].nome

    // Atualiza ou não modifica o endereço
    dadosFornecedor.Fornecedor[indiceFornecedor].endereco = atualizarFornecedor.endereco || dadosFornecedor.Fornecedor[indiceFornecedor].endereco

    // Atualiza ou não modifica o telefone
    dadosFornecedor.Fornecedor[indiceFornecedor].telefone = atualizarFornecedor.telefone || dadosFornecedor.Fornecedor[indiceFornecedor].telefone

    salvarDadosFornecedor(dadosFornecedor)

    return res.json({mensagem:"Fornecedor atualizado com sucesso", fornecedor: dadosFornecedor.Fornecedor[indiceFornecedor]})
})

server.put('/medicamentos/:id', (req, res) => {
    const medicamentoID = parseInt(req.params.id)
    const atualizarMedicamento = req.body

    const indiceMedicamento = dadosMedicamento.Medicamento.findIndex(medicamento => medicamento.id === medicamentoID)

    if (indiceMedicamento === -1){
        return res.status(404).json({mensagem:"Medicamento não encontrado"})
    }


    // Atualiza ou não modifica o nome
    dadosMedicamento.Medicamento[indiceMedicamento].nome = atualizarMedicamento.nome || dadosMedicamento.Medicamento[indiceMedicamento].nome

    // Atualiza ou não modifica o fabricante
    dadosMedicamento.Medicamento[indiceMedicamento].fabricante = atualizarMedicamento.fabricante || dadosMedicamento.Medicamento[indiceMedicamento].fabricante

    // Atualiza ou não modifica o preço
    dadosMedicamento.Medicamento[indiceMedicamento].preço = atualizarMedicamento.preço || dadosMedicamento.Medicamento[indiceMedicamento].preço

    // Atualiza ou não modifica o quantidade
    dadosMedicamento.Medicamento[indiceMedicamento].quantidade = atualizarMedicamento.quantidade || dadosMedicamento.Medicamento[indiceMedicamento].quantidade

    salvarDadosMedicamento(dadosMedicamento)

    return res.json({mensagem:"Medicamento atualizado com sucesso", medicamento: dadosMedicamento.Medicamento[indiceMedicamento]})
})

server.put('/vendas/:id', (req, res) => {
    const vendaID = parseInt(req.params.id)
    const atualizarVenda = req.body

    const indiceVenda = dadosVenda.Venda.findIndex(venda => venda.id === vendaID)

    if (indiceVenda === -1){
        return res.status(404).json({mensagem:"Venda não encontrada"})
    }


    // Atualiza ou não modifica a data
    dadosVenda.Venda[indiceVenda].data = atualizarVenda.data || dadosVenda.Venda[indiceVenda].data

    // Atualiza ou não modifica o id_medicamento
    dadosVenda.Venda[indiceVenda].id_medicamento = atualizarVenda.id_medicamento || dadosVenda.Venda[indiceVenda].id_medicamento

    // Atualiza ou não modifica o id_cliente
    dadosVenda.Venda[indiceVenda].id_cliente = atualizarVenda.id_cliente || dadosVenda.Venda[indiceVenda].id_cliente

    salvarDadosVenda(dadosVenda)

    return res.json({mensagem:"Venda atualizada com sucesso", venda: dadosVenda.Venda[indiceVenda]})
})

// DELETE API

server.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Filtrar os Clientes, removendo pelo ID correspondente
    // U se refere ao Cliente

    dadosCliente.Cliente = dadosCliente.Cliente.filter(u => u.id !== id)

    salvarDadosCliente(dadosCliente)
    return res.status(200).json({mensagem:"Cliente excluido com sucesso"})
})

server.delete('/fornecedores/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Filtrar os Fornecedores, removendo pelo ID correspondente
    // U se refere ao Fornecedor

    dadosFornecedor.Fornecedor = dadosFornecedor.Fornecedor.filter(u => u.id !== id)

    salvarDadosFornecedor(dadosFornecedor)
    return res.status(200).json({mensagem:"Fornecedor excluido com sucesso"})
})

server.delete('/medicamentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Filtrar os Medicamentos, removendo pelo ID correspondente
    // U se refere ao Medicamento

    dadosMedicamento.Medicamento = dadosMedicamento.Medicamento.filter(u => u.id !== id)

    salvarDadosMedicamento(dadosMedicamento)
    return res.status(200).json({mensagem:"Medicamento excluido com sucesso"})
})

server.delete('/vendas/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // Filtrar as Vendas, removendo pelo ID correspondente
    // U se refere a Venda

    dadosVenda.Venda = dadosVenda.Venda.filter(u => u.id !== id)

    salvarDadosVenda(dadosVenda)
    return res.status(200).json({mensagem:"Venda excluido com sucesso"})
})