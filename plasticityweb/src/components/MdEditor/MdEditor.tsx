// @ts-nocheck
import { Button } from "@chakra-ui/react";
import MDEditor, { commands, ICommand, TextState, TextAreaTextApi } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";

const MdEditor = ({ currentFormData, setFormData, setNextSteps }: any) => {
  const [usernotes, setUserNotes] = useState("");

  const title3: ICommand = {
    name: "Continue",
    icon: (
      <Button margin={0} size="xs">
        Continue
      </Button>
    ),
    keyCommand: "Continue",
    buttonProps: { "aria-label": "CONTINUE" },
    value: "Continue",
    execute: (state: TextState, api: TextAreaTextApi) => {
      setFormData({ ...currentFormData, notes: state });
      setNextSteps(2);
    },
  };
  return (
    <div className="container">
      <MDEditor
        value={usernotes}
        visiableDragbar={true}
        onChange={setUserNotes}
        preview="edit"
        height={500}
        extraCommands={[
          // Custom Toolbars
          commands.divider,
          title3,
        ]}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <MDEditor.Markdown source={usernotes} rehypePlugins={[[rehypeSanitize]]} />
    </div>
  );
};

export default MdEditor;
