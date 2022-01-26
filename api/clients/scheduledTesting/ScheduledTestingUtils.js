

const baseUrl = "http://13.235.19.203:8080/scheduled-exam/"
const upcomingPublishedExamsPath = 'exam/upcomingPublished'
const scheduledExamsPath = 'myExams'

const appToken = "574616d1ee6f7c43dc05da487e5197cd503c430fd9953364f2bfa60d2070bf3c"
const language = 'en'
const buildNumber = '1'


const headers = (authToken, deviceUUID) => ({
    'app-token': appToken,
    'language': language,
    'build-number': buildNumber,
    'auth-token': authToken,
    'device-uuid': deviceUUID
})

export const getScheduledTestingHeaders = headers
export const scheduledTestingUrls = {
    upcomingPublishedExams: baseUrl + upcomingPublishedExamsPath,
    scheduledExams: baseUrl + scheduledExamsPath,
    registerExam: baseUrl,
}