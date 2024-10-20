// cliente banco de dados
const customerForm = document.getElementById('customer-form')
const customerList = document.getElementById('customer-list')

function listCostumers(){
    fetch('http://localhost:3000/clientes')
        .then(response => response.json())
        .then(data => {
            customerList.innerHTML = ''
            data.forEach(customer => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${customer.id} - Nome: ${customer.nome} - Endereço: ${customer.endereco} - Email: ${customer.email} - Telefone: ${customer.telefone}`
                customerList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

// submit (GET)
customerForm.addEventListener('submit', (e) => {
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

listCostumers()