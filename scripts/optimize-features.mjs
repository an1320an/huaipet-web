import sharp from 'sharp'
import { readdirSync, unlinkSync } from 'node:fs'
import path from 'node:path'

const dir = path.resolve(import.meta.dirname, '../public/features')
const files = readdirSync(dir).filter((f) => f.endsWith('.png'))

for (const file of files) {
  const input = path.join(dir, file)
  const output = path.join(dir, file.replace(/\.png$/, '.webp'))
  await sharp(input).trim().resize(360, 360, { fit: 'inside' }).webp({ quality: 85 }).toFile(output)
  unlinkSync(input)
  console.log(`${file} -> ${path.basename(output)}`)
}
