import { Button, Container, Flex, Image, LoadingOverlay, Text } from "@mantine/core";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ScrapeOptionsProps {
    sessionId: string | null;
    industries: string[];
    selectedCompanies: string[];
    receiveComplaints: (topComplaints: any[]) => void;
}

interface TopDesiresResponse {
    complaints: any[];
}

export default function ScrapeOptions({ sessionId, industries, selectedCompanies, receiveComplaints }: ScrapeOptionsProps) {
    const [loading, setLoading] = useState(false);
    const [topComplaints, setTopComplaints] = useState<any[]>([]);
    const [loadingMessage, setLoadingMessage] = useState("You chose to analyze " + selectedCompanies.join(', '));

    useEffect(() => {
        setLoadingMessage("You chose to analyze " + selectedCompanies.join(', '));
    }, [selectedCompanies]);

    const loadingMessages = [
        "Scouring the web for juicy details...",
        "Uncovering the dirt on {company}...",
        "Digging up {company}'s dirty laundry...",
        "Spilling the tea on {company}...",
        "Investigating {company}'s pain points...",
        "Searching high and low for {company}'s weaknesses...",
        "Leaving no stone unturned in {company}'s backyard...",
        "Discovering {company}'s best-kept secrets...",
        "Unearthing {company}'s hidden complaints...",
        "Exposing {company}'s customer woes...",
        "Revealing {company}'s Achilles' heel...",
        "Cracking the code on {company}'s struggles...",
        "Snooping around {company}'s online presence...",
        "Investigating {company}'s customer gripes...",
        "Getting to the bottom of {company}'s issues...",
        "Uncovering {company}'s customer pain points...",
        "Delving into {company}'s online reputation...",
        "Peeling back the layers of {company}'s complaints...",
        "Exploring {company}'s customer feedback...",
        "Assembling the puzzle pieces of {company}'s problems..."
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (loading) {
            interval = setInterval(() => {
                const company = selectedCompanies[Math.floor(Math.random() * selectedCompanies.length)];
                const message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)].replace('{company}', company);
                setLoadingMessage(message);
            }, 3000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [loading]);

    const handleOptionClick = async () => {
        setLoading(true);

        try {
            const response = await axios.post('https://btwn-dffde658ab26.herokuapp.com/top-complaints', {
                industries: industries,
                companies: selectedCompanies,
            }, {
                headers: {
                    'session_id': sessionId,
                },
            });

            await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait for 30 seconds

            let complaintsData: string | any = null;
            let attempts = 0;

            while (attempts < 6 && !complaintsData) {
                try {
                    const complaintsResponse = await axios.post('https://btwn-dffde658ab26.herokuapp.com/retrieve-top-complaints', {}, {
                        headers: {
                            'session_id': sessionId,
                        },
                    });

                    complaintsData = complaintsResponse.data.top_complaints.data;
                } catch (error) {
                    console.error('Error fetching complaints data:', error);
                }

                if (!complaintsData) {
                    await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 10 seconds before the next attempt
                }

                attempts++;
            }

            if (complaintsData) {
                console.log('Complaints Data:', complaintsData);

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
            } else {
                console.error('Failed to retrieve complaints data after multiple attempts.');
                alert('An error occurred while fetching complaints data. Please try again.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching top desires:', error);
            alert('An error occurred while fetching top desires. Please try again.');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container mt={20}>
            <Text style={{ fontSize: 30 }} ta="center" mb="xl">
                {loadingMessage}
            </Text>

            {/* <LoadingOverlay
                visible={true}
                loaderProps={{
                    color: '#E66F00',
                    children: <div className="loading-container" style={{ marginBottom: 65 }}>
                        <Image src="/apple-logo.png" alt="App Store Scrape" height={65} w={65} className="loading-item" />
                        <Image src="/youtube-logo.png" alt="Youtube Scrape" height={60} w={60} className="loading-item" />
                        <Image src="/tiktok-logo.png" alt="Tiktok Scrape" height={45} w={40} className="loading-item" />
                    </div>
                }}
                zIndex={1000}
            /> */}

            <Flex direction={"column"} align={"center"}>

                {loading ?
                    <div className="loading-container" style={{ marginBottom: 65, marginTop: 65 }}>
                        <Image src="/apple-logo.png" alt="App Store Scrape" height={65} w={65} className="loading-item" />
                        <Image src="/youtube-logo.png" alt="Youtube Scrape" height={60} w={60} className="loading-item" />
                        <Image src="/tiktok-logo.png" alt="Tiktok Scrape" height={45} w={40} className="loading-item" />
                    </div>
                    :
                    <Button
                        onClick={handleOptionClick}
                        mt="sm"
                        w={'76%'}
                        style={{ backgroundColor: "#E66F00" }}
                        c="white"
                        h={42}
                        loading={loading}
                    >
                        {loading ? 'Loading...' : 'Begin Analysis'}
                    </Button>
                }

                {/* <Flex onClick={handleOptionClick} m={20} align={"center"} className="option-group wobble-image">
                    <Flex visibleFrom="md" className="scrape-image-container">
                        <Image src="/home/begin-scraping.png" alt="App Store Scrape" height={104} className="scrape-image" />
                        <Image src="/home/begin-scraping-ul.png" alt="App Store Scrape Underlined" height={104} className="scrape-image-ul" />
                    </Flex>
                    <Flex hiddenFrom="md" className="scrape-image-container">
                        <Image src="/home/appstore-scrape-sm.png" alt="App Store Scrape" height={104} />
                    </Flex>
                </Flex> */}

            </Flex>
        </Container>
    );
}