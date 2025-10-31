/**
 * 构建后脚本：修复首页的 canonical 和 alternate 链接
 * 将 Docusaurus 自动生成的带尾部斜杠的 URL 改为不带斜杠
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '../build');

/**
 * 修复 HTML 文件中的链接
 */
function fixLinksInFile(filePath) {
  console.log(`处理文件: ${filePath}`);
  
  let html = fs.readFileSync(filePath, 'utf8');
  const originalHtml = html;
  
  // 方法1: 使用简单的字符串替换，修复所有出现的 URL
  
  // 修复 og:url meta 标签
  html = html.replace(/content="https:\/\/jit\.pro\/"/g, 'content="https://jit.pro"');
  
  // 修复 canonical 和 alternate 链接中的 URL
  html = html.replace(/href="https:\/\/jit\.pro\/"/g, 'href="https://jit.pro"');
  html = html.replace(/href="https:\/\/jit\.pro\/zh\/"/g, 'href="https://jit.pro/zh"');
  
  if (html !== originalHtml) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('  ✅ 已修复所有带尾部斜杠的 URL');
  } else {
    console.log('  ℹ️  无需修改');
  }
}

/**
 * 主函数
 */
function main() {
  console.log('\n🔧 开始修复首页链接...\n');

  // 修复英文首页
  const enIndexPath = path.join(BUILD_DIR, 'index.html');
  if (fs.existsSync(enIndexPath)) {
    fixLinksInFile(enIndexPath);
  } else {
    console.log(`⚠️  文件不存在: ${enIndexPath}`);
  }

  // 修复中文首页
  const zhIndexPath = path.join(BUILD_DIR, 'zh/index.html');
  if (fs.existsSync(zhIndexPath)) {
    fixLinksInFile(zhIndexPath);
  } else {
    console.log(`⚠️  文件不存在: ${zhIndexPath}`);
  }

  console.log('\n✅ 首页链接修复完成!\n');
}

// 执行脚本
main();

