import { EndpointId } from '@layerzerolabs/lz-definitions';

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat';

const scrollSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SCROLL_V2_TESTNET,
    contractName: 'MyOFT',
};

const unichainSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.UNICHAIN_V2_TESTNET,
    contractName: 'MyOFT',
};

const zircuitSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.ZIRCUIT_V2_TESTNET,
    contractName: 'MyOFT',
};

const rootstockSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.ROOT_V2_TESTNET,
    contractName: 'MyOFT',
};

const lineaSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.LINEASEP_V2_TESTNET,
    contractName: 'MyOFT',
};

const contracts = [
    scrollSepoliaContract,
    unichainSepoliaContract,
    zircuitSepoliaContract,
    rootstockSepoliaContract,
    lineaSepoliaContract
];

// Generate all bidirectional connections
const connections = contracts.flatMap((fromContract) =>
    contracts
        .filter((toContract) => toContract !== fromContract) // Exclude self-connections
        .map((toContract) => ({
            from: fromContract,
            to: toContract,
        }))
);

const config: OAppOmniGraphHardhat = {
    contracts: contracts.map((contract) => ({ contract })),
    connections,
};

export default config;
