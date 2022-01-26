import Head from 'next/head'
import { useEffect } from "react";
import useHomeData from '../hooks/useHomeData'
import { Puff } from 'react-loading-icons'
import ExamsList from '../components/ExamsList';

export default function Home() {
  
  const { isLoading, upcomingExams, error, refetch } = useHomeData()

  useEffect(() => {
      console.log(upcomingExams)
      // console.log(error)
  }, [isLoading, upcomingExams, error]);

  return (
    <div>
      <Head>
        <title>Web Dev News</title>
        <meta name='keywords' content='web development, programming'></meta>
      </Head>
      
      {
          isLoading ? <Puff stroke="#D66F5B" height={100} width={100} strokeWidth={1} speed={1.2}/>
          : error ? <h3>Error: { error.errors[0].message }</h3> 
          : upcomingExams && upcomingExams.length > 0 ? <ExamsList exams = { upcomingExams } /> 
          : 
          <div>
              <p>No results found</p>
              <button onClick={() => refetch }>Refresh</button>
          </div>
      }

    </div>
  )
}