document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const fileLabel = document.getElementById("fileLabel");
    const form = document.getElementById("applicationForm");
    const confirmationModal = document.getElementById("confirmationModal");
    const modalOkButton = document.getElementById("modalOkButton");
    const historyButton = document.getElementById("historyButton");
    const historyModal = document.getElementById("historyModal");
    const historyList = document.getElementById("historyList");
    const historyOkButton = document.getElementById("historyOkButton");
    const clearHistoryButton = document.getElementById("clearHistoryButton");
    const fileTypeSelect = document.getElementById("fileType"); // Reference to the dropdown menu

    console.log("Script is running");

    // Handle multiple file uploads
    fileInput.addEventListener("change", function () {
        if (this.files.length > 0) {
            let fileNames = Array.from(this.files).map(file => file.name).join(", ");
            fileLabel.innerText = fileNames;
        }
    });

    // Form submission event
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let submissionHistory = JSON.parse(localStorage.getItem("submissionHistory")) || [];
        let newUploads = [];
        const fileType = fileTypeSelect.value; // Get selected file type

        if (fileInput.files.length > 0) {
            Array.from(fileInput.files).forEach(file => {
                newUploads.push({
                    fileName: file.name,
                    fileType: fileType, // Include the selected file type
                    timestamp: new Date().toLocaleString()
                });
                console.log("Upload success");
            });
        } else {
            alert("Please upload at least one file before submitting.");
            console.log("Upload unsuccessful");
            return;
        }

        submissionHistory = submissionHistory.concat(newUploads);
        localStorage.setItem("submissionHistory", JSON.stringify(submissionHistory));

        confirmationModal.style.display = "flex";
    });

    // Modal "OK" button event
    modalOkButton.addEventListener("click", function () {
        confirmationModal.style.display = "none";
        fileInput.value = "";
        fileLabel.innerHTML = "Upload a File<br><small>Drag and drop files here</small>";
    });

    // History button event
    historyButton.addEventListener("click", function () {
        const submissionHistory = JSON.parse(localStorage.getItem("submissionHistory")) || [];
        historyList.innerHTML = "";

        if (submissionHistory.length > 0) {
            submissionHistory.forEach(entry => {
                const listItem = document.createElement("li");
                listItem.textContent = `${entry.fileName} (Type: ${entry.fileType}) - ${entry.timestamp}`;
                historyList.appendChild(listItem);
            });
        } else {
            historyList.innerHTML = "<li>No files uploaded yet</li>";
        }

        historyModal.style.display = "flex";
    });

    // History modal "OK" button event
    historyOkButton.addEventListener("click", function () {
        historyModal.style.display = "none";
    });

    // Clear history button event
    clearHistoryButton.addEventListener("click", function () {
        localStorage.removeItem("submissionHistory");
        historyList.innerHTML = "<li>No files uploaded yet</li>";
    });
});
