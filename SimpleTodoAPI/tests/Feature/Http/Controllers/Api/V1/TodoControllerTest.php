<?php

namespace Tests\Feature\Http\Controllers\Api\V1;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TodoControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $seed = true;

    public function test_unauthenticated_user_cannot_see_todos()
    {
        $response = $this->getJson('/api/v1/todos');
        $response->assertStatus(401);
    }

    public function test_unauthenticated_user_cannot_create_todos()
    {
        $response = $this->postJson('/api/v1/todos', [
            'description' => 'Test Todo',
            'completed' => false,
        ]);
        $response->assertStatus(401);
    }

    public function test_unauthenticated_user_cannot_update_todos()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->putJson("/api/v1/todos/{$todo->id}", [
            'description' => 'Updated Todo',
        ]);
        $response->assertStatus(401);
    }

    public function test_unauthenticated_user_cannot_delete_todos()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->deleteJson("/api/v1/todos/{$todo->id}");
        $response->assertStatus(401);
    }

    public function test_user_can_see_their_own_todos()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $todo = Todo::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->getJson('/api/v1/todos');
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $todo->id,
        ]);
    }

    public function test_user_cannot_see_others_todos()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $this->actingAs($user1, 'web');

        $todo = Todo::factory()->create([
            'user_id' => $user2->id,
        ]);

        $response = $this->getJson('/api/v1/todos');
        $response->assertStatus(200);
        $response->assertJsonMissing([
            'id' => $todo->id,
        ]);
    }

    public function test_user_can_create_a_todo()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $response = $this->postJson('/api/v1/todos', [
            'description' => 'Test User Can Create Todo',
        ]);
        $response->assertStatus(201);
        $response->assertJsonFragment([
            'description' => 'Test User Can Create Todo',
        ]);
    }

    public function test_user_can_update_their_own_todo()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $todo = Todo::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->putJson("/api/v1/todos/{$todo->id}", [
            'description' => 'Updated Todo',
            'completed' => true,
        ]);
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'description' => 'Updated Todo',
            'completed' => true,
        ]);
    }

    public function test_user_can_change_todo_completed_field()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $todo = Todo::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->putJson("/api/v1/todos/{$todo->id}", [
            'completed' => true,
        ]);
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'completed' => true,
        ]);
    }

    public function test_user_can_change_todo_description_field()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $todo = Todo::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->putJson("/api/v1/todos/{$todo->id}", [
            'description' => 'Updated Todo',
        ]);
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'description' => 'Updated Todo',
        ]);
    }

    public function test_user_cannot_update_others_todo()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $this->actingAs($user1, 'web');

        $todo = Todo::factory()->create([
            'user_id' => $user2->id,
        ]);

        $response = $this->putJson("/api/v1/todos/{$todo->id}", [
            'description' => 'Updated Todo',
            'completed' => true,
        ]);
        $response->assertStatus(403);
    }

    public function test_user_can_delete_their_own_todo()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $todo = Todo::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->deleteJson("/api/v1/todos/{$todo->id}");
        $response->assertStatus(204);
    }

    public function test_user_cannot_delete_others_todo()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $this->actingAs($user1, 'web');

        $todo = Todo::factory()->create([
            'user_id' => $user2->id,
        ]);

        $response = $this->deleteJson("/api/v1/todos/{$todo->id}");
        $response->assertStatus(403);
    }

    public function test_todo_creation_requires_a_description()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $response = $this->postJson('/api/v1/todos', [
            'description' => '',
        ]);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors('description');
    }

    public function test_todo_creation_requires_a_description_to_be_a_string()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $response = $this->postJson('/api/v1/todos', [
            'description' => 123,
        ]);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors('description');
    }

    public function test_todo_update_requires_a_description_or_completed_field()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $todo = Todo::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->putJson("/api/v1/todos/{$todo->id}", [
            'description' => '',
            'completed' => '',
        ]);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['description', 'completed']);
    }

    public function test_user_can_see_empty_list_of_todos()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $response = $this->getJson('/api/v1/todos');
        $response->assertStatus(200);
        // Its 1 count because of the ResourceResponse
        $response->assertJsonCount(1);
    }

    public function test_api_returns_correct_json_format()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'web');
        $todo = Todo::factory()->create([
            'user_id' => $user->id,
        ]);
        $response = $this->getJson('/api/v1/todos');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'description',
                    'completed',
                ],
            ],
        ]);
    }
}
