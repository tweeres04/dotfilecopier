import { readdir, copyFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const rootPath = '/Users/tweeres/src'
const targetPath = '/Users/tweeres/src/dotfiles'

const files = await readdir(rootPath, { recursive: true })

const dotFileFiles = files.filter(
	(file) =>
		!file.includes('node_modules') &&
		!file.includes('pagy') &&
		file.includes('.env')
)

const promises = dotFileFiles.map(async (dotFileFile) => {
	const targetFileName = join(targetPath, dotFileFile)
	const targetDirname = dirname(targetFileName)
	const destinationPath = join(rootPath, dotFileFile)
	try {
		await mkdir(targetDirname, { recursive: true })
		console.log(`created ${targetDirname}`)
	} catch (err) {
		console.log(`${targetDirname} probably already exists`)
	}
	console.log(`Trying to copy ${destinationPath} to ${targetFileName}`)
	return copyFile(destinationPath, targetFileName).then(() => {
		console.log(`Copied ${destinationPath} to ${targetFileName}`)
	})
})

await Promise.all(promises)

console.log('Done')
