// medicamento banco de dados
const medicineForm = document.getElementById('medicine-form')
const medicineList = document.getElementById('medicine-list')

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

// submit (GET)
medicineForm.addEventListener('submit', (e) => {
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

listMedicines()