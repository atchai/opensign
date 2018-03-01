pragma solidity ^0.4.17;

contract Notary {
    struct Document {
        uint timestamp;
        bytes ipfs_hash;
        address[] signatures;
    }
    mapping(address => bytes[]) public users; //maps addresses to ipfs document hashes
    mapping(bytes32 => Document) public documents; //maps keccak256(ipfs) hashes to documents

    function addDocument(bytes ipfs) public {
        users[msg.sender].push(ipfs); //Add document to users's "signed" list
        address[] memory sender = new address[](1);
        sender[0] = msg.sender;
        documents[keccak256(ipfs)] = Document(block.timestamp, ipfs, sender);
    }

    function signDocument(bytes ipfs) public {
        users[msg.sender].push(ipfs);
        documents[keccak256(ipfs)].signatures.push(msg.sender);
    }
    
    function getSignatures(bytes ipfs) public view returns (address[]) {
        return documents[keccak256(ipfs)].signatures;
    }

}