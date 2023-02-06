import { conectaApi } from "./conectaAPI.js"

const form = document.getElementById('adicionar')
const nome = document.getElementById('campo__nome')
const url = document.getElementById('campo__url')
const categoria = document.getElementById('campo__categoria')
const preco = document.getElementById('campo__preco')
const descricao = document.getElementById('campo__descricao')
const mensagem = document.getElementById('adicionar__mensagem')

form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    try {
        await conectaApi.enviaProdutoAPI(url.value, categoria.value, nome.value, preco.value, descricao.value).then(()=>{
            url.value = '' 
            categoria.value = '' 
            nome.value = ''
            preco.value = ''
            descricao.value = ''
            mensagem.innerHTML = 'Produto registrado com sucesso.'

        })
    } catch (e){
        alert(e)
    }
})