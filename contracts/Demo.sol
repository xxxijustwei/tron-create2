// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Clones} from "./libs/Clones.sol";

contract Demo {

    event Deployed(address indexed instance);
    
    function getPredictAddress(address implementation, bytes32 salt) external view returns (address) {
        return Clones.predictDeterministicAddress(implementation, salt);
    }

    function deploy(address implementation, bytes32 salt) external returns (address) {
        address instance = Clones.cloneDeterministic(implementation, salt);
        emit Deployed(instance);
        return instance;
    }

}
