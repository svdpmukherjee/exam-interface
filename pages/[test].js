import questions from '../questions.json';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Timer from '../components/Timer';
import { browserName, isMobile } from 'react-device-detect';

const time = 10 * 60; // setting time limit as 30 mins

export default function Home(props) {
  const { ip_address_1, ip_address_2 } = props;
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
  const [timeLeftCheck, setTimeLeftCheck] = useState(time);
  const [savedAnswer, setSavedAnswer] = useState([]);
  const correctAnswer = [143, 62, 678, 1667, 42];
  const [completionCode, setcompletionCode] = useState('');
  const [blurScore, setBlurScore] = useState(1);
  const [finalPulse, setFinalPulse] = useState(0);

  // const [stopTimer, setStopTimer] = useState(false);
  // const [timerButtonText, setTimerButtonText] = useState('Stop Timer');
  const router = useRouter();

  let submit = 0;
  let isAnswered = '';

  let timeColor = '';

  let timerIconColor = '';
  let infoIconColor = '';
  let bonusBorder = '';
  let deviceType = '';
  let designNumber = 0;
  let link = '';
  let answerWritten = '';
  let blurStatus = '';
  let correct = 0;

  // calculate time taken to solve each question
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime_3(time_3 - 1);
    }, 1000);
    // console.log(time_2, time_3);
    return () => clearTimeout(intervalId);
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeftCheck(timeLeftCheck - 1);
    }, 1000);
    if (timeLeftCheck <= 0) setShowScore(true);
    return () => clearTimeout(intervalId);
  }, [timeLeftCheck]);

  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      if (completionCode == '') {
        console.log(completionCode);
        response_design = fetch('/api/add-database', {
          method: 'PUT',
          body: designElem,
        });
      }
    });
  });

  const checkCompletionCode = async () => {
    if (completionCode == '') {
      alert('Please enter the Completion Code');
    } else if (completionCode != '7104E4BD') {
      alert('Please enter the correct completion code');
      setcompletionCode('');
    } else {
      setBlurScore(0);
      setFinalPulse(1);
      let response_design = await fetch('/api/add-database', {
        method: 'GET',
      });
      isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
      if (correct >= 5) {
        let bonusEntry = {
          participant_id: participant_id,
          condition: designElem,
          ip_address_1: ip_address_1,
          ip_address_2: ip_address_2,
          savedAnswer: savedAnswer,
          date: new Date().toISOString().substring(0, 10),
          time: new Date().toISOString().substring(11, 19),
          deviceType: deviceType,
          browser: browserName,
        };

        let response = await fetch('/api/add-database', {
          method: 'OPTIONS',
          body: JSON.stringify(bonusEntry),
        });
      }

      const timer = setTimeout(() => {
        window.location.href =
          'https://app.prolific.co/submissions/complete?cc=7104E4BD';
      }, 30000);
      return () => clearTimeout(timer);
    }
  };

  // next button
  const handleNext = async () => {
    if (isNaN(enteredAnswer)) {
      alert('Please type the number only');
      setEnteredAnswer('');
    } else {
      isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
      const nextQues = currentQuestion + 1;
      nextQues < questions.length && setCurrentQuestion(nextQues);
      let timeTaken = time_2 - time_3;
      setTime_2(time_3);
      let question = currentQuestion + 1;
      // console.log('reaching 1');
      enteredAnswer === '' ? (isAnswered = 'No') : (isAnswered = 'Yes');
      enteredAnswer === '' ? setAnswered(answered) : setAnswered(answered + 1);
      // if (currentQuestion > 0) {
      // let response_design = await fetch('/api/add-database', {
      //   method: 'GET',
      // });
      // let data = await response_design.json();
      // console.log(data);
      // console.log('reaching 2');
      // if (stateVar == 0) {
      //   // console.log('only once');

      //   designNumber = parseInt(data.message);
      //   setStateVar(1);
      //   let response_design = await fetch('/api/add-database', {
      //     method: 'PUT',
      //     body: ++designNumber % 4,
      //   });
      //   --designNumber;
      // } else {
      //   if (data.message == 0) designNumber = 3;
      //   else designNumber = parseInt(data.message) - 1;
      // }
      let response_design = await fetch('/api/add-database', {
        method: 'GET',
      });
      if (stateVar == 0) {
        // console.log('only once');

        let data = await response_design.json();

        // ---------  conditions  -------------

        designNumber = parseInt(data.message);
        setStateVar(1);
        response_design = await fetch('/api/add-database', {
          method: 'PUT',
          body: ++designNumber % 4,
        });
        --designNumber;

        if (data.message == 0) designNumber = 3;
        else designNumber = parseInt(data.message) - 1;

        // designNumber = 3; // ---------- needs to remove ------------
        setDesignElem(designNumber);
        answerWritten = enteredAnswer;
        // setSavedAnswer((savedAnswer) => [
        //   ...savedAnswer,
        //   {
        //     currentQuestion: currentQuestion + 1,
        //     answerWritten: answerWritten,
        //   },
        // ]);
        setEnteredAnswer('');
        // console.log(enteredAnswer);
        let databaseEntry = {
          participant_id: participant_id,
          condition: designNumber,
          ip_address_1: ip_address_1,
          ip_address_2: ip_address_2,
          questionNo: question,
          enteredAnswer: answerWritten,
          timeTaken: timeTaken,
          date: new Date().toISOString().substring(0, 10),
          time: new Date().toISOString().substring(11, 19),
          deviceType: deviceType,
          browser: browserName,
        };
        // setEnteredAnswer('');
        // console.log(enteredAnswer);
        let response = await fetch('/api/add-database', {
          method: 'POST',
          body: JSON.stringify(databaseEntry),
        });
      } else {
        // setDesignElem(designNumber);
        // }

        answerWritten = enteredAnswer;
        // setSavedAnswer([...savedAnswer, { answer: answerWritten }]);
        setEnteredAnswer('');
        // console.log(enteredAnswer);
        let databaseEntry = {
          participant_id: participant_id,
          condition: designElem,
          ip_address_1: ip_address_1,
          ip_address_2: ip_address_2,
          questionNo: question,
          enteredAnswer: answerWritten,
          timeTaken: timeTaken,
          date: new Date().toISOString().substring(0, 10),
          time: new Date().toISOString().substring(11, 19),
          deviceType: deviceType,
          browser: browserName,
        };
        // setEnteredAnswer('');
        // console.log(enteredAnswer);
        let response = await fetch('/api/add-database', {
          method: 'POST',
          body: JSON.stringify(databaseEntry),
        });
      }
      setSavedAnswer([...savedAnswer, enteredAnswer]);
      // console.log(savedAnswer);
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
    // let date = new Date().toISOString();
    // if (window.confirm('You are about to submit the test. Want to Proceed?')) {
    //   submit = 1;
    // } else submit = 0;

    // if (submit == 1) {
    let timeTaken = time_2 - time_3;
    setTime_2(time_3);
    let question = currentQuestion + 1;

    let response_design = await fetch('/api/add-database', {
      method: 'GET',
    });
    // let data = await response_design.json();
    // designNumber = designElem;
    setSavedAnswer([...savedAnswer, enteredAnswer]);
    let databaseEntry = {
      participant_id: participant_id,
      condition: designElem,
      ip_address_1: ip_address_1,
      ip_address_2: ip_address_2,
      questionNo: question,
      enteredAnswer: enteredAnswer,
      timeTaken: timeTaken,
      date: new Date().toISOString().substring(0, 10),
      time: new Date().toISOString().substring(11, 19),
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
    // console.log(savedAnswer);
    // }
  };
  // useEffect(() => {
  //   console.log(savedAnswer);
  // }, [savedAnswer]);
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
          <div className="font-serif px-10 py-4 pb-20 text-2xl font-semibold row-span-1 bg-slae-100 m-auto">
            Part I is done. Please complete the following steps:
          </div>
        ) : (
          // first row
          <div className="grid grid-cols-8 row-span-2 pr-10 bg-sky-50 ">
            <div className="col-span-5 font-serif text-2xl flex text-slate-700">
              <div className=" p-3 pl-10 pr-7 my-auto">
                {/* <p className="">Test Your Aptitude Skill</p> */}
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
            {/* <h1 className="text-2xl font-medium font-serif text-center pt-20 underline">
              Summary of your test:
            </h1> */}
            <div className="">
              <div className="grid grid-cols-9 gap-2">
                <div className="col-span-3 flex justify-center border-gray-300 border-r">
                  <div className="mx-auto px-5 space-y-10">
                    <div className="flex justify-center">
                      <span className="bg-gray-100 rounded-full px-6 py-4 font-bold text-lg">
                        1
                      </span>
                    </div>
                    <ul className="space-y-10">
                      <li>Fill in the questionnaire.</li>

                      <li>
                        <strong className="">
                          Do not refresh or close this page{' '}
                        </strong>{' '}
                        as you have to come back once the questionnaire is
                        completed.
                      </li>
                    </ul>
                    <br />
                    <div className=" flex justify-center font-serif">
                      {(() => {
                        if (designElem == 0) {
                          link =
                            'http://ulsurvey.uni.lu/index.php/195886?lang=en';
                        } else if (designElem == 1) {
                          link =
                            'http://ulsurvey.uni.lu/index.php/442446?lang=en';
                        } else if (designElem == 2) {
                          link =
                            'http://ulsurvey.uni.lu/index.php/387767?lang=en';
                        } else {
                          link =
                            'http://ulsurvey.uni.lu/index.php/843552?lang=en';
                        }
                      })()}
                      <a href={link} target={'_blank'}>
                        <span className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-3.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Go to Part 2: Survey
                        </span>{' '}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-span-3 flex justify-center border-gray-300 border-r">
                  <div className="mx-auto px-5 space-y-10">
                    <div className="flex justify-center">
                      <span className="bg-gray-100 rounded-full px-6 py-4 font-bold text-lg">
                        2
                      </span>
                    </div>
                    <ul className="space-y-10">
                      <li>
                        Copy paste the completion code received at the end of
                        the survey and unlock your final score in the test to
                        see your eligibility to the bonus.
                      </li>
                      <li>Enter the completion code:</li>
                      <input
                        type="text"
                        onChange={(event) => {
                          setcompletionCode(event.target.value);
                        }}
                        className="w-56 h-12 pl-2 border-gray-300 border-2 shadow-md rounded-lg"
                      />
                      &nbsp;&nbsp;
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={checkCompletionCode}
                      >
                        Unlock your scoree
                      </button>
                    </ul>
                    <br />
                    {(() => {
                      if (blurScore == 1) {
                        blurStatus = 'blur-xl';
                      } else {
                        blurStatus = 'blur-none';
                      }
                    })()}
                    {/* <table className="table-auto border-2 border-sky-300 mx-auto blur"> */}
                    <table
                      className={`${blurStatus} table-auto border-2 my-8 text-sm border-sky-300 mx-auto`}
                    >
                      <thead className="text-center  bg-sky-300">
                        <tr>
                          <th className="px-3">Question no</th>
                          <th className="px-3">Your Answer</th>
                          {/* <th className="px-3">Correct Answer</th> */}
                          <th className="px-3">Evaluation</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {
                          // for (let index = 0; index < 6; index++) {
                          savedAnswer.map((answer, index) => (
                            <tr key={index} className="border-2">
                              <td>{index + 1}</td>
                              <td>{savedAnswer[index]}</td>
                              {/* <td>{correctAnswer[index]}</td> */}
                              <td>
                                {(() => {
                                  if (savedAnswer[index] == '') {
                                    return (
                                      <span className="text-gray-400">
                                        Unattempted
                                      </span>
                                    );
                                  } else if (
                                    index == 3 &&
                                    parseFloat(savedAnswer[index]) >=
                                      correctAnswer[index] - 1 &&
                                    parseFloat(savedAnswer[index]) <=
                                      correctAnswer[index]
                                    // ||(index == 3 &&
                                    //   parseFloat(savedAnswer[index]) >=
                                    //     correctAnswer[index] - 1 &&
                                    //   parseFloat(savedAnswer[index]) <=
                                    //     correctAnswer[index])
                                  ) {
                                    correct++;

                                    return (
                                      <span className="text-green-500">
                                        Correct
                                      </span>
                                    );
                                  } else if (
                                    parseFloat(savedAnswer[index]) ==
                                    correctAnswer[index]
                                  ) {
                                    correct++;
                                    return (
                                      <span className="text-green-500">
                                        Correct
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span className="text-red-500">
                                        Incorrect
                                      </span>
                                    );
                                  }
                                })()}
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                    {(() => {
                      if (correct >= 5) {
                        return (
                          <p
                            className={`${blurStatus}  mx-auto text-xl font-bold text-center my-10 `}
                          >
                            Congratulations! You deserse the bonus!
                          </p>
                        );
                      } else {
                        return (
                          <p
                            className={`${blurStatus} text-center text-lg font-bold mx-auto `}
                          >
                            You needed {5 - correct} more correct answer(s) to
                            win the bonus
                          </p>
                        );
                      }
                    })()}

                    <br />
                  </div>
                </div>
                <div className="col-span-3 flex justify-center ">
                  <div className="mx-auto px-5 space-y-10">
                    <div className="flex justify-center">
                      <span className="bg-gray-100 rounded-full px-6 py-4 font-bold text-lg">
                        3
                      </span>
                    </div>
                    <ul className="space-y-4">
                      <li>Final step:</li>
                      <li>
                        {(() => {
                          if (finalPulse == 0) {
                            return (
                              <div className=" font-serif ">
                                <a href="#">
                                  <span className=" underline font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 text-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                                    Complete your study in Prolific
                                  </span>{' '}
                                </a>
                              </div>
                            );
                          } else {
                            return (
                              <div className=" font-serif ">
                                <a href="https://app.prolific.co/submissions/complete?cc=7104E4BD">
                                  <span className=" underline  rounded-lg text-lg font-semibold px-5 py-2.5 text-center mr-2 mb-2 text-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 animate-pulse">
                                    Complete your study in Prolific
                                  </span>
                                </a>
                                <li className="pt-10">
                                  (re-directs automatically after 30 seconds)
                                </li>
                              </div>
                            );
                          }
                        })()}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* main body */}
            <div className="row-span-5 my-auto">
              {/* second row */}
              {/* <div className="grid grid-rows-6 "> */}
              {/* <div className="grid grid-cols-8 px-10  row-span-1 "> */}
              {/* <div className="col-span-5 font-serif text-2xl flex  ">
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
                  </div> */}
              {/* </div> */}
              {(() => {
                if (timeLeftCheck <= 90) {
                  infoIconColor = 'text-red-400';
                } else if (time_2 - time_3 >= 120) {
                  infoIconColor = 'text-amber-600';
                } else {
                  infoIconColor = 'text-blue-500';
                }
              })()}
              {/* <div className="row-span-5  "> */}
              <div className="grid grid-cols-7 pl-2">
                <div className=" col-span-5 px-10 border-gray-100  border-r-2 py-10">
                  <div className="grid grid-rows-4 gap-4  ">
                    <div className="row-span-1   flex ">
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
                        if (timeLeftCheck <= 90) {
                          return (
                            <div className="my-auto  text-red-400 text-sm">
                              {' '}
                              Last few seconds remaining
                            </div>
                          );
                        } else if (time_2 - time_3 >= 120) {
                          return (
                            <div className="my-auto  text-amber-600 text-sm">
                              {' '}
                              You should not spend much time on a single
                              question
                            </div>
                          );
                        } else if (currentQuestion == 0) {
                          return (
                            <div className="my-auto text-slate-500 text-sm">
                              {' '}
                              Please remember that you cannot go back
                            </div>
                          );
                        } else {
                          return (
                            <div className="my-auto  text-slate-500 text-sm">
                              {' '}
                              <span> Good going!</span> Please remember that you
                              cannot go back
                            </div>
                          );
                        }

                        // if (currentQuestion == 0) {
                        //   return (
                        //     <div className="my-auto text-slate-500 text-sm">
                        //       {' '}
                        //       Please remember that you cannot go back
                        //     </div>
                        //   );
                        // } else if (timeLeftCheck <= 60) {
                        //   return (
                        //     <div className="my-auto  text-red-400 text-sm">
                        //       {' '}
                        //       Last few seconds remaining
                        //     </div>
                        //   );
                        // } else if (time_2 - time_3 >= 120) {
                        //   return (
                        //     <div className="my-auto  text-amber-600 text-sm">
                        //       {' '}
                        //       You should not spend much time on a single
                        //       question
                        //     </div>
                        //   );
                        // } else {
                        //   return (
                        //     <div className="my-auto  text-gray-500 text-sm">
                        //       {' '}
                        //       <span> Good going!</span> Please remember that you
                        //       cannot go back
                        //     </div>
                        //   );
                        // }
                      })()}
                    </div>
                    <>
                      <div className="row-span-2 my-auto ">
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
                          className="w-48 h-12 border-blue-300 border-2 shadow-md rounded-md pl-2"
                          placeholder="Type only the number"
                        />
                        {/* {(() => {
                          if (currentQuestion == 0) {
                            return <p>years</p>;
                          } else if (time_2 - time_3 >= 120) {
                            infoIconColor = 'text-amber-600';
                          } else {
                            infoIconColor = 'text-blue-500';
                          }
                        })()} */}
                      </div>
                    </>
                  </div>
                </div>
                <div className="grid col-span-2 ">
                  <div className=" flex justify-center my-auto ">
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
                        ((currentQuestion == 1) & (time_2 - time_3 > 10)) |
                        (currentQuestion >= 2)
                      ) {
                        if (designElem == 1) {
                          return (
                            <div className="flex h-1/2 w-2/3">
                              <img
                                src="images/honor_final.png"
                                className=""
                              ></img>
                            </div>
                          );
                        } else if (designElem == 2) {
                          return (
                            <div className="flex h-1/2 w-2/3 ">
                              <img
                                src="images/warning_final.png"
                                className=""
                              ></img>
                            </div>
                          );
                        } else if (designElem == 3) {
                          return (
                            <div className="flex h-1/2 w-2/3">
                              <img
                                src="images/monitoring_final.png"
                                className=""
                              ></img>
                            </div>
                          );
                        }
                      }
                      // if (
                      //   ((designElem == 3) &
                      //     ((currentQuestion == 2) &
                      //       (time_2 - time_3 > 7))) |
                      //   (currentQuestion >= 3)
                      // ) {
                      //   return (
                      //     <div className="flex h-1/2 w-2/3 ">
                      //       <img src="images/monitoring_final.png"></img>
                      //     </div>
                      //   );
                      // } else if (
                      //   ((designElem == 2) &
                      //     ((currentQuestion == 2) &
                      //       (time_2 - time_3 > 7))) |
                      //   (currentQuestion >= 3)
                      // ) {
                      //   return (
                      //     <div className="flex h-1/2 w-2/3 ">
                      //       <img src="images/warning_final.png"></img>
                      //     </div>
                      //   );
                      // } else if (
                      //   ((designElem == 1) &
                      //     ((currentQuestion == 2) &
                      //       (time_2 - time_3 > 7))) |
                      //   (currentQuestion >= 3)
                      // ) {
                      //   return (
                      //     <div className="flex h-1/2 w-2/3 ">
                      //       <img src="images/honor_final.png"></img>
                      //     </div>
                      //   );

                      // }
                    })()}{' '}
                  </div>
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
            <div className=" px-4 bg-slate-50 row-span-1 my-auto">
              <div className="grid grid-cols-3 ">
                <div className="col-span-1 flex pl-4 ">
                  <svg
                    className="h-8 w-8 text-gray-400 my-auto"
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
                  <div className="underline my-auto text-gray-500">
                    {/* <Link href=""> */}
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        if (
                          window.confirm(
                            'You are about to quit the test. Want to quit?'
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
                {/* {(() => {
                  if (currentQuestion == 0) {
                    bonusBorder =
                      'border-none border-red-300 rounded-sm  rounded-lg';
                  } else {
                    bonusBorder = 'border-none  rounded-lg';
                  }
                })()} */}
                <div className="col-span-1 flex my-auto justify-center">
                  <img src="images/bonus_final.png" className="w-1/2 "></img>
                </div>
                <div className="col-span-1 justify-end flex">
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
  const ip_1 = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const ip_2 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // console.log(JSON.stringify(ip));
  // console.log(ip);

  // const res = await axios.get('https://geolocation-db.com/json');
  // const ip = res.data.IPv4;
  const ip_segments_1 = ip_1.split('.');
  const ip_segments_2 = ip_2.split('.');
  let ip_segments_int_1 = ip_segments_1.map((item) => parseInt(item, 10));
  let ip_segments_int_2 = ip_segments_2.map((item) => parseInt(item, 10));

  // transforming IP addresses
  ip_segments_int_1[0] = ip_segments_int_1[0] * Math.pow(2, 2) + 5 * 5;
  ip_segments_int_1[1] = ip_segments_int_1[1] * Math.pow(3, 3) + 4 * 4;
  ip_segments_int_1[2] = ip_segments_int_1[2] * Math.pow(4, 4) + 3 * 3;
  ip_segments_int_1[3] = ip_segments_int_1[3] * Math.pow(5, 5) + 2 * 2;
  const ip_address_1 = ip_segments_int_1.join('.').toString();

  ip_segments_int_2[0] = ip_segments_int_2[0] * Math.pow(2, 2) + 5 * 5;
  ip_segments_int_2[1] = ip_segments_int_2[1] * Math.pow(3, 3) + 4 * 4;
  ip_segments_int_2[2] = ip_segments_int_2[2] * Math.pow(4, 4) + 3 * 3;
  ip_segments_int_2[3] = ip_segments_int_2[3] * Math.pow(5, 5) + 2 * 2;
  const ip_address_2 = ip_segments_int_2.join('.').toString();

  return {
    props: {
      ip_address_1,
      ip_address_2,
    }, // will be passed to the page component as props
  };
}
