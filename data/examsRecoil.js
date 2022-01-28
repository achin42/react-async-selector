import { atom, selector } from 'recoil'

const allKnownExamsAtom = atom({
    key: 'allKnownExamsAtom', 
    default: [],
    dangerouslyAllowMutability: true 
});

const upcomingExamsSelector = selector({
    key: 'upcomingExamsSelector',
    get: ({get}) => {
        const allKnownExams = get(allKnownExamsAtom);
        const upcomingExams = allKnownExams.filter(exam => exam.isValidUpcomingExam())
        return upcomingExams
    },
    dangerouslyAllowMutability: true 
})

const upcomingScheduledExamsSelector = selector({
    key: 'upcomingScheduledExamsSelector',
    get: ({get}) => {
        const scheduledExams = get(allKnownExamsAtom);
        const upcomingScheduledExams = scheduledExams.filter(exam => exam.scheduledExam && exam.isValidUpcomingExam())
        return upcomingScheduledExams
    },
    dangerouslyAllowMutability: true 
})

const pastScheduledExamsSelector = selector({
    key: 'pastScheduledExamsSelector',
    get: ({get}) => {
        const scheduledExams = get(scheduledExamsAtom);
        const pastScheduledExams = scheduledExams.filter(exam => exam.scheduledExam && exam.scheduledExam.finishedAt !== null)
        return pastScheduledExams
    },
    dangerouslyAllowMutability: true 
})

export { 
    allKnownExamsAtom,
    upcomingExamsSelector,
    upcomingScheduledExamsSelector,
    pastScheduledExamsSelector
}