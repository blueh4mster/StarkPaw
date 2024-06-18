#[starknet::contract]
mod ERC721URIstorageMock {
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component::ERC721HooksTrait;
    use openzeppelin::token::erc721::ERC721Component;
    use ERC::ERC721URIstorageComponent;
    use starknet::ContractAddress;

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(
        path: ERC721URIstorageComponent, storage: erc721_URIstorage, event: ERC721URIstorageEvent
    );
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // ERC721
    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721Impl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    // ERC721URIstorage
    #[abi(embed_v0)]
    impl ERC721URIstorageImpl =
        ERC721URIstorageComponent::ERC721URIstorageImpl<ContractState>;
    impl ERC721URIstorageInternalImpl = ERC721URIstorageComponent::InternalImpl<ContractState>;

    // SRC5
    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        erc721_URIstorage: ERC721URIstorageComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        ERC721URIstorageEvent: ERC721URIstorageComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event
    }

    impl ERC721URIstorageHooksImpl<
        TContractState,
        impl ERC721URIstorage: ERC721URIstorageComponent::HasComponent<TContractState>,
        impl HasComponent: ERC721Component::HasComponent<TContractState>,
        +SRC5Component::HasComponent<TContractState>,
        +Drop<TContractState>
    > of ERC721Component::ERC721HooksTrait<TContractState> {
        fn before_update(
            ref self: ERC721Component::ComponentState<TContractState>,
            to: ContractAddress,
            token_id: u256,
            auth: ContractAddress
        ) {
            let mut erc721_URIstorage_component = get_dep_component_mut!(
                ref self, ERC721URIstorage
            );
            erc721_URIstorage_component.before_update(to, token_id);
        }

        fn after_update(
            ref self: ERC721Component::ComponentState<TContractState>,
            to: ContractAddress,
            token_id: u256,
            auth: ContractAddress
        ) {}
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        name: ByteArray,
        symbol: ByteArray,
        base_uri: ByteArray,
        recipient: ContractAddress,
        token_id: u256
    ) {
        self.erc721.initializer(name, symbol, base_uri);
        self.erc721_URIstorage.initializer();
        self.erc721._mint(recipient, token_id);
    }
}

#[starknet::contract]
mod SnakeERC721URIstorageMock {
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component::ERC721HooksTrait;
    use openzeppelin::token::erc721::ERC721Component;
    use openzeppelin::token::erc721::extensions::ERC721URIstorageComponent;

    use starknet::ContractAddress;

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(
        path: ERC721URIstorageComponent, storage: erc721_URIstorage, event: ERC721URIstorageEvent
    );
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // ERC721
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    // ERC721URIstorage
    #[abi(embed_v0)]
    impl ERC721URIstorageImpl =
        ERC721URIstorageComponent::ERC721URIstorageImpl<ContractState>;
    impl ERC721URIstorageInternalImpl = ERC721URIstorageComponent::InternalImpl<ContractState>;

    // SRC5
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        erc721_URIstorage: ERC721URIstorageComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        ERC721URIstorageEvent: ERC721URIstorageComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event
    }

    impl ERC721URIstorageHooksImpl<
        TContractState,
        impl ERC721URIstorage: ERC721URIstorageComponent::HasComponent<TContractState>,
        impl HasComponent: ERC721Component::HasComponent<TContractState>,
        +SRC5Component::HasComponent<TContractState>,
        +Drop<TContractState>
    > of ERC721Component::ERC721HooksTrait<TContractState> {
        fn before_update(
            ref self: ERC721Component::ComponentState<TContractState>,
            to: ContractAddress,
            token_id: u256,
            auth: ContractAddress
        ) {
            let mut erc721_URIstorage_component = get_dep_component_mut!(
                ref self, ERC721URIstorage
            );
            erc721_URIstorage_component.before_update(to, token_id);
        }

        fn after_update(
            ref self: ERC721Component::ComponentState<TContractState>,
            to: ContractAddress,
            token_id: u256,
            auth: ContractAddress
        ) {}
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        name: ByteArray,
        symbol: ByteArray,
        base_uri: ByteArray,
        recipient: ContractAddress,
        token_id: u256
    ) {
        self.erc721.initializer(name, symbol, base_uri);
        self.erc721_URIstorage.initializer();
        self.erc721._mint(recipient, token_id);
    }
}