import { dateFromISO, secondsFromNow, secondsToMMSS, secondsToHHMMSS, minutesAfter, singleUnitCountdown } from '../../utils/dateUtils'

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
        // this.questions = examObject.questions.map(questionObject => new Question(questionObject));

        this.scheduledExam = null;

        // Dynamic state variables
        this.shouldShowRegistrationCloseWarning = false;
        this.registrationCloseWarningTimerText = null;
        
        this.shouldShowExamStartTimer = false;
        this.examStartTimerText = null;

        this.canExamStart = false

        this.actionState = null
    }

    setScheduledExam = (scheduledExam) => { this.scheduledExam = scheduledExam }

    isValidUpcomingExam = () => {
        if(this.scheduledExam) {
            return !this.scheduledExam.finishedAt
        } else {
            return !this.hasRegistrationClosed()
        }
    }

    shouldShow = () => !(!this.scheduledExam && !this.shouldShowRegistrationCloseWarning && secondsFromNow(this.registrationCloseTime < 0))

    

    refreshActionState = () => {
        let newActionState = null;

        if(this.scheduledExam) {
            const startDateSecondsLeft = secondsFromNow(this.startDate)
            if(!this.scheduledExam.startedAt) {
                if(startDateSecondsLeft > 5 * 60) {
                    newActionState = ExamActionState.ScheduledNotStartedNotCounting()
                } else if(startDateSecondsLeft > 0) {
                    const startDateSecondsLeft = secondsFromNow(this.startDate)
                    const associatedTimerText = secondsToMMSS(startDateSecondsLeft);
                    newActionState = ExamActionState.ScheduledNotStartedCounting(associatedTimerText);
                } else if(!this.hasExamDurationElapsed()) {
                    newActionState = ExamActionState.ScheduledNotStartedCanStart();
                } else {
                    newActionState = ExamActionState.ScheduledSkipped();
                }
            } else {
                if(!this.scheduledExam.finishedAt) {
                    const finishDate = minutesAfter(this.startDate, this.durationInMins)
                    const finishDateSecondsLeft = secondsFromNow(finishDate)
                    const associatedTimerText = secondsToHHMMSS(finishDateSecondsLeft);
                    newActionState = ExamActionState.ScheduledStartedNotFinished(associatedTimerText)
                } else {
                    newActionState = ExamActionState.ScheduledStartedFinished()
                }
            }
        } else if(this.registrationCloseTime > new Date()) {
            const registrationCloseSecondsLeft = secondsFromNow(this.registrationCloseTime)
            if(registrationCloseSecondsLeft > this.registrationCloseWarningDurationInHours * 60 * 60) {
                newActionState = ExamActionState.NotScheduledRegistrationOpen()
            } else {
                const associatedTimerText = singleUnitCountdown(Math.abs(registrationCloseSecondsLeft))
                newActionState = ExamActionState.NotScheduledRegistrationIsClosing(associatedTimerText)
            }
        } else {
            newActionState = ExamActionState.NotScheduledRegistrationClosed()
        }

        let hasChanges = !newActionState.isEqualTo(this.actionState)

        this.actionState = newActionState
        
        return hasChanges
    }

    hasRegistrationClosed = () =>  this.registrationCloseTime < new Date()

    hasExamDurationElapsed = () => minutesAfter(this.startDate, this.durationInMins) > new Date()
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


class ExamActionState {
    static names = {
        ExamScheduledNotStartedNotCounting      : 'ExamScheduledNotStartedNotCounting',
        ExamScheduledNotStartedCounting         : 'ExamScheduledNotStartedCounting',
        ExamScheduledNotStartedCanStart         : 'ExamScheduledNotStartedCanStart',
        ExamScheduledSkipped                    : 'ExamScheduledSkipped',
        ExamScheduledStartedNotFinished         : 'ExamScheduledStartedNotFinished',
        ExamScheduledStartedFinished            : 'ExamScheduledStartedFinished',
        ExamNotScheduledRegistrationOpen        : 'ExamNotScheduledRegistrationOpen',
        ExamNotScheduledRegistrationIsClosing   : 'ExamNotScheduledRegistrationIsClosing',
        ExamNotScheduledRegistrationClosed      : 'ExamNotScheduledRegistrationClosed'
    }

    static ScheduledNotStartedNotCounting      = ()            => new ExamActionState(ExamActionState.names.ExamScheduledNotStartedNotCounting   , "REGISTERED");
    static ScheduledNotStartedCounting         = (timerText)   => new ExamActionState(ExamActionState.names.ExamScheduledNotStartedCounting      , `STARTING IN ${timerText}`);
    static ScheduledNotStartedCanStart         = ()            => new ExamActionState(ExamActionState.names.ExamScheduledNotStartedCanStart      , `START EXAM`);
    static ScheduledSkipped                    = ()            => new ExamActionState(ExamActionState.names.ExamScheduledSkipped                 , `SKIPPED`);
    static ScheduledStartedNotFinished         = (timerText)   => new ExamActionState(ExamActionState.names.ExamScheduledStartedNotFinished      , timerText);
    static ScheduledStartedFinished            = ()            => new ExamActionState(ExamActionState.names.ExamScheduledStartedFinished         , "VIEW EXAM SUMMARY");
    static NotScheduledRegistrationOpen        = ()            => new ExamActionState(ExamActionState.names.ExamNotScheduledRegistrationOpen     , "REGISTER FOR EXAM");
    static NotScheduledRegistrationIsClosing   = (timerText)   => new ExamActionState(ExamActionState.names.ExamNotScheduledRegistrationIsClosing, `Registration ends in ${timerText}`);
    static NotScheduledRegistrationClosed      = ()            => new ExamActionState(ExamActionState.names.ExamNotScheduledRegistrationClosed   , "REGISTRATION CLOSED");

    constructor(name, text) {
        this.name = name
        this.associatedText = text
    }

    isEqualTo(state) {
        if(state != null && this.name == state.name) {
            if((this.associatedText != null || state.associatedText != null) && this.associatedText !== state.associatedText) return false
            return true
        }
        return false
    }
}


export { 
    Exam,
    ExamActionState
}