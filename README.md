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

```html
Usage: msgr [options] [command]

Alibaba Cloud security group rule management tool.

Options:
  -v, --version                      Output version number.
  -h, --help                         display help for command

Commands:
  config <tpye> <accesskey> [value]  Configuration
  list|ls                            Review the security group rules.
  add|ad                             Add the security group rules.
  remove|rm                          Remove the security group rules.
  modify|mo                          Modify the security group rules.
  help [command]                     display help for command
```
## Example

Enter the command and fill in the necessary information according to the command line instructions

#### Get config
```bash
msgr config get accessKeyId
msgr config get accessKeySecret
```
#### Set config
```bash
msgr config set accessKeyId [accessKeyId]
msgr config set accessKeySecret [accessKeySecret]
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
