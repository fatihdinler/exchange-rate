import { API_KEYS } from '../../shared/constants/config'

export const getMoneyConverter = (params) => ({
    url: `${API_KEYS.MONEY_CONVERTER}`,
    method: 'get',
    params: params
})