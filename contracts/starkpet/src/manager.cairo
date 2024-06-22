use starknet::ContractAddress;

// class hash: 0x03480d50d84bda7bc728c87408df39cc0572aadd4b16ee5833817ff4fc96bd8c
// deployed contract:0x02978a096d277edf4da2462471f2f117384cf5dcaa37d87a09dcdb06cdbe0631
//deployment transaction: 0x00cadc608564827c1f014d9605579964ba27b2e0239b9f9450de6dff84ad62a8

#[starknet::interface]
pub trait IERC<TContractState> {
    fn get_name(self: @TContractState) -> ByteArray;
    fn get_symbol(self: @TContractState) -> ByteArray;
    // fn get_total_supply(self: @TContractState) -> ByteArray;
    fn get_token_uri(self:@TContractState,tokenId:u256)->ByteArray;
    fn _mint(ref self: TContractState,recipient:ContractAddress,tokenId:u256);//might return a bool
    fn set_token_uri(ref self:TContractState, tokenId:u256,tokenURI:ByteArray);

}
#[starknet::interface]
pub trait IManager<TContractState> {
    // fn register_user(ref self:TContractState);// the cllaer's address will be registered
    fn get_nfts(self: @TContractState,caller: ContractAddress)->Array<(ContractAddress,u256)>;
    fn mint_nft(ref self: TContractState, num:u256,address: ContractAddress,tokenId:u256);
    fn setTokenURI(ref self: TContractState, address:ContractAddress,num:u256,tokenURI:ByteArray,tokenId:u256)->bool;
}

#[starknet::contract]
pub mod Manager {
    use super::IManager;
    use super::{IERCDispatcher, IERCDispatcherTrait};
    use starknet::{ContractAddress, get_caller_address, get_contract_address};

    #[storage]
    struct Storage {
        nft_addresses: LegacyMap<u256,IERCDispatcher>,
        #[derive(Hash)]
        user_nft: LegacyMap<(ContractAddress,ContractAddress),u256>,
    }

    #[constructor]
    fn constructor(ref self: ContractState, nft1: ContractAddress,nft2: ContractAddress,nft3: ContractAddress) {
        self.nft_addresses.write(1,IERCDispatcher { contract_address: nft1 });
        self.nft_addresses.write(2,IERCDispatcher { contract_address: nft2 });
        self.nft_addresses.write(3,IERCDispatcher { contract_address: nft3 });
    }

    #[abi(embed_v0)]
    impl Manager of super::IManager<ContractState> {

        //returns array of nfts for a particular user
        fn get_nfts(self: @ContractState,caller: ContractAddress)->Array<(ContractAddress,u256)>{
            // let caller=get_caller_address();
            let addr1=self.nft_addresses.read(1);
            let addr2=self.nft_addresses.read(2);
            let addr3=self.nft_addresses.read(3);
            let num1=self.user_nft.read((caller,addr1.contract_address));
            let num2=self.user_nft.read((caller,addr2.contract_address));
            let num3=self.user_nft.read((caller,addr3.contract_address));
            let mut arr:Array<(IERCDispatcher,u256)> =ArrayTrait::new();

            arr.append((addr1,num1));
            arr.append((addr2,num2));
            arr.append((addr3,num3));
        
            let length=arr.len();
            let mut returnarr:Array<(ContractAddress,u256)> =ArrayTrait::new();
            let mut number=0;
            while number != length {
                let (addr,tokenId):(IERCDispatcher,u256) = *arr[number];
                returnarr.append((addr.contract_address,tokenId));
                number += 1;
            };
            
            return returnarr;
        }

        //lets user mint nft with a particular tokenId
        // follow CEI pattern
        fn mint_nft(ref self: ContractState, num:u256,address: ContractAddress,tokenId:u256){
            let nft_addr=self.nft_addresses.read(num);//num gets u that which nft u want to mint
            
            self.user_nft.write((address,nft_addr.contract_address),tokenId);
            
            IERCDispatcher{contract_address:nft_addr.contract_address}._mint(address,tokenId);
        }

        //u need to provide which nft it is 
        // CEI pattern
        fn setTokenURI(ref self: ContractState, address:ContractAddress,num:u256,tokenURI:ByteArray,tokenId:u256)->bool{
                let nft_addr=self.nft_addresses.read(num);//got which nft

                // check if user owns it
                let mut owner=false;
                if self.user_nft.read((address,nft_addr.contract_address))!=0{
                    owner=true;
                }
                //if not the owner return 
                if !owner{
                    return false;
                }
                IERCDispatcher{contract_address: nft_addr.contract_address}.set_token_uri(tokenId,tokenURI);
                return true;
        }
    }
}