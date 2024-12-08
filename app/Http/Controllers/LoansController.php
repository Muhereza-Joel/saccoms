<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\LoanPlan;
use App\Models\LoanType;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoansController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:Create Loan')->only('create');
        $this->middleware('permission:Create Loan')->only('createMemberLoanApplication');
        $this->middleware('permission:Create Loan')->only('store');
        $this->middleware('permission:View Loans')->only('index');
        $this->middleware('permission:View Loan Details')->only('show');
        $this->middleware('permission:Update Loan')->only('edit');
        $this->middleware('permission:Update Loan')->only('update');
        $this->middleware('permission:Delete Loan')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Loans', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
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

        // Validate the request
        $validated = $request->validate([
            'member_id' => 'required|string',
            'loan_type' => 'required|string|exists:loan_types,id',
            'loan_plan' => 'required|string|exists:loan_plans,id',
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
        //
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
