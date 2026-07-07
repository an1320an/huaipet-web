import sharp from 'sharp'
import { readdirSync } from 'node:fs'
import path from 'node:path'

const dir = path.resolve(import.meta.dirname, '../public/mascot')
const files = readdirSync(dir).filter((f) => f.endsWith('.png'))

for (const file of files) {
  const input = path.join(dir, file)
  const output = path.join(dir, file.replace(/\.png$/, '.webp'))
  await sharp(input).resize(320, 320).webp({ quality: 85 }).toFile(output)
  console.log(`${file} -> ${path.basename(output)}`)
}
