import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import './styles/main.css';
import './styles/mobile.css';

// Lazy load all page components
const AuthForm = lazy(() => import('./pages/Login'));
const ProfileCard = lazy(() => import('./pages/Profile'));
const SinglePostPage = lazy(() => import('./pages/SinglePost'));
const Moments = lazy(() => import('./pages/Moments'));
const NewFeed = lazy(() => import('./pages/NewFeed'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const OneToOneAbout = lazy(() => import('./pages/OneToOneAbout'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const FAQ = lazy(() => import('./pages/FAQ'));
const OneToOneFAQ = lazy(() => import('./pages/OneToOneFAQ'));
const OneToOneTerms = lazy(() => import('./pages/OneToOneTerms'));
const OneToOnePrivacy = lazy(() => import('./pages/OneToOnePrivacy'));
const OneToOneRules = lazy(() => import('./pages/OneToOneRules'));
const OmegleLanding = lazy(() => import('./pages/OmegleLanding'));
const OmegleSession = lazy(() => import('./pages/OmegleSession'));
const PremiumPage = lazy(() => import('./pages/PremiumPage'));
const NewsHome = lazy(() => import('./pages/News/NewsHome'));
const NewsSearch = lazy(() => import('./pages/News/NewsSearch'));
const NewsArticleDetail = lazy(() => import('./pages/News/NewsArticleDetail'));
const NewsTopStories = lazy(() => import('./pages/News/NewsTopStories'));
const YouTube = lazy(() => import('./pages/YouTube'));
const Movies = lazy(() => import('./pages/Movies'));
const Chat = lazy(() => import('./pages/Chat'));
const OneToOne = lazy(() => import('./pages/OneToOne'));
const Music = lazy(() => import('./pages/Music'));
const LiveTV = lazy(() => import('./pages/LiveTV'));
const Admin = lazy(() => import('./pages/Admin'));
const AIChat = lazy(() => import('./pages/AIChat'));
const Apps = lazy(() => import('./pages/Apps'));
const QuizCategories = lazy(() => import('./pages/QuizCategories'));
const QuizApp = lazy(() => import('./pages/QuizApp'));
const Learning = lazy(() => import('./pages/Learning'));
const Store = lazy(() => import('./pages/Store'));
const LearningLanguages = lazy(() => import('./pages/LearningLanguages'));
const BasicLearning = lazy(() => import('./pages/BasicLearning'));
const IPadHome = lazy(() => import('./pages/IPadHome'));
const EnglishQuiz = lazy(() => import('./pages/EnglishQuiz'));
const SpanishQuiz = lazy(() => import('./pages/SpanishQuiz'));
const FrenchQuiz = lazy(() => import('./pages/FrenchQuiz'));
const JapaneseQuiz = lazy(() => import('./pages/JapaneseQuiz'));
const GermanQuiz = lazy(() => import('./pages/GermanQuiz'));
const KoreanQuiz = lazy(() => import('./pages/KoreanQuiz'));
const ItalianQuiz = lazy(() => import('./pages/ItalianQuiz'));
const ChineseQuiz = lazy(() => import('./pages/ChineseQuiz'));
const HindiQuiz = lazy(() => import('./pages/HindiQuiz'));
const RussianQuiz = lazy(() => import('./pages/RussianQuiz'));
const PortugueseQuiz = lazy(() => import('./pages/PortugueseQuiz'));
const TurkishQuiz = lazy(() => import('./pages/TurkishQuiz'));
const DutchQuiz = lazy(() => import('./pages/DutchQuiz'));
const GreekQuiz = lazy(() => import('./pages/GreekQuiz'));
const VietnameseQuiz = lazy(() => import('./pages/VietnameseQuiz'));
const PolishQuiz = lazy(() => import('./pages/PolishQuiz'));
const SwedishQuiz = lazy(() => import('./pages/SwedishQuiz'));
const LatinQuiz = lazy(() => import('./pages/LatinQuiz'));
const IndonesianQuiz = lazy(() => import('./pages/IndonesianQuiz'));
const Calculator = lazy(() => import('./pages/Calculator'));
const CalendarApp = lazy(() => import('./pages/CalendarApp'));
const ClockApp = lazy(() => import('./pages/ClockApp'));
const NotesApp = lazy(() => import('./pages/NotesApp'));
const Maps = lazy(() => import('./pages/Maps'));
const Countries = lazy(() => import('./pages/Countries'));
const TruthOrDare = lazy(() => import('./pages/TruthOrDare'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const CoreFeatures = lazy(() => import('./pages/CoreFeatures'));
const ReportIssue = lazy(() => import('./pages/ReportIssue'));
const CommunityStandards = lazy(() => import('./pages/CommunityStandards'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));
const SafetyCenter = lazy(() => import('./pages/SafetyCenter'));
const Verification = lazy(() => import('./pages/Verification'));
const Contact = lazy(() => import('./pages/Contact'));
const Events = lazy(() => import('./pages/Events'));
const Translator = lazy(() => import('./pages/Translator'));
const Whiteboard = lazy(() => import('./pages/Whiteboard'));
const Dictionary = lazy(() => import('./pages/Dictionary'));
const UnsplashApp = lazy(() => import('./pages/UnsplashApp'));
const Games = lazy(() => import('./pages/Games'));
const ThemeApp = lazy(() => import('./pages/ThemeApp'));
const WatchParty = lazy(() => import('./pages/WatchParty'));

// Protected Route component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/in" />;
}

// Public Route component (for login/register)
function PublicRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          {/* Auth routes */}
          <Route path="/in" element={
            <PublicRoute>
              <AuthForm />
            </PublicRoute>
          } />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Standalone pages */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/feed" element={<NewFeed />} />

          {/* Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/features" element={<CoreFeatures />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/community-standards" element={<CommunityStandards />} />
            <Route path="/safety-center" element={<SafetyCenter />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiesPolicy />} />

            <Route path="/jitsi" element={<Home />} />
            <Route path="/moments" element={<Moments />} />
            <Route path="/profile" element={
              <PrivateRoute>
                <ProfileCard />
              </PrivateRoute>
            } />
            <Route path="/profile/:userId" element={
              <PrivateRoute>
                <ProfileCard />
              </PrivateRoute>
            } />
            <Route path="/posts/:postId" element={<SinglePostPage />} />
            <Route path="/create-room" element={<Navigate to="/" replace />} />

            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/events" element={<Events />} />


            {/* News Routes */}
            <Route path="/news" element={<NewsHome />} />
            <Route path="/news/top" element={<NewsTopStories />} />
            <Route path="/news/search" element={<NewsSearch />} />
            <Route path="/news/article/:uuid" element={<NewsArticleDetail />} />

            {/* YouTube Route */}
            <Route path="/youtube" element={<YouTube />} />
            <Route path="/movies" element={<Movies />} />

            {/* Chat Route */}
            <Route path="/chat" element={<Chat />} />

            {/* Music Route */}
            <Route path="/music" element={<Music />} />
            <Route path="/music/callback" element={<Music />} />

            {/* Live Route */}
            <Route path="/live" element={<LiveTV />} />


            {/* Apps Route */}
            <Route path="/apps" element={<Apps />} />
            <Route path="/quizzes" element={<QuizCategories />} />
            <Route path="/quiz/:id" element={<QuizApp />} />

            {/* Learning Route */}
            <Route path="/learning" element={<Learning />} />

            {/* Learning Languages Route */}
            <Route path="/learning-languages" element={<LearningLanguages />} />
            <Route path="/basic-learning" element={<BasicLearning />} />

            {/* iPad Home Route */}
            <Route path="/ipad" element={<IPadHome />} />

            {/* Quiz Routes */}
            <Route path="/english-quiz" element={<EnglishQuiz />} />
            <Route path="/spanish-quiz" element={<SpanishQuiz />} />
            <Route path="/french-quiz" element={<FrenchQuiz />} />
            <Route path="/japanese-quiz" element={<JapaneseQuiz />} />
            <Route path="/german-quiz" element={<GermanQuiz />} />
            <Route path="/korean-quiz" element={<KoreanQuiz />} />
            <Route path="/italian-quiz" element={<ItalianQuiz />} />
            <Route path="/chinese-quiz" element={<ChineseQuiz />} />
            <Route path="/hindi-quiz" element={<HindiQuiz />} />
            <Route path="/russian-quiz" element={<RussianQuiz />} />
            <Route path="/portuguese-quiz" element={<PortugueseQuiz />} />
            <Route path="/turkish-quiz" element={<TurkishQuiz />} />
            <Route path="/dutch-quiz" element={<DutchQuiz />} />
            <Route path="/greek-quiz" element={<GreekQuiz />} />
            <Route path="/vietnamese-quiz" element={<VietnameseQuiz />} />
            <Route path="/polish-quiz" element={<PolishQuiz />} />
            <Route path="/swedish-quiz" element={<SwedishQuiz />} />
            <Route path="/latin-quiz" element={<LatinQuiz />} />
            <Route path="/indonesian-quiz" element={<IndonesianQuiz />} />

            {/* Utility Apps Routes */}
            <Route path="/calculator" element={<Calculator />} />
          </Route>

          {/* Standing Alone Sub-Apps */}
          <Route path="/translator" element={<Translator />} />
          <Route path="/whiteboard" element={<Whiteboard />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/unsplash" element={<UnsplashApp />} />
          <Route path="/games" element={<Games />} />
          <Route path="/theme" element={<ThemeApp />} />
          <Route path="/watch-party" element={<WatchParty />} />

          <Route path="/1to1" element={<OneToOne />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/store" element={<Store />} />
          <Route path="/calendar-app" element={<CalendarApp />} />
          <Route path="/clock-app" element={<ClockApp /> } />
          <Route path="/notes-app" element={<NotesApp />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/truth-or-dare" element={<TruthOrDare />} />
          <Route path="/oto-about" element={<OneToOneAbout />} />
          <Route path="/oto-privacy" element={<OneToOnePrivacy />} />
          <Route path="/oto-terms" element={<OneToOneTerms />} />
          <Route path="/oto-faq" element={<OneToOneFAQ />} />
          <Route path="/oto-rules" element={<OneToOneRules />} />

          {/* 404 No Found route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router >
  );
}

export default App;