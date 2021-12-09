import React, { memo } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import { MenuItem, TextField } from "@material-ui/core";

export interface FieldSelectProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	variant?: "filled" | "outlined" | "standard";
}

export const FieldSelect = memo((props: FieldSelectProps) => {
	const { id, name, form, validator = () => null, disabled, readonly, label, options, variant = "standard" } = props;

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
			value={form.getField(name) || ""}
			onChange={handleChange}
			disabled={disabled}
			error={form.hasError(name)}
			fullWidth
			helperText={form.getHelperText(name)}
			InputProps={{readOnly: readonly}}
		>
			{options.map((option) => (
				<MenuItem key={option.key} value={option.value} disabled={option?.disabled || false}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}, propsEqual);
