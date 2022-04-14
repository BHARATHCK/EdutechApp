import { useEffect } from "react";
import { useFilePicker } from "use-file-picker";

const FilePicker = ({ currentFormData, setCurrentFormData, setnextSteps }: any) => {
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: ".mp4",
  });

  useEffect(() => {
    console.log("FINAL FORM DATA UNTIL NOW : ", currentFormData);
  }, [currentFormData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => openFileSelector()}>Select files </button>
      <br />
      {filesContent.map((file, index) => (
        <div>
          <h2>{file.name}</h2>
          <div key={index}>{file.content}</div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default FilePicker;
