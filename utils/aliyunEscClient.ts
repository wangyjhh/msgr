// import { readJSONSync } from "fs-extra"
import ECS, * as $ECS from "@alicloud/ecs20140526"
import * as $OpenApi from "@alicloud/openapi-client"
import * as $Util from "@alicloud/tea-util"
import { readFileSync, ensureFileSync } from "fs-extra"
import { join } from "path"
import { homedir } from "node:os"

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

const configPath = join(homedir(), ".msgr", "config")
ensureFileSync(configPath)
const AccessKeyConfig = JSON.parse(
	readFileSync(configPath, "utf-8")
		? readFileSync(configPath, "utf-8")
		: `{
				"accessKeyId": "",
				"accessKeySecret": ""
			}\n\r`
)

export class Client {
	/**
	 * @remarks
	 * 使用AK&SK初始化账号Client
	 * @returns Client
	 *
	 * @throws Exception
	 */
	static createClient(endpoint: string): ECS {
		// 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
		// 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。

		let config = new $OpenApi.Config({
			// 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
			accessKeyId: AccessKeyConfig.accessKeyId,
			// 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
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
		let client = Client.createClient(endpoint)
		let describeSecurityGroupAttributeRequest = new $ECS.DescribeSecurityGroupsRequest(args)
		let runtime = new $Util.RuntimeOptions({})
		try {
			// 复制代码运行请自行打印 API 的返回值
			const group = (await client.describeSecurityGroupsWithOptions(describeSecurityGroupAttributeRequest, runtime)).body?.securityGroups
				?.securityGroup
			return group?.map((item: any) => item.securityGroupId)
		} catch (error: any) {
			// 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
			// 错误 message
			return error.data
			// 诊断地址
			// console.log(error.data["Recommend"])
		}
	}

	/**
	 * @remarks
	 * 获取安全组规则信息
	 * @returns any
	 */
	static async getSecurityGroup(endpoint: string, args: DescribeSecurityGroupAttributeRequestArgs): Promise<any> {
		let client = Client.createClient(endpoint)
		let describeSecurityGroupAttributeRequest = new $ECS.DescribeSecurityGroupAttributeRequest(args)
		let runtime = new $Util.RuntimeOptions({})
		try {
			// 复制代码运行请自行打印 API 的返回值
			return (await client.describeSecurityGroupAttributeWithOptions(describeSecurityGroupAttributeRequest, runtime)).body?.permissions
				?.permission
		} catch (error: any) {
			// 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
			// 错误 message
			return error.data
			// 诊断地址
			// console.log(error.data["Recommend"])
		}
	}

	/**
	 * @remarks
	 * 获取安全组规则ID
	 * @returns any
	 */
	static async getSecurityGroupRuleId(endpoint: string, args: DescribeSecurityGroupAttributeRequestArgs): Promise<any> {
		let client = Client.createClient(endpoint)
		let describeSecurityGroupAttributeRequest = new $ECS.DescribeSecurityGroupAttributeRequest(args)
		let runtime = new $Util.RuntimeOptions({})
		try {
			// 复制代码运行请自行打印 API 的返回值
			return (
				await client.describeSecurityGroupAttributeWithOptions(describeSecurityGroupAttributeRequest, runtime)
			).body?.permissions?.permission?.filter((securityGroup: any) => securityGroup.description === "家中公网IP")[0].securityGroupRuleId
		} catch (error: any) {
			// 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
			// 错误 message
			return error.data
			// 诊断地址
			// console.log(error.data["Recommend"])
		}
	}

	/**
	 * @remarks
	 * 修改北京安全组规则
	 * @param args 参数
	 * @returns
	 */
	static async modifySecurityGroup(endpoint: string, args: ModifySecurityGroupRuleRequestArgs): Promise<any> {
		let client = Client.createClient(endpoint)
		let modifySecurityGroupRuleRequest = new $ECS.ModifySecurityGroupRuleRequest(args)
		let runtime = new $Util.RuntimeOptions({})
		try {
			return await client.modifySecurityGroupRuleWithOptions(modifySecurityGroupRuleRequest, runtime)
		} catch (error: any) {
			// 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
			// 错误 message
			return error.data
			// 诊断地址
			// console.log(error.data["Recommend"])
		}
	}
}