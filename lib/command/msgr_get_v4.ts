import { getPublicIPV4 } from '../../utils'

export const msgr_get_v4 = async () => {
    await getPublicIPV4()
}
