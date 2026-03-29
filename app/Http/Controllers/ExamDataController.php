<?php
namespace App\Http\Controllers;

use App\Models\StudentRegn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExamDataController extends Controller
{

    public function store(Request $request)
    {

        $request->validate([
            'answers' => 'required|array',
        ]);
        $authUser = Auth::user()->load('students');

        // store exam result

        $studentregnId = $authUser->students->id;

        $studentRegn = StudentRegn::findOrFail($studentregnId);

        foreach ($request->answers as $item) {

            $studentRegn->examresult()->create($item);
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

    public function completeRegistration()
    {
        $authUser = Auth::user()->load('students');

        $authUser->students()->update([
            'status' => 3,
        ]);

    }
}
