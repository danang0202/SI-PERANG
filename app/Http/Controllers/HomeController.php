<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            $user = Auth::user();

            if ($user->role === 'ADMIN') {
                return redirect()->route('admin.dashboard'); // Redirect ke admin dashboard
            }

            if ($user->role === 'USER') {
                return redirect()->route('user.dashboard'); // Redirect ke user dashboard
            }
        }

        return redirect()->route('login');
    }
}
