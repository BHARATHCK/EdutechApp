import { useState } from "react";
import ReactS3Client from "react-aws-s3-typescript";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../api/course";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Video } from "../../types";
import { v4 as uuid } from "uuid";
import { useFetchAllCourses } from "../../useFetch";

// @ts-ignore
window.Buffer = window.Buffer || require("buffer").Buffer;

const s3Config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME || "",
  region: process.env.REACT_APP_REGION || "",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || "",
};

const FilePicker = ({ currentFormData, setCurrentFormData, setnextSteps }: any) => {
  const { setClearCache } = useFetchAllCourses(process.env.REACT_APP_BACKEND_URL);
  const [formValues, setFormValues] = useState(
    currentFormData.videos || [
      { videotitle: "", videodescription: "", video: "", selectedFile: {} },
    ],
  );
  const navigate = useNavigate();

  const uploadFile = async (file: any, filename: any) => {
    const s3 = new ReactS3Client(s3Config);
    let res;
    try {
      res = await s3.uploadFile(file, filename);
      setnextSteps(3);
    } catch (exception) {
      navigate("/dashboard");
    }

    return res;
  };

  const handleChange = (i: number, e: any) => {
    let newFormValues = [...formValues];
    if (e.target.files && e.target.files.length > 0) {
      //@ts-ignore
      newFormValues[i]["selectedFile"] = e.target.files;
    }

    //@ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    setCurrentFormData({ ...currentFormData, videos: newFormValues });
  };

  let removeFormFields = (i: any) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    setCurrentFormData({ ...currentFormData, videos: newFormValues });
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { video: "", videodescription: "", videotitle: "", selectedFile: {} },
    ]);
    const newVideoFormData = currentFormData;
    newVideoFormData.videos = [
      ...formValues,
      { video: "", videodescription: "", videotitle: "", selectedFile: {} },
    ];
    setCurrentFormData(newVideoFormData);
  };

  const handleSubmit = () => {
    let courseVideoData: Video[] = [];
    const promiseArray: any[] = [];
    formValues.map((videoDetails: any, index: number) => {
      const res = uploadFile(formValues[index].selectedFile, uuid());
      promiseArray.push(res);
    });
    Promise.all(promiseArray).then((data) => {
      if (data.length != formValues.length) {
        // TODO: Handle error
        console.log("SOMETHING WENT WRONG");
      }
      data.map((res, index) => {
        courseVideoData.push({
          videoUrl: res?.location || "",
          videoTitle: formValues[index].videotitle,
          videoDescription: formValues[index].videodescription,
          author: currentFormData.author,
          id: 1,
        });
      });

      const courseRes = createCourse({
        ...currentFormData,
        videos: courseVideoData,
      });

      courseRes
        .then((res) => {
          if (res) {
            setClearCache(true);
            navigate("/publish", { state: { isSuccess: true } });
          }
        })
        .catch((error) => {
          setClearCache(true);
          navigate("/publish", { state: { isSuccess: false } });
        });
    });
  };

  return (
    <Box m={10} w={[300, 400, 500]}>
      {formValues.map((element: any, index: number) => (
        <div className="form-inline" key={index}>
          <FormControl mt={10}>
            <FormLabel htmlFor="videotitle">Video Title</FormLabel>
            <Input
              id="videotitle"
              name="videotitle"
              value={element.videotitle || ""}
              onChange={(e) => handleChange(index, e)}
            />
          </FormControl>
          <FormControl mt={10}>
            <FormLabel htmlFor="videodescription">Video Description</FormLabel>
            <Input
              id="videodescription"
              name="videodescription"
              value={element.videodescription || ""}
              onChange={(e) => handleChange(index, e)}
            />
          </FormControl>

          <FormControl mt={10}>
            <FormLabel htmlFor="video">Video File</FormLabel>
            <input
              id="video"
              type="file"
              name="video"
              value={""}
              onChange={(e) => handleChange(index, e)}
            />
            {element.video}
          </FormControl>
          {index ? (
            <Button
              mt="1.5"
              size="xs"
              type="button"
              className="button remove"
              onClick={() => removeFormFields(index)}
            >
              Remove Row
            </Button>
          ) : null}
        </div>
      ))}
      <Button
        variant="outline"
        _hover={{ bg: "blue.400", borderColor: "teal.700" }}
        mt={10}
        mr={10}
        className="button add"
        type="button"
        onClick={() => addFormFields()}
      >
        Add Row
      </Button>
      <Button
        variant="outline"
        _hover={{ bg: "blue.400", borderColor: "teal.700" }}
        mt={10}
        className="button add"
        type="button"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default FilePicker;
