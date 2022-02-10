import React, { memo } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import { FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox, FormHelperText } from "@material-ui/core";

export interface FieldCheckboxGroupProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	color?: "default" | "primary" | "secondary";
}

export const FieldCheckboxGroup = memo((props: FieldCheckboxGroupProps) => {
	const { id, name, form, validator = () => null, label, readonly = form.isReadonly, options, color = "secondary" } = props;

	useField(name, validator, form);

	const handleChange = (option) => () => {
		const newList = form.getField(name) || [];

		const selected = form.getField(name)?.find((val) => {
			return val === option.value;
		});

		if (newList.length <= 0 || !selected) {
			newList.push(option.value);
		} else {
			newList.splice(newList.indexOf(option.value), 1);
		}

		form.setField(name, newList);
	};

	return (
		<FormControl error={form.hasError(name)} component="fieldset" fullWidth>
			{label && <FormLabel component="legend">{label}</FormLabel>}
			<FormGroup id={id}>
				{options.map((option, i) => {
					const selected = form.getField(name)?.find((val) => val === option.value);

					return (
						<FormControlLabel
							key={option.key}
							control={
								<Checkbox
									disabled={option?.disabled || false}
									checked={!!selected || false}
									value={option.value}
									onChange={!readonly && handleChange(option)}
									name={`${name}-key-${i}`}
									color={color}
									readOnly={readonly}
								/>
							}
							label={option.label}
						/>
					);
				})}
			</FormGroup>
			{form.hasError(name) && <FormHelperText error>{form.getHelperText(name)}</FormHelperText>}
		</FormControl>
	);
}, propsEqual);
