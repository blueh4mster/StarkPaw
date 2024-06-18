
#[starknet::component]
mod ERC721URIStorageComponent {
    use openzeppelin::introspection::src5::SRC5Component::InternalTrait as SRC5InternalTrait;
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component::ERC721Impl;
    use openzeppelin::token::erc721::ERC721Component::InternalImpl as ERC721InternalImpl;
    use openzeppelin::token::erc721::ERC721Component;
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        ERC721URIstorage_tokenURIs: LegacyMap<u256, string>,
    }

    #[event]
    #[derive(Drop, PartialEq, starknet::Event)]
    enum Event {}

    #[embeddable_as(ERC721URIstorageImpl)]
    impl ERC721URIstorage<
        TContractState,
        +HasComponent<TContractState>,
        impl ERC721: ERC721Component::HasComponent<TContractState>,
        +ERC721Component::ERC721HooksTrait<TContractState>,
        +SRC5Component::HasComponent<TContractState>,
        +Drop<TContractState>
    > of IERC721URIstorage<ComponentState<TContractState>> {
    }


    // Internal
    #[generate_trait]
    impl InternalImpl<
        TContractState,
        +HasComponent<TContractState>,
        impl ERC721: ERC721Component::HasComponent<TContractState>,
        +ERC721Component::ERC721HooksTrait<TContractState>,
        impl SRC5: SRC5Component::HasComponent<TContractState>,
        +Drop<TContractState>
    > of InternalTrait<TContractState> {
        /// Initializes the contract by declaring support for the `IERC721URIstorage` interface id.
        fn initializer(ref self: ComponentState<TContractState>) {
            let mut src5_component = get_dep_component_mut!(ref self, SRC5);
            src5_component.register_interface(interface::IERC721URIstorage_ID);
        }

        fn _setTokenURI(ref self: ComponentState<TContractState>, u256 : tokenId, string : tokenURI){
            self.IERC721URIstorage_tokenURIs.write(tokenId,tokenURI);
            // _tokenURIs[tokenId] = _tokenURI;
            // emit MetadataUpdate(tokenId);
        }

    }
}