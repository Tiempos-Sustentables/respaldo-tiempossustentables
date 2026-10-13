import fs from 'node:fs';
import path from 'node:path';

const PNG_B64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4//8/AwAI/AL+p5qgoAAAAABJRU5ErkJggg==';
const JPG_B64 = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigD//2Q==';
const WEBP_B64 = 'UklGRkAAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAIAAAAAAFZQOCAYAAAAMAEAnQEqAQABAAFAJiWkAANwAP789AAA';
const GIF_B64 = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

function getPlaceholderBuffer(ext) {
  const e = ext.toLowerCase();
  if (['.jpg', '.jpeg'].includes(e)) return Buffer.from(JPG_B64, 'base64');
  if (e === '.webp') return Buffer.from(WEBP_B64, 'base64');
  if (e === '.gif') return Buffer.from(GIF_B64, 'base64');
  if (e === '.svg') return Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>');
  return Buffer.from(PNG_B64, 'base64');
}

function findFiles(dir, exts) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(findFiles(full, exts));
    } else if (exts.includes(path.extname(full))) {
      results.push(full);
    }
  }
  return results;
}

const blogDir = path.resolve('src/content/blog');
const mdFiles = findFiles(blogDir, ['.md', '.mdx']);
let fixedCount = 0;

function createPlaceholderIfMissing(baseDir, relativePath) {
  if (!relativePath) return;
  let p = relativePath.trim().replace(/^['"]|['"]$/g, '');
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('data:') || p.startsWith('/')) {
    return;
  }
  p = p.split('?')[0].split('#')[0];

  const variants = [p];
  try {
    const decoded = decodeURIComponent(p);
    if (decoded !== p) variants.push(decoded);
  } catch (e) {}

  for (const v of variants) {
    const targetFile = path.resolve(baseDir, v);
    if (!fs.existsSync(targetFile)) {
      const ext = path.extname(targetFile) || '.png';
      fs.mkdirSync(path.dirname(targetFile), { recursive: true });
      fs.writeFileSync(targetFile, getPlaceholderBuffer(ext));
      fixedCount++;
      console.log(`[Resuelto] ${path.relative(blogDir, targetFile)}`);
    }
  }
}

for (const mdFile of mdFiles) {
  const content = fs.readFileSync(mdFile, 'utf8');
  const dir = path.dirname(mdFile);

  // 1. Markdown images con alt multilínea
  const mdImgRegex = /!\[[\s\S]*?\]\(\s*([^\s\)\"']+)/g;
  let m;
  while ((m = mdImgRegex.exec(content)) !== null) {
    createPlaceholderIfMissing(dir, m[1]);
  }

  // 2. HTML <img> tags multilínea
  const htmlImgRegex = /<img[\s\S]*?src=[\"']([^\"'\s>]+)/gi;
  while ((m = htmlImgRegex.exec(content)) !== null) {
    createPlaceholderIfMissing(dir, m[1]);
  }

  // 3. Encabezados frontmatter
  const fmRegex = /(?:heroImage|coverImage|image|thumbnail):\s*[\"']?([^\s\"'\n]+)/gi;
  while ((m = fmRegex.exec(content)) !== null) {
    createPlaceholderIfMissing(dir, m[1]);
  }

  // 4. Cualquier ruta images/... en el texto
  const anyImgRegex = /(?:[a-zA-Z0-9_\-\.\/]*\/)?images\/[^\s\"'\(\)<>\\]+\.(?:jpg|jpeg|png|webp|gif|svg|avif|ico)/gi;
  while ((m = anyImgRegex.exec(content)) !== null) {
    createPlaceholderIfMissing(dir, m[0]);
  }
}

console.log(`\nImagenes creadas con exito: ${fixedCount}`);
