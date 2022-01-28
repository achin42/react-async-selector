import axios from "axios";
import { uLessonUrls, getULessonHeaders } from "./ULessonUtils";
import { Lesson } from "../../models/Lesson";
import { LiveLesson } from "../../models/LiveLesson";
import { STErrorResponse } from "../../models/STErrorResponse"
import { getQueryParamsFromArray } from '../../../utils/stringUtils';


class ULessonClient {
    constructor(authToken, deviceUuid) {
        this.authToken = authToken;
        this.deviceUuid = deviceUuid;
    }

    getLessonsForIds = (ids) => {
        const headers = getULessonHeaders(this.authToken, this.deviceUuid)
        const queryParams = getQueryParamsFromArray(ids, "lesson_ids")
        const url = uLessonUrls.lessons + "?" + queryParams
    
        return new Promise((resolve, reject) => {
            axios.get(url, { params:{} , headers: headers })
             .then(function ({response}) { resolve(response.data.data.map(lessonObject => new Lesson(lessonObject))) })
             .catch(function (error) { reject(new STErrorResponse(error.response.data)) })
        })
    }

    getLiveLessonsForIds = (ids) => {
        const headers = getULessonHeaders(this.authToken, this.deviceUuid)
        const queryParams = getQueryParamsFromArray(ids, "lesson_ids")
        const url = uLessonUrls.liveLessons + "?" + queryParams
    
        return new Promise((resolve, reject) => {
            axios.get(url, { params:{} , headers: headers })
             .then(function (response) { resolve(response.data.data.map(liveLessonObject => new LiveLesson(liveLessonObject)))  })
             .catch(function (error) { reject(new STErrorResponse(error.response.data)) })
        })
    }
}

export default ULessonClient
