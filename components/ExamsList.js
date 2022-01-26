import ExamRow from "./ExamRow";

const ExamsList = ({ exams }) => {
  return (
    <div>
      {exams.map((exam) => (
        <ExamRow exam={exam} key={exam.id} />
      ))}
    </div>
  );
};

export default ExamsList;
