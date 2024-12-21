<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\FinancialYear;
use App\Models\Member;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionsController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:Create Transaction')->only(['create', 'store', 'createMemberTransaction']);
        $this->middleware('permission:View Transactions')->only('index');
        $this->middleware('permission:View Transaction Details')->only('show');
        $this->middleware('permission:Update Transaction')->only(['edit', 'update']);
        $this->middleware('permission:Delete Transaction')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::with('member', 'financialYear')->get();

        return Inertia::render('Transactions', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'transactions' => $transactions,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }


    public function memberTransactions($id)
    {
        // Ensure the member exists
        Member::findOrFail($id);

        // Fetch transactions for the member with optimized relationships and pagination
        $transactions = Transaction::with([
            'member',
            'financialYear'
        ])->where('member_id', $id)->get();

        // dd($transactions);

        // Render the data to Inertia
        return Inertia::render('MemberTransactions', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'transactions' => $transactions,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }


    public function myTransactions()
    {
        $user = Auth::user();

        // Access the related member using the defined relationship
        $member = $user->member;

        // If no member exists for this user, handle accordingly
        if (!$member) {
            return Inertia::render('MemberTransactions', [
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'transactions' => [], // No transactions for non-members
                'success' => session('success'),
                'error' => session('error'),
            ]);
        }

        // Fetch transactions for the member with optimized relationships and pagination
        $transactions = Transaction::with(['member', 'financialYear'])
            ->where('member_id', $member->id)
            ->paginate(10); // Use paginate for better performance with large datasets

        // Render the data to Inertia
        return Inertia::render('MemberTransactions', [
            'permissions' => $user->getAllPermissions()->pluck('name'),
            'transactions' => $transactions->getCollection(), // Return the collection of transactions
            'links' => $transactions->linkCollection(), // Include pagination links
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function createMemberTransaction($id)
    {
        $account = Account::where('id', $id)->first();
        $member_id = $account->member_id;

        $member = Member::findOrFail($member_id);

        return Inertia::render('CreateTransaction', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'member' => $member,
            'account_id' => $id,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'member_id' => 'required|string|exists:members,id',
            'account_id' => 'required|string|exists:accounts,id',
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
            'status' => 'required|string',
            'remarks' => 'required|string',
            'transaction_type' => 'required|string'
        ]);

        $financial_year = FinancialYear::where('status', 'active')->first();
        if ($financial_year) {
            $validated['financial_year_id'] = $financial_year->id;
        } else {
            $validated['financial_year_id'] = null;
        }

        // Improved reference number with structured format
        $referenceNumber = strtoupper('TR-' . now()->format('Ymd') . '-' . str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT));
        $validated['reference_number'] = $referenceNumber;

        // Improved transaction date using Carbon
        $validated['transaction_date'] = now();

        $transaction = Transaction::create($validated);

        return redirect()->back()->with('success', 'Transaction created successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $transaction = Transaction::with('member', 'financialYear', 'loan', 'account')->findOrFail($id);

        return Inertia::render('TransactionDetails', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'transaction' => $transaction,
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
        $validated = $request->validate([
            'status' => 'required|string|max:20'
        ]);

        $ticket = Transaction::findOrFail($id);
        $ticket->update($validated);

        return redirect()->back()->with('success', 'Transaction Status Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
