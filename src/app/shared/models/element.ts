import { Attribute } from "./attribute";

/** A basic element of a data model, it can be thought of as a table
 * in the context of a relational database */
export interface Element{
	name: string;
	attributes: Attribute[];
}