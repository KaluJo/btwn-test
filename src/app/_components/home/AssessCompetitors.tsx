import React, { useState } from 'react';
import { Container, Text, MultiSelect, Button, Accordion, Box, Loader } from '@mantine/core';
import axios from 'axios';

interface Company {
    company_name: string;
    company_description: string;
}

interface AssessCompaniesProps {
    industries: string[];
    topCompanies: any[];
    receiveSelectedCompanies: (topComplaints: any[]) => void;
}

interface TopDesiresResponse {
    complaints: any[];
}

export default function AssessCompetitors({ industries, topCompanies, receiveSelectedCompanies }: AssessCompaniesProps) {
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [topComplaints, setTopComplaints] = useState<any[]>([]);

    if (topCompanies.length === 0) {
        topCompanies = [
            { company_name: 'Dummy Company 1', company_description: 'Dummy Description 1' },
            { company_name: 'Dummy Company 2', company_description: 'Dummy Description 2' },
            { company_name: 'Dummy Company 3', company_description: 'Dummy Description 3' }
        ];
    }

    const handleSubmit = async () => {
        if (selectedCompanies.length === 0) {
            alert('Please select at least one company.');
            return;
        }

        console.log(selectedCompanies);
        receiveSelectedCompanies(selectedCompanies);
    };

    return (
        <Container mt={40}>
            <Text style={{ fontSize: 30 }} inline size="lg" ta="center" mb="xl">Top companies in {industries.join(', ')}</Text>

            <Accordion>
                {topCompanies.map((company, index) => (
                    <Accordion.Item key={index} value={company.company_name}>
                        <Accordion.Control style={{ fontSize: 20.4, fontWeight: 700 }}>{company.company_name}</Accordion.Control>
                        <Accordion.Panel style={{ fontSize: 17 }}>{company.company_description}</Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>

            <Box mt={60}>
                <MultiSelect
                    data={topCompanies.map(company => ({ value: company.company_name, label: company.company_name }))}
                    label="Select up to 3 companies to explore further"
                    placeholder={selectedCompanies.length === 0 ? 'Select companies' : undefined}
                    maxValues={3}
                    value={selectedCompanies}
                    onChange={(value: string[]) => setSelectedCompanies(value)}
                    searchable
                    nothingFoundMessage="No matching companies"
                />

                <Button
                    onClick={handleSubmit}
                    disabled={selectedCompanies.length === 0 || loading}
                    mt="lg"
                    fullWidth
                    style={{ backgroundColor: "#E66F00" }}
                    c="white"
                    h={42}
                >
                    {loading ? <Loader color="white" size="sm" /> : 'Explore Selected Companies'}
                </Button>
            </Box>

        </Container>
    );
}