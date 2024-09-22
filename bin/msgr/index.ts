#!/usr/bin/env node
import { Command } from "commander"
import { logv } from "../../utils/index"
import pkg from "../../package.json"

const program = new Command()

program.name("wss").description("npm镜像源操作命令")

// 查看当前镜像源命令
// program.command("now").description("查看当前镜像源").action(wssNow)

program.version(logv(pkg.version), "-V, --version", "输出版本号")

program.parse(process.argv)
