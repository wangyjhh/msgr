import { Client, getEndpoint, logf, regionIdMap } from "../../../utils"
import columnify from "columnify"
import inquirer from "inquirer"

export const msgr_modify_rules = async () => {
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
			message: "Select the security group rule that needs to be modified.",
			choices: securityGroups,
		},
	])

	const { attribute } = await inquirer.prompt([
		{
			type: "list",
			name: "attribute",
			message: "Please select the attribute to modify.",
			default: "description",
			choices: [
				{
					name: "policy",
					value: "policy",
					disabled: "(policy is not modifiable)",
				},
				{
					name: "priority",
					value: "priority",
					disabled: "(priority is not modifiable)",
				},
				{
					name: "ipProtocol",
					value: "ipProtocol",
					disabled: "(ipProtocol is not modifiable)",
				},

				{
					name: "portRange",
					value: "portRange",
					disabled: "(ipProtocol is not modifiable)",
				},
				{
					name: "sourceCidrIp",
					value: "sourceCidrIp",
				},
				{
					name: "description",
					value: "description",
				},
			],
		},
	])

	const publicIP = (await (await import("public-ip")).publicIpv4()) ?? "0.0.0.0/0"

	const input_prompt_map = {
		sourceCidrIp: {
			type: "input",
			name: "value",
			message: "Please enter sourceCidrIp. (CIDR format and IPv4 format IP address range are supported.)",
			default: `${publicIP}`,
		},
		description: {
			type: "input",
			name: "value",
			message: "Please enter description.",
		},
	}
	// @ts-ignore
	const { value } = await inquirer.prompt([input_prompt_map[attribute]])

	await Client.modifySecurityGroup(getEndpoint(regionId), {
		regionId: regionId,
		securityGroupId: securityGroupId,
		securityGroupRuleId,
		[attribute]: value,
	})
}
