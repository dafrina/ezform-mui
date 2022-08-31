import {FormRefObject, FieldType, ValidatorType} from "@ezform/core";

export interface FieldBaseProps {
	name: string;
	form: FormRefObject;
	id?: string;
	validator?: ValidatorType;
	disabled?: boolean;
	readonly?: boolean;
	label?: string;
	defaultValue?: any;
}
