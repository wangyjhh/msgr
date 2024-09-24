import { readFileSync, writeFileSync, ensureFileSync } from "fs-extra"
import { join } from "path"
import { homedir } from "node:os"
import { logf } from "../../../utils"

export const msgr_config = (type: string, key: string, value: string) => {
	const configPath = join(homedir(), ".msgr", "config")
	ensureFileSync(configPath)
	const config = JSON.parse(
		readFileSync(configPath, "utf-8")
			? readFileSync(configPath, "utf-8")
			: `{
				"accessKeyId": "",
				"accessKeySecret": ""
			}\n\r`
	)
	if (type === "set") {
		if (value === "") {
			logf("Value is empty", "error", "ERROR")
		} else {
			config[key] = value
			writeFileSync(configPath, JSON.stringify(config))
			logf(`Set value to ${config[key]}`, "success", `${key.toUpperCase()}`)
		}
	}
	if (type === "get") {
		if (config[key] === "") {
			logf(`${config[key]}`, "warning", `${key.toUpperCase()}`)
		} else {
			logf(`${config[key]}`, "success", `${key.toUpperCase()}`)
		}
	}
}
