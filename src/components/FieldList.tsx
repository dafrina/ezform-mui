import React, {useEffect, useState} from "react";
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
	const [length, setLength] = useState<number>(null);

	useEffect(() => {
		if (!length) {
			let arr = deepGet(form.getFields(), name) || [];
			setLength(arr?.length);
		}
	}, [form.getFields()]);

	const add = () => () => {
		form.setFields((fields) => {
			let arr = deepGet(fields, name) || [];
			arr.push({});
			const newObj = { ...fields };
			deepSet(newObj, name, arr);
			setLength((p) => p+1);
			return newObj;
		}, validateOnChange);
	};

	const remove = (i: number) => () => {
		form.setFields((fields) => {
			let arr = deepGet(fields, name) || [];
			arr.splice(i, 1);
			setLength((p) => p-1);
			return fields;
		}, validateOnChange);
	};

	const render = () => {
		const rows = [];
		for (let index = 0; index <= (length || 0); index++) {
			rows.push(renderRow({ add, remove, index, total: length }));
		}
		return rows;
	};

	return render() as any;
};
