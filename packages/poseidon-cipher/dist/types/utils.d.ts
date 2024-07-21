import { StringifiedInput, BigIntOutput, Nonce } from "./types";
/**
 * Given an input containing string values, convert them
 * to bigint
 * @param input the input to convert
 * @returns the input with string values converted to bigint
 */
export declare const unstringifyBigInts: (input: StringifiedInput) => BigIntOutput;
export declare const C: bigint[][];
export declare const M: bigint[][][];
/**
 * Given a bigint a, returns a^5.
 * @param a the value to exponentiate
 * @returns the result of a^5
 */
export declare const pow5: (a: bigint) => bigint;
/**
 * Given a bigint a, returns a normalized value of a.
 * @dev r is 'r' is the alt_bn128 prime order, so we can use it to normalize values
 * @param a the value to normalize
 * @returns the normalized value of a
 */
export declare const normalize: (a: bigint) => bigint;
/**
 * Apply the Poseidon permutation to the given inputs
 * @param inputs - the inputs to the permutation
 * @returns an array of bigint representing the output of the permutation
 */
export declare const poseidonPerm: (inputs: bigint[]) => bigint[];
/**
 * Check if two field values are equal
 * @param a the first value
 * @param b the second value
 * @param error the error to throw if the values are not equal
 */
export declare const checkEqual: (a: bigint, b: bigint, error: string) => void;
/**
 * Validate that the nonce is less than 2 ^ 128 (sqrt of the field size)
 * @param nonce the nonce to validate
 */
export declare const validateNonce: (nonce: Nonce<bigint>) => void;
