<?php

namespace App\Http\Controllers;

use App\Models\FinancialYear;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FinancialYearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $years = FinancialYear::all();

        return Inertia::render('FinancialYear', [
            'years' => $years,
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateFinancialYear', [
            'success' => session('success'),
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate request input with custom messages
        $validated = $request->validate([
            'name' => 'string|required|max:100|unique:financial_years,name',
            'start_date' => 'date|required',
            'end_date' => 'date|required|after:start_date',
        ], [
            'name.required' => 'The name field is required.',
            'name.unique' => 'This financial year name already exists. Please choose a different name.',
            'name.max' => 'The name must not exceed 100 characters.',
            'start_date.required' => 'The start date is required.',
            'start_date.date' => 'The start date must be a valid date.',
            'end_date.required' => 'The end date is required.',
            'end_date.date' => 'The end date must be a valid date.',
            'end_date.after' => 'The end date must be after the start date.',
        ]);

        // Additional validation for at least 6 months duration
        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);

        if ($startDate->diffInMonths($endDate) < 6) {
            return redirect()->back()->withErrors(['end_date' => 'The financial year must be at least 6 months long.']);
        }

        // Check for overlapping financial years
        $overlap = FinancialYear::where(function ($query) use ($startDate, $endDate) {
            $query->whereBetween('start_date', [$startDate, $endDate])
                ->orWhereBetween('end_date', [$startDate, $endDate])
                ->orWhere(function ($query) use ($startDate, $endDate) {
                    $query->where('start_date', '<=', $startDate)
                        ->where('end_date', '>=', $endDate);
                });
        })->exists();

        if ($overlap) {
            return redirect()->back()->withErrors(['start_date' => 'A financial year already exists within the specified date range.']);
        }

        // Update all existing financial years to "closed"
        FinancialYear::query()->update(['status' => 'closed']);

        // Add the new financial year with "active" status
        FinancialYear::create(array_merge($validated, ['status' => 'active']));

        // Redirect or return response
        return redirect()->route('financial-years.create')->with('success', 'Financial year created successfully!');
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
