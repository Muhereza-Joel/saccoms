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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('member_id');
            $table->uuid('account_id')->nullable();
            $table->uuid('loan_id')->nullable();
            $table->enum('transaction_type', ['Deposit', 'Withdrawal', 'Loan Repayment']);
            $table->decimal('amount', 15, 2);
            $table->dateTime('transaction_date');
            $table->string('reference_number')->unique();
            $table->enum('status', ['Pending', 'Completed', 'Failed']);
            $table->text('remarks')->nullable();
            $table->softDeletes();
            $table->timestamps();
        
            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('set null');
            $table->foreign('loan_id')->references('id')->on('loans')->onDelete('set null');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
