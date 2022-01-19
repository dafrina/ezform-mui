import React from "react";
import { deepGet, deepSet, FormRefObject } from "@ezform/core";

interface FieldListProps {
	form: FormRefObject;
	name: string;
	renderRow: (props: {
		add: () => () => void;
		remove: (index: number) => () => void;
		index: number;
		total: number;
	}) => any;
	validateOnChange?: boolean;
}

export const FieldList = (props: FieldListProps) => {
	const { form, name, renderRow, validateOnChange = false } = props;

	const add = () => () => {
		form.setFields((fields) => {
			const arr = deepGet(fields, name) || [];
			arr.push({});
			const newObj = { ...fields };
			deepSet(newObj, name, arr);
			return newObj;
		}, validateOnChange);
	};

	const remove = (i: number) => () => {
		form.setFields((fields) => {
			const arr = deepGet(fields, name);
			arr?.splice(i, 1);
			return fields;
		}, validateOnChange);
	};

	const render = () => {
		const arr = form.getFields()[name] || [];
		const rows = [];
		for (let index = 0; index < arr.length; index++) {
			rows.push(renderRow({ add, remove, index, total: arr.length }));
		}
		return rows;
	};

	return render() as any;
};
