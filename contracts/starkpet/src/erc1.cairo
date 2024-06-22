use starknet::ContractAddress;

// class hash:0x042dea4af14b96e8b1e72310a5f9f7882c6f63fb315ad103f630500c86337fbd
// deployed contract: 0x070d2b81433a04a24ea314fb338b6765685bf04c6feda53fc7ff41e8bdb3ab14
//deployment transaction:  0x062f653e4cd3bcb93b38e05f64e6f508a845bd64c4f7f1c0af11b5aab02432fe
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
        called: bool,
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
        self.erc721.initializer("dog", "DOG","https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeifcbhtoktenp7zhckvmt2trjmqvo7wnujk7zwtex3iybqi6kki2sm/");
        self.called.write(false);
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
            if self.called.read() {
                return brr;
            }
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
            self.called.write(true);
            self.tokenURIs.write(tokenId, tokenURI);
        }
    }
}