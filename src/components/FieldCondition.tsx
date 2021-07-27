export interface FieldConditionProps {
	when: boolean;
	children: any;
}

export const FieldCondition = ({when, children}: FieldConditionProps) => (when ? children : null);
