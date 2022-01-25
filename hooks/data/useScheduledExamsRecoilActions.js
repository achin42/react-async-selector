

import { scheduledExamsAtom } from '../../data/scheduledExamsRecoil';
import { useRecoilState } from 'recoil'

const useScheduledExamRecoilActions = () => {
    const [scheduledExams, setScheduledExams] = useRecoilState(scheduledExamsAtom);

    const getScheduledExamForId = (id) => scheduledExams.find(exam => exam.id === id)

    const addOrUpdateScheduledExam = (scheduledExam) => {
        let hasFound = false
        let scheduledExamsClone = scheduledExams.map(e => {
            if(e.id === scheduledExam.id) {
                hasFound = true
                return scheduledExam
            } else return e
        })
        if(hasFound) scheduledExamsClone.push(scheduledExam)
        setScheduledExams(scheduledExamsClone)
    }

    return { getScheduledExamForId: getScheduledExamForId, addOrUpdateScheduledExam: addOrUpdateScheduledExam }
}

export default useScheduledExamRecoilActions;