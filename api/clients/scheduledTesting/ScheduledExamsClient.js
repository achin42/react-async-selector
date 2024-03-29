import axios from "axios";
import { scheduledTestingUrls, getScheduledTestingHeaders } from "./ScheduledTestingUtils";
import { ScheduledExam } from "../../models/ScheduledExam";
import { STErrorResponse } from "../../models/STErrorResponse"
import { dirtyCreateExamFromScheduledExam } from "../../../utils/dirtyCreator"


class ScheduledExamsClient {
    constructor(authToken, deviceUuid) {
        this.authToken = authToken;
        this.deviceUuid = deviceUuid;
    }

    getScheduledExams = async (range) => {
        try {
            const url = scheduledTestingUrls.scheduledExams + `?range=${range}`
            const response = await axios.get(url, { params:{} , headers: getScheduledTestingHeaders(this.authToken, this.deviceUuid) })
            return { newScheduledExams: response.data.map(scheduledExamObject => dirtyCreateExamFromScheduledExam(scheduledExamObject)).filter(exam => exam != null)}
        } catch(error) {
            const examsError = new STErrorResponse(error.response.data)
            return { newScheduledExams: null, examsError: examsError }
        }
    }

    getAllScheduledExams = () => getScheduledExams("all")
    getUpcomingScheduledExams = () => getScheduledExams("upcoming")
    getPastScheduledExams = () => getScheduledExams("past")
}

export { ScheduledExamsClient }