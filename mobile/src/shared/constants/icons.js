import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'

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

export const SearchIcon = ({ color, size }) => {
    return (
        <EvilIcons
            name="search"
            size={size}
            color={color}
        />
    )
}

export const ArrowUp = ({ color, size }) => {
    return (
        <AntDesign
            name="arrowup"
            size={size}
            color={color}
        />
    )
}

export const ArrowDown = ({ color, size }) => {
    return (
        <AntDesign
            name="arrowdown"
            size={size}
            color={color}
        />
    )
}