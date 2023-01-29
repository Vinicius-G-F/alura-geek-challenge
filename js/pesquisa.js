const buscaBotao = document.getElementById('busca__botao')
const buscaTexto = document.getElementById('busca__texto')
const botaoLogin= document.getElementById('botao-login')

buscaBotao.addEventListener('click', ()=>{
    buscaTexto.style.display = 'block'
    buscaBotao.style.display = 'none'
    botaoLogin.style.display = 'none'
    buscaTexto.focus()
})


buscaTexto.addEventListener('blur', ()=>{
    if(buscaTexto.value == '' && window.screen.width<768){

        buscaTexto.style.display = 'none'
        buscaBotao.style.display = 'block'
        botaoLogin.style.display = 'block'
    }
})

buscaTexto.addEventListener('keypress', (e) =>{
    if(e.key== 'Enter'){
        console.log(e)
    }
    if(e == 'blur'){
        buscaTexto.style.display = 'none'
        buscaBotao.style.display = 'block'
    }
})