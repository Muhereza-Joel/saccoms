<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Role;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();
        $permissions = Permission::all();

        return Inertia::render('ManageRoles', [
            'success' => session('success'),
            'error' => session('error'),
            'roles' => $roles,
            'permissions' => $permissions,
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
        $validated = $request->validate([
            'name' => 'required|string|unique:roles'
        ]);

        Role::create($validated);

        return redirect()->back()->with('success', 'Role created successfully!');
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
                // Ignore the current role's name in the unique validation
                Rule::unique('roles')->ignore($uuid, 'uuid')
            ],
        ]);

        // Find the role by its UUID
        $role = Role::where('uuid', $uuid)->firstOrFail();  // Use 'uuid' instead of 'id'

        // Update the role
        $role->update($validated);

        return redirect()->back()->with('success', 'Role updated successfully!');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uuid)
    {
        $role = Role::where('uuid', $uuid)->firstOrFail();
        $role->delete();

        return redirect()->back()->with('success', 'Role deleted successfully!');
    }
}
