pragma solidity >-0.4 .22 <0.6.0;
contract Diploma { 
address owner; 
mapping {address=>Diploma} info; 
struct Diploma { 
    
     string name; 
    address studentAddress; 
     string degree;
     uint date; 
    
} 
constructor () public { 
    owner = msg.sender 
} 
function addDipoloma(address _address, string name, string degree, uint date); { 
assert(msg.sender == owner); 
info[address].studentAddress = _address; 
info[address].degree = degree; 
info[address].date = date; 
info[address].name = name; 

} 
} 
    
    
