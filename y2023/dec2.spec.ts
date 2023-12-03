import {describe, expect, it} from "vitest";
import {calculateGamePower, checkGameViability, parseGameLine1, parseGamePairs1, solve1, solve2} from "./dec2";
import {content} from "../lib/content";

const example1 = [
  ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', {id:1,games:[
    {'blue': 3, 'red': 4},
    {'red': 1, 'green': 2, 'blue': 6},
    {'green': 2},
  ]}],
  ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', {id:2,games:[
      {'blue': 1, 'green': 2},
      {'red': 1, 'green': 3, 'blue': 4},
      {'green': 1, 'blue': 1},
    ]}],
  ['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', {id:3,games:[
    {'green': 8, 'red': 20, 'blue': 6},
    {'red': 4, 'green': 13, 'blue': 5},
    {'green': 5, 'red': 1},
  ]}],
  ['Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', {id:4,games:[
    {'red': 3, 'green': 1, 'blue': 6},
    {'red': 6, 'green': 3},
    {'red': 14, 'green': 3, 'blue': 15},
  ]}],
  ['Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', {id:5,games:[
    {'red': 6, 'green': 3, 'blue': 1},
    {'red': 1, 'green': 2, 'blue': 2},
  ]}],
]

const example1powers = [
  [48, 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'],
  [12, 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'],
  [3, 'Game 2: 2 green; 3 green, 1 red; 1 green'],
]

const example1config = {
  'red': 12 ,
  'green': 13,
  'blue': 14,
}
const example1viability = [
  ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', true],
  ['Game 1: 3 blue, 4 red; 1 red, 13 green, 6 blue; 2 green', true],
  ['Game 1: 3 blue, 4 red; 1 red, 14 green, 6 blue; 2 green', false],
  ['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', false],
]

describe("dec2", () => {
  describe("lib", () => {
    it.each(example1viability)('game % is viable %s', (line:string, viable:any) => {
      const game = parseGameLine1(line)
      expect(checkGameViability(game.games, example1config)).toEqual(viable)
    });

    it.each(example1)('should get the game id in %s', (line:string, expected:any) => {
      const res = parseGameLine1(line)
      expect(res).toHaveProperty('id')
      expect(res.id).toEqual(expected.id)
    })

    it.each(example1)('should count marbles in game %s', (line:string, expected:any) => {
      const parts = line.split(':')
      expect(parts).toHaveLength(2)
      expect(parseGamePairs1(parts[1])).toEqual(expected.games)
    });

    it.each(example1powers)('the power is %s for game %s', (expected:any, line:string) => {
      const game = parseGameLine1(line)
      const res = calculateGamePower(game.games)
      expect(res).toEqual(expected)
    })
  })

  it('should solve1', () => {
    const res1 = solve1(content(2, 2023).lines());
    console.log("solve1", res1)
    expect(res1).toBeDefined()
  })

  it('should solve2', () => {
    const res2 = solve2(content(2, 2023).lines());
    console.log("solve2", res2)
    expect(res2).toBeDefined()
  })
})