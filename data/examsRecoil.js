import { atom, selector, selectorFamily } from 'recoil'

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

export { 
    allKnownExamsAtom,
    upcomingExamsSelector
}