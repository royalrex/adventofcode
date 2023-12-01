import {readFileSync} from "node:fs";

export const content = (day: number, year: number) => {
    const fileContent = readFileSync(`./y${year}/dec${day}.txt`, 'utf-8')
    return {
        raw:fileContent,
        lines:() => fileContent.split('\n'),
        grid:() => fileContent.split('\n').map(r => r.split(''))
    }
}