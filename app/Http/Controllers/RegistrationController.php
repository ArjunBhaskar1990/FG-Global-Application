<?php
namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\StudentRegn;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RegistrationController extends Controller
{

    public function StudentRegistration()
    {

        $countries = Country::query()
            ->select('id', 'name', 'phonecode')
            ->whereIn('id', [231, 101])
            ->get();

        return Inertia::render('Students/StudentRegistration', [
            'countries' => $countries,
        ]);

    }

    public function newRegistration(Request $request)
    {

        $validated = $request->validate([

            'first_name'                  => 'required',
            'last_name'                   => 'required',
            'address'                     => 'required',
            'city'                        => 'required',
            'state'                       => 'required',
            'contact_no'                  => 'required|numeric',
            'country_code_student'        => 'required',
            'country_code_autocalls'      => 'required',
            'email'                       => 'required|email:unique,users',
            'dob'                         => 'required',
            'age'                         => 'required',
            'gender'                      => 'required',
            'adhaar'                      => 'required',
            'passport'                    => 'required',
            'package'                     => 'required',
            'emirates_id'                 => 'nullable',
            'tuition_mode'                => 'nullable',
            'competitive_mode'            => 'nullable',
            'duration'                    => 'nullable',
            'previous_school'             => 'nullable',
            'automated_calls'             => 'nullable|numeric',
            'automated_email'             => 'nullable|email',
            'mother_name'                 => 'required',
            'mother_address'              => 'required',
            'mother_contact'              => 'required|numeric',
            'country_code_motherpersonal' => 'required',
            'country_code_motherwork'     => 'required',
            'mother_employment'           => 'required',
            'mother_phone'                => 'required|numeric',
            'mother_email'                => 'required|email',
            'mother_qualification'        => 'required',
            'father_name'                 => 'required',
            'father_address'              => 'required',
            'father_contact'              => 'required|numeric',
            'country_code_fatherpersonal' => 'required',
            'country_code_fatherwork'     => 'required',
            'father_employment'           => 'required',
            'father_phone'                => 'required|numeric',
            'father_email'                => 'required|email',
            'father_qualification'        => 'required',
        ]);

        try {

            DB::transaction(function () use (&$reg_id, &$status, $validated, $request) {

                $timePart   = now()->format('ymdHis');
                $randomPart = random_int(10, 99);

                $number = substr($timePart . $randomPart, 0, 12);
                $reg_id = "REGN-" . $number;
                $status = "success";

                if ($request->gender === "Male") {
                    $validated['gender'] = 1;
                }
                if ($request->gender === "Female") {
                    $validated['gender'] = 2;
                }
                unset(
                    $validated['country_code_student'],
                    $validated['country_code_autocalls'],
                    $validated['country_code_motherpersonal'],
                    $validated['country_code_motherwork'],
                    $validated['country_code_fatherpersonal'],
                    $validated['country_code_fatherwork']
                );

                $validated['reg_id']          = $reg_id;
                $validated['contact_no']      = $request->country_code_student . $validated['contact_no'];
                $validated['automated_calls'] = $request->country_code_autocalls . $validated['automated_calls'];
                $validated['mother_contact']  = $request->country_code_motherpersonal . $validated['mother_contact'];
                $validated['mother_phone']    = $request->country_code_motherwork . $validated['mother_phone'];
                $validated['father_contact']  = $request->country_code_fatherpersonal . $validated['father_contact'];
                $validated['father_phone']    = $request->country_code_fatherwork . $validated['father_phone'];

                StudentRegn::create($validated);

            });

        } catch (\Exception $e) {

            DB::rollBack();
            $status = "failed";
            // $message = "Application rejected !!";

            dd($e);

        }

        return redirect()->back()->with([
            'status' => $status,
            // 'message' => $message,
            'regnid' => $reg_id,
        ]);

    }

    public function view($regnno, $studentname, $regid)
    {

        $studentdetails = StudentRegn::with('examresult')->findOrFail($regid);

        return Inertia::render('Students/StudentRegistrationView', [
            'studentdetails' => $studentdetails,
        ]);
    }

    public function ScheduleTest(Request $request)
    {

        $request->validate([
            'student_id'    => 'required',
            'student_email' => 'required',
            'date_testexam' => 'required',
        ]);

        $RegnModal     = StudentRegn::findOrFail($request->student_id);
        $randPassword  = $RegnModal->first_name . rand(0, 4000) . time();
        $email         = $RegnModal->email;
        $name          = $RegnModal->first_name . " " . $RegnModal->last_name;
        $role          = 2;
        $studentStatus = 1;
        $dateExam      = $request->date_testexam;

        $userArray = [
            'email'    => $email,
            'name'     => $name,
            'role'     => $role,
            'password' => $randPassword,
        ];

        $user = User::create($userArray);

        $RegnModal->update([
            'user_id'         => $user->id,
            'status'          => $studentStatus,
            'credential_pass' => $randPassword,
            'date_testexam'   => $dateExam,
        ]);

        return redirect()->back()->with('message', 'Student sent for test exam !!');

    }

    public function RejectApplication(StudentRegn $studentid)
    {

        // change application status

        $studentid->status = 4;
        $studentid->save();

        // disable login access

        $applicationUser         = User::findOrFail($studentid->user_id);
        $applicationUser->status = 1;
        $applicationUser->save();

        return redirect()->back()->with('message', "Student Application Rejected !!");
    }
}
