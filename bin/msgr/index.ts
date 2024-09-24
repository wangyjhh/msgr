#!/usr/bin/env node
import commander, { Command } from "commander"
import { logv } from "../../utils/index"
import { msgr_query_rules, msgr_config } from "./command"
import pkg from "../../package.json"

const program = new Command()

program.name("msgr").description("阿里云安全组规则管理工具")

program
	.command("config")
	.addArgument(new commander.Argument("<config>", "get | set").choices(["get", "set"]))
	.addArgument(new commander.Argument("<accesskey>", "设置accessKey").choices(["accessKeyId", "accessKeySecret"]))
	.argument("[value]", "accessKey的值", "")
	.description("配置")
	.action(msgr_config)

// 查看安全组
program.command("rules").description("查看当前镜像源").action(msgr_query_rules)

program.version(logv(pkg.version), "-v, --version", "输出版本号")

program.parse(process.argv)
