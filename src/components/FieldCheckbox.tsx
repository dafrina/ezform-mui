import React, { memo } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import { FormControl, FormControlLabel, Checkbox, FormHelperText } from "@material-ui/core";

export interface FieldCheckboxProps extends FieldBaseProps {
	color?: "default" | "primary" | "secondary";
}

export const FieldCheckbox = memo((props: FieldCheckboxProps) => {
	const { id, name, form, validator = () => null, disabled, readonly = form.isReadonly, label, color = "secondary" } = props;

	useField(name, validator, form);

	const handleChange = (e, value) => {
		form.setField(name, value);
	};

	return (
		<FormControl error={form.hasError(name)}>
			<FormControlLabel
				control={
					<Checkbox
						id={id}
						disabled={disabled}
						checked={form.getField(name) || false}
						value={form.getField(name) || ""}
						onChange={!readonly && handleChange}
						name={name}
						color={color}
						readOnly={readonly}
					/>
				}
				label={label}
			/>
			{form.hasError(name) && <FormHelperText error>{form.getHelperText(name)}</FormHelperText>}
		</FormControl>
	);
}, propsEqual);
