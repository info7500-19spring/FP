pragma solidity ^0.5.0;

contract Person {

    // Fields of a diploma
    struct Person {  
        string name; 
        address personAddress; 
        string degree;
        uint lastUpdate;
        string email; 		
    } 

    address owner;

    // Address => Person
    mapping(address => Person) personList;

    constructor () public { 
        owner = msg.sender;
    } 

    // Add a new Person
    function addPerson(address _address, string memory _name, string memory _degree, uint _lastUpdate, string memory _email) public { 
        require(msg.sender == owner); 
        personList[_address].personAddress = _address; 
        personList[_address].degree = _degree; 
        personList[_address].lastUpdate = _lastUpdate; 
        personList[_address].name = _name;
        personList[_address].email = _email;		
    }

    // View person
    function viewPerson(address _address) public view returns(
	       string memory, address personaddress, 
		   string memory degree, uint lastUpdate, 
		   string memory email
    ) {
        Person storage person = personList[_address];
        return (
		    person.name, person.personAddress, 
	        person.degree, person.lastUpdate, 
		    person.email
	    );
    }
}