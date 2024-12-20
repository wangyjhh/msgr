# @wangyjhh/msgr

A security group rule management tool for Alibaba Cloud ESC implemented based on the official SDK.

## Install
```bash
# npm
npm i @wangyjhh/msgr -g

# pnpm
pnpm add @wangyjhh/msgr -g
```
## Usage

### CLI

```html
Usage: msgr [options] [command]

Alibaba Cloud security group rule management tool.

Options:
  -v, --version                      Output version number.
  -h, --help                         display help for command

Commands:
  config <tpye>                      Configuration
  list|ls                            Review the security group rules.
  add|ad                             Add the security group rules.
  remove|rm                          Remove the security group rules.
  modify|mo                          Modify the security group rules.
  help [command]                     display help for command
```
### API
```typescript
import MSGR from '@wangyjhh/msgr'

const region_msgr = new MSGR({
    regionId: 'your regionId',
    accessKeyId: 'your accessKeyId',
    accessKeySecret: 'your accessKeySecret',
})
```
> regionId Supports values. For details, see [regionIdMap](https://github.com/wangyjhh/msgr/blob/main/utils/regionIdMap.ts)

## Example

### Cli
Enter the command and fill in the necessary information according to the command line instructions

#### Get config
```bash
msgr config get
```
#### Set config
```bash
msgr config set
```
#### Default config
```bash
msgr config default
```
#### Remove config
```bash
msgr config remove
```
#### Clear config
```bash
msgr config clear
```
#### Get Security group rules list
```bash
msgr list
```
```bash
# The following commands will also work
msgr ls
```
#### Add Security group rules
```bash
msgr add
```
```bash
# The following commands will also work
msgr ad
msgr insert
```
#### Remove Security group rules
```bash
msgr remove
```
```bash
# The following commands will also work
msgr rm
msgr delete
```
#### Modify Security group rules
```bash
msgr modify
```
```bash
# The following commands will also work
msgr mo
msgr edit
```
### API
```typescript
import MSGR from '@wangyjhh/msgr'

const region_msgr = new MSGR({
    regionId: 'your regionId',
    accessKeyId: 'your accessKeyId',
    accessKeySecret: 'your accessKeySecret',
})

const main = async () => {
    // get security group id
    const security_group_id = (await region_msgr.getSecurityGroupId())[0]

    // get security group rules
    const security_group_test_rule_ifno = await region_msgr.getSecurityGroup(security_group_id, (item) => {
        return item.portRange === '80/80'
    })

    // get security group rule id
    const security_group_test_rule_id = security_group_test_rule_ifno[0].securityGroupRuleId

    // add security group rules
    await region_msgr.addSecurityGroup(security_group_id, {
        policy: 'accept',
        priority: '2',
        ipProtocol: 'TCP',
        portRange: '80/80',
        sourceCidrIp: '0.0.0.0/0',
        description: 'test',
    })

    // modify security group rules
    await region_msgr.modifySecurityGroup(security_group_id, security_group_test_rule_id, {
        policy: 'drop',
        priority: '2',
        ipProtocol: 'TCP',
        portRange: '80/80',
        sourceCidrIp: '0.0.0.0/0',
        description: 'test',
    })

    // delete security group rules
    await msgr.deleteSecurityGroup(security_group_id, security_group_test_rule_id)
}

main()
```
