import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] p-8">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-center">Lexi Learn</h1>
        <p className="text-center text-muted-foreground">
          Your personal language learning assistant
        </p>
        <div className="flex gap-2">
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

export default Home;
