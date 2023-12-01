import {describe, expect, it} from "vitest";
import {parseLine1, parseLine2, solve1, solve2, translateHumanNumbers} from "./dec1";
import {content} from "../lib/content";

const example1: [string, number][] = [
  ['1abc2', 12],
  ['pqr3stu8vwx', 38],
  ['a1b2c3d4e5f', 15],
  ['treb7uchet', 77],
]
/**
 * two1nine
 * eightwothree
 * abcone2threexyz
 * xtwone3four
 * 4nineeightseven2
 * zoneight234
 * 7pqrstsixteen
 */
const example2: [string, number][] = [
  ['two1nine', 29],
  ['eightwothree', 83],
  ['abcone2threexyz', 13],
  ['xtwone3four', 24],
  ['4nineeightseven2', 42],
  ['zoneight234', 14],
  ['7pqrstsixteen', 76],
]
describe("dec1", () => {
  describe("lib", () => {
    it.each([
      ['zero', '0'],
      ['three', '3'],
      ['six', '6'],
      ['nine', '9'],
    ])('should translate text to number', (text, num) => {
      expect(translateHumanNumbers(text)).toEqual(num)
    })
    it.each(example1)('should parse line a1bcd3 = 13', (line, result) => {
      expect(parseLine1(line)).toEqual(result)
    });
    it.each(example2)('should parse line %s = %s', (line, result) => {
      expect(parseLine2(line)).toEqual(result)
    });
    it("it should catch overlapping matches 'lnmqnine855four17twoeightwolx'", async () => {
      expect(parseLine2('lnmqnine855four17twoeightwolx')).toEqual(92)
    })
  })

  it("it should solve example1", async () => {
    expect(solve1(example1.map(r => r[0]))).toEqual(142)
  })
  it("it should solve example2", async () => {
    expect(solve2(example2.map(r => r[0]))).toEqual(281)
  })

  it("should solve1", async () => {
    const lines = content(1, 2023).lines()
    console.log("solve1", solve1(lines))
  })
  it("should solve2", async () => {
    const lines = content(1, 2023).lines()
    console.log("solve2", solve2(lines))
  })
})