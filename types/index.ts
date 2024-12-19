import type { regionIdMap } from '../utils'

export interface SecurityGroupAttributesType {
    createTime: string
    description: string
    destCidrIp: string
    destGroupId: string
    destGroupName: string
    destGroupOwnerAccount: string
    destPrefixListId: string
    destPrefixListName: string
    direction: string
    ipProtocol: 'TCP' | 'UDP'
    ipv6DestCidrIp: string
    ipv6SourceCidrIp: string
    nicType: string
    policy: 'accept' | 'drop'
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

export interface BaseRequestArgs {
    regionId: string
}

export type DescribeSecurityGroupAttributeRequestArgs = BaseRequestArgs & {
    securityGroupId: string
}

export type ModifySecurityGroupRuleRequestArgs = DescribeSecurityGroupAttributeRequestArgs & {
    securityGroupRuleId: string
    sourceCidrIp?: string
    description?: string
}

export type PermissionsType = Required<
    Pick<SecurityGroupAttributesType, 'policy' | 'priority' | 'sourceCidrIp' | 'ipProtocol' | 'portRange' | 'description'>
>

export type AddSecurityGroupRuleRequestArgs = DescribeSecurityGroupAttributeRequestArgs & {
    permissions: PermissionsType[]
}

export type RemoveSecurityGroupRuleRequestArgs = DescribeSecurityGroupAttributeRequestArgs & {
    securityGroupRuleId: string[]
}

export interface ConfigurationItem {
    accessKeyId?: string
    accessKeySecret?: string
    default?: boolean
}

export interface ConfigurationType {
    [key: string]: ConfigurationItem
}

export type RegionID = typeof regionIdMap[number]['value']

export type SecurityGroupItem = Partial<Pick<SecurityGroupAttributesType, 'description' | 'securityGroupRuleId'>>

export type SecurityGroupFilter = (item: SecurityGroupItem) => boolean
