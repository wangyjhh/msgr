import chalk from "chalk"

const colorMap = {
	success: { color: chalk.green, bgcolor: chalk.bgGreen.white },
	error: { color: chalk.red, bgcolor: chalk.bgRed.white },
	warning: { color: chalk.yellow, bgcolor: chalk.bgYellow.white },
}

// log format
export const logf = (out: string, type: "success" | "error" | "warning", title?: string) => {
	title !== undefined
		? console.log(colorMap[type].bgcolor(` ${title} `), colorMap[type].color(` ${out} `))
		: console.log(colorMap[type].color(`${out}`))
}
