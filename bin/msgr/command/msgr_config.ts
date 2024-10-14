import { log } from 'node:console'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { ensureFileSync, readFileSync, writeFileSync } from 'fs-extra'
import inquirer from 'inquirer'
import { logf } from '../../../utils'

export const msgr_config = async (type: string) => {
    const configPath = join(homedir(), '.msgr', 'config')
    ensureFileSync(configPath)
    let config = JSON.parse(
        readFileSync(configPath, 'utf-8')
            ? readFileSync(configPath, 'utf-8')
            : `{}\n\r`,
    )
    if (type === 'set') {
        const { accessKeyName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'accessKeyName',
                message: 'Please enter accessKeyName.',
                default: `AccessKey${Object.keys(config).length + 1}`,
            },
        ])

        const { accessKeyId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'accessKeyId',
                message: 'Please enter accessKeyId.',
            },
        ])

        if (accessKeyId === '') {
            logf('AccessKeyId is empty.', 'error', 'ERROR')
            return
        }

        const { accessKeySecret } = await inquirer.prompt([
            {
                type: 'input',
                name: 'accessKeySecret',
                message: 'Please enter accessKeySecret.',
            },
        ])

        if (accessKeySecret === '') {
            logf('AccessKeySecret is empty.', 'error', 'ERROR')
            return
        }

        config[accessKeyName] = {
            accessKeyId,
            accessKeySecret,
            default: Object.keys(config).length === 0,
        }

        writeFileSync(configPath, JSON.stringify(config))
        logf(`AThe AccessKey is successfully inserted.`, 'success')
    }

    if (type === 'default') {
        if (Object.keys(config).length === 0) {
            logf(`The AccessKey is not set`, 'warning')
            return
        }

        const { accessKey } = await inquirer.prompt([
            {
                type: 'list',
                loop: false,
                name: 'accessKey',
                message: 'Select a accessKey.',
                choices: Object.keys(config),
            },
        ])

        for (const key in config) {
            config[key].default = false
        }

        config[accessKey].default = true

        writeFileSync(configPath, JSON.stringify(config))
        logf(`The AccessKey "${accessKey}" set default is successfully.`, 'success')
    }

    if (type === 'get') {
        if (Object.keys(config).length === 0) {
            logf(`The AccessKey is not set`, 'warning')
            return
        }
        else {
            const { accessKey } = await inquirer.prompt([
                {
                    type: 'list',
                    loop: false,
                    name: 'accessKey',
                    message: 'Select a accessKey.',
                    choices: Object.keys(config).map((key) => {
                        return {
                            name: config[key].default ? `${key} (default)` : key,
                            value: key,
                        }
                    }),
                },
            ])
            logf(`accessKeyId: ${config[accessKey].accessKeyId}\n\raccessKeySecret: ${config[accessKey].accessKeySecret}\n\r`, 'success')
        }
    }

    if (type === 'remove') {
        if (Object.keys(config).length === 0) {
            logf(`The AccessKey is not set`, 'warning')
            return
        }

        const { accessKey } = await inquirer.prompt([
            {
                type: 'list',
                loop: false,
                name: 'accessKey',
                message: 'Select a accessKey.',
                choices: Object.keys(config),
            },
        ])
        delete config[accessKey]

        if (Object.keys(config).length !== 0) {
            config[Object.keys(config)[0]].default = true
        }

        writeFileSync(configPath, JSON.stringify(config))
        logf(`The AccessKey "${accessKey}" is successfully removed.`, 'success')
    }

    if (type === 'clear') {
        config = {}
        writeFileSync(configPath, JSON.stringify(config))
        logf(`The AccessKey is successfully cleared.`, 'success')
    }
}
