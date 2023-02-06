import { mostraProdutos } from "./mostraProdutos.js"


const pegaURL = new URL(window.location)
const id = pegaURL.searchParams.get('id')

await mostraProdutos.montaDescricao(id)