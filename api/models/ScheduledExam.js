import { dateFromISO } from '../../utils/dateUtils'
import { Exam } from './Exam';
import { Report } from './Report'

class ScheduledExam {
    constructor(scheduledExamObject) {
        this.id = scheduledExamObject._id;
        this.isReminderEnabled = scheduledExamObject.is_reminder_enabled;
        this.learnerName = scheduledExamObject.learner_name;
        this.learnerId = scheduledExamObject.learner_id;
        this.examId = scheduledExamObject.exam_id;
        this.startedAt = scheduledExamObject.started_at != null ? dateFromISO(scheduledExamObject.started_at) : null;
        this.finishedAt = scheduledExamObject.finished_at != null ? dateFromISO(scheduledExamObject.finished_at) : null;
        this.createdAt = dateFromISO(scheduledExamObject.createdAt);
        this.updatedAt = dateFromISO(scheduledExamObject.updatedAt);
        this.report = new Report(scheduledExamObject.report);
        this.exam = scheduledExamObject.exam_details ? new Exam(scheduledExamObject.exam_details) : null
    }

    setExam = (exam) => this.exam = exam
}

export { ScheduledExam }