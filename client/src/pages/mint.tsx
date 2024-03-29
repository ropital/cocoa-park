import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ConnectButton } from "components/button/ConnectButton";
import { Header } from "components/header/Header";
import { useWalletContext } from "context/WalletProvider";
import type { NextPage } from "next";
import React from "react";
import { useCreateItem } from "../hooks/useCreateItem";

const Page: NextPage = () => {
  const {
    name,
    description,
    base64,
    isLoading,
    price,
    tokenId,
    setPrice,
    setName,
    setDescription,
    selectFile,
    submit,
    sell,
  } = useCreateItem();
  const { accountAddress, requestToConnect } = useWalletContext();

  return (
    <Box>
      <Header />

      {!accountAddress && (
        <Box w="50%" m="0 auto" textAlign="center" mt="30px">
          <Text mb="20px" fontSize="2xl">
            Please connect with your wallet
          </Text>
          <ConnectButton onClick={requestToConnect} />
        </Box>
      )}
      {accountAddress && (
        <VStack direction="column" margin="40px auto" spacing="20px" w="500px">
          <Heading as="h1" mb="40px">
            Create new item
          </Heading>

          <Box w="100%">
            <FormLabel>Token Name</FormLabel>
            <Input
              placeholder="My NFT"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </Box>
          <Box w="100%">
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="My NFT's description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
          </Box>
          <Box w="100%">
            <FormLabel>Price</FormLabel>
            <Input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              type="number"
              min={0}
            />
          </Box>

          <Box w="100%">
            <FormLabel>Image</FormLabel>
            <Input type="file" accept="image/*" onChange={selectFile} />
            {base64 && (
              <Box boxSize="sm" w="200px">
                <img src={base64} width="200px" alt="NFTの画像" />
              </Box>
            )}
          </Box>
          {isLoading ? (
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          ) : (
            <Button colorScheme="blue" w="100%" onClick={submit}>
              Mint
            </Button>
          )}
          {tokenId && (
            <Button w="100%" onClick={sell}>
              Sell
            </Button>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default Page;
