import { conectaApi } from "./conectaAPI.js";

try{
    const listaProdutos = await conectaApi.listaProdutos()

}
catch(e){
    alert(e)
}
const elementoLista = document.getElementById('lista')

async function montaListaProdutos (lista) {
    await lista.forEach(produto =>{
        elementoLista.innerHTML += `
            <li class="lista__item">
            <div class="item__caixa" id="item__caixa">
                <button id="deletar" class="caixa__botao caixa__botao--deletar"></button>
                <button id="editar" class="caixa__botao caixa__botao--editar"></button>
            </div>
            <p class="item__titulo" data-titulo>${produto.titulo}</p>
            <h2 class="item__preço" data-preco>R$ ${produto.preco}</h2>
            <p class="item__id" data-id>#${produto.id}</p>
            </li>`
    })
    
    const produtos = document.querySelectorAll('#item__caixa')
    produtos.forEach((produto, i)=>{
    produto.style.backgroundImage = `url("${lista[i].url}")`
    })

    const botoesDeletar = document.querySelectorAll('#deletar')
    botoesDeletar.forEach(botao => {
        botao.addEventListener('click', async (e)=>{
            const itemDaLista = e.target.parentNode.parentNode
            try {
                await conectaApi.removeItem(itemDaLista.querySelector('.item__id').innerHTML.substring(1)).then(()=>{
                    itemDaLista.classList.add('fade-out')
                    setTimeout(()=>{itemDaLista.style.display = 'none'}, "1000")
                })
            } catch (e){
                alert(e)
            }
        })
    })

    const botaoEditar = document.querySelectorAll('#editar')
    botaoEditar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const idClicado = e.target.parentNode.parentNode.querySelector('.item__id').innerHTML.substring(1)
            window.location.href = `./editar-produto.html?id=${idClicado}`
        })
    })
}

const produtos = document.querySelectorAll('#item__caixa')

async function montaListaProdutosIndex(lista){
    await lista.forEach((produto)=>{
        elementoLista.innerHTML += `
            <li class="lista__item--pesquisa">
                <img class="item__imagem" src="${produto.urlIndex}" alt="${produto.titulo}">
                <p class="item__titulo">${produto.titulo}</p>
                <p class="item__preco">R$ ${produto.preco}</p>
                <a class="item__link" href="./telas/produto-descricao.html?id=${produto.id}">Ver produto</a>
            </li>
        `       
    })
}

async function montaDescricao (id) {
    const elementoDescricao = document.getElementById('descricao')
    try{
        let itemSelecionado = await conectaApi.buscaProdutos(id)
        itemSelecionado = itemSelecionado[0]
        
        elementoDescricao.innerHTML = `
            <img class="descricao__imagem" src="${itemSelecionado.url}" alt="${itemSelecionado.titulo}">
            <div class="descricao__bloco container">
                <h1 class="descricao__titulo">${itemSelecionado.titulo}</h1>
                <h2 class="descricao__preco">${itemSelecionado.preco}</h2>
                <p class="descricao__paragrafo">${itemSelecionado.descricao}</p>
            </div>
        `
        const elementoListaSimilares = document.getElementById('similares__lista')
        elementoListaSimilares.innerHTML = ''
        const itensCategoriaSelecionada = await conectaApi.buscaProdutos(itemSelecionado.categoria)
        let maximoItens = 6
        itensCategoriaSelecionada.forEach(item => {
            if(maximoItens <= 0) {
                return
            }
            if(maximoItens <= 2 && item.id != id) {
                maximoItens--
                elementoListaSimilares.innerHTML += `
                    <li class="lista__item lista__item--desktop">
                        <img class="item__imagem" src="${item.url}" alt="${item.titulo}">
                        <h2 class="item__titulo">${item.titulo}</h2>
                        <h3 class="item__preco">${item.preco}</h3>
                        <a href="./produto-descricao.html?id=${item.id}">Ver produto</a>
                    </li>
                `
            }
            if(maximoItens >= 3 && item.id != id){
            maximoItens--
            elementoListaSimilares.innerHTML += `
                <li class="lista__item">
                    <img class="item__imagem" src="${item.url}" alt="${item.titulo}">
                    <h2 class="item__titulo">${item.titulo}</h2>
                    <h3 class="item__preco">${item.preco}</h3>
                    <a href="./produto-descricao.html?id=${item.id}">Ver produto</a>
                </li>
            `
            }
        })
    } catch(e){
        alert(e)
    }
}

export const mostraProdutos = {
    montaListaProdutos,
    montaListaProdutosIndex,
    montaDescricao
}