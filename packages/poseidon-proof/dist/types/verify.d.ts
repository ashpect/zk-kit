import { PoseidonProof } from "./types";
/**
 * Verifies that a Poseidon proof is valid.
 * @param proof PoseidonProof
 * @returns True if the proof is valid, false otherwise.
 */
export default function verify({ numberOfInputs, scope, digest, proof }: PoseidonProof): Promise<boolean>;
