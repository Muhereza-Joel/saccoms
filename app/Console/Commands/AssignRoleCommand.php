<?php

namespace App\Console\Commands;

use App\Models\Role;
use Illuminate\Console\Command;
use App\Models\User;


class AssignRoleCommand extends Command
{
    protected $signature = 'assign:role {role} {--user=}';
    protected $description = 'Assign a role to a user';

    public function handle()
    {
        $roleName = $this->argument('role');
        $userId = $this->option('user');

        $user = User::where('id', $userId)->first();
        if (!$user) {
            $this->error('User not found.');
            return;
        }

        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            $this->error('Role not found.');
            return;
        }

        $user->assignRole($roleName);
        $this->info("Role '{$roleName}' assigned to user '{$user->name}' (UUID: {$userId}).");
    }
}
