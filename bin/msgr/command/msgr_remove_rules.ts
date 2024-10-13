import inquirer from 'inquirer'
import { Client, getEndpoint } from '../../../utils'
import { getRegionIdAndGroupIdAndGroupRuleId } from '../hooks'

export const msgr_remove_rules = async () => {
    const { regionId, securityGroupId, securityGroupRuleId } = await getRegionIdAndGroupIdAndGroupRuleId()

    const { confirm } = await inquirer.prompt({
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to remove this security group rule ?`,
        default: false,
    })

    if (confirm) {
        await Client.removeSecurityGroupRule(getEndpoint(regionId), {
            regionId,
            securityGroupId,
            securityGroupRuleId: [securityGroupRuleId],
        })
    }
}
