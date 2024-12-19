import type { PermissionsType, RegionID, SecurityGroupFilter, SecurityGroupItem } from '../../types'
import ECS, * as $ECS from '@alicloud/ecs20140526'
import * as $OpenApi from '@alicloud/openapi-client'
import * as $Util from '@alicloud/tea-util'
import { getEndpoint } from '../../utils'

export class MSGR {
    private regionId: string
    private client: ECS
    constructor({ accessKeyId, accessKeySecret, regionId }: { accessKeyId: string, accessKeySecret: string, regionId: RegionID }) {
        this.regionId = regionId
        this.client = this.createClient(getEndpoint(regionId), accessKeyId, accessKeySecret)
    }

    // 创建客户端
    private createClient(endpoint: string, accessKeyId: string, accessKeySecret: string): ECS {
        const config = new $OpenApi.Config({
            accessKeyId,
            accessKeySecret,
        })
        config.endpoint = endpoint
        return new ECS(config)
    }

    // 获取区域安全组ID
    async getSecurityGroupId(): Promise<any> {
        const request = new $ECS.DescribeSecurityGroupsRequest({
            regionId: this.regionId,
        })
        const runtime = new $Util.RuntimeOptions({})
        const group = (await this.client.describeSecurityGroupsWithOptions(request, runtime)).body?.securityGroups?.securityGroup
        return group?.map((item: any) => item.securityGroupId)
    }

    // 获取安全组规则信息
    async getSecurityGroup(securityGroupId: string, filter?: SecurityGroupFilter): Promise<SecurityGroupItem[] | []> {
        const request = new $ECS.DescribeSecurityGroupAttributeRequest({
            regionId: this.regionId,
            securityGroupId,
        })
        const runtime = new $Util.RuntimeOptions({})
        const result = ((await this.client.describeSecurityGroupAttributeWithOptions(request, runtime)).body?.permissions?.permission)
        if (!result) {
            return []
        }
        else {
            return result.map((item) => {
                return {
                    description: item.description,
                    securityGroupRuleId: item.securityGroupRuleId,
                }
            }).filter((item) => {
                return !filter || filter(item)
            })
        }
    }

    // 添加入方向安全组规则
    async addSecurityGroupRule(securityGroupId: string, rules: PermissionsType): Promise<any> {
        const request = new $ECS.AuthorizeSecurityGroupRequest({
            regionId: this.regionId,
            securityGroupId,
            permissions: [
                rules,
            ],
        })
        const runtime = new $Util.RuntimeOptions({})
        const response = await this.client.authorizeSecurityGroupWithOptions(request, runtime)
        return response
    }
}
