import {describe, expect, it} from "vitest";
import {content} from "../lib/content";
import {
  findCellsWithAdjacentSymbol,
  findGearPairs,
  getNumberLine,
  hasAdjacentSymbol,
  linkedGrid,
  solve1,
  solve2
} from "./dec3";

const example1input =
  `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const gridSource =
  `.N.
WXE
.S.`
describe("dec3", () => {
  describe("lib", () => {
    it('should parse input to a linked list', () => {

      const grid = content(gridSource).grid()

      const map = linkedGrid(grid)

      expect(map).toHaveLength(3)
      expect(map[0]).toHaveLength(3)

      expect(map[1][1].item).toEqual('X')
      expect(map[1][1].north.item).toEqual('N')
      expect(map[1][1].west.item).toEqual('W')

      expect(map[1][2].item).toEqual('E')
      expect(map[2][1].item).toEqual('S')
    })

    it.each([
      [2, 2, true],
      [2, 3, true],
      [9, 5, true],
      [9, 9, false],
    ])('should test if coords (%s;%s) have adjacent symbol %s', (x, y, expected) => {
      const grid = content(example1input).grid()
      const map = linkedGrid(grid)

      expect(hasAdjacentSymbol(map[x][y])).toBe(expected)
    })

    it('should get the full number in the line', () => {
      const lineWithNumber = '..*1234..*#..666.'
      const parsedLine = linkedGrid([lineWithNumber.split('')])

      const num = getNumberLine(parsedLine[0][5])
      expect(num.number).toBe(1234)
    });

    it('should list all number cells with adjacent symbol', () => {
      const grid = content(example1input).grid()
      const map = linkedGrid(grid)

      const cells = findCellsWithAdjacentSymbol(map)

      expect(Array.from(cells.values())).toEqual([467, 35, 633, 617, 592, 755, 664, 598])
    })

    it('should find the adjacent numbers', () => {
      const mapAdjacentPairs = `1...
.*.1
.23.`

      const grid = content(mapAdjacentPairs).grid()

      const map = linkedGrid(grid)
      expect(map[1][1].item).toEqual('*')
      expect(Array.from(findGearPairs(map[1][1]).values()).map(i => i)).toEqual([23,1])
    });
  })

  it('should solve1', () => {
    const res1 = solve1(content(3, 2023).grid());
    console.log("solve1", res1)
    expect(res1).toBeDefined()
  })

  it('should solve2', () => {
    //const res1 = solve2(content(3, 2023).grid());
    const res2 = solve2(content(3, 2023).grid());
    console.log("solve2", res2)
    expect(res2).toBeDefined()
  })
})