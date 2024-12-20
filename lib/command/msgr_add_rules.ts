import inquirer from 'inquirer'
import { Client, getEndpoint, getPublicIP, getRegionIdAndGroupId } from '../../utils'

export const msgr_add_rules = async () => {
    const { regionId, securityGroupId } = await getRegionIdAndGroupId()

    const publicIP = await getPublicIP()

    const { policy, priority, ipProtocol, portRange, sourceCidrIp, description } = await inquirer.prompt([
        {
            type: 'select',
            loop: false,
            name: 'policy',
            message: 'Please enter policy.',
            default: 'accept',
            choices: ['accept', 'drop'],
        },
        {
            type: 'input',
            name: 'priority',
            message: 'Please enter priority. Ranges from 1 to 100.',
            default: '1',
        },
        {
            type: 'input',
            name: 'ipProtocol',
            message: 'Please enter ipProtocol. (TCP or UDP)',
            default: 'TCP',
        },
        {
            type: 'input',
            name: 'portRange',
            message: 'Please enter portRange. (Use a slash / to separate. Ranges from 1 to 65535.)',
            default: '1/65535',
        },
        {
            type: 'input',
            name: 'sourceCidrIp',
            message: 'Please enter sourceCidrIp. (CIDR format and IPv4 format IP address range are supported.)',
            default: publicIP,
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please enter description.',
        },
    ])

    await Client.addSecurityGroupRule(getEndpoint(regionId), {
        regionId,
        securityGroupId,
        permissions: [
            {
                policy,
                priority,
                ipProtocol,
                portRange,
                sourceCidrIp,
                description,
            },
        ],
    })
}
