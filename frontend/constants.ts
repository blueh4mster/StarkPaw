// 0x19b58fb2dc0f314dce97a3ff1d841252f8ef9e98135a11c4981dbafb1b23da

export const DOG =
  "0x070d2b81433a04a24ea314fb338b6765685bf04c6feda53fc7ff41e8bdb3ab14";
export const CAT =
  "0x0019b58fb2dc0f314dce97a3ff1d841252f8ef9e98135a11c4981dbafb1b23da";
export const BUNNY =
  "0x05a99df4291523865e3de6eee5a10f4a6e24a548cd31aeab19094349e0451dfc";
export const MANAGER =
  "0x007764a43ac9eba6cccf9cffc808aa0c14e58bf125cb0a9aa2d640271bc179be";

export const nftSelector = (addr: string) => {
  switch (addr) {
    case DOG:
      return 1;
      break;
    case CAT:
      return 2;
      break;
    case BUNNY:
      return 3;
      break;
    default:
      return 0;
      break;
  }
};
