import { Client, getEndpoint, logf } from "../../../utils"
import columnify from "columnify"
import { getRegionIdAndGroupId } from "../hooks"

export const msgr_query_rules_base = async () => {}

export const msgr_query_rules = async () => {
	const { regionId, securityGroupId } = await getRegionIdAndGroupId()
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
