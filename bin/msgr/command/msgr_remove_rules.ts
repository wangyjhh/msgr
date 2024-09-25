import { Client, getEndpoint, logf, regionIdMap } from "../../../utils"
import columnify from "columnify"
import inquirer from "inquirer"

export const msgr_remove_rules = async () => {
	const { regionId } = await inquirer.prompt([
		{
			type: "list",
			loop: false,
			name: "regionId",
			message: "Please select a region.",
			choices: regionIdMap,
		},
	])

	const groupIds = await Client.getSecurityGroupId(getEndpoint(regionId), {
		regionId: regionId,
	})

	if (groupIds.length === 0) {
		logf("There is no security group in this area.", "warning", "WARNING")
		process.exit(0)
	}

	const { securityGroupId } = await inquirer.prompt([
		{
			type: "list",
			loop: false,
			name: "securityGroupId",
			message: "Select a security group ID.",
			choices: groupIds,
		},
	])

	const res: any[] = await Client.getSecurityGroup(getEndpoint(regionId), {
		regionId: regionId,
		securityGroupId: securityGroupId,
	})

	const securityGroups = res.map((item: SecurityGroupAttributesType) => {
		return {
			name: `${columnify(
				[
					{
						policy: item.policy,
						priority: item.priority,
						ipProtocol: item.ipProtocol,
						portRange: item.portRange,
						sourceCidrIp: item.sourceCidrIp,
						description: item.description,
					},
				],
				{
					showHeaders: false,
					config: {
						policy: { minWidth: 6, maxWidth: 6 },
						priority: { minWidth: 3, maxWidth: 3 },
						ipProtocol: { minWidth: 4, maxWidth: 4 },
						portRange: { minWidth: 12, maxWidth: 12 },
						sourceCidrIp: { minWidth: 20, maxWidth: 20 },
					},
				}
			)}`,
			value: item.securityGroupRuleId,
		}
	})

	const { securityGroupRuleId } = await inquirer.prompt([
		{
			type: "list",
			loop: false,
			name: "securityGroupRuleId",
			message: "Select a security group rule.",
			choices: securityGroups,
		},
	])

	const { confirm } = await inquirer.prompt({
		type: "confirm",
		name: "confirm",
		message: `Are you sure you want to remove this security group rule ?`,
		default: false,
	})

	if (confirm) {
		await Client.removeSecurityGroupRule(getEndpoint(regionId), {
			regionId: regionId,
			securityGroupId: securityGroupId,
			securityGroupRuleId: [securityGroupRuleId],
		})
	}
}
