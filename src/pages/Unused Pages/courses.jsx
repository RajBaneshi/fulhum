import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Heading, Image, Grid, GridItem, Text } from '@chakra-ui/react';

// Dummy data for courses
const courses = [
  {
    id: 1,
    title: 'Course 1',
    thumbnail: '/fallback.png',
  },
  {
    id: 2,
    title: 'Course 2',
    thumbnail: '/fallback.png',
  },
];

function MyCourses() {
  return (
    <>
    <Heading size="lg" mt="4" ml="4">
    My Courses
  </Heading>

  <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="4" mt="4">
    {courses.map((course) => (
      <Link to={`/player/${course.id}`} key={course.id}>
        <Box p="4" bg="white" borderRadius="md" boxShadow="md" cursor="pointer" transition="box-shadow 0.2s" marginLeft="8px">
          <Image src={course.thumbnail} alt={course.title} height="150px" objectFit="cover" mb="2" borderRadius="md" />
          <Text fontSize="lg" fontWeight="bold">
            {course.title}
          </Text>
        </Box>
      </Link>
    ))}
  </Grid>
  </>
  );
}

export default MyCourses;
