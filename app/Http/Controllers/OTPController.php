<?php
namespace App\Http\Controllers;

use App\Mail\EmailOTP;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class OTPController extends Controller
{

    public function SendEmail(Request $request)
    {

        $user                 = Auth::user();
        $user->remember_token = null;
        $user->save();

        $request->validate([
            'email' => 'required|email',
        ]);

        $verificationCode = random_int(100000, 999999);

        $user->remember_token = $verificationCode;
        $user->save();

        $mailDat = [
            'verification_code' => $verificationCode,
            'subject'           => "Email Verification Code",

        ];

        Mail::to(trim($request->email))->send(new EmailOTP($mailDat));

    }

    public function TimeOut()
    {
        $user                 = Auth::user();
        $user->remember_token = null;
        $user->save();

    }
}
