<?php

use App\Http\Controllers\AccountsController;
use App\Http\Controllers\DashboardContoller;
use App\Http\Controllers\FinancialYearController;
use App\Http\Controllers\LoanPlanController;
use App\Http\Controllers\LoansController;
use App\Http\Controllers\LoanTypeController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TicketsController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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
    return redirect('/login');
});


Route::get('/dashboard', [DashboardContoller::class, 'renderDashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/members', MembersController::class);
    Route::get('/member/{id}/account/create', [AccountsController::class, 'createMemberAccount'])->name('create-member-account');
    Route::get('/member/{id}/transactions', [TransactionsController::class, 'memberTransactions'])->name('member.transactions');
    Route::resource('/accounts', AccountsController::class);
    Route::resource('/financial-years', FinancialYearController::class);
    Route::resource('/loan-types', LoanTypeController::class);
    Route::resource('/loan-plans', LoanPlanController::class);
    Route::resource('/loans', LoansController::class);
    Route::get('/member/{id}/loan-application/create', [LoansController::class, 'createMemberLoanApplication'])->name('create-member-loan-application');
    Route::patch('/loans/{id}/status/update', [LoansController::class, 'updateLoanStatus'])->name('update-loan-status');
    Route::resource('/transactions', TransactionsController::class);
    Route::get('/member/accounts/{account_id}/transactions/create', [TransactionsController::class, 'createMemberTransaction'])->name('create-member-transaction');
    Route::resource('/tickets', TicketsController::class);
    Route::get('/assign/permissions', [RoleController::class, 'assignPermissions'])->name('assign-permissions');
    Route::post('/roles/{role}/permissions', [RoleController::class, 'updatePermissions'])->name('roles.save-assigned-permissions');

    Route::resource('/roles', RoleController::class)->middleware('role:root');
    Route::resource('/permissions', PermissionController::class)->middleware('role:root');
    Route::resource('/users', UsersController::class)->middleware('role:root|admin');
});

require __DIR__ . '/auth.php';
