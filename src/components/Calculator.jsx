import { ClickCalc } from './ClickCalc';

import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { InputCalc } from './InputCalc';

export const Calculator = () => {
  const [calcType, setCalcType] = useState('ClickCalc');
  let calculator;
  switch (calcType) {
    case 'ClickCalc':
      calculator = <ClickCalc />;
      break;
    case 'InputCalc':
      calculator = <InputCalc />;
      break;
    default:
      calculator = <ClickCalc />;
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
        <Box m="10px">{calculator}</Box>
      </Box>
    </>
  );
};
