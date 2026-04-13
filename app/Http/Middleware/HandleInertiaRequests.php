<?php
namespace App\Http\Middleware;

use App\Enums\Role;
use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [

            'auth'  => Auth::user() ? Auth::user()->load('students') : null,
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'failed'  => fn()  => $request->session()->get('failed'),
                'status'  => fn()  => $request->session()->get('status'),
                'regnid'  => fn()  => $request->session()->get('regnid'),
            ],
            'role'  => Auth::check() ?

            match (Auth::user()->role) {
                Role::SUPER_ADMIN => 'Super Admin',
                Role::STUDENT     => 'Student',
                Role::TEACHER     => 'Teacher',
                Role::PARENT      => 'Parent',
                Role::COUNSELLOR  => 'Counsellor',
                default           => null,

            }
                : null,

            'theme' => Configuration::select('theme')->first(),

            ...parent::share($request),
            //
        ];
    }
}
