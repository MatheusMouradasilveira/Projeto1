// fornecedor banco de dados
const supplierForm = document.getElementById('supplier-form')
const supplierList = document.getElementById('supplier-list')

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

// submit (GET)
supplierForm.addEventListener('submit', (e) => {
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

listSuppliers()