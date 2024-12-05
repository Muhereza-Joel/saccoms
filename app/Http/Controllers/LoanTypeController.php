<?php

namespace App\Http\Controllers;

use App\Models\LoanType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loanTypes = LoanType::all();
        return Inertia::render(
            'LoanTypes',
            [
                'loanTypes' => $loanTypes,
                'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateLoanType', [
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
            'loan_type_name' => 'string|required|max:50|unique:loan_types,loan_type_name', // Ensure uniqueness
            'loan_type_description' => 'required|string', // Ensure description is not empty or just whitespace
        ]);

        // Check if the description is empty after stripping out HTML tags
        if (empty(trim(strip_tags($validated['loan_type_description'])))) {
            return redirect()->route('loan-types.create')
                ->withErrors(['loan_type_description' => 'Description cannot be empty or just whitespace.'])
                ->withInput();
        }

        // Sanitize the description to remove unwanted tags or scripts
        $validated['loan_type_description'] = strip_tags($validated['loan_type_description'], '<p><a><b><i><strong><em><ul><ol><li>');

        // Create the new loan type
        $loan_type = LoanType::create($validated);

        // Redirect back with a success message
        return redirect()->route('loan-types.create')
            ->with('success', 'Loan type created successfully!');
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
