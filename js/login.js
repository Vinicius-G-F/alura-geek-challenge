const senha = 'senha-forte'
const email = 'usuario@dominio.com'
const form = document.querySelector('[data-form]')
const campoSenha = document.querySelector('[data-senha]')
const campoEmail = document.querySelector('[data-email]')
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    if (campoEmail.value === email && campoSenha.value === senha){
        window.location.href = './produtos.html'
    }
})