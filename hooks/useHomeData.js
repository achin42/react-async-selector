import { useEffect, useState } from "react";
import { useSaveAuthUrlParams } from "./useSaveAuthUrlParams";
import { ExamsClient } from '../api/clients/scheduledTesting/ExamsClient'
import { ScheduledExamsClient } from '../api/clients/scheduledTesting/ScheduledExamsClient'
import { useStopwatch } from 'react-timer-hook'
import { allKnownExamsAtom, upcomingExamsSelector } from '../data/examsRecoil'
import { scheduledExamsAtom } from '../data/scheduledExamsRecoil'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { addOrUpdateExamsList } from '../utils/listUtils'

import { minutesBeforeNow } from '../utils/dateUtils'

const useHomeData = () => {
    // Persistent state
    const [storedDeviceUuid, storedAuthToken] = useSaveAuthUrlParams()

    // Local state
    const { seconds } = useStopwatch({ autoStart: true });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Global state
    const [allKnownExams, setAllKnownExams] = useRecoilState(allKnownExamsAtom);
    const upcomingExams = useRecoilValue(upcomingExamsSelector);
    const setScheduledExams = useSetRecoilState(scheduledExamsAtom);




    // Effects

    useEffect(() => {
        if(storedDeviceUuid && storedAuthToken) { fetchExamsData() }
    }, [storedDeviceUuid]);

    useEffect(() => {
        if(!isLoading && allKnownExams && allKnownExams.length > 0) {  refreshDynamicStatesOfExams() }
    }, [seconds])





    // Actions

    const fetchExamsData = async () => {
        const examsClient = new ExamsClient(storedAuthToken, storedDeviceUuid);
        const scheduledExamsClient = new ScheduledExamsClient(storedAuthToken, storedDeviceUuid);
    
        setError(null);
        if(upcomingExams.length == 0) setIsLoading(true)
    
        const { newExams, examsError } = await examsClient.getUpcomingPublishedExams();

        if (examsError) {
            setError(examsError)
            setIsLoading(false)
            return
        }
    
        const { newScheduledExams, scheduledExamsError } = await scheduledExamsClient.getScheduledExams("all")
    
        if(scheduledExamsError) {
            setError(scheduledExamsError)
            setIsLoading(false)
            return
        }

        setScheduledExams(newScheduledExams)

        // SHOULD REMOVE AFTER TESTING
        seedForTest(newExams);

        const enrichedNewExams = newExams.map(exam => { 
            exam.setScheduledExamId(newScheduledExams.find(scheduledExam => scheduledExam.examId === exam.id)) 
            exam.refreshDynamicState()
            return exam;
        })

        const mergedAllKnownExams = addOrUpdateExamsList([...allKnownExams], enrichedNewExams)

        setAllKnownExams(mergedAllKnownExams)
        setIsLoading(false)
    }





    // Private actions

    const refreshDynamicStatesOfExams = () => {
        let refreshedExams = [];
        allKnownExams.forEach(exam => { 
            if(exam.refreshDynamicState()) refreshedExams.push(exam)
        })

        refreshedExams.forEach(refreshedExam => {
            setAllKnownExams(allKnownExams.map(exam => { return ( exam.id === refreshedExam.id ?  refreshedExam : exam ) } ))
        })
    }

    const seedForTest = (newExams) => {
        newExams[1].registrationCloseTime = minutesBeforeNow(118)
        newExams[1].registrationCloseWarningDurationInHours = 2
    }



    return { isLoading, exams: upcomingExams, error, refetch: fetchExamsData };
};

export default useHomeData;