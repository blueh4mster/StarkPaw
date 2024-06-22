// * ```typescript
// * const myByteArray = {
// *    data: [],
// *    pending_word: '0x414243444546474849',
// *    pending_word_len: 9
// * }
// * const result: String = stringFromByteArray(myByteArray); // ABCDEFGHI
// * ```

import { BigNumberish } from "starknet";
// import { ByteArray } from "viem";

export function stringFromByteArray(myByteArray: ByteArray): string {
  const pending_word: string =
    BigInt(myByteArray.pending_word) === 0n
      ? ""
      : decodeShortString(toHex(myByteArray.pending_word));
  return (
    myByteArray.data.reduce<string>(
      (cumuledString, encodedString: BigNumberish) => {
        const add: string =
          BigInt(encodedString) === 0n
            ? ""
            : decodeShortString(toHex(encodedString));
        return cumuledString + add;
      },
      ""
    ) + pending_word
  );
}

export function isHex(hex: string): boolean {
  return /^0x[0-9a-f]*$/i.test(hex);
}
export function decodeShortString(str: string): string {
  if (!isASCII(str)) throw new Error(`${str} is not an ASCII string`);
  if (isHex(str)) {
    return removeHexPrefix(str).replace(/.{2}/g, (hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
  }
  if (isDecimalString(str)) {
    return decodeShortString("0X".concat(BigInt(str).toString(16)));
  }
  throw new Error(`${str} is not Hex or decimal`);
}

export function isASCII(str: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

export function isDecimalString(str: string): boolean {
  return /^[0-9]*$/i.test(str);
}

export function toHex(value: BigNumberish): string {
  return addHexPrefix(BigInt(value).toString(16));
}

export function removeHexPrefix(hex: string): string {
  return hex.replace(/^0x/i, "");
}

export function addHexPrefix(hex: string): string {
  return `0x${removeHexPrefix(hex)}`;
}

export function splitLongString(longStr: string): string[] {
  const regex = RegExp(`[^]{1,31}`, "g");
  return longStr.match(regex) || [];
}

export function byteArrayFromString(targetString: string): any {
  const shortStrings: string[] = splitLongString(targetString);
  const remainder: string = shortStrings[shortStrings.length - 1];
  const shortStringsEncoded: BigNumberish[] =
    shortStrings.map(encodeShortString);

  const [pendingWord, pendingWordLength] =
    remainder === undefined || remainder.length === 31
      ? ["0x00", 0]
      : [shortStringsEncoded.pop()!, remainder.length];

  return {
    data: shortStringsEncoded.length === 0 ? [] : shortStringsEncoded,
    pending_word: pendingWord,
    pending_word_len: pendingWordLength,
  };
}

export function encodeShortString(str: string): string {
  if (!isASCII(str)) throw new Error(`${str} is not an ASCII string`);
  if (!isShortString(str)) throw new Error(`${str} is too long`);
  return addHexPrefix(
    str.replace(/./g, (char) => char.charCodeAt(0).toString(16))
  );
}

export function isShortString(str: string): boolean {
  return str.length <= 31;
}