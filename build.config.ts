import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
	entries: ["bin/msgr/index"],
	clean: true,
})
