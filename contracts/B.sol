pragma solidity 0.4.26;

import "./A.sol";

contract B is A {
  function setA(uint256 a_) public {
      a = a_;
  }
}