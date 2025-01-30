import React from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useFormStore } from "../store/useFormStore";
import { Element } from "../types/form";

const CreatedForm = () => {
  const elements = useFormStore((state) => state.elements);

  return (
    <React.Fragment>
      {elements.map((element: Element) => {
        return (
          <div key={element.id}>
            {/* Text Field */}
            {element.type === "text" && (
              <TextField
                style={{ margin: "15px 0 0" }}
                label={element.label}
                required={element.isRequired}
              />
            )}

            {/* Checkbox */}
            {element.type === "checkbox" && (
              <div>
                {/* Show the main checkbox label */}
                <div style={{ fontWeight: "bold", margin: "15px 0 5px" }}>
                  {element.label} {element.isRequired && "*"}
                </div>

                {/* Render each choice as its own checkbox */}
                {element.choices?.map((choice) => (
                  <FormControlLabel
                    key={choice.id}
                    control={<Checkbox />}
                    label={choice.name}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CreatedForm;
