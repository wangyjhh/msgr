import { logf, logv, getEndpoint, Client } from "../utils"
import columnify from "columnify"
import { homedir } from "node:os"
import { v4 as publicIpv4 } from "public-ip"

logf("success", "success", "提示信息")
logf("success", "success")
logf("warning", "warning", "提示信息")
logf("warning", "warning")
logf("error", "error", "提示信息")
logf("error", "error")

publicIpv4().then((ip) => {
	console.log(ip)
})

console.log(logv("1.0.1"))

console.log(getEndpoint("cn-beijing"))

Client.getSecurityGroup(getEndpoint("cn-beijing"), {
	regionId: "cn-beijing",
	securityGroupId: "sg-2ze7c4gtry9mfi2uwpab",
}).then((res) => {
	console.log(
		res.map((item) => {
			return {
				description: item.description,
				isecurityGroupRuleId: item.securityGroupRuleId,
			}
		})
	)
})

Client.getSecurityGroupId(getEndpoint("cn-shanghai"), {
	regionId: "cn-shanghai",
}).then((res) => {
	console.log(res)
})

Client.addSecurityGroupRule(getEndpoint("cn-beijing"), {
	regionId: "cn-beijing",
	securityGroupId: "sg-2ze7c4gtry9mfi2uwpab",
	permissions: [
		{
			policy: "accept",
			priority: "1",
			sourceCidrIp: "10.48.130.21",
			ipProtocol: "TCP",
			portRange: "1/65535",
			description: "This is description test.",
		},
	],
}).then((res) => {
	console.log(res)
})

Client.removeSecurityGroupRule(getEndpoint("cn-beijing"), {
	regionId: "cn-beijing",
	securityGroupId: "sg-2ze7c4gtry9mfi2uwpab",
	securityGroupRuleId: ["sgr-2ze9jfigaakhffiqpako"],
}).then((res) => {
	console.log(res)
})

console.log(homedir())

console.log(
	columnify([
		{
			policy: "policy",
			priority: "priority",
			ipProtocol: "ipProtocol",
			portRange: "portRange",
			sourceCidrIp: "sourceCidrIp",
			description: "description",
		},
	]).split("\n")[1]
)
