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
        Schema::create('accounts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('account_number')->unique();
            $table->enum('account_type', ['Savings', 'Current', 'Fixed Deposit']);
            $table->uuid('member_id');
            $table->decimal('amount')->default(0);
            $table->float('interest_rate')->comment('Applys To Fixed Deposit Accounts');
            $table->date('start_date');
            $table->date('end_date')->comment('Applys To Fixed Deposit Accounts');
            $table->enum('status', ['Active', 'Closed', 'Suspended']);
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
