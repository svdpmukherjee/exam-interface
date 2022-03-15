import { useContext, useState } from 'react';
import { ApplicationContext } from '../pages';

const QuestionPalette = (props) => {
  const { currentQuestion, totalQuestion, isAnswered } = props.palette;
  //   const { togglePalette, setTogglePalette } = useContext(ApplicationContext);
  const [colorAnswer, setColorAnswer] = useState([]);
  const [stateVar, setStateVar] = useState(0);
  //   const [varr, setVarr] = useState(togglePalette);

  console.log(currentQuestion, totalQuestion, isAnswered, togglePalette);

  if (isAnswered === 'Yes') {
    //  console.log(isAnswered + togglePalette);
    //  setTogglePalette(0);

    //  if (stateVar == 0) {
    //    setColorAnswer([
    //      { currentQuestion: currentQuestion, circleColor: 'bg-green-300' },
    //    ]);
    //    setStateVar(stateVar + 1);
    //  } else

    setColorAnswer([
      ...colorAnswer,
      { currentQuestion: currentQuestion, circleColor: 'bg-green-300' },
    ]);
  } else if (isAnswered === 'No') {
    //  console.log(isAnswered + togglePalette);
    //  setTogglePalette(0);
    //  if (stateVar == 0) {
    //    setColorAnswer([
    //      { currentQuestion: currentQuestion, circleColor: 'bg-red-300' },
    //    ]);
    //    setStateVar(stateVar + 1);
    //  } else

    setColorAnswer([
      ...colorAnswer,
      { currentQuestion: currentQuestion, circleColor: 'bg-red-300' },
    ]);
  } else console.log('dhukche na');

  const runCallback = (cb) => {
    return cb();
  };

  return (
    <div className="grid grid-cols-3 gap-3 py-20">
      {runCallback(() => {
        const row = [];
        for (var i = 1; i <= 15; i++) {
          row.push(
            <div
              //   className={`${colorAnswer} text-blue-700  text-center p-2 rounded-full`}
              className={`bg-blue-100 text-blue-700  text-center p-2 rounded-full`}
              key={i}
            >
              {i}
            </div>
          );
        }
        return row;
      })}
    </div>
  );
};

export default QuestionPalette;
