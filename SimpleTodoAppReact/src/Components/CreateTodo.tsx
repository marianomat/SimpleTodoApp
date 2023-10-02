import { Button, Textarea } from "@material-tailwind/react";
import { useState } from "react";

interface CreateTodoProps {
	handleTodoCreation: (description: string) => void;
	creatingTodo: boolean;
}

export default function CreateTodo({ handleTodoCreation, creatingTodo }: CreateTodoProps) {
	const [description, setDescription] = useState("");
	return (
		<div className="relative w-[80%] m-auto">
			<Textarea
				disabled={creatingTodo}
				variant="outlined"
				placeholder="Describe todo"
				rows={1}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className="flex w-full justify-between py-1.5">
				<div className="flex gap-2 ml-auto">
					<Button size="sm" className="rounded-md" disabled={creatingTodo} onClick={() => handleTodoCreation(description)}>
						{creatingTodo ? "Creating..." : "Create"}
					</Button>
				</div>
			</div>
		</div>
	);
}
