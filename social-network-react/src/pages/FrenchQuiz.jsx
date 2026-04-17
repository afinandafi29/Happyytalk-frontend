import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FrenchQuiz = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const answeredRef = useRef(false);

  const rawData = useMemo(
    () =>
      `Débutant|Comment dit-on 'Happy' en français ?|Heureux|Triste||Fâché||Fatigué
Débutant|Un salut positif pour le matin :|Bonjour !|Au revoir||Bonne nuit||Tais-toi
Débutant|Le contraire de 'triste' :|Joyeux|Froid||Lourd||Petit
Débutant|Le chocolat est...|Délicieux|Méchant||Triste||Gris
Débutant|Qu'est-ce qu'on fait quand on est content ?|Sourire|Pleurer||Crier||Dormir
Débutant|Un ami est très ___.|Sympa|Moche||Sale||Vieux
Débutant|Le soleil est...|Brillant|Noir||Froid||Triste
Débutant|Merci ___ !|Beaucoup|Peu||Rien||Zéro
Débutant|J'aime les ___.|Fleurs|Douleurs||Guerres||Cris
Débutant|Aujourd'hui, c'est ___ !|Génial|Mauvais||Pire||Normal
Débutant|Un cadeau fait ___.|Plaisir|Peur||Mal||Bruit
Débutant|La vie est ___.|Belle|Grise||Cassée||Dure
Débutant|Tu es ___.|Fort|Nul||Petit||Gris
Débutant|Le gâteau est ___.|Bon|Mauvais||Triste||Vert
Débutant|Bonne ___ !|Chance|Malchance||Rien||Pluie
Débutant|Je t'___.|Aime|Mords||Regarde||Quitte
Débutant|C'est ___.|Parfait|Nul||Zéro||Mal
Débutant|Regarde cet ___ !|Oiseau|Trou||Mal||Noir
Débutant|Vive les ___ !|Vacances|Travaux||Devoirs||Pluies
Débutant|Tu es ___.|Gentil|Méchant||Fou||Gris
Débutant|Le ciel est ___.|Bleu|Cassé||Triste||Sale
Débutant|Miam ! C'est ___.|Sucré|Amer||Sale||Triste
Débutant|Une ___ journée !|Bonne|Mauvaise||Pire||Grise
Débutant|Bravo pour ton ___.|Succès|Échec||Rien||Mal
Intermédiaire|Je ___ très heureux aujourd'hui.|Suis|Ai||Fais||Vais
Intermédiaire|C'est le ___ jour de ma vie !|Plus beau|Pire||Moins beau||Petit
Intermédiaire|J'espère que tu ___ une bonne journée.|Passeras|Passes||Passais||Passe
Intermédiaire|Nous nous sommes bien ___.|Amusés|Aburris||Dormis||Partis
Intermédiaire|Quel ___ temps !|Merveilleux|Mauvais||Pluie||Sale
Intermédiaire|Tu ___ l'air joyeux !|As|Es||Fais||Vas
Intermédiaire|Je suis fier de ___.|Toi|Moi||Lui||Rien
Intermédiaire|Quelle ___ surprise !|Agréable|Mauvaise||Triste||Lourde
Intermédiaire|Tout ___ bien se passer.|Va|Est||Fait||A
Intermédiaire|C'est un plaisir de vous ___.|Voir|Quitter||Oublier||Gêner
Intermédiaire|Félicitations ___ votre promotion !|Pour|De||À||Par
Intermédiaire|Il fait un soleil ___.|Radiant|Noir||Triste||Caché
Intermédiaire|Je me sens ___ ici.|Bien|Mal||Loin||Seul
Intermédiaire|Tes paroles sont ___.|Encourageantes|Méchantes|Nulles||Tristes
Intermédiaire|On va ___ ensemble !|Célébrer|Pleurer||Dormir||Partir
Intermédiaire|C'est ___ gentil de ta part.|Tellement|Peu||Pas||Rien
Intermédiaire|Tu as fait du ___ travail.|Bon|Mauvais||Petit||Nul
Intermédiaire|___-toi bien !|Amuse|Dors||Tais||Va
Intermédiaire|Je suis ___ de ton aide.|Reconnaissant|Triste||Fatigué||Fâché
Intermédiaire|Le futur est ___.|Prometteur|Sombre||Fini||Gris
Intermédiaire|Quelle ___ ambiance !|Belle|Mauvaise||Triste||Lourde
Intermédiaire|J'aime ton ___ d'humour.|Sens|Froid||Rien||Jour
Intermédiaire|Un grand ___ à toi.|Merci|Non||Au revoir||Rien
Intermédiaire|On a ___ de la chance !|Beaucoup|Peu||Zéro||Pas
Intermédiaire|C'est ___ !|Magnifique|Moche||Sale||Triste
Avancé|Synonyme de 'très heureux' :|Épanoui|Morose||Apathique||Sévère
Avancé|Que signifie 'Euphorique' ?|Une joie intense|Une grande peur||Une fatigue||Une colère
Avancé|Une personne pleine d'énergie :|Pétillante|Léthargique||Sombre||Triste
Avancé|La 'félicité' est un état de ___.|Bonheur suprême|Doute total||Grande faim||Vide
Avancé|Un moment 'exquis' est ___.|Délicieux et raffiné|Affreux||Ennuyeux||Lourd
Avancé|L'___ est contagieux.|Enthousiasme|Ennui||Mépris||Doute
Avancé|Être 'comblé' signifie être ___.|Pleinement satisfait|Très vide||Perdu||Affamé
Avancé|La 'quiétude' est ___.|La tranquillité|Le bruit||La guerre||La peur
Avancé|Une réussite 'éclatante' :|Brillante et remarquable|Petite et nulle||Invisible||Triste
Avancé|Regarder avec 'admiration' :|Avec respect et plaisir|Avec dégoût||Avec peur||Sans rien
Avancé|Un accueil 'chaleureux' :|Très amical|Froid||Méchant||Rapide
Avancé|Vivre dans l'___.|Allégresse|Angoisse||Ombre||Pauvreté
Avancé|Un esprit 'optimiste' :|Positif|Négatif||Sombre||Fermé
Avancé|Être 'ravi' de quelque chose :|Très content|En colère||Fatigué||Triste
Avancé|Le 'ravissement' est ___.|Un enchantement|Un vol||Un cri||Une peur
Avancé|Une nouvelle 'réjouissante' :|Qui rend heureux|Triste||Ennuyeuse||Grise
Avancé|La 'sérénité' est importante.|Le calme|Le stress||La faim||La peur
Avancé|Une amitié 'indéfectible' :|Qui ne peut finir|Fragile|Méchante||Courte
Avancé|Se 'réjouir' de la réussite.|Être heureux pour|Être jaloux||Oublier||Partir
Avancé|Un geste 'magnanime' :|Généreux|Petit||Avare||Cruel
Avancé|Vivre en 'harmonie'.|En accord parfait|En guerre||Seul||Mal
Avancé|La 'gratitude' est une vertu.|La reconnaissance|L'orgueil||La faim||La peur
Avancé|Un avenir 'radieux' :|Très brillant|Noir||Incertain||Triste
Expert|Que signifie 'Être aux anges' ?|Être extrêmement heureux|Être mort||Être un oiseau||Avoir peur
Expert|'Avoir la pêche' signifie :|Avoir beaucoup d'énergie|Manger un fruit||Être fatigué||Aller à la pêche
Expert|'Voir la vie en rose' veut dire :|Être très optimiste|Porter des lunettes||Aimer les fleurs||Être triste
Expert|'Être sur son trente-et-un' :|Être très bien habillé|Avoir 31 ans||Être en retard||Être fatigué
Expert|Que signifie 'Avoir le cœur sur la main' ?|Être très généreux|Être malade||Être chirurgien||Avoir peur
Expert|'C'est du gâteau' veut dire :|C'est très facile|C'est l'heure du goûter||C'est sucré||C'est cher
Expert|'Se mettre sur son trente-et-un' pour une fête :|S'habiller élégamment|Arriver à 31h||Apporter 31 cadeaux||Partir tôt
Expert|'Être aux oiseaux' (Expression Québec) :|Être très joyeux|Vouloir voler||Avoir faim||Être perdu
Expert|'Une mine de rubis' signifie :|Un visage éclatant de santé|Une mine de pierres||Être riche||Être malade
Expert|'Sauter de joie' :|Être surexcité|Faire du sport||Tomber||Avoir peur
Expert|'Un rayon de soleil' :|Une personne qui apporte de la joie|Une lampe||Un coup de soleil||L'été
Expert|'Pleurer de joie' :|Être si heureux qu'on pleure|Être triste||Être blessé||Avoir mal
Expert|'Être dans son assiette' :|Se sentir bien|Manger beaucoup||Être un plat||Être perdu
Expert|'Avoir un moral d'acier' :|Avoir un moral très fort|Être un robot||Être dur||Être triste
Expert|'Nager dans le bonheur' :|Être totalement heureux|Aller à la piscine||Se noyer||Avoir de l'eau
Expert|'Mordre la vie à pleines dents' :|Profiter de la vie intensément|Aller chez le dentiste||Manger beaucoup||Être agressif
Expert|'Faire la fête' :|S'amuser beaucoup|Dormir||Travailler||Cuisiner
Expert|'Être sur un petit nuage' :|Être dans un rêve de bonheur|Avoir de la pluie||Être un pilote||Avoir froid
Expert|'C'est le pied !' signifie :|C'est super !|J'ai mal au pied||Je marche||C'est bas
Expert|'Un cœur d'or' :|Une grande bonté|Un cœur riche||Un bijou||Une maladie
Expert|'Il y a de la joie' :|L'ambiance est joyeuse|Il y a du bruit||Il y a du monde||Il pleut
Expert|'Boire du petit lait' :|Éprouver une grande satisfaction|Avoir faim||Aimer le lait||Être un bébé
Expert|'Être comme un poisson dans l'eau' :|Se sentir parfaitement à l'aise|Être mouillé|Aimer la mer||Avoir froid
Expert|'Prendre la vie du bon côté' :|Être optimiste|Tourner le dos||Dormir à droite||Être fâché
Expert|'Avoir un succès fou' :|Réussir énormément|Devenir fou||Avoir peur||Rien faire
`,
    [],
  );

  const questions = useMemo(() => {
    const parsed = rawData
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split('|');
        const [l, q, a, ...rest] = parts;
        const wRaw = rest.join('|');
        const w = wRaw.split('||').filter(Boolean);
        return { l, q, a, w };
      });
    return parsed.sort(() => Math.random() - 0.5);
  }, [rawData]);

  const speak = useCallback(
    (text) => {
      if (isMuted) return;
      if (typeof window === 'undefined') return;
      if (!('speechSynthesis' in window)) return;
      const cleanText = String(text).replace(
        /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
        '',
      );
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.85;
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    },
    [isMuted],
  );

  const shuffle = useCallback((arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, []);

  const loadQuestion = useCallback(
    (index) => {
      const q = questions[index];
      if (!q) return;
      answeredRef.current = false;
      setSelected(null);
      setOptions(shuffle([q.a, ...q.w]));
    },
    [questions, shuffle],
  );

  useEffect(() => {
    loadQuestion(0);
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [loadQuestion]);

  const handleSelect = (choice) => {
    if (answeredRef.current) return;
    answeredRef.current = true;
    setSelected(choice);
    speak(choice);
    const correct = questions[currentQuestion]?.a;
    if (choice === correct) setScore((s) => s + 1);
  };

  const next = () => {
    const nextIndex = currentQuestion + 1;
    if (nextIndex >= questions.length) {
      setShowResults(true);
      return;
    }
    setCurrentQuestion(nextIndex);
    loadQuestion(nextIndex);
  };

  const restart = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setScore(0);
    loadQuestion(0);
  };

  if (showResults) {
    return (
      <div className={`ht-voice ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <style>{voiceCss}</style>
        <div className="external-controls">
          <button className="back-button" onClick={() => navigate('/learning-languages')}>
            ← Back
          </button>
          <div className="theme-buttons">
            <button className={`theme-btn ${!isDarkMode ? 'active' : ''}`} onClick={() => setIsDarkMode(false)}>
              ☀️ Light
            </button>
            <button className={`theme-btn ${isDarkMode ? 'active' : ''}`} onClick={() => setIsDarkMode(true)}>
              🌙 Dark
            </button>
          </div>
        </div>
        <div className="container">
          <div className="result-screen">
            <h2>Bravo !</h2>
            <div className="score" style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--primary-blue)', margin: '20px 0' }}>
              {score}/{questions.length}
            </div>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              {score > 80 ? "Magnifique ! Vous parlez français comme un ange." : "Très bien ! Continuez à pratiquer."}
            </p>
            <button type="button" onClick={restart} className="try-again">
              Recommencer
            </button>
                        <button
              type="button"
              onClick={() => navigate('/ai-chat')}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f8cfc 0%, #d158e8 100%)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                boxShadow: '0 4px 20px rgba(79, 140, 252, 0.4)',
                zIndex: 1000,
              }}
              aria-label="Open AI Chat"
            >
              🤖
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const levelClass = String(q?.l || '').toLowerCase();
  const correct = q?.a;
  const canGoNext = answeredRef.current;

  return (
    <div className={`ht-voice ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <style>{voiceCss}</style>
      <div className="external-controls">
        <button className="back-button" onClick={() => navigate('/learning-languages')}>
          ← Back
        </button>
        <div className="theme-buttons">
          <button className={`theme-btn ${!isDarkMode ? 'active' : ''}`} onClick={() => setIsDarkMode(false)}>
            ☀️ Light
          </button>
          <button className={`theme-btn ${isDarkMode ? 'active' : ''}`} onClick={() => setIsDarkMode(true)}>
            🌙 Dark
          </button>
        </div>
      </div>
      <div className="container">
        <div className="question-box">
          <span className={`level-badge ${levelClass}`}>{q?.l}</span>
          <span className="qnum">Question {currentQuestion + 1} sur 100</span>
          <h2 style={{ margin: '0', fontSize: '1.3rem' }}>{q?.q}</h2>
          <div className="options" style={{ marginTop: '20px' }}>
            {options.map((opt) => {
              const isCorrect = answeredRef.current && opt === correct;
              const isWrong = answeredRef.current && selected === opt && opt !== correct;
              const cls = `option${isCorrect ? ' correct' : ''}${isWrong ? ' wrong' : ''}`;
              return (
                <div key={opt} className={cls} onClick={() => handleSelect(opt)}>
                  {opt}
                </div>
              );
            })}
          </div>
        </div>

        <button id="nextBtn" type="button" disabled={!canGoNext} onClick={next}>
          Question Suivante →
        </button>
                    <button
              type="button"
              onClick={() => navigate('/ai-chat')}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f8cfc 0%, #d158e8 100%)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                boxShadow: '0 4px 20px rgba(79, 140, 252, 0.4)',
                zIndex: 1000,
              }}
              aria-label="Open AI Chat"
            >
              🤖
            </button>
      </div>
    </div>
  );
};

