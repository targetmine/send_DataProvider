export const CARDINALITY = ['one to one', 'one to many', 'many to one', 'many to many'] as const; 
export type Cardinality = typeof CARDINALITY[number];

export interface Relation{
	name: string;
	srcElement: string;
	srcAttribute: string;
	trgElement: string;
	trgAttribute: string;
	cardinality: Cardinality;
}