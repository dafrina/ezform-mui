import React, { useState } from "react";
import { FieldBaseProps } from "./FieldBase";
import { Autocomplete } from "@material-ui/lab";
import { useField } from "@ezform/core";
import { Chip, TextField } from "@material-ui/core";

export interface FieldComboSelectProps extends FieldBaseProps {
	options: { key: string; value: string; label: string; disabled?: boolean }[];
	variant?: "filled" | "outlined" | "standard";
	color?: "primary" | "secondary";
	chipVariant?: "default" | "outlined";
	chipColor?: "primary" | "secondary";
}

export const FieldComboSelect = (props: FieldComboSelectProps) => {
	const { id, name, form, validator = () => null, disabled, readonly = form.isReadonly, label, options, variant = "standard", color = "primary", chipVariant = "default", chipColor } = props;

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
			onChange={(event: any, newValue: any[] | null) => {
				form.setField(name, newValue?.map((v: any) => (typeof v === "object" ? v.value : v) || null));
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
};
