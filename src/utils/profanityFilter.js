const FORBIDDEN_WORDS = [
  // --- English Slurs & Offensive Terms ---
  'fuck', 'fucking', 'fucker', 'fuckwit', 'fucktard', 'shitty', 'shitting', 'bitchy', 'bitches', 'cunty', 'cuntish',
  'shit', 'asshole', 'bitch', 'cunt', 'dick', 'bastard', 'motherfucker', 'piss', 'arse', 'bollocks', 'wanker', 
  'damn', 'hell', 'crap', 'prick', 'cock', 'pussy', 'tits', 'bugger', 'twat', 'clit', 'muff', 'snatch', 'beaver', 
  'box', 'hole', 'ass', 'arsehole', 'balls', 'bellend', 'boobs', 'knockers', 'jugs', 'shag', 'bang', 'screw', 
  'bonk', 'root', 'blowjob', 'handjob', 'rimjob', 'fisting', 'creampie', 'cum', 'jizz', 'spunk', 'wank', 'tosser',
  'fucker', 'cocksucker', 'assfucker', 'dickhead', 'dickwad', 'cuntface', 'shithead', 'fuckface', 'sonofabitch', 
  'whore', 'slut', 'slag', 'slapper', 'hoe', 'skank', 'bloody', 'git', 'pillock', 'knob', 'knobhead', 'choad', 
  'dong', 'wang', 'pecker', 'tool', 'meat', 'boner', 'hard-on', 'fanny', 'faggot', 'dyke', 'queer', 'retard', 
  'nigger', 'porn', 'sex', 'hot',

  // --- Regional Slurs (Hindi, Bengali, South Indian, etc.) ---
  'madarchod', 'behenchod', 'behnchod', 'chutiya', 'chutiye', 'chutia', 'bhosdiwale', 'bhosadike', 'bosadike', 
  'bhosdike', 'bhosdi', 'randi', 'randika', 'randibaaz', 'gaandu', 'gandu', 'gaand', 'gudda', 'lund', 'lauda', 
  'lavde', 'laudeka', 'chut', 'pundai', 'pooku', 'modda', 'moddaka', 'tunne', 'myre', 'pundachi', 'dengu', 
  'otha', 'thayoli', 'lanja', 'lanjakodaka', 'soole', 'soolemaga', 'soole otha', 'magi', 'khankir', 'khankirchele', 
  'bhadwa', 'harami', 'haramkhor', 'kutiya', 'kutta', 'kutti', 'naayi', 'chodu', 'saala', 'saali', 'lavnya', 
  'bhadvya', 'aighaat', 'ai ghaat', 'hendthi', 'thendi', 'oombi', 'ammayi', 'boka', 'shala', 'tormake', 'tor ma ke', 
  'puttarchod', 'sunni', 'thevidiya', 'mayirandi', 'chodya', 'betichod', 'beti chod', 'bhenkelaude', 'bhen ke laude', 
  'maakichut', 'maa ki chut', 'bc', 'mc', 'gandiye', 'kamina', 'tatti', 'goo', 'chuchi', 'chod', 'hijra', 'bhadve', 
  'maderchod', 'bhenke', 'maaki', 'thuni', 'bosadi', 'ghaat', 'khankir chele', 'tor ma', 'gaandfat', 'lundchoos', 
  'chutmar', 'gandmara', 'chutke', 'pookulo', 'teri maa ki chut', 'banchod', 'puddi'
];

/**
 * Filters profanity from a given text, replacing forbidden words with ".........."
 * @param {string} text - The text to filter
 * @returns {string} - The filtered text
 */
export const filterProfanity = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  let filteredText = text;
  
  FORBIDDEN_WORDS.forEach(word => {
    // Escape word for regex
    const escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    
    // Create regex: case-insensitive, global, matching the whole word/phrase
    // For English we handle common suffixes, for regional we keep it strict
    const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
    
    // Replace with ".........."
    filteredText = filteredText.replace(regex, '..........');
  });
  
  return filteredText;
};
