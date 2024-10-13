#!/usr/bin/env node
import process from 'node:process'
import commander, { Command } from 'commander'
import pkg from '../../package.json'
import { logv } from '../../utils/index'
import { msgr_add_rules, msgr_config, msgr_get_v4, msgr_get_v6, msgr_modify_rules, msgr_query_rules, msgr_remove_rules } from './command'

const program = new Command()

program
    .name('msgr')
    .addHelpText(
        'after',
        `
Example:
  $ msgr config get accessKeyId 
  $ msgr config get accessKeySecret
  $ msgr config set accessKeyId xxx
  $ msgr config set accessKeySecret xxx
  $ msgr list or msgr ls
  $ msgr add or msgr ad or msgr insert
  $ msgr remove or msgr rm or msgr delete
  $ msgr modify or msgr mo or msgr edit
  $ msgr v4
  $ msgr v6
  `,
    )
    .description('Alibaba Cloud security group rule management tool.')

program.showHelpAfterError('(add -h or --help for additional information)')

// 设置accessKey
program
    .command('config')
    .addHelpText(
        'after',
        '\nExample:\n    $ msgr config get accessKeyId\n  $ msgr config get accessKeySecret\n  $ msgr config set accessKeyId <accessKeyId>\n  $ msgr config set accessKeySecret <accessKeySecret>\n',
    )
    .addArgument(new commander.Argument('<tpye>', 'Config type, get or set.').choices(['get', 'set']))
    .addArgument(new commander.Argument('<accesskey>', 'Set accessKey.').choices(['accessKeyId', 'accessKeySecret']))
    .argument('[value]', 'AccessKey value.', '')
    .description('Configuration')
    .action(msgr_config)

// 查看安全组规则
program.command('list').aliases(['ls']).description('Review the security group rules.').action(msgr_query_rules)
// 新增安全组规则
program.command('add').aliases(['ad', 'insert']).description('Add the security group rules.').action(msgr_add_rules)
// 删除安全组规则
program.command('remove').aliases(['rm', 'delete']).description('Remove the security group rules.').action(msgr_remove_rules)
// 修改安全组规则
program.command('modify').aliases(['mo', 'edit']).description('Modify the security group rules.').action(msgr_modify_rules)
// 查看公网ipv4地址
program.command('v4').description('Querying an ipv4 public ip address.').action(msgr_get_v4)
// 查看公网ipv6地址
program.command('v6').description('Querying an ipv6 public ip address.').action(msgr_get_v6)

program.version(logv(pkg.version), '-v, --version', 'Output version number.')

program.parse(process.argv)

// 处理ctrl+c
process.on('exit', () => {
    process.exit(0)
})
