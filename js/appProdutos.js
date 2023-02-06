import { conectaApi } from "./conectaAPI.js"
import { mostraProdutos } from "./mostraProdutos.js"

const listaProdutos = await conectaApi.listaProdutos()

mostraProdutos.montaListaProdutos(listaProdutos)

