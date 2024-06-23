import React, { useEffect, useState } from 'react';
import { Container, Text } from '@mantine/core';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem'; // Create a new file for this component

interface Complaint {
    title: string;
    directComments: string[];
}

interface AssessComplaintsProps {
    industries: string[];
    complaints: Complaint[];
}

export default function AssessComplaints({ industries, complaints }: AssessComplaintsProps) {
    //   const [items, setItems] = useState(complaints);
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

    useEffect(() => {
        setItems(complaints);
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

    return (
        <Container mt={40} h={1000}>
            <Text style={{ fontSize: 30 }} ta="center" mb="xl">
                Top complaints in {industries.join(', ')}
            </Text>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragStart={(event) => setActiveId(event.active.id as string)}
            >
                <SortableContext items={items.map((item) => item.title)} strategy={verticalListSortingStrategy}>
                    {items.map((item) => (
                        <SortableItem key={item.title} id={item.title} item={item} />
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
        </Container>
    );
}
