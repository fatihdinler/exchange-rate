import { API_KEYS } from '../../shared/constants/config'

export const getFavourites = (id) => ({
    url: `${API_KEYS.FAVOURITES}/${id}`,
    method: 'get'
})