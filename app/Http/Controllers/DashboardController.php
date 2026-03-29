<?php
namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\StudentRegn;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function Dashboard()
    {

        $user = Auth::user();

        if ($user->role->value === 2) {

            $authUser = Auth::user()->load('students');

            $questionType = $authUser->students->package;

            if ($questionType === "School") {
                $questionID = 1;
            } else if ($questionType === "Tuition") {
                $questionID = 2;
            } else if ($questionType === "Competitive Exam") {
                $questionID = 3;
            }

            $questions = Question::whereEducationType($questionID)->get();

            return Inertia::render('Dashboard/StudentDashboard', [

                'questions' => $questions,
            ]);
        } else {

            $newRegn    = StudentRegn::whereStatus(0);
            $testexam   = StudentRegn::whereStatus(1);
            $counselees = StudentRegn::whereStatus(2);
            $students   = StudentRegn::whereStatus(3);
            $rejected   = StudentRegn::whereStatus(4);

            return Inertia::render('Dashboard/Dashboard', [

                'totalpendingreg' => $newRegn->count(),
                'totaltestexam'   => $testexam->count(),
                'totalcounselees' => $counselees->count(),
                'totalstudents'   => $students->count(),
                'totalrejected'   => $rejected->count(),
                'newregn'         => $newRegn->select('id', 'reg_id', 'first_name', 'last_name', 'address', 'mother_name', 'father_name', 'package')->latest()->take(5)->get(),

            ]);

        }

    }

    public function StudentDashboard()
    {

    }

    public function ExamTest()
    {

        $newRegn = StudentRegn::whereStatus(1)->latest()->take(5)->get();

        return Inertia::render('Dashboard/Dashboard', [

            'newregn' => $newRegn,

        ]);
    }

    public function CounsellingDashboard()
    {

        $newRegn = StudentRegn::whereStatus(2)->latest()->take(5)->get();

        return Inertia::render('Dashboard/Dashboard', [

            'newregn' => $newRegn,

        ]);
    }

    public function StudentsDashboard()
    {

        $newRegn = StudentRegn::whereStatus(3)->latest()->take(5)->get();

        return Inertia::render('Dashboard/Dashboard', [

            'newregn' => $newRegn,

        ]);
    }

    public function NewRegnDashboard()
    {

        $newRegn = StudentRegn::whereStatus(0)->latest()->take(5)->get();

        return Inertia::render('Dashboard/Dashboard', [

            'newregn' => $newRegn,

        ]);
    }
    public function RejectedDashboard()
    {

        $newRegn = StudentRegn::whereStatus(4)->latest()->take(5)->get();

        return Inertia::render('Dashboard/Dashboard', [

            'newregn' => $newRegn,

        ]);
    }

}
