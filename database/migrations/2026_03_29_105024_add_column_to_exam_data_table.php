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
        Schema::table('exam_data', function (Blueprint $table) {

            $table->unsignedBigInteger('student_regid')->after('id')->nullable();

            $table->foreign('student_regid')->references('id')->on('student_regns')->cascadeOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exam_data', function (Blueprint $table) {
            //
        });
    }
};
