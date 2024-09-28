import { copyFileSync, readFileSync, writeJSONSync } from "fs-extra"
import path from "node:path"

const outputDir = "./dist"
const filesToCopy = ["README.md", "LICENSE", "package.json"]

filesToCopy.forEach((file) => {
	const sourcePath = path.resolve(__dirname, "../", file)
	const destPath = path.resolve(__dirname, "../", outputDir, file)
	copyFileSync(sourcePath, destPath)
})

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, "../", "dist", "package.json"), "utf-8"))

pkg.main = "./bin/msgr/index.cjs"
pkg.bin = "./bin/msgr/index.cjs"
writeJSONSync(path.resolve(__dirname, "../", "dist", "package.json"), pkg, { spaces: 4 })
