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
        'reg_id', 'date_testexam', 'credential_pass', 'user_id', 'status', 'notice', 'exam_summary', 'bridge_course', 'emirates_id',
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

    public function setFirstNameAttribute($value)
    {
        return $this->attributes['first_name'] = ucwords($value);
    }

    public function setLastNameAttribute($value)
    {
        return $this->attributes['last_name'] = ucwords($value);
    }
    public function setAddressAttribute($value)
    {
        return $this->attributes['address'] = ucwords($value);
    }

    public function setAdhaarAttribute($value)
    {
        return $this->attributes['adhaar'] = strtoupper($value);
    }

    public function setEmiratesIdAttribute($value)
    {

        return $this->attributes['emirates_id'] = strtoupper($value);
    }

    public function setPassportAttribute($value)
    {
        return $this->attributes['passport'] = strtoupper($value);
    }

    public function setPreviousSchoolAttribute($value)
    {
        return $this->attributes['previous_school'] = ucwords($value);
    }

    public function setMotherNameAttribute($value)
    {
        return $this->attributes['mother_name'] = ucwords($value);
    }

    public function setMotherAddressAttribute($value)
    {
        return $this->attributes['mother_address'] = strtoupper($value);
    }

    public function setFatherNameAttribute($value)
    {
        return $this->attributes['father_name'] = ucwords($value);
    }

    public function setFatherAddressAttribute($value)
    {
        return $this->attributes['father_address'] = strtoupper($value);
    }

}
