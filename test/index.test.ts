import { log } from 'node:console'
import { homedir } from 'node:os'
import columnify from 'columnify'
import { v4 as publicIpv4 } from 'public-ip'
import { Client, configIsEmpty, getConfig, getEndpoint, logf, logv } from '../utils'

logf('success', 'success', '提示信息')
logf('success', 'success')
logf('warning', 'warning', '提示信息')
logf('warning', 'warning')
logf('error', 'error', '提示信息')
logf('error', 'error')

publicIpv4().then((ip) => {
    log(ip)
})

log(logv('1.0.1'))

log(getEndpoint('cn-beijing'))

Client.getSecurityGroup(getEndpoint('cn-beijing'), {
    regionId: 'cn-beijing',
    securityGroupId: '',
}).then((res) => {
    log(
        res.map((item) => {
            return {
                description: item.description,
                isecurityGroupRuleId: item.securityGroupRuleId,
            }
        }),
    )
})

Client.getSecurityGroupId(getEndpoint('cn-shanghai'), {
    regionId: 'cn-shanghai',
}).then((res) => {
    log(res)
})

Client.addSecurityGroupRule(getEndpoint('cn-beijing'), {
    regionId: 'cn-beijing',
    securityGroupId: '',
    permissions: [
        {
            policy: 'accept',
            priority: '1',
            sourceCidrIp: '10.48.130.21',
            ipProtocol: 'TCP',
            portRange: '1/65535',
            description: 'This is description test.',
        },
    ],
}).then((res) => {
    log(res)
})

Client.removeSecurityGroupRule(getEndpoint('cn-beijing'), {
    regionId: 'cn-beijing',
    securityGroupId: '',
    securityGroupRuleId: [''],
}).then((res) => {
    log(res)
})

log(homedir())

log(
    columnify([
        {
            policy: 'policy',
            priority: 'priority',
            ipProtocol: 'ipProtocol',
            portRange: 'portRange',
            sourceCidrIp: 'sourceCidrIp',
            description: 'description',
        },
    ]).split('\n')[1],
)

log(getConfig('all'))
log(getConfig('default'))

configIsEmpty({})
