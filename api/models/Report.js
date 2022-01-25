

class Report {
    constructor(reportObject) {
        this.percentile = reportObject.percentile;
        this.rank = reportObject.rank;
        this.averageTimePerQuestion = reportObject.avg_time_per_question;
        this.incorrectCount = reportObject.incorrect_answers_count;
        this.correctCount = reportObject.correct_answers_count;
        this.skippedCount = reportObject.skipped_answers_count;
        this.submissions = reportObject.questions.map(question => new Submission(question));
    }
}

class Submission {
    constructor(submissionObject) {
        this.isCorrect = submissionObject.is_correct;
        this.selectedOptions = submissionObject.selected_options;
        this.qusetionId = submissionObject.question_id;
        this.correctOptions = [];
    }

    setCorrectOptions = (correctOptions) => this.correctOptions = correctOptions;
}

module.exports = {
    Report,
    Submission
}