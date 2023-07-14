import { Box, Button, List, SlideFade, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export function Menu({ onClick }) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <HamburgerIcon
        w="45px"
        h="45px"
        p="5px"
        m="5px"
        borderRadius="5px"
        onClick={onToggle}
      />
      <SlideFade in={isOpen} offsetY="-20px" unmountOnExit>
        <Box
          position="absolute"
          bg="gray.100"
          p="10px"
          m="4px"
          borderRadius="8px"
          w="60%"
          zIndex="10"
        >
          <List
            display="flex"
            flexDirection="column"
            gap="10px"
            fontSize="20px"
          >
            <Button
              onClick={() => {
                onClick('Calculator');
                onToggle();
              }}
            >
              Calculator
            </Button>
            <Button
              onClick={() => {
                onClick('Converter');
                onToggle();
              }}
            >
              Converter
            </Button>
            <Button>Settings</Button>
          </List>
        </Box>
      </SlideFade>
    </Box>
  );
}
