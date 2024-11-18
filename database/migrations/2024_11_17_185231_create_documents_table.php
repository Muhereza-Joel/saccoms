<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('member_id');
            $table->enum('document_type', ['ID', 'Loan Agreement', 'Proof of Residence', 'Bank Statement']);
            $table->string('file_path');
            $table->unsignedBigInteger('file_size'); // Size of the file in bytes
            $table->string('file_type'); // MIME type of the file
            $table->string('original_name'); // Original name of the uploaded file
            $table->uuid('uploaded_by');
            $table->enum('status', ['Verified', 'Pending']);
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
            $table->foreign('uploaded_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
