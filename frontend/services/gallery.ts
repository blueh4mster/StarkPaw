interface pets {
    nftAddr : string;
    tracker : string;
    uri : string;
}

export const fetchPets = async(walletAddr : string, isConnected: boolean) => {
    let array : Array<pets> = [];
    if (isConnected){
        // fetch pet nft address owned by this address from backend 
        // fill array by fetching details from backend and making interface
        // return array of these addresses
    } 
    return array;
}

