import { conectaApi } from "./conectaAPI.js"
import { mostraProdutos } from "./mostraProdutos.js"

async function pesquisaRedirecionamento () {

    
    const pegaURL = new URL(window.location)
    const id = pegaURL.searchParams.get('id')
    
    
    if(id){
        const elementoLista = document.getElementById('produtos-por-categoria')
        const itemPesquisado = document.getElementById('lista')
        const textoPesquisado = document.getElementById('lista__pesquisa')
        elementoLista.style.display = 'none'
        textoPesquisado.innerHTML = `Voce procurou por: "${id}" <button id="item-pesquisado" class="item-pesquisado">limpar filtro (X)</button>`
        try{
            const listaProdutos = await conectaApi.buscaProdutos(id)
            await mostraProdutos.montaListaProdutosIndex(listaProdutos)
        } catch(e){
            alert(e)
        }
        const botaoApagarPesquisa = document.getElementById('item-pesquisado')
        botaoApagarPesquisa.style.marginBottom = '1rem'
        botaoApagarPesquisa.addEventListener('click', ()=>{
            elementoLista.style.display = 'block'
            itemPesquisado.innerHTML = ''
            textoPesquisado.innerHTML = ''  
        })
    }
}

async function atualizaLista () {
    const listas = document.querySelectorAll('[data-lista]')
    const produtos = await conectaApi.listaProdutos()
    listas.forEach(lista =>{
        let maximoDeItens = 6
        produtos.forEach((produto)=>{
            if(maximoDeItens <= 0) {
                return
            }
            if(produto.categoria === lista.dataset.lista && maximoDeItens <= 2) {
                maximoDeItens--
                lista.innerHTML += `
                    <li class="lista__item--desktop lista__item--desktop">
                        <img class="item__imagem" src="${produto.urlIndex}" alt="${produto.titulo}">
                        <p class="item__titulo">${produto.titulo}</p>
                        <p class="item__preco">R$ ${produto.preco}</p>
                        <a class="item__link" href="./telas/produto-descricao.html?id=${produto.id}">Ver produto</a>
                    </li>
                ` 
            }
            if(produto.categoria === lista.dataset.lista && maximoDeItens >= 3){
                maximoDeItens--
                lista.innerHTML += `
                    <li class="lista__item">
                        <img class="item__imagem" src="${produto.urlIndex}" alt="${produto.titulo}">
                        <p class="item__titulo">${produto.titulo}</p>
                        <p class="item__preco">R$ ${produto.preco}</p>
                        <a class="item__link" href="./telas/produto-descricao.html?id=${produto.id}">Ver produto</a>
                    </li>
                ` 
            }
        })
    })
}

export const atualizaIndex = {
    pesquisaRedirecionamento,
    atualizaLista
}