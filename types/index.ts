interface SecurityGroupAttributesType {
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

interface BaseRequestArgs {
    regionId: string
}

type DescribeSecurityGroupAttributeRequestArgs = BaseRequestArgs & {
    securityGroupId: string
}

// eslint-disable-next-line unused-imports/no-unused-vars
type ModifySecurityGroupRuleRequestArgs = DescribeSecurityGroupAttributeRequestArgs & {
    securityGroupRuleId: string
    sourceCidrIp?: string
    description?: string
}

type PermissionsType = Required<
    Pick<SecurityGroupAttributesType, 'policy' | 'priority' | 'sourceCidrIp' | 'ipProtocol' | 'portRange' | 'description'>
>

// eslint-disable-next-line unused-imports/no-unused-vars
type AddSecurityGroupRuleRequestArgs = DescribeSecurityGroupAttributeRequestArgs & {
    permissions: PermissionsType[]
}

// eslint-disable-next-line unused-imports/no-unused-vars
type RemoveSecurityGroupRuleRequestArgs = DescribeSecurityGroupAttributeRequestArgs & {
    securityGroupRuleId: string[]
}

interface ConfigurationItem {
    accessKeyId?: string
    accessKeySecret?: string
    default?: boolean
}

// eslint-disable-next-line unused-imports/no-unused-vars
interface ConfigurationType {
    [key: string]: ConfigurationItem
}
