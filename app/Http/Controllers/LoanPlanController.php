<?php

namespace App\Http\Controllers;

use App\Models\LoanPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanPlanController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:Create Loan Plan')->only('create');
        $this->middleware('permission:Create Loan Plan')->only('store');
        $this->middleware('permission:View Loan Plans')->only('index');
        $this->middleware('permission:View Loan Plan Details')->only('show');
        $this->middleware('permission:Update Loan Plan')->only('edit');
        $this->middleware('permission:Update Loan Plan')->only('update');
        $this->middleware('permission:Delete Loan Plan')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loanPlans = LoanPlan::all();
        return Inertia::render(
            'LoanPlans',
            [
                'loanPlans' => $loanPlans,
                'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateLoanPlan', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'loan_plan_name' => 'required|string|max:100',
            'loan_plan_months' => 'required|numeric|between:1,36', // Must be a number between 1 and 36
            'loan_plan_interest_rate' => 'required|numeric|between:0,100', // Must be a percentage between 0 and 100
            'loan_plan_penalty' => 'required|numeric', // Must be a numeric value
            'loan_plan_limit' => 'required|numeric', // Must be a numeric value
        ]);

        // Check if a loan plan with the same name or the same loan_plan_months already exists
        if (LoanPlan::where('loan_plan_name', $validated['loan_plan_name'])->exists()) {
            return redirect()->route('loan-plans.create')
                ->with('error', 'A loan plan with the specified name already exists. Please choose a different name.');
        }

        // If both checks pass, create the loan plan
        $loan_plan = LoanPlan::create($validated);

        return redirect()->route('loan-plans.create')
            ->with('success', 'Loan plan created successfully!');
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
        $loan_plan = LoanPlan::findOrFail($id);

        return Inertia::render('EditLoanPlan', [
            'success' => session('success'),
            'error' => session('error'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'loan_plan' => $loan_plan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'loan_plan_name' => 'required|string|max:100',
            'loan_plan_months' => 'required|numeric|between:1,36', // Must be a number between 1 and 36
            'loan_plan_interest_rate' => 'required|numeric|between:0,100', // Must be a percentage between 0 and 100
            'loan_plan_penalty' => 'required|numeric', // Must be a numeric value
            'loan_plan_limit' => 'required|numeric', // Must be a numeric value
        ]);

        // Check if a loan plan with the same name already exists, excluding the current one
        if (LoanPlan::where('loan_plan_name', $validated['loan_plan_name'])
            ->where('id', '!=', $id) // Exclude the current loan plan by ID
            ->exists()
        ) {
            return redirect()->route('loan-plans.create')
                ->with('error', 'A loan plan with the specified name already exists. Please choose a different name.');
        }

        // Find the loan plan by ID and update it
        $loan_plan = LoanPlan::findOrFail($id);
        $loan_plan->update($validated);

        return redirect()->back()->with('success', 'Loan Plan Updated Successfully');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
