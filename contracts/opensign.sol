pragma solidity ^0.4.17;

contract OpenSign{
    struct Document {
        uint timestamp;
        bytes ipfs_hash;
        address[] signatures;
    }
    mapping(address => bytes[]) public users; //maps addresses to agreement id
    mapping(bytes32 => Document) public documents; //maps keccak256(agreement_id) hashes to documents

    function addDocument(bytes id, bytes ipfs) public {
        users[msg.sender].push(ipfs); //Add document to users's "signed" list
        address[] memory sender = new address[](1);
        sender[0] = msg.sender;
        documents[keccak256(id)] = Document(block.timestamp, ipfs, sender);
    }

    function signDocument(bytes id) public {
        users[msg.sender].push(id);
        documents[keccak256(id)].signatures.push(msg.sender);
    }
    
    function getSignatures(bytes id) public view returns (address[]) {
        return documents[keccak256(id)].signatures;
    }
}