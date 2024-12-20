#!/usr/bin/env node
import process from 'node:process'
import commander, { Command } from 'commander'
import {
    msgr_add_rules,
    msgr_config,
    msgr_get_v4,
    msgr_get_v6,
    msgr_modify_rules,
    msgr_query_rules,
    msgr_remove_rules,
} from '../lib/command'
import pkg from '../package.json'
import { logv } from '../utils/index'

const program = new Command()

program
    .name('msgr')
    .addHelpText(
        'after',
        `
Example:
  $ msgr config set
  $ msgr config get
  $ msgr config remove
  $ msgr config clear
  $ msgr config default
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
        '\nExample:\n  $ msgr config set\n  $ msgr config get\n  $ msgr config remove\n  $ msgr config clear\n  $ msgr config default\n',
    )
    .addArgument(new commander.Argument('<tpye>', 'Config type. [set][get][default][remove][clear]'))
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
