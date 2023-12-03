export type LinkedGridItem = {
  item: string
  north: LinkedGridItem | null
  east: LinkedGridItem | null
  south: LinkedGridItem | null
  west: LinkedGridItem | null
  northEast: LinkedGridItem | null
  northWest: LinkedGridItem | null
  southEast: LinkedGridItem | null
  southWest: LinkedGridItem | null
}
export const linkedGridItem = (
  item: string
): LinkedGridItem => {
  return {
    item, north: null, east: null, south: null, west: null
    , northWest: null, northEast: null, southWest: null, southEast: null
  }
}
export const linkedGrid = (grid: string[][]) => {
  const map = grid.map((row, rowIdx, allRows) => {
    return row.map((cell, cellIdx, allCells) => {
      return linkedGridItem(cell)
    })
  })

  map.forEach((row, rowIdx, allRows) => {
    const rowBefore = rowIdx > 0 ? allRows[rowIdx - 1] : null
    const rowAfter = rowIdx < allRows.length - 1 ? allRows[rowIdx + 1] : null

    row.forEach((cell, cellIdx, allCells) => {
      let cellBefore = cellIdx > 0 ? allCells[cellIdx - 1] : null

      let cellAfter = cellIdx < allCells.length - 1 ? allCells[cellIdx + 1] : null
      let cellAbove = rowBefore ? rowBefore[cellIdx] : null
      let cellBelow = rowAfter ? rowAfter[cellIdx] : null

      cell.north = cellAbove
      cell.east = cellAfter
      cell.south = cellBelow
      cell.west = cellBefore

      if (cellAbove) { // we're not on first row, so map
        let cellNE = cellAbove ? cellAbove.east : null
        cell.northEast = cellNE
        if (cellNE) cellNE.southWest = cell

        let cellNW = cellAbove ? cellAbove.west : null
        cell.northWest = cellNW
        if (cellNW) cellNW.southEast = cell
      }

      return cell
    })
  })

  return map
}

export const hasAdjacentSymbol = (cell: LinkedGridItem) => {
  const isSymbol = /[^\d\.]/

  return [
    cell.north?.item, cell.east?.item, cell.south?.item, cell.west?.item,
    cell.northEast?.item, cell.northWest?.item, cell.southEast?.item, cell.southWest?.item
  ].findIndex((item) => item && isSymbol.test(item)) > -1
}

export const getNumberLine = (cell: LinkedGridItem) => {
  const num = /\d/
  let start = cell
  while (num.test(start.west?.item)) {
    start = start.west
  }

  let next = start
  let result = []
  while (num.test(next.item)) {
    result.push(next.item)
    if (!next.east) break;
    next = next.east
  }
  return {start, number: parseInt(result.join(''), 10)}
}
export const findCellsWithAdjacentSymbol = (map: LinkedGridItem[][]) => {
  const result = new Map<LinkedGridItem, number>()
  for (const row of map) {
    for (const cell of row) {
      if (/\d/.test(cell.item) && hasAdjacentSymbol(cell)) {
        const num = getNumberLine(cell)
        result.set(num.start, num.number)
      }
    }
  }
  return result
}

export const solve1 = (input: string[][]): any => {
  const map = linkedGrid(input)
  const cells = findCellsWithAdjacentSymbol(map)

  return Array.from(cells.values())
    .reduce((p, c) => p + c, 0)
}

export const findCells = (map: LinkedGridItem[][], match:string|number|RegExp) => {
  const result: LinkedGridItem[] = []
  for (const row of map) {
    for (const cell of row) {
      if (match instanceof RegExp && match.test(cell.item)) {
        result.push(cell)
      } else if (cell.item == match) {
        result.push(cell)
      }
    }
  }
  return result
}
export const findGearPairs = (cell:LinkedGridItem) => {
  // cell = *
  // find the two adjacent numbers
  const numberRegex = /\d/
  const numberCells = [
    cell.north, cell.east, cell.south, cell.west,
    cell.northEast, cell.northWest, cell.southEast, cell.southWest
  ].filter((item) => item && numberRegex.test(item.item))

  const result = new Map<LinkedGridItem, number>()
  for (const numCell of numberCells) {
    if (/\d/.test(numCell.item)) {
      const num = getNumberLine(numCell)
      result.set(num.start, num.number)
    }
  }

  return result
}

export const solve2 = (input: string[][]): any => {
  const map = linkedGrid(input)
  const cells = findCells(map, '*')

  const gearPowers = []

  for (const gearCell of cells) {
    const pair = Array.from(findGearPairs(gearCell).values())
    if (pair.length !== 2) {
      continue
    }
    const power = pair.reduce((p,c) => p * c, 1)
    gearPowers.push(power)
  }

  return gearPowers
    .reduce((p, c) => p + c, 0)
}
