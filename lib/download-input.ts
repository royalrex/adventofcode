import {writeFile} from "node:fs";

async function downloadInput() {
    const year = (new Date()).getFullYear()
    const day = (new Date()).getDate()

    if (day > 24) return;

    for (let d = 1; d <= day; d++) {
        const url = `https://adventofcode.com/${year}/day/${d}/input`;
        const input = await (await fetch(url, {headers:{"cookie":`session=${process.env.AOC_COOKIE}`}})).text();


        writeFile(`./y${year}/dec${d}.txt`, input, err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
    }
}

downloadInput()