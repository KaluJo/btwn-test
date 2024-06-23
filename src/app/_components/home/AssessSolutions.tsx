import React, { useEffect, useState } from 'react';
import { Container, Text, List } from '@mantine/core';

interface Solution {
    title: string;
    detail: string;
}

interface AssessSolutionsProps {
    solutions: Solution[];
}

export default function AssessSolutions({ solutions }: AssessSolutionsProps) {
    const [processedSolutions, setProcessedSolutions] = useState<Solution[]>([]);

    useEffect(() => {
        setProcessedSolutions(solutions);
    }, [solutions]);

    return (
        <Container mt={40} w={"90%"}>
            <Text style={{ fontSize: 30 }} ta="center" mb="xl">
                Potential Solutions
            </Text>

            {processedSolutions.length > 0 ? (
                <List type="ordered" size="lg" spacing="sm">
                    {processedSolutions.map((solution, index) => (
                        <List.Item style={{ fontSize: 20.4 }} key={index}>
                            <Text style={{ fontSize: 20.4 }}>{solution.title}</Text>
                            <Text mt="sm">{solution.detail}</Text>
                        </List.Item>
                    ))}
                </List>
            ) : (
                <Text>No solutions to display.</Text>
            )}
        </Container>
    );
}