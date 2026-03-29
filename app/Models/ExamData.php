<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamData extends Model
{

    protected $fillable = [
        'student_regid', 'question', 'answer', 'file',
    ];

    public function regn()
    {

        return $this->belongsTo(StudentRegn::class);
    }

}
