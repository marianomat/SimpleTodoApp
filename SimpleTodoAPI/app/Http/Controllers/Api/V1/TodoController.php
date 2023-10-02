<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * @group Todos CRUD
 *
 * @Authenticated
 */
class TodoController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        # get todos from user order by newest
        $todos = $user->todos()->latest()->get(['id', 'description', 'completed']);

        return TodoResource::collection($todos);
    }

    public function store(StoreTodoRequest $request)
    {
        $todo = $request->user()->todos()->create($request->validated());

        return TodoResource::make($todo)->response()->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $this->authorize('update', $todo);
        $todo->update($request->validated());

        return TodoResource::make($todo);
    }

    public function destroy(Todo $todo)
    {
        $this->authorize('delete', $todo);
        $todo->delete();

        return response()->noContent();
    }
}
