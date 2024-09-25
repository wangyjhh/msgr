#!/usr/bin/env node
import commander, { Command } from "commander"
import { logv } from "../../utils/index"
import { msgr_query_rules, msgr_config, msgr_add_rules, msgr_remove_rules, msgr_modify_rules } from "./command"
import pkg from "../../package.json"

const program = new Command()

program.name("msgr").description("Alibaba Cloud security group rule management tool.")

program.showHelpAfterError("(add -h or --help for additional information)")

program.option("-l, --list", "Review the security group rules.", msgr_query_rules)
program.option("-a, --add", "Add the security group rules.", msgr_add_rules)
program.option("-r, --remove", "Remove the security group rules.", msgr_remove_rules)
program.option("-m, --modify", "Modify the security group rules.", msgr_modify_rules)

// 设置accessKey
program
	.command("config")
	.addHelpText(
		"after",
		"\nExample:\n    $ msgr config get accessKeyId\n  $ msgr config get accessKeySecret\n  $ msgr config set accessKeyId <accessKeyId>\n  $ msgr config set accessKeySecret <accessKeySecret>\n"
	)
	.addArgument(new commander.Argument("<tpye>", "Config type, get or set.").choices(["get", "set"]))
	.addArgument(new commander.Argument("<accesskey>", "Set accessKey.").choices(["accessKeyId", "accessKeySecret"]))
	.argument("[value]", "AccessKey value.", "")
	.description("Configuration")
	.action(msgr_config)

program.version(logv(pkg.version), "-v, --version", "Output version number.")

program.parse(process.argv)

// 处理ctrl+c
process.on("exit", () => {
	process.exit(0)
})
