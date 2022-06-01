import questions from '../questions.json';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Timer from '../components/Timer';
import { browserName, isMobile } from 'react-device-detect';

const time = 18 * 60; // setting time limit as 30 mins

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
  // const [stopTimer, setStopTimer] = useState(false);
  // const [timerButtonText, setTimerButtonText] = useState('Stop Timer');
  const router = useRouter();

  let submit = 0;
  let isAnswered = '';
  let nextSubmitColor = '';
  let nextSubmitText = '';
  let timeColor = '';
  let timerIconColor = '';
  let infoIconColor = '';
  let bonusBorder = '';
  let deviceType = '';
  let designNumber = 0;

  // let selfControlTimer = {
  //   time: time,
  //   stopTimer: stopTimer,
  // };

  // calculate time taken to solve each question
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime_3(time_3 - 1);
    }, 1000);
    console.log(time_2, time_3);
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
    } else if ((currentQuestion == 0) & (enteredAnswer == ''))
      alert('You have to correctly answer it to proceed');
    else {
      if ((currentQuestion == 0) & (enteredAnswer != '6')) {
        alert('Wrong answer! Please try again');
        setEnteredAnswer('');
      } else {
        // router.push('/disqualified');
        isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
        const nextQues = currentQuestion + 1;
        let date = new Date().toISOString();
        nextQues < questions.length && setCurrentQuestion(nextQues);
        let timeTaken = time_2 - time_3;
        setTime_2(time_3);
        let question = currentQuestion + 1;
        console.log('reaching 1');
        enteredAnswer === '' ? (isAnswered = 'No') : (isAnswered = 'Yes');
        enteredAnswer === ''
          ? setAnswered(answered)
          : setAnswered(answered + 1);
        if (currentQuestion > 0) {
          let response_design = await fetch('/api/add-database', {
            method: 'GET',
          });
          let data = await response_design.json();
          // console.log(data);
          console.log('reaching 2');
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
        }

        console.log(enteredAnswer);
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

        console.log(enteredAnswer);
        let response = await fetch('/api/add-database', {
          method: 'POST',
          body: JSON.stringify(databaseEntry),
        });
        console.log('reaching 3');
        setEnteredAnswer('');
      }
    }
  };
  // const controlTimer = async () => {
  //   if (stopTimer === false) setTimerButtonText('Start Timer');
  //   else setTimerButtonText('Stop Timer');
  //   setStopTimer(!stopTimer);
  //   // console.log(stopTimer);
  // };

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
      <div className="h-screen grid grid-rows-8 ">
        <Head>
          <title>Online test</title>
        </Head>

        {/* <Header showScore={showScore} /> */}
        {showScore ? (
          <div className="font-serif px-10 py-7 text-2xl font-semibold row-span-1 bg-slate-100 m-auto">
            Thank you for taking the test!
          </div>
        ) : (
          // first row
          <div className="grid grid-cols-8 row-span-2 pr-10 bg-slate-100 ">
            <div className="col-span-5 font-serif text-2xl flex text-slate-700 ">
              <div className=" p-3 pl-10 pr-7 my-auto">
                <p className="">Test Your Aptitude Skill</p>
              </div>
            </div>
            <div className="col-span-3 flex font-semibold justify-end text-lg my-auto mr-24">
              {(() => {
                if (timeLeftCheck <= 300) {
                  timeColor = 'text-red-500';
                  timerIconColor = '#ef4444';
                } else {
                  timeColor = 'text-fuchsia-800';
                  timerIconColor = '#86198f';
                }
              })()}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="35"
                viewBox="0 0 18 23"
                className="my-auto"
              >
                <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                  {/* <g fill="#075985" transform="translate(-87 -209)"> */}
                  <g fill={`${timerIconColor}`} transform="translate(-87 -209)">
                    <g transform="translate(87 209.5)">
                      <path d="M12 0H6v2h6V0zM8 13h2V7H8v6zm8-6.6L17.5 5c-.5-.5-1-1-1.5-1.4L14.6 5C13.1 3.8 11.1 3 9 3c-5 0-9 4-9 9s4 9 9 9 9-4 9-9c0-2.1-.7-4.1-2-5.6zM9 19c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"></path>
                    </g>
                  </g>
                </g>
              </svg>
              <div className={`${timeColor} flex my-auto text-xl`}>
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
                <a href="http://ulsurvey.uni.lu/index.php/635786?lang=en">
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
            {/* main body */}
            <div className="row-span-5 my-auto">
              {/* second row */}
              <div className="grid grid-rows-6 ">
                <div className="grid grid-cols-8 px-10  row-span-1 ">
                  <div className="col-span-5 font-serif text-2xl flex  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      className=""
                    >
                      <path
                        fill="#"
                        d="M14.77 5.87a1 1 0 001.36-.37A1 1 0 0118 6a1 1 0 01-1 1 1 1 0 000 2 3 3 0 10-2.6-4.5 1 1 0 00.37 1.37zm4.3 7.13a1 1 0 00-1.12.86A7 7 0 0111 20H5.41l.65-.65a1 1 0 000-1.41A7 7 0 0111 6a1 1 0 000-2 9 9 0 00-7 14.61l-1.71 1.68a1 1 0 00-.21 1.09A1 1 0 003 22h8a9 9 0 008.93-7.87 1 1 0 00-.86-1.13zm-1.69-2.93a1 1 0 00-.58-.07l-.18.06-.18.09-.15.13a1 1 0 00-.21.32.84.84 0 00-.08.4 1 1 0 00.07.39 1 1 0 00.22.32A1 1 0 0017 12a1 1 0 001-1 .84.84 0 00-.08-.38 1.07 1.07 0 00-.54-.54z"
                      ></path>
                    </svg>
                    &nbsp;&nbsp;
                    <h3 className="text-xl">
                      QUESTION {currentQuestion + 1} of {questions.length}
                    </h3>
                  </div>
                </div>
                {(() => {
                  if ((timeLeftCheck <= 60) & (currentQuestion > 0)) {
                    infoIconColor = 'text-red-400';
                  } else if (
                    (time_2 - time_3 >= 120) &
                    (currentQuestion > 0) &
                    (currentQuestion < 8)
                  ) {
                    infoIconColor = 'text-amber-600';
                  } else {
                    infoIconColor = 'text-blue-500';
                  }
                })()}
                <div className="row-span-5  ">
                  <div className="grid grid-cols-7 pl-2">
                    <div className=" col-span-5 px-10 border-gray-100 border-1 shadow-md py-10">
                      <div className="grid grid-rows-4 gap-4  ">
                        <div className="row-span-1  bg-slate-100  flex ">
                          <svg
                            className={`${infoIconColor} h-8 w-8  mx-4 my-auto`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {' '}
                            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />{' '}
                            <line x1="12" y1="8" x2="12" y2="12" />{' '}
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {(() => {
                            if (currentQuestion == 0) {
                              return (
                                <div className="my-auto text-gray-500 text-sm">
                                  {' '}
                                  This question is a qualifying one. You can
                                  only see next questions once you solve it
                                  correctly
                                </div>
                              );
                            } else if (timeLeftCheck <= 60) {
                              return (
                                <div className="my-auto  text-red-400 text-sm">
                                  {' '}
                                  Last few seconds remaining
                                </div>
                              );
                            } else if (
                              (currentQuestion < 8) &
                              (time_2 - time_3 >= 120)
                            ) {
                              return (
                                <div className="my-auto  text-amber-600 text-sm">
                                  {' '}
                                  You should not spend much time on a single
                                  question
                                </div>
                              );
                            } else {
                              return (
                                <div className="my-auto  text-gray-500 text-sm">
                                  {' '}
                                  <span> Good going!</span> Please remember that
                                  you cannot go back
                                </div>
                              );
                            }
                          })()}
                        </div>
                        <div className="row-span-2 my-auto">
                          <p className="text-lg text-justify">
                            {questions[currentQuestion].question}
                          </p>
                        </div>

                        <div className="row-span-1 mt-5 text-md">
                          My Answer:&nbsp;
                          <input
                            type="text"
                            value={enteredAnswer}
                            onChange={(event) => {
                              setEnteredAnswer(event.target.value);
                            }}
                            className="w-48 h-12 border-blue-500 border-2 shadow-md rounded-md"
                            placeholder="Type only the number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid col-span-2 ">
                      <div className=" flex justify-center my-auto">
                        {(() => {
                          // if (currentQuestion > 3) {
                          //   return (
                          //     <div className="flex p-5 justify-center m-auto mt-6">
                          //       <img src="images/control.png"></img>
                          //     </div>
                          //   );
                          // } else
                          // if ((designElem == 0) & (currentQuestion >= 6)) {          // to be replaced with the below statement
                          if (
                            ((currentQuestion == 4) &
                              (time_2 - time_3 >= 7) &
                              (time_2 - time_3 <= 35)) |
                            ((currentQuestion == 6) & (time_2 - time_3 >= 10)) |
                            ((currentQuestion == 7) & (time_2 - time_3 < 6)) |
                            ((currentQuestion == 8) & (time_2 - time_3 > 4))
                          ) {
                            return (
                              <div className="">
                                <img
                                  src="images/user_1.png"
                                  className="w-24 h-30 m-auto"
                                />
                                <br />{' '}
                                <p className="font-serif">
                                  Your activities are now monitored
                                </p>
                              </div>
                            );
                          } else if (
                            (currentQuestion == 3) &
                            (time_2 - time_3 > 20)
                          ) {
                            return (
                              <div className="flex justify-center h-2/3 w-4/5  my-auto">
                                <img
                                  src="images/warning.png"
                                  className="flex justify-center h-4/5 w-4/5 shadow-sm"
                                ></img>
                              </div>
                            );
                          } else if (
                            (currentQuestion == 1) &
                            (time_2 - time_3 > 15)
                          ) {
                            return (
                              <div className="flex  w-5/6 ">
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
            <div className=" px-4 bg-slate-100 row-span-1 my-auto">
              <div className="grid grid-cols-8 ">
                <div className="col-span-4 flex pl-4 ">
                  <svg
                    className="h-8 w-8 text-black my-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                {(() => {
                  if (currentQuestion == 0) {
                    bonusBorder =
                      'border-none border-red-300 rounded-sm shadow-2xl rounded-lg';
                  } else {
                    bonusBorder = 'border-none shadow-2xl rounded-lg';
                  }
                })()}
                <div className="col-span-2 justify-end flex my-auto">
                  <img
                    src="images/bonus.png"
                    className={`${bonusBorder} w-3/4 `}
                  ></img>
                </div>
                <div className="col-span-2 justify-end flex">
                  <button
                    onClick={
                      currentQuestion + 1 === questions.length
                        ? handleSubmitButton
                        : handleNext
                    }
                    className="flex px-5 py-3 bg-blue-700 hover:bg-sky-800 text-white rounded-lg shadow-2xl my-auto"
                  >
                    {currentQuestion + 1 === questions.length
                      ? 'Submit your test'
                      : 'Go to next question'}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="#FFFFFF"
                      enableBackground="new 0 0 512 512"
                      version="1.1"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <path d="M160 115.4L180.7 96 352 256 180.7 416 160 396.7 310.5 256z"></path>
                    </svg>
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
