import { atom, selector } from 'recoil'

const scheduledExamsAtom = atom({
    key: 'scheduledExamsAtom', 
    default: [],
});

const upcomingScheduledExamsSelector = selector({
    key: 'upcomingScheduledExamsSelector',
    get: ({get}) => {
        const scheduledExams = get(scheduledExamsAtom);
        const upcomingScheduledExams = scheduledExams.filter(scheduledExam => scheduledExam.exam.isValidUpcomingExam())
        return upcomingScheduledExams
    },
    dangerouslyAllowMutability: true 
})

const pastScheduledExamsSelector = selector({
    key: 'pastScheduledExamsSelector',
    get: ({get}) => {
        const scheduledExams = get(scheduledExamsAtom);
        const pastScheduledExams = scheduledExams.filter(scheduledExam => scheduledExam.finishedAt !== null)
        return pastScheduledExams
    },
    dangerouslyAllowMutability: true 
})

export { scheduledExamsAtom, upcomingScheduledExamsSelector, pastScheduledExamsSelector }