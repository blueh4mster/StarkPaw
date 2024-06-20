interface pets {
    nftAddr : string;
    tracker : string;
    uri : string;
}

export const fetchPets = async() => {
    // fetch pet nft address owned by this address from backend 
    // return array of these addresses
    let array : Array<pets> = [];
    // fill array by fetching details from backend and making interface 
    return array;
}

