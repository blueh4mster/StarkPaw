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

export const DOG = "https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeifcbhtoktenp7zhckvmt2trjmqvo7wnujk7zwtex3iybqi6kki2sm/";
export const DOGEAT = "https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeiaq7xtg7hvmacg3sak3ui63tjjgwb2jyzbgquc2vhewjggawrywdq/";
export const DOGSLEEP = "https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeihzlj5nhjiei2rawgoup23u5zrftpxoffh3dxyv4uriaskqslosjm/";
//https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeibqycahqp32dvpmniookk4v57sskztuxz666ileslwpywy7inflv
export const CAT = "https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeigswdnacleo7cgta56iqco4koq4irbct47pu247stdxvcg247yjhm/";
export const CATEAT = "https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeihmcil2tq3d3k2e6vltkqnxcvb6py7foo5hl7x35v7j6tkntdan74/";
export const CATSLEEP = "https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeihg3jierhpt47dmxnzdavzcrnabgjmjel4bmkmkmkvlgcgyityjpq/";

export const BUNNY = "https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeifz6dmjqvk2d4cwzds6owopmtbiry4nyrxan7qqayeyqmjf4f4pfq/";
export const BUNNYEAT = "https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeic4jndehxmq4emtg6gyrul2jd4yohtvcec2novdvv6copgydndzxm/";
export const BUNNYSLEEP = "https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeibqycahqp32dvpmniookk4v57sskztuxz666ileslwpywy7inflva/";

export const uriSelector = (trackerNum: number, actionNum: number) => {
  switch (trackerNum) {
    case 1:
      switch (actionNum) {
        case 1:
          return DOG;
        case 2:
          return DOGEAT;
        case 3:
          return DOGSLEEP;
        default:
          return "";
      }
    case 2:
      switch (actionNum) {
        case 1:
          return CAT;
        case 2:
          return CATEAT;
        case 3:
          return CATSLEEP;
        default:
          return "";
      }
    case 3:
      switch (actionNum) {
        case 1:
          return BUNNY;
        case 2:
          return BUNNYEAT;
        case 3:
          return BUNNYSLEEP;
        default:
          return "";
      }
    default:
      return "";
  }
};
