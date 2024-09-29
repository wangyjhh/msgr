import { Client, getEndpoint } from "../../../utils"
import inquirer from "inquirer"
import { getRegionIdAndGroupIdAndGroupRuleId, getPublicIP } from "../hooks"

const attributeMap = ["policy", "priority", "ipProtocol", "portRange", "sourceCidrIp", "description"]

const notModifiableMap = ["policy", "ipProtocol", "portRange"]

const getAttributeChoicesList = () => {
	return attributeMap.map((attribute) => {
		if (notModifiableMap.includes(attribute)) {
			return {
				name: attribute,
				value: attribute,
				disabled: `${attribute} is not modifiable`,
			}
		} else {
			return {
				name: attribute,
				value: attribute,
			}
		}
	})
}

export const msgr_modify_rules = async () => {
	const { regionId, securityGroupId, securityGroupRuleId } = await getRegionIdAndGroupIdAndGroupRuleId()

	const { attribute } = await inquirer.prompt([
		{
			type: "list",
			name: "attribute",
			message: "Please select the attribute to modify.",
			default: "description",
			choices: getAttributeChoicesList(),
		},
	])

	const publicIP = await getPublicIP()

	const input_prompt_map = {
		priority: {
			type: "input",
			name: "value",
			message: "Please enter priority.",
			default: "1",
		},
		sourceCidrIp: {
			type: "input",
			name: "value",
			message: "Please enter sourceCidrIp. (CIDR format and IPv4 format IP address range are supported.)",
			default: publicIP,
		},
		description: {
			type: "input",
			name: "value",
			message: "Please enter description.",
		},
	}

	// @ts-ignore
	const { value } = await inquirer.prompt([input_prompt_map[attribute]])

	await Client.modifySecurityGroup(getEndpoint(regionId), {
		regionId: regionId,
		securityGroupId: securityGroupId,
		securityGroupRuleId,
		[attribute]: value,
	})
}
