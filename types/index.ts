type SecurityGroupAttributesType = {
	createTime: string
	description: string
	destCidrIp: string
	destGroupId: string
	destGroupName: string
	destGroupOwnerAccount: string
	destPrefixListId: string
	destPrefixListName: string
	direction: string
	ipProtocol: string
	ipv6DestCidrIp: string
	ipv6SourceCidrIp: string
	nicType: string
	policy: string
	portRange: string
	priority: string
	securityGroupRuleId: string
	sourceCidrIp: string
	sourceGroupId: string
	sourceGroupName: string
	sourceGroupOwnerAccount: string
	sourcePortRange: string
	sourcePrefixListId: string
	sourcePrefixListName: string
}

type BaseRequestArgs = {
	regionId: string
}

type DescribeSecurityGroupAttributeRequestArgs = BaseRequestArgs & {
	securityGroupId: string
}

type ModifySecurityGroupRuleRequestArgs = DescribeSecurityGroupAttributeRequestArgs & {
	securityGroupRuleId: string
	sourceCidrIp: string
}

type PermissionsType = Required<
	Pick<SecurityGroupAttributesType, "policy" | "priority" | "sourceCidrIp" | "ipProtocol" | "portRange" | "description">
>

type AddSecurityGroupRuleRequestArgs = DescribeSecurityGroupAttributeRequestArgs & {
	permissions: PermissionsType[]
}

type RemoveSecurityGroupRuleRequestArgs = DescribeSecurityGroupAttributeRequestArgs & {
	securityGroupRuleId: string[]
}
