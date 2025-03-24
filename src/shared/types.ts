export interface Member {
	id: number;
	username: string;
	email: string;
	color: string | null;
	initials: string;
	profilePicture: string;
	profileInfo: {
		display_profile: string | null;
		verified_ambassador: string | null;
		verified_consultant: string | null;
		top_tier_user: string | null;
		viewed_verified_ambassador: string | null;
		viewed_verified_consultant: string | null;
		viewed_top_tier_user: string | null;
	};
}
