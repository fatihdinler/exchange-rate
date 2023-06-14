import { API_KEYS } from '../../shared/constants/config'

export const getExchangeRates = () => ({
    url: `${API_KEYS.EXCHANGE_RATES}`,
    method: 'get'
})