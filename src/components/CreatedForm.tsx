import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Element } from "../types/form";
type Props = { elementList: Element[] };
const CreatedForm = ({ elementList }: Props) => {
  return (
    <>
      {elementList.map((element) => {
        return (
          <div key={element.id}>
            {element.type === "text" && (
              <TextField
                style={{ margin: "15px 0 0" }}
                label={element.label}
                required={element.isRequired}
              />
            )}
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
    </>
  );
};

export default CreatedForm;
