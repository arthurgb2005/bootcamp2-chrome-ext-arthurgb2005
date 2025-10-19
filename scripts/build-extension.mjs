import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    for (const file of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function build() {
  const dist = path.join(process.cwd(), 'dist');

  // Remove dist antigo
  if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(dist);

  // Copia arquivos essenciais
  copyRecursiveSync('manifest.json', path.join(dist, 'manifest.json'));
  copyRecursiveSync('src', path.join(dist, 'src'));
  copyRecursiveSync('icons', path.join(dist, 'icons'));

  // Cria ZIP
  const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.glob('**/*', { cwd: dist });
  archive.finalize();

  output.on('close', () => {
    console.log(`✅ Build gerado com sucesso: dist/extension.zip (${archive.pointer()} bytes)`);
  });

  archive.on('error', err => {
    console.error('❌ Erro ao criar ZIP:', err);
  });
}

build();
