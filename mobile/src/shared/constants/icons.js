import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

export const DashboardIcon = ({ color, size }) => {
    return (
        <AntDesign
            name="home"
            size={size}
            color={color}
        />
    )
}

export const ChatIcon = ({ color, size }) => {
    return (
        <AntDesign
            name="message1"
            size={size}
            color={color}
        />
    )
}

export const NotificationIcon = ({ color, size }) => {
    return (
        <Ionicons
            name="ios-notifications-outline"
            size={size}
            color={color}
        />
    )
}

export const MenuIcon = ({ color, size }) => {
    return (
        <AntDesign
            name="bars"
            size={size}
            color={color}
        />
    )
}

export const ProfileIcon = ({ color, size }) => {
    return (
        <Ionicons
            name="md-person-outline"
            size={size}
            color={color}
        />
    )
}

export const HeartIcon = ({ color, size }) => {
    return (
        <AntDesign
            name="hearto"
            size={size}
            color={color}
        />
    )
}