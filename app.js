// This file contains the main JavaScript functionality for the umrah contract form.
// It handles event listeners, manages the flow of data between the UI and storage,
// and allows for the creation, retrieval, and editing of contracts.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('umrahForm');
    const btnCreatePdf = document.getElementById('btnCreatePdf');
    const btnDownload = document.getElementById('btnDownload');
    const btnOpenWindow = document.getElementById('btnOpenWindow');
    const btnEdit = document.getElementById('btnEdit');
    const btnWhatsApp = document.getElementById('btnWhatsApp');

    // Load existing contracts on page load
    loadContracts();

    // Event listeners
    btnCreatePdf.addEventListener('click', createPdfPreview);
    btnDownload.addEventListener('click', downloadLastPdf);
    btnOpenWindow.addEventListener('click', openPreviewWindow);
    btnEdit.addEventListener('click', editData);
    btnWhatsApp.addEventListener('click', sendPdfToWhatsApp);
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        createPdfPreview();
    });

    // Function to create PDF preview and save contract
    async function createPdfPreview() {
        if (!formatAndValidatePhone(true)) return;

        const data = gatherFormData();
        await saveContract(data); // Save contract data
        // Existing PDF creation logic...
    }

    // Function to gather form data
    function gatherFormData() {
        return {
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
    }

    // Function to save contract data
    async function saveContract(contract) {
        let contracts = await loadContractsFromStorage();
        contracts.push(contract);
        await saveContractsToStorage(contracts);
    }

    // Function to load contracts from storage
    async function loadContractsFromStorage() {
        const response = await fetch('data/contracts.json');
        return response.ok ? await response.json() : [];
    }

    // Function to save contracts to storage
    async function saveContractsToStorage(contracts) {
        const response = await fetch('data/contracts.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contracts)
        });
        return response.ok;
    }

    // Function to load contracts and populate UI
    function loadContracts() {
        loadContractsFromStorage().then(contracts => {
            // Logic to display contracts in the UI
        });
    }

    // Function to edit data
    function editData() {
        // Logic to populate form with selected contract data for editing
    }
});