export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Items,
}

export class TopPageModel {
	firstCategory: TopLevelCategory;
	secondCategory: string;
	title: string;
	category: string;
	hh?: {
		count: number;
		junoirSalary: number;
		middleSalary: number;
		seniorSalary: number;
	};
	advantages: {
		title: string;
		description: string;
	}[];
	seoText: string;
	tagsTitle: string;
	tags: string[];
}
