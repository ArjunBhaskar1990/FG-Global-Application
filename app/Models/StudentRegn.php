<?php
namespace App\Models;

use App\Enums\StudentStatus;
use Illuminate\Database\Eloquent\Model;

class StudentRegn extends Model
{

    protected $fillable = [

        'first_name', 'last_name', 'address', 'city', 'state',
        'contact_no', 'email', 'dob', 'age', 'gender', 'adhaar', 'passport',
        'package', 'tuition_mode', 'competitive_mode', 'duration', 'previous_school',
        'automated_calls', 'automated_email', 'mother_name', 'mother_address', 'mother_contact',
        'mother_employment', 'mother_phone', 'mother_email', 'mother_qualification', 'father_name',
        'father_address', 'father_contact', 'father_employment', 'father_phone', 'father_email', 'father_qualification',
        'reg_id', 'date_testexam', 'credential_pass', 'user_id', 'status', 'notice', 'exam_summary', 'bridge_course',
    ];

    protected function casts(): array
    {
        return [

            'status' => StudentStatus::class,
        ];
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function examresult()
    {

        return $this->hasMany(ExamData::class, 'student_regid');
    }

}
