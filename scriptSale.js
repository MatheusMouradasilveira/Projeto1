// venda banco de dados
const saleForm = document.getElementById('sale-form')
const saleList = document.getElementById('sale-list')

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
saleForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id      = parseInt(document.getElementById('id').value)
    const date      = document.getElementById('name').value
    const id_medicine       = parseInt(document.getElementById('id_medicine').value)
    const id_customer = parseInt(document.getElementById('id_customer').value)

    fetch('http://localhost:3000/vendas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:id, data: date, id_medicamento: id_medicine, id_cliente: id_customer}),
    })
        .then(response => response.json())
        .then(() => {
            listSales()
            saleForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

listSales()