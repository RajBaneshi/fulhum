import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Dummy data for the course thumbnails
  const courseThumbnails = [
    { id: 1, title: "Course 1", imageUrl: "/fallback.png" },
    { id: 2, title: "Course 2", imageUrl: "/fallback.png" },
    // Add more courses here...
  ];

  // Dummy data for the stats
  const stats = {
    coursesCompleted: 5,
    hoursWatched: 20,
    questionsAsked: 10,
  };

  return (
    <Container maxW="container.lg" py={8}>
      {/* "Continue Course" section */}
      <Heading size="lg" mb={4}>
        Continue Course
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} gap={4}>
        {courseThumbnails.map((course) => (
          <Link key={course.id} to="/player">
            <Box
              // bg="gray.200"
              p={4}
              borderRadius="md"
              _hover={{ cursor: "pointer" }}
            >
              {/* Course Thumbnail */}
              <Box
                bgImage={`url(${course.imageUrl})`}
                bgSize="cover"
                bgPosition="center"
                height="150px"
                borderRadius="md"
              />
              {/* Course Title */}
              <Heading size="md" mt={2}>
                {course.title}
              </Heading>
            </Box>
          </Link>
        ))}
      </SimpleGrid>

      {/* Stats section */}
      <Flex mt={8} justifyContent="space-between" alignItems="center">
        <Box>
          <Heading size="lg">Stats</Heading>
          <Text mt={2}>
            Number of Courses Completed: {stats.coursesCompleted}
          </Text>
          <Text>Hours of Course Watched: {stats.hoursWatched}</Text>
          <Text>Number of Questions Asked: {stats.questionsAsked}</Text>
        </Box>
        {/* Add other components for stats */}
      </Flex>
    </Container>
  );
};

export default Dashboard;
