<?php
namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuestionController extends Controller
{

    public function index()
    {
        $questions = Question::all();
        return Inertia::render('Questions/Questions', [

            'questions' => $questions,
        ]);
    }
    public function create()
    {
        return Inertia::render('Questions/QuestionsCreate');
    }
    public function edit()
    {
        return Inertia::render('Questions/QuestionsEdit');
    }

    public function store(Request $request)
    {

        $request->validate([

            'questions'      => 'required',
            'education_type' => 'required',

        ]);

        $questions      = $request->questions;
        $education_type = $request->education_type;

        Question::create($request->all());

        $authUser = Auth::user()->name;

        $userId  = Auth::user()->id;
        $logData = $authUser . " created a question for exam test";

        Log::create([
            'user_id' => $userId,
            'data'    => $logData,
        ]);

        return redirect()->route('exam.questions')->with('message', 'New Questions Added !!');
    }


    public function update(Request $request)
    {

    }
    public function destroy(Question $id)
    {

        $id->delete();

        $authUser = Auth::user()->name;

        $userId  = Auth::user()->id;
        $logData = $authUser . " deleted exam test question";

        Log::create([
            'user_id' => $userId,
            'data'    => $logData,
        ]);
        return redirect()->back()->with('message', "Questions Deleted Successfully");
    }
}
