import { Box, Flex, Link } from '@chakra-ui/layout';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { Button } from '@chakra-ui/button';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  //data is loading
  if (fetching) {
    //user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Box ml={'auto'}>
          <NextLink href="/login">
            <Link mr={2}>login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link>register</Link>
          </NextLink>
        </Box>
      </>
    );
    //user logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username} </Box>
        <Button
          isLoading={logoutFetching}
          onClick={() => logout()}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tan" p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
