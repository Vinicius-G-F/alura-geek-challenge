import { conectaApi } from "./conectaAPI.js"
import { mostraProdutos } from "./mostraProdutos.js"

const buscaBotao = document.getElementById('busca__botao')
const buscaTexto = document.getElementById('busca__texto')
const cabecalho = document.getElementById('cabecalho')
const elementoLista = document.getElementById('produtos-por-categoria')
const itemPesquisado = document.getElementById('lista')
const textoPesquisado = document.getElementById('lista__pesquisa')

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
    if(buscaTexto.value == ''){
        elementoLista.style.display = 'block'
        itemPesquisado.innerHTML = ''
        textoPesquisado.innerHTML = ''
    }
})

buscaTexto.addEventListener('keypress', async (e) =>{
    if(buscaTexto.value == ''){
        return
    }
    if(e.key== 'Enter'){
        itemPesquisado.innerHTML = ''    
        elementoLista.style.display = 'none'
        textoPesquisado.innerHTML = `Voce procurou por: "${buscaTexto.value}" <button id="item-pesquisado" class="item-pesquisado">limpar filtro (X)</button>`
        try {
            const listaProdutos = await conectaApi.buscaProdutos(buscaTexto.value)
        } catch (e){
            alert(e)
        }
        mostraProdutos.montaListaProdutosIndex(listaProdutos)
        const botaoApagarPesquisa = document.getElementById('item-pesquisado')
        botaoApagarPesquisa.style.marginBottom = '1rem'
        botaoApagarPesquisa.addEventListener('click', ()=>{
            elementoLista.style.display = 'block'
            itemPesquisado.innerHTML = ''
            textoPesquisado.innerHTML = ''
            buscaTexto.value = ''  
        })
        window.location.href = '#lista__pesquisa'
    }
})