

import { allKnownExamsAtom } from '../data/examsRecoil'
import { useRecoilState } from 'recoil'

const useExamRecoilActions = () => {
    const [allKnownExams, setAllKnownExams] = useRecoilState(allKnownExamsAtom);

    const getExamForId = (examId) => allKnownExams.find(exam => exam.id === examId)

    const addOrUpdateExam = (exam) => {
        let hasFound = false
        let allKnownExamsClone = allKnownExams.map(e => {
            if(e.id === exam.id) {
                hasFound = true
                return exam
            } else return e
        })
        if(hasFound) allKnownExamsClone.push(exam)
        setAllKnownExams(allKnownExamsClone)
    }

    return { getExamForId: getExamForId, addOrUpdateExam: addOrUpdateExam }
}

export default useExamRecoilActions;