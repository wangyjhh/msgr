import { logf, logv, getEndpoint, Client } from "../utils"
import { homedir } from "node:os"

logf("success", "success", "提示信息")
logf("success", "success")
logf("warning", "warning", "提示信息")
logf("warning", "warning")
logf("error", "error", "提示信息")
logf("error", "error")

// console.log(logv("1.0.1"))

console.log(getEndpoint("cn-beijing"))

// Client.getSecurityGroup(getEndpoint("cn-beijing"), {
// 	regionId: "cn-beijing",
// 	securityGroupId: "sg-2ze7c4gtry9mfi2uwpab",
// }).then((res) => {
// 	console.log(res)
// })

console.log(homedir())
