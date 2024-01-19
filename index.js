import fs from 'fs';
import chalk from 'chalk';



function extractLinks(text) {
    const regex = /https?:\/\/[\w]*.[^\s\)]*/gm;
    const captures = [...text.matchAll(regex)]
    const results = captures.map(capture => ({ [capture[1]]: capture[2] }))
    return results
}

function solveError(error) {
    console.log(error)
    throw new Error(chalk.red(error.code, '###ERROR###'))
}

async function catchFile(path) {
    try {
        const encoding = 'utf-8'
        const result = await fs.promises.readFile(path, encoding)
        console.log(extractLinks(result))
    } catch (error) {
        solveError(error)
    }
}

catchFile("./arquivos/texto.md");


