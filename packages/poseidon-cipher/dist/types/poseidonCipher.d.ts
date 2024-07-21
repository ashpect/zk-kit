import { CipherText, EncryptionKey, Nonce, PlainText } from "./types";
/**
 * Encrypt some plaintext using poseidon encryption
 * @param msg - the message to encrypt
 * @param key - the key to encrypt with
 * @param nonce - the nonce to avoid replay attacks
 * @returns the ciphertext
 */
export declare const poseidonEncrypt: (msg: PlainText<bigint>, key: EncryptionKey<bigint>, nonce: Nonce<bigint>) => CipherText<bigint>;
/**
 * Decrypt some ciphertext using poseidon encryption
 * @param ciphertext the ciphertext to decrypt
 * @param key the key to decrypt with
 * @param nonce the nonce used to encrypt
 * @param length the length of the plaintext
 * @returns the plaintext
 */
export declare const poseidonDecrypt: (ciphertext: CipherText<bigint>, key: EncryptionKey<bigint>, nonce: Nonce<bigint>, length: number) => PlainText<bigint>;
/**
 * Decrypt some ciphertext using poseidon encryption
 * @dev Do not throw if the plaintext is invalid
 * @param ciphertext the ciphertext to decrypt
 * @param key the key to decrypt with
 * @param nonce the nonce used to encrypt
 * @param length the length of the plaintext
 * @returns the plaintext
 */
export declare const poseidonDecryptWithoutCheck: (ciphertext: CipherText<bigint>, key: EncryptionKey<bigint>, nonce: Nonce<bigint>, length: number) => PlainText<bigint>;
