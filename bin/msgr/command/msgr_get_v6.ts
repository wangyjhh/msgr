import { getPublicIPV6 } from "../hooks"

export const msgr_get_v6 = async () => {
    await getPublicIPV6()
}
