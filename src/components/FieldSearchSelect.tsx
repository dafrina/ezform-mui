import React, { memo, useEffect, useState } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {FieldReadonly} from "./FieldReadonly";

export interface FieldSearchSelectProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	variant?: "filled" | "outlined" | "standard";
	color?: "primary" | "secondary";
}

export const FieldSearchSelect = memo((props: FieldSearchSelectProps) => {
	const { id, name, form, validator = () => null, disabled, readonly = form.isReadonly, label, options, variant = "standard", color = "primary", defaultValue } = props;

	useField(name, validator, form, defaultValue);

	const [input, setInput] = useState("");

	const handleChange = (e: any, selected: any) => {
		if (selected) {
			form.setField(name, selected.value);
		} else {
			form.setField(name, null);
		}
	};

	useEffect(() => {
		if (form.getField(name)) {
			const selected = options.find((o) => o.value === form.getField(name));
			setInput(selected?.label || "");
		}
	}, [form.getField(name)]);

	const handleInputChange = (e: any, value: any, reason: any) => {
		if (reason === "clear") {
			setInput("")
		} else {
			setInput(value)
		}
	};

	if (readonly) {
		return (
			<FieldReadonly
				variant={variant}
				color={color}
				name={name}
				id={id}
				label={label}
				value={options.find((f) => f.value === form.getField(name))?.label || ""}
				fullWidth
			/>
		);
	}

	return (
		<Autocomplete
			id={id}
			onChange={handleChange}
			disabled={disabled}
			options={options}
			getOptionLabel={(option) => option?.label || ""}
			getOptionDisabled={(option) => option?.disabled || false}
			getOptionSelected={(option, value) => option.value === value}
			value={form.getField(name)}
			inputValue={input}
			onInputChange={handleInputChange}
			disableClearable={false}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant={variant}
					color={color}
					error={form.hasError(name)}
					helperText={form.getHelperText(name)}
					fullWidth
				/>
			)}
		/>
	);
}, propsEqual);
