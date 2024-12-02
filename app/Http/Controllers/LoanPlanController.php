<?php

namespace App\Http\Controllers;

use App\Models\LoanPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loanPlans = LoanPlan::all();
        return Inertia::render(
            'LoanPlans',
            ['loanPlans' => $loanPlans]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateLoanPlan', [
            'success' => session('success'),
            'error' => session('error')
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
