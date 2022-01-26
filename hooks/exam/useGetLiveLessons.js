import { useState } from "react";
import { useStoredAuthUrlParams } from "../useSaveAuthUrlParams";
import { useRecoilState } from "recoil";
import ULessonClient from "../../api/clients/ulesson/uLessonClient";
import { liveLessonsForExamAtoms } from "../../data/uLessonRecoil";

const useGetLiveLessons = (exam) => {
    const [storedDeviceUuid, storedAuthToken] = useStoredAuthUrlParams()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [liveLessons, setLiveLessons] = useRecoilState(liveLessonsForExamAtoms(exam.id))

    if(!liveLessons) {
        if(exam.liveLessonIds.length == 0) setLiveLessons([])
        else loadLiveLessons()
    }

    const loadLiveLessons = () => {
        setIsLoading(true)
        setError(null)

        const uLessonClient = new ULessonClient(storedAuthToken, storedDeviceUuid);
        
        uLessonClient.getLiveLessonsForIds(exam.liveLessonIds)
            .then(liveLessons => {
                setLiveLessons(liveLessons)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error)
                setIsLoading(false)
            })
    }

    return { 
        liveLessons,
        isLoadingLiveLessons: isLoading,
        liveLessonsLoadingError: error,
        retryLoadingLiveLessons: loadLiveLessons
    }
}

export default useGetLiveLessons
