import type { SecurityGroupAttributesType } from '../../types'
import columnify from 'columnify'
import { Client, getEndpoint, getRegionIdAndGroupId, logf } from '../../utils'

export const msgr_query_rules_base = async () => {}

export const msgr_query_rules = async () => {
    const { regionId, securityGroupId } = await getRegionIdAndGroupId()
    const res = await Client.getSecurityGroup(getEndpoint(regionId), {
        regionId,
        securityGroupId,
    })

    const securityGroups = res.map((item: SecurityGroupAttributesType) => {
        return {
            policy: item.policy,
            priority: item.priority,
            ipProtocol: item.ipProtocol,
            portRange: item.portRange,
            sourceCidrIp: item.sourceCidrIp,
            description: item.description,
        }
    })
    logf(`${columnify(securityGroups)}`, 'success')
}
