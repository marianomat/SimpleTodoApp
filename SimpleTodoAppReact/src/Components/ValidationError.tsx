interface ValidationErrorProps {
	errors?: {
		[key: string]: string[] | undefined;
		email?: string[] | undefined;
		password?: string[] | undefined;
		name?: string[] | undefined;
		password_confirmation?: string[] | undefined;
	};
	field: string;
}

export default function ValidationError({ errors, field }: ValidationErrorProps) {
	return errors?.[field]?.length ? (
		<div className="alert alert-danger" role="alert">
			<ul>
				{errors[field]?.map((error, index) => {
					return <li key={index}>{error}</li>;
				})}
			</ul>
		</div>
	) : null;
}
