import moment from 'moment'

const dateFromISO = (isoString) => moment(isoString).toDate();

const secondsFromNow = (date) => {
    let duration = moment.duration(moment(new Date()).diff(moment(date)));
    let seconds = duration.asSeconds();
    return Math.floor(seconds)
}

const secondsToMMSS = (seconds) => {
    return ""
    // const duration = moment.duration(seconds, 'seconds')
    // return duration.format("mm:ss")
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

module.exports = {
    dateFromISO,
    secondsFromNow,
    secondsToMMSS,
    minutesBeforeNow,
    minutesAfter
}