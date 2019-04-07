pragma solidity ^0.4.9;

contract viewDiploma {
    address owner;
    mapping (uint => address) trustedUniversities;

    // For reference, not used at the moment
    struct Diploma {
        string name
        address studentAddress; 
        string degree;
        uint date; 
    }

    // Sets the owner of the contract once constructed
    constructor() public {
        owner = msg.sender;
    }

    // To figure out how to retrieve the complete diploma
    // Right now only returns separate values
    // Input is the address of the desired student and the id of the university
    function getDiploma(address addr, uint univeristyID) public returns(string name, address studentAddress, string degree, uint date) {
        // TODO Error checking here
        Diploma diplomaContract = Diploma(addr);
        returns diplomaContract.info[addr];
    }

    // Adds a university
    function addUniversity(address universityAddress, uint id) {
        assert(msg.sender == owner);
        trustedUniversities[id] = universityAddress;
    }
}