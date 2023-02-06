async function listaProdutos () {
    const conexao = await fetch('http://localhost:3000/produtos')
    const conexaoConvertida = await conexao.json()
    if(!conexao.ok){
        throw new Error('Não foi possível carregar produtos')
    }
    return conexaoConvertida
}

async function enviaProdutoAPI (url, categoria, titulo, preco, descricao){
    const idNumero = Math.floor(Math.random()*10000000)
    const id = idNumero
    const conexao = await fetch('http://localhost:3000/produtos', {
        method:"POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            url: url,
            urlIndex: url,
            categoria: categoria,
            titulo: titulo,
            preco: preco,
            descricao: descricao,
            id: id,
        })
    })
    if(!conexao.ok){
        throw new Error('Não foi possível registrar o produto')
    }

    const conexaoConvertida = await conexao.json()
    return conexaoConvertida
}

async function buscaProdutos(textoDaBusca){
    const conexao = await fetch(`http://localhost:3000/produtos?q=${textoDaBusca}`)
    const conexaoConvertida = await conexao.json()
    if(!conexao.ok){
        throw new Error('Não foi possível procurar o produto')
    }

    return conexaoConvertida
}

async function removeItem (id){
    const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE'
    })
    if(!conexao.ok){
        throw new Error('Não foi possível deletar o produto')
    }

    const conexaoConvertida = await conexao.json()
    return conexaoConvertida
}

async function editaItem(id, url, categoria, titulo, preco, descricao) {
    let urlIndex = ''

    const regex = new RegExp('\.\.\/assets');

    if(regex.test(url)){
        urlIndex = url.substring(1)
    } else {
        urlIndex = url
    }


    const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            url: url,
            urlIndex: urlIndex,
            categoria: categoria,
            titulo: titulo,
            preco: preco,
            descricao: descricao,
            id: id,
        })  
    })
    if(!conexao.ok){
        throw new Error('Não foi possível editar o produto')
    }

}

export const conectaApi = {
    listaProdutos,
    enviaProdutoAPI,
    buscaProdutos,
    removeItem,
    editaItem
}