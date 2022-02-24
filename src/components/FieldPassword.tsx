import React, { memo } from "react";
import { FieldBaseProps } from "./FieldBase";
import { propsEqual, useField } from "@ezform/core";
import { TextField } from "@material-ui/core";

export interface FieldPasswordProps extends FieldBaseProps {
	variant?: "filled" | "outlined" | "standard";
	color?: "primary" | "secondary";
	placeholder?: string;
}

export const FieldPassword = memo((props: FieldPasswordProps) => {
	const { id, name, form, validator = () => null, disabled, readonly = form.isReadonly, label, variant = "standard", color = "primary", placeholder } = props;

	useField(name, validator, form);

	const handleChange = (e) => {
		form.setField(name, e.target.value);
	};

	return (
		<TextField
			type="password"
			variant={variant}
			color={color}
			name={name}
			id={id}
			label={label}
			onChange={handleChange}
			value={form.getField(name) || ""}
			disabled={disabled}
			error={form.hasError(name)}
			helperText={form.getHelperText(name)}
			multiline={false}
			placeholder={placeholder}
			fullWidth
			InputProps={{ readOnly: readonly }}
		/>
	);
}, propsEqual);
