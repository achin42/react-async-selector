import Head from 'next/head'
import { useEffect } from "react";
import useHomeData from '../hooks/useHomeData'
import { Puff } from 'react-loading-icons'

export default function Home() {
  
  const { isLoading, exams, error, refetch } = useHomeData()

  useEffect(() => {
      console.log(exams)
      // console.log(error)
  }, [isLoading, exams, error]);

  return (
    <div>
      <Head>
        <title>Web Dev News</title>
        <meta name='keywords' content='web development, programming'></meta>
      </Head>
      
      {
        isLoading 
        ? <Puff stroke="#D66F5B" height={100} width={100} strokeWidth={1} speed={1.2}/>
        : exams ? <ExamsList exams = { exams } /> : <h3>There is an error</h3>
      }

    </div>
  )
}

const ExamsList = ({ exams }) => {
    return (
        <div>
            { exams.map( exam => <ExamRow exam = {exam} key={exam.id} /> ) }
        </div>
    ) 
}

const ExamRow = ({ exam }) => {
    // console.log("rerendering " + exam.title)
    return (
        <div>
            <h5>{ exam.title }</h5>
            <h6>{ exam.description }</h6>
            <h6>{ exam.scheduledExamId ? "Is scheduled" : "Is not scheduled" }</h6>
            <h6>{ exam.shouldShowRegistrationCloseWarning ? "Registration closing" : "Registration not closing" }</h6>
            <div>---------------------------</div>
        </div>
    )
}

// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
//   const articles = await res.json()

//   return {
//     props: {
//       articles
//     }
//   }
// }