import { Client, getEndpoint, logf } from "../../../utils"
// @ts-ignore
import columnify from "columnify"

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
	const res = await Client.getSecurityGroup(getEndpoint("cn-shanghai"), {
		regionId: "cn-shanghai",
		securityGroupId: "sg-uf6avwfjruaz4ujwp2lm",
	})
	if (res.statusCode === 404) {
		logf(`${res.Message}`, "error", "Error")
	} else {
		const securityGroups = res.map((item: SecurityGroupAttributesType) => {
			return {
				policy: item.policy,
				priority: item.priority,
				ipProtocol: item.ipProtocol,
				portRange: item.portRange,
				sourceCidrIp: item.sourceCidrIp,
				description: item.description,
				securityGroupRuleId: item.securityGroupRuleId,
			}
		})
		logf(`${columnify(securityGroups)}`, "success")
	}
}
