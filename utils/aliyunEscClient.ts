import type {
    AddSecurityGroupRuleRequestArgs,
    BaseRequestArgs,
    ConfigurationType,
    DescribeSecurityGroupAttributeRequestArgs,
    ModifySecurityGroupRuleRequestArgs,
    RemoveSecurityGroupRuleRequestArgs,
} from '../types'
import process from 'node:process'
import ECS, * as $ECS from '@alicloud/ecs20140526'
import * as $OpenApi from '@alicloud/openapi-client'
import * as $Util from '@alicloud/tea-util'
import { configIsEmpty, getConfig, logf } from '.'

export class Client {
    /**
     * @remarks
     * 使用AK&SK初始化账号Client
     * @returns Client
     * @throws Exception
     */
    static createClient(endpoint: string): ECS {
        const AccessKeyConfig = getConfig('default') as ConfigurationType
        configIsEmpty(AccessKeyConfig)

        const config = new $OpenApi.Config({
            accessKeyId: AccessKeyConfig.accessKeyId,
            accessKeySecret: AccessKeyConfig.accessKeySecret,
        })
        // Endpoint 请参考 https://api.aliyun.com/product/Ecs
        config.endpoint = endpoint
        return new ECS(config)
    }

    /**
     * @remarks
     * 获取区域安全组ID
     * @returns any
     */
    static async getSecurityGroupId(endpoint: string, args: BaseRequestArgs): Promise<any> {
        const client = Client.createClient(endpoint)
        const request = new $ECS.DescribeSecurityGroupsRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            const group = (await client.describeSecurityGroupsWithOptions(request, runtime)).body?.securityGroups?.securityGroup
            return group?.map((item: any) => item.securityGroupId)
        }
        catch (error: any) {
            logf(`${error.data.Message}\n`, 'error', 'ERROR')
            process.exit(1)
        }
    }

    /**
     * @remarks
     * 获取安全组规则信息
     * @returns any
     */
    static async getSecurityGroup(endpoint: string, args: DescribeSecurityGroupAttributeRequestArgs): Promise<any> {
        const client = Client.createClient(endpoint)
        const request = new $ECS.DescribeSecurityGroupAttributeRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            return (await client.describeSecurityGroupAttributeWithOptions(request, runtime)).body?.permissions?.permission
        }
        catch (error: any) {
            logf(`${error.data.Message}`, 'error', 'ERROR')
            process.exit(1)
        }
    }

    /**
     * @remarks
     * 获取安全组规则ID
     * @returns any
     */
    static async getSecurityGroupRuleId(endpoint: string, args: DescribeSecurityGroupAttributeRequestArgs): Promise<any> {
        const client = Client.createClient(endpoint)
        const request = new $ECS.DescribeSecurityGroupAttributeRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            return (await client.describeSecurityGroupAttributeWithOptions(request, runtime)).body?.permissions?.permission?.filter(
                (securityGroup: any) => securityGroup.description === '家中公网IP',
            )[0].securityGroupRuleId
        }
        catch (error: any) {
            logf(`${error.data.Message}`, 'error', 'ERROR')
            process.exit(1)
        }
    }

    /**
     * @remarks
     * 添加入方向安全组规则
     * @returns any
     */
    static async addSecurityGroupRule(endpoint: string, args: AddSecurityGroupRuleRequestArgs): Promise<any> {
        const client = Client.createClient(endpoint)
        const request = new $ECS.AuthorizeSecurityGroupRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            const response = await client.authorizeSecurityGroupWithOptions(request, runtime)
            logf('The security group rule was added successfully.\n', 'success')
            return response
        }
        catch (error: any) {
            logf(`${error.data.Message}`, 'error', 'ERROR')
            process.exit(1)
        }
    }

    /**
     * @remarks
     * 删除入方向安全组规则
     * @returns any
     */
    static async removeSecurityGroupRule(endpoint: string, args: RemoveSecurityGroupRuleRequestArgs): Promise<any> {
        const client = Client.createClient(endpoint)
        const request = new $ECS.RevokeSecurityGroupRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            const response = await client.revokeSecurityGroupWithOptions(request, runtime)
            logf('The security group rule was removed successfully.\n', 'success')
            return response
        }
        catch (error: any) {
            logf(`${error.data.Message}`, 'error', 'ERROR')
            process.exit(1)
        }
    }

    /**
     * @remarks
     * 修改入方向安全组规则
     * @param endpoint 参数
     * @param args 参数
     * @returns any
     */
    static async modifySecurityGroupRule(endpoint: string, args: ModifySecurityGroupRuleRequestArgs): Promise<any> {
        const client = Client.createClient(endpoint)
        const request = new $ECS.ModifySecurityGroupRuleRequest(args)
        const runtime = new $Util.RuntimeOptions({})
        try {
            const response = await client.modifySecurityGroupRuleWithOptions(request, runtime)
            logf('The security group rule was modified successfully.\n', 'success')
            return response
        }
        catch (error: any) {
            logf(`${error.data.Message}`, 'error', 'ERROR')
            process.exit(1)
        }
    }
}
