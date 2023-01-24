export type Cardinality = 'one-one' | 'one-many' | 'many-one' | 'many-many';

export interface Relation{
	name: string;
	srcElement: string;
	srcAttribute: string;
	trgElement: string;
	trgAttribute: string;
	cardinality: Cardinality;
}