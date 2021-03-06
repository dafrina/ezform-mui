import React, { memo, ReactNode } from "react";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import { KeyboardDateTimePicker, KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import { FormControl } from "@material-ui/core";
import {FieldReadonly} from "./FieldReadonly";
import moment from "moment";

export interface FieldDateProps extends FieldBaseProps {
	format: string;
	placeholder?: string;
	autoOk?: boolean;
	disableToolbar?: boolean;
	variant?: "filled" | "outlined" | "standard";
	minDate?: ParsableDate;
	minDateMessage?: ReactNode;
	maxDate?: ParsableDate;
	maxDateMessage?: ReactNode;
	initialDate?: ParsableDate;
	disablePast?: boolean;
	disableFuture?: boolean;
	type?: "date" | "datetime" | "time";
}

export const FieldDate = memo((props: FieldDateProps) => {
	const {
		id,
		name,
		form,
		validator = () => null,
		disabled,
		label,
		format,
		autoOk = true,
		disableToolbar = false,
		variant = "standard",
		minDate,
		maxDate,
		minDateMessage,
		maxDateMessage,
		initialDate,
		disablePast,
		disableFuture,
		type = "date",
		readonly = form.isReadonly,
		defaultValue,
		placeholder,
	} = props;

	useField(name, validator, form, defaultValue);

	const handleChange = (date: any) => {
		form.setField(name, date?.unix() * 1000);
	};

	if (readonly) {
		return (
			<FieldReadonly
				variant={variant}
				name={name}
				id={id}
				label={label}
				value={moment(form.getField(name)).format(format)}
				fullWidth
			/>
		);
	}

	return (
		<FormControl fullWidth>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<>
					{type === "date" && (
						<KeyboardDatePicker
							autoOk={autoOk}
							disableToolbar={disableToolbar}
							disabled={disabled}
							format={format}
							name={name}
							id={id}
							label={label}
							value={form.getField(name) || null}
							onChange={handleChange}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
							error={form.hasError(name)}
							helperText={form.getHelperText(name)}
							inputVariant={variant}
							initialFocusedDate={initialDate}
							minDate={minDate}
							minDateMessage={minDateMessage}
							maxDate={maxDate}
							maxDateMessage={maxDateMessage}
							disablePast={disablePast}
							disableFuture={disableFuture}
							InputProps={{placeholder}}
						/>
					)}
					{type === "datetime" && (
						<KeyboardDateTimePicker
							autoOk={autoOk}
							disableToolbar={disableToolbar}
							disabled={disabled}
							format={format}
							name={name}
							id={id}
							label={label}
							value={form.getField(name) || null}
							onChange={handleChange}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
							error={form.hasError(name)}
							helperText={form.getHelperText(name)}
							inputVariant={variant}
							initialFocusedDate={initialDate}
							minDate={minDate}
							minDateMessage={minDateMessage}
							maxDate={maxDate}
							maxDateMessage={maxDateMessage}
							disablePast={disablePast}
							disableFuture={disableFuture}
							ampm={false}
							InputProps={{placeholder}}
						/>
					)}
					{type === "time" && (
						<KeyboardTimePicker
							autoOk={autoOk}
							disableToolbar={disableToolbar}
							disabled={disabled}
							format={format}
							name={name}
							id={id}
							label={label}
							value={form.getField(name) || null}
							onChange={handleChange}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
							error={form.hasError(name)}
							helperText={form.getHelperText(name)}
							inputVariant={variant}
							initialFocusedDate={initialDate}
							ampm={false}
							InputProps={{placeholder}}
						/>
					)}
				</>
			</MuiPickersUtilsProvider>
		</FormControl>
	);
}, propsEqual);
