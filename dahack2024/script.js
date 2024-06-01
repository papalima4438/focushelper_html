document.addEventListener("DOMContentLoaded", function() {
    const eegDataElement = document.getElementById('eegData');
    const eegMessageElement = document.getElementById('eegMessage');

    const socket = new WebSocket('ws://localhost:8080'); // WebSocket connection URL

    socket.onopen = function() {
        console.log('WebSocket connection established');
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        const eegValue = parseFloat(data.value);
        eegDataElement.textContent = `EEG Data: ${eegValue} Hz`;

        // Check if EEG value is under 13 Hz and show a pop-up message
        if (eegValue < 13) {
            eegMessageElement.textContent = "Alert: EEG frequency is under 13 Hz!";
            alert("Alert: EEG frequency is under 13 Hz!"); // This will show a pop-up message
        } else {
            eegMessageElement.textContent = ""; // Clear message if above 13 Hz
        }
    };

    socket.onclose = function() {
        console.log('WebSocket connection closed');
    };

    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };
});
