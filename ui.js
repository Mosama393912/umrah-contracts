// ui.js
document.addEventListener('DOMContentLoaded', () => {
    const contractList = document.getElementById('contractList');
    const umrahForm = document.getElementById('umrahForm');

    // Load existing contracts on page load
    loadContracts();

    // Function to load contracts from storage and display them
    function loadContracts() {
        const contracts = JSON.parse(localStorage.getItem('contracts')) || [];
        contractList.innerHTML = '';

        contracts.forEach((contract, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${contract.name} - ${contract.travelDate}`;
            listItem.addEventListener('click', () => editContract(index));
            contractList.appendChild(listItem);
        });
    }

    // Function to populate the form with contract data for editing
    function editContract(index) {
        const contracts = JSON.parse(localStorage.getItem('contracts')) || [];
        const contract = contracts[index];

        document.getElementById('name').value = contract.name;
        document.getElementById('phone').value = contract.phone;
        document.getElementById('nid').value = contract.nid;
        document.getElementById('passport').value = contract.passport;
        document.getElementById('address').value = contract.address;
        document.getElementById('travelDate').value = contract.travelDate;
        document.getElementById('returnDate').value = contract.returnDate;
        document.getElementById('roomType').value = contract.roomType;
        document.getElementById('transport').value = contract.transport;
        document.getElementById('hotelMakkah').value = contract.hotelMakkah;
        document.getElementById('hotelMadina').value = contract.hotelMadina;
        document.getElementById('price').value = contract.price;

        // Remove the contract from storage after editing
        contracts.splice(index, 1);
        localStorage.setItem('contracts', JSON.stringify(contracts));
        loadContracts();
    }

    // Function to save contract data to local storage
    function saveContract(data) {
        const contracts = JSON.parse(localStorage.getItem('contracts')) || [];
        contracts.push(data);
        localStorage.setItem('contracts', JSON.stringify(contracts));
        loadContracts();
    }

    // Event listener for form submission
    umrahForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const contractData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            nid: document.getElementById('nid').value,
            passport: document.getElementById('passport').value,
            address: document.getElementById('address').value,
            travelDate: document.getElementById('travelDate').value,
            returnDate: document.getElementById('returnDate').value,
            roomType: document.getElementById('roomType').value,
            transport: document.getElementById('transport').value,
            hotelMakkah: document.getElementById('hotelMakkah').value,
            hotelMadina: document.getElementById('hotelMadina').value,
            price: document.getElementById('price').value
        };

        saveContract(contractData);
        umrahForm.reset();
    });
});