import { homedir } from 'node:os'
import { join } from 'node:path'
import process from 'node:process'
import { ensureFileSync, readFileSync } from 'fs-extra'
import { logf } from '.'

export const getConfig = () => {
    const configPath = join(homedir(), '.msgr', 'config')
    ensureFileSync(configPath)
    const configContent = readFileSync(configPath, 'utf-8')

    const config: ConfigurationType = !configContent ? {} : Object.values<{ accessKeyId: string, accessKeySecret: string, default: boolean }>(JSON.parse(configContent)).filter(item => item.default)[0]
    return config
}

export const configIsEmpty = (config: ConfigurationType) => {
    if (Object.keys(config).length === 0) {
        logf(`The accessKey is not configured\n\r`, 'warning')
        process.exit(0)
    }
}
