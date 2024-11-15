// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import { MyOFT } from "./MyOFT.sol";

contract Ahora is Ownable {
    bytes32 public merkleRoot;

    mapping(address => bool) private isWhitelisted;
    mapping(uint256 => address) private tokensAddresses;

    constructor(address _initialOwner, bytes32 _merkleRoot)
        Ownable(_initialOwner)
    {
        merkleRoot = _merkleRoot;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    // function mint(address _to, uint256 _amount, bytes32[] calldata _proof) external returns (bool) onlyOwner {
        
    // }

    function whitelistAddress(bytes32 _root, bytes32 _leaf) public pure {
        MerkleProof.verify(_root, _leaf, 0);
    }

    function isWhitelistedAddress(address _address) public view returns (bool) {
        return isWhitelisted[_address];
    }
}