import { Container, Flex, Image, LoadingOverlay, Text } from "@mantine/core";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

interface ScrapeOptionsProps {
    industries: string[];
    selectedCompanies: string[];
    receiveComplaints: (topComplaints: any[]) => void;
}

interface TopDesiresResponse {
    complaints: any[];
}

export default function ScrapeOptions({ industries, selectedCompanies, receiveComplaints }: ScrapeOptionsProps) {
    const [loading, setLoading] = useState(false);
    const [topComplaints, setTopComplaints] = useState<any[]>([]);

    const handleOptionClick = async () => {
        setLoading(true);

        try {
            const response = await axios.post<TopDesiresResponse>('https://btwn-dffde658ab26.herokuapp.com/top-complaints', {
                industries: industries,
                companies: selectedCompanies,
            });

            let complaintsData: string | any = response.data.complaints;

            if (typeof complaintsData === 'string' && complaintsData.startsWith('json')) {
                complaintsData = complaintsData.substring(4).trim();
            }

            let complaintsArray = typeof complaintsData === 'string' ? JSON.parse(complaintsData) : complaintsData;

            complaintsArray = Array.isArray(complaintsArray) ? complaintsArray : [];

            complaintsArray = complaintsArray.map((complaint: any) => ({
                title: complaint.title || '',
                directComments: Array.isArray(complaint.directComments) ? complaint.directComments : [],
            }));

            setTopComplaints(complaintsArray);
            receiveComplaints(complaintsArray);
        } catch (error) {
            console.error('Error fetching top desires:', error);
            alert('An error occurred while fetching top desires. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container mt={20}>
            <LoadingOverlay visible={loading} loaderProps={{ color: '#E66F00' }} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <Flex direction={"column"} align={"center"}>
                <Flex onClick={handleOptionClick} m={20} align={"center"} className="option-group wobble-image">
                    <Flex visibleFrom="md" className="scrape-image-container">
                        <Image src="/home/youtube-scrape.png" alt="YouTube Scrape" height={104} className="scrape-image" />
                        <Image src="/home/youtube-scrape-ul.png" alt="YouTube Scrape Underlined" height={104} className="scrape-image-ul" />
                    </Flex>
                    <Flex hiddenFrom="md" className="scrape-image-container">
                        <Image src="/home/youtube-scrape-sm.png" alt="YouTube Scrape" height={104} />
                    </Flex>
                    <Image className="wobble-image" src="/youtube-logo.png" alt="YouTube Logo" width={100} height={100} />
                </Flex>
                <Flex onClick={handleOptionClick}  m={20} align={"center"} className="option-group wobble-image">
                    <Image className="wobble-image" src="/apple-logo.png" alt="Apple Logo" width={120} height={120} />
                    <Flex visibleFrom="md" className="scrape-image-container">
                        <Image src="/home/appstore-scrape.png" alt="App Store Scrape" height={104} className="scrape-image" />
                        <Image src="/home/appstore-scrape-ul.png" alt="App Store Scrape Underlined" height={104} className="scrape-image-ul" />
                    </Flex>
                    <Flex hiddenFrom="md" className="scrape-image-container">
                        <Image src="/home/appstore-scrape-sm.png" alt="App Store Scrape" height={104} />
                    </Flex>
                </Flex>
                <Flex onClick={handleOptionClick} m={20} align={"center"} className="option-group wobble-image">
                    <Flex visibleFrom="md" className="scrape-image-container">
                        <Image src="/home/tiktok-scrape.png" alt="TikTok Scrape" height={104} className="scrape-image" />
                        <Image src="/home/tiktok-scrape-ul.png" alt="TikTok Scrape Underlined" height={104} className="scrape-image-ul" />
                    </Flex>
                    <Flex hiddenFrom="md" className="scrape-image-container">
                        <Image src="/home/tiktok-scrape-sm.png" alt="TikTok Scrape" height={104} />
                    </Flex>
                    <Image className="wobble-image" src="/tiktok-logo.png" alt="TikTok Logo" width={75} height={75} mb={10} />
                </Flex>
            </Flex>
        </Container>
    );
}