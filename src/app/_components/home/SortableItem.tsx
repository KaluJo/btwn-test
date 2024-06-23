import React from 'react';
import { Text } from '@mantine/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  item: {
    title: string;
    directComments: string[];
  };
}

export function SortableItem({ id, item }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '16px',
    margin: '8px 0',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    listStyle: 'none',
    cursor: 'move',
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Text fw={700}>{item.title}</Text>
      {item.directComments.length > 0 && (
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          {item.directComments.map((comment, index) => (
            <li key={index} style={{ marginBottom: '4px' }}>{comment}</li>
          ))}
        </ul>
      )}
    </li>
  );
}