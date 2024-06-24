import React, { useEffect, useState } from 'react';
import { Button, Container, Text, TextInput } from '@mantine/core';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import axios from 'axios';

interface Complaint {
    title: string;
    directComments: string[];
}

interface AssessComplaintsProps {
    industries: string[];
    complaints: Complaint[];
    receiveSolutions: (solutions: any[]) => void;
}

export default function AssessComplaints({ industries, complaints, receiveSolutions }: AssessComplaintsProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const [items, setItems] = useState([
        {
            "title": "Lack of Exclusive Games",
            "directComments": [
                "We need more exclusive titles.",
                "There aren't enough games unique to this platform."
            ]
        },
        {
            "title": "High Console Prices",
            "directComments": [
                "The cost of the console is too high.",
                "We need more affordable options for gaming systems."
            ]
        },
        {
            "title": "Online Service Issues",
            "directComments": [
                "The multiplayer service is unreliable.",
                "Online connectivity drops frequently."
            ]
        },
        {
            "title": "Limited Third-Party Game Support",
            "directComments": [
                "Not many third-party developers are making games for this platform.",
                "We want more third-party game options."
            ]
        },
        {
            "title": "Frequent Hardware Problems",
            "directComments": [
                "Our console keeps crashing.",
                "There are too many hardware failures."
            ]
        },
        {
            "title": "Poor Customer Support",
            "directComments": [
                "Customer service doesn't help resolve issues in a timely manner.",
                "Support representatives aren't knowledgeable."
            ]
        },
        {
            "title": "Lack of Backward Compatibility",
            "directComments": [
                "We can't play older games on the new system.",
                "Need backward compatibility for legacy titles."
            ]
        },
        {
            "title": "Limited Battery Life for Controllers",
            "directComments": [
                "Controller battery life is too short.",
                "We have to recharge the controllers too often."
            ]
        },
        {
            "title": "Game Prices Are Too High",
            "directComments": [
                "New game releases are too expensive.",
                "We need more frequent sales and discounts on games."
            ]
        },
        {
            "title": "Slow Software Updates",
            "directComments": [
                "System updates take forever to download and install.",
                "Software patches are too infrequent."
            ]
        }
    ]);

    const [userNotes, setUserNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [solutions, setSolutions] = useState<string[]>([]);

    useEffect(() => {
        if (complaints.length > 0) {
            setItems(complaints);
        } else {
            setItems([
                {
                    "title": "Lack of Exclusive Games",
                    "directComments": [
                        "We need more exclusive titles.",
                        "There aren't enough games unique to this platform."
                    ]
                },
                {
                    "title": "High Console Prices",
                    "directComments": [
                        "The cost of the console is too high.",
                        "We need more affordable options for gaming systems."
                    ]
                },
                {
                    "title": "Online Service Issues",
                    "directComments": [
                        "The multiplayer service is unreliable.",
                        "Online connectivity drops frequently."
                    ]
                },
                {
                    "title": "Limited Third-Party Game Support",
                    "directComments": [
                        "Not many third-party developers are making games for this platform.",
                        "We want more third-party game options."
                    ]
                },
                {
                    "title": "Frequent Hardware Problems",
                    "directComments": [
                        "Our console keeps crashing.",
                        "There are too many hardware failures."
                    ]
                },
                {
                    "title": "Poor Customer Support",
                    "directComments": [
                        "Customer service doesn't help resolve issues in a timely manner.",
                        "Support representatives aren't knowledgeable."
                    ]
                },
                {
                    "title": "Lack of Backward Compatibility",
                    "directComments": [
                        "We can't play older games on the new system.",
                        "Need backward compatibility for legacy titles."
                    ]
                },
                {
                    "title": "Limited Battery Life for Controllers",
                    "directComments": [
                        "Controller battery life is too short.",
                        "We have to recharge the controllers too often."
                    ]
                },
                {
                    "title": "Game Prices Are Too High",
                    "directComments": [
                        "New game releases are too expensive.",
                        "We need more frequent sales and discounts on games."
                    ]
                },
                {
                    "title": "Slow Software Updates",
                    "directComments": [
                        "System updates take forever to download and install.",
                        "Software patches are too infrequent."
                    ]
                }
            ]);
        }
    }, [complaints]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.title === active.id);
                const newIndex = items.findIndex((item) => item.title === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    };

    if (items.length === 0) {
        return (
            <Container mt={40}>
                <Text style={{ fontSize: 30 }} ta="center" mb="xl">
                    Top complaints in {industries.join(', ')}
                </Text>
                <Text>No complaints to display.</Text>
            </Container>
        );
    }

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await axios.post('https://btwn-dffde658ab26.herokuapp.com/top-ideas', {
                complaints: items,
                user_notes: userNotes,
                industries: industries,
            });

            let solutionsData = response.data.solutions;

            if (typeof solutionsData === 'string' && solutionsData.startsWith('json')) {
                solutionsData = solutionsData.substring(4).trim();
                solutionsData = JSON.parse(solutionsData);
            }
    
            setSolutions(solutionsData);
            receiveSolutions(solutionsData);
    
            console.log('Solutions:', solutionsData);
        } catch (error) {
            console.error('Error fetching top ideas:', error);
            alert('An error occurred while fetching top ideas. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container mt={40} h={2500}>
            <Text style={{ fontSize: 30 }} ta="center" mb="xl">
                Top complaints about {industries.join(', ')}
            </Text>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragStart={(event) => setActiveId(event.active.id as string)}
            >
                <SortableContext items={items.map((item) => item.title)} strategy={verticalListSortingStrategy}>
                    {items.map((item, index) => (
                        <SortableItem key={item.title} id={item.title} item={item} index={index} />
                    ))}
                </SortableContext>

                <DragOverlay>
                    {activeId ? (
                        <div style={{ background: 'white', padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
                            {items.find((item) => item.title === activeId)?.title}
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>

            <TextInput
                label="Enter your notes"
                value={userNotes}
                onChange={(event) => setUserNotes(event.target.value)}
                mt="md"
                mb="lg"
            />

            <Button
                onClick={handleSubmit}
                mt="lg"
                fullWidth
                style={{ backgroundColor: "#E66F00" }}
                c="white"
                h={42}
                loading={loading}
            >
                {loading ? 'Loading...' : 'Discover Solutions'}
            </Button>
        </Container>
    );
}
