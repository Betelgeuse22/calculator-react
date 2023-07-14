import { useState } from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { evaluate } from 'mathjs';

function Numbers(props) {
  const nums = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map(
    number => {
      return (
        <Button
          onClick={e => {
            if (props.data !== 0)
              props.onClick(props.data + e.target.innerHTML);
            else props.onClick(e.target.innerHTML);
          }}
          key={number}
          w="60px"
          h="60px"
          margin="4px"
        >
          {number}
        </Button>
      );
    }
  );
  return (
    <Flex display="flex" flexWrap="wrap" w="250px">
      {nums}
    </Flex>
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
      w="60px"
      h="60px"
      m="4px"
      bg="capri"
      onClick={() => {
        checkExpressionType();
      }}
    >
      {props.expression}
    </Button>
  );
}

export const ClickCalc = props => {
  const [counts, setCounts] = useState('0');
  const [result, setResult] = useState(' ');

  function applyExpression(countedNumber) {
    setCounts(countedNumber);
    setResult(evaluate(counts));
  }

  return (
    <>
      <Flex
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          gap="5px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            w="90%"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.50"
            borderRadius="8px"
          >
            <Text
              display="flex"
              justifyContent="start"
              alignItems="centr"
              w="fit-content"
              h="40px"
              px="16px"
            >
              {counts}
            </Text>
            <Text w="fit-content" h="40px" textColor="tomato">
              {result}
            </Text>
          </Flex>
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
              w="60px"
              h="60px"
              m="4px"
              onClick={() => {
                setResult(evaluate(counts));
                setCounts('0');
                props.onClick(counts);
              }}
            >
              =
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
