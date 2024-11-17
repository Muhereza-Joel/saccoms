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
        Schema::create('members', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('member_id')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email', 161)->unique();
            $table->string('nin')->unique();
            $table->date('date_of_birth');
            $table->enum('gender', ['male','female']);
            $table->string('country');
            $table->string('region');
            $table->string('district');
            $table->string('county');
            $table->string('sub_county');
            $table->string('parish')->nullable();
            $table->string('village');
            $table->string('phone_number')->unique();
            $table->enum('membership_type', ['Ordinary', 'Premium']);
            $table->enum('status', ['Active', 'Suspended']);
            $table->string('member_photo');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
