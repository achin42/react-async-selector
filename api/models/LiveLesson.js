import { dateFromISO } from '../../utils/dateUtils'

class LiveLesson {
    constructor(liveLessonObject) {
        this.id = liveLessonObject.id;
        this.uuid = liveLessonObject.uuid;
        this.topic = liveLessonObject.topic;
        this.description = liveLessonObject.description;
        this.isRegistered = liveLessonObject.registered;
        this.subjectId = liveLessonObject.subject.id;
        this.subjectName = liveLessonObject.subject.name;
        this.startAt = dateFromISO(liveLessonObject.start_at);
        this.endAt = dateFromISO(liveLessonObject.end_at);
        this.broadcastStartAt = dateFromISO(liveLessonObject.broadcast_start_at);
        this.bannerImageUrl = liveLessonObject.banner;
        this.promotionalBannerImageDesktopUrl = liveLessonObject.promotional_banner_web;
        this.promotionalBannerImageMobileUrl = liveLessonObject.promotional_banner_mobile;
        this.status = new LiveLessonStatus(liveLessonObject.status);
        this.tutor = new Tutor(liveLessonObject.tutor);
    }
}

class Tutor {
    constructor(tutorObject) {
        this.id = tutorObject.id;
        this.uuid = tutorObject.uuid;
        this.firstName = tutorObject.firstname;
        this.lastName = tutorObject.lastname;
        this.email = tutorObject.email;
        this.mobile = tutorObject.mobile;
        this.bio = tutorObject.bio;
        this.university = tutorObject.university;
        this.degree = tutorObject.degree;
        this.expertise = tutorObject.expertise;
        this.avatarImageUrl = tutorObject.avatar;
        this.avatarThumbnailUrl = tutorObject.avatar_thumb;
    }

    displayName = () => this.lastName + " " + this.firstName;
}

class LiveLessonStatus {
    static LIVE = new LiveLessonStatus('LIVE');
    static UPCOMING = new LiveLessonStatus('UPCOMING');
    static REPLAY = new LiveLessonStatus('REPLAY');
  
    constructor(name) {
        this.name = name;
    }
}

module.exports = {
    LiveLesson,
    Tutor,
    LiveLessonStatus
}