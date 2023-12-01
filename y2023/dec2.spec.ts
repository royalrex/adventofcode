import {describe, expect, it} from "vitest";
import {solve1, solve2} from "./dec2";
import {content} from "../lib/content";

describe("dec2", () => {
  describe("lib", () => {

  })

  it('should solve1', () => {
    const res1 = solve1(content(2, 2023).lines());
    console.log("solve1", res1)
    expect(res1).toBeDefined()
  })

  it('should solve2', () => {
    const res1 = solve2(content(2, 2023).lines());
    console.log("solve1", res1)
    expect(res1).toBeDefined()
  })
})