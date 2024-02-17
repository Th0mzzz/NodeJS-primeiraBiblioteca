import chalk from "chalk"

function extraiLinks(arrLinks) {
    return arrLinks.map(objetolink => Object.values(objetolink).join())
}

function manejaErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado'
    } else {
        return 'algo deu errado'
    }
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url, { method: 'HEAD' })
                return `${response.status} - ${response.statusText}`
            } catch (erro) {
                return manejaErros(erro)
            }
        })
    )
    return arrStatus
}



export default async function listaValidada(listaLinks) {

    const links = extraiLinks(listaLinks)
    const status = await checaStatus(links)
    return listaLinks.map((objeto, index) => ({ ...objeto, status: status[index] }))
}

//[gatinho salsicha](http://gatinhosalsicha.com.br/)