use starknet::ContractAddress;

// class hash: 0x05ab96a1167bc4300f83c45c92574a3a8320a971815a982cce4fa9f09aa3ca7b
// deployed contract: 0x0019b58fb2dc0f314dce97a3ff1d841252f8ef9e98135a11c4981dbafb1b23da
//deployment transaction: 0x01ff5328f813f9a4b6db9c4bd0e24af6fc04f38f61d7f0b5be5617a57e44a8f0
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
        self.erc721.initializer("cat", "CAT","https://cb2397504e2e55d5db11f18ca2c29f7a.ipfscdn.io/ipfs/bafybeigswdnacleo7cgta56iqco4koq4irbct47pu247stdxvcg247yjhm/");
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