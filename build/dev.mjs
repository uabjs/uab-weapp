import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dev } from '@vant/cli/lib/commands/dev.js';
import { exec } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const gulpConfig = resolve(__dirname, './compiler.js');

async function run() {
  await dev();

  // 打开文档的时候使用 gulp 执行 compiler.js 文件里面的 buildExample 方法，目的：将组件库打包到微信小程序 demo 案例里面
  const p = exec(`npx gulp -f ${gulpConfig} buildExample --color`);
  p.stdout.on('data', (stdout) => console.info(stdout));
  p.stderr.on('data', (stderr) => console.info(stderr));
}

run();
