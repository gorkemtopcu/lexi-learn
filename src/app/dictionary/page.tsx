import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function DictionaryPage() {
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dictionary</h1>
      <div className="flex gap-2 mb-8">
        <Input
          type="text"
          placeholder="Search for a word..."
          className="w-full"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-8 text-center text-muted-foreground">
        <p>Search for a word to see its definition</p>
      </div>
    </div>
  );
}
