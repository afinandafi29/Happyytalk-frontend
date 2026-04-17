import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JapaneseQuiz = () => {
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
      `Beginner|How do you say 'Happy' in Japanese?|嬉しい (Ureshii)|悲しい (Kanashii)||怒る (Okoru)||眠い (Nemui)
Beginner|A standard happy greeting for morning:|おはよう！ (Ohayou!)|さよなら (Sayonara)||おやすみ (Oyasumi)||だめ (Dame)
Beginner|Which word means 'Fun'?|楽しい (Tanoshii)|長い (Nagai)||重い (Omoi)||怖い (Kowai)
Beginner|What is 'Thank you' in Japanese?|ありがとう (Arigatou)|すみません (Sumimasen)||ごめん (Gomen)||はい (Hai)
Beginner|How to say 'Delicious'?|美味しい (Oishii)|不味い (Mazui)||熱い (Atsui)||痛い (Itai)
Beginner|Translate 'Smile' into Japanese:|笑顔 (Egao)|涙 (Namida)||鼻 (Hana)||耳 (Mimi)
Beginner|What is 'Good luck'?|頑張って！ (Ganbatte!)|待って (Matte)||止めて (Yamete)||座って (Suwatte)
Beginner|What is 'Friend'?|友達 (Tomodachi)|敵 (Teki)||他人 (Tanin)||鬼 (Oni)
Beginner|Opposite of 'Sad' (Kanashii):|幸せ (Shiawase)|苦しい (Kurushii)||忙しい (Isogashii)||寂しい (Sabishii)
Beginner|I ___ my new puppy.|love|hate||fear||ignore
Beginner|A 'Party' is usually...|Fun|Tiring||Sad||Lonely
Beginner|What do you say after a gift?|Thank you!|Is that it?||No thanks||Take it back
Beginner|I am ___ to meet you!|glad|mad||sad||bad
Beginner|A happy baby ___.|giggles|cries||fights||works
Beginner|Friends are ___.|great|scary||boring||small
Beginner|If you have 'joy', you are...|Happy|Hungry||Thirsty||Lost
Beginner|A 'treat' makes people...|Smile|Angry||Cough||Run
Beginner|How is a sunny day?|Beautiful|Ugly||Terrible||Awful
Beginner|What color is often 'happy'?|Yellow|Grey||Black||Brown
Beginner|When you like a joke, you...|Laugh|Sleep||Knit||Bake
Beginner|Best way to start a day?|A big hug!|A loud yell||A sad song||A broken cup
Beginner|Playing with toys is...|Playful|Mean||Dirty||Old
Beginner|A happy bird...|Sings|Bites||Hides||Cries
Beginner|Ice cream tastes...|Delicious|Spicy||Salty||Painful
Beginner|I ___ my best friend.|trust|flee||bite||scold
Beginner|Warm weather feels...|Nice|Hard||Broken||Sharp
Intermediate|Which particle is used for 'I am happy'?|私は嬉しいです (wa)|私は嬉しいを||私は嬉しいに||私は嬉しいへ
Intermediate|How to say 'It was fun' (Past tense)?|楽しかったです|楽しいでした||楽しかっただ||楽しいかったです
Intermediate|Translate: 'Best friend'|親友 (Shinyuu)|新友||心友||真友
Intermediate|'To become happy' is...|幸せになる|幸せにする||幸せにみる||幸せにいう
Intermediate|What does '最高' (Saikou) mean?|The best / Awesome|The worst||Average||Minimum
Intermediate|Choose the kanji for 'Safe/Relief':|安心 (Anshin)|安神||安新||安進
Intermediate|Translate: 'I hope you win.'|勝てますように|負けますように||寝られますように||帰りますように
Intermediate|What is 'Hope' in Kanji?|希望 (Kibou)|失望 (Shitsubou)||野望 (Yabou)||絶望 (Zetsubou)
Intermediate|Which is 'To laugh'?|笑う (Warau)|洗う (Arau)||払う (Harau)||習う (Narau)
Intermediate|How to say 'I'm looking forward to it'?|楽しみにしています|悲しみにしています||苦しみにしています||お大事にしています
Intermediate|Kanji for 'Dream':|夢 (Yume)|目 (Me)||草 (Kusa)||花 (Hana)
Intermediate|Translate: 'You are kind.'|あなたは優しいですね|あなたは易しいですね||あなたは厳しいですね||あなたは寂しいですね
Intermediate|What is 'Gratitude' in Japanese?|感謝 (Kansha)|謝罪 (Shazai)||講義 (Kougi)||返事 (Henji)
Intermediate|The feeling of 'Refreshing':|すっきり (Sukkiri)|がっかり (Gakkari)||のんびり (Nonbiri)||ゆっくり (Yukkuri)
Intermediate|How to say 'I'm moved/touched'?|感動しました (Kandou shimashita)|勘当しました||活動しました||完成しました
Intermediate|Choose the word for 'Success':|成功 (Seikou)|精巧||正確||性格
Intermediate|What is 'To praise'?|褒める (Homeru)|責める (Semeru)||辞める (Yameru)||認める (Mitomeru)
Intermediate|Translate: 'It's a beautiful view.'|綺麗な景色ですね|汚い景色ですね||怖い景色ですね||静かな景色ですね
Intermediate|Meaning of 'Pika-pika'?|Sparkling/Shiny|Heavy||Dark||Noisy
Intermediate|How to say 'Warm/Mild' (Weather)?|暖かい (Atatakai)|涼しい (Suzushii)||寒い (Samui)||蒸し暑い (Mushiatsui)
Intermediate|Word for 'Gentle/Quiet' breeze:|そよ風 (Soyokaze)|強風 (Kyoufuu)||台風 (Taifuu)||北風 (Kitakaze)
Intermediate|Kanji for 'Celebration/Congratulation':|祝 (Iwai)|呪 (Noroi)||殺 (Satsu)||死 (Shi)
Intermediate|Translate: 'It's going well.'|順調です (Junchou desu)|不調です||中止です||終了です
Intermediate|What is 'Energy/Health'?|元気 (Genki)|病気 (Byouki)||天気 (Tenki)||勇気 (Yuuki)
Advanced|How to say 'You look great today'?|今日は素敵ですね|今日は普通ですね||今日は変ですね||今日は同じですね
Advanced|What does '一期一会' (Ichigo Ichie) mean?|Once-in-a-lifetime encounter|Everyday meeting||Goodbye forever||Strawberry party
Advanced|What does 'Komorebi' (木漏れ日) mean?|Sunlight filtering through trees|Forest fire||Rainy day||Dark cave
Advanced|What is 'To respect' someone?|尊敬する (Sonkei suru)|軽蔑する (Keibetsu suru)||心配する||無視する
Advanced|Translate: 'I am proud of you.'|あなたを誇りに思います|あなたを怒っています||あなたを忘れます||あなたを許します
Advanced|Word for 'Mutual help':|助け合い (Tasukeai)|殴り合い||見合い||奪い合い
Advanced|Meaning of 'Kokoro'?|Heart / Soul / Mind|Head||Stomach||Hand
Advanced|How to say 'Comfortable/Pleasant'?|心地よい (Kokochiyoi)|不快な (Fukaina)||硬い||重い
Advanced|Expression for 'Giving it your all':|一生懸命 (Isshoukenmei)|適当 (Tekitou)||半分半分||不真面目
Advanced|What is 'Omotenashi'?|Japanese hospitality|A type of sushi||Traditional dance||Cleaning clothes
Advanced|Meaning of 'En-musubi'?|Connecting fates/Love knot|Tying shoes||Cutting string||Eating rice
Advanced|Word for 'Blooming' (Flower):|開花 (Kaika)|落花 (Rakka)||枯れる||散る
Advanced|What is 'Zekkou' (絶好)?|Perfect / Best condition|Broken relationship||Worst weather||Cancellation
Advanced|Meaning of 'En-musubi'?|Connecting fates/Love knot|Tying shoes||Cutting string||Eating rice
Advanced|To 'Cherish' something:|大切にする (Taisetsu ni suru)|捨てる||壊す||汚す
Advanced|Word for 'Brilliant/Dazzling':|輝かしい (Kagayakashii)|汚らわしい||重苦しい||みすぼらしい
Advanced|Meaning of 'Manpuku' (満腹)?|Stomach is full/Happy|Stomach is empty||Feeling sick||Hurrying
Advanced|What is 'Zekkou' (絶好)?|Perfect / Best condition|Broken relationship||Worst weather||Cancellation
Advanced|To 'Glow' or 'Shine':|輝く (Kagayaku)|消える||曇る||隠れる
Advanced|Translate: 'Your dream will come true.'|夢は叶います|夢は壊れます||夢は終わります||夢は忘れます
Advanced|Expression of 'Relief' (Exhaling):|ホッとする (Hotto suru)|イライラする||ドキドキする||ハラハラする
Advanced|What is 'Kizuna' (絆)?|Bonds between people|Scars||Enemies||Distance
Advanced|To 'Cherish' something:|大切にする (Taisetsu ni suru)|捨てる||壊す||汚す
Advanced|How to say 'It's a miracle!'?|奇跡です！ (Kiseki desu!)|失敗です||普通です||昨日です
Advanced|What is 'Endless' (Happiness)?|無限の (Mugen no)|有限の||一瞬の||少しの
Advanced|To 'Glow' or 'Shine':|輝く (Kagayaku)|消える||曇る||隠れる
Advanced|Translate: 'You have a nice personality.'|性格がいいですね|性格が悪いですね||性格が怖いですね||性格が暗いですね
Expert|What is 'Tanoshimi-da ne'?|I can't wait / Looking forward to it|It was boring||I am tired||I am busy
Expert|'Hana yori dango' means...|Dumplings over flowers (Practicality)|Flowers are better||Eating is bad||Winter is coming
Expert|'Oni ni kanabou' (Stronger with help) is like...|Giving a club to an ogre|Giving water to a fish||Giving fire to a tree
Expert|'Nanakorobi yaoki' means...|Fall seven times, get up eight|Keep falling down||Sleep eight hours||Walk seven miles
Expert|'Ishinoue nimo sannen' means...|Perseverance prevails|Stone is cold||Three years is too long||Sitting is bad
Expert|'Iki-iki' (いきいき) means...|Lively and vividly|Slowly||Quietly||Sadly
Expert|How to say 'May happiness come to you'?|幸運を祈ります (Kouun o inorimasu)|不幸を祈ります||眠りを祈ります||雨を祈ります
Expert|What is 'Hare-butai' (晴れ舞台)?|Great public occasion/Big stage|Rainy theater||Empty room||Dark forest
Expert|'Me kara uroko' (Scales from eyes) means...|Being shown the truth/Aha moment|Eyes are hurting||Eating fish||Being blind
Expert|What is 'O-negai'?|A polite favor/wish|A command||A curse||An answer
Expert|What is 'Zenryoku Toukyuu' (全力投球)?|Giving one's best effort|Throwing trash away||Sleeping all day||Giving up midway
Expert|'Warau kado niwa fuku kitaru' means...|Fortune comes to a merry home|Laughter is loud||Close the door||Money is everything
Expert|What is 'Gokuraku' (極楽)?|Paradise / Pure bliss|Hell||Prison||Office
Expert|'Yume no you na' (夢のような) means...|Like a dream|Like a nightmare||Like reality||Like a stone
Expert|'Heart is warm'?|心が温まる (Kokoro ga atatamaru)|心が冷える||心が痛い||心が重い
Expert|What is 'Shunpuu' (春風)?|Spring breeze (Gentle/Happy)|Winter storm||Falling leaves||Hot sun
Expert|'Medetai' (めでたい) means...|Auspicious / Happy event|Disastrous||Normal||Sad
Expert|Meaning of 'Go-en' (ご縁)?|Fate / Connection|Money only||Goodbye||Hatred
Expert|What is 'Shiawase-mono'?|A lucky/happy person|A poor person||A criminal||A ghost
Expert|How to say 'Everything is perfect'?|全てが完璧です (Subete ga kanpeki desu)|全てがダメです||少しだけいいです||何もありません
Expert|Meaning of 'Kibou no hikari'?|Light of hope|Darkness of fear||Shadow of doubt||Heat of anger
Expert|What is 'Yorokobi' (喜び)?|Joy / Pleasure|Anger||Boredom||Sorrow
Expert|'Uki-uki' (うきうき) means...|Cheerful / Floating with joy|Sinking with sadness|Heavy||Angry
Expert|How to say 'I'm very satisfied'?|大満足です (Daimanzoku desu)|不満足です||普通です||疲れました
Expert|Last one! 'Zutto issho' means...|Together forever|Go away||Be alone||Forget everything`,
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
      utterance.rate = 0.9;
      utterance.lang = 'ja-JP';
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
            <h2>お疲れ様でした！ (Well Done!)</h2>
            <div className="score" style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--primary-blue)', margin: '20px 0' }}>
              {score}/{questions.length}
            </div>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              {score > 80 ? "素晴らしい！ (Wonderful!) You are a Japanese Master." : "よく頑張りました！ (Well done!) Keep practicing."}
            </p>
            <button type="button" onClick={restart} className="try-again">
              もう一度挑戦する
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
          <span className="qnum">Question {currentQuestion + 1} / 100</span>
          <h2>{q?.q}</h2>
          <div className="options">
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
          次へ進む (Next) →
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
    --dark-blue: #2563eb;
    --light-blue: #eff6ff;
    --accent-blue: #60a5fa;
    --white: #ffffff;
    --text-dark: #2c3e50;
  }

  .dark-mode {
    --primary-blue: #3b82f6;
    --light-blue: #1a1a1a;
    --accent-blue: #60a5fa;
    --white: #0d0d0d;
    --text-dark: #ffffff;
    --bg-blue: #000000;
  }

  .light-mode {
    --primary-blue: #3b82f6;
    --light-blue: #f5f5f5;
    --accent-blue: #60a5fa;
    --white: #ffffff;
    --text-dark: #2c3e50;
    --bg-blue: #fafafa;
  }

  .ht-voice {
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
    background-color: var(--bg-blue);
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
    background: var(--primary-blue);
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
    background: var(--dark-blue);
    transform: translateY(-2px);
  }

  .theme-buttons {
    display: flex;
    gap: 8px;
    background: var(--light-blue);
    padding: 4px;
    border-radius: 25px;
    border: 2px solid var(--primary-blue);
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
    background: rgba(59, 130, 246, 0.12);
  }

  .theme-btn.active {
    background: var(--primary-blue);
    color: white;
  }

  .container {
    max-width: 650px;
    margin: 0 auto;
    background: var(--white);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.15);
    position: relative;
    border-top: 8px solid var(--primary-blue);
    min-height: 600px;
    transition: all 0.3s ease;
  }

  .question-box {
    background: var(--light-blue);
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 20px;
    border: 1px solid #bfdbfe;
  }

  .qnum {
    color: var(--primary-blue);
    font-weight: bold;
    font-size: 0.9rem;
    display: block;
    margin-bottom: 5px;
  }

  .options {
    display: grid;
    gap: 12px;
  }

  .option {
    background: var(--white);
    border: 2px solid #e1e8e1;
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 1.1rem;
    line-height: 1.4;
  }

  .option.correct {
    background: var(--primary-blue) !important;
    color: white !important;
    border-color: var(--dark-blue) !important;
  }
  .option.wrong {
    background: #ffebee !important;
    border-color: #ef5350 !important;
    color: #c62828 !important;
  }

  button#nextBtn {
    background: var(--dark-blue);
    color: white;
    border: none;
    padding: 16px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 50px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
  }
  button#nextBtn:disabled {
    background: #cfd8dc;
    cursor: not-allowed;
  }

  .result-screen {
    text-align: center;
    padding: 40px 10px;
  }

  .try-again {
    background: var(--primary-blue);
    color: white;
    border: none;
    padding: 15px 40px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
  }

  .level-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .beginner {
    background: #dbeafe;
    color: #1e3a8a;
  }
  .intermediate {
    background: #bfdbfe;
    color: #1e3a8a;
  }
  .advanced {
    background: #60a5fa;
    color: #fff;
  }
  .expert {
    background: #2563eb;
    color: #fff;
  }
`;

export default JapaneseQuiz;
