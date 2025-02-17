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
    const fileTypeSelect = document.getElementById("fileType");

    console.log("Script is running");

    // Handle file input change
    fileInput.addEventListener("change", function () {
        if (this.files.length > 0) {
            let fileNames = Array.from(this.files).map(file => file.name).join(", ");
            fileLabel.innerText = fileNames;
        }
    });

    // Form submission event
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        if (fileInput.files.length === 0) {
            alert("Please upload at least one file before submitting.");
            console.log("Upload unsuccessful - no file selected.");
            return;
        }

        const fileType = fileTypeSelect.value;
        const formData = new FormData();
        formData.append("file", fileInput.files[0]); // Send only one file
        formData.append("file_type", fileType);

        // CSRF Token
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

        fetch("/upload-file", {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRF-TOKEN": csrfToken, // CSRF protection for Laravel
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log("Upload success:", data.message);

                    // Save to localStorage
                    let submissionHistory = JSON.parse(localStorage.getItem("submissionHistory")) || [];
                    submissionHistory.push({
                        fileName: fileInput.files[0].name,
                        fileType: fileType,
                        timestamp: new Date().toLocaleString(),
                    });
                    localStorage.setItem("submissionHistory", JSON.stringify(submissionHistory));

                    // Show confirmation modal
                    confirmationModal.style.display = "flex";
                } else {
                    alert("Error while uploading file.");
                    console.error("Upload failed:", data);
                }
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                alert("Error uploading file. Please try again.");
            });
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
            submissionHistory.forEach((entry) => {
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
