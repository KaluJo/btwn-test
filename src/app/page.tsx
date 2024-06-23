"use client";

import { useState } from "react";
import { Flex, Text, Button } from "@mantine/core";
import ScrapeOptions from "./_components/home/ScrapeOptions";
import ChooseIndustries from "./_components/home/ChooseIndustries";
import GetStarted from "./_components/home/GetStarted";
import { DropResume } from "./_components/home/DropResume";
import AssessCompetitors from "./_components/home/AssessCompetitors";
import AssessComplaints from "./_components/home/AssessComplaints";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const [sessionId, setSessionId] = useState<string | null>('');

  const [industries, setIndustries] = useState([
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Energy',
    'Transportation',
    'Agriculture',
    'Entertainment'
  ]);

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [topCompanies, setTopCompanies] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [topComplaints, setTopComplaints] = useState<any[]>([]);

  const steps = [
    "discover real problems btwn people and the world",
    "lets begin by analyzing the founding team",
    "select industries your team is interested in",
    "assess relevant companies in your problem space",
    "scrape and analyze pain points from the web",
    "analyze and extract insights from your data",
  ];

  const getStarted = (sessionId: string) => {
    setSessionId(sessionId);
    setCurrentStep(2);
  }

  const receiveIndustries = (industries: string[]) => {
    setIndustries(industries);
    setCurrentStep(3);
  }

  const receiveCompetitors = (sI: string[], tC: string[]) => {
    setSelectedIndustries(sI);
    setTopCompanies(tC);

    console.log('Selected Industries:', sI);
    console.log('Top Companies:', tC);

    setCurrentStep(4);
  }

  const receiveSelectedCompanies = (sC: string[]) => {
    setSelectedCompanies(sC);

    console.log('Selected Companies:', sC);

    setCurrentStep(5);
  }

  const receiveComplaints = (tC: string[]) => {
    setTopComplaints(tC);

    console.log('Top Complaints:', tC);

    setCurrentStep(7);
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Flex direction="column" w="100vw" mb={40}>
      <Flex mt={40} justify="center" ml={40} mr={40}>
        <Text ta="center" className="main-text fade">
          {steps[currentStep - 1]}
        </Text>
      </Flex>
      <Flex className={(currentStep === 4 || currentStep === 6) ? "step-container-big" : "step-container"}>
        {steps.map((_, index) => (
          <div
            key={index}
            className={`${index === 5 ? 'step-draggable' : 'step'} ${index + 1 === currentStep ? 'active' : index + 1 < currentStep ? 'prev' : ''}`}
          >
            {index + 1 === 1 && <GetStarted getStarted={getStarted} />}
            {index + 1 === 2 && <DropResume sessionId={sessionId} receiveIndustries={receiveIndustries} />}
            {index + 1 === 3 && <ChooseIndustries industries={industries} receiveCompetitors={receiveCompetitors} />}
            {index + 1 === 4 && <AssessCompetitors industries={selectedIndustries} topCompanies={topCompanies} receiveSelectedCompanies={receiveSelectedCompanies} />}
            {index + 1 === 5 && <ScrapeOptions industries={selectedIndustries} selectedCompanies={selectedCompanies} receiveComplaints={receiveComplaints} />}
            {currentStep === 6 && <AssessComplaints industries={selectedIndustries} complaints={topComplaints} />}
          </div>
        ))}
      </Flex>
      {/* <Flex justify="center" mt={20} mb={40} display={currentStep === 1 ? 'none' : 'flex'}>
        <Button
          w={125}
          variant={currentStep !== 1 ? 'outline' : 'default'}
          onClick={handlePrev}
          disabled={currentStep === 1}
          mr={10}
          style={{
            borderColor: '#E66F00',
            color: currentStep !== 1 ? '#E66F00' : 'inherit',
          }}
        >
          Previous
        </Button>
        <Button
          w={125}
          variant={currentStep !== steps.length ? 'outline' : 'default'}
          onClick={handleNext}
          disabled={currentStep === steps.length}
          style={{
            borderColor: '#E66F00',
            color: currentStep !== steps.length ? '#E66F00' : 'inherit',
          }}
        >
          Next
        </Button>
      </Flex> */}
    </Flex>
  );
}