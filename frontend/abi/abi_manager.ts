//manager address: 0x02978a096d277edf4da2462471f2f117384cf5dcaa37d87a09dcdb06cdbe0631

export const abi_manager = [
  {
    type: "impl",
    name: "Manager",
    interface_name: "starkpet::manager::IManager",
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "interface",
    name: "starkpet::manager::IManager",
    items: [
      {
        type: "function",
        name: "get_nfts",
        inputs: [
          {
            name: "caller",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<(core::starknet::contract_address::ContractAddress, core::integer::u256)>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "mint_nft",
        inputs: [
          {
            name: "num",
            type: "core::integer::u256",
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "setTokenURI",
        inputs: [
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "num",
            type: "core::integer::u256",
          },
          {
            name: "tokenURI",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "tokenId",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "nft1",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "nft2",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "nft3",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "starkpet::manager::Manager::Event",
    kind: "enum",
    variants: [],
  },
];
