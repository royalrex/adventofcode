import {content} from "../lib/content";

export const translateHumanNumbers = (value: string) => {
  switch (value) {
    case 'one':
      return '1'
    case 'two':
      return '2'
    case 'three':
      return '3'
    case 'four':
      return '4'
    case 'five':
      return '5'
    case 'six':
      return '6'
    case 'seven':
      return '7'
    case 'eight':
      return '8'
    case 'nine':
      return '9'
    case 'zero':
      return '0'
  }
  return value
}
export const parseLine1 = (line: string) => {
  const m = line.match(/(\d)/g)

  if (!m) {
    return 0
  }

  const first = m.at(0)
  const last = m.at(-1)

  return m ? parseInt(first + last, 10) : 0
}
export const parseLine2 = (line: string) => {
  const m = [];
  const regex = /(\d|one|two|three|four|five|six|seven|eight|nine)/
  let match = []
  let i = 0
  while (match = regex.exec(line)) {
    m.push(match[0]);
    line = line.substring(match.index + 1)
  }

  if (!m.length) {
    return 0
  }

  const first = translateHumanNumbers(m.at(0))
  const last = translateHumanNumbers(m.at(-1))

  return m ? parseInt(first + last, 10) : 0
}

export const solve1 = (input: string[]): number => {
  return input.reduce((previousValue, currentValue) => {
    return previousValue + parseLine1(currentValue)
  }, 0)
}

export const solve2 = (input: string[]): number => {
  return input.reduce((previousValue, currentValue) => {
    return previousValue + parseLine2(currentValue)
  }, 0)
}
const main = () => {
  const c = content(1, 2023)
  return solve1(c.lines())
}
console.log(main())