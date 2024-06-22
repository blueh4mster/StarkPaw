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
