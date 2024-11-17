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
        Schema::create('loans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('member_id');
            $table->enum('loan_type', ['Personal', 'Business', 'School Fees', 'Agricultural']);
            $table->decimal('principal_amount');
            $table->float('interest_rate');
            $table->integer('repayment_period')->comment('In Months');
            $table->enum('repayment_schedule', ['Daily', 'Weekly', 'Monthly', 'Quarterly']);
            $table->text('collateral')->comment('Description of collateral offered');
            $table->enum('status', ['Pending', 'Approved', 'Rejected', 'Disbursed', 'Paid']);
            $table->date('approval_date');
            $table->date('disbursement_date');
            $table->date('due_date');
            $table->decimal('outstanding_balance')->default(0);
            $table->uuid('loan_officer');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('member_id')->references('id')->on('members')->onDelete('cascade');
            $table->foreign('loan_officer')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
