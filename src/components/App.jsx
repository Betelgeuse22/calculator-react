import { useState } from 'react';
import { Box, Text, Button, Input, Flex } from '@chakra-ui/react';
import { evaluate } from 'mathjs';

function Numbers(props) {
  const nums = Array.from(Array(10).keys()).map(number => {
    return (
      <Button
        onClick={e => {
          if (props.data !== '0')
            props.onClick(props.data + e.target.innerHTML);
          else props.onClick(e.target.innerHTML);
        }}
        key={number}
        w="40px"
        h="40px"
        margin="4px"
      >
        {number}
      </Button>
    );
  });
  return (
    <Box display="flex" flexWrap="wrap" w="150px">
      {nums}
    </Box>
  );
}

function CountButton(props) {
  const expressions = /[+\-*\\/]/;
  const lastNumber = props.data[props.data.length - 1];

  function checkExpressionType() {
    if (expressions.test(lastNumber)) {
      return;
    }

    props.onClick(props.data + props.expression);
  }

  return (
    <Button
      w="40px"
      h="40px"
      m="4px"
      bg="skyblue"
      onClick={() => {
        checkExpressionType();
      }}
    >
      {props.expression}
    </Button>
  );
}

function InputCalc(props) {
  const [result, setResult] = useState('');
  const [counts, setCounts] = useState('');

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
          onInput={e => {
            updateCounts(e);
          }}
        ></Input>
        <Text>{result}</Text>
      </Flex>
    </Flex>
  );
}

export const App = () => {
  const [counts, setCounts] = useState('0');
  const [result, setResult] = useState(' ');

  function applyExpression(countedNumber) {
    setCounts(countedNumber);
    setResult(evaluate(counts));
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        h="100vh"
      >
        <Box
          display="flex"
          gap="5px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          w="200px"
        >
          <InputCalc />
          <Box
            display="flex"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.50"
            borderRadius="8px"
            px="4px"
          >
            <Text w="fit-content" h="38px">
              {counts}
            </Text>
            <Text w="fit-content" h="38px" textColor="tomato">
              {result}
            </Text>
          </Box>
          <Box display="flex">
            <Numbers data={counts} onClick={setCounts} />
            <Box display="flex" flexDirection="column" gap="5px">
              <CountButton
                data={counts}
                expression={'+'}
                onClick={applyExpression}
              ></CountButton>
              <CountButton
                data={counts}
                expression={'-'}
                onClick={applyExpression}
              ></CountButton>
              <CountButton
                data={counts}
                expression={'*'}
                onClick={applyExpression}
              ></CountButton>
              <CountButton
                data={counts}
                expression={'/'}
                onClick={applyExpression}
              ></CountButton>
            </Box>
            <Button
              bg="tomato"
              w="40px"
              h="40px"
              m="4px"
              onClick={() => {
                setResult(evaluate(counts));
              }}
            >
              =
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};