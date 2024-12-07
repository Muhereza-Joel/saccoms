<?php

namespace App\Http\Controllers;

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
        return Inertia::render('Tickets', [
            'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
