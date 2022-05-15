import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

// export const ApplicationContext = createContext();
export default function Home() {
  const [checked, setChecked] = useState(false);
  const [id, setID] = useState('');

  const router = useRouter();

  // Proceed with test
  const checkInfo = () => {
    console.log(id);
    if (id == '') {
      alert('Please enter your ID');
    } else if (checked) {
      router.push('test?id=' + id);
    } else alert('Click the box to pledge and proceed');
  };

  // JSX
  return (
    <div>
      <Head>
        <title>Online test</title>
      </Head>

      <div className="grid grid-cols-7">
        <div className="font-serif col-span-4 p-5 text-4xl text-center text-white bg-blue-500 ">
          Welcome to the Online Test
        </div>
        <div className="col-span-3 p-5 text-center text-white bg-blue-500 ">
          Enter Your Profilic ID: <span> </span>
          {(() => {
            if (id == '') {
              return (
                <>
                  <input
                    type="text"
                    onChange={(event) => setID(event.target.value)}
                    className="p-2 text-black shadow-md rounded-lg border-red-500 border-2"
                    placeholder="Prolific ID"
                  />
                </>
              );
            } else {
              return (
                <>
                  <input
                    type="text"
                    onChange={(event) => setID(event.target.value)}
                    className="p-2 text-black border-gray shadow-md rounded-lg border-2"
                    placeholder="Enter your Prolific ID"
                  />
                </>
              );
            }
          })()}
        </div>
      </div>

      <div className="container mx-auto h-full ">
        <div className="py-5">
          <p>
            Hi There! These are the instructions to read before starting with
            the test -
          </p>
          <br />

          <strong className="text-violet-800"> About the exam:</strong>
          <ul>
            <li>
              <span> &nbsp; &nbsp; &nbsp; </span>1. There are{' '}
              <strong>9 quantitative aptitude questions</strong> you will have
              to answer.{' '}
              <span className="bg-indigo-600 text-white">
                First question is of <strong>"qualifying nature" </strong>. You
                cannot proceed if you answer incorrectly
              </span>
            </li>
            <li>
              <span> &nbsp; &nbsp; &nbsp; </span>2. The questions are of{' '}
              <strong> numeric entry types</strong>, where you will have to
              write the answers in the box
            </li>
            <li>
              <span> &nbsp; &nbsp; &nbsp; </span>3. You have total{' '}
              <strong>16 mins</strong> of time to answer them
            </li>
            <li>
              <span> &nbsp; &nbsp; &nbsp; </span>4. You{' '}
              <strong>cannot go back</strong> to the previous questions
            </li>
            <li>
              <span> &nbsp; &nbsp; &nbsp; </span>5. If you can answer{' '}
              <strong>6 questions correctly (including 1st question) </strong>,
              you will receive a <strong>bonus (£1) </strong> along with your
              compensation
            </li>
          </ul>
          <br />

          <strong className="text-violet-800"> Additional Instructions:</strong>
          <ul>
            <li>
              <span> &nbsp; &nbsp; &nbsp; </span>1. It is recommended to{' '}
              <strong>take the test from your laptop</strong> for a better view
            </li>
            <li>
              <span> &nbsp; &nbsp; &nbsp; </span>2. You are{' '}
              <strong className="text-red-500">NOT</strong> supposed to{' '}
              <strong>
                visit other websites or take help from other people
              </strong>{' '}
              during the test.{' '}
              <span className="underline">
                However, you can use calculator if required
              </span>
            </li>
            <li>
              <span> &nbsp; &nbsp; &nbsp; </span>3. If we discover you doing the
              above mentioned unauthorized activities, we may <strong> </strong>{' '}
              <strong>deduct a fine (50 pence) </strong> from your compensation
            </li>
            <li>
              <span> &nbsp; &nbsp; &nbsp; </span>4. You are asked to read out
              the <strong>Honor Code Pledge </strong> below and{' '}
              <strong> click the box </strong> to start with the question
            </li>
          </ul>
          {/* <ul>
            <li className="text-xl my-5">
              Hi There! These are the instructions to read before starting with
              the exam
            </li>

            <li className="text-xl my-5">
              DO NOT visit other websites or take help from other people during
              the exam. If we discover that you did either of these activities,
              we may:
            </li>
            <ol className="list-disc">
              <li className="text-xl">Cancel your exam immediately</li>
              <li className="text-xl">
                Cancel your compensation for participating
              </li>
            </ol>
            <br />
            <li className="text-2xl">
              Please show that you understand the rules of the exam by typing
              the following text into the box below:
            </li>
            <br />
            <li className="text-xl text-center italic">
              "I understand the consequences of visiting other websites or
              taking help from other aids during the exam"
            </li>
          </ul> */}
          <br />
          <br />
          {/* <input
            type="text"
            value={oath}
            onChange={(event) => setOath(event.target.value)}
            className="w-full h-20 text-lg border-2 border-red-300 shadow-md"
            placeholder="Type the above text.."
          /> */}

          <input
            type="checkbox"
            id="check"
            name="check"
            onChange={(event) => setChecked(!checked)}
          />
          <label for="check" className="text-blue-700">
            {' '}
            I affirm that I will NOT take any unauthorized help during this
            test, and that all work will be my own
          </label>
          <br />
          <br />
          <p>
            When you are ready, click the green Start Test and the timer will
            begin. <strong>Good Luck!</strong>
          </p>
        </div>
        <div className="flex py-7 justify-center">
          <button
            className="p-3 bg-green-500 hover:bg-green-700 text-white rounded-lg shadow-xl"
            onClick={checkInfo}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
