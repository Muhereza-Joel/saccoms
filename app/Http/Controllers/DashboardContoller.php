<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\FinancialYear;
use App\Models\Loan;
use App\Models\LoanPlan;
use App\Models\LoanType;
use App\Models\Member;
use App\Models\Share;
use App\Models\SupportTicket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PHPUnit\Framework\Attributes\Ticket;

class DashboardContoller extends Controller
{
    public function renderDashboard()
    {
        $activeFinancialYears = FinancialYear::where('status', 'active')->count();
        $members = Member::count();
        $accounts = Account::count();
        $users = User::count();
        $loanPlans = LoanPlan::count();
        $loanTypes = LoanType::count();
        $loans = Loan::count();
        $shares = Share::count();
        $tickets = SupportTicket::count();


        return Inertia::render('Dashboard',
            [
                'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
                'financialYears' => $activeFinancialYears,
                'members' => $members,
                'accounts' => $accounts,
                'users' => $users,
                'loanPlans' => $loanPlans,
                'loanTypes' => $loanTypes,
                'loans' => $loans,
                'shares' => $shares,
                'tickets' => $tickets,
            ]
        );
    }
}
