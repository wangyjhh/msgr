import type { ConfigurationItem } from '../types'
import { log } from 'node:console'
import { MSGR } from '../lib'
import { getConfig } from '../utils'

const AccessKeyConfig = getConfig('default') as ConfigurationItem

const shanghai = new MSGR({
    regionId: 'cn-shanghai',
    accessKeyId: AccessKeyConfig.accessKeyId!,
    accessKeySecret: AccessKeyConfig.accessKeySecret!,
})

const main = async () => {
    const security_group_id = (await shanghai.getSecurityGroupId())[0]
    const security_group_test_rule_ifno = (await shanghai.getSecurityGroup(security_group_id, (item) => {
        return item.portRange === '5556/5556' && item.description === '测试一下下吧'
    }))
    log(security_group_test_rule_ifno)
    const security_group_test_rule_id = security_group_test_rule_ifno[0].securityGroupRuleId
    log(security_group_test_rule_id)

    // const add_res = await shanghai.addSecurityGroupRule(security_group_id, {
    //     policy: 'accept',
    //     priority: '1',
    //     description: '测试一下',
    //     portRange: '5555/5555',
    //     ipProtocol: 'TCP',
    //     sourceCidrIp: '0.0.0.0/0',
    // })
    // log(add_res)

    // const remove_res = await shanghai.removeSecurityGroupRule(security_group_id, security_group_test_rule_id!)
    // log(remove_res)

    // const modify_res = await shanghai.modifySecurityGroupRule(security_group_id, security_group_test_rule_id!, {
    //     policy: 'drop',
    //     priority: '2',
    //     ipProtocol: 'UDP',
    //     portRange: '5556/5556',
    //     sourceCidrIp: '10.10.0.0/16',
    //     description: '测试一下下吧',

    // })
    // log(modify_res)
}

main()
