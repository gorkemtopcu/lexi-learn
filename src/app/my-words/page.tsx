import { Button } from "@/components/ui/button";
import { BookmarkIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

// Mock data for saved words
const savedWords = [
	{
		id: 1,
		word: "Serendipity",
		definition:
			"The occurrence and development of events by chance in a happy or beneficial way",
		language: "English",
		dateAdded: "2023-10-15",
	},
	{
		id: 2,
		word: "Ephemeral",
		definition: "Lasting for a very short time",
		language: "English",
		dateAdded: "2023-10-20",
	},
	{
		id: 3,
		word: "Ubiquitous",
		definition: "Present, appearing, or found everywhere",
		language: "English",
		dateAdded: "2023-11-05",
	},
];

export default function MyWordsPage() {
	return (
		<div className="container py-10 max-w-4xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">My Words</h1>
				<Link href="/">
					<Button className="flex items-center gap-2">
						<PlusCircle className="h-4 w-4" />
						<span>Add Word</span>
					</Button>
				</Link>
			</div>

			{savedWords.length > 0 ? (
				<div className="grid gap-4">
					{savedWords.map((word) => (
						<div
							key={word.id}
							className="p-4 border rounded-lg bg-card"
						>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-xl font-semibold mb-1">
										{word.word}
									</h3>
									<p className="text-sm text-muted-foreground mb-3">
										{word.language} • Added on{" "}
										{word.dateAdded}
									</p>
									<p>{word.definition}</p>
								</div>
								<Button variant="ghost" size="icon">
									<BookmarkIcon className="h-5 w-5 text-primary" />
								</Button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="p-12 text-center border rounded-lg bg-card">
					<BookmarkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
					<h3 className="text-xl font-medium mb-2">
						No saved words yet
					</h3>
					<p className="text-muted-foreground mb-6">
						Words you save will appear here for quick reference
					</p>
					<Link href="/">
						<Button>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add your first word
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
