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
        Schema::table('student_regns', function (Blueprint $table) {

            $table->longText('exam_summary');
            $table->integer('bridge_course')->default(0);



        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_regns', function (Blueprint $table) {
            //
        });
    }
};
