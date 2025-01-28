import { useState } from "react";

import { Button } from "@mui/material";
import CreateCheckboxElement from "./CreateCheckboxElement";
import CreatedForm from "./CreatedForm";
import CreateTextField from "./CreateTextField";
import { useFormStore } from "../store/useFormStore";

const FormBuilder = () => {
  const [isCreating, setIsCreating] = useState<"text" | "checkbox" | null>(
    null
  );
  const resetElements = useFormStore((state) => state.resetElements);
  const handleCreateElement = () => {
    setIsCreating("text");
  };
  const handleCreateCheckbox = () => {
    setIsCreating("checkbox");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ backgroundColor: "#eee", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem", display: "flex", gap: "5px" }}>
          <Button onClick={() => handleCreateElement()}>Add Text Field</Button>
          <Button onClick={() => handleCreateCheckbox()}>
            Add Checkbox Field
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={resetElements} // Call resetElements to clear the store
          >
            Reset Elements
          </Button>
        </div>

        {isCreating === "text" ? (
          <CreateTextField setIsCreating={setIsCreating} />
        ) : isCreating === "checkbox" ? (
          <CreateCheckboxElement setIsCreating={setIsCreating} />
        ) : null}
      </div>
      <div>
        <CreatedForm />
      </div>
    </div>
  );
};

export default FormBuilder;
