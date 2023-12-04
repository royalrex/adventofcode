import {writeFile} from "node:fs";
require('dotenv').config()

async function downloadInput() {
  const year = (new Date()).getFullYear()
  const day = (new Date()).getDate()

  if (day > 24) return;

  for (let d = 1; d <= day; d++) {
    const url = `https://adventofcode.com/${year}/day/${d}/input`;
    const response = await (await fetch(url, {headers: {"cookie": `session=${process.env.AOC_COOKIE}`}}));

    if (!response.ok) {
      console.error(`Unable to download input from Day ${d}`)
      continue
    }

    const input = await response.text()
    writeFile(`./y${year}/dec${d}.txt`, input, err => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }
}

downloadInput()