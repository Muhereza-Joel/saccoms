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
            $table->date('approval_date')->nullable()->change();
            $table->date('disbursement_date')->nullable()->change();
            $table->date('due_date')->nullable()->change();
            $table->uuid('loan_officer')->nullable()->change();
            $table->uuid('loan_plan')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('loans', function (Blueprint $table) {
            // Make columns non-nullable when rolling back
            $table->date('approval_date')->nullable(false)->change();
            $table->date('disbursement_date')->nullable(false)->change();
            $table->date('due_date')->nullable(false)->change();
            $table->uuid('loan_officer')->nullable(false)->change();
            $table->uuid('loan_plan')->nullable(false)->change();
        });
    }
};
