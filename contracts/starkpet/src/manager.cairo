
use starknet::ContractAddress;

#[starknet::interface]
pub trait IERC721URIstorage<TContractState> {
    fn _name(self: @TContractState)->ByteArray;
    fn _symbol(self: @TContractState)->ByteArray;
    fn _mint(ref self: TContractState,recipient: ContractAddress,tokenId: u256);
    fn _setTokenURI(ref self: TContractState, tokenId: u256, tokenURI: ByteArray);
}

#[starknet::interface]
pub trait IManager<TContractState> {
    fn get_nfts(ref self: TContractState)->Array<ContractAddress>;
    fn mint_nft(ref self: TContractState, num:u256,address: ContractAddress);
    fn setTokenURI(ref self: TContractState, address:ContractAddress, num:u256, tokenURI:ByteArray,tokenId:u256);
}


#[starknet::contract]
pub mod Manager{
    use super::{IERC721URIstorageDispatcherTrait,IERC721URIstorageDispatcher};
    use starknet::{ContractAddress,get_caller_address};
    #[storage]
    struct Storage{
        //hadcode 3 token addresses of dog, cat and bunny
        token_addresses: LegacyMap<u256,IERC721URIstorageDispatcher>,
        user_nft: LegacyMap<ContractAddress,Array<ContractAddress>>,

    }

    #[constructor]
    fn constructor(ref self: ContractState, token: ContractAddress) {
        self.token_addresses.write(1,IERC721URIstorageDispatcher{contract_address:token});
    }
    #[abi(embed_v0)]
    impl Manager of super::IManager<ContractState>{
        fn get_nfts(ref self: ContractState)->Array<ContractAddress>{
            let caller= get_caller_address();
            return self.user_nft.read(caller);
        }
        fn setTokenURI(ref self: ContractState,address:ContractAddress, num:u256, tokenURI:ByteArray,tokenId:u256){
            let contract_address= self.token_addresses.read(num);
            contract_address._setTokenURI(tokenId,tokenURI);
        }
        fn mint_nft(ref self: ContractState,num:u256,address: ContractAddress){
            let contract_address= self.token_addresses.read(num);
            contract_address._mint(address,1);
        }
    }
}