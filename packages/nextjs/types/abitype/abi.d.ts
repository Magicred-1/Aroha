import "@/node_modules/viem/node_modules/abitype";
import "abitype";

type AddressType = string;

declare module "abitype" {
  export interface Register {
    AddressType: AddressType;
  }
}

declare module "@/node_modules/viem/node_modules/abitype" {
  export interface Register {
    AddressType: AddressType;
  }
}
