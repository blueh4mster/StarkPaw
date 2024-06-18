use starknet::ContractAddress;

const IERC721URIstorage_ID: felt252 =
    0x16bc0f502eeaf65ce0b3acb5eea656e2f26979ce6750e8502a82f377e538c87;// too be found

#[starknet::interface]
trait IERC721URIstorage<TState> {
    fn _setTokenURI(self: @TState,u256:tokenId,string : tokenURI) ;
}