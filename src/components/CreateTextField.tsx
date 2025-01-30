import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Element } from "../types/form";
import { useFormStore } from "../store/useFormStore"; // <-- import store
import * as yup from "yup";

type CreateTextFieldFormData = {
  label: string;
  isRequired?: boolean;
};

const textFieldSchema = yup.object({
  label: yup.string().required("Label is required"),
  isRequired: yup.boolean().optional(),
});

type Props = {
  setIsCreating: React.Dispatch<
    React.SetStateAction<"text" | "checkbox" | null>
  >;
};

export default function CreateTextField({ setIsCreating }: Props) {
  // Access addElement from the store
  const addElement = useFormStore((state) => state.addElement);

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

  const onSubmit = (data: CreateTextFieldFormData) => {
    const newElement: Element = {
      id: `${Date.now()}`,
      type: "text",
      label: data.label,
      isRequired: data.isRequired,
    };

    // Instead of calling handleAddElement, call the store’s addElement
    addElement(newElement);

    // Then close out the creation modal or whatever logic you want
    setIsCreating(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Label */}
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

      {/* Required Checkbox */}
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
