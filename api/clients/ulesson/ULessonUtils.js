const baseUrl = "https://uat.ulesson.com/"
const versionPath = "api/v2/"

const lessonsPath = 'content/lessons'
const liveLessonsPath = 'live/lessons'
const liveLessonsPassesPath = "live/lessons/passes"

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

export const getULessonHeaders = headers
export const uLessonUrls = {
    lessons: baseUrl + versionPath + lessonsPath,
    liveLessons: baseUrl + versionPath + liveLessonsPath,
    liveLessonsPasses: baseUrl + versionPath + liveLessonsPassesPath,
}