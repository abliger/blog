import { exec, execSync, spawnSync } from "child_process";
import { readFileSync, unlinkSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import OpenAI from "openai";
import { exit } from "process";
if (!process.env.DEEPSEEKAPIKEY) {
  throw new Error("找不到 deepseek api key,请设置 DEEPSEEKAPIKEY key")
}
// user should set `baseURL="https://api.deepseek.com/beta"` to use this feature.
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEKAPIKEY
});
let content = readFileSync('/Users/fengsixue/Documents/Document/doc/other/aicommit/git\ AiCommit\ 提交提示器.txt', { encoding: 'utf-8' })

const diff = new TextDecoder('utf-8').decode(execSync("git diff --cached"))
if (diff.length <= 0) {
  console.log("暂存区没有修改内容,退出程序")
  exit(0)
}
const c = await main(diff);
const t = await launchEditor(c || '')
if (t.trim().length > 0) {
  execSync("git commit -m \"" + t.trim() + "\"")
} else {
  console.log("提交信息为空,取消提交")
}

async function main(content: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: content }, {
      "content": content,
      "role": "user"
    }, {
      "content": "使用中文生成 git 提交内容",
      "role": "user"
    }],
    model: "deepseek-chat",
  });

  return completion.choices[0].message.content;
}

async function launchEditor(initialContent = '') {
  // 确定使用的编辑器
  const editor = process.env.VISUAL || process.env.EDITOR || (process.platform === 'win32' ? 'notepad.exe' : 'vi');

  // 创建临时文件
  const tempDir = tmpdir();
  const tempFile = path.join(tempDir, `commit_${Date.now()}.txt`);

  try {
    // 写入初始内容（如果有）
    if (initialContent) {
      writeFileSync(tempFile, initialContent, 'utf8');
    }

    // 启动编辑器
    const result = spawnSync(editor, [tempFile], {
      stdio: 'inherit' // 继承输入输出，使用户能与编辑器交互
    });

    if (result.error) {
      throw result.error;
    }

    // 读取编辑后的内容
    const content = readFileSync(tempFile, 'utf8');
    return content;

  } finally {
    // 清理临时文件
    try {
      unlinkSync(tempFile);
    } catch (err) {
      // 忽略删除错误
    }
  }
}