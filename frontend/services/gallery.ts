interface pets {
    nftAddr : string;
    tracker : string;
    uri : string;
}

export const fetchPets = async() => {
    // fetch pet nft address owned by this address from backend 
    // return array of these addresses
    let array : Array<pets> = [];
    let pet1 : pets = {
        nftAddr: "0x123",
        tracker: "cat",
        uri : "/"
    }
    let pet2 : pets = {
        nftAddr: "0x456",
        tracker: "dog",
        uri : "/"
    }
    array.push(pet1);
    array.push(pet2);
    return array;
}
