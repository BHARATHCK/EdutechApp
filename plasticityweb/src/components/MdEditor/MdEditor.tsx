//@ts-nocheck
import { Box, Button, Text } from "@chakra-ui/react";
import MDEditor, { commands, ICommand, TextState, TextAreaTextApi } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import { createCourse } from "../../api/course";

const MdEditor = ({ currentFormData, setFormData, setNextSteps }: any) => {
  const [usernotes, setUserNotes] = useState(currentFormData?.notes || "");
  const [notesError, setNotesError] = useState("");

  const customContinueCommand: ICommand = {
    name: "Continue",
    icon: (
      <Button margin={0} size="xs">
        {currentFormData.courseType === "Notes Only" ? "Publish" : "Continue"}
      </Button>
    ),
    keyCommand: "Continue",
    buttonProps: { "aria-label": "CONTINUE" },
    value: "Continue",
    execute: (state: TextState, api: TextAreaTextApi) => {
      if (state.text === "") {
        setNotesError("This Feild is Required");
        return;
      }
      setUserNotes(state.text);
      setFormData({ ...currentFormData, notes: state.text });
      if (currentFormData?.courseType === "Notes Only") {
        setNextSteps(4);
      } else {
        setNextSteps(3);
      }
    },
  };

  useEffect(() => {
    if (usernotes) {
      setNotesError("");
    }
    const currentFormDataWithNotes = currentFormData;
    currentFormDataWithNotes.notes = usernotes;
    setFormData(currentFormDataWithNotes);
  }, [usernotes]);

  return (
    <Box m={10} w={[300, 500, 700]}>
      {notesError && <Text color={"red.600"}>{notesError}</Text>}
      <MDEditor
        value={usernotes}
        visiableDragbar={true}
        onChange={setUserNotes}
        preview="edit"
        height={500}
        extraCommands={[
          // Custom Toolbars
          commands.divider,
          customContinueCommand,
        ]}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />

      <MDEditor.Markdown source={usernotes} rehypePlugins={[[rehypeSanitize]]} />
    </Box>
  );
};

export default MdEditor;
