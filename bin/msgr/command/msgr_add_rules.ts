import { Client, getEndpoint, logf, regionIdMap } from "../../../utils"
import inquirer from "inquirer"

export const msgr_add_rules = async () => {
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
			message: "Select a security group ID",
			choices: groupIds,
		},
	])

	const { policy, priority, ipProtocol, portRange, sourceCidrIp, description } = await inquirer.prompt([
		{
			type: "select",
			loop: false,
			name: "policy",
			message: "Please enter policy.",
			default: "accept",
			choices: ["accept", "drop"],
		},
		{
			type: "input",
			name: "priority",
			message: "Please enter priority. Ranges from 1 to 100.",
			default: "1",
		},
		{
			type: "input",
			name: "ipProtocol",
			message: "Please enter ipProtocol. (TCP or UDP)",
			default: "TCP",
		},
		{
			type: "input",
			name: "portRange",
			message: "Please enter portRange. (Use a slash / to separate. Ranges from 1 to 65535.)",
			default: "1/65535",
		},
		{
			type: "input",
			name: "sourceCidrIp",
			message: "Please enter sourceCidrIp. (CIDR format and IPv4 format IP address range are supported.)",
			default: `${(await (await import("public-ip")).publicIpv4()) ?? "0.0.0.0/0"}`,
		},
		{
			type: "input",
			name: "description",
			message: "Please enter description.",
		},
	])

	await Client.addSecurityGroupRule(getEndpoint(regionId), {
		regionId: regionId,
		securityGroupId: securityGroupId,
		permissions: [
			{
				policy,
				priority,
				ipProtocol,
				portRange,
				sourceCidrIp,
				description,
			},
		],
	})
}
