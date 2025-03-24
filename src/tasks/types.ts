export interface Task {
	id: string;
	custom_item_id: number | null;
	name: string;
	status: {
		status: string;
		color: string;
		orderindex: number;
		type: string;
	};
	orderindex: string;
	date_created: string;
	date_updated: string;
	date_closed: string | null;
	date_done: string | null;
	creator: {
		id: number;
		username: string;
		color: string;
		profilePicture: string;
	};
	assignees: [string, string];
	watchers: [string, string];
	checklists: [string, string];
	tags: [string, string];
	parent: string | null;
	priority: string | null;
	due_date: string | null;
	start_date: string | null;
	points: number;
	time_estimate: string | null;
	time_spent: string | null;
	list: {
		id: string;
	};
	folder: {
		id: string;
	};
	space: {
		id: string;
	};
	url: string;
	markdown_description: string;
	custom_fields: {
		id: string;
		name: string;
		type: string;
		type_config: {
			single_user: boolean;
			include_groups: boolean;
			include_guests: boolean;
			include_team_members: boolean;
		};
		date_created: string;
		hide_from_guests: boolean;
		value: {
			id: number;
			username: string;
			email: string;
			color: string;
			initials: string;
			profilePicture: string | null;
		};
		value_richtext: string;
		value_markdown: string;
		required: boolean;
	};
}

export interface CreateTask {
	name: string;
	description: string;
}
