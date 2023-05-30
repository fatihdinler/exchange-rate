
export const getGreetingMessage = () => {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()

    if (currentHour >= 5 && currentHour < 12) {
        return 'Günaydın'
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'Tünaydın'
    } else if (currentHour >= 18 && currentHour < 22) {
        return 'İyi akşamlar'
    } else {
        return 'İyi geceler'
    }
}