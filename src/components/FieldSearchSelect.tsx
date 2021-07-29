import React, {useEffect, useState} from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField } from "@ezform/core";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export interface FieldSearchSelectProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	variant?: "filled" | "outlined" | "standard";
}

export const FieldSearchSelect = (props: FieldSearchSelectProps) => {
	const { id, name, form, validator = () => null, disabled, label, options, variant = "standard" } = props;

	useField(name, validator, form);

	const [input, setInput] = useState("");

	const handleChange = (e: any, selected: any) => {
		if (selected) {
			form.setField(name, selected.value);
		} else {
			form.setField(name, null);
		}
	};

	useEffect(() => {
		if (form.fields[name]) {
			const selected = options.find((o) => o.value === form.fields[name]);
			setInput(selected?.label || "");
		}
	}, [form.fields[name]]);

	const handleInputChange = (e: any, value: any, reason: any) => {
		if (reason === "clear") {
			setInput("")
		} else {
			setInput(value)
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
			getOptionDisabled={(option) => option?.disabled || false}
			getOptionSelected={(option, value) => option.value === value}
			value={form.fields[name]}
			inputValue={input}
			onInputChange={handleInputChange}
			disableClearable={false}
			clearOnBlur={false}
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
