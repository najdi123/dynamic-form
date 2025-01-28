// CreateElement.tsx
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Element } from "../types/form";

type CreateTextFieldFormData = {
  label: string;
  isRequired?: boolean;
};

// Schema for text fields
const textFieldSchema = yup.object({
  label: yup.string().required("Label is required"),
  isRequired: yup.boolean().optional(),
});

type Props = {
  setIsCreating: React.Dispatch<
    React.SetStateAction<"text" | "checkbox" | null>
  >;
  handleAddElement: (element: Element) => void;
};

export default function CreateElement({
  setIsCreating,
  handleAddElement,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTextFieldFormData>({
    resolver: yupResolver(textFieldSchema),
    defaultValues: {
      label: "",
      isRequired: false,
    },
  });
  const onError = (errors: unknown) => {
    console.log("Validation failed. Errors:", errors);
  };
  const onSubmit = (data: CreateTextFieldFormData) => {
    const newElement: Element = {
      id: `${Date.now()}`,
      type: "text", // fixed "text"
      label: data.label,
      isRequired: data.isRequired,
    };
    handleAddElement(newElement);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <Controller
          name="label"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Label"
              error={!!errors.label}
              helperText={errors.label?.message}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="isRequired"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Required"
            />
          )}
        />
      </div>
      <Button variant="contained" type="submit" style={{ marginRight: "8px" }}>
        Submit
      </Button>
      <Button onClick={() => setIsCreating(null)}>Cancel</Button>
    </form>
  );
}
