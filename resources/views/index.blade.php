<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}"> <!-- Add CSRF Token -->
    <title>BUCS Document Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>

    <!-- Navbar with Logo -->
    <nav class="navbar fixed-top w-100">
        <div class="container-fluid">
            <a class="navbar-brand">
                <img src="{{ asset('images/logo.png') }}" alt="BUCS Logo" class="logo">
            </a>
        </div>
    </nav>

    <!-- Form Container -->
    <div class="container mt-5 pt-5">
        <h2 class="text-center">BUCS Document Management System</h2>
        <form id="applicationForm" method="POST" action="{{ url('/upload-file') }}" enctype="multipart/form-data">
            @csrf
            <!-- Dropdown for selecting file type -->
            <div class="form-group">
                <label for="fileType" class="form-label">Select File Type:</label>
                <select id="fileType" class="form-control" name="file_type">
                    <option value="administrative_order">Administrative Order</option>
                    <option value="memorandum">Memorandum</option>
                    <option value="report">Report</option>
                    <option value="financial_document">Financial Document</option>
                    <option value="student_records">Student Records</option>
                    <option value="others">Others</option>
                </select>
            </div>

            <!-- Single File Upload Area (Centered) -->
            <div class="file-upload-container">
                <label class="form-label">Upload A File:</label>
                <div class="file-upload" onclick="document.getElementById('fileInput').click()">
                    <img src="{{ asset('images/upload.png') }}" alt="Upload Icon" class="upload-icon">
                    <p id="fileLabel">Upload a File<br><small>Drag and drop files here</small></p>
                    <input type="file" id="fileInput" accept=".pdf, .jpg, .png" name="file" required style="display: none;">
                </div>
            </div>

            <!-- Buttons: Submit (Above), History (Below) -->
            <div class="button-group">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" id="historyButton" class="btn btn-secondary">History</button>
            </div>
        </form>
    </div>

    <!-- Confirmation Modal -->
    <div id="confirmationModal" class="modal">
        <div class="modal-content">
            <p>Thank you for filling up, please wait for our email for further information.</p>
            <button id="modalOkButton" class="btn btn-primary">OK</button>
        </div>
    </div>
    
    <!-- History Modal -->
    <div id="historyModal" class="modal">
        <div class="modal-content">
            <p>Submission History:</p>
            <ul id="historyList"></ul>
            <div class="modal-buttons">
                <button id="historyOkButton" class="btn btn-secondary">OK</button>
                <button id="clearHistoryButton" class="btn btn-secondary">Clear</button>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/scripts.js') }}"></script>
</body>
</html>
