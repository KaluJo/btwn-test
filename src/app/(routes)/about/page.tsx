import Team from "@/app/_components/about/Team";
import { Flex, Text } from "@mantine/core";

export default function About() {
  return (
    <Flex direction={"column"} w={"100vw"}>
      <Flex mt={40} mb={50} justify={"center"} ml={40} mr={40}>
        <Text ta={"center"} className="main-text">we help entrepreneurs build things people need</Text>
      </Flex>
      <Team />
      <Flex mt={50} mb={50} justify={"center"} ml={40} mr={40}>
        <Text ta={"center"} className="main-text">built by bhada, tian, and dana, respectively</Text>
      </Flex>
    </Flex>
  );
}
