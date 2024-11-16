// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Ahora is Ownable {
    bytes32 public merkleRoot;

    mapping(address => bool) private whitelistedAddresses;

    constructor(address _initialOwner, bytes32 _merkleRoot) Ownable(_initialOwner) {
        merkleRoot = _merkleRoot;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    // function mint(address _to, uint256 _amount, bytes32[] calldata _proof) external returns (bool) onlyOwner {

    // }

    function whitelist(bytes32[] memory proof, address addr) public {
        // Step 1: Generate the leaf node
        bytes32 leaf = keccak256(abi.encode(addr));

        // Step 2: Verify the proof
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");

        // Step 3: Mark the address as whitelisted
        whitelistedAddresses[addr] = true;
    }

    function isWhitelisted(address _account, bytes32[] calldata _proof) internal view returns (bool) {
        bytes32 leaf = keccak256(abi.encode(keccak256(abi.encode(_account))));
        return MerkleProof.verify(_proof, merkleRoot, leaf);
    }
}
