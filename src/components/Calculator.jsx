import { ClickCalc } from './ClickCalc';
import { InputCalc } from './InputCalc';

import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { evaluate } from 'mathjs';

function History(props) {
  const results = props.data.map(result => {
    return <Button key={result}>{result}</Button>;
  });
  return <Box>{results}</Box>;
}

export const Calculator = () => {
  const [calcType, setCalcType] = useState('ClickCalc');
  const [history, setHistory] = useState([]);

  let calculator;

  switch (calcType) {
    case 'ClickCalc':
      calculator = <ClickCalc onClick={updateHistory} />;
      break;
    case 'InputCalc':
      calculator = <InputCalc onKeyDown={updateHistory} />;
      break;
    default:
      calculator = <ClickCalc onClick={updateHistory} />;
  }

  function updateHistory(calcResult) {
    if (history.length >= 6) {
      history.shift();
    }
    setHistory(history.concat(evaluate(calcResult)));
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        m="50px"
        h="90%"
      >
        <Button
          onClick={() => {
            calcType === 'ClickCalc'
              ? setCalcType('InputCalc')
              : setCalcType('ClickCalc');
          }}
        >
          Change CalcType
        </Button>
        <Box m="10px">
          <History data={history} />
          {calculator}
        </Box>
      </Box>
    </>
  );
};
