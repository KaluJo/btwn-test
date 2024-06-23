import { Container, Flex, Image, Text } from "@mantine/core";

export default function Team() {
    return (
        <Container>
            <Flex direction={{ base: "column", sm: "row" }} align={"center"}>
                <Flex m={25}>
                    <a target="_blank" href="https://www.linkedin.com/in/bhadayun/" rel="noopener noreferrer">
                        <Image className="wobble-image" src="/bhada.png" alt="Bhada" width={200} height={200} />
                    </a>
                </Flex>
                <Flex m={25}>
                    <a target="_blank" href="https://www.linkedin.com/in/tianyun-y-a121181b3/" rel="noopener noreferrer">
                        <Image className="spin-image" src="/tianyun.png" alt="Tian" width={200} height={200} />
                    </a>
                </Flex>
                <Flex m={25}>
                    <a target="_blank" href="https://www.linkedin.com/in/dana-feng/" rel="noopener noreferrer">
                        <Image className="wobble-image" src="/dana.png" alt="Dana" width={200} height={200} />
                    </a>
                </Flex>
            </Flex>
        </Container>
    );
}