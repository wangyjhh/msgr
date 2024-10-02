import { Client, getEndpoint, logf, regionIdMap } from "../../../utils"
import columnify from "columnify"
import inquirer from "inquirer"
import { v4 as publicIpv4, v6 as publicIpv6 } from "public-ip"

export const getPublicIP = async () => {
	return `${(await publicIpv4()) ?? "0.0.0.0/0"}`
}

export const getPublicIPV4 = async () => {
	try {
		const ipv4 = await publicIpv4()
		logf(`${ipv4}\n`, "success", "IPV4")
	} catch (error) {
		logf(`Not found\n`, "error", "IPV4")
	}
}

export const getPublicIPV6 = async () => {
	try {
		const ipv6 = await publicIpv6()
		logf(`${ipv6}\n`, "success", "IPV6")
	} catch (error) {
		logf(`Not found\n`, "error", "IPV6")
	}
}

export const getRegionIdAndGroupId = async () => {
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

	return { securityGroupId, regionId }
}

export const getRegionIdAndGroupIdAndGroupRuleId = async () => {
	const { regionId, securityGroupId } = await getRegionIdAndGroupId()
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
	return { securityGroupId, regionId, securityGroupRuleId }
}
