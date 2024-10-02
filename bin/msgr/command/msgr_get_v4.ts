import { getPublicIPV4 } from "../hooks"

export const msgr_get_v4 = async () => {
	await getPublicIPV4()
}
