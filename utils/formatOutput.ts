import chalk from 'chalk'

const colorMap = {
    success: { color: chalk.green, bgcolor: chalk.bgGreen.white },
    error: { color: chalk.red, bgcolor: chalk.bgRed.white },
    warning: { color: chalk.yellow, bgcolor: chalk.bgYellow.white },
}

// log format
export const logf = (out: string, type: 'success' | 'error' | 'warning', title?: string) => {
    title !== undefined
        // eslint-disable-next-line no-console
        ? console.log(`\n\r${colorMap[type].bgcolor(` ${title} `)}`, colorMap[type].color(` ${out} `))
        // eslint-disable-next-line no-console
        : console.log(`\n\r${colorMap[type].color(`${out}`)}`)
}
