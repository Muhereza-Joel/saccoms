<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeTicketStatusDefaultToOpen extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('support_tickets', function (Blueprint $table) {
            // Drop and re-add the 'status' column
            $table->dropColumn('status');
        });

        Schema::table('support_tickets', function (Blueprint $table) {
            $table->enum('status', ['Open', 'In Progress', 'Resolved', 'Closed'])->after('description')
                ->default('Open');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('support_tickets', function (Blueprint $table) {
            // Drop and re-add the 'status' column
            $table->dropColumn('status');
        });

        Schema::table('support_tickets', function (Blueprint $table) {
            $table->enum('status', ['Open', 'In Progress', 'Resolved', 'Closed'])->after('description');
        });
    }
}
