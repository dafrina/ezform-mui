import React, { memo, SyntheticEvent } from "react";
import { FormControl, Grid, Button, FormLabel, FormHelperText, Tooltip } from "@material-ui/core";
import { FieldBaseProps } from "./FieldBase";
import { useField, propsEqual } from "@ezform/core";
import { EzformMuiConfig } from "../config";

export interface FieldFileProps extends FieldBaseProps {
	buttonLabel?: string;
	defaultHelperText?: string;
	noFileSelectedText?: string;
	fileSelectedText?: string;
	variant?: "contained" | "outlined" | "text";
	color?: "default" | "inherit" | "primary" | "secondary";
	multiple?: boolean;
}

export const FieldFile = memo((props: FieldFileProps) => {
	const {
		id,
		name,
		form,
		validator = () => null,
		disabled,
		readonly = form.isReadonly,
		label,
		buttonLabel,
		defaultHelperText,
		noFileSelectedText,
		fileSelectedText,
		variant,
		color,
		multiple = false
	} = {...EzformMuiConfig(), ...props};

	useField(name, validator, form);

	const handleChange = (e: any) => {
		const {files} = e.target;

		// canceled file input
		if (files.length === 0) {
			form.setField(name, null);
		} else if (multiple) {
			form.setField(name, files);
		} else {
			form.setField(name, files[0]);
		}
	};

	const getFileText = () => {
		const formVal = form.getField(name);

		if (!formVal) {
			return "";
		}

		if (formVal.length && formVal.length > 0) {
			return " – " + fileSelectedText.replace("$n", formVal.length);
		}
		return " – " + fileSelectedText.replace("$n", "1");
	};

	const formatBytes = (bytes: number, decimals = 2) => {
		if (bytes === 0) return "0 Bytes";

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	};

	const getTooltipText = () => {
		const formVal = form.getField(name);

		if (!formVal) {
			return noFileSelectedText;
		}

		if (formVal.length && formVal.length > 0) {
			console.log(formVal);
			return (
				<Grid container justify="space-between">
					{Array.from(formVal).map((f: any, i: number) => (
						<React.Fragment key={f.name + "_" + i}>
							<Grid item xs={8}>{f.name}</Grid>
							<Grid item xs={4} style={{textAlign: "right"}}>({formatBytes(f.size)})</Grid>
						</React.Fragment>
					))}
				</Grid>
			);
		}
		return formVal.name + " (" + formatBytes(formVal.size) + ")";
	};

	return (
		<FormControl fullWidth>
			<FormLabel error={form.hasError(name)}>{label}</FormLabel>
			<Tooltip title={getTooltipText()}>
				<Button variant={variant} color={color} disabled={disabled} style={{ marginTop: 5 }} onClick={readonly ? (e: SyntheticEvent) => e.preventDefault() : undefined }>
					<input multiple={multiple} type="file" id={id} name={name} onChange={handleChange} style={{
						position: "absolute",
						left: 0,
						top: 0,
						width: "100%",
						height: "100%",
						opacity: 0,
						cursor: "pointer",
					}} title=" " />
					{buttonLabel} {getFileText()}
				</Button>
			</Tooltip>
			{form.hasError(name) ? (
				<FormHelperText error={form.hasError(name)}>{form.getHelperText(name)}</FormHelperText>
			) : (
				<FormHelperText>{defaultHelperText}</FormHelperText>
			)}
		</FormControl>
	);
}, propsEqual);
