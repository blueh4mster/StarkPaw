
use starknet::ContractAddress;

#[starknet::contract]
mod erc721URIstorage {
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component;
    use openzeppelin::token::erc721::ERC721HooksEmptyImpl;
    use starknet::ContractAddress;

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;
    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;

    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        tokenURIs: LegacyMap<u256,ByteArray>
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress,name:ByteArray, symbol:ByteArray) {
        self.erc721.initializer("MyToken", "MTK","");
        self.ownable.initializer(owner);
    }
    #[abi(embed_v0)]
    fn _name(self:ContractState)->ByteArray{
        self.erc721.name()
    }
    fn _symbol(self:ContractState)->ByteArray{
        self.erc721.symbol()
    }
    fn _mint(
        ref self: ContractState,
        recipient: ContractAddress,
        tokenId: u256,
    ) {
        self.erc721.mint(recipient, tokenId);
    }
    fn _setTokenURI(ref self: ContractState, tokenId: u256, tokenURI: ByteArray){
        self.tokenURIs.write(tokenId, tokenURI);
    }
    
}
