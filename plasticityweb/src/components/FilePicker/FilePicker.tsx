import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import ReactS3Client from "react-aws-s3-typescript";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../../api/course";
// @ts-ignore
window.Buffer = window.Buffer || require("buffer").Buffer;

const s3Config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME || "",
  region: process.env.REACT_APP_REGION || "",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || "",
};

const FilePicker = ({ currentFormData, setCurrentFormData, setnextSteps }: any) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (file: any, filename: any) => {
    const s3 = new ReactS3Client(s3Config);

    try {
      const res = await s3.uploadFile(file, filename);
      setCurrentFormData({ ...currentFormData, video: { url: res.location, title: "TEST TITLE" } });
      const courseRes = await createCourse({
        ...currentFormData,
        video: { url: [res.location], title: "TEST TITLE" },
      });
      setnextSteps(3);
      if (courseRes) {
        navigate("/dashboard");
      } else {
        navigate("/createcourse");
      }
    } catch (exception) {
      console.log(exception);
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      <br />
      <button onClick={() => uploadFile(selectedFile, "TEST_NEW_EDUTECH_VIDEO")}>
        Upload to S3
      </button>
    </div>
  );
};

export default FilePicker;
