export type LazyTowerHashChainProof = {
    levelLengths: bigint;
    digestOfDigests: bigint;
    topDownDigests: bigint[];
    rootLv: number;
    rootLevel: bigint[];
    childrens: bigint[][];
    item: bigint;
};
/**
 * LazyTowerHashChainProofBuilder is a TypeScript implementation of LazyTower to generate proofs of membership.
 * @param H Height of tower of the proving circuit. It can be less than the H in the contract.
 * @param W Width of tower.
 * @param hash A hash function which supports 2 input values.
 */
export declare function LazyTowerHashChainProofBuilder(H: number, W: number, hash?: (a: bigint, b: bigint) => bigint): {
    add: (item: bigint) => void;
    indexOf: (item: bigint) => number;
    build: (idx: number) => LazyTowerHashChainProof;
};
