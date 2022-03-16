import questions from '../questions.json';
import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';
import Timer from '../components/Timer';
import Header from '../components/Header';
import axios from 'axios';
import { browserName, isMobile } from 'react-device-detect';
import { Input } from 'postcss';

const time = 90 * 60; // setting time limit as 1.5 hours
// export const ApplicationContext = createContext();
export default function Home({ ip_address }) {
  const [oath, setOath] = useState('');
  const router = useRouter();

  let submit = 0;

  // Proceed with test
  const checkOath = () => {
    // isMobile ? (deviceType = 'Mobile') : (deviceType = 'Desktop');
    // if (window.confirm('You are about to submit the test. Want to Proceed?')) {
    //   submit = 1;
    // } else submit = 0;
    if (
      oath ==
      'I understand the consequences of visiting other websites or taking help from other aids during the exam'
    )
      router.push('/test');
    else alert('Please type the text correctly');
  };

  // JSX
  return (
    <div>
      <Head>
        <title>Online test</title>
      </Head>
      <div className="p-10 text-4xl text-center text-sky-700 shadow-md rounded-lg">
        Welcome to the Online Test
      </div>
      <div className="container mx-auto px-20 h-full border-2">
        <div className="text-3xl">
          <ul>
            <li className="text-center text-3xl my-5  text-red-500">
              WARNING!
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
          </ul>
          <br />
          <input
            type="text"
            value={oath}
            onChange={(event) => setOath(event.target.value)}
            className="w-full h-20 text-lg border-2 border-red-300 shadow-md"
            placeholder="Type the above text.."
          />
        </div>
        <button
          className="w-50 my-6 p-3 bg-green-500 text-white rounded-lg shadow-xl "
          onClick={checkOath}
        >
          Proceed with the Test
        </button>
      </div>
    </div>
  );
}
