pragma solidity ^0.5.0;

contract Platform {

    // Fields of a diploma
    struct Diploma {  
        address studentAddress; 
        string degree;
        uint date; 
    } 

    // Fields of a Person
    struct Person {  
        string name; 
        address personAddress; 
        Diploma degree;
        uint lastUpdate;
        string email; 		
    } 

    // Person => Diploma of Person
    mapping(address => Diploma) diplomaList;
    

    constructor () public { 
       
    } 

    // Add a new Diploma
    function addDipoloma(address _studentAddress, string memory _degree, uint _date) public {
        Diploma newDiploma = Diploma(_studentAddress,_degree,_date); 
        diplomaList[msg.sender]
    }

    // View diploma of given person
    function viewDiploma(address _studentAddress, address _universityAddress) public view returns(string memory, address studentaddress, string memory, uint date) {
        Diploma storage diploma = info[_address];
        return (diploma.name, diploma.studentAddress, diploma.degree, diploma.date);
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

    
    
