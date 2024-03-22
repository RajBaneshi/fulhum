import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Spinner } from '@chakra-ui/react';
import axios from 'axios';

function History({
  isLandscape
}) {
  const [videos, setVideos] = useState([
    { id: 1, videoName: 'Video 1', question: 'What is your favorite color?', timestamp: '2023-07-19 10:00 AM' },
    { id: 2, videoName: 'Video 2', question: 'How do you spend your weekends?', timestamp: '2023-07-19 11:30 AM' },
    { id: 3, videoName: 'Video 3', question: 'What is your dream travel destination?', timestamp: '2023-07-19 01:15 PM' },
  ]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      axios.get('https://nluapi.tranzcribed.com:9020/formdata')
        .then(res => {
          // setVideos(response.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }, []);

  return (
    <Box overflowX="auto">
      {loading ? (
        <Spinner />
      ) : (
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>Video Name</Th>
              <Th>Question</Th>
              <Th>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            {videos.map(video => (
              <Tr key={video.id}>
                <Td>{video.videoName}</Td>
                <Td>{video.question}</Td>
                <Td>{video.timestamp}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default History;