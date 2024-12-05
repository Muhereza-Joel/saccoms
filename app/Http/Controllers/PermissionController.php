<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $validated = $request->validate([
            'name' => 'required|string|unique:roles'
        ]);

        Permission::create($validated);

        return redirect()->back()->with('success', 'Permission created successfully!');
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
    public function update(Request $request, string $uuid)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                // Ignore the current permission's name in the unique validation
                Rule::unique('roles')->ignore($uuid, 'uuid')
            ],
        ]);

        // Find the permission by its UUID
        $role = Permission::where('uuid', $uuid)->firstOrFail();  // Use 'uuid' instead of 'id'

        // Update the permission
        $role->update($validated);

        return redirect()->back()->with('success', 'Permission updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        $permission = Permission::where('uuid', $uuid)->firstOrFail();
        $permission->delete();

        return redirect()->back()->with('success', 'Permission deleted successfully!');
    }
}
