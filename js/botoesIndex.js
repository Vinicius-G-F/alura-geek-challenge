import { conectaApi } from "./conectaAPI.js"
import { mostraProdutos } from "./mostraProdutos.js"

const botoesDeAncoragem = document.querySelectorAll('[data-ancora]')
const elementoLista = document.getElementById('produtos-por-categoria')
const itemPesquisado = document.getElementById('lista')
const textoPesquisado = document.getElementById('lista__pesquisa')

const buscaTexto = document.getElementById('busca__texto')

botoesDeAncoragem.forEach(botao => {
    botao.addEventListener('click',async ()=>{
        itemPesquisado.innerHTML = ''    
        elementoLista.style.display = 'none'
        textoPesquisado.innerHTML = `Voce procurou por: "${botao.dataset.ancora}" <button id="item-pesquisado" class="item-pesquisado">limpar filtro (X)</button>`
        const listaProdutos = await conectaApi.buscaProdutos(botao.dataset.ancora)
        mostraProdutos.montaListaProdutosIndex(listaProdutos)
        const botaoApagarPesquisa = document.getElementById('item-pesquisado')
        botaoApagarPesquisa.style.marginBottom = '1rem'
        botaoApagarPesquisa.addEventListener('click', ()=>{
            elementoLista.style.display = 'block'
            itemPesquisado.innerHTML = ''
            textoPesquisado.innerHTML = ''
            buscaTexto.value = ''  
        })
    })
})