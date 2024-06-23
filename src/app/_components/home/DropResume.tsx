import React, { useState } from 'react';
import { Container, Text, Group, Button, SimpleGrid } from '@mantine/core';
import { Dropzone, PDF_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconX, IconFile } from '@tabler/icons-react';
import axios from 'axios';

type DropResumeProps = {
    sessionId: string | null;
    receiveIndustries: (industries: string[]) => void;
};

export const DropResume: React.FC<DropResumeProps> = ({ sessionId, receiveIndustries }) => {
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDrop = (newFiles: FileWithPath[]) => {
        setFiles((currentFiles) => {
            const updatedFiles = [...currentFiles, ...newFiles];
            return updatedFiles.slice(0, 5);
        });
    };

    const handleRemove = (index: number) => {
        setFiles((currentFiles) => currentFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (files.length === 0) {
            alert('Please upload at least one resume.');
            return;
        }

        setIsSubmitting(true);

        console.log('session_id:', sessionId);

        try {
            const formData = new FormData();

            let validFilesCount = 0;

            files.forEach((file) => {
                if (file && file.size > 0) {
                    formData.append('resumes', file);
                    validFilesCount++;
                }
            });

            if (validFilesCount === 0) {
                alert('Please upload at least one valid resume.');
                setIsSubmitting(false);
                return;
            }

            const response = await axios.post('https://btwn-dffde658ab26.herokuapp.com/submit_resumes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'session_id': sessionId,
                }
            });
            console.log(response.data);

            const industriesResponse = await axios.get('https://btwn-dffde658ab26.herokuapp.com/get_industries', {
                headers: {
                    'session_id': sessionId,
                },
            });
            
            const industries = industriesResponse.data.industries;
            console.log('Retrieved industries:', industries);
            receiveIndustries(industries);
            setFiles([]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Error data:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);

                    if (error.response.status === 503) {
                        alert('The server is currently unavailable. Please try again later.');
                    } else {
                        alert(`An error occurred: ${error.response.data.message || 'Unknown error'}`);
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    alert('No response received from the server. Please check your internet connection and try again.');
                } else {
                    console.error('Error', error.message);
                    alert('An error occurred while setting up the request. Please try again.');
                }
            } else {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container mt={40}>
            <Dropzone
                onDrop={handleDrop}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={PDF_MIME_TYPE}
                maxFiles={5}
            >
                <Group justify='center' mt={0} mb={0} ml={20} mr={30} style={{ minHeight: 220, pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload size="4.2rem" stroke={1.25} color='#999999' />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX size="4.2rem" stroke={1.25} color='#999999' />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconFile size="4.2rem" stroke={1.25} color='#999999' />
                    </Dropzone.Idle>

                    <div>
                        <Text style={{ fontSize: 30 }} inline>
                            Drag resumes here or click to select files
                        </Text>
                        <Text style={{ fontSize: 21.4 }} size="sm" c="dimmed" inline mt={7}>
                            Attach up to 5 PDF files, each file should not exceed 3mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>

            {files.length > 0 && (
                <SimpleGrid cols={2} mt="lg">
                    {files.map((file, index) => (
                        <div key={index}>
                            <Group>
                                <Text style={{ fontSize: 20 }}>{file.name}</Text>
                                <Button style={{ backgroundColor: "#E66F00" }} onClick={() => handleRemove(index)}>
                                    Remove
                                </Button>
                            </Group>
                        </div>
                    ))}
                </SimpleGrid>
            )}

            <Button
                onClick={handleSubmit}
                disabled={files.length === 0 || isSubmitting}
                loading={isSubmitting}
                mt="lg"
                fullWidth
                style={{ backgroundColor: "#E66F00" }}
                c={"white"}
                h={42}
            >
                Submit Resumes
            </Button>
        </Container>
    );
};