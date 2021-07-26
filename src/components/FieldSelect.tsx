import React from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField } from "@ezform/core";
import {MenuItem, TextField} from "@material-ui/core";

interface FieldSelectProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	variant?: "filled" | "outlined" | "standard";
}

export const FieldSelect = (props: FieldSelectProps) => {
	const { id, name, form, validator = () => null, disabled, label, options, variant = "standard" } = props;

	useField(name, validator, form);

	const handleChange = (e) => {
		form.setField(name, e.target.value);
	};

	return (
		<TextField
			select
			label={label}
			variant={variant}
			id={id}
			value={form.fields?.[name] || ""}
			onChange={handleChange}
			disabled={disabled}
			error={form.hasError(name)}
			fullWidth
			helperText={form.getHelperText(name)}
		>
			{options.map((option) => (
				<MenuItem key={option.key} value={option.value} disabled={option?.disabled || false}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
};
