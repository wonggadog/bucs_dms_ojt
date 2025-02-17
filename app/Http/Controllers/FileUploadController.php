<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FileUploadLog; // Import the model

class FileUploadController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,png',
            'file_type' => 'required|string',
        ]);

        // Store the file in storage
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();  // Get the original filename
        $file->storeAs('uploads', $fileName);  // Store the file in the uploads directory

        // Log the file upload in the database
        FileUploadLog::create([
            'file_name' => $fileName,
            'file_type' => $validated['file_type'],
            'timestamp' => now(),
        ]);

        // Return a success response
        return response()->json(['success' => true, 'message' => 'File uploaded successfully']);
    }
}
