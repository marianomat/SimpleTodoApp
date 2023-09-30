<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create for user with id 1
        \App\Models\Todo::factory()->count(10)->create([
            'user_id' => 1,
        ]);
        \App\Models\Todo::factory(100)->create();
    }
}
