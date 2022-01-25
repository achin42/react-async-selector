

class Lesson {
    constructor(lessonObject) {
        this.id = lessonObject.id;
        this.name = lessonObject.name;
        this.description = lessonObject.description;
        this.contentCode = lessonObject.content_code;
        this.isFreebie = lessonObject.freebie;
        this.position = lessonObject.position;
        this.shouldShowInteractiveQuiz = lessonObject.show_interactive_quiz;
        this.isRecommended = lessonObject.recommended;
        this.iconThumbnail = lessonObject.icon_thumb;
        this.coverThumbnail = lessonObject.cover_thumb;
        this.trivia = lessonObject.trivia;
        this.freeVideoUrl = lessonObject.free_video_url;
        this.videoZipUrl = lessonObject.video_zip;
        this.mpdFileUrl = lessonObject.mpd_file;
        this.onlineMpdFilePath = lessonObject.online_mpd_file_path;
        this.drmAssetId = lessonObject.drm_asset_id;
    }
}

module.exports = { Lesson }