pragma solidity ^0.5.0;
import "./Institution.sol";

contract DiplomaViewer {
    address owner;
    // University ID => Address of the university contract
    mapping (uint => address) trustedUniversities;

    // Sets the owner of the contract once constructed
    constructor() public {
        owner = msg.sender;
    }

    // Returns the diploma of the person at the university
    function getDiploma(address _addr, uint _universityID) public view returns(string memory, address, string memory, uint) {
        address universityAddress = trustedUniversities[_universityID];
        require(universityAddress!=address(0)); // Checks if university address exist
        Institution institutionContract = Institution(universityAddress);
        return institutionContract.viewDiploma(_addr);
    }

    // Adds or modify a university's address
    function addUniversity(address _universityAddress, uint _universityID) public {
        require(msg.sender == owner);
        trustedUniversities[_universityID] = _universityAddress;
    }
}