import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Element } from "../types/form";
import { useFormStore } from "../store/useFormStore";
import * as yup from "yup";

type Props = {
  setIsCreating: React.Dispatch<
    React.SetStateAction<"text" | "checkbox" | null>
  >;
};

type CreateCheckboxFormData = {
  label: string;
  isRequired?: boolean;
  choices: {
    name: string;
  }[];
};

const checkboxSchema = yup.object({
  label: yup.string().required("Label is required"),
  isRequired: yup.boolean().optional(),
  choices: yup
    .array(
      yup.object({
        name: yup.string().required("Choice name is required"),
      })
    )
    .min(1, "At least one choice is required")
    .required(),
});

export default function CreateCheckboxElement({ setIsCreating }: Props) {
  const addElement = useFormStore((state) => state.addElement);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCheckboxFormData>({
    resolver: yupResolver(checkboxSchema),
    defaultValues: {
      label: "",
      isRequired: false,
      choices: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
  });

  const onSubmit = (data: CreateCheckboxFormData) => {
    const finalId = `${Date.now()}`;

    const finalChoices = data.choices.map((choice, index) => ({
      ...choice,
      id: `${finalId}-choice-${index}`,
    }));

    const newElement: Element = {
      id: finalId,
      type: "checkbox",
      label: data.label,
      isRequired: data.isRequired,
      choices: finalChoices,
    };

    // Add to Zustand
    addElement(newElement);

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
              label="Checkbox Label"
              error={!!errors.label}
              helperText={errors.label?.message}
            />
          )}
        />
      </div>

      {/* Required? */}
      <div style={{ marginTop: "8px" }}>
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

      {/* Choices */}
      <div style={{ margin: "16px 0" }}>
        <h4>Choices</h4>
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: "flex", marginBottom: 8 }}>
            <Controller
              name={`choices.${index}.name` as const}
              control={control}
              render={({ field: rhfField }) => (
                <TextField
                  {...rhfField}
                  label={`Choice #${index + 1}`}
                  size="small"
                  error={!!errors.choices?.[index]?.name}
                  helperText={errors.choices?.[index]?.name?.message}
                />
              )}
            />

            {fields.length > 1 && (
              <Button
                type="button"
                style={{ marginLeft: 8 }}
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={() => append({ name: "" })}>
          + Add Another Choice
        </Button>
      </div>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Button onClick={() => setIsCreating(null)} style={{ marginLeft: 8 }}>
        Cancel
      </Button>
    </form>
  );
}
