import { getUrlFile } from "../getUrlFile.ts";


const files = getUrlFile('doc/java', ["md"]);
console.log(files);
