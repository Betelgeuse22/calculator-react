import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import { Text, Input, Flex } from '@chakra-ui/react';

export function InputCalc(props) {
  const [result, setResult] = useState('');
  const [counts, setCounts] = useState('');

  useEffect(() => {
    document.querySelector('input').focus();
  });

  function updateCounts(e) {
    const expressions =
      /^[-+]?[0-9]+(\.[0-9]+)?([+\-*/][-+]?[0-9]+(\.[0-9]+)?)*$/;
    const lastNumber = e.target.value[e.target.value.length - 2];

    if (
      !expressions.test(lastNumber) &&
      !expressions.test(e.nativeEvent.data) &&
      e.nativeEvent.data != null
    ) {
      return;
    }

    if (expressions.test(e.nativeEvent.data))
      setResult(evaluate(e.target.value));
    setCounts(e.target.value);
  }

  function sendDataToHistory(e) {
    if (e.nativeEvent.key === 'Enter') {
      props.onKeyDown(counts);
      setCounts('');
    }
  }

  return (
    <Flex w="100%" justifyContent="center">
      <Flex
        justifyContent="center"
        alignItems="center"
        border="2px"
        borderRadius="8px"
        borderColor="gray.50"
      >
        <Input
          border="transparent"
          type="text"
          value={counts}
          onChange={e => {
            updateCounts(e);
          }}
          onKeyDown={e => {
            sendDataToHistory(e);
          }}
        ></Input>
        <Text>{result}</Text>
      </Flex>
    </Flex>
  );
}
