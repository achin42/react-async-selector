import { useState } from "react";
import { useStoredAuthUrlParams } from "../useSaveAuthUrlParams";
import useExamRecoilActions from "../data/useExamsRecoilActions";
import { ExamsClient } from "../../api/clients/scheduledTesting/ExamsClient";

const useScheduleExam = (examId) => {
    const [storedDeviceUuid, storedAuthToken] = useStoredAuthUrlParams()

    const examsClient = new ExamsClient(storedAuthToken, storedDeviceUuid);
    
    const { getExamForId, addOrUpdateExam } = useExamRecoilActions()

    const [isAttemptingScheduling, setIsAttemptingScheduling] = useState(false)
    const [schedulingError, setSchedulingError] = useState(null)

    const attemptScheduling = (examId) => {
        setIsAttemptingScheduling(true)
        setSchedulingError(null)
        
        examsClient.registerExam(examId)
            .then(scheduledExam => { 
                setIsAttemptingScheduling(false)

                const exam = getExamForId(examId)
                if(exam) {
                    const examClone = { ...exam }
                    examClone.setScheduledExam(scheduledExam)
                    addOrUpdateExam(examClone)
                }
            })
            .catch(error => { 
                setSchedulingError(error)
            });
    }

    const cancelSchedulingAttempt = () => setIsAttemptingScheduling(false)

    return { isAttemptingScheduling, schedulingError, attemptScheduling, cancelSchedulingAttempt };
}

export default useScheduleExam