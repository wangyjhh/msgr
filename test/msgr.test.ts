import type { ConfigurationType } from '../types'
import { log } from 'node:console'
import { MSGR } from '../src/msgr'
import { getConfig } from '../utils'

const AccessKeyConfig = getConfig('default')

const shanghai = new MSGR({
    regionId: 'cn-shanghai',
    accessKeyId: AccessKeyConfig.accessKeyId,
    accessKeySecret: AccessKeyConfig.accessKeySecret,
})

const main = async () => {
    const security_group_id = (await shanghai.getSecurityGroupId())[0]
    const security_group_test_rule_id = (await shanghai.getSecurityGroup(security_group_id, (item) => {
        return item.description === '测试端口'
    }))[0].securityGroupRuleId
    log(security_group_test_rule_id)
    // const add_res = await shanghai.addSecurityGroupRule(security_group_id, {
    //     policy: 'accept',
    //     priority: '2',
    //     description: '测试端口',
    //     portRange: '3001/3001',
    //     ipProtocol: 'TCP',
    //     sourceCidrIp: '0.0.0.0/0',
    // })
    // log(add_res)
}

main()
