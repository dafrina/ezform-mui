import React, { useState, memo } from "react";
import { FieldBaseProps } from "./FieldBase";
import { Autocomplete } from "@material-ui/lab";
import { propsEqual, useField } from "@ezform/core";
import { Chip, TextField } from "@material-ui/core";

export interface FieldComboSelectProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	variant?: "filled" | "outlined" | "standard";
	color?: "primary" | "secondary";
	chipVariant?: "default" | "outlined";
	chipColor?: "primary" | "secondary";
	chipSize?: "medium" | "small";
}

export const FieldComboSelect = memo((props: FieldComboSelectProps) => {
	const { id, name, form, validator = () => null, disabled, readonly = form.isReadonly, label, options, variant = "standard", color = "primary", chipVariant = "default", chipColor, chipSize } = props;

	useField(name, validator, form);

	const getOptionSelected = (option, value) => {
		return option.value === value;
	};

	const [open, setOpen] = useState(false);

	return (
		<Autocomplete
			open={!readonly ? open : false}
			onOpen={!readonly ? () => setOpen(true) : undefined}
			onClose={!readonly ? () => setOpen(false) : undefined}
			multiple
			id={id}
			disablePortal
			disabled={disabled}
			options={options}
			filterSelectedOptions
			value={form.getField(name) || []}
			onChange={(event: any, newValue: any[] | null, reason: any) => {
				if (reason === "clear") {
					form.setField(name, []);
				} else {
					const newFields = newValue?.map((v: any) => v?.value || v);
					form.setField(name, newFields);
				}
			}}
			getOptionLabel={(option) => option.label}
			getOptionDisabled={(option) => option?.disabled}
			getOptionSelected={getOptionSelected}
			renderTags={(value: any[], getTagProps: any) => {
				return value.map((v, index) => {
					const initialProps = getTagProps({ index });
					if (readonly) {
						initialProps["onDelete"] = null;
					}
					return (
						<Chip
							key={v}
							label={options.find((o) => o.value === v)?.label}
							variant={chipVariant}
							color={chipColor}
							size={chipSize}
							{...initialProps}
						/>
					);
				});
			}}
			disableClearable={readonly}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant={variant}
					color={color}
					error={form.hasError(name)}
					helperText={form.getHelperText(name)}
					fullWidth
					InputProps={{ ...params["InputProps"], readOnly: readonly }}
				/>
			)}
		/>
	);
}, propsEqual);
