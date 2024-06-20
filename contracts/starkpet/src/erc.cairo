use starknet::ContractAddress;

// class hash:0x07ce0a20b6fbc3599f2a11bbbe88a9b700604f8fc0f27e5d427604741037cb58
// deployed contract: 0x03532ef57ad605a429951b717c106aa508d5d0ec7b2e8b0d1ee62fd824a354a8
//deployment transaction: 0x02d6f73d9a160f0c1168f39dca4919e89606ed37baa9c595308fce4465d8bb0b
#[starknet::interface]
pub trait IERC<TContractState> {
    fn get_name(self: @TContractState) -> ByteArray;
    fn get_symbol(self: @TContractState) -> ByteArray;
    // fn get_total_supply(self: @TContractState) -> ByteArray;
    fn get_token_uri(self:@TContractState,tokenId:u256)->ByteArray;
    fn _mint(ref self: TContractState,recipient:ContractAddress,tokenId:u256);//might return a bool
    fn set_token_uri(ref self:TContractState, tokenId:u256,tokenURI:ByteArray);

}
#[starknet::contract]
mod ERC{
    use super::IERC;
    use starknet::ContractAddress;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component;
    use openzeppelin::token::erc721::ERC721HooksEmptyImpl;
    
    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    #[storage]
    struct Storage {
        tokenURIs: LegacyMap<u256,ByteArray>,
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
    }
    
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        
    }
    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;

    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    // ,name:ByteArray, symbol:ByteArray
    #[constructor]
    fn constructor(ref self: ContractState) {
        self.erc721.initializer("dog", "DOG","http");
    }
    #[abi(embed_v0)]
    impl ERC of super::IERC<ContractState> {
        #[abi(embed_v0)]
        fn get_name(self:@ContractState)->ByteArray{
            self.erc721.name()
        }
        fn get_symbol(self:@ContractState)->ByteArray{
            self.erc721.symbol()
        }
        fn get_token_uri(self:@ContractState,tokenId:u256)->ByteArray{
            let mut arr=self.erc721.tokenURI(tokenId);
            let  brr= self.tokenURIs.read(tokenId);
            arr.append(@brr);
            arr
        }
    
        fn _mint(
            ref self: ContractState,
            recipient: ContractAddress,
            tokenId: u256,
        ) {
            self.erc721.mint(recipient, tokenId);
        }
        fn set_token_uri(ref self: ContractState, tokenId: u256, tokenURI: ByteArray){
            self.tokenURIs.write(tokenId, tokenURI);
        }
    }
}