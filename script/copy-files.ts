import path from 'node:path'
import { copyFileSync, readFileSync, writeJSONSync } from 'fs-extra'

const outputDir = './dist'
const filesToCopy = ['README.md', 'LICENSE', 'package.json']

filesToCopy.forEach((file) => {
    const sourcePath = path.resolve(__dirname, '../', file)
    const destPath = path.resolve(__dirname, '../', outputDir, file)
    copyFileSync(sourcePath, destPath)
})

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, '../', 'dist', 'package.json'), 'utf-8'))

pkg.main = './lib/index.cjs'
pkg.bin = './bin/index.cjs'
writeJSONSync(path.resolve(__dirname, '../', 'dist', 'package.json'), pkg, { spaces: 4 })
