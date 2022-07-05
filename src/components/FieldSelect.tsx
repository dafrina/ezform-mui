import React, { memo } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import { MenuItem, TextField } from "@material-ui/core";
import {FieldReadonly} from "./FieldReadonly";

export interface FieldSelectProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	variant?: "filled" | "outlined" | "standard";
}

export const FieldSelect = memo((props: FieldSelectProps) => {
	const { id, name, form, validator = () => null, disabled, readonly = form.isReadonly, label, options, variant = "standard", defaultValue } = props;

	useField(name, validator, form, defaultValue);

	const handleChange = (e) => {
		form.setField(name, e.target.value);
	};

	if (readonly) {
		return (
			<FieldReadonly
				variant={variant}
				name={name}
				id={id}
				label={label}
				value={options.find((f) => f.value === form.getField(name))?.label || ""}
				fullWidth
			/>
		);
	}

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
		>
			{options.map((option) => (
				<MenuItem key={option.key} value={option.value} disabled={option?.disabled || false}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}, propsEqual);
