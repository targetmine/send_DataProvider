export type AttributeType = 'string' | 'number';
export const ATTRIBUTE_TYPES = ['string', 'number'];

/* Convenience interface used to manage the definition of the attributes a
 * given element */
export interface Attribute{
	name: string;
	type: AttributeType;
	unique: boolean;
}