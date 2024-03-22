import {
  Button,
  Flex,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import {
  faPencil,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Like({ storeReviewData, id }) {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [pencil, setPencil] = useState(false);
  const [pencilValue, setPencilValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  return (
    <Flex gap={2}>
      <Button
        size={"xs"}
        leftIcon={<FontAwesomeIcon icon={faThumbsUp} />}
        onClick={() => {
          setLike(!like);
          setDislike(false);
          storeReviewData(id, true, false, null);
        }}
        colorScheme={like ? "blue" : "gray"}
      />
      <Button
        size={"xs"}
        leftIcon={<FontAwesomeIcon icon={faThumbsDown} />}
        onClick={() => {
          setDislike(!dislike);
          setLike(false);
          storeReviewData(id, false, true, null);
        }}
        colorScheme={dislike ? "blue" : "gray"}
      />
      {/* <Popover isOpen={isPopoverOpen} onClose={handleClosePopover}>
        <PopoverTrigger>
          <Button
            size={"xs"}
            leftIcon={<FontAwesomeIcon icon={faPencil} />}
            onClick={() => {
              window.open(`/upload`, '_blank'); 
            }}
            colorScheme={pencil ? "blue" : "gray"}
          />
        </PopoverTrigger>
        <PopoverContent z-index="1" border="1px">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader borderBottom="1px">Expected answer</PopoverHeader>
          <PopoverBody gap={2} display={"flex"} flexDir={"column"}>
            <Input
              type="text"
              placeContent={"Enter expected answer"}
              border="1px"
              onChange={(e) => {
                setPencilValue(e.target.value);
                console.log("e.target.value : ", e.target.value);
              }}
            />
            <Button
              onClick={() => {
                storeReviewData(id, false, false, pencilValue);
                setIsPopoverOpen(false);
              }}
              backgroundColor="blue.300"
            >
              Submit
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover> */}
    </Flex>
  );
}

export default Like;
