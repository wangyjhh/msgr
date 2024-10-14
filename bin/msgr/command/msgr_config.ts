import { writeFileSync } from 'fs-extra'
import inquirer from 'inquirer'
import { configPath, getConfig, logf } from '../../../utils'

export const msgr_config = async (type: string) => {
    let AccessKeyConfig = getConfig('all')

    if (type === 'set') {
        const { accessKeyName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'accessKeyName',
                message: 'Please enter accessKeyName.',
                default: `AccessKey${Object.keys(AccessKeyConfig).length + 1}`,
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

        AccessKeyConfig[accessKeyName] = {
            accessKeyId,
            accessKeySecret,
            default: Object.keys(AccessKeyConfig).length === 0,
        }

        writeFileSync(configPath, JSON.stringify(AccessKeyConfig))
        logf(`AThe AccessKey is successfully inserted.`, 'success')
    }

    if (type === 'default') {
        if (Object.keys(AccessKeyConfig).length === 0) {
            logf(`The AccessKey is not set`, 'warning')
            return
        }

        const { accessKey } = await inquirer.prompt([
            {
                type: 'list',
                loop: false,
                name: 'accessKey',
                message: 'Select a accessKey.',
                choices: Object.keys(AccessKeyConfig),
            },
        ])

        for (const key in AccessKeyConfig) {
            AccessKeyConfig[key].default = false
        }

        AccessKeyConfig[accessKey].default = true

        writeFileSync(configPath, JSON.stringify(AccessKeyConfig))
        logf(`The AccessKey "${accessKey}" set default is successfully.`, 'success')
    }

    if (type === 'get') {
        if (Object.keys(AccessKeyConfig).length === 0) {
            logf(`The AccessKey is not set`, 'warning')
            return
        }

        const { accessKey } = await inquirer.prompt([
            {
                type: 'list',
                loop: false,
                name: 'accessKey',
                message: 'Select a accessKey.',
                choices: Object.keys(AccessKeyConfig).map((key) => {
                    return {
                        name: AccessKeyConfig[key].default ? `${key} (default)` : key,
                        value: key,
                    }
                }),
            },
        ])

        logf(`accessKeyId: ${AccessKeyConfig[accessKey].accessKeyId}\n\raccessKeySecret: ${AccessKeyConfig[accessKey].accessKeySecret}\n\r`, 'success')
    }

    if (type === 'remove') {
        if (Object.keys(AccessKeyConfig).length === 0) {
            logf(`The AccessKey is not set`, 'warning')
            return
        }

        const { accessKey } = await inquirer.prompt([
            {
                type: 'list',
                loop: false,
                name: 'accessKey',
                message: 'Select a accessKey.',
                choices: Object.keys(AccessKeyConfig),
            },
        ])
        delete AccessKeyConfig[accessKey]

        if (Object.keys(AccessKeyConfig).length !== 0) {
            AccessKeyConfig[Object.keys(AccessKeyConfig)[0]].default = true
        }

        writeFileSync(configPath, JSON.stringify(AccessKeyConfig))
        logf(`The AccessKey "${accessKey}" is successfully removed.`, 'success')
    }

    if (type === 'clear') {
        AccessKeyConfig = {}
        writeFileSync(configPath, JSON.stringify(AccessKeyConfig))
        logf(`The AccessKey is successfully cleared.`, 'success')
    }
}
