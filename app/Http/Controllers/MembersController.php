<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MembersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::all()->map(function ($member) {
            // Assuming 'member_photo' is the field in your Member model storing the image filename
            if ($member->member_photo) {
                $member->member_photo_url = asset($member->member_photo);
            } 

            return $member;
        });

        return Inertia::render('SaccoMembers', ['members' => $members]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateMember', ['success' => session('success'),]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the input data except 'member_id'
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:161|unique:members,email',
            'nin' => 'required|string|unique:members,nin|max:255',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female',
            'country' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'county' => 'required|string|max:255',
            'sub_county' => 'required|string|max:255',
            'parish' => 'nullable|string|max:255',
            'village' => 'required|string|max:255',
            'phone_number' => 'required|string|unique:members,phone_number|max:255',
            'membership_type' => 'required|in:Ordinary,Premium',
            'status' => 'required|in:Active,Suspended',
        ]);

        // Generate the member_id
        $validated['member_id'] = $this->generateMemberId();

        // Handle file upload for 'member_photo'
        if ($request->hasFile('member_photo')) {
            $photoPath = $request->file('member_photo')->store('member_photos', 'public');
            $validated['member_photo'] = $photoPath;
        } else {
            // Use a default avatar from the public folder
            $validated['member_photo'] = 'uploads/img/avatar.jpg'; // Store relative path
        }


        // Create the member record
        $member = Member::create($validated);

        // Redirect or return response
        return redirect()->route('members.create')->with('success', 'Member created successfully!');
    }


    protected function generateMemberId()
    {
        // Get the latest member record
        $latestMember = Member::orderBy('created_at', 'desc')->first();

        // Extract the numeric part of the last ID, if it exists
        $latestId = $latestMember ? intval(substr($latestMember->member_id, 3)) : 0;

        // Increment the numeric part
        $newId = $latestId + 1;

        // Format the new ID as SA-0000001
        return 'SA-' . str_pad($newId, 7, '0', STR_PAD_LEFT);
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
