import { dir, getFileNameByNextOrPrev } from "../../config/file.mts";

for (let index = 0; index < dir.length; index++) {
    const element = dir[index];
    getFileNameByNextOrPrev(element)
}
console.log(dir);

