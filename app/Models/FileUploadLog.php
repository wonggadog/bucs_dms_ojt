<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileUploadLog extends Model
{
    use HasFactory;

    protected $table = 'file_upload_logs'; // Ensure it matches your database table
    protected $fillable = ['file_name', 'file_type', 'timestamp']; // Columns that can be mass assigned
}
