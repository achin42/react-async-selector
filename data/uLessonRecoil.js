import { atomFamily } from "recoil";

const lessonsForExamAtoms = atomFamily({
    key: 'lessonsForExamAtoms',
    default: null,
});


const liveLessonsForExamAtoms = atomFamily({
    key: 'liveLessonsForExamAtoms',
    default: null,
});


export {
    lessonsForExamAtoms,
    liveLessonsForExamAtoms
}