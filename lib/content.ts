import {readFileSync} from "node:fs";

export const content = (day: number | string, year?: number) => {
  let fileContent = ''
  if (typeof day === 'string') {
    fileContent = day
  } else {
    fileContent = readFileSync(`./y${year}/dec${day}.txt`, 'utf-8')
  }
  return {
    raw: fileContent,
    lines: () => fileContent.split('\n'),
    grid: () => fileContent.split('\n').map(r => r.split(''))
  }
}