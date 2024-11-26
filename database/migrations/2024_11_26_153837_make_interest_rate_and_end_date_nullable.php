<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::table('accounts', function (Blueprint $table) {
            $table->float('interest_rate')->nullable()->change();
            $table->date('end_date')->nullable()->change();
        });
    }

   
    public function down(): void
    {
        Schema::table('accounts', function (Blueprint $table) {
            $table->float('interest_rate')->comment('Applies To Fixed Deposit Accounts')->change();
            $table->date('end_date')->comment('Applies To Fixed Deposit Accounts')->change();
        });
    }
};
