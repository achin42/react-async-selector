import { useEffect, useState } from "react";
import { useSaveAuthUrlParams } from "./useSaveAuthUrlParams";
import { ExamsClient } from '../api/clients/scheduledTesting/ExamsClient'
import { ScheduledExamsClient } from '../api/clients/scheduledTesting/ScheduledExamsClient'
import { useStopwatch } from 'react-timer-hook'
import { allKnownExamsAtom, upcomingExamsSelector } from '../data/examsRecoil'
import { useRecoilState, useRecoilValue } from 'recoil'
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




    // Effects

    useEffect(() => {
        if(storedDeviceUuid && storedAuthToken) { fetchExamsData() }
    }, [storedDeviceUuid]);

    useEffect(() => {
        if(!isLoading && allKnownExams && allKnownExams.length > 0) {  refreshActionStatesOfExams() }
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
        
        // SHOULD REMOVE AFTER TESTING
        // seedForTest(newExams);


        const allNewExams = addOrUpdateExamsList(newExams, newScheduledExams)
        const refreshedNewExams = allNewExams.map(exam => {
            exam.refreshActionState()
            return exam
        })

        const mergedAllKnownExams = addOrUpdateExamsList([...allKnownExams], refreshedNewExams)

        setAllKnownExams(mergedAllKnownExams)

        setIsLoading(false)
    }





    // Private actions

    const refreshActionStatesOfExams = () => {
        let refreshedExams = [];
        allKnownExams.forEach(exam => { if(exam.refreshActionState()) refreshedExams.push(exam) })

        if(refreshedExams.length > 0) {
            let mergedAllKnownExams = addOrUpdateExamsList([...allKnownExams], refreshedExams)
            setAllKnownExams(mergedAllKnownExams)
        }
    }

    const seedForTest = (newExams) => {
        newExams[0].registrationCloseTime = minutesBeforeNow(118)
        newExams[0].registrationCloseWarningDurationInHours = 2
    }



    return { isLoading, upcomingExams, error, refetch: fetchExamsData };
};

export default useHomeData;