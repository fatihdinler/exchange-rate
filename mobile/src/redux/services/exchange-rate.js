import { API_KEYS } from '../../shared/constants/config'

export const getRates = () => ({
    url: `${API_KEYS.RATES}`,
    method: 'get'
})