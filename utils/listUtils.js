

const addOrUpdateExamsList = (masterExams, updateExams) => {
    let matchingIds = []
    let updatedMasterExams = masterExams.map(masterExam => {
        for (const updateExam of updateExams) {
            if(masterExam.id === updateExam.id) {
                matchingIds.push(updateExam.id)
                return updateExam
            }
        }    
        return masterExam
    })
    updateExams.filter(updateExam => !matchingIds.includes(updateExam.id)).forEach(updateExam => updatedMasterExams.push(updateExam))
    return updatedMasterExams
}

export { addOrUpdateExamsList }