const voiceCss = `
  :root {
    --primary-blue: #3b82f6;
    --light-blue: #eff6ff;
    --accent-blue: #2563eb;
    --white: #ffffff;
    --text-dark: #1a3a1b;
  }

  .dark-mode {
    --primary-blue: #3b82f6;
    --light-blue: #1a1a1a;
    --accent-blue: #2563eb;
    --primary-green: #3b82f6;
    --light-green: #1a1a1a;
    --accent-green: #2563eb;
    --white: #0d0d0d;
    --text-dark: #ffffff;
    --bg-green: #000000;
  }

  .light-mode {
    --primary-green: #3b82f6;
    --light-green: #f5f5f5;
    --accent-green: #2563eb;
    --white: #ffffff;
    --text-dark: #333333;
    --bg-green: #fafafa;
  }

  .ht-voice {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--bg-green);
    margin: 0;
    padding: 20px;
    color: var(--text-dark);
    min-height: 100vh;
    transition: all 0.3s ease;
  }

  .external-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto 20px auto;
    padding: 0 10px;
  }

  .back-button {
    background: var(--primary-green);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .back-button:hover {
    background: var(--accent-green);
    transform: translateY(-2px);
  }

  .theme-buttons {
    display: flex;
    gap: 8px;
    background: var(--light-green);
    padding: 4px;
    border-radius: 25px;
    border: 2px solid var(--primary-green);
  }

  .theme-btn {
    background: transparent;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.3s ease;
    color: var(--text-dark);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .theme-btn:hover {
    background: rgba(43, 160, 76, 0.1);
  }

  .theme-btn.active {
    background: var(--primary-green);
    color: white;
  }

  .container {
    max-width: 650px;
    margin: 0 auto;
    background: var(--white);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 12px 40px rgba(43, 94, 45, 0.1);
    position: relative;
    border: 1px solid #d1e2d1;
    min-height: 600px;
    transition: all 0.3s ease;
  }

  .question-box {
    background: var(--light-green);
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 20px;
    border-left: 5px solid var(--primary-green);
    position: relative;
  }

  .qnum {
    font-weight: bold;
    color: var(--accent-green);
    margin-bottom: 10px;
    display: block;
    font-size: 0.9rem;
  }

  .options {
    display: grid;
    gap: 10px;
  }

  .option {
    background: var(--white);
    border: 2px solid #e0e6e0;
    border-radius: 10px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1.1rem;
  }

  .option.correct {
    background: var(--primary-green) !important;
    color: white !important;
    border-color: var(--accent-green) !important;
  }
  .option.wrong {
    background: #fff1f0 !important;
    border-color: #ff7675 !important;
    color: #d63031 !important;
  }

  button#nextBtn {
    background: var(--primary-green);
    color: white;
    border: none;
    padding: 16px 45px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 12px;
    cursor: pointer;
    margin: 20px auto;
    display: block;
    width: 100%;
  }
  button#nextBtn:disabled {
    background: #ccd5cc;
    cursor: not-allowed;
  }

  .result-screen {
    text-align: center;
    padding: 40px 10px;
  }

  .try-again {
    background: var(--accent-green);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
  }

  .level-badge {
    display: inline-block;
    padding: 5px 14px;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;
  }
  .débutant {
    background: #e1eedb;
    color: #3d5a2b;
  }
  .intermédiaire {
    background: #badc58;
    color: #2d3e00;
  }
  .avancé {
    background: #6ab04c;
    color: #fff;
  }
  .expert {
    background: #2b5e2d;
    color: #fff;
  }
`;

export default FrenchQuiz;
