import React from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField } from "@ezform/core";
import { TextField } from "@material-ui/core";

export interface FieldTextProps extends FieldBaseProps {
	multiline?: boolean;
	variant?: "filled" | "outlined" | "standard";
	color?: "primary" | "secondary";
	placeholder?: string;
}

export const FieldText = (props: FieldTextProps) => {
	const { id, name, form, validator = () => null, disabled, label, multiline = false, variant = "standard", color = "primary", placeholder } = props;

	useField(name, validator, form);

	const handleChange = (e) => {
		form.setField(name, e.target.value);
	};

	return (
		<TextField
			variant={variant}
			color={color}
			name={name}
			id={id}
			label={label}
			onChange={handleChange}
			value={form.fields?.[name] || ""}
			disabled={disabled}
			error={form.hasError(name)}
			helperText={form.getHelperText(name)}
			multiline={multiline}
			placeholder={placeholder}
			fullWidth
		/>
	);
};
