<?php
namespace App\Http\Controllers;

use App\Models\StudentRegn;
use Inertia\Inertia;

class NewStudentController extends Controller
{

    public function NewRegistrationIndex()
    {

        $newregn = StudentRegn::query()
            ->latest()
            ->whereStatus(0)
            ->paginate();

        return Inertia::render('NewStudent/NewRegistration', [
            'newregn' => $newregn,
        ]);
    }
    public function ExamListIndex()
    {

        $newregn = StudentRegn::query()
            ->latest()
            ->whereStatus(1)
            ->paginate();

        return Inertia::render('NewStudent/ExamTest', [
            'newregn' => $newregn,
        ]);
    }
    public function CounsellingListIndex()
    {

        $newregn = StudentRegn::query()
            ->latest()
            ->whereStatus(2)
            ->paginate();

        return Inertia::render('NewStudent/Counselling', [
            'newregn' => $newregn,
        ]);
    }
    public function StudentsIndex()
    {

        $newregn = StudentRegn::query()
            ->latest()
            ->whereStatus(3)
            ->paginate();

        return Inertia::render('NewStudent/OnGoingStudents', [
            'newregn' => $newregn,
        ]);
    }

    public function RejectedStudentsIndex()
    {

        $newregn = StudentRegn::query()
            ->latest()
            ->whereStatus(4)
            ->paginate();

        return Inertia::render('NewStudent/RejectedRegistration', [
            'newregn' => $newregn,
        ]);

    }

}
