import React, { memo } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import {
	MenuItem,
	ListItemText,
	Checkbox,
	TextField
} from "@material-ui/core";

export interface FieldMultiSelectProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	variant?: "filled" | "outlined" | "standard";
}

export const FieldMultiSelect = memo((props: FieldMultiSelectProps) => {
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
			value={form.getField(name) || []}
			onChange={handleChange}
			disabled={disabled}
			InputProps={{readOnly: readonly}}
			error={form.hasError(name)}
			SelectProps={{
				multiple: true,
				renderValue: (selected: any) => {
					let render: string[] = [];
					selected.map((s: string) => {
						const option = options.find((o) => o?.value === s);
						if (option) render.push(option?.label);
					})
					return render.join(", ");
				}
			}}
			fullWidth
			helperText={form.getHelperText(name)}
		>
			{options.map((option) => (
				<MenuItem key={option.key} value={option.value} disabled={option?.disabled || false}>
					<Checkbox checked={form.getField(name)?.indexOf(option.value) > -1} color="primary" />
					<ListItemText primary={option.label} />
				</MenuItem>
			))}
		</TextField>
	);
}, propsEqual);
