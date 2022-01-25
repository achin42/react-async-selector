import { dateFromISO, secondsFromNow, secondsToMMSS, minutesAfter } from '../../utils/dateUtils'

class Exam {
    constructor(examObject) {
        this.title = examObject.title;
        this.description = examObject.description;
        this.id = examObject._id;
        this.applicantCount = examObject.applicant_count;
        this.isPublished = examObject.isPublished;
        this.registrationCloseWarningDurationInHours = examObject.registration_close_warning_duration;
        this.registrationCloseTime = dateFromISO(examObject.registration_close_time);
        this.lessonIds = examObject.lessons;
        this.liveLessonIds = examObject.live_lessons;
        this.startDate = dateFromISO(examObject.start_time);
        this.durationInMins = examObject.duration;
        this.createdAt = dateFromISO(examObject.createdAt);
        this.updatedAt = dateFromISO(examObject.updatedAt);

        this.imageUrls = new ExamImageUrls(examObject.images);
        this.instructions = new Instructions(examObject.instruction);
        this.countries = examObject.countries.map(countryObject => new Country(countryObject))
        this.grade = new Grade(examObject.grade);
        this.subject = new Subject(examObject.subject);
        this.questions = examObject.questions.map(questionObject => new Question(questionObject));

        this.scheduledExamId = null;

        // Dynamic state variables
        this.shouldShowRegistrationCloseWarning = false;
        this.registrationCloseWarningTimerText = null;
        
        this.shouldShowExamStartTimer = false;
        this.examStartTimerText = null;

        this.canExamStart = false
    }

    isValidUpcomingExam = () => {
        if(this.scheduledExamId) { return !this.hasFinished() }        
        return !this.hasRegistrationClosed()
    }

    shouldShow = () => !(!this.scheduledExamId && !this.shouldShowRegistrationCloseWarning && secondsFromNow(this.registrationCloseTime < 0))

    setScheduledExamId = (scheduledExam) => { if(scheduledExam) this.scheduledExamId = scheduledExam.id }

    refreshDynamicState = () => {
        let hasChanges = false;

        if(this.scheduledExamId && !this.shouldShowExamStartTimer) {
            const startDateSecondsLeft = secondsFromNow(this.startDate)
            if(startDateSecondsLeft < 0) {
                hasChanges = true;
                this.canExamStart = true;
                this.shouldShowExamStartTimer = false;
                this.examStartTimerText = null;
            }
            if(startDateSecondsLeft <= 5 * 60 * 60) {
                hasChanges = true;
                this.shouldShowRegistrationCloseWarning = false;
                this.registrationCloseWarningTimerText = null;
                this.shouldShowExamStartTimer = true;
                this.examStartTimerText = secondsToMMSS(startDateSecondsLeft);
            }
        }

        if((!this.scheduledExamId && !this.shouldShowRegistrationCloseWarning) || this.shouldShowRegistrationCloseWarning) {
            const registrationCloseSecondsLeft = secondsFromNow(this.registrationCloseTime)
            
            if(registrationCloseSecondsLeft > 0 && registrationCloseSecondsLeft < this.registrationCloseWarningDurationInHours * 60 * 60) {
                hasChanges = true;
                this.shouldShowRegistrationCloseWarning = true;
                const registrationCloseHoursLeft = Math.floor(registrationCloseSecondsLeft / (60 * 60))
                if(registrationCloseHoursLeft > 24) {
                    const days = Math.floor(registrationCloseHoursLeft / 24)
                    this.registrationCloseWarningTimerText = days + `${days > 1 ? " days" : " day"}`
                } else {
                    this.registrationCloseWarningTimerText = registrationCloseHoursLeft + `${registrationCloseHoursLeft > 1 ? " hours" : " hour"}`
                }
            }
        }

        return hasChanges;
    }

    hasRegistrationClosed = () =>  secondsFromNow(this.registrationCloseTime) < 0

    hasFinished = () => minutesAfter(this.startDate, this.durationInMins) < new Date()
}


class ExamImageUrls {
    constructor(imageUrlsObject) {
        this.mobile = imageUrlsObject.mobile;
        this.desktop = imageUrlsObject.desktop;
    }
}

class Instructions {
    constructor(instructionsObject) {
        this.requirements = instructionsObject.requirements;
        this.information = instructionsObject.information;
    }
}

class Country {
    constructor(countryObject) {
        this.id = countryObject.id;
        this.position = countryObject.position;
        this.name = countryObject.name;
        this.flagUnicode = countryObject.flag_unicode;
        this.countryCode = countryObject.country_code;
        this.dialingCode = countryObject.dialing_code;
        this.currency = countryObject.currency;
        this.enabled = countryObject.enabled;
        this.deviceRetailingEnabled = countryObject.device_retailing_enabled;
    }
}

class Grade {
    constructor(gradeObject) {
        this.id = gradeObject.id;
        this.name = gradeObject.name;
        this.displayName = gradeObject.display_name;
        this.gradeCode = gradeObject.grade_code;
    }
}

class Subject {
    constructor(subjectObject) {
        this.id = subjectObject.id;
        this.name = subjectObject.name;
        this.contentCode = subjectObject.content_code;
        this.enabledForChat = subjectObject.enabled_for_chat;
        this.position = subjectObject.position;
        this.iconThumb = subjectObject.icon_thumb;
    }
}

class Question {
    constructor(questionObject) {
        this.id = questionObject._id;
        this.title = questionObject.title;
        this.questIds = questionObject.quest_tags;
        this.lessonIds = questionObject.lesson_tags;
        this.explanation = questionObject.explanation;
        this.createdAt = dateFromISO(questionObject.createdAt);
        this.updatedAt = dateFromISO(questionObject.updatedAt);
        this.options = questionObject.options.map(optionObject => new Option(optionObject));
        this.type = new QuestionType(questionObject.type);
    }
}

class Option {
    constructor(optionObject) {
        this.id = optionObject._id;
        this.isCorrect = optionObject.is_correct;
        this.text = optionObject.text;
    }
}


class QuestionType {
    static SINGLE = new QuestionType('single_correct');
    static MULTI = new QuestionType('multi_correct');
  
    constructor(name) {
        this.name = name;
    }
}


export { 
    Exam 
}