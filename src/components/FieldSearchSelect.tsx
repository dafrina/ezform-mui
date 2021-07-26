import React from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField } from "@ezform/core";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface FieldSearchSelectProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	variant?: "filled" | "outlined" | "standard";
}

export const FieldSearchSelect = (props: FieldSearchSelectProps) => {
	const { id, name, form, validator = () => null, disabled, label, options, variant = "standard" } = props;

	useField(name, validator, form);

	const handleChange = (e: any, selected: any) => {
		if (selected) {
			form.setField(name, selected.value);
		} else {
			form.setField(name, null);
		}
	};

	return (
		<Autocomplete
			id={id}
			onChange={handleChange}
			disabled={disabled}
			fullWidth
			options={options}
			getOptionLabel={(option) => option?.label || ""}
			getOptionDisabled={(option) => option?.disabled || ""}
			getOptionSelected={(option) => option?.value || ""}
			value={form.fields?.[name]}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant={variant}
					error={form.hasError(name)}
					helperText={form.getHelperText(name)}
					fullWidth
				/>
			)}
		/>
	);
};
