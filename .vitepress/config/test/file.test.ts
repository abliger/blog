// import test, { describe,before } from "node:test";
// import { fileTotal, getMonthlyUpdates, getWeeklyUpdates, lastFiles } from "../file.mts";
// import assert from "assert";

// describe("获得最新文件", () => {
//     test("获得最新编辑的文件", () => {
//         let files = lastFiles(20)
//         assert.ok(files.length === 20)
//     })
//     before(() => console.log('about to run some test'));

// })

// console.log(lastFiles(20));
// console.log(fileTotal);
// console.log(getMonthlyUpdates);
// console.log(getWeeklyUpdates);
import { getFileURLToNextOrPrev } from "../file.mts";
let a = getFileURLToNextOrPrev('frontEnd/js/从 NANOID 到 UUID —— js 代码的惊人细节.md')
console.log(a);
