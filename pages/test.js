import questions from '../questions.json';
import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';
import Timer from '../components/Timer';
import Header from '../components/Header';
import axios from 'axios';
import { browserName, isMobile } from 'react-device-detect';

const time = 90 * 60; // setting time limit as 1.5 hours
// export const ApplicationContext = createContext();
export default function Home({ ip_address }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [enteredAnswer, setEnteredAnswer] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [databaseEntry, setDatabaseEntry] = useState([]);
  const [stateVar, setStateVar] = useState(0);
  const [stateColor, setStateColor] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [time_2, setTime_2] = useState(time);
  const [time_3, setTime_3] = useState(time_2);
  const [colorAnswer, setColorAnswer] = useState([]);
  const [cheerMessage, setCheerMessage] = useState('');
  const [timeLeftCheck, setTimeLeftCheck] = useState(time);
  const router = useRouter();

  let submit = 0;
  let isAnswered = '';
  let nextSubmitColor = '';
  let nextSubmitText = '';
  let deviceType = '';

  // const palette = {
  //   currentQuestion: currentQuestion,
  //   totalQuestion: questions.length,
  //   isAnswered: isAnswered,
  // };

  // calculate time taken to solve each question
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime_3(time_3 - 1);
    }, 1000);
    return () => clearTimeout(intervalId);
  });

  // user input added to the database
  useEffect(async () => {
    if (stateVar == 1) {
      let response = await fetch('/api/add-database', {
        method: 'POST',
        body: JSON.stringify(databaseEntry),
      });
      setStateVar(stateVar - 1);
    }
  }, [databaseEntry]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeftCheck(timeLeftCheck - 1);
    }, 1000);
    if (timeLeftCheck <= 0) setShowScore(true);
    return () => clearTimeout(intervalId);
  }, [timeLeftCheck]);

  // next button
  const handleNext = () => {
    isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
    const nextQues = currentQuestion + 1;
    let date = new Date().toISOString();
    nextQues < questions.length && setCurrentQuestion(nextQues);
    let timeTaken = time_2 - time_3;
    setTime_2(time_3);
    let question = currentQuestion + 1;

    enteredAnswer === '' ? (isAnswered = 'No') : (isAnswered = 'Yes');
    enteredAnswer === '' ? setAnswered(answered) : setAnswered(answered + 1);
    setCheerMessage(isAnswered);
    if (stateColor == 0) {
      if (isAnswered === 'Yes')
        setColorAnswer([
          { currentQuestion: currentQuestion + 1, circleColor: 'bg-green-300' },
        ]);
      else
        setColorAnswer([
          { currentQuestion: currentQuestion + 1, circleColor: 'bg-red-300' },
        ]);

      setStateColor(stateColor + 1);
    } else {
      if (isAnswered === 'Yes')
        setColorAnswer([
          ...colorAnswer,
          {
            currentQuestion: currentQuestion + 1,
            circleColor: 'bg-green-300',
          },
        ]);
      else
        setColorAnswer([
          ...colorAnswer,
          { currentQuestion: currentQuestion + 1, circleColor: 'bg-red-300' },
        ]);
    }
    setDatabaseEntry([
      {
        ip_address,
        question,
        enteredAnswer,
        timeTaken,
        date,
        deviceType,
        browserName,
      },
    ]);
    setStateVar(stateVar + 1);
    setEnteredAnswer('');
  };

  // submit button
  const handleSubmitButton = () => {
    isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
    let date = new Date().toISOString();
    if (window.confirm('You are about to submit the test. Want to Proceed?')) {
      submit = 1;
    } else submit = 0;

    if (submit == 1) {
      setStateVar(1);
      let timeTaken = time_2 - time_3;
      setTime_2(time_3);
      let question = currentQuestion + 1;

      setDatabaseEntry([
        {
          ip_address,
          question,
          enteredAnswer,
          timeTaken,
          date,
          deviceType,
          browserName,
        },
      ]);
      setShowScore(true);

      enteredAnswer === '' ? (isAnswered = 'No') : (isAnswered = 'Yes');
      enteredAnswer === '' ? setAnswered(answered) : setAnswered(answered + 1);
      setCheerMessage(isAnswered);
      setEnteredAnswer('');
    }
  };

  const runCallback = (cb) => {
    return cb();
  };

  // JSX
  return (
    <div>
      <Head>
        <title>Online test</title>
      </Head>

      <Header showScore={showScore} />
      {showScore ? (
        <>
          <h1 className="text-3xl font-medium text-center py-20">
            <ul>
              <li>You Answered {answered} out of 15 questions</li>
              <li>Nice Attempt!</li>
              <li></li>
              <li className="py-20">
                Your final score is: {((answered / 15) * 100).toFixed(3)}%
              </li>
            </ul>
            <br />
          </h1>
          <div className="container m-auto py-10  bg-red-100">
            <div className="text-3xl text-center">
              You have completed the test. You may close the window now.
            </div>
          </div>
        </>
      ) : (
        <div className="container py-8 mx-auto h-full">
          <div className="grid grid-cols-7 gap-3">
            <div className="bg-blue-200 rounded-lg shadow-md">
              <div className=" flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 py-24">
                  {runCallback(() => {
                    const row = [];
                    colorAnswer.map((colorAnswer) =>
                      row.push(
                        <div
                          className={`${colorAnswer.circleColor} text-blue-700 text-center p-2 rounded-full`}
                          key={colorAnswer.currentQuestion}
                        >
                          {colorAnswer.currentQuestion}
                        </div>
                      )
                    );
                    for (var i = currentQuestion + 1; i <= 15; i++) {
                      row.push(
                        <div
                          className="bg-blue-100 text-blue-700  text-center p-2 rounded-full"
                          key={i}
                        >
                          {i}
                        </div>
                      );
                    }
                    return row;
                  })}
                </div>

                {/* <ApplicationContext.Provider
                  value={{ togglePalette, setTogglePalette }}
                > */}
                {/* <QuestionPalette palette={palette} /> */}
                {/* </ApplicationContext.Provider> */}
              </div>
            </div>

            <div className=" shadow-md col-span-4 p-3">
              <div className="grid grid-rows-3">
                <div className="row-span-2">
                  <h4 className="mt-5 text-xl">
                    Question {currentQuestion + 1} of {questions.length}
                  </h4>
                  <br />
                  <p className="mt-4 py-3 text-lg">
                    {questions[currentQuestion].question}
                  </p>
                </div>
                <div>
                  <input
                    type="text "
                    value={enteredAnswer}
                    onChange={(event) => setEnteredAnswer(event.target.value)}
                    className=" w-25 h-10 border-2 border-gray shadow-md"
                    placeholder="Type your answer"
                  />

                  <div className="flex justify-between mt-5">
                    {(() => {
                      if (currentQuestion + 1 === questions.length) {
                        nextSubmitColor = 'bg-green-500';
                        nextSubmitText = 'text-white';
                      } else {
                        nextSubmitColor = 'bg-indigo-500';
                        nextSubmitText = 'text-white';
                      }
                    })()}
                    <button
                      onClick={
                        currentQuestion + 1 === questions.length
                          ? handleSubmitButton
                          : handleNext
                      }
                      className={`w-20 my-6 p-3 ${nextSubmitColor} ${nextSubmitText} rounded-lg shadow-xl`}
                    >
                      {currentQuestion + 1 === questions.length
                        ? 'Submit'
                        : 'Next'}
                    </button>
                    <div>
                      {(() => {
                        if (currentQuestion + 1 < questions.length) {
                          return (
                            <>
                              <button
                                className="w-20 my-6 p-3 bg-green-500 text-white rounded-lg shadow-xl ml-4"
                                onClick={handleSubmitButton}
                              >
                                Submit
                              </button>

                              <button
                                className="w-20 my-6 p-3 bg-gray-500 text-white rounded-lg shadow-xl ml-4"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      'You are about to quit the test. Want to Proceed?'
                                    )
                                  )
                                    router.push('/quit');
                                }}
                              >
                                Quit
                              </button>
                            </>
                          );
                        }
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-rows-5 col-span-2 justify-items-center shadow-md">
              <div className="w-full bg-red-400 p-5 rounded-2xl">
                <div className="text-center text-white">
                  <strong> Time left </strong>
                  <Timer time={time} />
                </div>
              </div>
              <div className="row-span-4 my-20">
                <div>
                  {(() => {
                    if (currentQuestion > 9) {
                      return (
                        <div>
                          <img
                            src="images/monitoring.gif"
                            alt="monitoring"
                            className="h-3/5 w-3/5 mx-auto"
                            on
                          />
                        </div>
                      );
                    } else if (currentQuestion > 4) {
                      return (
                        <div>
                          <img
                            src="images/warning.png"
                            alt="warning"
                            className=""
                            ß
                          />
                        </div>
                      );
                    } else if (cheerMessage === 'No') {
                      return (
                        <div className="p-8 shadow-sm">
                          <br />
                          <h3 className="text-red-500 text-lg">
                            Leaving a question unanswered decreases the chance
                            of receiving bonus!
                          </h3>
                          <br />
                          <span>
                            You have enough time to solve each question.
                          </span>
                          <strong className="text-xl">Try harder!!</strong>
                        </div>
                      );
                    } else {
                      return (
                        <div className="p-10 text-sm shadow-sm">
                          <br />
                          <ul>
                            <li>
                              1. The questions are of moderate to difficult
                              level
                            </li>
                            <br />
                            <li>
                              2. You have enough time to answer each question
                            </li>
                            <br />
                            <li>3. You cannot go back to previous questions</li>
                          </ul>
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  // console.log(req.headers);
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  // console.log(JSON.stringify(ip));
  // console.log(ip);

  // const res = await axios.get('https://geolocation-db.com/json');
  // const ip = res.data.IPv4;
  const ip_segments = ip.split('.');
  let ip_segments_int = ip_segments.map((item) => parseInt(item, 10));

  // transforming IP addresses
  ip_segments_int[0] = ip_segments_int[0] * Math.pow(2, 2) + 5 * 5;
  ip_segments_int[1] = ip_segments_int[1] * Math.pow(3, 3) + 4 * 4;
  ip_segments_int[2] = ip_segments_int[2] * Math.pow(4, 4) + 3 * 3;
  ip_segments_int[3] = ip_segments_int[3] * Math.pow(5, 5) + 2 * 2;
  const ip_address = ip_segments_int.join('.').toString();

  return {
    props: {
      ip_address,
    }, // will be passed to the page component as props
  };
}
