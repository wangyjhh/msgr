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
        }

        writeFileSync(configPath, JSON.stringify(config))
        logf(`AThe AccessKey is successfully inserted.`, 'success')
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
                    choices: Object.keys(config),
                },
            ])
            logf(JSON.stringify(config[accessKey]), 'success')
        }
    }

    if (type === 'remove') {
        // if (config[key] === '') {
        //     logf(`${config[key]}`, 'warning', `${key.toUpperCase()}`)
        // }
        // else {
        //     logf(`${config[key]}`, 'success', `${key.toUpperCase()}`)
        // }
    }

    if (type === 'clear') {
        config = {}
        writeFileSync(configPath, JSON.stringify(config))
        logf(`The AccessKey is successfully cleared.`, 'success')
    }
}
