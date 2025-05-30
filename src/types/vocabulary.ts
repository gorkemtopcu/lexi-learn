export interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  example: string;
  level: CEFRLevel;
}

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface LevelConfig {
  level: CEFRLevel;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  progressColor: string;
  dotColor: string;
}

export interface VocabularyLevel {
  level: CEFRLevel;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  words: VocabularyWord[];
}

// Centralized level configuration
export const LEVEL_CONFIGS: Record<CEFRLevel, LevelConfig> = {
  A1: {
    level: 'A1',
    title: 'Beginner',
    description: 'Basic everyday vocabulary',
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    progressColor: 'bg-green-500',
    dotColor: 'bg-green-500'
  },
  A2: {
    level: 'A2',
    title: 'Elementary',
    description: 'Common everyday situations',
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    progressColor: 'bg-blue-500',
    dotColor: 'bg-blue-500'
  },
  B1: {
    level: 'B1',
    title: 'Intermediate',
    description: 'Work, school, and leisure topics',
    color: 'text-purple-700 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    progressColor: 'bg-purple-500',
    dotColor: 'bg-purple-500'
  },
  B2: {
    level: 'B2',
    title: 'Upper Intermediate',
    description: 'Complex topics and abstract concepts',
    color: 'text-orange-700 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    progressColor: 'bg-orange-500',
    dotColor: 'bg-orange-500'
  },
  C1: {
    level: 'C1',
    title: 'Advanced',
    description: 'Complex academic and professional language',
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
    progressColor: 'bg-red-500',
    dotColor: 'bg-red-500'
  },
  C2: {
    level: 'C2',
    title: 'Proficient',
    description: 'Near-native level vocabulary',
    color: 'text-violet-700 dark:text-violet-400',
    bgColor: 'bg-violet-100 dark:bg-violet-900/20',
    progressColor: 'bg-violet-500',
    dotColor: 'bg-violet-500'
  }
};

