import axios from "axios";
import { scheduledTestingUrls, getScheduledTestingHeaders } from "./ScheduledTestingUtils";
import { Exam } from "./../../models/Exam";
import { ScheduledExam } from "../../models/ScheduledExam";
import { STErrorResponse } from "../../models/STErrorResponse"

class ExamsClient {
    constructor(authToken, deviceUuid) {
        this.authToken = authToken;
        this.deviceUuid = deviceUuid;
    }

    getUpcomingPublishedExams = async () => {
        try {
            const response = await axios.get(scheduledTestingUrls.upcomingPublishedExams, { params:{} , headers: getScheduledTestingHeaders(this.authToken, this.deviceUuid) })
            return { newExams: response.data.map(examObject => new Exam(examObject)), examsError: null }
        } catch(error) {
            const examsError = new STErrorResponse(error.response.data)
            return { newExams: null, examsError: examsError }
        }
    }

    registerExam = (examId) => {
        const payload = { exam_id: examId }
        const headers = getScheduledTestingHeaders(this.authToken, this.deviceUuid)

        return new Promise((resolve, reject) => {
            axios.post(scheduledTestingUrls.registerExam, payload, { headers: headers })
             .then(function (response) { resolve(new ScheduledExam(response.data)) })
             .catch(function (error) { reject(new STErrorResponse(error.response.data)) })
        })
    }
}

export { ExamsClient }