<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class SessionController extends Controller
{

    public function Login()
    {
        return Inertia::render('Auth/SuperAdmin/Login');
    }

    public function store(Request $request)
    {

        $request->validate([
            'email'    => 'required|email:exists,users',
            'password' => 'required|min:8',
        ]);

        if (Auth::attempt([
            'email'    => $request->email,
            'password' => $request->password,
            'status'   => 0,
        ])) {
            $request->session()->regenerate();


            return redirect()->route('page.dashboard');
        }

        throw ValidationException::withMessages([
            'email' => 'Invalid credentials or inactive account.',
        ]);

    }

    public function Logout()
    {
        Auth::logout();

        return Inertia::location('/admin-superadmin/secure-login');

    }
}
