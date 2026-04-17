<?php
namespace App\Http\Controllers;

use App\Models\StudentRegn;
use App\Traits\ImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ExamDataController extends Controller
{
    use ImageUpload;

    public function store(Request $request)
    {
        $request->validate([
            'answers'        => 'required|array',
            'answers.*.file' => 'nullable',
        ]);
        $authUser = Auth::user()->load('students');

        // store exam result

        $studentregnId = $authUser->students->id;

        $studentRegn                = StudentRegn::findOrFail($studentregnId);
        $studentRegn->date_testexam = null;
        $studentRegn->save();

        foreach ($request->answers as $key => $item) {

            $file = $request->file("answers.$key.file");

            $new_image = $file
                ? $this->ImageUpload($file, 'exam_image', 'answersheet_' . uniqid())
                : null;

            $studentRegn->examresult()->create([
                'question' => $item['question'] ?? null,
                'answer'   => $item['answer'] ?? null,
                'file'     => $new_image,
            ]);
        }

        // Update Students Regn Status

        $authUser->students()->update([
            'status' => 2,
            'notice' => 1,
        ]);

        return redirect()->back()->with('message', "Exam Completed !!");

    }

    public function reviewTest(Request $request)
    {
        $request->validate([
            'exam_summary'  => 'required',
            'bridge_course' => 'nullable',
        ]);

        $studentRegn = StudentRegn::findOrFail($request->student_regid);

        $studentRegn->update([

            'exam_summary'  => $request->exam_summary,
            'bridge_course' => $request->bridge_course,
            'notice'        => 2,
        ]);

        return redirect()->back()->with('message', "Counsellor Reviewed !!");

    }

    public function completeRegistration(Request $request)
    {

        $request->validate([
            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore(Auth::user()->id),
            ],
        ]);

        $authUser = Auth::user()->load('students');
        $trueOTP  = $authUser->remember_token;
        $email    = $request->email;
        $typedOTP = $request->typed_otp;


        if ((int) $trueOTP === (int) $typedOTP) {

            $authUser->email             = $email;
            $authUser->email_verified_at = now();
            $authUser->remember_token    = null;
            $authUser->save();

            $authUser->students()->update([
                'notice' => 3,
            ]);

            return redirect()->route('page.dashboard');

        } else {

            return redirect()->back()->with('failed', 'Invalid OTP. Please try again');

        }

    }
    public function acceptCondition()
    {

        $authUser = Auth::user()->load('students');

        $authUser->students()->update([
            'status' => 3,
            // 'notice' => 3,
        ]);

        return redirect()->route('page.dashboard');

    }

    public function completeWithoutOTP()
    {

        $authUser = Auth::user()->load('students');

        $authUser->students()->update([
            'status' => 3,
            'notice' => 3,
        ]);
        return redirect()->route('page.dashboard');
    }
}
