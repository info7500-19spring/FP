pragma solidity ^0.5.0;

contract Institution {

    // Fields of a diploma
    struct Diploma {  
        string name; 
        address studentAddress; 
        string degree;
        uint date; 
    } 

    address owner;

    // Person => Diploma of Person
    mapping(address => Diploma) info;

    constructor () public { 
        owner = msg.sender;
    } 

    // Add a new Diploma
    function addDipoloma(address _address, string memory _name, string memory _degree, uint _date) public { 
        require(msg.sender == owner); 
        info[_address].studentAddress = _address; 
        info[_address].degree = _degree; 
        info[_address].date = _date; 
        info[_address].name = _name; 
    }

    // View diploma of given person
    function viewDiploma(address _address) public view returns(string memory, address studentaddress, string memory, uint date) {
        Diploma storage diploma = info[_address];
        return (diploma.name, diploma.studentAddress, diploma.degree, diploma.date);
    }
}

    
    
