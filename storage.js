// This file manages the storage and retrieval of contract data. It includes functions to save contracts to local storage or a JSON file and retrieve them for editing.

const contractsKey = 'umrahContracts';

// Save contract data to local storage
function saveContract(contract) {
    const contracts = getContracts();
    contracts.push(contract);
    localStorage.setItem(contractsKey, JSON.stringify(contracts));
}

// Retrieve all contracts from local storage
function getContracts() {
    const contracts = localStorage.getItem(contractsKey);
    return contracts ? JSON.parse(contracts) : [];
}

// Retrieve a specific contract by index
function getContract(index) {
    const contracts = getContracts();
    return contracts[index] || null;
}

// Update a specific contract by index
function updateContract(index, updatedContract) {
    const contracts = getContracts();
    contracts[index] = updatedContract;
    localStorage.setItem(contractsKey, JSON.stringify(contracts));
}

// Delete a specific contract by index
function deleteContract(index) {
    const contracts = getContracts();
    contracts.splice(index, 1);
    localStorage.setItem(contractsKey, JSON.stringify(contracts));
}