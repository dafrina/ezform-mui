import React from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField } from "@ezform/core";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, FormHelperText } from "@material-ui/core";

export interface FieldRadioGroupProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	color?: "default" | "primary" | "secondary";
}

export const FieldRadioGroup = (props: FieldRadioGroupProps) => {
	const { id, name, form, validator = () => null, label, options, color = "secondary" } = props;

	useField(name, validator, form);

	const handleChange = (e, value) => {
		form.setField(name, value);
	};

	return (
		<FormControl error={form.hasError(name)} component="fieldset" fullWidth>
			{label && <FormLabel component="legend">{label}</FormLabel>}
			<RadioGroup id={id} value={form.getField(name) || null} onChange={handleChange}>
				{options.map((option) => (
					<FormControlLabel
						key={option.key}
						value={option.value}
						control={<Radio color={color} />}
						label={option.label}
						disabled={option?.disabled || false}
					/>
				))}
			</RadioGroup>
			{form.hasError(name) && <FormHelperText error>{form.getHelperText(name)}</FormHelperText>}
		</FormControl>
	);
};
