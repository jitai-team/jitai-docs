const fs = require('fs');
const src = '/Users/sumu/Codes/jitai-docs/src/components/LegalDocuments/TermsOfService.tsx';
const out = '/Users/sumu/Codes/jitai-docs/src/components/LegalDocuments/terms-of-service.md';

let content = fs.readFileSync(src, 'utf8');

const start = content.indexOf('<>');
const end = content.lastIndexOf('</>');
if (start === -1 || end === -1 || end <= start) {
  throw new Error('Could not locate React fragment around content.');
}
let inner = content.slice(start + 2, end);

// Replace JSX explicit space tokens like {' '}
inner = inner.replace(/\{\s*'\s*'\s*\}/g, ' ');

// Convert headings to markdown; keep lists and inline HTML tags as-is
let md = inner
  .replace(/<h1>([\s\S]*?)<\/h1>/g, '# $1\n\n')
  .replace(/<h2>([\s\S]*?)<\/h2>/g, '## $1\n\n')
  .replace(/<h3>([\s\S]*?)<\/h3>/g, '### $1\n\n')
  // unwrap paragraphs, keep spacing
  .replace(/<p>\s*/g, '')
  .replace(/\s*<\/p>\s*/g, '\n\n')
  // Remove leading/trailing spaces on each line
  .replace(/^[\t ]+|[\t ]+$/gm, '')
  // Collapse excessive blank lines
  .replace(/\n{3,}/g, '\n\n')
  .trim() + '\n';

fs.writeFileSync(out, md, 'utf8');
console.log('Wrote', out);
