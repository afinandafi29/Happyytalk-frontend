import React from 'react';
import QuizPage from '../components/QuizPage';

const GreekQuiz = () => (
  <QuizPage
    language="el"
    languageCode="el"
    pageTitle="HappyTalk Greek 🇬🇷"
    subtitle="Μάθετε ελληνικά με χαρά! (Learn with joy!)"
    rawData={`Αρχάριος|How do you say 'Happy' in Greek?|Χαρούμενος|Λυπημένος||Θυμωμένος||Κουρασμένος
Αρχάριος|Standard greeting for 'Hello' or 'Goodbye':|Γεια σου|Ευχαριστώ||Παρακαλώ||Συγγνώμη
Αρχάριος|How to say 'Thank you'?|Ευχαριστώ|Παρακαλώ||Καλημέρα||Εντάξει
Αρχάριος|Word for 'Friend':|Φίλος|Εχθρός||Γείτονας||Αδελφός
Αρχάριος|How do you say 'Good morning'?|Καλημέρα|Καλησπέρα||Καληνύχτα||Γεια
Αρχάριος|What does 'Όμορφα' mean?|Beautiful|Άσχημα||Κρύο||Μακριά
Αρχάριος|Which word means 'Smile'?|Χαμόγελο|Κλάμα||Ύπνος||Φαγητό
Αρχάριος|How to say 'I love you'?|Σ' αγαπώ|Σε βλέπω||Σε ακούω||Περιμένω
Αρχάριος|What is 'Success'?|Επιτυχία|Αποτυχία||Φόβος||Τέλος
Αρχάριος|How to say 'Welcome'?|Καλώς ήρθατε|Αντίο||Συγγνώμη||Ναι
Αρχάριος|Word for 'Sun':|Ήλιος|Φεγγάρι||Αστέρι||Σύννεφο
Αρχάριος|How do you say 'Water'?|Νερό|Φωτιά||Γη||Αέρας
Αρχάριος|What is 'Φαγητό'?|Food|Ποτό||Ύπνος||Παιχνίδι
Αρχάριος|Word for 'Big':|Μεγάλος|Μικρός||Ψηλός||Κοντός
Αρχάριος|How do you say 'House'?|Σπίτι|Σχολείο||Γραφείο||Μαγαζί
Αρχάριος|What is 'Αγάπη'?|Love|Μίσος||Ελπίδα||Ειρήνη
Αρχάριος|Translate 'Today':|Σήμερα|Αύριο||Χθες||Απόψε
Αρχάριος|How to say '1'?|Ένα|Δύο||Τρία||Τέσσερα
Αρχάριος|What is 'Σχολείο'?|School|Νοσοκομείο||Βιβλιοθήκη||Πάρκο
Αρχάριος|Word for 'Dog':|Σκύλος|Γάτα||Πουλί||Ψάρι
Αρχάριος|How to say 'I'm sorry'?|Συγγνώμη|Γεια||Ευχαριστώ||Παρακαλώ
Αρχάριος|What does 'Κρύο' mean?|Cold|Ζέστη||Ζεστό||Ξηρό
Αρχάριος|Word for 'Child':|Παιδί|Ενήλικας||Θείος||Θεία
Αρχάριος|How to say 'Yes' in Greek?|Ναι|Όχι||Ίσως||Ποτέ
Αρχάριος|What is 'Νύχτα'?|Night|Μέρα||Πρωί||Απόγευμα
Αρχάριος|Word for 'Strong':|Δυνατός|Αδύναμος||Γρήγορος||Αργός
Αρχάριος|How to say 'No'?|Όχι|Ναι||Συχνά||Πάντα
Αρχάριος|What is 'Ψάρι'?|Fish|Πουλί||Γάτα||Σκύλος
Αρχάριος|Word for 'White':|Άσπρο|Μαύρο||Γκρι||Καφέ
Αρχάριος|How to say 'Please'?|Παρακαλώ|Ευχαριστώ||Ναι||Όχι
Αρχάριος|What does 'Φως' mean?|Light|Σκοτάδι||Σκιά||Νύχτα
Αρχάριος|Word for 'Life':|Ζωή|Θάνατος||Ύπνος||Όνειρο
Αρχάριος|How do you say 'Book'?|Βιβλίο|Στυλό||Χαρτί||Τραπέζι
Αρχάριος|What is 'Φεγγάρι'?|Moon|Ήλιος||Αστέρι||Ουρανός
Αρχάριος|Word for 'Green':|Πράσινο|Κόκκινο||Μπλε||Κίτρινο
Αρχάριος|How to say 'Mother'?|Μητέρα|Πατέρας||Αδελφός||Αδελφή
Μέσος|How do you say 'Good luck'?|Καλή τύχη|Καλό ταξίδι||Καλή όρεξη||Περαστικά
Μέσος|What is 'Hope' in Greek?|Ελπίδα|Απελπισία||Χαρά||Ειρήνη
Μέσος|Translate: 'Everything is fine.'|Όλα είναι καλά|Όλα είναι χάλια||Δεν ξέρω||Περίμενε
Μέσος|What does 'Σιγά' mean?|Slowly|Γρήγορα||Δυνατά||Ήσυχα
Μέσος|How to say 'I am proud of you'?:|Είμαι περήφανος για σένα|Είμαι θυμωμένος||Σε περιμένω||Σε βλέπω
Μέσος|What is 'Έκπληξη' in English?|Surprise|Βαρεμάρα||Λύπη||Θυμός
Μέσος|Translate 'Experience':|Εμπειρία|Ελπίδα||Όνειρο||Καθήκον
Μέσος|How do you say 'Opportunity'?|Ευκαιρία|Εμπόδιο||Πρόβλημα||Αποτυχία
Μέσος|What does 'Πρόσεχε' mean?|Be careful|Να είσαι χαρούμενος||Να είσαι γρήγορος||Να είσαι σιωπηλός
Μέσος|Translate 'Important':|Σημαντικό|Εύκολο||Γρήγορο||Φτηνό
Μέσος|How do you say 'Health'?|Υγεία|Δύναμη||Πλούτος||Ομορφιά
Μέσος|What is 'Αυτοπεποίθηση'?|Self-confidence|Ντροπαλότητα||Φόβος||Τεμπελιά
Μέσος|Translate 'Environment':|Περιβάλλον|Δωμάτιο||Σπίτι||Δρόμος
Μέσος|How do you say 'Challenge'?|Πρόκληση|Δώρο||Βοήθεια||Υποστήριξη
Μέσος|What is 'Σκληρή δουλειά'?|Hard work|Τεμπέλικη μέρα||Εύκολο καθήκον||Ελεύθερος χρόνος
Μέσος|Translate 'Progress':|Πρόοδος|Οπισθοδρόμηση||Θάνατος||Γέννηση
Μέσος|How to say 'I agree'?|Συμφωνώ|Δεν θέλω||Είμαι μπερδεμένος||Φεύγω
Μέσος|What does 'Διαφορετικό' mean?|Different|Ίδιο||Ίσο||Παρόμοιο
Μέσος|Translate 'Respect':|Σεβασμός|Μίσος||Φόβος||Θυμός
Μέσος|How to say 'Believe'?|Πιστεύω|Αμφιβάλλω||Ρωτάω||Σωπαίνω
Μέσος|What is 'Μέλλον'?|Future|Παρελθόν||Παρόν||Σήμερα
Μέσος|Translate 'Create':|Δημιουργώ|Καταστρέφω||Περιμένω||Ψάχνω
Μέσος|How do you say 'Freedom'?|Ελευθερία|Εξάρτηση||Καθήκον||Βάρος
Μέσος|What is 'Συνεργασία'?|Collaboration|Ανταγωνισμός||Σύγκρουση||Αποφυγή
Μέσος|Translate 'Change':|Αλλαγή|Τάξη||Σιωπή||Τέλος
Μέσος|How to say 'Happy' (formal)?|Ευτυχισμένος|Δυστυχισμένος||Απογοητευμένος||Θυμωμένος
Μέσος|What is 'Συναισθήματα'?|Feelings|Σκέψεις||Πράξεις||Όραμα
Μέσος|Translate 'Grateful':|Ευγνώμων|Παραπονεμένος||Θυμωμένος||Λυπημένος
Μέσος|How to say 'Celebrate'?|Γιορτάζω|Κλαίω||Φεύγω||Ξεχνώ
Μέσος|What is 'Έμπνευση'?|Inspiration|Βαρεμάρα||Σιωπή||Φόβος
Μέσος|Translate 'Honest':|Ειλικρινής|Ανειλικρινής||Φοβισμένος||Αβέβαιος
Μέσος|How to say 'Beautiful' (scenery)?|Πανέμορφο|Άσχημο||Εντάξει||Βρώμικο
Μέσος|What is 'Επικοινωνία'?|Communication|Σιωπή||Καβγάς||Μάχη
Μέσος|Translate 'Kindness':|Καλοσύνη|Κακία||Μίσος||Θυμός
Μέσος|How to say 'Patience'?|Υπομονή|Θυμός||Ανησυχία||Φόβος
Προχωρημένος|Meaning of 'Μεράκι'?|Doing something with soul & love|Working slowly||Being tired||Buying expensive things
Προχωρημένος|Translate 'Freedom':|Ελευθερία|Φυλακή||Εργασία||Χρήματα
Προχωρημένος|What is 'Ευχία'?|A wish / Blessing|A curse||A gift||A song
Προχωρημένος|Meaning of 'Ευτυχία'?|Happiness / Contentment|Sadness||Wealth||Speed
Προχωρημένος|Final one! Casually say 'Cheers!'|Γεια μας!|Πάμε||Όχι||Ναι
Προχωρημένος|What is 'Πολυμορφία'?|Diversity|Ομοιομορφία||Ομοιότητα||Το ίδιο
Προχωρημένος|Translate 'Ακεραιότητα':|Integrity|Αμέλεια||Ψέμα||Απάτη
Προχωρημένος|Meaning of 'Ευημερία'?|Prosperity / Welfare|Φτώχεια||Δυστυχία||Δυσκολία
Προχωρημένος|What is 'Ανεξαρτησία'?|Independence|Εξάρτηση||Αδυναμία||Φόβος
Προχωρημένος|Translate 'Αλληλεγγύη':|Solidarity|Διχασμός||Μίσος||Ζήλια
Προχωρημένος|What is 'Σοφία'?|Wisdom|Ανοησία||Άγνοια||Απληστία
Προχωρημένος|Translate 'Ενσυναίσθηση':|Empathy / Compassion|Σκληρότητα||Μίσος||Θυμός
Προχωρημένος|Meaning of 'Βιωσιμότητα'?|Sustainability|Καταστροφή||Μόλυνση||Σπατάλη
Προχωρημένος|What is 'Δικαιοσύνη'?|Justice|Αδικία||Χάος||Διαφθορά
Προχωρημένος|Translate 'Αρμονία':|Harmony|Σύγκρουση||Θόρυβος||Θυμός
Προχωρημένος|Meaning of 'Κυριαρχία'?|Sovereignty|Σκλαβιά||Αποικιοκρατία||Διακυβέρνηση
Προχωρημένος|What is 'Κομψότητα'?|Elegance|Οξυδέρκεια||Ασχήμια||Αγένεια
Προχωρημένος|Translate 'Βιβλιοθήκη':|Library|Βιβλιοπωλείο||Σχολείο||Τάξη
Προχωρημένος|Meaning of 'Πίστη'?|Loyalty / Faith|Προδοσία||Μίσος||Θυμός
Προχωρημένος|What is 'Δημιουργικότητα'?|Creativity|Μίμηση||Βαρεμάρα||Τεμπελιά
Προχωρημένος|Translate 'Γενναιότητα':|Courage|Φόβος||Δειλία||Ντροπαλότητα
Προχωρημένος|Meaning of 'Ειλικρίνεια'?|Sincerity|Υποκρισία||Ψέμα||Απληστία
Προχωρημένος|What is 'Δόξα'?|Glory / Honor|Ντροπή||Ήττα||Απώλεια
Προχωρημένος|Translate 'Ψυχική υγεία':|Mental health|Σωματικός πόνος||Άρρωστο σώμα||Αδύναμο πνεύμα
Προχωρημένος|Meaning of 'Φιλοξενία'?|Hospitality|Αγένεια||Κρύο||Θυμός
Προχωρημένος|What is 'Θαύμα'?|Miracle|Καταστροφή||Ατύχημα||Συνηθισμένο
Προχωρημένος|Translate 'Ενδυνάμωση':|Empowerment|Περιορισμός||Αδυναμία||Φόβος
Προχωρημένος|Meaning of 'Επιμονή'?|Persistence / Endurance|Τέλος||Σταμάτημα||Σπατάλη
Προχωρημένος|What is 'Γενναιοδωρία'?|Generosity|Απληστία||Εγωισμός||Κακία
Προχωρημένος|Translate 'Καινοτομία':|Innovation|Στασιμότητα||Παράδοση||Παλιό`}
    speechLocale="el-GR"
    primaryColor="#3b82f6"
    primaryHover="#2563eb"
    resultTitle="Εξαιρετικά! (Excellent!)"
    resultMessage="Τα ελληνικά σου είναι υπέροχα!"
    retryLabel="Προσπαθήστε ξανά"
    levelLabels={{
      Αρχάριος: 'Beginner',
      Μέσος: 'Intermediate',
      Προχωρημένος: 'Advanced'
    }}
  />
);

export default GreekQuiz;
