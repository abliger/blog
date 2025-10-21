import { dir, getFileNameByNextOrPrev } from "../../config/file";

for (let index = 0; index < dir.length; index++) {
    const element = dir[index];
    getFileNameByNextOrPrev(element)
}
console.log(dir);

