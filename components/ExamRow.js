import useScheduleExam from "../hooks/exam/useScheduleExam";
import moment from "moment";
import { useEffect } from "react";

const ExamRow = ({ exam }) => {
  const {
    isAttemptingScheduling,
    schedulingError,
    attemptScheduling,
    cancelSchedulingAttempt,
  } = useScheduleExam();


  useEffect(() => {
    console.log("isAttemptingScheduling")
    console.log(isAttemptingScheduling)
    console.log("schedulingError")
    console.log(schedulingError)
    // console.log(error)
  }, [isAttemptingScheduling, schedulingError]);


  return (
    <div>
      <h5>{exam.title}</h5>
      <h6>{exam.id}</h6>
      <h6>{moment(exam.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL)}</h6>
      <h6>{moment(exam.registrationCloseTime).format(moment.HTML5_FMT.DATETIME_LOCAL)}</h6>
      <h6>
        {exam.shouldShowRegistrationCloseWarning
          ? "Registration closing"
          : "Registration not closing"}
      </h6>

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
      ) : exam.scheduledExamId ? (
        <h6>Exam is scheduled</h6>
      ) : exam.hasRegistrationClosed() ? (
        <h6>Registration is closed</h6>
      ) : (
        <button onClick={() => attemptScheduling(exam.id)}>Register</button>
      )}

      <div>---------------------------</div>
    </div>
  );
};

export default ExamRow;
