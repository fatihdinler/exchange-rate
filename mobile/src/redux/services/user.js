import { API_KEYS } from "../../shared/constants/config"

export const user = (id) => ({
    url: `${API_KEYS.USERS}/${id}`,
    method: 'get'
})