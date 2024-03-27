import React, { useState, useEffect } from 'react';
import { Container, Heading, Box, VStack, Button, IconButton, Spacer } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function EditVideoListPage() {
    const [ enabled, setEnabled ] = useState(false);
    const [videoList, setVideoList] = useState([
        { id: "1", name: 'Video 1' },
        { id: "2", name: 'Video 2' },
        { id: "3", name: 'Video 3' },
    ]);
    const [draggingIndex, setDraggingIndex] = useState(null);

    // Fetch video list from backend on component mount
    useEffect(() => {
        // fetchVideoList();
    }, []);

    const fetchVideoList = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/videos`);
            const data = await response.json();
            setVideoList(data);
        } catch (error) {
            console.error('Error fetching video list:', error);
        }
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/videos/${videoId}`, {
                method: 'DELETE',
            });
            // Remove deleted video from the list
            setVideoList((prevList) => prevList.filter((video) => video.id !== videoId));
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(videoList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setVideoList(items);
    };

    const handleDragStart = (event, index) => {
        event.dataTransfer.setData('index', index);
    };

    // Handle updating the order
    const handleUpdateOrder = async () => {
        try {
            // Update the order on the backend
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/videos/update-order`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(videoList.map((video) => video.id)),
            });
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="videoList" direction="vertical">
                {(provided) => (
                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                        {videoList.map((video, index) => (
                            <Draggable
                                key={video.id}
                                draggableId={video.id} // Use a unique string identifier
                                index={index}
                                isDragDisabled={draggingIndex === index}
                            >
                                {(provided) => (

                                        <Box border="1px solid gray" p={4} display="flex" alignItems="center"
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        onDragStart={() => handleDragStart(index)}
                                        >
                                            <Box flex={1}>{video.name}</Box>
                                            <Button
                                                colorScheme="red"
                                                onClick={() => handleDeleteVideo(video.id)}
                                                leftIcon={<FontAwesomeIcon icon={faTrash} />}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default EditVideoListPage;
