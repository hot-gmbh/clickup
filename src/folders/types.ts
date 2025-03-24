export interface Folder {
	id: string;
	name: string;
	orderindex: number;
	override_statuses: boolean;
	hidden: boolean;
	space: {
		id: string;
		name: string;
		access: boolean;
	};
	task_count: string;
	lists: [string, string];
}
