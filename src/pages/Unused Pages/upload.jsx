import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

function UploadPage() {
  const [moduleName, setModuleName] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [utterances, setUtterances] = useState("");
  const fileInput = useRef(null);

  const handleVideoFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleUpload = () => {
    // You can implement the upload logic here
    console.log("Module Name:", moduleName);
    console.log("Video File:", videoFile);
    console.log("Utterances:", utterances);
    let formData = new FormData();
    formData.append('module', moduleName)
    formData.append('file', videoFile)
    formData.append('utterances', utterances)
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`, formData).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <Container maxW="xl" mt={6}>
      <Heading mb={4}>Upload Video</Heading>
      <Box>
        <Input
          placeholder="Module Name"
          mb={4}
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoFileChange}
          style={{ display: "none" }}
          ref={fileInput}
        />
        <Button
          mb={4}
          onClick={() => {
            if (fileInput.current) fileInput.current.click();
          }}
        >
          Browse Video
        </Button>
        <Box
          border="2px dashed gray"
          p={4}
          mb={4}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            console.log(file);
            setVideoFile(file);
          }}
          onDragOver={(e) => {e.preventDefault()}}
        >
          Drag & Drop Video File Here
        </Box>
        <Textarea
          placeholder="Utterances"
          mb={4}
          value={utterances}
          onChange={(e) => setUtterances(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleUpload}>
          Upload
        </Button>
      </Box>
    </Container>
  );
}

export default UploadPage;
