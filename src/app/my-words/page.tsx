"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import { CompactWordDefinition } from "@/components/compact-word-definition";
import { WordData } from "@/services/dictionary/types";

// Mock data for saved words with full API structure
const savedWords: WordData[] = [
  {
    word: "Serendipity",
    phonetic: "/ˌsɛr.ənˈdɪp.ɪ.ti/",
    phonetics: [
      {
        text: "/ˌsɛr.ənˈdɪp.ɪ.ti/",
        audio: "//ssl.gstatic.com/dictionary/static/sounds/20200429/serendipity--_gb_1.mp3"
      }
    ],
    origin: "1754: coined by Horace Walpole, suggested by The Three Princes of Serendip, the title of a fairy tale in which the heroes 'were always making discoveries, by accidents and sagacity, of things they were not in quest of'",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "The occurrence and development of events by chance in a happy or beneficial way",
            example: "a fortunate stroke of serendipity",
            synonyms: ["chance", "happy chance", "accident", "happy accident", "fluke"],
            antonyms: []
          }
        ]
      }
    ]
  },
  {
    word: "Ephemeral",
    phonetic: "/ɪˈfɛm.ər.əl/",
    phonetics: [
      {
        text: "/ɪˈfɛm.ər.əl/",
        audio: "//ssl.gstatic.com/dictionary/static/sounds/20200429/ephemeral--_gb_1.mp3"
      }
    ],
    origin: "late 16th century: from Greek ephēmeros (from epi 'upon' + hēmera 'day') + -al",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Lasting for a very short time",
            example: "ephemeral pleasures",
            synonyms: ["transitory", "transient", "fleeting", "passing", "short-lived"],
            antonyms: ["permanent", "enduring", "lasting"]
          }
        ]
      }
    ]
  },
  {
    word: "Ubiquitous",
    phonetic: "/juːˈbɪk.wɪ.təs/",
    phonetics: [
      {
        text: "/juːˈbɪk.wɪ.təs/",
        audio: "//ssl.gstatic.com/dictionary/static/sounds/20200429/ubiquitous--_gb_1.mp3"
      }
    ],
    origin: "mid 19th century: from modern Latin ubiquitas (from Latin ubique 'everywhere') + -ous",
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition: "Present, appearing, or found everywhere",
            example: "ubiquitous computing",
            synonyms: ["omnipresent", "ever-present", "everywhere", "all over the place"],
            antonyms: ["rare", "scarce", "uncommon"]
          }
        ]
      }
    ]
  }
];

export default function MyWordsPage() {
  const [savedWordIds, setSavedWordIds] = useState<number[]>(savedWords.map((_, index) => index));

  const handleRemoveWord = (index: number) => {
    setSavedWordIds(savedWordIds.filter(id => id !== index));
  };

  const filteredWords = savedWords.filter((_, index) => savedWordIds.includes(index));

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

      {filteredWords.length > 0 ? (
        <div className="grid gap-4">
          {filteredWords.map((word, index) => (
            <CompactWordDefinition
              key={index}
              data={word}
              isSaved={true}
              onRemove={() => handleRemoveWord(index)}
            />
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
