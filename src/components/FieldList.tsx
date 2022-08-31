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
	extraRows?: number;
}

export const FieldList = (props: FieldListProps) => {
	const { form, name, renderRow, extraRows = 0 } = props;
	const [length, setLength] = useState<number>(null);

	const arr = deepGet(form.getFields(), name);

	useEffect(() => {
		if (arr && length !== arr.length) {
			setLength(arr?.length);
		}
	}, [JSON.stringify(arr)]);

	const add = () => () => {
		form.setFields((fields) => {
			let arr = deepGet(fields, name) || [];
			arr.push({});
			const newObj = { ...fields };
			deepSet(newObj, name, arr);
			setLength((p) => p+1);
			return newObj;
		});
	};

	const remove = (i: number) => () => {
		form.setFields((fields) => {
			let arr = deepGet(fields, name) || [];
			arr.splice(i, 1);
			setLength((p) => p-1);
			return fields;
		});
	};

	return Array(length + extraRows).fill(0).map((nil, index) => renderRow({ add, remove, index, total: length })) as any;
};
