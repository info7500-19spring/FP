pragma solidity >-0.4 .22 <0.6.0;
address owner; 
mapping {address=>Diploma} info; 
struct Diploma { 
    
     name; 
    address; 
     degree;
     date; 
    
} 
constructor () public { 
    owner = msg.sender 
} 
function addDipoloma(address address, string name, string degree, uint date); { 
assert(msg.sender == owner); 
info[address].address = address; 
info[address].degree = degree; 
info[address].date = date; 
info[address].name = name; 

} 
    