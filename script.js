// cliente banco de dados
const costumerForm = document.getElementById('costumer-form')
const costumerList = document.getElementById('costumer-list')

// fornecedor banco de dados
const supplierForm = document.getElementById('supplier-form')
const supplierList = document.getElementById('supplier-list')

// medicamento banco de dados
const medicineForm = document.getElementById('medicine-form')
const medicineList = document.getElementById('medicine-list')

// venda banco de dados
const saleForm = document.getElementById('sale-form')
const saleList = document.getElementById('sale-list')

// funções de listagem
function listCostumers(){
    fetch('http://localhost:3000/clientes')
        .then(response => response.json())
        .then(data => {
            costumerList.innerHTML = ''
            data.forEach(costumer => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${costumer.id} - Nome: ${costumer.nome} - Endereço: ${costumer.endereco} - Email: ${costumer.email} - Telefone: ${costumer.telefone}`
                costumerList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

function listSuppliers(){
    fetch('http://localhost:3000/fornecedores')
        .then(response => response.json())
        .then(data => {
            supplierList.innerHTML = ''
            data.forEach(supplier => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${supplier.id} - Nome: ${supplier.nome} - Endereço: ${supplier.endereco} - Telefone: ${supplier.telefone}`
                supplierList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

function listMedicines(){
    fetch('http://localhost:3000/medicamentos')
        .then(response => response.json())
        .then(data => {
            medicineList.innerHTML = ''
            data.forEach(medicine => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${medicine.id} - Nome: ${medicine.nome} - Fabricante: ${medicine.fabricante} - Preço: ${medicine.preco} - Quantidade: ${medicine.quantidade}`
                medicineList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

function listSales(){
    fetch('http://localhost:3000/vendas')
        .then(response => response.json())
        .then(data => {
            saleList.innerHTML = ''
            data.forEach(sale => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${sale.id} - Nome: ${sale.data} - ID de Medicamento: ${sale.id_medicamento} - ID de Cliente: ${sale.id_cliente}`
                saleList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

// submit (GET)
costumerForm.addEventListener('submitCostumer', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id      = parseInt(document.getElementById('id').value)
    const name      = document.getElementById('name').value
    const adress       = document.getElementById('adress').value
    const email    = document.getElementById('email').value
    const telephone = document.getElementById('telephone').value

    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:id, nome: name, endereco: adress, email: email, telefone: telephone }),
    })
        .then(response => response.json())
        .then(() => {
            listCostumers()
            costumerForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

supplierForm.addEventListener('submitSupplier', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id      = parseInt(document.getElementById('id').value)
    const name      = document.getElementById('name').value
    const adress       = document.getElementById('adress').value
    const telephone = document.getElementById('telephone').value

    fetch('http://localhost:3000/fornecedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:id, nome: name, endereco: adress, telefone: telephone }),
    })
        .then(response => response.json())
        .then(() => {
            listSuppliers()
            supplierForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

medicineForm.addEventListener('submitMedicine', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id      = parseInt(document.getElementById('id').value)
    const name      = document.getElementById('name').value
    const manufacturer       = document.getElementById('manufacturer').value
    const price = parseInt(document.getElementById('price').value)
    const amount = parseInt(document.getElementById('amount').value)

    fetch('http://localhost:3000/medicamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:id, nome: name, fabricante: manufacturer, preco: price, quantidade: amount}),
    })
        .then(response => response.json())
        .then(() => {
            listMedicines()
            medicineForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

listCostumers()
listSuppliers()
listMedicines()
listSales()