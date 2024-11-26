<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\FinancialYearController;
use App\Http\Controllers\LoansController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketsController;
use App\Http\Controllers\TransactionsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/members', MembersController::class);
    Route::get('/member/{id}/account/create', [AccountsController::class, 'createMemberAccount'])->name('create-member-account');
    Route::resource('/accounts', AccountsController::class);
    Route::resource('/financial-years', FinancialYearController::class);
    Route::resource('/loans', LoansController::class);
    Route::resource('/transactions', TransactionsController::class);
    Route::resource('/tickets', TicketsController::class);
});

require __DIR__.'/auth.php';
