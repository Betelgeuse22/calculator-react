import { Calculator } from './Calculator';
import { Converter } from './Converter';
import { Menu } from './Menu';

import { useState } from 'react';

import { Box } from '@chakra-ui/react';

export const App = () => {
  const [mode, setMode] = useState('Calculator');
  let application;

  switch (mode) {
    case 'Calculator':
      application = <Calculator />;
      break;
    case 'Converter':
      application = <Converter />;
      break;
    default:
      application = <Calculator />;
  }
  return (
    <Box h="90vh">
      <Menu onClick={setMode} />
      {application}
    </Box>
  );
};
