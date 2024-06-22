interface petsI {
  name: string;
  nftAddr: string;
  tokenid: number;
  uri: string;
}

export const removeDuplicates = (array: petsI[]): petsI[] => {
  const seen = new Set<string>();
  return array.filter(item => {
    const key = `${item.name}-${item.nftAddr}-${item.tokenid}-${item.uri}`;
    const duplicate = seen.has(key);
    seen.add(key);
    return !duplicate;
  });
};