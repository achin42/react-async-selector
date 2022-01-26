import { useState } from "react";
import { useStoredAuthUrlParams } from "../useSaveAuthUrlParams";
import { useRecoilState } from "recoil";
import ULessonClient from "../../api/clients/ulesson/uLessonClient";
import { lessonsForExamAtoms } from "../../data/uLessonRecoil";

const useGetLessons = (exam) => {
    const [storedDeviceUuid, storedAuthToken] = useStoredAuthUrlParams()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [lessons, setLessons] = useRecoilState(lessonsForExamAtoms(exam.id))

    if(!lessons) {
        if(exam.lessonIds.length == 0) setLessons([])
        else loadLessons()
    }

    const loadLessons = () => {
        setIsLoading(true)
        setError(null)

        const uLessonClient = new ULessonClient(storedAuthToken, storedDeviceUuid);
        
        uLessonClient.getLessonsForIds(exam.lessonIds)
            .then(lessons => {
                setLessons(lessons)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error)
                setIsLoading(false)
            })
    }

    return { 
        lessons,
        isLoadingLessons: isLoading,
        lessonsLoadingError: error,
        retryLoadingLessons: loadLessons
    }
}

export default useGetLessons
