<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileUploadController;

Route::get('/', function () {
    return view('index');  // This will render resources/views/index.blade.php
});

Route::post('/upload-file', [FileUploadController::class, 'store']);

