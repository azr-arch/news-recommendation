import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LoginFormData } from "@/lib/types";
import { countries } from "@/lib/countries";

type CountrySelectProps = {
    control: Control<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    disabled?: boolean;
};

export const CountrySelect = ({ control, errors, disabled }: CountrySelectProps) => {
    const [countryOptions, setCountryOptions] = useState<{ code: string; name: string }[]>([]);

    const loadCountryOptions = () => {
        // Simulate lazy loading of country options
        setTimeout(() => {
            setCountryOptions(countries);
        }, 100);
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Controller
                name="country"
                control={control}
                disabled={disabled}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        onOpenChange={loadCountryOptions}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countryOptions.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
        </div>
    );
};
