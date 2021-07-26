import { FormRefObject } from "../hooks";

export interface FieldBaseProps {
	name: string;
	form: FormRefObject;
	id: string;
	validator?: (value: any, formatMessage?: (messageKey: string) => string) => string | null;
	disabled?: boolean;
	label?: string;
}
