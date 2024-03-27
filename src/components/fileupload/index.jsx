

import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FileUploadComponent = () => {
  const [file, setFile] = useState(null);

  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
    setError(null);
  };

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
    setError(null);
  };

  const handleSubmit = () => {
    setUploading(true);
    let formData = new FormData();
    formData.append('file', file);
    formData.append('question', question);
    formData.append('answer', answer);

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/formdata/upload`, formData)
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        setTimeout(() => {
          setUploading(false);
          setSubmitted(true);
          setTimeout(()=>{
            window.close();
          },3000)
        }, 2000);
      })
      .catch((error) => {
        setUploading(false);
        setError("Something went wrong!");
        console.error('Error uploading file!');
      })
  };

  return (
    <div className="flex justify-center h-5/6 " >
    <div className="flex flex-col justify-start items-center lg:w-3/6 md:w-10/12 sm:w-full text-center">
        <h1 style={{ color: "royalblue", fontSize: "40px" }} className='mb-4'>
          Suggestions
        </h1>

        {
          submitted ?
            <>
              <p clasName="mt-5">Thank you for your submission. Your feedback is valuable for the improvement of this service.</p>
              <div className="h-40 w-40 bg-blue-600 text-xl rounded-full text-white mt-8 flex flex-col items-center justify-center">
                <FontAwesomeIcon
                  style={{ fontSize: "73px" }}
                  icon={faCheck} />
              </div>
              <p className="mt-5 text-md"> You can now close this window.</p>
            </>
            :
            <>
              <p className="p-5 text-sm">
                Thank you for considering raising a ticket for the humanoid. Here you can provide us with
                a question of concern with a corresponding answer so we can improve your experience.
              </p>

              <div className="flex flex-col lg:w-9/12 md:w-10/12 sm:w-full text-left text-sm ">
                <div className="mb-5">
                  <h1 className="py-1">
                    Please provide the question of concern
                  </h1>
                  <input
                    className="p-2 shadow w-full rounded"
                    type="text"
                    placeholder="Question"
                    onChange={handleQuestion}
                    value={question}
                  />
                </div>
                <div className="mb-5">
                  <h1 className="py-1">
                    Please provide an answer you would expect to this question
                  </h1>
                  <textarea
                    className="p-2 shadow w-full rounded"
                    type="text"
                    placeholder="Answer"
                    onChange={handleAnswer}
                    value={answer}
                  />
                </div>
                <div className="mb-5">
                  <h1 className="py-1">
                    If there are any images you would expect to see with this answer, please upload them below. Please note that only JPGs, JPEGs and PNGs are supported.
                  </h1>
                  <input
                    className="text-right w-full bg-gray-300 px-2 py-1 text-white rounded-full my-2"
                    type="file"
                    onChange={handleFileChange}
                  />
                  {/* <button className="py-1 px-5 text-md font bg-blue-600 text-white rounded-full" onClick={handleUpload}>
                    Upload
                  </button> */}
                  {/* <ProgressBarContainer>
                  <ProgressBar style={props} />
                </ProgressBarContainer> */}
                </div>
              </div>
              <button
                className="py-1 px-5 text-md font bg-blue-600 text-white rounded-full"
                onClick={handleSubmit}>
                Submit
              </button>
              <div className="py-5">

                {error && <p className="text-md text-red-700">{error}</p>}
                {uploading &&
                  <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                  </div>
                }
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default FileUploadComponent;
