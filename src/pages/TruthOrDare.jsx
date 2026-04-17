import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronLeft, Play, Info, ArrowRight, X,
  Users, Zap, Heart, Flame, ShieldAlert,
  Ghost, Target, Sparkles, Wand2, History
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TruthOrDare = () => {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState('setup'); // 'setup', 'selection', 'challenge'
    const [category, setCategory] = useState('Popular');
    const [mode, setMode] = useState(null); // 'truth' or 'dare'
    const [challenge, setChallenge] = useState('');
    const [history, setHistory] = useState({}); // Tracking seen questions per {cat}-{mode}

    const categories = [
        { name: 'Popular', icon: <Users size={24} />, color: '#3b82f6', textColor: '#fff' },
        { name: 'Extreme', icon: <Zap size={24} />, color: '#ef4444', textColor: '#fff' },
        { name: 'For Couples', icon: <Heart size={24} />, color: '#f472b6', textColor: '#fff' },
        { name: 'Spicy', icon: <Flame size={24} />, color: '#eab308', textColor: '#fff' },
    ];

    const questionsData = useMemo(() => ({
        Popular: {
            truth: [
                "What's the last lie you told?", "What's your biggest regret?", "Who are you jealous of?",
                "What's the most embarrassing thing you've done on a date?", "Have you ever peed yourself as an adult?",
                "What's the weirdest thing you've ever eaten?", "Who's your celebrity crush?",
                "What's your most embarrassing wardrobe malfunction?", "Have you ever laughed so hard you peed a little?",
                "What's the longest you've gone without showering?", "What's your guilty pleasure TV show or movie?",
                "Have you ever stalked someone's social media?", "What's the dumbest thing you've done while drunk?",
                "Who was your first crush?", "What's the most ridiculous thing you believed as a kid?",
                "Have you ever had a wardrobe malfunction in public?", "What's your go-to karaoke song?",
                "If you could switch lives with one friend for a day, who would it be?", "What's the strangest dream you've had?",
                "Have you ever forgotten someone's name right after meeting them?", "What's your biggest fear?",
                "What's the pettiest reason you've ended a friendship or relationship?", "Have you ever cheated on a test?",
                "What's the worst physical pain you've experienced?", "Who do you text the most?",
                "What's something you're weirdly bad at?", "Have you ever named an inanimate object?",
                "What's the most embarrassing thing your parents caught you doing?", "If you had to marry someone in this room, who?",
                "What's your most used emoji?", "Have you ever pretended to like a gift?",
                "What's the longest you've left food on the floor before eating it?", "Who was your first kiss?",
                "What's your biggest ick?", "Have you ever cried during a movie?", "What's the weirdest thing you've Googled?",
                "If you could be invisible for a day, what would you do?", "What's your favorite childhood memory?",
                "Have you ever been caught lying?", "What's the best prank you've ever pulled?",
                "Who in this group do you trust the most?", "What's your worst habit?",
                "Have you ever sent a text to the wrong person?", "What's the most awkward date you've been on?",
                "If you could erase one memory, what would it be?", "What's your spirit animal and why?",
                "Have you ever faked being sick to skip something?", "What's the silliest thing you're afraid of?",
                "Who was your favorite teacher and why?", "What's the most times you've hit snooze in one morning?",
                "Have you ever danced in front of a mirror pretending to be a star?", "What's your most overused phrase?",
                "If animals could talk, which one would be the rudest?", "What's the last thing that made you cry from laughter?",
                "Have you ever worn the same clothes two days in a row?", "What's your biggest pet peeve?",
                "Who do you secretly admire?", "Have you ever tripped in public?", "What's the weirdest food combination you love?",
                "If you could time travel, where would you go first?", "What's your most embarrassing autocorrect fail?",
                "Have you ever pretended to know a song's lyrics?", "What's the longest you've binged a show in one sitting?",
                "Who makes you laugh the hardest?", "Have you ever been ghosted?", "What's your favorite meme of all time?",
                "If you were a superhero, what would your lame power be?", "What's the most useless talent you have?",
                "Have you ever sung in the shower loudly?", "What's something you do only when alone?",
                "Who was your childhood hero?", "Have you ever broken something and blamed someone else?",
                "What's your dream vacation spot?", "If you could only eat one food forever, what?",
                "What's the best advice you've ever received?", "Have you ever been starstruck?",
                "What's your favorite way to waste time?", "Who in the group would survive a zombie apocalypse longest?",
                "What's the most random thing in your search history?", "Have you ever had an imaginary friend?",
                "What's your go-to dance move?", "If you could swap bodies with anyone for a week, who?",
                "What's the funniest fail you've witnessed?", "Have you ever lied about your age?",
                "What's your biggest collection (shoes, memes, etc.)?", "Who would play you in a movie?",
                "Have you ever accidentally liked an old post?", "What's the most awkward compliment you've received?",
                "If you won the lottery, what's the first silly thing you'd buy?", "What's your most replayed song?",
                "Have you ever talked to yourself out loud in public?", "What's the best gift you've ever given?",
                "Who do you think has the best style here?", "Have you ever forgotten a close friend's birthday?",
                "What's your hidden talent?", "If you could relive one day, what day?", "What's the cheesiest pickup line you've used?",
                "Have you ever been late to something important?", "What's your favorite inside joke?",
                "If you could ask anyone (dead or alive) one question, who and what?"
            ],
            dare: [
                "Do 20 push-ups right now.", "Sing any song of the group's choice.", "Dance with no music for 1 minute.",
                "Let someone in the group post on your Instagram.", "Do your best impression of someone in the room.",
                "Balance a spoon on your nose for 30 seconds.", "Talk in an accent for the rest of the round.",
                "Try to lick your elbow.", "Do 10 jumping jacks in slow motion.", "Let someone draw a mustache on your face.",
                "Make up a 30-second rap about the person to your left.", "Eat a spoonful of any condiment of the group's choice.",
                "Try to touch your nose with your tongue.", "Post a silly selfie on your story.", "Act like a chicken until your next turn.",
                "Let someone go through your camera roll for 30 seconds.", "Try to juggle 3 items of the group's choice.",
                "Do your best impression of a celebrity.", "Try to stand on your head for 10 seconds.", "Smell everyone's feet in the room.",
                "Call a random contact and sing 'Happy Birthday'.", "Let someone give you a new hairstyle.",
                "Try to name 5 countries in 5 seconds.", "Whisper everything you say for the next 2 rounds.",
                "Do a silly dance until someone laughs.", "Try to win a staring contest with the person to your right.",
                "Let someone send a random emoji to your crush.", "Talk without closing your mouth for 30 seconds.",
                "Try to do a handstand.", "Wear your clothes backward for the rest of the game.", "Do your best animal impression.",
                "Let someone write a word on your forehead with a marker.", "Try to hold your breath for 30 seconds.",
                "Pretend to be a waiter and take everyone's order.", "Do 5 sit-ups.", "Try to make a funny face for a group photo.",
                "Let someone choose a funny filter for your next selfie.", "Try to hop on one foot for 1 minute.",
                "Do your best impression of a cartoon character.", "Let someone tickle you for 30 seconds.",
                "Try to recite the alphabet backward.", "Pretend to be a news reporter and report on the game.",
                "Do a runway walk across the room.", "Let someone in the group give you a dare of their choice.",
                "Try to balance a book on your head while walking.", "Do your best laugh.", "Let someone record you doing a silly dance.",
                "Try to keep a straight face while everyone tries to make you laugh.", "Do 10 squats.", "Pretend to be a robot for 1 minute."
            ]
        },
        Extreme: {
            truth: [
                "What's the most illegal thing you've ever done?", "Have you ever cheated on a partner?",
                "What's your darkest secret?", "Have you ever stolen something?",
                "What's the worst thing you've done to a friend?", "Have you ever been arrested or close to it?",
                "What's the most dangerous thing you've done for fun?", "Have you ever lied in court or to authorities?",
                "What's your biggest betrayal of someone?", "Have you ever wished harm on someone?",
                "What's the most embarrassing secret you've never told anyone?", "Have you ever sabotaged someone?",
                "What's the craziest risk you've taken?", "Have you ever been in a physical fight?",
                "What's the most manipulative thing you've done?", "Have you ever faked an emergency?",
                "What's your most shameful memory?", "Have you ever broken a serious promise?",
                "What's the worst lie you've told a loved one?", "Have you ever spied on someone?",
                "What's the most extreme dare you've completed?", "Have you ever destroyed someone's property?",
                "What's your most controversial opinion?", "Have you ever been ghosted and then done it back worse?",
                "What's the most reckless thing you've done while intoxicated?", "Have you ever blackmailed or been blackmailed?",
                "What's the scariest situation you've been in?", "Have you ever cheated on an exam badly?",
                "What's something you've done that could ruin your reputation?", "Have you ever started a rumor?",
                "What's the most extreme thing you've done for attention?", "Have you ever been in love with two people at once?",
                "What's your most forbidden fantasy?", "Have you ever witnessed a crime and stayed silent?",
                "What's the biggest mistake that still haunts you?", "Have you ever hurt someone emotionally on purpose?",
                "What's the most taboo topic you secretly enjoy?", "Have you ever faked your identity online?",
                "What's the most extreme physical challenge you've failed?", "Have you ever been kicked out of somewhere?",
                "What's your deepest insecurity?", "Have you ever taken something that wasn't yours and kept it?",
                "What's the most intense argument you've had?", "Have you ever pretended to be someone else for a day?",
                "What's the most dangerous place you've had an intimate moment?", "Have you ever broken someone's heart intentionally?",
                "What's the most extreme food challenge you've done?", "Have you ever lied about your health?",
                "What's the scariest secret about your family?", "Have you ever been involved in something you regret deeply?",
                "What's the most shocking thing you've discovered about yourself?", "Have you ever hacked or tried to access someone's account?",
                "What's your most extreme fear?", "Have you ever caused a major accident?",
                "What's the most intense jealousy you've felt?", "Have you ever participated in something illegal for thrill?",
                "What's the biggest risk you've taken in a relationship?", "Have you ever ghosted someone after a serious commitment?",
                "What's the most extreme dare you've refused?", "Have you ever been in a situation where you feared for your life?",
                "What's your most hidden vice?", "Have you ever manipulated a situation for personal gain?",
                "What's the most shocking truth about your past?", "Have you ever destroyed evidence of something bad?",
                "What's the most extreme thing you've done to win?", "Have you ever had a near-death experience?",
                "What's the darkest thought you've had?", "Have you ever betrayed a best friend?",
                "What's the most intense physical pain you've caused someone?", "Have you ever been obsessed with someone unhealthy?",
                "What's the most extreme lie you've maintained for years?", "Have you ever participated in something cult-like?",
                "What's your most shameful addiction or habit?", "Have you ever stolen from family?",
                "What's the most dangerous secret you've kept?", "Have you ever wished you could disappear?",
                "What's the most extreme revenge you've taken?", "Have you ever been involved in a love triangle?",
                "What's the scariest dream that felt real?", "Have you ever faked emotions for advantage?",
                "What's the most taboo experience you've had?", "Have you ever broken a law that could have serious consequences?",
                "What's your most intense moment of rage?", "Have you ever been caught in a massive lie?",
                "What's the most extreme challenge you've set for yourself?", "Have you ever ignored someone's cry for help?",
                "What's the darkest side of your personality?", "Have you ever risked everything on a whim?",
                "What's the most shocking confession you've heard?", "Have you ever been in a toxic situation you enabled?",
                "What's your most extreme 'what if' regret?", "Have you ever tested boundaries dangerously?",
                "What's the most intense emotional breakdown you've had?", "Have you ever done something for money you regret?",
                "What's the most forbidden place you've been?", "Have you ever felt truly evil for a moment?",
                "What's the most extreme physical stunt you've attempted?", "Have you ever kept a secret that hurt others?",
                "What's the scariest truth about human nature you've accepted?", "Have you ever pushed someone to their limit?"
            ],
            dare: [
                "Call your crush and tell them 'I love you' then hang up immediately.", "Let someone in the group shave off a small part of your hair.",
                "Post 'I'm getting married!' on your social media and keep it for 1 hour.", "Let right-side person text anyone from your phone contact list.",
                "Eat a raw egg without throwing up.", "Let someone mix 5 liquids and drink the concoction.",
                "Shave 1 inch of your eyebrow (only if you're brave!).", "Prank call your parents and tell them you're in jail.",
                "Let the group choose a tattoo (marker) to draw on your chest.", "Lick the bottom of someone's shoe.",
                "Do 50 pushups in one go.", "Let someone send a risky DM to a celebrity from your account.",
                "Shave your head (marker lines only if refused).", "Pour a bucket of ice-cold water over your head.",
                "Let someone in the group punch you as hard as they can on the arm.", "Eat a whole lemon without making a face.",
                "Post your most embarrassing childhood photo and tag 10 friends.", "Wear your underwear on the outside of your pants for 1 hour.",
                "Let the group check your browser history for the last 24 hours.", "Whisper something naughty to a stranger (if in public).",
                "Try to break a wooden board with your hand.", "Let someone wax a small part of your leg.",
                "Do 100 jumping jacks without stopping.", "Prank call your ex and ask to get back together.",
                "Let someone in the group post anything they want on your Facebook.", "Eat a hot pepper without drinking water for 1 minute.",
                "Wait outside in your underwear for 5 minutes.", "Let someone in the group record you doing something embarrassing and post it.",
                "Try to eat a whole onion like an apple.", "Let someone give you a wedgie.", "Do a belly dance in front of the group.",
                "Prank call a random number and try to stay on for 3 minutes.", "Let someone choose a funny filter and record you singing a serious song.",
                "Try to do a split.", "Let someone write their name on your arm with a permanent marker.",
                "Do your best impression of someone in the group until the end of the game.", "Let someone draw a funny picture on your back.",
                "Try to do 20 pull-ups.", "Let someone in the group choose a dare for you.",
                "Prank call a local business and ask for something ridiculous.", "Let someone record you telling a silly joke and post it.",
                "Try to stand on your head for 1 minute.", "Let someone give you a direct order for 10 minutes.",
                "Do your best impression of a teacher you both know.", "Let someone in the group record you singing at the top of your lungs.",
                "Try to do a backflip (only if trained!).", "Let someone in the group record you doing a funny walk and post it.",
                "Do 5 minutes of high-intensity interval training.", "Prank call a friend and tell them you're moving to another country tomorrow.",
                "Let someone in the group choose a funny name for you for the rest of the game."
            ]
        },
        'For Couples': {
            truth: [
                "What was your first impression of me?", "What's your biggest relationship fear?", "When did you know you liked me?",
                "What's one thing you wish I knew about you?", "What's your most unexpected red flag?",
                "What do you love most about our relationship?", "Have you ever compared me to an ex?",
                "What's the pettiest thing I've done that annoyed you?", "What's your favorite memory of us?",
                "What’s one thing you only do when alone?", "Who’s your favorite of my friends?", "What's our best kiss story?",
                "What’s something you want to try in our relationship?", "Have you ever lied to me about something small?",
                "What's the worst date we've had?", "What gives you the 'ick' in relationships?", "What's your relationship dealbreaker?",
                "What was the moment you felt most connected to me?", "What's one habit of mine you secretly love?",
                "Have you ever had a dream about me?", "What's the cheesiest thing I've done for you?", "What song reminds you of us?",
                "What's something I do that turns you on non-sexually?", "Who was your last crush before me?",
                "What's your favorite way I show love?", "Have you ever been jealous of someone in my life?",
                "What's the best surprise I've given you?", "What’s one thing you wish we did more?",
                "What's your least favorite of my habits?", "When do you feel most loved by me?",
                "Have you ever thought about our future wedding/kids?", "What's the funniest misunderstanding we've had?",
                "What’s my best quality as a partner?", "Have you ever hidden something from me?", "What's a tradition we should start?",
                "What's the most romantic thing I've done?", "Who in my family do you like least?",
                "What's something cute I do without realizing?", "Have you ever faked liking something I love?",
                "What's our most awkward moment?", "What’s your favorite inside joke with me?",
                "Have you ever wanted to change something about me?", "What's the best trip we've taken?",
                "What makes you feel secure in our relationship?", "Have you ever cried because of me?",
                "What's one goal we should achieve together?", "What's my most attractive feature?", "Have you ever doubted us?",
                "What's the sweetest text I've sent you?", "What’s something you’ve forgiven me for?", "Who's more romantic?",
                "What's our perfect date night?", "Have you ever felt neglected by me?", "What's one lesson our relationship taught you?",
                "What's the most thoughtful thing I've done?", "Have you ever bragged about me?", "What’s your favorite way we spend time?",
                "What's something I do that makes you smile instantly?", "Have you ever planned a surprise that failed?",
                "What's our relationship strength?", "What’s one thing you’d change about our arguments?",
                "Have you ever felt proud of me in public?", "What's the most vulnerable you've been with me?",
                "What's your favorite photo of us?", "Have you ever wanted more alone time?", "What's the best compliment I've given?",
                "What makes fights with me different?", "Have you ever imagined our life in 10 years?",
                "What's one small thing I do that means a lot?", "What's our most fun adventure?",
                "Have you ever kept a gift I gave you hidden?", "What’s your favorite way I comfort you?",
                "Who's the better listener?", "Have you ever been scared of losing me?", "What's something we've overcome together?",
                "What's the most patient you've seen me be?", "Have you ever mimicked me to friends?", "What's a bucket list item for us?",
                "What's my cutest quirk?", "Have you ever felt butterflies with me still?", "What's one way we balance each other?",
                "Have you ever defended me to others?", "What's the most relaxing thing we do together?", "What’s your favorite nickname for me?",
                "Have you ever written something about me?", "What's one challenge we still need to work on?",
                "What's the best 'us against the world' moment?", "Have you ever felt inspired by me?", "What's something I taught you?",
                "What's our relationship's funniest story?", "Have you ever stayed up thinking about us?",
                "What's the most supportive I've been?", "What’s one tradition from your past you want for us?",
                "Have you ever felt lucky to have me?", "What's the best lesson from our fights?", "What's my most reliable trait?",
                "Have you ever planned our future secretly?", "What's the most fun we've had being silly?", "What makes our love unique?",
                "If we could relive one day together, what day?"
            ],
            dare: [
                "Give your partner a 5-minute foot massage.", "Re-enact your first kiss.", "Trade shirts with your partner for 30 minutes.",
                "Serenade your partner with a love song.", "Whisper the most romantic thing you can think of in their ear.",
                "Let your partner give you a new hairstyle.", "Do your partner's makeup.", "Give your partner 50 kisses.",
                "Dance with your partner for 2 minutes with no music.", "Make up a love poem for your partner on the spot.",
                "Let your partner post a cute photo of you on their Instagram.", "Call your partner's parents and tell them they're amazing.",
                "Give your partner a backrub for 10 minutes.", "Pretend to be your partner for 5 minutes.",
                "Let your partner write a love letter to you and read it out loud.", "Share a romantic secret with your partner.",
                "Plan your dream vacation with your partner out loud.", "Let your partner feed you a snack.",
                "Tell your partner 10 things you love about them.", "Give your partner a big hug for 2 minutes.",
                "Let your partner give you a 10-minute facial.", "Share your favorite memory of us.",
                "Let your partner choose your next outfit.", "Do a silly dance with your partner.",
                "Let your partner record you saying 'I love you' and keep it as their ringtone.", "Cook a simple meal with your partner.",
                "Tell your partner about your first impression of them.", "Let your partner give you a new nickname.",
                "Share a romantic dream you've had about us.", "Let your partner choose a movie for tonight.",
                "Give your partner a long, romantic kiss.", "Let your partner give you a foot soak.",
                "Share a romantic goal for our future.", "Let your partner choose a song for your next dance.",
                "Tell your partner about a time they made you proud.", "Let your partner give you a 5-minute head massage.",
                "Share a romantic tradition you want to start with us.", "Let your partner give you a tight hug.",
                "Tell your partner about a romantic dream you've had recently.", "Let your partner give you a new pet name.",
                "Share a romantic wish with your partner.", "Let your partner give you a 10-minute shoulder massage.",
                "Tell your partner about a time they made you laugh the hardest.", "Let your partner choose your next adventure.",
                "Give your partner a romantic gaze for 1 minute.", "Let your partner give you a new style advice.",
                "Share a romantic secret about your feelings for us.", "Let your partner choose your next snack.",
                "Tell your partner about a time they surprised you the most.", "Let your partner give you a 10-minute back massage."
            ]
        },
        Spicy: {
            truth: [
                "What's your favorite body part of mine?", "When was the last time you masturbated thinking of me?",
                "What's your ultimate turn-on?", "Have you ever had a sexy dream about me?",
                "What's your favorite sex position with me?", "What's the craziest place we've been intimate?",
                "What non-sexual thing about me turns you on?", "Have you ever fantasized about someone else while with me?",
                "What's your favorite way I touch you?", "Lights on or off during sex?", "What's the best orgasm you've had with me?",
                "Have you ever been turned on in public by me?", "What's a fantasy you'd like to try with me?",
                "What's your favorite thing I do with my mouth?", "When do you feel the sexiest with me?",
                "Have you ever watched something spicy thinking of us?", "What's the longest we've gone without intimacy?",
                "What's your favorite outfit of mine to remove?", "Dominant or submissive with me?", "What's the hottest text I've sent?",
                "Have you ever role-played in your head with us?", "What's something new you'd like to try in bed?",
                "Morning sex or night sex preference?", "What's the most adventurous thing we've done intimately?",
                "How loud are you usually?", "What's your favorite spot to kiss on me?",
                "Have you ever been caught almost being intimate?", "What's a toy or prop you'd want to introduce?",
                "What's the sexiest thing I've worn?", "Have you ever sent or wanted to send a spicy photo?",
                "What's your go-to fantasy involving me?", "What's the best quickie we've had?",
                "Have you ever been turned on by my voice?", "What's something I do that instantly arouses you?",
                "Slow and sensual or hard and fast?", "What's the most times we've been intimate in one day?",
                "Have you ever thought about us in a public risky spot?", "What's your favorite aftercare with me?",
                "Have you ever used food in an intimate way?", "What's the hottest compliment I've given in bed?",
                "What's a fetish you have or want to explore?", "Have you ever been intimate somewhere you shouldn't?",
                "What's your favorite sound I make?", "What's the most sensitive spot on your body?",
                "Have you ever masturbated after seeing me?", "What's one thing I do amazingly in bed?",
                "Outdoor or indoor intimacy preference?", "What's the spiciest message you've wanted to send?",
                "Have you ever had a threesome fantasy?", "What's your favorite way to tease me?", "Lights, music, or silence?",
                "What's the longest foreplay we've had?", "Have you ever been so turned on you couldn't wait?",
                "What's something vanilla you want to make spicy?", "Have you ever compared our intimacy to past experiences?",
                "What's the sexiest move you've imagined for me?", "Morning breath or fresh—does it matter?",
                "What's your favorite position to finish in?", "Have you ever wanted to record us?",
                "What's the most playful thing we've done intimately?", "What's a compliment about my body you love giving?",
                "Have you ever been distracted by thoughts of me during the day?", "What's your favorite way I initiate?",
                "Have you ever had an intimate dream that felt real?", "What's one boundary you'd like to push?",
                "What's the hottest thing about my personality in bed?", "Have you ever been intimate while risky (time/place)?",
                "What's your favorite taste or scent of mine?", "Slow build-up or spontaneous?",
                "Have you ever wanted me to be more vocal?", "What's the best massage leading to more?",
                "Have you ever fantasized about us in a different location?", "What's your favorite eye contact moment during intimacy?",
                "Have you ever been turned on by my clothes choice?", "What's one word that describes our best nights?",
                "Have you ever wanted to try temperature play?", "What's the most memorable quick moment?",
                "Have you ever thought about my hands in a spicy way?", "What's your favorite post-intimacy cuddle position?",
                "Have you ever been so attracted you forgot everything else?", "What's a spicy secret about your desires?",
                "Have you ever wanted to try light bondage?", "What's the sexiest thing I've said to you?",
                "Morning or midnight intimacy?", "Have you ever replayed a moment of ours in your head?",
                "What's your favorite way I look at you?", "Have you ever been intimate after an argument?",
                "What's one thing that always works to turn you on?", "Have you ever wanted a longer session?",
                "What's the hottest non-touching tease?", "Have you ever imagined us in costumes?", "What's your favorite pace?",
                "Have you ever been surprised by how good it was?", "What's a small detail about me that drives you wild?",
                "Have you ever wanted to extend foreplay forever?", "What's the spiciest thing we've discussed?",
                "Have you ever felt extra confident because of me?", "What's your favorite way we connect physically?",
                "Have you ever wanted to try something from a movie?", "What's the one thing that makes our intimacy special?"
            ],
            dare: [
                "Remove one piece of clothing.", "Whisper a dirty fantasy to your partner.", "Trace your partner's body with an ice cube.",
                "Give your partner a hickey in a hidden spot.", "Eat something off of your partner's body.",
                "Send a spicy photo to your partner right now.", "Do a slow striptease for 1 minute.",
                "Let your partner choose one clothing item for you to remove.", "Give your partner a 5-minute intimate massage.",
                "Blindfold your partner and tease them for 2 minutes.", "Let your partner give you a hickey wherever they want.",
                "Whisper something naughty in your partner's ear.", "Try an intimate position of your partner's choice.",
                "Let your partner use an ice cube on your neck.", "Give your partner a 10-minute intimate massage.",
                "Do a spicy dance for your partner.", "Let your partner choose a sexy pose for a photo.",
                "Whisper your favorite secret fantasy to your partner.", "Give your partner a long, passionate kiss.",
                "Let your partner give you a hickey in a spicy spot.", "Try a spicy activity with your partner.",
                "Let your partner choose an item of your clothing to keep for 30 minutes.", "Whisper a spicy dream you've had about us.",
                "Give your partner an intimate gaze for 2 minutes.", "Let your partner give you a 10-minute intimate facial.",
                "Share a spicy secret about your feelings for us.", "Let your partner choose your next spicy move.",
                "Do a spicy runway walk for your partner.", "Let your partner give you a 5-minute intimate massage.",
                "Whisper something hot to your partner.", "Try a sexy position with your partner.",
                "Let your partner use a toy or prop of their choice (safe!).", "Give your partner a spicy kiss wherever they want.",
                "Let your partner give you a hickey in a hidden spot.", "Whisper a dirty thought to your partner.",
                "Let your partner choose a spicy outfit for you to wear.", "Give your partner a 10-minute intimate back massage.",
                "Do a sexy dance with your partner.", "Let your partner choose a spicy photo to take together.",
                "Whisper a spicy secret about your desires.", "Let your partner give you a hickey in a spicy spot.",
                "Try a spicy fantasy with your partner.", "Let your partner choose a spicy move for you.",
                "Do a spicy walk across the room.", "Let your partner give you a 10-minute intimate massage.",
                "Whisper something spicy to your partner.", "Try a sexy activity you've both wanted.",
                "Let your partner use a safe prop of their choice.", "Give your partner a passionate kiss for 2 minutes.",
                "Let your partner give you a hickey in a hidden spot."
            ]
        }
    }), []);

    const getRandomQuestion = (cat, type) => {
        const key = `${cat}-${type}`;
        const sourceList = questionsData[cat][type];
        const seenList = history[key] || [];

        // Filter out seen ones
        let available = sourceList.filter(q => !seenList.includes(q));

        // If none left, reset history for this set
        if (available.length === 0) {
            setHistory(prev => ({ ...prev, [key]: [] }));
            available = sourceList;
        }

        const chosen = available[Math.floor(Math.random() * available.length)];

        // Record it in history
        setHistory(prev => {
            const current = prev[key] || [];
            return { ...prev, [key]: [...current, chosen] };
        });

        return chosen;
    };

    const nextQuestion = () => {
        if (!mode) return;
        setChallenge(getRandomQuestion(category, mode));
    };

    const selectMode = (type) => {
        setMode(type);
        setChallenge(getRandomQuestion(category, type));
        setGameState('challenge');
    };

    const handleBack = () => {
        if (gameState === 'challenge') setGameState('selection');
        else if (gameState === 'selection') setGameState('setup');
        else navigate('/apps');
    };

    return (
        <div className="game-container">
            <AnimatePresence mode="wait">
                {gameState === 'setup' && (
                    <motion.div 
                        key="setup" 
                        className="setup-view"
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 1.1 }}
                    >
                        <header className="game-header">
                            <button className="icon-btn-back" onClick={handleBack}>
                                <ChevronLeft size={28} />
                            </button>
                        </header>

                        <div className="setup-main-card">
                            <h1 className="main-title">SELECT CATEGORY</h1>
                            <div className="cat-box-grid">
                                {categories.map(cat => (
                                    <button 
                                        key={cat.name}
                                        className={`cat-box ${category === cat.name ? 'selected' : ''}`}
                                        style={{ '--accent': cat.color }}
                                        onClick={() => setCategory(cat.name)}
                                    >
                                        <div className="cat-icon-wrapper">{cat.icon}</div>
                                        <span className="cat-label">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                            
                            <button className="big-start-btn" onClick={() => setGameState('selection')}>
                                START GAME <ArrowRight size={24} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {gameState === 'selection' && (
                    <motion.div 
                        key="selection" 
                        className="selection-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <header className="game-header">
                            <button className="icon-btn-back" onClick={handleBack}>
                                <ChevronLeft size={28} />
                            </button>
                        </header>

                        <div className="split-side truth-side" onClick={() => selectMode('truth')}>
                            <div className="side-content">
                                <Ghost size={80} strokeWidth={1} />
                                <h2>TRUTH</h2>
                            </div>
                        </div>
                        <div className="center-divider">
                            <span>VS</span>
                        </div>
                        <div className="split-side dare-side" onClick={() => selectMode('dare')}>
                            <div className="side-content">
                                <Target size={80} strokeWidth={1} />
                                <h2>DARE</h2>
                            </div>
                        </div>
                    </motion.div>
                )}

                {gameState === 'challenge' && (
                    <motion.div 
                        key="challenge" 
                        className="challenge-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <header className="game-header">
                            <button className="icon-btn-back" onClick={handleBack}>
                                <ChevronLeft size={28} />
                            </button>
                        </header>

                        <div className="challenge-header">
                            <div className="mode-badge" style={{ backgroundColor: categories.find(c => c.name === category).color }}>
                                {mode.toUpperCase()}
                            </div>
                        </div>
                        
                        <div className="question-box">
                            <motion.h1 
                                key={challenge}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="main-question"
                            >
                                {challenge}
                            </motion.h1>
                        </div>

                        <div className="challenge-actions">
                            <button className="next-q-btn" onClick={nextQuestion}>
                                NEXT QUESTION <ArrowRight size={22} />
                            </button>
                            <button className="reset-history-btn" onClick={() => setHistory({})}>
                                <History size={14} /> RESET CYCLE
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');

                .game-container {
                    position: fixed; inset: 0;
                    background: #09090b; color: #fff;
                    font-family: 'Outfit', sans-serif;
                    overflow: hidden;
                    display: flex; align-items: center; justify-content: center;
                }

                .game-header { position: absolute; top: 30px; left: 30px; z-index: 100; }
                .icon-btn-back {
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                    color: #fff; width: 56px; height: 56px; border-radius: 16px; 
                    display: flex; align-items: center; justify-content: center; cursor: pointer;
                    transition: 0.2s; backdrop-filter: blur(10px);
                }
                .icon-btn-back:hover { background: rgba(255,255,255,0.1); transform: translateX(-4px); }

                /* Setup View */
                .setup-view {
                    width: 100%; height: 100%; display: flex; flex-direction: column;
                    align-items: center; justify-content: center; padding: 20px;
                }

                .setup-main-card {
                    width: 100%; max-width: 600px; text-align: center;
                }
                .main-title { font-size: 14px; font-weight: 800; letter-spacing: 4px; color: #71717a; margin-bottom: 30px; }

                .cat-box-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
                .cat-box {
                    aspect-ratio: 1.5/1; border-radius: 24px; border: 2px solid rgba(255,255,255,0.05);
                    background: rgba(255,255,255,0.03); display: flex; flex-direction: column;
                    align-items: center; justify-content: center; gap: 12px; cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); color: #71717a;
                }
                .cat-box.selected {
                    background: var(--accent); color: #fff; border-color: rgba(255,255,255,0.2);
                    box-shadow: 0 20px 40px -10px var(--accent); transform: translateY(-8px);
                }
                .cat-label { font-size: 16px; font-weight: 800; }

                .big-start-btn {
                    width: 100%; height: 70px; border-radius: 20px; border: none;
                    background: #3b82f6; color: #fff; font-size: 18px; font-weight: 900;
                    display: flex; align-items: center; justify-content: center; gap: 12px;
                    cursor: pointer; transition: 0.3s; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
                }
                .big-start-btn:hover { transform: scale(1.02); background: #2563eb; }

                /* Selection View */
                .selection-view {
                    width: 100%; height: 100%; display: flex; position: relative;
                }
                .split-side {
                    flex: 1; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; transition: 0.5s; overflow: hidden;
                }
                .side-content { text-align: center; }
                .side-content h2 { font-size: 48px; font-weight: 900; letter-spacing: 4px; margin-top: 20px; }
                
                .truth-side { background: #09090b; color: #fff; }
                .truth-side:hover { background: #18181b; }
                
                .dare-side { background: #3b82f6; color: #fff; }
                .dare-side:hover { background: #2563eb; }

                .center-divider {
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    width: 80px; height: 80px; border-radius: 50%; background: #fff;
                    color: #000; display: flex; align-items: center; justify-content: center;
                    font-weight: 950; font-size: 20px; border: 8px solid #09090b; z-index: 10;
                }

                /* Challenge View */
                .challenge-view {
                    width: 100%; height: 100%; display: flex; flex-direction: column;
                    align-items: center; justify-content: center; padding: 40px;
                }
                .mode-badge {
                    padding: 8px 24px; border-radius: 100px; font-weight: 900; font-size: 12px;
                    letter-spacing: 2px; color: #fff; margin-bottom: 40px;
                }
                .question-box { flex: 1; display: flex; align-items: center; justify-content: center; max-width: 800px; }
                .main-question { font-size: 48px; font-weight: 800; line-height: 1.1; text-align: center; }

                .challenge-actions {
                    width: 100%; max-width: 500px; display: flex; flex-direction: column; gap: 15px; margin-top: 40px;
                }
                .next-q-btn {
                    height: 70px; border-radius: 20px; border: none; background: #fff; color: #000;
                    font-size: 18px; font-weight: 900; display: flex; align-items: center; justify-content: center;
                    gap: 12px; cursor: pointer; transition: 0.3s;
                }
                .next-q-btn:hover { background: #e4e4e7; transform: translateY(-4px); }
                .reset-history-btn {
                    background: transparent; border: none; color: #3f3f46; font-weight: 700;
                    font-size: 11px; letter-spacing: 1px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
                }

                @media (max-width: 768px) {
                    .main-question { font-size: 32px; }
                    .cat-box-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
                    .cat-box { aspect-ratio: 1.2/1; }
                    .side-content h2 { font-size: 32px; }
                }
            `}</style>
        </div>
    );
};

export default TruthOrDare;
