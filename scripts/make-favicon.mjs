import sharp from 'sharp'
import path from 'node:path'

const src = path.resolve(import.meta.dirname, '../public/mascot/idle.webp')
const publicDir = path.resolve(import.meta.dirname, '../public')

await sharp(src).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32.png'))
await sharp(src).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))
console.log('favicon-32.png and apple-touch-icon.png generated')
