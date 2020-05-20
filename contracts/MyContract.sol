pragma solidity 0.4.26;

import "./A.sol";

contract Proxy {
  event Upgraded(address indexed implementation);
  
  address internal impl;

  function implementation() public view returns (address) {
    return impl;
  }


  function () external payable {
    address _impl = impl;
    require(_impl != address(0), "implementation contract not set");

    assembly {
        let ptr := mload(0x40)
        calldatacopy(ptr, 0, calldatasize)
        let result := delegatecall(gas, _impl, ptr, calldatasize, 0, 0)
        let size := returndatasize
        returndatacopy(ptr, 0, size)

        switch result
        case 0 { revert(ptr, size) }
        default { return(ptr, size) }
    }
  }
}

// contract P is A, Proxy {
contract P is A, Proxy {
  function upgradeTo(address _impl) public {
      require(_impl != address(0), "Cannot upgrade to invalid address");
      require(_impl != impl, "Cannot upgrade to the same implementation");
      impl = _impl;
      emit Upgraded(impl);
  }
}

