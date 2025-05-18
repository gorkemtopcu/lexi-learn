import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <div className="mb-8 flex items-center">
          <BookOpen className="h-10 w-10 text-primary mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Lexi Learn
          </h1>
        </div>

        <p className="text-xl text-muted-foreground max-w-2xl mb-10">
          Your personal language learning assistant
        </p>

        <div className="w-full max-w-md flex gap-2">
          <Input
            type="text"
            placeholder="Search for a word..."
            className="w-full"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
