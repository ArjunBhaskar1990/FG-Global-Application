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
        Schema::create('student_regns', function (Blueprint $table) {

            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->longText('address');
            $table->string('city');
            $table->string('state');
            $table->integer('contact_no');
            $table->string('email');
            $table->dateTime('dob');
            $table->integer('age');
            $table->integer('gender');
            $table->string('adhaar');
            $table->string('passport');
            $table->string('package');
            $table->string('tuition_mode');
            $table->string('competitive_mode');
            $table->string('duration');
            $table->string('previous_school');
            $table->integer('automated_calls');
            $table->string('automated_email');
            $table->string('mother_name');
            $table->longText('mother_address');
            $table->integer('mother_contact');
            $table->string('mother_employment');
            $table->integer('mother_phone');
            $table->string('mother_email');
            $table->string('mother_qualification');
            $table->string('father_name');
            $table->longText('father_address');
            $table->integer('father_contact');
            $table->string('father_employment');
            $table->integer('father_phone');
            $table->string('father_email');
            $table->string('father_qualification');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_regns');
    }
};
