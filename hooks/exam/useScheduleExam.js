import { useState } from "react";
import { useStoredAuthUrlParams } from "../useSaveAuthUrlParams";
import useExamRecoilActions from "../data/useExamsRecoilActions";
import useScheduledExamRecoilActions from "../data/useScheduledExamsRecoilActions";
import { ExamsClient } from "../../api/clients/scheduledTesting/ExamsClient";

const useScheduleExam = (examId) => {
    const [storedDeviceUuid, storedAuthToken] = useStoredAuthUrlParams()

    const examsClient = new ExamsClient(storedAuthToken, storedDeviceUuid);
    
    const { getExamForId, addOrUpdateExam } = useExamRecoilActions()
    const { addOrUpdateScheduledExam } = useScheduledExamRecoilActions()

    const [isAttemptingScheduling, setIsAttemptingScheduling] = useState(false)
    const [schedulingError, setSchedulingError] = useState(null)

    const attemptScheduling = () => {
        setIsAttemptingScheduling(true)
        setSchedulingError(null)
        
        examsClient.registerExam(examId)
            .then(scheduledExam => { 
                const exam = getExamForId(examId)
                if(exam) {
                    const examClone = { ...exam }
                    examClone.setScheduledExamId(scheduledExam)
                    scheduledExam.set(exam)
                    addOrUpdateExam(examClone)
                    addOrUpdateScheduledExam(scheduledExam)
                }
                setIsAttemptingScheduling(false)
            })
            .catch(error => { 
                setSchedulingError(error)
            });
    }

    const cancelSchedulingAttempt = () => setIsAttemptingScheduling(false)

    return { isAttemptingScheduling, schedulingError, attemptScheduling, cancelSchedulingAttempt };
}

export default useScheduleExam