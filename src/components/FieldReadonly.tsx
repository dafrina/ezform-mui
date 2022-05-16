import React from "react";
import {TextField, withStyles} from "@material-ui/core";

const StyledTextField = withStyles({
	root: {
		"& label": {
			color: "#333",
		},
		"& label.Mui-focused": {
			color: "#333",
		},
		"& .MuiInput-underline:before": {
			borderBottomColor: "transparent",
		},
		"& .MuiInput-underline:hover:before": {
			borderBottomColor: "transparent",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "transparent",
		},
	},
})(TextField);

export const FieldReadonly = (props) => <StyledTextField {...props} variant="standard" inputProps={{readOnly: true}} InputLabelProps={{ shrink: true }} />;
