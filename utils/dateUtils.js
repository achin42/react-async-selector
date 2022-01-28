import moment from 'moment'
require("moment-duration-format");

const dateFromISO = (isoString) => moment(isoString).toDate();

const secondsFromNow = (date) => {
    let duration = moment.duration(moment(date).diff(moment(new Date())));
    let seconds = duration.asSeconds();
    return Math.floor(seconds)
}

const secondsToMMSS = (seconds) => {
    // let text = ""
    // let mm = Math.floor(seconds / 60)
    // let seconds = mi
    // return text
    const duration = moment.duration(seconds, 'seconds')
    return duration.format("mm:ss")
}

const secondsToHHMMSS = (seconds) => {
    // let text = ""
    // let mm = Math.floor(seconds / 60)
    // let seconds = mi
    // return text
    const duration = moment.duration(seconds, 'seconds')
    return duration.format("hh:mm:ss")
}

const minutesBeforeNow = (minutes) =>  {
    const now = moment(new Date())
    const then = now.clone()
    then.subtract(minutes * 60, 'seconds')
    return then.toDate()
}

const minutesAfter = (date, minutes) =>  {
    const m = moment(date)
    m.add(minutes * 60, 'seconds')
    return m.toDate()
}

const singleUnitCountdown = (seconds) => {
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24)

    if(days > 0) return days > 1 ? `${days} day` : `${days} days`
    if(hours > 0) return hours > 1 ? `${hours} hour` : `${hours} hours`
    if(minutes > 0) return minutes > 1 ? `${minutes} minunte` : `${minutes} minutes`
    return seconds > 1 ? `${seconds} second` : `${seconds} seconds`
}

module.exports = {
    dateFromISO,
    secondsFromNow,
    secondsToMMSS,
    secondsToHHMMSS,
    minutesBeforeNow,
    minutesAfter,
    singleUnitCountdown
}