import useScheduleExam from "../hooks/exam/useScheduleExam";
import moment from "moment";
import { useEffect } from "react";
import { ExamActionState } from "../api/models/Exam";

const ExamRow = ({ exam }) => {
  const {
    isAttemptingScheduling,
    schedulingError,
    attemptScheduling,
    cancelSchedulingAttempt,
  } = useScheduleExam();


  return (
    <div>
      <div><h3>{exam.title}</h3> <h6>({exam.id})</h6></div>
      
      {exam.actionState.name === ExamActionState.names.ExamNotScheduledRegistrationIsClosing  ? <h6> {exam.actionState.associatedText }</h6> : ""}

      {isAttemptingScheduling ? (
        schedulingError ? (
          <div>
             <h6>Error: {schedulingError.errors[0].message}</h6>
             <button onClick={() => attemptScheduling(exam.id)}>
               Try again
             </button>
             <button onClick={() => cancelSchedulingAttempt()}>Cancel</button>
           </div>
            ) : (
          <h6>Trying to schedule...</h6>
          )
        ) : exam.actionState.name === ExamActionState.names.ExamNotScheduledRegistrationIsClosing ? (
          <button onClick={() => attemptScheduling(exam.id)}>REGISTER FOR EXAM</button>
        ) : exam.actionState.name === ExamActionState.names.ExamNotScheduledRegistrationOpen ? (
          <button onClick={() => attemptScheduling(exam.id)}>{ exam.actionState.associatedText }</button>
        ) : exam.actionState.name === ExamActionState.names.ExamScheduledSkipped ? (
          <h6>{ exam.actionState.associatedText }</h6>
        ) : exam.actionState.name === ExamActionState.names.ExamScheduledStartedNotFinished ? (
          <button>RESUME EXAM</button>
        ) : <button>{ exam.actionState.associatedText }</button>
      }

      <div>---------------------------------</div>

    </div>
  )
};

export default ExamRow;
