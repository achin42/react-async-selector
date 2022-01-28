import { ScheduledExam } from "../api/models/ScheduledExam";
import { Exam } from "../api/models/Exam";


const dirtyCreateExamFromScheduledExam = (scheduledExamObject) => {

    if(scheduledExamObject.exam_details) {
        const scheduledExam = new ScheduledExam(scheduledExamObject)
        const exam = new Exam(scheduledExamObject.exam_details)
        exam.setScheduledExam(scheduledExam)
        return exam;
    } else {
        return null;
    }
    
}

export { dirtyCreateExamFromScheduledExam }