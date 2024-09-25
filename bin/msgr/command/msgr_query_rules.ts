import { Client, getEndpoint, logf, regionIdMap } from "../../../utils"
import columnify from "columnify"
import inquirer from "inquirer"

export const msgr_query_rules = async () => {
	const { select: regionId } = await inquirer.prompt([
		{
			type: "list",
			loop: false,
			name: "select",
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

	const { select: securityGroupId } = await inquirer.prompt([
		{
			type: "list",
			loop: false,
			name: "select",
			message: "Select a security group ID",
			choices: groupIds,
		},
	])
	const res = await Client.getSecurityGroup(getEndpoint(regionId), {
		regionId: regionId,
		securityGroupId: securityGroupId,
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
	logf(`${columnify(securityGroups)}`, "success")
}
