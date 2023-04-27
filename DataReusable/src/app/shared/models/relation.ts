import type { AttributeType } from './attribute';
export const CARDINALITY = ['one to one', 'one to many', 'many to many'] as const; 
export type Cardinality = typeof CARDINALITY[number];

export interface Relation{
	name: string;
	srcElement: string;
	srcAttribute: string;
	srcType: AttributeType;
	trgElement: string;
	trgAttribute: string;
	trgType: AttributeType;
	cardinality: Cardinality;
}