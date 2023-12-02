export const parseGamePairs1 = (games:string) => {
  const gameReg = /(\d+) (\w+)/g
  const pairs = games.split(';')

  return pairs.map(g => {
    const counts= []
    let m
    while (m = gameReg.exec(g)) {
      counts.push([[m[2]], parseInt(m[1])])
    }
    return Object.fromEntries(new Map(counts))
  })
}
export const parseGameLine1 = (line: string): { id: number, raw:string, games: Record<string, number>[] } => {
  const result = {
    id: 0, games: [], raw: '',
  }
  const gameReg = /Game (\d+):(.+)/
  const gameMatch = gameReg.exec(line)
  result.id = parseInt(gameMatch[1], 10)
  result.games = parseGamePairs1(gameMatch[2])
  result.raw = line

  return result
}

export const checkGameViability = (games: Record<string, number>[], config) => {
  return games
    .every((gamePairs) => Object.entries(gamePairs)
      .every(([key, value]) => {
        return config[key] >= value
      }))
}

export const calculateGamePower = (games:Record<string, number>[]) => {
  const bag:[string,number][] = [
    ['red',0],
    ['green',0],
    ['blue',0],
  ]

  return games.reduce((b, c) => {
    return b.map(([k, v]) =>  {
      return [k, c[k] > v ? c[k] : v] as [string,number]
    })
  }, bag)
    .filter(([_,v]) => v > 0)
    .reduce((p, c) => {
      return p * c[1]
    }, 1)
}

export const solve1 = (input: string[]): any => {
  const games = input.filter(l => l.trim().length > 0).map(l => parseGameLine1(l))

  const game1config = {
    'red': 12 ,
    'green': 13,
    'blue': 14,
  }

  const viableGameIds = games
    .filter((g) => checkGameViability(g.games, game1config))

  return viableGameIds.reduce((p, c) => p + c.id, 0)
}

export const solve2 = (input: string[]): any => {
  const games = input.filter(l => l.trim().length > 0).map(l => parseGameLine1(l))

  const gamePowers = games
    .map((g) => calculateGamePower(g.games))

  return gamePowers.reduce((p, c) => p + c, 0)
}
