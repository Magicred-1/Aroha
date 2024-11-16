export const ABI_AROHA = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_endpoint",
        type: "address",
        internalType: "address",
      },
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_pythContract",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "USDC",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addSupportedToken",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allowInitializePath",
    inputs: [
      {
        name: "origin",
        type: "tuple",
        internalType: "struct Origin",
        components: [
          {
            name: "srcEid",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "sender",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "nonce",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "buy",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "amountToBuyInUSD",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "shouldCreateLP",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "priceUpdates",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "destinationChainEids",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "endpoint",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ILayerZeroEndpointV2",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "fetchPriceFeed",
    inputs: [
      {
        name: "_priceUpdate",
        type: "bytes[]",
        internalType: "bytes[]",
      },
      {
        name: "_priceFeedAddress",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_decimals",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "isComposeMsgSender",
    inputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Origin",
        components: [
          {
            name: "srcEid",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "sender",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "nonce",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_sender",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "lzReceive",
    inputs: [
      {
        name: "_origin",
        type: "tuple",
        internalType: "struct Origin",
        components: [
          {
            name: "srcEid",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "sender",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "nonce",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
      {
        name: "_guid",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_message",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_executor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_extraData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "nextNonce",
    inputs: [
      {
        name: "",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "nonce",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "oAppVersion",
    inputs: [],
    outputs: [
      {
        name: "senderVersion",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "receiverVersion",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "peers",
    inputs: [
      {
        name: "eid",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [
      {
        name: "peer",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pendingPurchases",
    inputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "shouldLP",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "priceFeedIds",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeSupportedToken",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDelegate",
    inputs: [
      {
        name: "_delegate",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPeer",
    inputs: [
      {
        name: "_eid",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_peer",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPriceFeedId",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "priceFeedId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportedTokens",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ERC20Fund",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PeerSet",
    inputs: [
      {
        name: "eid",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
      {
        name: "peer",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenAdded",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenBought",
    inputs: [
      {
        name: "buyer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amountUSD",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "shouldLP",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenPurchaseCompleted",
    inputs: [
      {
        name: "buyer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "dstEid",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "shouldLP",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenPurchaseInitiated",
    inputs: [
      {
        name: "buyer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "dstEid",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "shouldLP",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenRemoved",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AddressInsufficientBalance",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "FailedInnerCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidDelegate",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidEndpointCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidPriceExponent",
    inputs: [],
  },
  {
    type: "error",
    name: "LzTokenUnavailable",
    inputs: [],
  },
  {
    type: "error",
    name: "NoPeer",
    inputs: [
      {
        name: "eid",
        type: "uint32",
        internalType: "uint32",
      },
    ],
  },
  {
    type: "error",
    name: "NotEnoughNative",
    inputs: [
      {
        name: "msgValue",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "OnlyEndpoint",
    inputs: [
      {
        name: "addr",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OnlyPeer",
    inputs: [
      {
        name: "eid",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "sender",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
];
