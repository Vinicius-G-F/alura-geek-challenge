const buscaBotao = document.getElementById('busca__botao')
const buscaTexto = document.getElementById('busca__texto')
const cabecalho = document.getElementById('cabecalho')

buscaBotao.addEventListener('click', ()=>{
    buscaTexto.style.display = 'block'
    buscaBotao.style.display = 'none'
    cabecalho.style.height = '8rem'
    cabecalho.style.flexWrap = 'wrap' 
    buscaTexto.focus()
})

buscaTexto.addEventListener('blur', async ()=>{
    if(buscaTexto.value == '' && window.screen.width<768){
        buscaTexto.style.display = 'none'
        buscaBotao.style.display = 'block'
        cabecalho.style.height = '5rem'
        cabecalho.style.flexWrap = 'nowrap'
    }
})

buscaTexto.addEventListener('keypress', async (e) =>{
    if(buscaTexto.value == ''){
        return
    }
    if(e.key== 'Enter'){
        window.location.href = `../index.html?id=${buscaTexto.value}#lista__pesquisa`
    }
})