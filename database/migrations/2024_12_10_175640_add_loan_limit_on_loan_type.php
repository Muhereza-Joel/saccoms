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
        Schema::table('loan_plans', function (Blueprint $table) {
            $table->decimal('loan_plan_limit', 15, 2)->nullable()->after('loan_plan_penalty');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('loan_plans', function (Blueprint $table) {
            $table->dropColumn('loan_plan_limit');
        });
    }
};