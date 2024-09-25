#!/usr/bin/env node
import commander, { Command } from "commander"
import { logv } from "../../utils/index"
import { msgr_query_rules, msgr_config, msgr_add_rules } from "./command"
import pkg from "../../package.json"

const program = new Command()

program.name("msgr").description("Alibaba Cloud security group rule management tool.")
// 设置accessKey
program
	.command("config")
	.addArgument(new commander.Argument("<tpye>", "Config type, get or set.").choices(["get", "set"]))
	.addArgument(new commander.Argument("<accesskey>", "Set accessKey.").choices(["accessKeyId", "accessKeySecret"]))
	.argument("[value]", "AccessKey value.", "")
	.description("Configuration")
	.action(msgr_config)

// 查看安全组规则
program.command("rules").description("Review the security group rules.").action(msgr_query_rules)
// 新增安全组规则
program.command("add-rules").alias("add").description("Review the security group rules.").action(msgr_add_rules)
// 删除安全组规则
// 修改安全组规则

program.version(logv(pkg.version), "-v, --version", "Output version number.")

program.parse(process.argv)

// 处理ctrl+c
process.on("exit", () => {
	process.exit(0)
})
