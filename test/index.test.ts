import { logf, logv, getEndpoint } from "../utils"

logf("提示信息", "success", "success")
logf("提示信息", "warning", "warning")
logf("提示信息", "error", "error")

console.log(logv("1.0.1"))

console.log(getEndpoint("cn-beijing"))
