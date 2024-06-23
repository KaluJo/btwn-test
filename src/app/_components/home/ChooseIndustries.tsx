import React, { useState } from 'react';
import { Container, Text, MultiSelect, Button, Flex } from '@mantine/core';
import axios from 'axios'; // Make sure to install axios: npm install axios

interface ChooseIndustriesProps {
    industries: string[];
    receiveCompetitors: (selectedIndustries: string[], topCompanies: any[]) => void;
}

const IndustryItem: React.FC<{ option: { value: string; label: string } }> = ({ option }) => (
    <Flex ml={2} align="center">
        <Text style={{ fontSize: 16 }} mr={10}>{Array.from(option.value)[0]}</Text>
        <Text style={{ fontSize: 21.4 }}>{option.value.slice(2)}</Text>
    </Flex>
);

export default function ChooseIndustries({ industries, receiveCompetitors }: ChooseIndustriesProps) {
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (selectedIndustries.length === 0) {
            alert('Please select at least one industry.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://btwn-dffde658ab26.herokuapp.com/top-companies', {
                industries: selectedIndustries
            });
            
            console.log('API Response:', response.data);
            
            const topCompanies = response.data.top_companies;
            receiveCompetitors(selectedIndustries, topCompanies);
        } catch (error) {
            console.error('Error fetching top companies:', error);
            alert('An error occurred while fetching top companies. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container mt={40}>
            <MultiSelect
                data={industries}
                label="Select up to 3 industries"
                placeholder={selectedIndustries.length === 0 ? 'Select industries' : undefined}
                maxValues={3}
                value={selectedIndustries}
                onChange={(value: string[]) => setSelectedIndustries(value)}
                searchable
                nothingFoundMessage="No matching industries"
                renderOption={({ option }) => <IndustryItem option={option} />}
            />

            <Button 
                onClick={handleSubmit}
                disabled={selectedIndustries.length === 0 || loading}
                mt="lg"
                fullWidth
                style={{ backgroundColor: "#E66F00" }}
                c="white"
                h={42}
                loading={loading}
            >
                {loading ? 'Loading...' : 'Submit Selected Industries'}
            </Button>
        </Container>
    );
}