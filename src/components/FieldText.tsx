import React, { memo } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import { TextField } from "@material-ui/core";
import {FieldReadonly} from "./FieldReadonly";

export interface FieldTextProps extends FieldBaseProps {
	multiline?: boolean;
	variant?: "filled" | "outlined" | "standard";
	color?: "primary" | "secondary";
	placeholder?: string;
}

export const FieldText = memo((props: FieldTextProps) => {
	const { id, name, form, validator = () => null, disabled, readonly = form.isReadonly, label, multiline = false, variant = "standard", color = "primary", placeholder, defaultValue } = props;

	useField(name, validator, form, defaultValue);

	const handleChange = (e) => {
		form.setField(name, e.target.value);
	};

	if (readonly) {
		return (
			<FieldReadonly
				variant={variant}
				color={color}
				name={name}
				id={id}
				label={label}
				value={form.getField(name) || ""}
				multiline={multiline}
				placeholder={placeholder}
				fullWidth
			/>
		)
	}

	return (
		<TextField
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
			multiline={multiline}
			placeholder={placeholder}
			fullWidth
		/>
	);
}, propsEqual);
