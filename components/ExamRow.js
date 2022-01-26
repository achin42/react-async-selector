import useScheduleExam from "../hooks/exam/useScheduleExam";

const ExamRow = ({ exam }) => {
  const {
    isAttemptingScheduling,
    schedulingError,
    attemptScheduling,
    cancelSchedulingAttempt,
  } = useScheduleExam();

  return (
    <div>
      <h5>{exam.title}</h5>
      <h6>{exam.description}</h6>
      <h6>
        {exam.shouldShowRegistrationCloseWarning
          ? "Registration closing"
          : "Registration not closing"}
      </h6>

      {isAttemptingScheduling ? (
        schedulingError ? (
          <div>
            <h4>Error: {schedulingError.errors[0].message}</h4>
            <button onClick={() => attemptScheduling(exam.id)}>
              Try again
            </button>
            <button onClick={() => cancelSchedulingAttempt()}>Cancel</button>
          </div>
        ) : (
          <p>Trying to schedule...</p>
        )
      ) : exam.scheduledExamId ? (
        <p>Exam is scheduled</p>
      ) : (
        <button onClick={() => attemptScheduling(exam.id)}>Register</button>
      )}

      <div>---------------------------</div>
    </div>
  );
};

export default ExamRow;
