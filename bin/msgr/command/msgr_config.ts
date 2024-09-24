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
			logf("Error", "Value is empty", "error")
		} else {
			config[key] = value
			writeFileSync(configPath, JSON.stringify(config))
			logf(`${key}`, `Set value to ${config[key]}`, "success")
		}
	}
	if (type === "get") {
		if (config[key] === "") {
			logf(`${key}`, `${config[key]}`, "warning")
		} else {
			logf(`${key}`, `${config[key]}`, "success")
		}
	}
}
