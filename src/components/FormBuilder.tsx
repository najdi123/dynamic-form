import { useState } from "react";

import { Button } from "@mui/material";

import { Element } from "../types/form";
import CreateCheckboxElement from "./CreateCheckboxElement";
import CreatedForm from "./CreatedForm";
import CreateTextField from "./CreateTextField";

const FormBuilder = () => {
  const [elementList, setElementList] = useState<Element[]>([]);
  const [isCreating, setIsCreating] = useState<"text" | "checkbox" | null>(
    null
  );

  const handleCreateElement = () => {
    setIsCreating("text");
  };
  const handleCreateCheckbox = () => {
    setIsCreating("checkbox");
  };

  const handleAddElement = (newElement: Element) => {
    setElementList([...elementList, newElement]);
    setIsCreating(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ backgroundColor: "#eee", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Button onClick={() => handleCreateElement()}>Add Text Field</Button>
          <Button onClick={() => handleCreateCheckbox()}>
            Add Checkbox Field
          </Button>
        </div>

        {isCreating === "text" ? (
          <CreateTextField
            setIsCreating={setIsCreating}
            handleAddElement={handleAddElement}
          />
        ) : isCreating === "checkbox" ? (
          <CreateCheckboxElement
            setIsCreating={setIsCreating}
            handleAddElement={handleAddElement}
          />
        ) : null}
      </div>
      <div>
        <CreatedForm elementList={elementList} />
      </div>
    </div>
  );
};

export default FormBuilder;
