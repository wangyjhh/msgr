import { logf, logv, getEndpoint, Client } from "../utils"
import { homedir } from "node:os"

logf("提示信息", "success", "success")
logf("提示信息", "warning", "warning")
logf("提示信息", "error", "error")

// console.log(logv("1.0.1"))

console.log(getEndpoint("cn-beijing"))

// Client.getSecurityGroup(getEndpoint("cn-beijing"), {
// 	regionId: "cn-beijing",
// 	securityGroupId: "sg-2ze7c4gtry9mfi2uwpab",
// }).then((res) => {
// 	console.log(res)
// })

console.log(homedir())
