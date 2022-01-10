import React, { useState } from "react";
import { deepGet, deepSet, flatten, FormRefObject } from "@ezform/core";

interface FieldListProps {
	form: FormRefObject;
	name: string;
	renderRow: (props: {
		add: () => void;
		remove: (index: number) => () => void;
		index: number;
		total: number;
	}) => any;
}

export const FieldList = (props: FieldListProps) => {
	const { form, name, renderRow } = props;
	const [list, setList] = useState(
		(deepGet(form.getFields(), name) || []).length || 0
	);

	const add = () => setList((p: number) => p + 1);

	const remove = (i: number) => () => {
		form.setFields((fields) => {
			const values = {};

			Object.keys(fields).forEach((k) => {
				if (fields[k]) {
					deepSet(values, k, fields[k] || null);
				}
			});

			const arr = deepGet(values, name);
			arr?.splice(i, 1);
			return flatten(values);
		});
		setList((p: number) => p - 1);
	};

	const render = () => {
		const rows = [];
		for (let i = 0; i < list + 1; i++) {
			rows.push(renderRow({ add, remove, index: i, total: list + 0 }));
		}
		return rows;
	};

	return render() as any;
};
