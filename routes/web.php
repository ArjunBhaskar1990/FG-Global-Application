<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExamDataController;
use App\Http\Controllers\NewStudentController;
use App\Http\Controllers\OTPController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/signup', function () {

    return Inertia::render('Auth/SuperAdmin/SignUp');

});

Route::middleware('guest')->group(function () {

    Route::get('/admin-superadmin/secure-login', [SessionController::class, 'Login'])->name('login');
    Route::post('/admin-superadmin/secure-login', [SessionController::class, 'store'])->name('login.store');

});

Route::get('/fg-global-new-registration-students-registration-form', [RegistrationController::class, 'StudentRegistration'])->name('student.form');
Route::post('/fg-global-new-registration-students-registration-form', [RegistrationController::class, 'newRegistration'])->name('add-new-registration');

Route::middleware('auth')->group(function () {

    Route::get('/', [DashboardController::class, 'Dashboard'])->name('page.dashboard');

// new student registration

    Route::get('/new-student-regn/{regnno}/{studentname}/{regid}', [RegistrationController::class, 'view'])->name('view.studentregn');
    Route::post('/new-student-regn/schedule-to-test-exam', [RegistrationController::class, 'ScheduleTest'])->name('schedule.testexam');
    Route::post('/new-student-regn/reject-application/{studentid}', [RegistrationController::class, 'RejectApplication'])->name('reject.application');

    Route::get('/new-student-exam-test', [DashboardController::class, 'ExamTest'])->name('regn.examtest');
    Route::get('/new-student-counselling', [DashboardController::class, 'CounsellingDashboard'])->name('regn.counselling');
    Route::get('/new-student-students', [DashboardController::class, 'StudentsDashboard'])->name('regn.students');
    Route::get('/new-student-new-registration', [DashboardController::class, 'NewRegnDashboard'])->name('regn.newregn');
    Route::get('/new-student-rejected-students', [DashboardController::class, 'RejectedDashboard'])->name('regn.rejected');

    // Questions

    Route::get('/exam-questions', [QuestionController::class, 'index'])->name('exam.questions');
    Route::get('/exam-questions/create', [QuestionController::class, 'create'])->name('exam.questions.create');
    Route::post('/exam-questions', [QuestionController::class, 'store'])->name('exam.questions.store');
    Route::delete('/exam-questions/{id}', [QuestionController::class, 'destroy'])->name('exam.questions.destroy');

    Route::delete('/logout-fg', [SessionController::class, 'Logout'])->name('logout');

    // New Students Menu

    Route::get('/new-student-new-registration-list', [NewStudentController::class, 'NewRegistrationIndex'])->name('page.newregistration');
    Route::get('/new-student-exam-list', [NewStudentController::class, 'ExamListIndex'])->name('page.examlist');
    Route::get('/new-student-counselling-list', [NewStudentController::class, 'CounsellingListIndex'])->name('page.counsellinglist');
    Route::get('/new-student-ongoing-students-list', [NewStudentController::class, 'StudentsIndex'])->name('page.studentsindex');
    Route::get('/new-student-rejected-students-list', [NewStudentController::class, 'RejectedStudentsIndex'])->name('page.rejectedstudents');

    // Exam Data

    Route::post('/student-exam-results', [ExamDataController::class, 'store'])->name('examresult.store');
    Route::post('/student-exam-results/review-result', [ExamDataController::class, 'reviewTest'])->name('review.test');
    Route::post('/student-exam-results/complete-registration', [ExamDataController::class, 'completeRegistration'])->name('complete.registration');

    // OTP

    Route::post('/student-email-verification', [OTPController::class, 'SendEmail'])->name('send.otp-email');
    Route::post('/student-email-verification-time-out', [OTPController::class, 'TimeOut'])->name('otp.timeout');

    // theme color

    Route::post('/application-settings-theme', [DashboardController::class, 'changeTheme'])->name('change.theme');

});