export const VOCABULARY_DATA: VocabularyLevel[] = [
  {
    level: 'A1',
    title: LEVEL_CONFIGS.A1.title,
    description: LEVEL_CONFIGS.A1.description,
    color: LEVEL_CONFIGS.A1.color,
    bgColor: LEVEL_CONFIGS.A1.bgColor,
    words: [
      {
        id: 'a1-1',
        word: 'hello',
        definition: 'A greeting used when meeting someone',
        example: 'Hello, how are you today?',
        level: 'A1'
      },
      {
        id: 'a1-2',
        word: 'house',
        definition: 'A building where people live',
        example: 'I live in a small house with my family.',
        level: 'A1'
      },
      {
        id: 'a1-3',
        word: 'water',
        definition: 'A clear liquid that people drink',
        example: 'Please give me a glass of water.',
        level: 'A1'
      },
      {
        id: 'a1-4',
        word: 'food',
        definition: 'Things that people eat',
        example: 'The food at this restaurant is delicious.',
        level: 'A1'
      },
      {
        id: 'a1-5',
        word: 'friend',
        definition: 'A person you like and know well',
        example: 'She is my best friend from school.',
        level: 'A1'
      },
      {
        id: 'a1-6',
        word: 'book',
        definition: 'Pages with words bound together',
        example: 'I am reading an interesting book.',
        level: 'A1'
      },
      {
        id: 'a1-7',
        word: 'car',
        definition: 'A vehicle with four wheels',
        example: 'My father drives a red car.',
        level: 'A1'
      },
      {
        id: 'a1-8',
        word: 'school',
        definition: 'A place where children learn',
        example: 'I go to school every morning.',
        level: 'A1'
      },
      {
        id: 'a1-9',
        word: 'happy',
        definition: 'Feeling pleased and content',
        example: 'I am happy to see you again.',
        level: 'A1'
      },
      {
        id: 'a1-10',
        word: 'big',
        definition: 'Large in size',
        example: 'The elephant is a big animal.',
        level: 'A1'
      },
      {
        id: 'a1-11',
        word: 'small',
        definition: 'Little in size',
        example: 'The mouse is a small creature.',
        level: 'A1'
      },
      {
        id: 'a1-12',
        word: 'good',
        definition: 'Of high quality or standard',
        example: 'This is a good movie to watch.',
        level: 'A1'
      },
      {
        id: 'a1-13',
        word: 'bad',
        definition: 'Of poor quality or unpleasant',
        example: 'The weather is bad today.',
        level: 'A1'
      },
      {
        id: 'a1-14',
        word: 'work',
        definition: 'Activity involving effort to achieve something',
        example: 'I work in an office downtown.',
        level: 'A1'
      },
      {
        id: 'a1-15',
        word: 'time',
        definition: 'The indefinite continued progress of existence',
        example: 'What time is it now?',
        level: 'A1'
      },
      {
        id: 'a1-16',
        word: 'day',
        definition: 'A period of 24 hours',
        example: 'Today is a beautiful day.',
        level: 'A1'
      },
      {
        id: 'a1-17',
        word: 'night',
        definition: 'The time when it is dark',
        example: 'Good night, sleep well.',
        level: 'A1'
      },
      {
        id: 'a1-18',
        word: 'eat',
        definition: 'To put food in your mouth and swallow it',
        example: 'Let\'s eat dinner together.',
        level: 'A1'
      },
      {
        id: 'a1-19',
        word: 'drink',
        definition: 'To take liquid into your mouth and swallow it',
        example: 'I like to drink coffee in the morning.',
        level: 'A1'
      },
      {
        id: 'a1-20',
        word: 'love',
        definition: 'A strong feeling of affection',
        example: 'I love my family very much.',
        level: 'A1'
      }
    ]
  },
  {
    level: 'A2',
    title: LEVEL_CONFIGS.A2.title,
    description: LEVEL_CONFIGS.A2.description,
    color: LEVEL_CONFIGS.A2.color,
    bgColor: LEVEL_CONFIGS.A2.bgColor,
    words: [
      {
        id: 'a2-1',
        word: 'adventure',
        definition: 'An exciting or unusual experience',
        example: 'Our trip to the mountains was a great adventure.',
        level: 'A2'
      },
      {
        id: 'a2-2',
        word: 'comfortable',
        definition: 'Giving a feeling of physical ease',
        example: 'This chair is very comfortable to sit in.',
        level: 'A2'
      },
      {
        id: 'a2-3',
        word: 'dangerous',
        definition: 'Likely to cause harm or injury',
        example: 'It\'s dangerous to drive too fast.',
        level: 'A2'
      },
      {
        id: 'a2-4',
        word: 'environment',
        definition: 'The natural world around us',
        example: 'We should protect the environment.',
        level: 'A2'
      },
      {
        id: 'a2-5',
        word: 'experience',
        definition: 'Knowledge gained from doing something',
        example: 'She has a lot of experience in teaching.',
        level: 'A2'
      },
      {
        id: 'a2-6',
        word: 'government',
        definition: 'The group of people who control a country',
        example: 'The government announced new policies.',
        level: 'A2'
      },
      {
        id: 'a2-7',
        word: 'important',
        definition: 'Having great significance or value',
        example: 'Education is very important for children.',
        level: 'A2'
      },
      {
        id: 'a2-8',
        word: 'information',
        definition: 'Facts or details about something',
        example: 'I need more information about this course.',
        level: 'A2'
      },
      {
        id: 'a2-9',
        word: 'interesting',
        definition: 'Holding attention or curiosity',
        example: 'The documentary was very interesting.',
        level: 'A2'
      },
      {
        id: 'a2-10',
        word: 'language',
        definition: 'A system of communication used by people',
        example: 'English is an international language.',
        level: 'A2'
      },
      {
        id: 'a2-11',
        word: 'necessary',
        definition: 'Required to be done or achieved',
        example: 'It\'s necessary to study for the exam.',
        level: 'A2'
      },
      {
        id: 'a2-12',
        word: 'opportunity',
        definition: 'A chance for advancement or progress',
        example: 'This job offers a great opportunity.',
        level: 'A2'
      },
      {
        id: 'a2-13',
        word: 'popular',
        definition: 'Liked by many people',
        example: 'Pizza is a popular food worldwide.',
        level: 'A2'
      },
      {
        id: 'a2-14',
        word: 'problem',
        definition: 'A difficult situation that needs solving',
        example: 'We need to solve this problem quickly.',
        level: 'A2'
      },
      {
        id: 'a2-15',
        word: 'relationship',
        definition: 'The way people are connected',
        example: 'They have a good relationship.',
        level: 'A2'
      },
      {
        id: 'a2-16',
        word: 'responsible',
        definition: 'Having a duty to deal with something',
        example: 'Parents are responsible for their children.',
        level: 'A2'
      },
      {
        id: 'a2-17',
        word: 'situation',
        definition: 'The circumstances at a particular time',
        example: 'The situation is getting better.',
        level: 'A2'
      },
      {
        id: 'a2-18',
        word: 'successful',
        definition: 'Achieving desired aims or results',
        example: 'She is a successful businesswoman.',
        level: 'A2'
      },
      {
        id: 'a2-19',
        word: 'technology',
        definition: 'Scientific knowledge applied practically',
        example: 'Technology has changed our lives.',
        level: 'A2'
      },
      {
        id: 'a2-20',
        word: 'traditional',
        definition: 'Following long-established customs',
        example: 'We celebrated with traditional food.',
        level: 'A2'
      }
    ]
  },
  {
    level: 'B1',
    title: LEVEL_CONFIGS.B1.title,
    description: LEVEL_CONFIGS.B1.description,
    color: LEVEL_CONFIGS.B1.color,
    bgColor: LEVEL_CONFIGS.B1.bgColor,
    words: [
      {
        id: 'b1-1',
        word: 'achievement',
        definition: 'Something accomplished successfully',
        example: 'Graduating from university was a great achievement.',
        level: 'B1'
      },
      {
        id: 'b1-2',
        word: 'approximately',
        definition: 'Close to a particular number or time',
        example: 'The meeting will last approximately two hours.',
        level: 'B1'
      },
      {
        id: 'b1-3',
        word: 'consequence',
        definition: 'A result of a particular action',
        example: 'The consequence of not studying is failing the exam.',
        level: 'B1'
      },
      {
        id: 'b1-4',
        word: 'demonstrate',
        definition: 'To show clearly by example',
        example: 'The teacher will demonstrate the experiment.',
        level: 'B1'
      },
      {
        id: 'b1-5',
        word: 'efficient',
        definition: 'Working in a well-organized way',
        example: 'This new system is more efficient.',
        level: 'B1'
      },
      {
        id: 'b1-6',
        word: 'fundamental',
        definition: 'Forming a necessary base or core',
        example: 'Reading is fundamental to education.',
        level: 'B1'
      },
      {
        id: 'b1-7',
        word: 'generate',
        definition: 'To produce or create something',
        example: 'Solar panels generate electricity.',
        level: 'B1'
      },
      {
        id: 'b1-8',
        word: 'hypothesis',
        definition: 'A proposed explanation for something',
        example: 'Scientists test their hypothesis through experiments.',
        level: 'B1'
      },
      {
        id: 'b1-9',
        word: 'implement',
        definition: 'To put a plan into action',
        example: 'The company will implement new policies.',
        level: 'B1'
      },
      {
        id: 'b1-10',
        word: 'justify',
        definition: 'To show or prove to be right',
        example: 'Can you justify your decision?',
        level: 'B1'
      },
      {
        id: 'b1-11',
        word: 'maintain',
        definition: 'To keep something in good condition',
        example: 'It\'s important to maintain your health.',
        level: 'B1'
      },
      {
        id: 'b1-12',
        word: 'objective',
        definition: 'A goal or aim to be achieved',
        example: 'Our objective is to improve customer service.',
        level: 'B1'
      },
      {
        id: 'b1-13',
        word: 'perspective',
        definition: 'A particular way of viewing things',
        example: 'From my perspective, this is the best solution.',
        level: 'B1'
      },
      {
        id: 'b1-14',
        word: 'potential',
        definition: 'Having the capacity to develop',
        example: 'She has great potential as a leader.',
        level: 'B1'
      },
      {
        id: 'b1-15',
        word: 'procedure',
        definition: 'An established way of doing something',
        example: 'Follow the safety procedure carefully.',
        level: 'B1'
      },
      {
        id: 'b1-16',
        word: 'relevant',
        definition: 'Closely connected to the matter',
        example: 'Please provide relevant information only.',
        level: 'B1'
      },
      {
        id: 'b1-17',
        word: 'significant',
        definition: 'Important or notable',
        example: 'There was a significant improvement in sales.',
        level: 'B1'
      },
      {
        id: 'b1-18',
        word: 'strategy',
        definition: 'A plan to achieve a goal',
        example: 'We need a new marketing strategy.',
        level: 'B1'
      },
      {
        id: 'b1-19',
        word: 'technique',
        definition: 'A way of doing something skillfully',
        example: 'She learned a new painting technique.',
        level: 'B1'
      },
      {
        id: 'b1-20',
        word: 'variable',
        definition: 'Something that can change',
        example: 'Weather is a variable factor in farming.',
        level: 'B1'
      }
    ]
  },
  {
    level: 'B2',
    title: LEVEL_CONFIGS.B2.title,
    description: LEVEL_CONFIGS.B2.description,
    color: LEVEL_CONFIGS.B2.color,
    bgColor: LEVEL_CONFIGS.B2.bgColor,
    words: [
      {
        id: 'b2-1',
        word: 'accommodate',
        definition: 'To provide space or adapt to fit',
        example: 'The hotel can accommodate 200 guests.',
        level: 'B2'
      },
      {
        id: 'b2-2',
        word: 'comprehensive',
        definition: 'Complete and including everything',
        example: 'We need a comprehensive analysis of the data.',
        level: 'B2'
      },
      {
        id: 'b2-3',
        word: 'deteriorate',
        definition: 'To become progressively worse',
        example: 'The patient\'s condition began to deteriorate.',
        level: 'B2'
      },
      {
        id: 'b2-4',
        word: 'elaborate',
        definition: 'To develop or present in detail',
        example: 'Could you elaborate on your proposal?',
        level: 'B2'
      },
      {
        id: 'b2-5',
        word: 'fluctuate',
        definition: 'To rise and fall irregularly',
        example: 'Stock prices fluctuate throughout the day.',
        level: 'B2'
      },
      {
        id: 'b2-6',
        word: 'inevitable',
        definition: 'Certain to happen; unavoidable',
        example: 'Change is inevitable in business.',
        level: 'B2'
      },
      {
        id: 'b2-7',
        word: 'manipulate',
        definition: 'To handle or control skillfully',
        example: 'The software allows you to manipulate images.',
        level: 'B2'
      },
      {
        id: 'b2-8',
        word: 'negligible',
        definition: 'So small as to be not worth considering',
        example: 'The side effects are negligible.',
        level: 'B2'
      },
      {
        id: 'b2-9',
        word: 'optimistic',
        definition: 'Hopeful and confident about the future',
        example: 'She remains optimistic about the outcome.',
        level: 'B2'
      },
      {
        id: 'b2-10',
        word: 'predominant',
        definition: 'Present as the strongest element',
        example: 'Blue is the predominant color in the painting.',
        level: 'B2'
      },
      {
        id: 'b2-11',
        word: 'reluctant',
        definition: 'Unwilling and hesitant',
        example: 'He was reluctant to share his opinion.',
        level: 'B2'
      },
      {
        id: 'b2-12',
        word: 'sophisticated',
        definition: 'Complex and refined',
        example: 'The software has sophisticated features.',
        level: 'B2'
      },
      {
        id: 'b2-13',
        word: 'substantial',
        definition: 'Of considerable importance or size',
        example: 'There was a substantial increase in profits.',
        level: 'B2'
      },
      {
        id: 'b2-14',
        word: 'transparent',
        definition: 'Easy to perceive or detect',
        example: 'The company maintains transparent policies.',
        level: 'B2'
      },
      {
        id: 'b2-15',
        word: 'unprecedented',
        definition: 'Never done or known before',
        example: 'The pandemic created unprecedented challenges.',
        level: 'B2'
      },
      {
        id: 'b2-16',
        word: 'versatile',
        definition: 'Able to adapt to many functions',
        example: 'This tool is versatile and useful.',
        level: 'B2'
      },
      {
        id: 'b2-17',
        word: 'vulnerable',
        definition: 'Exposed to the possibility of harm',
        example: 'Children are vulnerable to online dangers.',
        level: 'B2'
      },
      {
        id: 'b2-18',
        word: 'ambiguous',
        definition: 'Open to more than one interpretation',
        example: 'The instructions were ambiguous and confusing.',
        level: 'B2'
      },
      {
        id: 'b2-19',
        word: 'coherent',
        definition: 'Logical and consistent',
        example: 'Please present a coherent argument.',
        level: 'B2'
      },
      {
        id: 'b2-20',
        word: 'explicit',
        definition: 'Stated clearly and in detail',
        example: 'The contract contains explicit terms.',
        level: 'B2'
      }
    ]
  },
  {
    level: 'C1',
    title: LEVEL_CONFIGS.C1.title,
    description: LEVEL_CONFIGS.C1.description,
    color: LEVEL_CONFIGS.C1.color,
    bgColor: LEVEL_CONFIGS.C1.bgColor,
    words: [
      {
        id: 'c1-1',
        word: 'articulate',
        definition: 'To express thoughts clearly and effectively',
        example: 'She can articulate complex ideas with ease.',
        level: 'C1'
      },
      {
        id: 'c1-2',
        word: 'contemplate',
        definition: 'To think deeply about something',
        example: 'He contemplated the meaning of life.',
        level: 'C1'
      },
      {
        id: 'c1-3',
        word: 'discrepancy',
        definition: 'A lack of compatibility between facts',
        example: 'There\'s a discrepancy in the financial reports.',
        level: 'C1'
      },
      {
        id: 'c1-4',
        word: 'eloquent',
        definition: 'Fluent and persuasive in speaking',
        example: 'The speaker gave an eloquent presentation.',
        level: 'C1'
      },
      {
        id: 'c1-5',
        word: 'facilitate',
        definition: 'To make an action easier',
        example: 'Technology can facilitate learning.',
        level: 'C1'
      },
      {
        id: 'c1-6',
        word: 'inherent',
        definition: 'Existing as a natural part of something',
        example: 'Risk is inherent in any investment.',
        level: 'C1'
      },
      {
        id: 'c1-7',
        word: 'meticulous',
        definition: 'Showing great attention to detail',
        example: 'She is meticulous in her research.',
        level: 'C1'
      },
      {
        id: 'c1-8',
        word: 'nuance',
        definition: 'A subtle difference in meaning',
        example: 'The translation missed important nuances.',
        level: 'C1'
      },
      {
        id: 'c1-9',
        word: 'paradigm',
        definition: 'A typical example or pattern',
        example: 'This represents a new paradigm in medicine.',
        level: 'C1'
      },
      {
        id: 'c1-10',
        word: 'profound',
        definition: 'Very great or intense',
        example: 'The book had a profound impact on me.',
        level: 'C1'
      },
      {
        id: 'c1-11',
        word: 'scrutinize',
        definition: 'To examine closely and critically',
        example: 'The committee will scrutinize the proposal.',
        level: 'C1'
      },
      {
        id: 'c1-12',
        word: 'tangible',
        definition: 'Clear and definite; real',
        example: 'We need tangible evidence of progress.',
        level: 'C1'
      },
      {
        id: 'c1-13',
        word: 'ubiquitous',
        definition: 'Present everywhere at the same time',
        example: 'Smartphones are ubiquitous in modern society.',
        level: 'C1'
      },
      {
        id: 'c1-14',
        word: 'vindicate',
        definition: 'To clear of blame or suspicion',
        example: 'The evidence vindicated his claims.',
        level: 'C1'
      },
      {
        id: 'c1-15',
        word: 'aesthetic',
        definition: 'Concerned with beauty or artistic taste',
        example: 'The building has great aesthetic appeal.',
        level: 'C1'
      },
      {
        id: 'c1-16',
        word: 'cognitive',
        definition: 'Related to mental processes',
        example: 'Cognitive abilities decline with age.',
        level: 'C1'
      },
      {
        id: 'c1-17',
        word: 'empirical',
        definition: 'Based on observation and experiment',
        example: 'The theory needs empirical validation.',
        level: 'C1'
      },
      {
        id: 'c1-18',
        word: 'hypothetical',
        definition: 'Based on assumption rather than fact',
        example: 'Let\'s consider a hypothetical scenario.',
        level: 'C1'
      },
      {
        id: 'c1-19',
        word: 'intrinsic',
        definition: 'Belonging naturally; essential',
        example: 'Motivation has intrinsic value.',
        level: 'C1'
      },
      {
        id: 'c1-20',
        word: 'pragmatic',
        definition: 'Dealing with things practically',
        example: 'We need a pragmatic approach to this problem.',
        level: 'C1'
      }
    ]
  },
  {
    level: 'C2',
    title: LEVEL_CONFIGS.C2.title,
    description: LEVEL_CONFIGS.C2.description,
    color: LEVEL_CONFIGS.C2.color,
    bgColor: LEVEL_CONFIGS.C2.bgColor,
    words: [
      {
        id: 'c2-1',
        word: 'ameliorate',
        definition: 'To make something better or improve',
        example: 'The new policies aim to ameliorate working conditions.',
        level: 'C2'
      },
      {
        id: 'c2-2',
        word: 'conundrum',
        definition: 'A confusing and difficult problem',
        example: 'The ethical conundrum has no easy solution.',
        level: 'C2'
      },
      {
        id: 'c2-3',
        word: 'ephemeral',
        definition: 'Lasting for a very short time',
        example: 'The beauty of cherry blossoms is ephemeral.',
        level: 'C2'
      },
      {
        id: 'c2-4',
        word: 'fastidious',
        definition: 'Very attentive to detail; meticulous',
        example: 'He is fastidious about his appearance.',
        level: 'C2'
      },
      {
        id: 'c2-5',
        word: 'gregarious',
        definition: 'Fond of company; sociable',
        example: 'She has a gregarious personality.',
        level: 'C2'
      },
      {
        id: 'c2-6',
        word: 'idiosyncratic',
        definition: 'Relating to individual peculiarities',
        example: 'His idiosyncratic behavior puzzled everyone.',
        level: 'C2'
      },
      {
        id: 'c2-7',
        word: 'juxtapose',
        definition: 'To place side by side for comparison',
        example: 'The artist juxtaposed modern and classical elements.',
        level: 'C2'
      },
      {
        id: 'c2-8',
        word: 'magnanimous',
        definition: 'Very generous or forgiving',
        example: 'His magnanimous gesture surprised everyone.',
        level: 'C2'
      },
      {
        id: 'c2-9',
        word: 'nefarious',
        definition: 'Extremely wicked or villainous',
        example: 'The villain\'s nefarious plot was uncovered.',
        level: 'C2'
      },
      {
        id: 'c2-10',
        word: 'ostentatious',
        definition: 'Characterized by vulgar display',
        example: 'His ostentatious lifestyle attracted criticism.',
        level: 'C2'
      },
      {
        id: 'c2-11',
        word: 'perspicacious',
        definition: 'Having keen insight and understanding',
        example: 'Her perspicacious analysis impressed the board.',
        level: 'C2'
      },
      {
        id: 'c2-12',
        word: 'quixotic',
        definition: 'Extremely idealistic and unrealistic',
        example: 'His quixotic quest for perfection was admirable.',
        level: 'C2'
      },
      {
        id: 'c2-13',
        word: 'recalcitrant',
        definition: 'Having an obstinately uncooperative attitude',
        example: 'The recalcitrant student refused to follow rules.',
        level: 'C2'
      },
      {
        id: 'c2-14',
        word: 'sanguine',
        definition: 'Optimistic in a difficult situation',
        example: 'Despite setbacks, she remained sanguine.',
        level: 'C2'
      },
      {
        id: 'c2-15',
        word: 'truculent',
        definition: 'Eager to fight; aggressively defiant',
        example: 'His truculent attitude made negotiations difficult.',
        level: 'C2'
      },
      {
        id: 'c2-16',
        word: 'ubiquitous',
        definition: 'Present everywhere simultaneously',
        example: 'Social media has become ubiquitous in daily life.',
        level: 'C2'
      },
      {
        id: 'c2-17',
        word: 'vicarious',
        definition: 'Experienced through someone else',
        example: 'She lived vicariously through her daughter\'s achievements.',
        level: 'C2'
      },
      {
        id: 'c2-18',
        word: 'whimsical',
        definition: 'Playfully quaint or fanciful',
        example: 'The garden had a whimsical design.',
        level: 'C2'
      },
      {
        id: 'c2-19',
        word: 'xenophobic',
        definition: 'Having dislike of foreigners',
        example: 'Xenophobic attitudes harm social cohesion.',
        level: 'C2'
      },
      {
        id: 'c2-20',
        word: 'zealous',
        definition: 'Having great energy for a cause',
        example: 'She was zealous in her environmental activism.',
        level: 'C2'
      }
    ]
  }
];

export function getVocabularyByLevel(level: CEFRLevel): VocabularyLevel | undefined {
  return VOCABULARY_DATA.find(vocab => vocab.level === level);
}

export function getAllLevels(): CEFRLevel[] {
  return ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
}

export function getLevelConfig(level: CEFRLevel): LevelConfig {
  return LEVEL_CONFIGS[level];
} 