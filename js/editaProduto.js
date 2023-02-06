import { conectaApi } from "./conectaAPI.js";

const form = document.getElementById('adicionar')
const nome = document.getElementById('campo__nome')
const url = document.getElementById('campo__url')
const categoria = document.getElementById('campo__categoria')
const preco = document.getElementById('campo__preco')
const descricao = document.getElementById('campo__descricao')
const mensagem = document.getElementById('adicionar__mensagem')

const pegaURL = new URL(window.location)
const id = pegaURL.searchParams.get('id')

const produtoAPI = await conectaApi.buscaProdutos(id)
const produto = produtoAPI[0]

url.value =  produto.url
categoria.value = produto.categoria
nome.value = produto.titulo
preco.value = produto.preco
descricao.value = produto.descricao

form.addEventListener('submit',async e =>{
    e.preventDefault()
    try{
        await conectaApi.editaItem(id, url.value, categoria.value, nome.value, preco.value, descricao.value).then(()=>{
            url.value = '' 
            categoria.value = '' 
            nome.value = ''
            preco.value = ''
            descricao.value = ''
            mensagem.innerHTML = 'Produto editado com sucesso.'
        })
    } catch(e){
        alert(e)
    }
})