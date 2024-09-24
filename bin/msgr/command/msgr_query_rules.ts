import { Client, getEndpoint, logf, regionIdMap } from "../../../utils"
import columnify from "columnify"
import inquirer from "inquirer"

type SecurityGroupAttributesType = {
	createTime: string
	description: string
	destCidrIp: string
	destGroupId: string
	destGroupName: string
	destGroupOwnerAccount: string
	destPrefixListId: string
	destPrefixListName: string
	direction: string
	ipProtocol: string
	ipv6DestCidrIp: string
	ipv6SourceCidrIp: string
	nicType: string
	policy: string
	portRange: string
	priority: string
	securityGroupRuleId: string
	sourceCidrIp: string
	sourceGroupId: string
	sourceGroupName: string
	sourceGroupOwnerAccount: string
	sourcePortRange: string
	sourcePrefixListId: string
	sourcePrefixListName: string
}

export const msgr_query_rules = async () => {
	const { select: regionId } = await inquirer.prompt([
		{
			type: "list",
			loop: false,
			name: "select",
			message: "请选择区域",
			choices: regionIdMap,
		},
	])

	const groupIds = await Client.getSecurityGroupId(getEndpoint(regionId), {
		regionId: regionId,
	})

	if (groupIds.length === 0) {
		logf("该区域没有安全组", "warning", "WARNING")
		process.exit(0)
	}

	const { select: securityGroupId } = await inquirer.prompt([
		{
			type: "list",
			loop: false,
			name: "select",
			message: "请选择安全组ID",
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
