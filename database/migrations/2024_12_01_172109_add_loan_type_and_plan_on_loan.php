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
        Schema::table('loans', function (Blueprint $table) {
            // Change the existing 'loan_type' column to 'uuid'
            $table->uuid('loan_type')->change();
            $table->uuid('loan_plan')->after('loan_type');

            // Add foreign key constraints
            $table->foreign('loan_type')->references('id')->on('loan_types')->onDelete('set null');
            $table->foreign('loan_plan')->references('id')->on('loan_plans')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->enum('loan_type', ['Personal', 'Business', 'School Fees', 'Agricultural'])->change();
            $table->dropColumn('loan_plan');
        });
    }
};
