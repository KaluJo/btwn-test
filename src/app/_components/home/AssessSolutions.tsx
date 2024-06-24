import React from 'react';
import { Container, Text, List } from '@mantine/core';

interface Solution {
    title: string;
    detail: string;
}

interface AssessSolutionsProps {
    solutions: Solution[];
}

export default function AssessSolutions({ solutions }: AssessSolutionsProps) {
    return (
        <Container mt={40} w={"90%"}>
            <Text style={{ fontSize: 30 }} ta="center" mb="xl">
                Potential Solutions
            </Text>

            {solutions.length > 0 ? (
                <List type="ordered" size="lg" spacing="sm">
                    {solutions.map((solution, index) => (
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