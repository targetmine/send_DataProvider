export type AttributeType = 'varchar(40)' | 'text' | 'integer' | 'double precision';
export const ATTRIBUTE_TYPES = ['varchar(40)', 'text', 'integer', 'double precision'];

/* Convenience interface used to manage the definition of the attributes a
 * given element */
export interface Attribute{
	name: string;
	type: AttributeType;
	unique: boolean;
}