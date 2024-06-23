import { Flex, Image, Text } from "@mantine/core";
import Link from "next/link";

export default function Navbar() {
 return (
    <Flex m={14} ml={40} mr={40} direction={"row"} align={"center"} justify="space-between">
        <Link href="/" style={{ textDecoration: 'none', height: 38 }}>
          <Image src="/logo.png" alt="Ivee" height={31} mt={4} w="auto" fit="contain" />
        </Link>

        <Link href="/about" style={{ textDecoration: 'none' }}>
          <Text fw={700} c={"black"} style={{ fontSize: 50 }}>about</Text>
        </Link>
    </Flex>
 );
}