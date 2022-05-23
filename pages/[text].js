import questions from '../questions.json';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Timer from '../components/Timer';
import { browserName, isMobile } from 'react-device-detect';

const time = 16 * 60; // setting time limit as 30 mins

export default function Home({ ip_address }) {
  const participant_id = useRouter().query.id;
  const [designElem, setDesignElem] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [enteredAnswer, setEnteredAnswer] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [stateVar, setStateVar] = useState(0);
  const [stateColor, setStateColor] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [time_2, setTime_2] = useState(time);
  const [time_3, setTime_3] = useState(time_2);
  const [colorAnswer, setColorAnswer] = useState([]);
  const [timeLeftCheck, setTimeLeftCheck] = useState(time);
  const router = useRouter();

  let submit = 0;
  let isAnswered = '';
  let nextSubmitColor = '';
  let nextSubmitText = '';
  let timeColor = '';
  let deviceType = '';
  let designNumber = 0;

  // calculate time taken to solve each question
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime_3(time_3 - 1);
    }, 1000);
    return () => clearTimeout(intervalId);
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeftCheck(timeLeftCheck - 1);
    }, 1000);
    if (timeLeftCheck <= 0) setShowScore(true);
    return () => clearTimeout(intervalId);
  }, [timeLeftCheck]);

  // next button
  const handleNext = async () => {
    if (isNaN(enteredAnswer)) {
      alert('Please type the number only');
      setEnteredAnswer('');
    } else {
      if (
        ((currentQuestion == 0) & (enteredAnswer == '4.5')) |
        (currentQuestion > 0)
      ) {
        // router.push('/disqualified');

        isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
        const nextQues = currentQuestion + 1;
        let date = new Date().toISOString();
        nextQues < questions.length && setCurrentQuestion(nextQues);
        let timeTaken = time_2 - time_3;
        setTime_2(time_3);
        let question = currentQuestion + 1;

        enteredAnswer === '' ? (isAnswered = 'No') : (isAnswered = 'Yes');
        enteredAnswer === ''
          ? setAnswered(answered)
          : setAnswered(answered + 1);

        if (stateColor == 0) {
          if (isAnswered === 'Yes')
            setColorAnswer([
              {
                currentQuestion: currentQuestion + 1,
                circleColor: 'bg-green-300',
              },
            ]);
          else
            setColorAnswer([
              {
                currentQuestion: currentQuestion + 1,
                circleColor: 'bg-red-300',
              },
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
              {
                currentQuestion: currentQuestion + 1,
                circleColor: 'bg-red-300',
              },
            ]);
        }
        // if (currentQuestion > 0) {
        let response_design = await fetch('/api/add-database', {
          method: 'GET',
        });
        let data = await response_design.json();
        // console.log(data);
        if (stateVar == 0) {
          console.log('only once');
          designNumber = parseInt(data.message);
          setStateVar(1);
          let response_design = await fetch('/api/add-database', {
            method: 'PUT',
            body: ++designNumber % 3,
          });
          --designNumber;
        } else {
          if (data.message == 0) designNumber = 2;
          else designNumber = parseInt(data.message) - 1;
        }
        setDesignElem(designNumber);
        // }

        let databaseEntry = {
          participant_id: participant_id,
          design_element: designNumber,
          ip_address: ip_address,
          questionNo: question,
          enteredAnswer: enteredAnswer,
          timeTaken: timeTaken,
          date: date,
          deviceType: deviceType,
          browser: browserName,
        };
        setEnteredAnswer('');
        console.log(databaseEntry);
        let response = await fetch('/api/add-database', {
          method: 'POST',
          body: JSON.stringify(databaseEntry),
        });
      } else {
        alert('Wrong answer! Please try again');
        setEnteredAnswer('');
      }
    }
  };

  // submit button
  const handleSubmitButton = async () => {
    isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
    let date = new Date().toISOString();
    if (window.confirm('You are about to submit the test. Want to Proceed?')) {
      submit = 1;
    } else submit = 0;

    if (submit == 1) {
      let timeTaken = time_2 - time_3;
      setTime_2(time_3);
      let question = currentQuestion + 1;

      let response_design = await fetch('/api/add-database', {
        method: 'GET',
      });
      let data = await response_design.json();
      designNumber = designElem;

      let databaseEntry = {
        participant_id: participant_id,
        design_element: designNumber,
        ip_address: ip_address,
        questionNo: question,
        enteredAnswer: enteredAnswer,
        timeTaken: timeTaken,
        date: date,
        deviceType: deviceType,
        browser: browserName,
      };
      let response = await fetch('/api/add-database', {
        method: 'POST',
        body: JSON.stringify(databaseEntry),
      });

      setShowScore(true);

      enteredAnswer === '' ? (isAnswered = 'No') : (isAnswered = 'Yes');
      enteredAnswer === '' ? setAnswered(answered) : setAnswered(answered + 1);
      setEnteredAnswer('');
    }
  };
  // const checkEnteredAnswer = (answer) => {
  //   if (currentQuestion == 0) {
  //     if (answer == '12, NE') setEnteredAnswer(answer);
  //     else router.push('/quit');
  //   }
  // };
  const runCallback = (cb) => {
    return cb();
  };

  // JSX
  return (
    <div>
      <div className="grid grid-rows-8 h-screen">
        <Head>
          <title>Online test</title>
        </Head>

        {/* <Header showScore={showScore} /> */}
        {showScore ? (
          <div className="font-serif px-10 py-7 text-2xl font-semibold row-span-1 bg-gray-100">
            Thank you for taking the test!
          </div>
        ) : (
          // first row
          <div className="grid grid-cols-8 px-10 py-5 row-span-1 bg-gray-100 ">
            <div className="col-span-5 font-serif text-2xl my-auto">
              <p>Test Your Aptitude Skill</p>
            </div>
            <div className="col-span-3 flex font-semibold justify-end text-lg my-auto">
              {(() => {
                if (timeLeftCheck <= 180) {
                  timeColor = 'text-red-500';
                } else {
                  timeColor = 'text-sky-700';
                }
              })()}
              <svg
                class="h-8 w-8 text-blue-500 "
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {' '}
                <path stroke="none" d="M0 0h24v24H0z" />{' '}
                <circle cx="12" cy="12" r="9" />{' '}
                <polyline points="12 7 12 12 15 15" />
              </svg>
              <div className={`${timeColor}  flex my-auto`}>
                &nbsp;Time left: &nbsp;
                <Timer time={time} />
              </div>
            </div>
          </div>
        )}

        {showScore ? (
          <>
            <h1 className="text-2xl font-medium font-serif text-center pt-20 underline">
              Summary of your test:
            </h1>
            <div className="text-center text-lg">
              <li>You Answered {answered} out of 9 questions</li>
              <li>Your final score is: {((answered / 9) * 100).toFixed(2)}%</li>
            </div>
            <br />
            <div className="container m-auto py-10  bg-red-100">
              <div className="text-3xl text-center font-serif">
                To complete the rest of study, please{' '}
                <a href="https://ulsurvey.uni.lu/index.php/893662?lang=en">
                  <span className="bg-blue-500 text-white p-2">
                    click on the survey
                  </span>{' '}
                  to proceed
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className=" my-auto row-span-6">
              {/* second row */}
              <div className="grid grid-rows-6 ">
                <div className="grid grid-cols-8 px-10 pt-2 row-span-1">
                  <div className="col-span-5 font-serif text-2xl  flex my-auto">
                    <svg
                      class="h-8 w-8 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    &nbsp;&nbsp;
                    <h3 className="text-lg">
                      QUESTION {currentQuestion + 1} of {questions.length}
                    </h3>
                  </div>
                  <div className="col-span-3 flex font-semibold justify-end "></div>
                </div>

                <div className=" pt-4  h-full row-span-5  ">
                  <div className="grid grid-cols-7 ">
                    <div className=" col-span-5 pl-10 ">
                      <div className="grid grid-rows-4 gap-5 border-gray-100">
                        <div className="row-span-1  bg-gray-100 p-2 flex">
                          <svg
                            class="h-8 w-8 text-blue-500  mx-4 my-auto"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            {' '}
                            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />{' '}
                            <line x1="12" y1="8" x2="12" y2="12" />{' '}
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {(() => {
                            if (currentQuestion == 0) {
                              return (
                                <div className="my-auto text-gray-500">
                                  {' '}
                                  This question is a qualifying one. You can
                                  only see next questions once you solve it
                                  correctly
                                </div>
                              );
                            } else {
                              return (
                                <div className="my-auto  text-gray-500">
                                  {' '}
                                  <span> Good going!</span> However, leaving a
                                  question unanswered decreases the chance of
                                  receiving a bonus
                                </div>
                              );
                            }
                          })()}
                        </div>
                        <div className="row-span-2 ">
                          <p className="mt-4 text-md pr-3">
                            {questions[currentQuestion].question}
                          </p>
                        </div>

                        <div className="row-span-1 my-3 text-md">
                          My Answer:&nbsp;
                          <input
                            type="text"
                            value={enteredAnswer}
                            onChange={(event) => {
                              // if (isNaN(event.target.value)) {
                              //   window.confirm('Please type the number only');
                              // }
                              setEnteredAnswer(event.target.value);
                            }}
                            className="w-48 h-12 border-blue-500 border-2 shadow-md rounded-md"
                            placeholder="Type only the number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-rows-5 col-span-2  ">
                      <div className="row-span-4 flex justify-center my-auto">
                        {(() => {
                          // if (currentQuestion > 3) {
                          //   return (
                          //     <div className="flex p-5 justify-center m-auto mt-6">
                          //       <img src="images/control.png"></img>
                          //     </div>
                          //   );
                          // } else
                          // if ((designElem == 0) & (currentQuestion >= 6)) {          // to be replaced with the below statement
                          if (currentQuestion >= 8) {
                            return (
                              <div className="  my-auto">
                                <img
                                  src="images/monitoring.png"
                                  className="m-auto"
                                />
                                <br />{' '}
                                <p className="font-serif">
                                  Your activities are now monitored
                                </p>
                              </div>
                            );
                          } else if (currentQuestion >= 7) {
                            return (
                              <div className="flex justify-center h-2/3 w-2/3  my-auto">
                                <img
                                  src="images/warning.png"
                                  className="flex justify-center h-2/3 w-2/3  my-auto"
                                ></img>
                              </div>
                            );
                          } else if (currentQuestion >= 6) {
                            return (
                              <div className="flex p-5 w-5/6 justify-center mx-auto my-auto">
                                <img src="images/honor.png"></img>
                              </div>
                            );
                            // } else if (                                            // to be replaced with the below statement
                            //   (designElem == 1) &
                            //   (currentQuestion >= 7)
                          }
                          // else if (currentQuestion > 3) {
                          //   return (
                          //     <div>
                          //       <img
                          //         src="images/user_icon.gif"
                          //         alt="monitoring"
                          //         className="h-1/2 m-auto"
                          //       />
                          //       <br />
                          //       <p className="">
                          //         Your activities are now monitored
                          //       </p>
                          //     </div>
                          //   );
                          // }
                        })()}{' '}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-4 bg-gray-100 row-span-1 my-auto">
              <div className="grid grid-cols-8 ">
                <div className="col-span-4 flex pl-4">
                  <svg
                    class="h-8 w-8 text-black my-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {' '}
                    <circle cx="12" cy="12" r="10" />{' '}
                    <line x1="15" y1="9" x2="9" y2="15" />{' '}
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  &nbsp;
                  <div className="underline my-auto">
                    {/* <Link href=""> */}
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        if (
                          window.confirm(
                            'You are about to quit the test. Want to Proceed?'
                          )
                        )
                          router.push('/quit');
                      }}
                    >
                      Quit the test
                    </a>
                    {/* </Link> */}
                  </div>
                </div>
                <div className="col-span-2 justify-end flex my-auto">
                  <img src="images/bonus.png" className="w-2/3  "></img>
                </div>
                <div className="col-span-2 justify-end flex">
                  <button
                    onClick={
                      currentQuestion + 1 === questions.length
                        ? handleSubmitButton
                        : handleNext
                    }
                    className=" px-5 py-3 bg-blue-700 hover:bg-sky-800 text-white rounded-lg shadow-2xl my-auto"
                  >
                    {currentQuestion + 1 === questions.length
                      ? 'Submit your test'
                      : 'Go to next question'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
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
