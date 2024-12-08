<?php

namespace App\Http\Controllers;

use App\Models\SupportTicket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketsController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:Create Support Ticket')->only('create');
        $this->middleware('permission:Create Support Ticket')->only('store');
        $this->middleware('permission:View Support Tickets')->only('index');
        $this->middleware('permission:View Support Ticket Details')->only('show');
        $this->middleware('permission:Update Support Ticket')->only('edit');
        $this->middleware('permission:Update Support Ticket')->only('update');
        $this->middleware('permission:Delete Support Ticket')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $member_id = Auth::user()->id;

        // Tickets created by the user
        $createdTickets = SupportTicket::where('member_id', $member_id)->get();

        // Tickets assigned to the user
        $assignedTickets = SupportTicket::where('assigned_to', $member_id)->get();

        // Get the user associated with the first created ticket (if any)
        $createdTicketUser = $createdTickets->isNotEmpty()
            ? User::find($createdTickets[0]->assigned_to)
            : null;

        // Get the user associated with the first assigned ticket (if any)
        $assignedTicketUser = $assignedTickets->isNotEmpty()
            ? User::find($assignedTickets[0]->member_id)
            : null;

        return Inertia::render('Tickets', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'createdTickets' => $createdTickets,
            'assignedTickets' => $assignedTickets,
            'createdTicketUser' => $createdTicketUser, // User for first created ticket
            'assignedTicketUser' => $assignedTicketUser, // User for first assigned ticket
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::with(['roles', 'permissions'])->get();

        return Inertia::render('CreateTicket', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
            'success' => session('success'),
            'error' => session('error'),
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'issue_category' => 'required|string|max:255',
            'assigned_to' => 'required|string|exists:users,id',
            'description' => [
                'required',
                'string',
                'max:1000',
                function ($attribute, $value, $fail) {
                    if (empty(trim(strip_tags($value)))) {
                        $fail('The description cannot be empty or just whitespace.');
                    }
                },
            ],
        ]);

        // Assign the authenticated user's ID as the member_id
        $validated['member_id'] = Auth::id();

        try {
            // Create the support ticket
            SupportTicket::create($validated);

            return redirect()->route('tickets.create')
                ->with('success', 'Support ticket created successfully!');
        } catch (\Exception $e) {
            // Handle database or other exceptions
            return redirect()->back()
                ->withErrors(['error' => 'An error occurred while creating the ticket. Please try again.'])
                ->withInput();
        }
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
        $validated = $request->validate([
            'status' => 'required|string|max:20'
        ]);

        // dd($validated['status']);
        $ticket = SupportTicket::findOrFail($id);
        $ticket->update($validated);

        return redirect()->back()->with('success', 'Ticket Status Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
