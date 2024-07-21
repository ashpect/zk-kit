/**
 * @module @zk-kit/lazytower
 * @version 0.0.1
 * @file LazyTower implementation in TypeScript.
 * @copyright LCamel 2024
 * @license MIT
 * @see [Github]{@link https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/lazytower}
*/
import { poseidon2 } from 'poseidon-lite';

function checkParameter(value, name, ...types) {
    if (value === undefined) {
        throw new TypeError(`Parameter '${name}' is not defined`);
    }
    if (!types.includes(typeof value)) {
        throw new TypeError(`Parameter '${name}' is none of these types: ${types.join(", ")}`);
    }
}
const pad = (arr, len, val) => arr.concat(Array(len - arr.length).fill(val));
const pad0 = (arr, len) => pad(arr, len, BigInt(0));
const pad00 = (arr2D, h, w) => pad(arr2D, h, []).map((a) => pad0(a, w));
const defaultHash = (a, b) => poseidon2([a, b]);
/**
 * LazyTowerHashChainProofBuilder is a TypeScript implementation of LazyTower to generate proofs of membership.
 * @param H Height of tower of the proving circuit. It can be less than the H in the contract.
 * @param W Width of tower.
 * @param hash A hash function which supports 2 input values.
 */
function LazyTowerHashChainProofBuilder(H, W, hash = defaultHash) {
    checkParameter(H, "H", "number");
    checkParameter(W, "W", "number");
    checkParameter(hash, "hash", "function");
    const bitsPerLevel = 4;
    const digestFunc = (arr) => arr.reduce(hash);
    const levels = [];
    const fullLevels = [];
    function _add(lv, toAdd) {
        if (lv === H) {
            throw new Error("The tower is full.");
        }
        if (lv === levels.length) {
            fullLevels.push([toAdd]);
            levels.push([toAdd]);
        }
        else if (levels[lv].length < W) {
            fullLevels[lv].push(toAdd);
            levels[lv].push(toAdd);
        }
        else {
            fullLevels[lv].push(toAdd);
            _add(lv + 1, digestFunc(levels[lv]));
            levels[lv] = [toAdd];
        }
    }
    /**
     * Adds a new item in the LazyTower.
     * @param item Item to be added.
     */
    function add(item) {
        checkParameter(item, "item", "bigint");
        _add(0, item);
    }
    /**
     * Returns the index of a item. If the item does not exist it returns -1.
     * @param item Added item.
     * @returns Index of the item.
     */
    function indexOf(item) {
        checkParameter(item, "item", "bigint");
        return fullLevels[0].indexOf(item);
    }
    function _buildChildrensAndRootLevel(idx) {
        const childrens = [];
        for (let lv = 0;; lv += 1) {
            const levelStart = fullLevels[lv].length - levels[lv].length;
            const start = idx - (idx % W);
            if (start === levelStart) {
                // we are in the tower now
                const rootLevel = pad0(fullLevels[lv].slice(start, start + levels[lv].length), W);
                return [lv, rootLevel, pad00(childrens, H - 1, W)];
            }
            childrens.push(fullLevels[lv].slice(start, start + W));
            idx = Math.floor(idx / W);
        }
    }
    /**
     * Builds a proof of membership.
     * @param idx Index of the proof's item.
     * @returns Proof object.
     */
    function build(idx) {
        checkParameter(idx, "idx", "number");
        if (levels.length === 0) {
            throw new Error("The tower is empty.");
        }
        if (idx < 0 || idx >= fullLevels[0].length) {
            throw new Error(`Index out of range: ${idx}`);
        }
        const item = fullLevels[0][idx];
        let topDownDigests = levels.map(digestFunc).reverse();
        const digestOfDigests = digestFunc(topDownDigests);
        topDownDigests = pad0(topDownDigests, H);
        const levelLengths = levels.reduce((sum, level, lv) => sum | (BigInt(level.length) << BigInt(bitsPerLevel * lv)), BigInt(0));
        const [rootLv, rootLevel, childrens] = _buildChildrensAndRootLevel(idx);
        return { levelLengths, digestOfDigests, topDownDigests, rootLv, rootLevel, childrens, item };
    }
    return { add, indexOf, build };
}

export { LazyTowerHashChainProofBuilder };
