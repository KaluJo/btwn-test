import React, { useState } from 'react';
import { Container, Text, List, Button, Stack, Alert, Image } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';

type GetStartedProps = {
    getStarted: (sessionId: string) => void;
};

const GetStarted: React.FC<GetStartedProps> = ({ getStarted }) => {
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleGetStarted = async () => {
        setIsSubmitting(true);
        setError(null);

        const sessionId = uuidv4();
        console.log('Session ID:', sessionId);
        getStarted(sessionId);
    };

    return (
        <Container size="md" my={40}>
            <Stack align='center'>
                <Text style={{ fontSize: 30 }} inline size="lg" ta="center" mb="xl">
                    We help you navigate the crucial alignments in your startup journey:
                </Text>

                <List
                    spacing="sm"
                    size="lg"
                    center
                    icon={
                        <Image className='wobble-image' src="/circle-logo.png" alt="Ivee" height={32} mr={2} w="auto" fit="contain" />
                    }
                >
                    <List.Item>
                        <Text mb={-5} fw={700} style={{ fontSize: 22 }}>Founder-Market Fit</Text>
                        <Text c="dimmed" style={{ fontSize: 18 }}>Align your skills and passion with market needs</Text>
                    </List.Item>
                    <List.Item>
                        <Text mb={-5} fw={700} style={{ fontSize: 22 }}>Solution-Problem Fit</Text>
                        <Text c="dimmed" style={{ fontSize: 18 }}>Ensure your solution addresses a real market problem</Text>
                    </List.Item>
                    <List.Item>
                        <Text mb={-5} fw={700} style={{ fontSize: 22 }}>Product-Market Fit</Text>
                        <Text c="dimmed" style={{ fontSize: 18 }}>Validate that your product meets market demand</Text>
                    </List.Item>
                    <List.Item>
                        <Text mb={-5} fw={700} style={{ fontSize: 22 }}>Talent-Product Fit</Text>
                        <Text c="dimmed" style={{ fontSize: 18 }}>Build the right team to develop and scale your product</Text>
                    </List.Item>
                </List>

                {error && (
                    <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red">
                        {error}
                    </Alert>
                )}

                <Button
                    fullWidth
                    style={{ backgroundColor: "#E66F00" }}
                    mt={40}
                    c={"white"}
                    onClick={handleGetStarted}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    h={42}
                >
                    Get Started
                </Button>
            </Stack>
        </Container>
    );
};

export default GetStarted;