import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, ArrowLeft, RefreshCw, CheckCircle2, 
  XCircle, Brain, Sparkles, Timer, Zap, PlayCircle, Languages
} from 'lucide-react';

const MASTER_QUESTIONS = [
  // --- LANGUAGE LEARNING ---
  { q: "What is the synonym of 'happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], correct: "Joyful", cat: "lang" },
  { q: "Choose the correct sentence:", options: ["She don't like apples.", "She doesn't like apples.", "She no like apples.", "She not likes apples."], correct: "She doesn't like apples.", cat: "lang" },
  { q: "What is the opposite of 'big'?", options: ["Large", "Small", "Huge", "Tall"], correct: "Small", cat: "lang" },
  { q: "I ___ to the store yesterday.", options: ["go", "went", "goes", "going"], correct: "went", cat: "lang" },
  { q: "What does 'beautiful' mean?", options: ["Ugly", "Very pretty", "Loud", "Fast"], correct: "Very pretty", cat: "lang" },
  { q: "Choose the correct article: '___ apple'", options: ["A", "An", "The", "No article"], correct: "An", cat: "lang" },
  { q: "What is the past tense of 'eat'?", options: ["Eated", "Ate", "Eating", "Eats"], correct: "Ate", cat: "lang" },
  { q: "Water is ___", options: ["dry", "liquid", "solid", "gas"], correct: "liquid", cat: "lang" },
  { q: "Which word is a noun?", options: ["Run", "Quickly", "Book", "Happy"], correct: "Book", cat: "lang" },
  { q: "I have ___ money. (zero)", options: ["many", "much", "no", "few"], correct: "no", cat: "lang" },
  { q: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childrens"], correct: "Children", cat: "lang" },
  { q: "He ___ football every Sunday.", options: ["play", "plays", "played", "playing"], correct: "plays", cat: "lang" },
  { q: "Synonym of 'fast':", options: ["Slow", "Quick", "Heavy", "Old"], correct: "Quick", cat: "lang" },
  { q: "___ you like coffee?", options: ["Do", "Does", "Is", "Are"], correct: "Do", cat: "lang" },
  { q: "Opposite of 'hot':", options: ["Warm", "Cold", "Boiling", "Spicy"], correct: "Cold", cat: "lang" },
  { q: "Correct spelling:", options: ["Recieve", "Receive", "Receve", "Recive"], correct: "Receive", cat: "lang" },
  { q: "I am ___ than my brother.", options: ["taller", "tallest", "more tall", "most tall"], correct: "taller", cat: "lang" },
  { q: "Antonym of 'rich':", options: ["Wealthy", "Poor", "Expensive", "Happy"], correct: "Poor", cat: "lang" },
  { q: "This is ___ book.", options: ["my", "mine", "me", "I"], correct: "my", cat: "lang" },
  { q: "Past tense of 'buy':", options: ["Buyed", "Bought", "Buying", "Buys"], correct: "Bought", cat: "lang" },
  { q: "How ___ apples do you want?", options: ["much", "many", "lot", "few"], correct: "many", cat: "lang" },
  { q: "Choose the correct preposition: 'I live ___ India.'", options: ["at", "in", "on", "to"], correct: "in", cat: "lang" },
  { q: "What does 'expensive' mean?", options: ["Cheap", "Costs a lot", "Free", "Old"], correct: "Costs a lot", cat: "lang" },
  { q: "She ___ TV right now.", options: ["watch", "watches", "is watching", "watched"], correct: "is watching", cat: "lang" },
  { q: "Plural of 'mouse':", options: ["Mouses", "Mice", "Mouse", "Mices"], correct: "Mice", cat: "lang" },
  { q: "What does 'brave' mean?", options: ["Scared", "Courageous", "Weak", "Tired"], correct: "Courageous", cat: "lang" },
  { q: "Past tense of 'write':", options: ["Writed", "Wrote", "Written", "Writing"], correct: "Wrote", cat: "lang" },
  { q: "Synonym of 'famous':", options: ["Unknown", "Well-known", "Poor", "Small"], correct: "Well-known", cat: "lang" },
  { q: "She is afraid ___ spiders.", options: ["of", "from", "with", "at"], correct: "of", cat: "lang" },
  { q: "What is the synonym of 'clever'?", options: ["Stupid", "Intelligent", "Lazy", "Slow"], correct: "Intelligent", cat: "lang" },
  { q: "Opposite of 'safe':", options: ["Secure", "Dangerous", "Protected", "Strong"], correct: "Dangerous", cat: "lang" },
  { q: "What is the plural of 'foot'?", options: ["Foots", "Feet", "Footes", "Feets"], correct: "Feet", cat: "lang" },
  { q: "Correct spelling:", options: ["Accomodate", "Accommodate", "Acomodate", "Accomodete"], correct: "Accommodate", cat: "lang" },
  { q: "Plural of 'knife':", options: ["Knifes", "Knives", "Knife", "Kniveses"], correct: "Knives", cat: "lang" },
  { q: "Which is a preposition?", options: ["Run", "Happy", "Between", "Book"], correct: "Between", cat: "lang" },
  { q: "Synonym of 'finish':", options: ["Start", "Complete", "Begin", "Open"], correct: "Complete", cat: "lang" },
  { q: "She is bad ___ singing.", options: ["in", "at", "on", "with"], correct: "at", cat: "lang" },
  { q: "Opposite of 'boring':", options: ["Dull", "Interesting", "Tired", "Slow"], correct: "Interesting", cat: "lang" },
  { q: "If I ___ rich, I would travel.", options: ["am", "was", "were", "be"], correct: "were", cat: "lang" },
  { q: "I look forward ___ meeting you.", options: ["to", "for", "at", "with"], correct: "to", cat: "lang" },
  { q: "He runs faster ___ his friend.", options: ["then", "than", "from", "with"], correct: "than", cat: "lang" },
  { q: "What is the opposite of 'always'?", options: ["Often", "Never", "Sometimes", "Usually"], correct: "Never", cat: "lang" },
  { q: "She ___ her keys at home.", options: ["forget", "forgot", "forgotten", "forgetting"], correct: "forgot", cat: "lang" },
  { q: "What does 'honest' mean?", options: ["Lying", "Truthful", "Rich", "Tall"], correct: "Truthful", cat: "lang" },
  { q: "I ___ swim when I was five.", options: ["can", "could", "may", "might"], correct: "could", cat: "lang" },
  { q: "The train arrives ___ 8 o'clock.", options: ["on", "at", "in", "to"], correct: "at", cat: "lang" },
  { q: "Plural of 'tooth':", options: ["Tooths", "Teeth", "Tooth", "Teeths"], correct: "Teeth", cat: "lang" },
  { q: "What is the superlative of 'bad'?", options: ["Badder", "Worst", "Worse", "Most bad"], correct: "Worst", cat: "lang" },
  { q: "She ___ to school by bus every day.", options: ["go", "goes", "went", "going"], correct: "goes", cat: "lang" },
  { q: "Opposite of 'early':", options: ["Late", "Soon", "Fast", "Quick"], correct: "Late", cat: "lang" },
  { q: "What is the synonym of 'smart'?", options: ["Stupid", "Intelligent", "Lazy", "Slow"], correct: "Intelligent", cat: "lang" },
  { q: "How ___ is this river?", options: ["long", "tall", "high", "short"], correct: "long", cat: "lang" },
  { q: "I will ___ you tomorrow.", options: ["call", "calls", "called", "calling"], correct: "call", cat: "lang" },
  { q: "What does 'kind' mean?", options: ["Cruel", "Nice and helpful", "Rich", "Tall"], correct: "Nice and helpful", cat: "lang" },

  // --- GENERAL KNOWLEDGE ---
  { q: "What is the longest river in the world?", options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: "Nile River", cat: "gk" },
  { q: "Which country has the most natural lakes?", options: ["USA", "Russia", "Canada", "Brazil"], correct: "Canada", cat: "gk" },
  { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Perth", "Canberra"], correct: "Canberra", cat: "gk" },
  { q: "The Sahara Desert is located primarily in which continent?", options: ["Asia", "South America", "Africa", "Australia"], correct: "Africa", cat: "gk" },
  { q: "Which of these is the highest mountain peak in Africa?", options: ["Mount Kenya", "Mount Kilimanjaro", "Mount Elbrus", "Mount Ras Dashen"], correct: "Mount Kilimanjaro", cat: "gk" },
  { q: "Which European country is known as the 'Land of a Thousand Lakes'?", options: ["Sweden", "Norway", "Finland", "Switzerland"], correct: "Finland", cat: "gk" },
  { q: "What is the smallest independent country in the world by area?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], correct: "Vatican City", cat: "gk" },
  { q: "The Great Barrier Reef is located off the coast of which Australian state?", options: ["Western Australia", "Northern Territory", "New South Wales", "Queensland"], correct: "Queensland", cat: "gk" },
  { q: "Which South American country is landlocked?", options: ["Chile", "Argentina", "Bolivia", "Colombia"], correct: "Bolivia", cat: "gk" },
  { q: "What is the world's largest ocean?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: "Pacific Ocean", cat: "gk" },
  { q: "The Gobi Desert is located primarily in which two countries?", options: ["India and Pakistan", "Iran and Iraq", "Mongolia and China", "Kazakhstan and Uzbekistan"], correct: "Mongolia and China", cat: "gk" },
  { q: "What is the longest mountain range in the world?", options: ["The Andes", "The Himalayas", "The Rocky Mountains", "The Ural Mountains"], correct: "The Andes", cat: "gk" },
  { q: "Which city is located on two continents?", options: ["Cairo", "Rome", "Istanbul", "Tokyo"], correct: "Istanbul", cat: "gk" },
  { q: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Montreal", "Ottawa"], correct: "Ottawa", cat: "gk" },
  { q: "Which of these countries does NOT have a coastline?", options: ["Poland", "Hungary", "Italy", "Greece"], correct: "Hungary", cat: "gk" },
  { q: "What is the deepest lake in the world?", options: ["Lake Tanganyika", "Lake Superior", "Lake Baikal", "Lake Victoria"], correct: "Lake Baikal", cat: "gk" },
  { q: "Which US state is made up entirely of islands?", options: ["Florida", "Alaska", "Hawaii", "Rhode Island"], correct: "Hawaii", cat: "gk" },
  { q: "The Nile River flows into which body of water?", options: ["Red Sea", "Indian Ocean", "Lake Victoria", "Mediterranean Sea"], correct: "Mediterranean Sea", cat: "gk" },
  { q: "What is the largest country in South America by area?", options: ["Argentina", "Brazil", "Peru", "Colombia"], correct: "Brazil", cat: "gk" },
  { q: "Which of these is a Scandinavian country?", options: ["Netherlands", "Iceland", "Germany", "Poland"], correct: "Iceland", cat: "gk" },
  { q: "Who was the first President of the United States?", options: ["Thomas Jefferson", "John Adams", "Benjamin Franklin", "George Washington"], correct: "George Washington", cat: "gk" },
  { q: "In which year did World War I begin?", options: ["1912", "1914", "1916", "1918"], correct: "1914", cat: "gk" },
  { q: "Who painted the Mona Lisa?", options: ["Michelangelo", "Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"], correct: "Leonardo da Vinci", cat: "gk" },
  { q: "The ancient civilization of Mesopotamia was located between which two rivers?", options: ["Nile and Congo", "Indus and Ganges", "Tigris and Euphrates", "Danube and Rhine"], correct: "Tigris and Euphrates", cat: "gk" },
  { q: "Who was the British Prime Minister during World War II?", options: ["Neville Chamberlain", "Clement Attlee", "Winston Churchill", "Margaret Thatcher"], correct: "Winston Churchill", cat: "gk" },
  { q: "In which year did the Titanic sink?", options: ["1905", "1912", "1918", "1921"], correct: "1912", cat: "gk" },
  { q: "Which ancient wonder was located at Giza?", options: ["Colossus of Rhodes", "Hanging Gardens of Babylon", "Lighthouse of Alexandria", "Great Pyramid"], correct: "Great Pyramid", cat: "gk" },
  { q: "Who is known for discovering the theory of relativity?", options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Marie Curie"], correct: "Albert Einstein", cat: "gk" },
  { q: "The Magna Carta was signed in which country?", options: ["France", "England", "Italy", "Germany"], correct: "England", cat: "gk" },
  { q: "Who was the first person to step on the moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Michael Collins", "Neil Armstrong"], correct: "Neil Armstrong", cat: "gk" },
  { q: "Which empire was ruled by Julius Caesar?", options: ["Ottoman Empire", "Persian Empire", "Mongol Empire", "Roman Empire"], correct: "Roman Empire", cat: "gk" },
  { q: "The Cold War was primarily a conflict between which two nations?", options: ["USA and China", "USSR and China", "USA and USSR", "UK and Germany"], correct: "USA and USSR", cat: "gk" },
  { q: "Who wrote the 'I Have a Dream' speech?", options: ["Malcolm X", "Nelson Mandela", "Martin Luther King Jr.", "John F. Kennedy"], correct: "Martin Luther King Jr.", cat: "gk" },
  { q: "The French Revolution began in which year?", options: ["1776", "1789", "1799", "1804"], correct: "1789", cat: "gk" },
  { q: "Who was the first female Prime Minister of the United Kingdom?", options: ["Angela Merkel", "Indira Gandhi", "Theresa May", "Margaret Thatcher"], correct: "Margaret Thatcher", cat: "gk" },
  { q: "The Great Wall of China was primarily built to protect against invasions from which group?", options: ["Mongols", "Japanese", "Russians", "Tibetans"], correct: "Mongols", cat: "gk" },
  { q: "Who discovered penicillin?", options: ["Louis Pasteur", "Gregor Mendel", "Alexander Fleming", "Robert Koch"], correct: "Alexander Fleming", cat: "gk" },
  { q: "The ancient city of Machu Picchu belongs to which civilization?", options: ["Aztec", "Maya", "Inca", "Olmec"], correct: "Inca", cat: "gk" },
  { q: "Which US President issued the Emancipation Proclamation?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Andrew Johnson"], correct: "Abraham Lincoln", cat: "gk" },
  { q: "The Berlin Wall fell in which year?", options: ["1987", "1989", "1991", "1993"], correct: "1989", cat: "gk" },
  { q: "What is the hardest known natural mineral?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: "Diamond", cat: "gk" },
  { q: "What is the process by which plants make their food?", options: ["Respiration", "Fermentation", "Photosynthesis", "Transpiration"], correct: "Photosynthesis", cat: "gk" },
  { q: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correct: "Au", cat: "gk" },
  { q: "How many bones are in the adult human body?", options: ["206", "208", "210", "204"], correct: "206", cat: "gk" },
  { q: "What is the largest planet in our solar system?", options: ["Saturn", "Jupiter", "Mars", "Neptune"], correct: "Jupiter", cat: "gk" },
  { q: "Which of these animals is a marsupial?", options: ["Platypus", "Ostrich", "Kangaroo", "Dolphin"], correct: "Kangaroo", cat: "gk" },
  { q: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Argon", "Nitrogen"], correct: "Nitrogen", cat: "gk" },
  { q: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "3,000 km/s"], correct: "300,000 km/s", cat: "gk" },
  { q: "Who developed the theory of evolution by natural selection?", options: ["Gregor Mendel", "Charles Darwin", "Alfred Russel Wallace", "Jean-Baptiste Lamarck"], correct: "Charles Darwin", cat: "gk" },
  { q: "Which of these is a mammal?", options: ["Penguin", "Shark", "Bat", "Frog"], correct: "Bat", cat: "gk" },
  { q: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: "2", cat: "gk" },
  { q: "What is the main component of the Sun?", options: ["Oxygen", "Carbon", "Hydrogen", "Helium"], correct: "Hydrogen", cat: "gk" },
  { q: "Which part of the human body is the femur?", options: ["Arm bone", "Shin bone", "Thigh bone", "Hip bone"], correct: "Thigh bone", cat: "gk" },
  { q: "What is the study of fungi called?", options: ["Virology", "Mycology", "Bacteriology", "Ecology"], correct: "Mycology", cat: "gk" },
  { q: "Which of these is not a state of matter?", options: ["Solid", "Liquid", "Gas", "Energy"], correct: "Energy", cat: "gk" },
  { q: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Lungs"], correct: "Skin", cat: "gk" },
  { q: "Which planet is known as the 'Red Planet'?", options: ["Venus", "Jupiter", "Mars", "Mercury"], correct: "Mars", cat: "gk" },
  { q: "What is the boiling point of water at sea level (in Celsius)?", options: ["90°C", "100°C", "110°C", "80°C"], correct: "100°C", cat: "gk" },
  { q: "What type of animal is a seahorse?", options: ["Mammal", "Reptile", "Amphibian", "Fish"], correct: "Fish", cat: "gk" },
  { q: "What is the chemical symbol for water?", options: ["O2", "CO2", "H2O", "HO2"], correct: "H2O", cat: "gk" },
  { q: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"], correct: "William Shakespeare", cat: "gk" },
  { q: "Who painted 'Starry Night'?", options: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Edvard Munch"], correct: "Vincent van Gogh", cat: "gk" },
  { q: "Which famous detective was created by Sir Arthur Conan Doyle?", options: ["Hercule Poirot", "Miss Marple", "Sherlock Holmes", "Sam Spade"], correct: "Sherlock Holmes", cat: "gk" },
  { q: "Who wrote 'The Lord of the Rings' trilogy?", options: ["J.K. Rowling", "George R.R. Martin", "J.R.R. Tolkien", "C.S. Lewis"], correct: "J.R.R. Tolkien", cat: "gk" },
  { q: "What is the name of Harry Potter's pet owl?", options: ["Scabbers", "Crookshanks", "Hedwig", "Pigwidgeon"], correct: "Hedwig", cat: "gk" },
  { q: "Who painted the ceiling of the Sistine Chapel?", options: ["Donatello", "Leonardo da Vinci", "Raphael", "Michelangelo"], correct: "Michelangelo", cat: "gk" },
  { q: "Which author wrote 'Pride and Prejudice'?", options: ["Emily Brontë", "Charlotte Brontë", "Jane Austen", "Louisa May Alcott"], correct: "Jane Austen", cat: "gk" },
  { q: "What is the name of the fictional African country in 'Black Panther'?", options: ["Zamunda", "Genosha", "Wakanda", "Sokovia"], correct: "Wakanda", cat: "gk" },
  { q: "Who wrote 'The Odyssey'?", options: ["Socrates", "Plato", "Aristotle", "Homer"], correct: "Homer", cat: "gk" },
  { q: "What is the name of the band that featured Freddie Mercury?", options: ["The Rolling Stones", "Led Zeppelin", "Pink Floyd", "Queen"], correct: "Queen", cat: "gk" },
  { q: "Who directed the movie 'Jurassic Park'?", options: ["James Cameron", "George Lucas", "Steven Spielberg", "Ridley Scott"], correct: "Steven Spielberg", cat: "gk" },
  { q: "Which artist is known for cutting off his own ear?", options: ["Pablo Picasso", "Salvador Dalí", "Vincent van Gogh", "Claude Monet"], correct: "Vincent van Gogh", cat: "gk" },
  { q: "Who wrote '1984'?", options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"], correct: "George Orwell", cat: "gk" },
  { q: "What is the name of the lion in 'The Lion King'?", options: ["Scar", "Mufasa", "Simba", "Nala"], correct: "Simba", cat: "gk" },
  { q: "Who painted the 'Mona Lisa'?", options: ["Raphael", "Donatello", "Leonardo da Vinci", "Caravaggio"], correct: "Leonardo da Vinci", cat: "gk" },
  { q: "Which of these is a novel by Charles Dickens?", options: ["Wuthering Heights", "The Picture of Dorian Gray", "Great Expectations", "Middlemarch"], correct: "Great Expectations", cat: "gk" },
  { q: "Who is the author of the 'Harry Potter' series?", options: ["J.K. Rowling", "Suzanne Collins", "Stephenie Meyer", "Rick Riordan"], correct: "J.K. Rowling", cat: "gk" },
  { q: "What is the name of the theater where many of Shakespeare's plays were performed?", options: ["The Apollo", "The Colosseum", "The Globe", "The Lyceum"], correct: "The Globe", cat: "gk" },
  { q: "Who painted 'The Persistence of Memory' featuring melting clocks?", options: ["Pablo Picasso", "Salvador Dalí", "Henri Matisse", "Andy Warhol"], correct: "Salvador Dalí", cat: "gk" },
  { q: "Which musician is known as the 'King of Pop'?", options: ["Elvis Presley", "Prince", "Michael Jackson", "Stevie Wonder"], correct: "Michael Jackson", cat: "gk" },
  { q: "How many players are on a soccer team on the field?", options: ["9", "10", "11", "12"], correct: "11", cat: "gk" },
  { q: "Which country won the FIFA World Cup in 2018?", options: ["Germany", "Brazil", "France", "Argentina"], correct: "France", cat: "gk" },
  { q: "Who has won the most Wimbledon men's singles titles?", options: ["Pete Sampras", "Novak Djokovic", "Roger Federer", "Rafael Nadal"], correct: "Roger Federer", cat: "gk" },
  { q: "In which sport would you perform a 'slam dunk'?", options: ["Volleyball", "Basketball", "Handball", "Rugby"], correct: "Basketball", cat: "gk" },
  { q: "What is the national sport of Japan?", options: ["Karate", "Judo", "Sumo", "Kendo"], correct: "Sumo", cat: "gk" },
  { q: "Who is the most decorated Olympian of all time (most gold medals)?", options: ["Usain Bolt", "Larisa Latynina", "Michael Phelps", "Paavo Nurmi"], correct: "Michael Phelps", cat: "gk" },
  { q: "How many players are in a basketball team on the court?", options: ["4", "5", "6", "7"], correct: "5", cat: "gk" },
  { q: "Which country is the birthplace of golf?", options: ["England", "Ireland", "USA", "Scotland"], correct: "Scotland", cat: "gk" },
  { q: "What is the term for three strikes in a row in bowling?", options: ["Turkey", "Strikeout", "Hat-trick", "Perfect game"], correct: "Turkey", cat: "gk" },
  { q: "Who won the most Formula 1 World Championships?", options: ["Ayrton Senna", "Lewis Hamilton", "Michael Schumacher", "Alain Prost"], correct: "Michael Schumacher", cat: "gk" },
  { q: "Which boxer was known as 'The Greatest'?", options: ["Mike Tyson", "Joe Frazier", "Muhammad Ali", "George Foreman"], correct: "Muhammad Ali", cat: "gk" },
  { q: "In tennis, what is a score of zero called?", options: ["Nil", "Zero", "Duck", "Love"], correct: "Love", cat: "gk" },
  { q: "The Super Bowl is the championship game for which sport?", options: ["Baseball", "Basketball", "American Football", "Ice Hockey"], correct: "American Football", cat: "gk" },
  { q: "Which cricketer has scored the most international centuries?", options: ["Ricky Ponting", "Virat Kohli", "Sachin Tendulkar", "Kumar Sangakkara"], correct: "Sachin Tendulkar", cat: "gk" },
  { q: "What is the official ball used in American football called?", options: ["Pigskin", "Puck", "Slapshot", "Birdie"], correct: "Pigskin", cat: "gk" },
  { q: "Which country won the first Cricket World Cup in 1975?", options: ["Australia", "England", "West Indies", "India"], correct: "West Indies", cat: "gk" },
  { q: "In which sport is the Ryder Cup contested?", options: ["Tennis", "Golf", "Sailing", "Equestrian"], correct: "Golf", cat: "gk" },
  { q: "Who is known as 'The Flying Finn' for his long-distance running?", options: ["Lasse Virén", "Paavo Nurmi", "Hannes Kolehmainen", "Ville Ritola"], correct: "Paavo Nurmi", cat: "gk" },
  { q: "What is the length of a marathon in miles?", options: ["24.2 miles", "26.2 miles", "25.2 miles", "27.2 miles"], correct: "26.2 miles", cat: "gk" },
  { q: "Which team has won the most UEFA Champions League titles?", options: ["AC Milan", "Bayern Munich", "Liverpool", "Real Madrid"], correct: "Real Madrid", cat: "gk" },

  // --- TECHNOLOGY & CODING (Massive Expansion) ---
  { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Transfer Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correct: "Hyper Text Markup Language", cat: "tech" },
  { q: "Which of the following is not a programming language?", options: ["Python", "HTML", "Java", "C++"], correct: "HTML", cat: "tech" },
  { q: "What is the correct way to declare a variable in Python?", options: ["int x = 10;", "var x = 10;", "x = 10", "let x = 10;"], correct: "x = 10", cat: "tech" },
  { q: "Which data structure follows LIFO principle?", options: ["Queue", "Stack", "Linked List", "Tree"], correct: "Stack", cat: "tech" },
  { q: "What is the time complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: "O(log n)", cat: "tech" },
  { q: "Which keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], correct: "def", cat: "tech" },
  { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correct: "Cascading Style Sheets", cat: "tech" },
  { q: "Which of the following is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], correct: "MongoDB", cat: "tech" },
  { q: "What is the full form of SQL?", options: ["Structured Query Language", "Simple Query Language", "System Query Language", "Standard Query Language"], correct: "Structured Query Language", cat: "tech" },
  { q: "Which loop is best when the number of iterations is known?", options: ["while", "do-while", "for", "foreach"], correct: "for", cat: "tech" },
  { q: "What does API stand for?", options: ["Application Programming Interface", "Advanced Programming Interface", "Applied Program Integration", "Automatic Program Interface"], correct: "Application Programming Interface", cat: "tech" },
  { q: "Which protocol is used to send emails?", options: ["HTTP", "FTP", "SMTP", "POP3"], correct: "SMTP", cat: "tech" },
  { q: "What is the default port for HTTP?", options: ["21", "80", "443", "25"], correct: "80", cat: "tech" },
  { q: "Which of the following is a frontend framework?", options: ["Django", "React", "Flask", "Spring"], correct: "React", cat: "tech" },
  { q: "What does RAM stand for?", options: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "Real Access Memory"], correct: "Random Access Memory", cat: "tech" },
  { q: "Which operator is used for exponentiation in Python?", options: ["^", "**", "*", "//"], correct: "**", cat: "tech" },
  { q: "Which is not a valid variable name in most languages?", options: ["my_var", "2var", "_var", "var2"], correct: "2var", cat: "tech" },
  { q: "Which data structure is used for implementing recursion?", options: ["Queue", "Stack", "Array", "Graph"], correct: "Stack", cat: "tech" },
  { q: "What does HTTP stand for?", options: ["Hyper Text Transfer Protocol", "High Transfer Text Protocol", "Hyperlink Text Transfer Protocol", "Hyper Text Transmission Protocol"], correct: "Hyper Text Transfer Protocol", cat: "tech" },
  { q: "Which command is used to initialize a git repository?", options: ["git start", "git init", "git create", "git new"], correct: "git init", cat: "tech" },
  { q: "What does TCP stand for?", options: ["Transmission Control Protocol", "Transfer Control Protocol", "Text Control Protocol", "Transport Communication Protocol"], correct: "Transmission Control Protocol", cat: "tech" },
  { q: "What is Docker primarily used for?", options: ["Version control", "Containerization", "Database management", "UI design"], correct: "Containerization", cat: "tech" },
  { q: "Which sorting algorithm has best average time complexity?", options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"], correct: "Quick Sort", cat: "tech" },
  { q: "What is the purpose of a firewall?", options: ["Speed up internet", "Protect network from unauthorized access", "Store data", "Compress files"], correct: "Protect network from unauthorized access", cat: "tech" },
  { q: "Which language is primarily used for Android development?", options: ["Swift", "Kotlin", "Objective-C", "JavaScript"], correct: "Kotlin", cat: "tech" },
  { q: "What does CI/CD stand for?", options: ["Continuous Integration / Continuous Deployment", "Code Integration / Code Deployment", "Continuous Improvement / Continuous Development", "Code Improvement / Continuous Delivery"], correct: "Continuous Integration / Continuous Deployment", cat: "tech" },
  { q: "Which algorithm finds the shortest path in a weighted graph?", options: ["DFS", "BFS", "Dijkstra’s Algorithm", "Kruskal’s Algorithm"], correct: "Dijkstra’s Algorithm", cat: "tech" },
  { q: "What is the file extension for a Python script?", options: [".java", ".py", ".cpp", ".js"], correct: ".py", cat: "tech" },
  { q: "Which is a popular JavaScript runtime environment?", options: ["Node.js", "Django", "Flask", "Laravel"], correct: "Node.js", cat: "tech" },
  { q: "What does sudo stand for in Linux?", options: ["Super User Do", "System User Do", "Simple User Do", "Secure User Do"], correct: "Super User Do", cat: "tech" },
  { q: "Which data structure uses FIFO principle?", options: ["Stack", "Queue", "Tree", "Graph"], correct: "Queue", cat: "tech" },
  { q: "What does SSL stand for?", options: ["Secure Sockets Layer", "System Sockets Link", "Secure Secure Layer", "Shared Sockets Layer"], correct: "Secure Sockets Layer", cat: "tech" },
  { q: "Which is a NoSQL database that uses documents?", options: ["Redis", "MongoDB", "Cassandra", "Neo4j"], correct: "MongoDB", cat: "tech" },
  { q: "What is the full form of URL?", options: ["Uniform Resource Locator", "Universal Resource Link", "Uniform Resource Link", "Unique Resource Locator"], correct: "Uniform Resource Locator", cat: "tech" },
  { q: "What does MVC stand for in web development?", options: ["Model View Controller", "Multiple View Controller", "Model Visual Control", "Main View Controller"], correct: "Model View Controller", cat: "tech" },
  { q: "Which keyword is used to create an object in Java?", options: ["new", "create", "object", "instance"], correct: "new", cat: "tech" },
  { q: "What does SSH stand for?", options: ["Secure Shell", "Simple Shell", "System Shell", "Secure Socket Host"], correct: "Secure Shell", cat: "tech" },
  { q: "Which data structure is best for a priority queue?", options: ["Array", "Linked List", "Heap", "Stack"], correct: "Heap", cat: "tech" },
  { q: "What does npm stand for?", options: ["Node Package Manager", "New Package Manager", "Node Program Manager", "Network Package Manager"], correct: "Node Package Manager", cat: "tech" },
  { q: "What is the output of typeof null in JavaScript?", options: ["null", "object", "undefined", "boolean"], correct: "object", cat: "tech" },
  { q: "Which algorithm is used for minimum spanning tree?", options: ["Dijkstra", "Prim’s Algorithm", "BFS", "DFS"], correct: "Prim’s Algorithm", cat: "tech" },
  { q: "What is Big Data characterized by?", options: ["3 Vs: Volume, Velocity, Variety", "Only high speed", "Only structured data", "Small datasets"], correct: "3 Vs: Volume, Velocity, Variety", cat: "tech" },
  { q: "Which port is used by SSH?", options: ["80", "22", "443", "21"], correct: "22", cat: "tech" },
  { q: "Which is a relational database management system?", options: ["MongoDB", "MySQL", "Redis", "Cassandra"], correct: "MySQL", cat: "tech" },
  { q: "Which layer of OSI model is responsible for routing?", options: ["Physical", "Data Link", "Network", "Transport"], correct: "Network", cat: "tech" },
  { q: "What is the time complexity of a linked list access?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correct: "O(n)", cat: "tech" },
  { q: "Which sorting algorithm uses divide and conquer?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], correct: "Merge Sort", cat: "tech" },
  { q: "What is the purpose of self in Python class?", options: ["Refers to the current instance", "Creates a new object", "Imports module", "Handles exceptions"], correct: "Refers to the current instance", cat: "tech" },
  { q: "Which command installs a package in Python?", options: ["python install", "pip install", "npm install", "git install"], correct: "pip install", cat: "tech" },
  { q: "What is the purpose of a load balancer?", options: ["Store data", "Distribute traffic across servers", "Encrypt data", "Compress files"], correct: "Distribute traffic across servers", cat: "tech" },
  { q: "Which algorithm finds the shortest path in a weighted graph?", options: ["DFS", "BFS", "Dijkstra’s Algorithm", "Merge Sort"], correct: "Dijkstra’s Algorithm", cat: "tech" },
  { q: "What is the file extension of a Python file?", options: [".py", ".java", ".cpp", ".html"], correct: ".py", cat: "tech" },
  { q: "Which is a functional programming language?", options: ["Java", "Haskell", "C++", "PHP"], correct: "Haskell", cat: "tech" },
  { q: "What does VPN stand for?", options: ["Virtual Private Network", "Very Private Network", "Virtual Public Network", "Verified Private Network"], correct: "Virtual Private Network", cat: "tech" },
  { q: "In Java, what is the parent class of all classes?", options: ["Main", "Object", "Class", "Super"], correct: "Object", cat: "tech" },
  { q: "What does the len() function do in Python?", options: ["Returns length of object", "Converts to lowercase", "Deletes object", "Creates list"], correct: "Returns length of object", cat: "tech" },
  { q: "Which protocol is connectionless?", options: ["TCP", "UDP", "HTTP", "FTP"], correct: "UDP", cat: "tech" },
  { q: "What is polymorphism in OOP?", options: ["Ability of object to take many forms", "Hiding data", "Reusing code", "Creating objects"], correct: "Ability of object to take many forms", cat: "tech" },
  { q: "What is the time complexity of Quick Sort in average case?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correct: "O(n log n)", cat: "tech" },
  { q: "What does git clone command do?", options: ["Creates a new repository", "Copies a remote repository to local", "Commits changes", "Pushes code to remote"], correct: "Copies a remote repository to local", cat: "tech" },
  { q: "What is the purpose of a constructor?", options: ["Destroy object", "Initialize object", "Inherit class", "Override method"], correct: "Initialize object", cat: "tech" },
  { q: "Which is used to make HTTP requests in JavaScript?", options: ["fetch()", "request()", "http()", "ajax()"], correct: "fetch()", cat: "tech" },
  { q: "Which sorting algorithm is stable?", options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"], correct: "Merge Sort", cat: "tech" },
  { q: "What is the default value of a boolean in Java?", options: ["true", "false", "0", "null"], correct: "false", cat: "tech" },
  { q: "What does pip stand for in Python?", options: ["Python Install Package", "Pip Installs Packages", "Python Integrated Package", "Package Install Program"], correct: "Pip Installs Packages", cat: "tech" },
  { q: "Which is not a primitive data type in Java?", options: ["int", "boolean", "String", "char"], correct: "String", cat: "tech" },
  { q: "What is the use of finally block?", options: ["Execute code whether exception occurs or not", "Catch the exception", "Throw exception", "Define exception"], correct: "Execute code whether exception occurs or not", cat: "tech" },
  { q: "Which command checks current directory in Linux?", options: ["ls", "pwd", "cd", "mkdir"], correct: "pwd", cat: "tech" },
  { q: "Which is a strongly typed language?", options: ["Python", "JavaScript", "TypeScript", "Ruby"], correct: "TypeScript", cat: "tech" },
  { q: "What is the time complexity of Bubble Sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"], correct: "O(n²)", cat: "tech" },
  { q: "What does SSH stand for?", options: ["Secure Shell", "Simple Shell", "System Shell", "Secure Socket Host"], correct: "Secure Shell", cat: "tech" },
  { q: "What is the purpose of virtual keyword in C++?", options: ["For virtual memory", "For polymorphism", "For abstract class", "For friend function"], correct: "For polymorphism", cat: "tech" },
  { q: "Which is used for server-side scripting?", options: ["HTML", "CSS", "PHP", "Bootstrap"], correct: "PHP", cat: "tech" },
  { q: "What is the output of typeof null in JavaScript?", options: ["null", "object", "undefined", "boolean"], correct: "object", cat: "tech" },
  { q: "What does OSI stand for in networking?", options: ["Open System Interconnection", "Operating System Interface", "Open Software Interface", "Operational System Interconnection"], correct: "Open System Interconnection", cat: "tech" },
  { q: "Which is not a JavaScript framework?", options: ["React", "Angular", "Vue", "Django"], correct: "Django", cat: "tech" },
  { q: "Which algorithm is used for minimum spanning tree?", options: ["Dijkstra", "Prim’s Algorithm", "BFS", "DFS"], correct: "Prim’s Algorithm", cat: "tech" },
  { q: "What does append() method do in Python list?", options: ["Adds element at the end", "Removes element", "Sorts the list", "Reverses the list"], correct: "Adds element at the end", cat: "tech" },
  { q: "What is the correct way to handle promises in JS?", options: [".then() and .catch()", "try-catch only", "async only", "await only"], correct: ".then() and .catch()", cat: "tech" },
  { q: "Which is a DevOps practice?", options: ["Infrastructure as Code", "Waterfall model", "Manual deployment", "Big bang integration"], correct: "Infrastructure as Code", cat: "tech" },
  { q: "What does const keyword do in JavaScript?", options: ["Declares a constant variable", "Declares a mutable variable", "Creates a class", "Defines a function"], correct: "Declares a constant variable", cat: "tech" },

  // --- ENTERTAINMENT & POP CULTURE (Massive Expansion) ---
  { q: "Who played Jack Dawson in the movie Titanic?", options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Johnny Depp"], correct: "Leonardo DiCaprio", cat: "pop" },
  { q: "Which movie features the quote 'I'm the king of the world!'?", options: ["The Lion King", "Titanic", "Avatar", "Jurassic Park"], correct: "Titanic", cat: "pop" },
  { q: "Who is known as the 'King of Pop'?", options: ["Elvis Presley", "Michael Jackson", "Prince", "Justin Timberlake"], correct: "Michael Jackson", cat: "pop" },
  { q: "In Disney's movie, which character is the lion prince?", options: ["The Jungle Book", "The Lion King", "Aladdin", "Beauty and the Beast"], correct: "The Lion King", cat: "pop" },
  { q: "What is the name of Thor's hammer in the MCU?", options: ["Stormbreaker", "Mjölnir", "Excalibur", "Aegis"], correct: "Mjölnir", cat: "pop" },
  { q: "Which pop star released the song 'Rolling in the Deep'?", options: ["Taylor Swift", "Adele", "Beyoncé", "Rihanna"], correct: "Adele", cat: "pop" },
  { q: "Who voiced the character of Shrek?", options: ["Eddie Murphy", "Mike Myers", "Chris Rock", "Will Smith"], correct: "Mike Myers", cat: "pop" },
  { q: "Which movie won the Academy Award for Best Picture in 2020?", options: ["Joker", "Parasite", "1917", "Once Upon a Time in Hollywood"], correct: "Parasite", cat: "pop" },
  { q: "Who is the villain in The Little Mermaid?", options: ["Maleficent", "Ursula", "Cruella", "Scar"], correct: "Ursula", cat: "pop" },
  { q: "Which Disney princess has a pet tiger named Rajah?", options: ["Ariel", "Jasmine", "Belle", "Mulan"], correct: "Jasmine", cat: "pop" },
  { q: "Who sang the global hit 'Blinding Lights'?", options: ["Drake", "The Weeknd", "Post Malone", "Ed Sheeran"], correct: "The Weeknd", cat: "pop" },
  { q: "In which James Bond movie does the spy go to outer space?", options: ["Goldfinger", "Moonraker", "Skyfall", "Casino Royale"], correct: "Moonraker", cat: "pop" },
  { q: "What animal is Dumbo?", options: ["Mouse", "Elephant", "Lion", "Rabbit"], correct: "Elephant", cat: "pop" },
  { q: "Which artist is nicknamed the 'Queen of Pop'?", options: ["Madonna", "Whitney Houston", "Britney Spears", "Lady Gaga"], correct: "Madonna", cat: "pop" },
  { q: "Which movie features the song 'Let It Go'?", options: ["Moana", "Frozen", "Tangled", "Encanto"], correct: "Frozen", cat: "pop" },
  { q: "Which superhero is the TV show Smallville based on?", options: ["Batman", "Superman", "Spider-Man", "Iron Man"], correct: "Superman", cat: "pop" },
  { q: "How many seasons of the TV show Friends were there?", options: ["8", "10", "12", "14"], correct: "10", cat: "pop" },
  { q: "What is the name of Ross's pet monkey in Friends?", options: ["Joey", "Marcel", "Chandler", "Gunther"], correct: "Marcel", cat: "pop" },
  { q: "Which movie features code made from sushi recipes?", options: ["The Matrix", "Inception", "The Da Vinci Code", "Ready Player One"], correct: "The Matrix", cat: "pop" },
  { q: "Who directed The Godfather?", options: ["Martin Scorsese", "Francis Ford Coppola", "Steven Spielberg", "Quentin Tarantino"], correct: "Francis Ford Coppola", cat: "pop" },
  { q: "Which country singer recorded 'Friends in Low Places'?", options: ["Garth Brooks", "Dolly Parton", "Taylor Swift", "Johnny Cash"], correct: "Garth Brooks", cat: "pop" },
  { q: "What is the name of the cowboy in Toy Story?", options: ["Buzz Lightyear", "Woody", "Mr. Potato Head", "Rex"], correct: "Woody", cat: "pop" },
  { q: "Thor is the prince of which realm?", options: ["Midgard", "Asgard", "Wakanda", "Atlantis"], correct: "Asgard", cat: "pop" },
  { q: "What is the original spelling of the Hollywood sign?", options: ["Hollywood", "Hollywoodland", "Holly Wood", "Hills of Hollywood"], correct: "Hollywoodland", cat: "pop" },
  { q: "Which movie features the song 'I Will Always Love You'?", options: ["The Bodyguard", "Pretty Woman", "Ghost", "Dirty Dancing"], correct: "The Bodyguard", cat: "pop" },
  { q: "Rose, Dorothy, Blanche, and Sophia are from which show?", options: ["The Golden Girls", "Sex and the City", "Desperate Housewives", "Friends"], correct: "The Golden Girls", cat: "pop" },
  { q: "Who directed Kill Bill?", options: ["Quentin Tarantino", "Martin Scorsese", "Christopher Nolan", "James Cameron"], correct: "Quentin Tarantino", cat: "pop" },
  { q: "Where was The Lord of the Rings trilogy primarily filmed?", options: ["Ireland", "New Zealand", "Scotland", "Canada"], correct: "New Zealand", cat: "pop" },
  { q: "Who played J. Robert Oppenheimer in the 2023 film?", options: ["Cillian Murphy", "Matt Damon", "Robert Downey Jr.", "Tom Hardy"], correct: "Cillian Murphy", cat: "pop" },
  { q: "What is the name of the school in Harry Potter?", options: ["Beauxbatons", "Hogwarts", "Durmstrang", "Ilvermorny"], correct: "Hogwarts", cat: "pop" },
  { q: "Which band was formerly known as The New Yardbirds?", options: ["Pink Floyd", "Led Zeppelin", "The Who", "Deep Purple"], correct: "Led Zeppelin", cat: "pop" },
  { q: "What is the first movie Ranveer Singh starred in?", options: ["Band Baaja Baaraat", "Ram-Leela", "Padmaavat", "Cirkus"], correct: "Band Baaja Baaraat", cat: "pop" },
  { q: "Who directed the movie Oppenheimer?", options: ["Christopher Nolan", "Denis Villeneuve", "Greta Gerwig", "Jordan Peele"], correct: "Christopher Nolan", cat: "pop" },
  { q: "Which TV show features characters Mulder and Scully?", options: ["The X-Files", "Stranger Things", "The Twilight Zone", "Lost"], correct: "The X-Files", cat: "pop" },
  { q: "What is the name of the first Indian feature film?", options: ["Raja Harishchandra", "Alam Ara", "Mother India", "Sholay"], correct: "Raja Harishchandra", cat: "pop" },
  { q: "What is the longest-running animated sitcom?", options: ["The Simpsons", "Family Guy", "South Park", "American Dad"], correct: "The Simpsons", cat: "pop" },
  { q: "In which movie is 'Double tap' a zombie rule?", options: ["Zombieland", "Shaun of the Dead", "World War Z", "Train to Busan"], correct: "Zombieland", cat: "pop" },
  { q: "Who played the lead in the movie La La Land?", options: ["Ryan Gosling and Emma Stone", "Tom Hanks and Meg Ryan", "Bradley Cooper and Lady Gaga", "Leo and Kate"], correct: "Ryan Gosling and Emma Stone", cat: "pop" },
  { q: "Which social media platform is known for viral dance challenges?", options: ["Instagram", "TikTok", "YouTube", "Snapchat"], correct: "TikTok", cat: "pop" },
  { q: "Who is the director of Inception?", options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Ridley Scott"], correct: "Christopher Nolan", cat: "pop" },
  { q: "Which music group had the song 'Bye Bye Bye'?", options: ["NSYNC", "Backstreet Boys", "98 Degrees", "Boyz II Men"], correct: "NSYNC", cat: "pop" },
  { q: "What is the name of the first Star Wars movie?", options: ["A New Hope", "The Phantom Menace", "Revenge of the Sith", "The Force Awakens"], correct: "A New Hope", cat: "pop" },
  { q: "Which TV show has Rachel, Ross, Monica, and Chandler?", options: ["Friends", "How I Met Your Mother", "The Big Bang Theory", "Seinfeld"], correct: "Friends", cat: "pop" },

  // --- SCIENCE & EDUCATION (Massive Expansion) ---
  { q: "What is the SI unit of electric current?", options: ["Volt", "Watt", "Ampere", "Ohm"], correct: "Ampere", cat: "science" },
  { q: "Which of the following is a primary color of light?", options: ["Yellow", "Red", "Green", "Blue"], correct: "Red", cat: "science" },
  { q: "What is the hardest known natural mineral?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: "Diamond", cat: "science" },
  { q: "Which planet is known as the 'Morning Star'?", options: ["Mars", "Jupiter", "Venus", "Mercury"], correct: "Venus", cat: "science" },
  { q: "What is the process by which plants make food using sunlight?", options: ["Respiration", "Transpiration", "Photosynthesis", "Fermentation"], correct: "Photosynthesis", cat: "science" },
  { q: "What is the boiling point of water at standard atmospheric pressure?", options: ["90°C", "100°C", "110°C", "120°C"], correct: "100°C", cat: "science" },
  { q: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Argon", "Nitrogen"], correct: "Nitrogen", cat: "science" },
  { q: "What is the unit of force?", options: ["Joule", "Newton", "Pascal", "Watt"], correct: "Newton", cat: "science" },
  { q: "Which of these is a mammal?", options: ["Penguin", "Crocodile", "Dolphin", "Snake"], correct: "Dolphin", cat: "science" },
  { q: "What is the pH of pure water?", options: ["0", "7", "14", "10"], correct: "7", cat: "science" },
  { q: "Which organ pumps blood throughout the human body?", options: ["Lungs", "Brain", "Heart", "Liver"], correct: "Heart", cat: "science" },
  { q: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: "Au", cat: "science" },
  { q: "Which of these is a renewable energy source?", options: ["Coal", "Natural Gas", "Solar", "Petroleum"], correct: "Solar", cat: "science" },
  { q: "What is the study of heredity called?", options: ["Biology", "Genetics", "Ecology", "Zoology"], correct: "Genetics", cat: "science" },
  { q: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: "2", cat: "science" },
  { q: "Which scientist is known for the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], correct: "Albert Einstein", cat: "science" },
  { q: "What is the main component of the Sun?", options: ["Oxygen", "Carbon", "Hydrogen", "Iron"], correct: "Hydrogen", cat: "science" },
  { q: "Which bone protects the brain?", options: ["Ribcage", "Spine", "Skull", "Pelvis"], correct: "Skull", cat: "science" },
  { q: "What is the chemical formula for water?", options: ["O₂", "CO₂", "H₂O", "NaCl"], correct: "H₂O", cat: "science" },
  { q: "Which of these is a conductor of electricity?", options: ["Rubber", "Wood", "Copper", "Plastic"], correct: "Copper", cat: "science" },
  { q: "What is the longest bone in the human body?", options: ["Femur", "Tibia", "Humerus", "Radius"], correct: "Femur", cat: "science" },
  { q: "Which planet is largest in our solar system?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], correct: "Jupiter", cat: "science" },
  { q: "Which vitamin is produced by the human body when exposed to sunlight?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], correct: "Vitamin D", cat: "science" },
  { q: "What is the speed of light approximately?", options: ["300,000 km/s", "300,000 m/s", "3,000 km/s", "30,000 km/s"], correct: "300,000 km/s", cat: "science" },
  { q: "Which organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"], correct: "Mitochondrion", cat: "science" },
  { q: "What does DNA stand for?", options: ["Deoxyribonucleic acid", "Deoxyribonuclear acid", "Ribonucleic acid", "Dinucleic acid"], correct: "Deoxyribonucleic acid", cat: "science" },
  { q: "Which scientist discovered penicillin?", options: ["Louis Pasteur", "Alexander Fleming", "Robert Koch", "Edward Jenner"], correct: "Alexander Fleming", cat: "science" },
  { q: "What is the smallest unit of life?", options: ["Atom", "Molecule", "Cell", "Tissue"], correct: "Cell", cat: "science" },
  { q: "Which planet is known as the 'Red Planet'?", options: ["Venus", "Jupiter", "Mars", "Mercury"], correct: "Mars", cat: "science" },
  { q: "What is the unit of frequency?", options: ["Hertz", "Meter", "Second", "Joule"], correct: "Hertz", cat: "science" },
  { q: "What is the boiling point of water in Kelvin?", options: ["100 K", "273 K", "373 K", "473 K"], correct: "373 K", cat: "science" },
  { q: "What is the chemical symbol for sodium?", options: ["So", "Na", "Sd", "N"], correct: "Na", cat: "science" },
  { q: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Lungs"], correct: "Skin", cat: "science" },
  { q: "Which disease is caused by a virus?", options: ["Tuberculosis", "Cholera", "Influenza", "Malaria"], correct: "Influenza", cat: "science" },
  { q: "What is the chemical formula for table salt?", options: ["KCl", "NaCl", "CaCl₂", "Na₂O"], correct: "NaCl", cat: "science" },
  { q: "Which blood type is known as the universal donor?", options: ["A", "B", "AB", "O"], correct: "O", cat: "science" },
  { q: "Which part of the brain controls balance?", options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], correct: "Cerebellum", cat: "science" },
  { q: "What is the chemical symbol for silver?", options: ["Si", "Sv", "Ag", "Au"], correct: "Ag", cat: "science" },
  { q: "What is the SI unit of pressure?", options: ["Newton", "Joule", "Pascal", "Watt"], correct: "Pascal", cat: "science" },
  { q: "What is the process by which water vapor becomes liquid?", options: ["Evaporation", "Condensation", "Sublimation", "Precipitation"], correct: "Condensation", cat: "science" },
  { q: "Which of these is a non-metallic element?", options: ["Iron", "Copper", "Sulfur", "Aluminum"], correct: "Sulfur", cat: "science" },
  { q: "What is the function of the ozone layer?", options: ["Traps heat", "Blocks UV radiation", "Produces oxygen", "Prevents rain"], correct: "Blocks UV radiation", cat: "science" },
  { q: "Which of these is an omnivore?", options: ["Lion", "Cow", "Bear", "Deer"], correct: "Bear", cat: "science" },
  { q: "What is the result of an acid-base neutralization?", options: ["Acid", "Base", "Salt and Water", "Gas"], correct: "Salt and Water", cat: "science" },
  { q: "Which part of the brain controls breathing and heart rate?", options: ["Cerebrum", "Cerebellum", "Medulla Oblongata", "Hypothalamus"], correct: "Medulla Oblongata", cat: "science" },
  { q: "Which of these is an igneous rock?", options: ["Limestone", "Sandstone", "Granite", "Marble"], correct: "Granite", cat: "science" },
  { q: "What is the main function of red blood cells?", options: ["Fight infection", "Carry oxygen", "Clot blood", "Produce hormones"], correct: "Carry oxygen", cat: "science" },
  { q: "Which planet has the most prominent rings?", options: ["Jupiter", "Mars", "Saturn", "Neptune"], correct: "Saturn", cat: "science" },
  { q: "What is the study of weather called?", options: ["Climatology", "Geology", "Meteorology", "Astronomy"], correct: "Meteorology", cat: "science" },
  { q: "Which gas is released during photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correct: "Oxygen", cat: "science" },
  { q: "What is the smallest bone in the human body?", options: ["Femur", "Tibia", "Stapes", "Humerus"], correct: "Stapes", cat: "science" },
  { q: "Which of these is a metal?", options: ["Carbon", "Silicon", "Aluminum", "Sulfur"], correct: "Aluminum", cat: "science" },
  { q: "What is the function of the nervous system?", options: ["Transport blood", "Digest food", "Transmit signals", "Produce hormones"], correct: "Transmit signals", cat: "science" },
  { q: "Which planet is known for its Great Red Spot?", options: ["Saturn", "Uranus", "Neptune", "Jupiter"], correct: "Jupiter", cat: "science" },
  { q: "What is the chemical formula for ammonia?", options: ["NH₂", "NH₃", "NO₃", "N₂H"], correct: "NH₃", cat: "science" },
  { q: "What type of lens corrects nearsightedness?", options: ["Convex", "Concave", "Cylindrical", "Bifocal"], correct: "Concave", cat: "science" },
  { q: "What is the study of insects called?", options: ["Zoology", "Entomology", "Ecology", "Botany"], correct: "Entomology", cat: "science" },
  { q: "Which of these is a fossil fuel?", options: ["Solar", "Wind", "Coal", "Geothermal"], correct: "Coal", cat: "science" },
  { q: "What is the main component of natural gas?", options: ["Ethane", "Propane", "Methane", "Butane"], correct: "Methane", cat: "science" },
  { q: "Which organ filters waste from the blood?", options: ["Heart", "Liver", "Kidney", "Spleen"], correct: "Kidney", cat: "science" },
  { q: "What is the formula for speed?", options: ["D*T", "D/T", "T/D", "M*A"], correct: "D/T", cat: "science" },
  { q: "What is the most abundant element in the universe?", options: ["Oxygen", "Carbon", "Hydrogen", "Helium"], correct: "Hydrogen", cat: "science" },
  { q: "Which scientist proposed the laws of motion?", options: ["Albert Einstein", "Isaac Newton", "Galileo", "Maxwell"], correct: "Isaac Newton", cat: "science" },
  { q: "What is the function of the pancreas?", options: ["Produce bile", "Produce insulin", "Store urine", "Filter blood"], correct: "Produce insulin", cat: "science" },
  { q: "What is the chemical symbol for iron?", options: ["Ir", "Fe", "In", "I"], correct: "Fe", cat: "science" },

  // --- BUSINESS & FINANCE (Massive Expansion) ---
  { q: "What does GDP stand for?", options: ["Gross Domestic Product", "General Domestic Production", "Gross Development Product", "Global Domestic Profit"], correct: "Gross Domestic Product", cat: "biz" },
  { q: "What is money borrowed that must be repaid with interest?", options: ["Asset", "Equity", "Loan", "Dividend"], correct: "Loan", cat: "biz" },
  { q: "What is a bull market characterized by?", options: ["Falling prices", "Rising prices", "Stable prices", "Low volume"], correct: "Rising prices", cat: "biz" },
  { q: "Which statement shows a company's revenues and expenses?", options: ["Balance sheet", "Cash flow statement", "Income statement", "Equity statement"], correct: "Income statement", cat: "biz" },
  { q: "What does ROI stand for?", options: ["Return on Investment", "Rate of Interest", "Risk of Insolvency", "Revenue on Income"], correct: "Return on Investment", cat: "biz" },
  { q: "What is a general increase in prices called?", options: ["Deflation", "Purchasing power", "Inflation", "Money supply decrease"], correct: "Inflation", cat: "biz" },
  { q: "What is an ownership share in a company called?", options: ["Bond", "Stock", "Loan", "Security"], correct: "Stock", cat: "biz" },
  { q: "What is the difference between assets and liabilities?", options: ["Revenue", "Profit", "Net worth", "Equity"], correct: "Equity", cat: "biz" },
  { q: "What does IPO stand for?", options: ["Initial Public Offering", "International Organization", "Internal Profit Option", "Private Offering"], correct: "Initial Public Offering", cat: "biz" },
  { q: "What is spreading investments across various assets called?", options: ["Hedging", "Diversification", "Arbitrage", "Leverage"], correct: "Diversification", cat: "biz" },
  { q: "What is a bear market characterized by?", options: ["Rising prices", "Falling prices", "High volatility", "Low interest rates"], correct: "Falling prices", cat: "biz" },
  { q: "What does APR stand for?", options: ["Annual Percentage Rate", "Annual Profit Ratio", "Adjusted Payment Rate", "Average Principal Return"], correct: "Annual Percentage Rate", cat: "biz" },
  { q: "What is the Fed primarily responsible for?", options: ["Setting taxes", "Monetary policy", "Issuing corporate bonds", "Regulating stock exchanges"], correct: "Monetary policy", cat: "biz" },
  { q: "What is a portion of company profits paid to shareholders?", options: ["Fee", "Dividend", "Interest", "Tax"], correct: "Dividend", cat: "biz" },
  { q: "What is how quickly an asset can be converted to cash?", options: ["Solvency", "Liquidity", "Volatility", "Profitability"], correct: "Liquidity", cat: "biz" },
  { q: "What is a 401(k)?", options: ["A type of bond", "A retirement savings plan", "A stock exchange", "A tax form"], correct: "A retirement savings plan", cat: "biz" },
  { q: "What is a number indicating a person's creditworthiness?", options: ["ID number", "Credit score", "Market index", "Interest rate"], correct: "Credit score", cat: "biz" },
  { q: "What is a loan to a government or corporation called?", options: ["Stock", "Bond", "Mutual fund", "Derivative"], correct: "Bond", cat: "biz" },
  { q: "What is interest on both principal and accumulated interest?", options: ["Simple interest", "Compound interest", "Annual interest", "Fixed interest"], correct: "Compound interest", cat: "biz" },
  { q: "What is a single company dominating a market called?", options: ["Oligopoly", "Monopoly", "Partnership", "Corporation"], correct: "Monopoly", cat: "biz" },
  { q: "What is a snapshot of assets, liabilities, and equity?", options: ["Income statement", "Balance sheet", "Cash flow summary", "Tax record"], correct: "Balance sheet", cat: "biz" },
  { q: "What is the S&P 500?", options: ["Index of 500 large US companies", "A tax form", "A type of bond", "A federal agency"], correct: "Index of 500 large US companies", cat: "biz" },
  { q: "What is a period of declining economic activity called?", options: ["Expansion", "Recession", "Inflation", "Boom"], correct: "Recession", cat: "biz" },
  { q: "What is a tax on imports called?", options: ["Tariff", "Subsidy", "Quota", "Excise"], correct: "Tariff", cat: "biz" },
  { q: "What is a loan used specifically to purchase real estate?", options: ["Auto loan", "Mortgage", "Personal loan", "Payday loan"], correct: "Mortgage", cat: "biz" },
  { q: "What is two companies combining into one new entity?", options: ["Acquisition", "Merger", "Split", "IPO"], correct: "Merger", cat: "biz" },
  { q: "What is one company purchasing another?", options: ["Merger", "Acquisition", "Joint venture", "Franchise"], correct: "Acquisition", cat: "biz" },
  { q: "What is an officially defined bear market drop?", options: ["10% decline", "20% decline", "30% decline", "50% decline"], correct: "20% decline", cat: "biz" },
  { q: "What are stocks of large, stable, and profitable companies?", options: ["Penny stocks", "Blue-chip stocks", "Growth stocks", "Speculative stocks"], correct: "Blue-chip stocks", cat: "biz" },
  { q: "What is the profit from selling an asset for more than its cost?", options: ["Revenue", "Capital gain", "Dividend", "Interest"], correct: "Capital gain", cat: "biz" },
  { q: "What does ETF stand for?", options: ["Exchange Traded Fund", "Electronic Transfer Fund", "Equity Trust Fund", "External Trading Facility"], correct: "Exchange Traded Fund", cat: "biz" },
  { q: "What is selling borrowed stock expecting a price drop?", options: ["Long position", "Short selling", "Hedging", "Day trading"], correct: "Short selling", cat: "biz" },
  { q: "Which exchange is primarily focused on technology companies?", options: ["NYSE", "NASDAQ", "LSE", "JPX"], correct: "NASDAQ", cat: "biz" },
  { q: "What is the total market value of a company's shares?", options: ["Market capitalization", "Total revenue", "Net profit", "Total debt"], correct: "Market capitalization", cat: "biz" },
  { q: "What is an order to sell if price drops to a specific level?", options: ["Market order", "Stop-loss order", "Limit order", "Margin call"], correct: "Stop-loss order", cat: "biz" },
  { q: "What is an ETF?", options: ["Exchange Traded Fund", "Electronic Transfer Fund", "Equity Trust Fund", "External Trading Facility"], correct: "Exchange Traded Fund", cat: "biz" },
  { q: "What is a derivative contract whose value follows an underlying asset?", options: ["Primary security", "Derivative", "Government bond", "Savings account"], correct: "Derivative", cat: "biz" },
  { q: "What is selling borrowed stock expecting its price to fall?", options: ["Long position", "Short selling", "Hedging", "Day trading"], correct: "Short selling", cat: "biz" },
  { q: "What is the profit from selling an asset for more than its cost?", options: ["Revenue", "Capital gain", "Dividend", "Interest"], correct: "Capital gain", cat: "biz" },
  { q: "What is a financial product providing regular income over time?", options: ["Stock", "Annuity", "Loan", "Tax form"], correct: "Annuity", cat: "biz" },
  { q: "What is the FDIC?", options: ["Federal Deposit Insurance Corporation", "Federal Debt Investigation", "Financial Data Center", "Foreign Direct Investment"], correct: "Federal Deposit Insurance Corporation", cat: "biz" },
  { q: "What is a deposit account earning interest with low risk?", options: ["Investment account", "Savings account", "Retirement plan", "Stock account"], correct: "Savings account", cat: "biz" },
  { q: "What is a time deposit with fixed interest and fixed maturity?", options: ["Stock certificate", "Certificate of Deposit (CD)", "Bond", "Mutual fund"], correct: "Certificate of Deposit (CD)", cat: "biz" },
  { q: "What is a fund that tracks a specific market index?", options: ["Actively managed fund", "Index fund", "Hedge fund", "Private equity fund"], correct: "Index fund", cat: "biz" },
  { q: "What is the degree to which an asset's price fluctuates?", options: ["Rate of return", "Volatility", "Dividend yield", "Interest rate"], correct: "Volatility", cat: "biz" },
  { q: "What is an order to buy/sell at the current available price?", options: ["Market order", "Limit order", "Stop-loss", "Margin call"], correct: "Market order", cat: "biz" },
  { q: "What is a strategy used by investors to profit from falling prices?", options: ["Bear spread", "Bull spread", "Long call", "Buy and hold"], correct: "Bear spread", cat: "biz" },
  { q: "What is central bank buying securities to increase money supply?", options: ["Quantitative Easing", "Interest rate hike", "Fiscal stimulus", "Tax increase"], correct: "Quantitative Easing", cat: "biz" },
  { q: "What is a bond issued by state or local governments?", options: ["Corporate bond", "Municipal bond", "Treasury bond", "Foreign bond"], correct: "Municipal bond", cat: "biz" },
  { q: "What is a low-quality, high-risk bond called?", options: ["Investment-grade", "Junk bond", "Treasury", "Blue-chip"], correct: "Junk bond", cat: "biz" },
  { q: "What is an assessment of an entity's creditworthiness?", options: ["Stock price", "Credit rating", "Dividend rate", "Interest rate"], correct: "Credit rating", cat: "biz" },
  { q: "What is an account used to buy and sell securities?", options: ["Savings account", "Brokerage account", "Checking account", "Fixed deposit"], correct: "Brokerage account", cat: "biz" },
  { q: "What is a retirement account using after-tax contributions?", options: ["Traditional IRA", "Roth IRA", "401(k)", "Pension"], correct: "Roth IRA", cat: "biz" },
  { q: "What is a tax-advantaged education savings plan?", options: ["401(k)", "529 plan", "HSA", "IRA"], correct: "529 plan", cat: "biz" },
  { q: "What is an account for tax-advantaged medical expenses?", options: ["Retirement account", "HSA (Health Savings Account)", "Savings account", "Brokerage"], correct: "HSA (Health Savings Account)", cat: "biz" },
  { q: "What is a company repurchasing its own shares from the market?", options: ["Issuance", "Buyback", "Split", "Merger"], correct: "Buyback", cat: "biz" },
  { q: "What is the P/E ratio?", options: ["Price to Earnings", "Profit to Equity", "Price to Equity", "Profit to Earnings"], correct: "Price to Earnings", cat: "biz" },
  { q: "What is net profit divided by outstanding shares?", options: ["Revenue per share", "Earnings Per Share (EPS)", "Price per share", "Book value"], correct: "Earnings Per Share (EPS)", cat: "biz" },
  { q: "What is a stock that performs well regardless of the economy?", options: ["Cyclical stock", "Defensive stock", "Growth stock", "Speculative stock"], correct: "Defensive stock", cat: "biz" },
  { q: "What is the unique abbreviation for a publicly traded company?", options: ["Ticker symbol", "Stock price", "ISIN", "CUSIP"], correct: "Ticker symbol", cat: "biz" },
  { q: "What is a temporary recovery during a market decline?", options: ["Bull trap", "Dead Cat Bounce", "Market peak", "Short squeeze"], correct: "Dead Cat Bounce", cat: "biz" },
  // --- SPORTS & FITNESS (Massive Expansion) ---
  { q: "Which sport is known as the 'king of sports'?", options: ["Tennis", "Cricket", "Football (Soccer)", "Basketball"], correct: "Football (Soccer)", cat: "sports" },
  { q: "How many players are on a standard football team on the field?", options: ["9", "10", "11", "12"], correct: "11", cat: "sports" },
  { q: "Which country won the first FIFA World Cup in 1930?", options: ["Italy", "Uruguay", "Brazil", "Germany"], correct: "Uruguay", cat: "sports" },
  { q: "Which sport uses a shuttlecock?", options: ["Tennis", "Badminton", "Squash", "Table Tennis"], correct: "Badminton", cat: "sports" },
  { q: "How many players are in a standard cricket team?", options: ["9", "10", "11", "12"], correct: "11", cat: "sports" },
  { q: "Which cricketer is known as 'The Wall'?", options: ["Sachin Tendulkar", "Virat Kohli", "Rahul Dravid", "MS Dhoni"], correct: "Rahul Dravid", cat: "sports" },
  { q: "Which country invented cricket?", options: ["India", "Australia", "England", "South Africa"], correct: "England", cat: "sports" },
  { q: "In which sport is the term 'fault' used for a serve outside the box?", options: ["Badminton", "Tennis", "Volleyball", "Squash"], correct: "Tennis", cat: "sports" },
  { q: "Which country has won the most Olympic gold medals in total?", options: ["Russia", "Japan", "United States", "China"], correct: "United States", cat: "sports" },
  { q: "Which sport is played on a rectangular field called a pitch?", options: ["Basketball", "Hockey", "Volleyball", "Baseball"], correct: "Hockey", cat: "sports" },
  { q: "How many overs are in a One Day International (ODI) cricket match?", options: ["20", "50", "90", "100"], correct: "50", cat: "sports" },
  { q: "In basketball, how many points is a regular field goal worth?", options: ["1", "2", "3", "4"], correct: "2", cat: "sports" },
  { q: "In which sport is the Stanley Cup awarded?", options: ["Football", "Ice Hockey", "Basketball", "Baseball"], correct: "Ice Hockey", cat: "sports" },
  { q: "Which country first introduced the Olympic Games?", options: ["Greece", "Rome", "Egypt", "China"], correct: "Greece", cat: "sports" },
  { q: "How many players are in a standard volleyball team on court?", options: ["5", "6", "7", "8"], correct: "6", cat: "sports" },
  { q: "Which country's cricket team is known as 'The Proteas'?", options: ["India", "England", "South Africa", "Australia"], correct: "South Africa", cat: "sports" },
  { q: "In which sport are 'love', 'deuce', and 'match point' used?", options: ["Badminton", "Tennis", "Table Tennis", "Squash"], correct: "Tennis", cat: "sports" },
  { q: "Which country hosted the 2024 Summer Olympics?", options: ["Tokyo", "Beijing", "Paris", "Los Angeles"], correct: "Paris", cat: "sports" },
  { q: "Which country won the 2022 FIFA World Cup?", options: ["France", "Brazil", "Argentina", "Portugal"], correct: "Argentina", cat: "sports" },
  { q: "Which sport is played on a court with a 2.43m net for men?", options: ["Basketball", "Volleyball", "Tennis", "Badminton"], correct: "Volleyball", cat: "sports" },
  { q: "Which sport is known as the 'gentleman's game'?", options: ["Football", "Tennis", "Cricket", "Golf"], correct: "Cricket", cat: "sports" },
  { q: "In which sport is the 'free throw line' used?", options: ["Football", "Basketball", "Hockey", "Volleyball"], correct: "Basketball", cat: "sports" },
  { q: "Which of these is not a type of swimming stroke?", options: ["Butterfly", "Breaststroke", "Front crawl", "Backstab"], correct: "Backstab", cat: "sports" },
  { q: "Which trophy is awarded to the winner of the IPL?", options: ["Grey Cup", "IPL Trophy", "Ranji Trophy", "Stanley Cup"], correct: "IPL Trophy", cat: "sports" },
  { q: "In which sport is a 'faceoff' used at the start?", options: ["Hockey", "Tennis", "Baseball", "Badminton"], correct: "Hockey", cat: "sports" },
  { q: "Which country has won the most ICC Cricket World Cups?", options: ["India", "Australia", "South Africa", "Pakistan"], correct: "Australia", cat: "sports" },
  { q: "Which sport uses a 'puck' instead of a ball?", options: ["Football", "Ice hockey", "Baseball", "Tennis"], correct: "Ice hockey", cat: "sports" },
  { q: "Which activity improves cardiovascular endurance?", options: ["Weightlifting", "Running", "Static stretching", "Yoga"], correct: "Running", cat: "sports" },
  { q: "In which sport is the term 'LBW' used?", options: ["Tennis", "Football", "Cricket", "Badminton"], correct: "Cricket", cat: "sports" },
  { q: "Which country's cricket team is called 'The Black Caps'?", options: ["England", "New Zealand", "South Africa", "Australia"], correct: "New Zealand", cat: "sports" },
  { q: "Which country's football team is known as 'La Albiceleste'?", options: ["Brazil", "Argentina", "France", "Chile"], correct: "Argentina", cat: "sports" },
  { q: "In which sport is a 'handicap' system used to balance players?", options: ["Football", "Tennis", "Golf", "Badminton"], correct: "Golf", cat: "sports" },
  { q: "Which country hosted the first modern Olympics in 1896?", options: ["France", "Greece", "Italy", "Germany"], correct: "Greece", cat: "sports" },
  { q: "In which sport are 'offside' and 'corner kick' used?", options: ["Basketball", "Football", "Volleyball", "Table Tennis"], correct: "Football", cat: "sports" },
  { q: "Which sport uses a 'dribble' to move the ball?", options: ["Football", "Basketball", "Hockey", "All of these"], correct: "All of these", cat: "sports" },
  { q: "Which country's cricket team is known as 'The Men in Blue'?", options: ["India", "England", "Pakistan", "South Africa"], correct: "India", cat: "sports" },

  // --- HISTORY & GEOGRAPHY (Massive Expansion) ---
  { q: "Which is the longest river in India?", options: ["Yamuna", "Godavari", "Ganga", "Brahmaputra"], correct: "Ganga", cat: "geo" },
  { q: "How many continents are there in the world?", options: ["5", "6", "7", "8"], correct: "7", cat: "geo" },
  { q: "Which country is known as the 'Land of the Rising Sun'?", options: ["China", "Japan", "South Korea", "Thailand"], correct: "Japan", cat: "geo" },
  { q: "Which river flows through the Grand Canyon?", options: ["Nile", "Amazon", "Mississippi", "Colorado"], correct: "Colorado", cat: "geo" },
  { q: "Who was the founder of the Maurya Empire?", options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Bimbisara"], correct: "Chandragupta Maurya", cat: "geo" },
  { q: "Which continent has the largest area?", options: ["Africa", "Europe", "Asia", "North America"], correct: "Asia", cat: "geo" },
  { q: "Which river is known as the 'Sorrow of Bihar'?", options: ["Ganga", "Yamuna", "Kosi", "Ghaghara"], correct: "Kosi", cat: "geo" },
  { q: "When did the First World War begin?", options: ["1912", "1914", "1916", "1918"], correct: "1914", cat: "geo" },
  { q: "Which Mughal emperor built the Taj Mahal?", options: ["Akbar", "Shah Jahan", "Aurangzeb", "Jahangir"], correct: "Shah Jahan", cat: "geo" },
  { q: "Which line divides the Earth into the Northern and Southern Hemispheres?", options: ["Prime Meridian", "Tropic of Cancer", "Equator", "Tropic of Capricorn"], correct: "Equator", cat: "geo" },
  { q: "Which is the largest island in the world?", options: ["Madagascar", "Greenland", "Borneo", "New Guinea"], correct: "Greenland", cat: "geo" },
  { q: "In which year did India gain independence from British rule?", options: ["1945", "1947", "1950", "1952"], correct: "1947", cat: "geo" },
  { q: "Which ocean is the largest on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: "Pacific", cat: "geo" },
  { q: "Who was the first Prime Minister of independent India?", options: ["Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Rajendra Prasad", "Indira Gandhi"], correct: "Jawaharlal Nehru", cat: "geo" },
  { q: "Which river is the longest river in the world?", options: ["Amazon", "Yangtze", "Mississippi", "Nile"], correct: "Nile", cat: "geo" },
  { q: "Who was the first President of independent India?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Rajendra Prasad", "B. R. Ambedkar"], correct: "Rajendra Prasad", cat: "geo" },
  { q: "Which mountain range forms the northern boundary of India?", options: ["Aravallis", "Vindhyas", "Western Ghats", "Himalayas"], correct: "Himalayas", cat: "geo" },
  { q: "Which is the smallest continent by area?", options: ["Europe", "Australia", "Antarctica", "South America"], correct: "Australia", cat: "geo" },
  { q: "In which year did the French Revolution begin?", options: ["1789", "1790", "1792", "1795"], correct: "1789", cat: "geo" },
  { q: "Which country is known as the 'Gift of the Nile'?", options: ["Sudan", "Ethiopia", "Egypt", "Libya"], correct: "Egypt", cat: "geo" },
  { q: "Who was the first woman Prime Minister of India?", options: ["Sonia Gandhi", "Indira Gandhi", "Jayalalithaa", "Mayawati"], correct: "Indira Gandhi", cat: "geo" },
  { q: "In which battle did the British defeat Siraj-ud-Daulah?", options: ["Battle of Buxar", "Battle of Plassey", "Battle of Panipat", "Battle of Seringapatam"], correct: "Battle of Plassey", cat: "geo" },
  { q: "Which ancient Indian mathematician gave the concept of 'zero'?", options: ["Aryabhatta", "Varahamihira", "Brahmagupta", "Bhaskara"], correct: "Aryabhatta", cat: "geo" },
  { q: "Which peak is the highest in the world?", options: ["Kanchenjunga", "Nanda Devi", "Mount Everest", "Annapurna"], correct: "Mount Everest", cat: "geo" },
  { q: "Who wrote the 'Arthashastra'?", options: ["Kalidasa", "Chanakya (Vishnugupta)", "Ashoka", "Fa-Hien"], correct: "Chanakya (Vishnugupta)", cat: "geo" },
  { q: "Which movement is linked with the slogan 'Do or Die'?", options: ["Non-Cooperation", "Civil Disobedience", "Quit India", "Khilafat"], correct: "Quit India", cat: "geo" },
  { q: "Which country is known as the 'Land of the Midnight Sun'?", options: ["Norway", "Sweden", "Finland", "All of these"], correct: "All of these", cat: "geo" },
  { q: "Which ancient king converted to Buddhism after Kalinga War?", options: ["Chandragupta", "Ashoka", "Bindusara", "Kanishka"], correct: "Ashoka", cat: "geo" },
  { q: "Which of these is the largest country by area?", options: ["China", "Canada", "United States", "Russia"], correct: "Russia", cat: "geo" },
  { q: "Which continent contains the Sahara Desert?", options: ["Asia", "Africa", "Australia", "South America"], correct: "Africa", cat: "geo" },
  { q: "Which event is associated with the Boston Tea Party?", options: ["French Revolution", "American Revolution", "Russian Revolution", "Independence Movement"], correct: "American Revolution", cat: "geo" },
  { q: "Which country is known as the 'Pearl of the Indian Ocean'?", options: ["Maldives", "Sri Lanka", "Madagascar", "Indonesia"], correct: "Sri Lanka", cat: "geo" },
  { q: "In which year did the Russian Revolution take place?", options: ["1905", "1917", "1927", "1937"], correct: "1917", cat: "geo" },
  { q: "Which monument is the gateway to India's capital?", options: ["Gateway of India", "India Gate", "Charminar", "Qutub Minar"], correct: "India Gate", cat: "geo" }
];

const QuizApp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'feedback'
  const [usedQuestions, setUsedQuestions] = useState([]);

  const pickRandomQuestion = () => {
    let pool = MASTER_QUESTIONS;
    
    // Strict category filtering
    if (id && id !== 'random') {
       pool = MASTER_QUESTIONS.filter(q => 
         (q.cat && q.cat.toLowerCase() === id.toLowerCase())
       );
    }
    
    // Fallback only if absolutely no questions match
    if (pool.length === 0) pool = MASTER_QUESTIONS;

    // Repetition check within the filtered pool
    let freshPool = pool.filter(q => !usedQuestions.includes(q.q));
    if (freshPool.length === 0) {
       freshPool = pool;
       setUsedQuestions([]);
    }

    const nextQ = freshPool[Math.floor(Math.random() * freshPool.length)];
    setCurrentQuestion(nextQ);
    
    // Shuffle answers
    const options = [...nextQ.options].sort(() => Math.random() - 0.5);
    setShuffledOptions(options);

    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameState('playing');
    setUsedQuestions(prev => [...prev, nextQ.q]);
  };

  const handleAnswer = (answer) => {
    if (gameState !== 'playing') return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correct;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 100);
    setGameState('feedback');
  };

  const handleNext = () => {
    pickRandomQuestion();
  };

  return (
    <div className="quiz-app-container">
      <div className="quiz-overlay-bg">
        <div className="blur-blob-1"></div>
        <div className="blur-blob-2"></div>
      </div>

      <div className="quiz-content-frame">
        <header className="quiz-app-header">
           <button className="q-back-btn" onClick={() => navigate('/quizzes')}>
              <ArrowLeft size={18} />
              <span>Library</span>
           </button>
           <div className="q-stats-bar">
              <div className="score-pill">
                 <Zap size={14} fill="#fbbf24" />
                 <span>{score}</span>
              </div>
           </div>
        </header>

        <main className="q-main-arena">
          <AnimatePresence mode="wait">
            {gameState === 'start' && (
              <motion.div 
                key="start"
                className="q-start-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="q-icon-box pulse-slow">
                   <Brain size={64} color="#3b82f6" />
                </div>
                <h1>{id === 'lang' ? 'Language Challenge' : id === 'gk' ? 'General Knowledge' : 'Ready to Challenge?'}</h1>
                <p>
                  {id === 'lang' 
                    ? 'Improve your vocabulary and grammar with our curated dataset.' 
                    : id === 'gk'
                    ? 'Test your global perspective with 200+ specialized GK questions.'
                    : 'Test your mind across various specialized domains.'}
                </p>
                <button className="q-primary-btn" onClick={pickRandomQuestion}>
                   <PlayCircle size={20} />
                   Start Session
                </button>
              </motion.div>
            )}

            {(gameState === 'playing' || gameState === 'feedback') && currentQuestion && (
              <motion.div 
                key={currentQuestion.q}
                className="q-question-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="q-category-tag">Domain: {currentQuestion.cat.toUpperCase()}</div>
                <h2 className="q-text">{currentQuestion.q}</h2>

                <div className="q-options-grid">
                  {shuffledOptions.map((opt, idx) => (
                    <motion.button
                      key={opt}
                      className={`q-option-btn ${selectedAnswer === opt ? (isCorrect ? 'correct' : 'wrong') : ''} ${gameState === 'feedback' && opt === currentQuestion.correct ? 'reveal' : ''}`}
                      disabled={gameState === 'feedback'}
                      onClick={() => handleAnswer(opt)}
                      whileHover={{ scale: gameState === 'playing' ? 1.02 : 1 }}
                      whileTap={{ scale: gameState === 'playing' ? 0.98 : 1 }}
                    >
                      <span className="opt-label">{String.fromCharCode(65 + idx)}</span>
                      <span className="opt-text">{opt}</span>
                      {gameState === 'feedback' && opt === currentQuestion.correct && (
                         <CheckCircle2 size={18} className="status-icon" />
                      )}
                      {gameState === 'feedback' && selectedAnswer === opt && !isCorrect && (
                         <XCircle size={18} className="status-icon" />
                      )}
                    </motion.button>
                  ))}
                </div>

                {gameState === 'feedback' && (
                  <motion.div 
                    className="q-action-row"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <button className="q-next-btn" onClick={handleNext}>
                       Next Question
                       <Sparkles size={16} />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="q-footer">
           <div className="q-progress-bar">
              <div className="progress-hint">Strict Category Mode • {id === 'lang' ? 'Language Only' : id === 'gk' ? 'GK Mastery' : 'Global Random'}</div>
           </div>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .quiz-app-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000000;
          color: white;
          font-family: 'Outfit', sans-serif;
          z-index: 1000;
          overflow: hidden;
        }

        .quiz-overlay-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
          z-index: -1;
        }

        .blur-blob-1 {
          position: absolute;
          width: 400px;
          height: 400px;
          background: #3b82f6;
          opacity: 0.1;
          filter: blur(100px);
          top: -100px;
          left: -100px;
          animation: float 20s infinite alternate;
        }

        .blur-blob-2 {
          position: absolute;
          width: 300px;
          height: 300px;
          background: #ec4899;
          opacity: 0.1;
          filter: blur(100px);
          bottom: -50px;
          right: -50px;
          animation: float 15s infinite alternate-reverse;
        }

        @keyframes float {
          0% { transform: translate(0,0); }
          100% { transform: translate(100px, 50px); }
        }

        .quiz-content-frame {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .quiz-app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .q-back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 12px;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .score-pill {
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.2);
          padding: 8px 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fbbf24;
          font-weight: 700;
        }

        .q-main-arena {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .q-start-screen {
          text-align: center;
          max-width: 400px;
        }
        .q-start-screen h1 { font-size: 32px; font-weight: 800; margin-bottom: 16px; }
        .q-start-screen p { color: rgba(255,255,255,0.5); margin-bottom: 32px; line-height: 1.6; }

        .q-icon-box {
          width: 120px;
          height: 120px;
          background: rgba(59, 130, 246, 0.05);
          border: 1px solid rgba(59, 130, 246, 0.1);
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
        }

        .q-primary-btn {
          background: white;
          color: black;
          border: none;
          padding: 16px 32px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 auto;
          transition: all 0.2s;
        }

        .q-question-card {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 32px;
          padding: 40px;
          position: relative;
        }

        .q-category-tag {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #3b82f6;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .q-text { font-size: 24px; font-weight: 700; margin-bottom: 40px; }

        .q-options-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }

        .q-option-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
          color: rgba(255,255,255,0.8);
          font-size: 16px;
          text-align: left;
          transition: all 0.2s;
        }

        .opt-label {
           width: 32px;
           height: 32px;
           background: rgba(255,255,255,0.05);
           border-radius: 8px;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 12px;
           font-weight: 700;
           color: rgba(255,255,255,0.4);
        }

        .q-option-btn.correct { background: rgba(34, 197, 94, 0.1); border-color: #22c55e; color: #4ade80; }
        .q-option-btn.wrong { background: rgba(239, 68, 68, 0.1); border-color: #ef4444; color: #f87171; }
        .q-option-btn.reveal { background: rgba(34, 197, 94, 0.1); border-color: #22c55e; color: #4ade80; }

        .status-icon { margin-left: auto; }

        .q-next-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .q-footer { margin-top: auto; padding: 20px 0; text-align: center; }
        .progress-hint { font-size: 11px; color: rgba(255,255,255,0.1); text-transform: uppercase; }

        @media (max-width: 600px) {
           .q-text { font-size: 20px; }
           .q-option-btn { padding: 14px 18px; }
        }
      `}</style>
    </div>
  );
};

export default QuizApp;
