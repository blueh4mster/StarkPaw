use starknet::ContractAddress;


#[starknet::interface]
pub trait IERC<TContractState> {
    fn get_name(self: @TContractState) -> ByteArray;
    fn get_symbol(self: @TContractState) -> ByteArray;
    // fn get_total_supply(self: @TContractState) -> ByteArray;
    fn get_token_uri(self:@TContractState,tokenId:u256)->ByteArray;
    fn _mint(ref self: TContractState,recipient:ContractAddress,tokenId:u256);//might return a bool
    fn set_token_uri(ref self:TContractState, tokenId:u256,tokenURI:felt252);

}
#[starknet::interface]
pub trait IManager<TContractState> {
    // fn register_user(ref self:TContractState);// the cllaer's address will be registered
    fn get_nfts(self: @TContractState)->ContractAddress;
    fn mint_nft(ref self: TContractState, num:u256,address: ContractAddress);
    fn setTokenURI(ref self: TContractState, address:ContractAddress,tokenURI:felt252,tokenId:u256)->bool;
}

#[starknet::contract]
pub mod Manager {
    use starkpet::try::IManager;
use super::{IERCDispatcher, IERCDispatcherTrait};
    use starknet::{ContractAddress, get_caller_address, get_contract_address};

    #[storage]
    struct Storage {
        nft_addresses: LegacyMap<u256,IERCDispatcher>,
        user_nft: LegacyMap<ContractAddress,u256>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, nft: ContractAddress) {
        self.nft_addresses.write(1,IERCDispatcher { contract_address: nft });
    }

    #[abi(embed_v0)]
    impl Manager of super::IManager<ContractState> {

        fn get_nfts(self: @ContractState)->ContractAddress{
            let caller=get_caller_address();
            let num=self.user_nft.read(caller);
            let nft=self.nft_addresses.read(num);
            return nft.contract_address;
        }
        fn mint_nft(ref self: ContractState, num:u256,address: ContractAddress){
            let addr=self.nft_addresses.read(num);
            let tokenId=2;
            IERCDispatcher{contract_address:addr.contract_address}._mint(address,tokenId);

        }
        fn setTokenURI(ref self: ContractState, address:ContractAddress,tokenURI:felt252,tokenId:u256)->bool{
            if self.user_nft.read(address)!=0 {
                let num=self.user_nft.read(address);
                let addr=self.nft_addresses.read(num);
                let contract_address=addr.contract_address;
                IERCDispatcher{contract_address}.set_token_uri(tokenId,tokenURI);
                return true;
            }
            return false;
        }
    }
}