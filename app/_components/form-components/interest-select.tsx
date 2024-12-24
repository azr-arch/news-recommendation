import { Control, Controller, FieldErrors } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LoginFormData } from "@/lib/types";
import { categories } from "@/lib/categories";

type InterestsSelectProps = {
    control: Control<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    disabled?: boolean;
};

export const InterestsSelect = ({ control, errors, disabled }: InterestsSelectProps) => {
    return (
        <div className="space-y-3">
            <Label>Interests (select 1-5)</Label>
            <div className="grid grid-cols-3 gap-2">
                <Controller
                    name="interests"
                    control={control}
                    disabled={disabled}
                    rules={{
                        required: "Please select at least one interest",
                        validate: (value) =>
                            (value && value.length >= 1 && value.length <= 5) ||
                            "Please select between 1 and 5 interests",
                    }}
                    render={({ field }) => (
                        <>
                            {categories.map((category) => (
                                <div key={category.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={category.id}
                                        checked={field.value?.includes(category.id)}
                                        onCheckedChange={(checked) => {
                                            const updatedInterests = checked
                                                ? [...(field.value || []), category.id]
                                                : (field.value || []).filter(
                                                      (i: string) => i !== category.id
                                                  );
                                            field.onChange(updatedInterests);
                                        }}
                                    />
                                    <Label htmlFor={category.id}>{category.label}</Label>
                                </div>
                            ))}
                        </>
                    )}
                />
            </div>
            {errors.interests && (
                <p className="text-sm text-destructive">{errors.interests.message}</p>
            )}
        </div>
    );
};
