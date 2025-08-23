// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ITemplate} from "./interfaces/ITemplate.sol";

contract Template is ITemplate {
    address owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function getOwner() external view override returns (address) {
        return owner;
    }
}