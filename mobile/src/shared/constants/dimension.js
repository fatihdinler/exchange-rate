import { Dimensions } from 'react-native'

export const getHeight = () => {
    const SCREEN_HEIGHT = Dimensions.get('screen').height
    return SCREEN_HEIGHT
}

export const getWidth = () => {
    const SCREEN_WIDTH = Dimensions.get('screen').width
    return SCREEN_WIDTH
}

export const textDimensions = () => {

}