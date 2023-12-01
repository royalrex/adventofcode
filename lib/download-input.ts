import {writeFile} from "node:fs";

async function downloadInput() {
    const year = (new Date()).getFullYear()
    const day = (new Date()).getDate()

    if (day > 24) return;

    for (let d = 1; d <= day; d++) {
        const url = `https://adventofcode.com/${year}/day/${d}/input`;
        const input = await (await fetch(url, {headers:{"cookie":"session=53616c7465645f5f332a1e1629307bc1f6b04e7e4cb7223c50786c7a46d7b22e2465cf9cd92091f766a2abe510b1f3215baa44c66eaec9a296da2f58992a1400"}})).text();


        writeFile(`./y${year}/dec${d}.txt`, input, err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
    }
}

downloadInput()