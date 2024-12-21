<?php

namespace App\Http\Controllers;

use App\Models\FinancialYear;
use App\Models\Loan;
use App\Models\LoanPlan;
use App\Models\LoanType;
use App\Models\Member;
use App\Models\RepaymentSchedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LoansController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:Create Loan')->only(['create', 'store', 'createMemberLoanApplication']);
        $this->middleware('permission:View Loans')->only('index');
        $this->middleware('permission:View Loan Details')->only('show');
        $this->middleware('permission:Update Loan')->only(['edit', 'update', 'updateLoanStatus']);
        $this->middleware('permission:Delete Loan')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loans = Loan::with('member')->paginate(10);
        $loansCollection = $loans->getCollection();

        return Inertia::render('Loans', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'loans' => $loansCollection,
            'links' => $loans->linkCollection(),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    public function memberLoans($id)
    {
        $loans = Loan::with('member')->where('member_id', $id)->paginate(10);
        $loansCollection = $loans->getCollection();

        return Inertia::render('Loans', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'loans' => $loansCollection,
            'links' => $loans->linkCollection(),
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    public function createMemberLoanApplication($id)
    {
        $loan_types = LoanType::all(['id', 'loan_type_name']);
        $loan_plans = LoanPlan::all();
        $member = Member::findOrFail($id);
        $member['member_photo'] = asset($member->member_photo);

        return Inertia::render('CreateLoanApplication', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'member_id' => $id,
            'loan_types' => $loan_types,
            'loan_plans' => $loan_plans,
            'success' => session('success'),
            'error' => session('error'),
            'member' => $member,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Merge necessary values
        $request->merge([
            'repayment_period' => $request->input('loan_plan_months'),
            'interest_rate' => $request->input('loan_plan_interest_rate'),
        ]);

        if ((float) $request->principal_amount > (float) $request->loan_plan_limit) {
            return redirect()->back()->with('error', 'The principal amount must not exceed the loan plan limit.');
        }

        // Validate the request
        $validated = $request->validate([
            'member_id' => 'required|string',
            'loan_type' => 'required|string|exists:loan_types,id',
            'loan_plan' => 'required|string|exists:loan_plans,id',
            'loan_plan_limit' => 'required|numeric',
            'principal_amount' => 'required|numeric',
            'interest_rate' => 'required|numeric',
            'repayment_period' => 'required|numeric|between:1,36',
            'repayment_schedule' => 'required|string|in:Daily,Weekly,Monthly,Quarterly',
            'collateral' => 'required|string', // For Quill editor HTML content
            'status' => 'required|string|max:15|in:Pending,Approved,Rejected,Disbursed',
            'outstanding_balance' => 'required|numeric',
            'due_date' => 'required|date'
        ]);

        // Add the loan officer ID
        $validated['loan_officer'] = Auth::user()->id;

        $financial_year = FinancialYear::where('status', 'active')->first();
        if ($financial_year) {
            $validated['financial_year'] = $financial_year->id;
        } else {
            $validated['financial_year'] = null;
        }


        // Generate the reference number
        $referenceNumber = strtoupper('LN-' . uniqid()); // Example: LN-6175c4ab2fc92

        // Add the reference number to the validated data
        $validated['reference_number'] = $referenceNumber;

        // Create the loan record
        $loan = Loan::create($validated);

        // Redirect back with success message
        return redirect()->back()->with('success', "Loan application with reference {$referenceNumber} number saved successfully");
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $loan = Loan::with(['member', 'loan_type', 'loan_plan', 'repayment_schedules'])->findOrFail($id);

        return Inertia::render('LoanDetails', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'loan' => $loan,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function updateLoanStatus(Request $request, string $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|max:15|in:Approved,Rejected,Disbursed',
        ]);

        DB::transaction(function () use ($validated, $id) {
            $loan = Loan::findOrFail($id);

            // Update the status
            $loan->status = $validated['status'];

            if ($validated['status'] === 'Approved') {
                $loan->approval_date = now(); // Set approval date
            } elseif ($validated['status'] === 'Disbursed') {
                $loan->disbursement_date = now(); // Set disbursement date

                // Generate repayment schedules
                $this->generateRepaymentSchedules($loan);
            }

            // Save the loan with updated status
            $loan->save();
        });

        return redirect()->back()->with("success", "Loan Status Updated Successfully");
    }


    private function generateRepaymentSchedules($loan)
    {
        $repaymentPeriod = $loan->repayment_period; // Period in months
        $outstandingBalance = $loan->outstanding_balance;

        if ($repaymentPeriod <= 0) {
            throw new \Exception("Invalid repayment period: $repaymentPeriod");
        }

        $amountDue = $outstandingBalance / $repaymentPeriod; // Monthly installment
        $dueDate = Carbon::now(); // Start with today's date

        // Create repayment schedules for each month
        for ($i = 1; $i <= $repaymentPeriod; $i++) {
            RepaymentSchedule::create([
                'loan_id' => $loan->id,
                'due_date' => $dueDate->addMonth(), // Increment by one month
                'amount_due' => round($amountDue, 2), // Round to 2 decimal places
            ]);
        }

        // Set the final due date of the loan as the last repayment schedule's due date
        $loan->due_date = $dueDate;
        $loan->save();
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
