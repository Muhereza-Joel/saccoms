<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountsController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:Create Account')->only(['create', 'store', 'createMemberAccount']);
        $this->middleware('permission:View Accounts')->only('index');
        $this->middleware('permission:View Account Details')->only('show');
        $this->middleware('permission:Update Account Details')->only(['edit', 'update']);
        $this->middleware('permission:Delete Account')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Paginate the accounts and load related member data
        $accounts = Account::with('member')
            ->paginate(10); 

        $accountsCollection = $accounts->getCollection()->map(function ($account) {
            if ($account->member && $account->member->member_photo) {
                $account->member->member_photo_url = asset($account->member->member_photo);
            }

            return $account;
        });

        return Inertia::render('SaccoAccounts', [
            'accounts' => $accountsCollection,
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'links' => $accounts->linkCollection(),
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function createMemberAccount($id)
    {
        $accounts = Account::where('member_id', $id)->get();
        $member = Member::findOrFail($id);
        $member['member_photo'] = asset($member->member_photo);

        return Inertia::render(
            'CreateAccount',
            [
                'member' => $member,
                'accounts' => $accounts,
                'success' => session('success'),
                'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'account_type' => 'required|in:Savings,Current,Fixed Deposit',
            'member_id' => 'required|uuid|exists:members,id',
            'interest_rate' => 'nullable|numeric|gt:0|required_if:account_type,Fixed Deposit',
            'start_date' => 'required|date|after_or_equal:today', // Ensures start_date is today or in the future
            'end_date' => 'nullable|date|after:start_date|required_if:account_type,Fixed Deposit',
            'status' => 'required|in:Active,Closed,Suspended',
        ]);

        // Generate a unique account number based on the account type
        $accountNumber = $this->generateAccountNumber($validatedData['account_type']);

        // Create the account
        $account = Account::create([
            'account_number' => $accountNumber,
            'account_type' => $validatedData['account_type'],
            'member_id' => $validatedData['member_id'],
            'interest_rate' => $validatedData['interest_rate'] ?? null,
            'start_date' => $validatedData['start_date'],
            'end_date' => $validatedData['end_date'] ?? null,
            'status' => $validatedData['status'],
        ]);

        // Redirect or return response
        return redirect()
            ->route('create-member-account', ['id' => $validatedData['member_id']])
            ->with(
                'success',
                "Account with number {$account->account_number} created successfully!"
            );
    }


    protected function generateAccountNumber($accountType)
    {
        do {
            // Set a dynamic prefix based on the account type
            $prefix = match ($accountType) {
                'Savings' => 'SAV',
                'Current' => 'CUR',
                'Fixed Deposit' => 'FD',
                default => 'ACC', // Fallback for unexpected types
            };

            // Generate the account number
            $timestamp = now()->format('YmdHis'); // Current timestamp
            $randomDigits = rand(1000, 9999); // Random 4-digit number
            $accountNumber = "{$prefix}{$timestamp}{$randomDigits}";
        } while (Account::where('account_number', $accountNumber)->exists()); // Ensure uniqueness

        return $accountNumber;
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
