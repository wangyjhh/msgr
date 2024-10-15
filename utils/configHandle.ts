import { homedir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'
import { ensureFileSync, readFileSync } from 'fs-extra'
import { logf } from '.'

export const configPath = join(homedir(), '.msgr', 'config')

export const getConfig = (mode: 'default' | 'all') => {
    ensureFileSync(configPath)
    const configContent = readFileSync(configPath, 'utf-8')
    // 当configContent为空时，直接返回一个空对象
    if (!configContent)
        return {}

    if (mode === 'default') {
        // 当configContent为空对象时，返回一个空对象，否则返回一个default为true的对象
        return Object.values<ConfigurationType>(JSON.parse(configContent)).filter(item => item.default)[0] ?? {}
    }

    if (mode === 'all') {
        return JSON.parse(configContent)
    }
}

export const configIsEmpty = (config: ConfigurationType | object) => {
    if (Object.keys(config).length === 0) {
        logf(`The accessKey is not configured\n`, 'warning')
        process.exit(0)
    }
}
