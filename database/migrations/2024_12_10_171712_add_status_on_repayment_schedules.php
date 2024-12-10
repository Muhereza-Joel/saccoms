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
        Schema::table('repayment_schedules', function (Blueprint $table) {
            $table->enum('status', ['paid', 'not-paid'])->default('not-paid')->after('amount_due');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('repayment_schedules', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
