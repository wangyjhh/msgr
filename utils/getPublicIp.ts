import { v4 as publicIpv4, v6 as publicIpv6 } from 'public-ip'
import { logf } from '.'

export const getPublicIP = async () => {
    return `${(await publicIpv4()) ?? '0.0.0.0/0'}`
}

export const getPublicIPV4 = async () => {
    try {
        const ipv4 = await publicIpv4()
        logf(`${ipv4}\n`, 'success', 'IPV4')
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (error) {
        logf(`Not found\n`, 'error', 'IPV4')
    }
}

export const getPublicIPV6 = async () => {
    try {
        const ipv6 = await publicIpv6()
        logf(`${ipv6}\n`, 'success', 'IPV6')
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (error) {
        logf(`Not found\n`, 'error', 'IPV6')
    }
}
