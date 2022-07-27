import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import { useRouter } from 'next/router';

// export const ApplicationContext = createContext();
export default function Home() {
  const [checked, setChecked] = useState(false);
  const [id, setID] = useState('');

  const router = useRouter();
  const param = router.query.par;
  // Proceed with test
  const checkInfo = () => {
    router.push('/info-page-2');
  };

  // JSX
  return (
    <div className="">
      <div className="grid grid-rows-8 h-screen ">
        <Head>
          <title>Online test</title>
        </Head>

        <div className="font-serif px-10 py-7 text-2xl text-center font-semibold row-span-1 bg-gray-100 ">
          Welcome to the Study: Online Quantitative Aptitude Test
        </div>

        <div className="mx-auto px-16 pt-10 row-span-5">
          <div className="">
            <div className="relative flex flex-col flex-wrap p-8 bg-opacity-75 border border-gray-300 ">
              <div className="absolute flex px-3 py-1 text-sm font-medium text-white  bg-sky-700 -top-5 rounded-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 my-auto"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#FFFFFF"
                    d="M425.706 86.294A238.432 238.432 0 00256 16c-63.857 0-123.951 21.059-169.211 59.3C41.14 113.861 16 165.251 16 220c0 52.417 23.319 102.222 65.663 140.24 41.8 37.533 98.164 60.026 158.7 63.334a8.039 8.039 0 017.637 7.988v39.848a24.019 24.019 0 0024.055 24q.872 0 1.746-.064A240.009 240.009 0 00425.706 86.294zM264 240h-16a32 32 0 01-32-32v-96a32 32 0 0132-32h16a32 32 0 0132 32v96a32 32 0 01-32 32zm32 80a40 40 0 11-40-40 40 40 0 0140 40z"
                  ></path>
                </svg>
                &nbsp;&nbsp;
                <div className="my-auto">
                  Before starting, we need your consent
                </div>
              </div>
              <div className="mx-auto px-5">
                <div className="relative p-6 flex-auto text-sm text-justify space-y-6 leading-6">
                  <div className="">
                    <span className="font-bold">
                      Description of the study:{' '}
                    </span>
                    You are about to solve{' '}
                    <span className="font-semibold">
                      5 quantitative aptitude questions{' '}
                    </span>
                    in an online test system within{' '}
                    <span className="font-semibold">10 minutes</span>. You will
                    be rewarded with a{' '}
                    <span className="font-semibold"> bonus (£15) </span> at the
                    end of the study if you could solve{' '}
                    <span className="font-semibold">
                      all 5 questions correctly
                    </span>
                    . You should not look for any help either on the internet or
                    from anyone else during the test. After the test, you shall
                    fill up an online questionnaire regarding your experience.{' '}
                    <span className="font-semibold">
                      The total duration of the study will take around 15
                      minutes
                    </span>
                    . To thank you for your participation, you will receive a{' '}
                    <span className="font-semibold">£2 compensation</span>.
                  </div>
                  <div>
                    <span className="font-bold">
                      What data would we collect?{' '}
                    </span>
                    In the survey, we will ask you to share some information
                    about yourself, e.g. birth year, gender, native language,
                    qualification, and educational background.{' '}
                    <span className="font-semibold">
                      All your personal data will strictly be anonymized.
                    </span>{' '}
                    Your answers (both from the online test and survey) will be
                    stored in a secured server in University of Luxembourg.
                    During the online test, IP address of your test-taking
                    device along with the device type shall be recorded and be
                    strictly pseudonymized before storing it in the same server.
                    Only the researchers working on this study will have the
                    access to these data. The data collected during the study
                    will only be used for the research project.{' '}
                    <span className="font-semibold">
                      The data will be used for publications without personally
                      identifying you.
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Your Consent -</span> I have
                    been informed in writing on how the study will be carried
                    out. I have also been informed about the anonymity of my
                    personal data and processing of it without revealing my
                    identity, under the conditions detailed in the GDPR. I am
                    aware that I may withdraw my consent any time and I don’t
                    need to give reasons for my withdrawal and that there will
                    be no negative consequences.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <p>
            When you are ready, click the{' '}
            <span className="text-sky-600">Start Test</span> below. Good Luck!
          </p> */}
        </div>
        <div className="row-span-1 px-16 italic text-gray-400">
          If you do not wish to participate in this study, please return your
          submission on Prolific by selecting the 'Stop without completing'
          button
        </div>

        <div className="flex py-5 pr-4 justify-center bg-gray-100 row-span-1">
          <button
            className="px-5 py-2 bg-blue-700 hover:bg-sky-700 text-white rounded-lg shadow-2xl"
            onClick={checkInfo}
          >
            Yes, I give my consent
          </button>
        </div>
      </div>
    </div>
  );
}
