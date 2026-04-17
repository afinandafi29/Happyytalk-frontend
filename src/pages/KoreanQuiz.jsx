import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KoreanQuiz = () => {
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
      `초급|How do you say 'Happy' in Korean?|행복해요 (Haeng-bok-hae-yo)|슬퍼요 (Seul-peo-yo)||화나요 (Hwa-na-yo)||피곤해요 (Pi-gon-hae-yo)
초급|A positive way to say 'Hello'?|안녕하세요! (An-nyeong-ha-se-yo)|잘 가요 (Jal ga-yo)||안돼요 (An-dwae-yo)||바빠요 (Ba-ppa-yo)
초급|What does '좋아요 (Jo-a-yo)' mean?|I like it / It's good|I hate it||It's cold||I'm sorry
초급|How do you say 'Thank you' politely?|감사합니다 (Gam-sa-ham-ni-da)|미안합니다 (Mi-an-ham-ni-da)||맛있습니다 (Ma-sit-seum-ni-da)||실례합니다 (Sil-lye-ham-ni-da)
초급|What do you say when food is delicious?|맛있어요! (Ma-si-sseo-yo!)|맛없어요 (Ma-deop-seo-yo)||짜요 (Jja-yo)||매워요 (Mae-wo-yo)
초급|How to say 'Cheer up' or 'Fighting!'?|파이팅! (Pa-i-ting!)|그만해 (Geu-man-hae)||하지마 (Ha-ji-ma)||몰라요 (Mol-la-yo)
초급|Which word means 'Friend'?|친구 (Chin-gu)|선생님 (Seon-saeng-nim)||학생 (Hak-saeng)||의사 (Ui-sa)
초급|How to say 'I love you'?|사랑해요 (Sa-rang-hae-yo)|노래해요 (No-rae-hae-yo)||공부해요 (Gong-bu-hae-yo)||일해요 (Il-hae-yo)
초급|The Korean word for 'Dream':|꿈 (Kkum)|잠 (Jam)||빵 (Ppang)||꽃 (Kkot)
초급|How to say 'It's okay'?|괜찮아요 (Gwaen-cha-na-yo)|어려워요 (Eo-ryeo-wo-yo)||시끄러워요 (Si-kkeu-reo-wo-yo)||무서워요 (Mu-seo-wo-yo)
초급|What is 'Smile' or 'Laughter'?|웃음 (U-seum)|울음 (U-reum)||화 (Hwa)||잠 (Jam)
초급|Translate 'Beautiful' (scenery/person):|아름다워요 (A-reum-da-wo-yo)|더러워요 (Deo-reo-wo-yo)||작아요 (Ja-ga-yo)||멀어요 (Meo-reo-wo-yo)
초급|How to say 'Success'?|성공 (Seong-gong)|실패 (Sil-pae)||숙제 (Suk-je)||사고 (Sa-go)
초급|What do you say when you meet someone for the first time?|반가워요 (Ban-ga-wo-yo)|비싸요 (Bi-ssa-yo)||빨라요 (Ppal-la-yo)||졸려요 (Jol-lyeo-yo)
초급|Korean word for 'Sun':|해 (Hae)|달 (Dal)||물 (Mul)||흙 (Heuk)
초급|How to say 'Today is a good day'?|오늘 좋은 날이에요|오늘 추운 날이에요||오늘 슬픈 날이에요||오늘 나쁜 날이에요
초급|What is 'Gift'?|선물 (Seon-mul)|숙제 (Suk-je)||물건 (Mul-geon)||가방 (Ga-bang)
초급|Translate 'Super' or 'Great':|대박! (Dae-bak!)|아이구 (Ai-gu)||진짜 (Jin-jja)||어머 (Eo-meo)
초급|How to say 'Let's go together'?|같이 가요 (Ga-chi ga-yo)|혼자 가요 (Hon-ja ga-yo)||안 가요 (An ga-yo)||빨리 가요 (Ppal-li ga-yo)
초급|Which word means 'Hope'?|희망 (Hui-mang)|절망 (Jeol-mang)||거짓말 (Geo-jit-mal)||불안 (Bul-an)
초급|What is 'Family'?|가족 (Ga-jok)|회사 (Hoe-sa)||학교 (Hak-gyo)||병원 (Byeong-won)
초급|How to say 'You are pretty'?|예뻐요 (Ye-ppeo-yo)|미워요 (Mi-wo-yo)||나빠요 (Na-ppa-yo)||커요 (Keo-yo)
초급|The word for 'Peace':|평화 (Pyeong-hwa)|전쟁 (Jeon-jaeng)||싸움 (Ssa-um)||화 (Hwa)
초급|What is 'Luck' or 'Fortune'?|운 (Un)|돈 (Don)||힘 (Him)||길 (Gil)
초급|How to say 'I'm glad'?|다행이에요 (Da-haeng-i-e-yo)|불행해요 (Bul-haeng-hae-yo)||속상해요 (Sok-sang-hae-yo)||지루해요 (Ji-ru-hae-yo)
중급|Fill in the blank: 기분이 ___ (I feel good).|좋아요|나빠요||슬퍼요||높아요
중급|How to say 'I will make you happy'?|행복하게 해줄게요|행복하게 할게요||행복해서 할게요||행복하고 할게요
중급|What is the polite way to say 'Please give me...'?|주세요 (Ju-se-yo)|주네 (Ju-ne)||주마 (Ju-ma)||줬다 (Jwot-da)
중급|How to say 'I am moved/touched'?|감동받았어요 (Gam-dong-ba-da-sseo-yo)|감기 걸렸어요||깜짝 놀랐어요||실망했어요
중급|What is 'Kindness' or 'Heart'?|마음 (Ma-eum)|머리 (Meo-ri)||다리 (Da-ri)||어깨 (Eo-kkae)
중급|Translate: 'It's fun' (Amusing/Entertaining)|재미있어요 (Jae-mi-it-seo-yo)|어려워요||무거워요||재미없어요
중급|How to say 'I am proud of you'?|네가 자랑스러워 (Ne-ga ja-rang-seu-reo-wo)|네가 부러워||네가 미워||네가 무서워
중급|What is 'Passion'?|열정 (Yeol-jeong)|냉정 (Naeng-jeong)||심정 (Sim-jeong)||표정 (Pyo-jeong)
중급|How to say 'I promise'?|약속할게요 (Yak-sok-hal-ge-yo)|요청할게요||거절할게요||무시할게요
중급|Which particle means 'and' (with friends)?|친구와 (wa)|친구를||친구에||친구의
중급|How to say 'Everything is going well'?|다 잘 되고 있어요|다 안 되고 있어요||다 끝났어요||다 버렸어요
중급|What is 'Health'?|건강 (Geon-gang)|질병 (Jil-byeong)||약국 (Yak-guk)||수술 (Su-sul)
중급|Translate: 'You can do it!'|할 수 있어요! (Hal su it-seo-yo!)|할 수 없어요||하지 마세요||하기 싫어요
중급|What is 'Confidence'?|자신감 (Ja-sin-gam)|불안감 (Bul-an-gam)||위기감 (Wi-gi-gam)||열등감 (Yeol-deung-gam)
중급|How to say 'Take care' (Safe trip)?|잘 다녀오세요 (Jal da-nyeo-o-se-yo)|잘 자요||잘 먹어요||잘 가요
중급|What is 'Sincerely' or 'Truly'?|진심으로 (Jin-sim-eu-ro)|가짜로||대충||갑자기
중급|How to say 'I had a good meal' (After eating)?|잘 먹었습니다 (Jal meo-geot-seum-ni-da)|배고파요||맛있어요||잘 먹겠습니다
중급|What is 'Encouragement'?|격려 (Gyeok-ryeo)|비난 (Bi-nan)||포기 (Po-gi)||질투 (Jil-tu)
중급|Translate: 'It's my pleasure.'|제 기쁨이에요|제 슬픔이에요||제 잘못이에요||제 생각이에요
중급|How to say 'Wait a moment' politely?|잠시만 기다려 주세요|빨리 하세요||저기요||가세요
중급|What is 'Courage'?|용기 (Yong-gi)|포기 (Po-gi)||공포 (Gong-po)||피곤 (Pi-gon)
중급|How to say 'I'm excited' (Heart fluttering)?|설레요 (Seol-le-yo)|슬퍼요||졸려요||아파요
중급|What is 'Effort'?|노력 (No-ryeok)|포기 (Po-gi)||휴식 (Hyu-sik)||장난 (Jang-nan)
중급|Translate: 'Congratulations on your graduation.'|졸업을 축하해요|생일을 축하해요||결혼을 축하해요||입사를 축하해요
중급|How to say 'I was lucky'?|운이 좋았어요|운이 없었어요||피곤했어요||바빴어요
고급|Which is the most formal 'Thank you'?|대단히 감사합니다|고마워요||고맙다||땡큐
고급|What does '존경합니다' mean?|I respect you|I hate you||I miss you||I watch you
고급|Translate: 'Auspicious/Happy occasion'|경사 (Gyeong-sa)|사고||문제||불행
고급|How to say 'I admire your talent'?|재능이 감탄스러워요|재능이 없어요||재능이 나빠요||재능이 흔해요
고급|What is 'Benevolence/Mercy'?|자비 (Ja-bi)|분노 (Bun-no)||시기 (Si-gi)||냉정 (Naeng-jeong)
고급|How to say 'Deeply appreciate'?|깊이 감사드립니다|조금 감사해요||그냥 고마워||안 고마워요
고급|What is 'Harmony'?|조화 (Jo-hwa)|갈등 (Gal-deung)||소음 (So-eum)||혼란 (Hon-ran)
고급|Translate: 'Let's overcome together.'|함께 극복해요|함께 포기해요||함께 울어요||함께 싸워요
고급|What is 'Eternal' (Happiness)?|영원한 (Yeong-won-han)|잠깐의||부족한||나쁜
고급|How to say 'May your future be bright'?|앞날이 빛나길 바랍니다|앞날이 어둡길 바랍니다||앞날이 똑같길 바랍니다||모르겠습니다
고급|What is 'Gratitude' (Noun form)?|감사함 (Gam-sa-ham)|미안함||억울함||불편함
고급|Translate: 'It's an honor to meet you.'|만나 뵙게 되어 영광입니다|만나서 기분 나빠요||만나서 반가워||누구세요?
고급|What is 'Sincerity'?|성실 (Seong-sil)|게으름 (Ge-eu-reum)||거짓 (Geo-jit)||욕심 (Yok-sim)
고급|How to say 'You are a precious person'?|당신은 소중한 사람이에요|당신은 이상한 사람이에요||당신은 나쁜 사람이에요||당신은 모르는 사람이에요
고급|What is 'Warmth' (of a person)?|따뜻함 (Tta-tteu-tam)|차가움 (Cha-ga-um)||무거움||가벼움
고급|Translate: 'Stay healthy always.'|늘 건강하시길 빌어요|늘 아프지 마세요||늘 일하세요||늘 공부하세요
고급|What is 'Comfort' (Solace)?|위로 (Wi-ro)|비난 (Bi-nan)||무시 (Mu-si)||거절 (Geo-jeol)
고급|How to say 'Life is worthwhile'?|인생은 살 가치가 있어요|인생은 힘들어요||인생은 짧아요||인생은 돈이에요
고급|What is 'Optimism'?|낙관 (Nak-gwan)|비관 (Bi-gwan)||불안 (Bul-an)||걱정 (Geok-jeong)
고급|Translate: 'May you be blessed.'|복 받으세요|벌 받으세요||돈 받으세요||욕 받으세요
고급|What is 'Shining' or 'Luminous'?|찬란한 (Chan-ran-han)|어두운||흐린||평범한
고급|How to say 'Your support gives me strength'?|당신의 응원이 큰 힘이 돼요|당신 때문에 피곤해요||당신의 말이 무서워요||당신은 누구세요?
고급|What is 'Stability'?|안정 (An-jeong)|불안 (Bul-an)||변화 (Byeon-hwa)||위기 (Wi-gi)
고급|Translate: 'Good results came out.'|좋은 결과가 나왔어요|나쁜 결과가 나왔어요||결과가 없어요||틀렸어요
고급|What is 'Cheer' (Shouting for joy)?|환호 (Hwan-ho)|야유 (Ya-yu)||침묵 (Chim-muk)||탄식 (Tan-sik)
전문가|What does '꽃길만 걷자' mean?|Let's only walk on flower paths (Best wishes)|Buy more flowers||Don't walk on grass||Let's go hiking
전문가|'금상첨화' (Geum-sang-cheom-hwa) means...|Adding flowers to silk (Best thing even better)|A broken dream||Buying clothes||A waste of time
전문가|What is '소확행' (So-hwak-haeng)?|Small but certain happiness|Large and fast money||A sad ending||Studying all night
전문가|Meaning of '천생연분' (Cheon-saeng-yeon-bun)?|A match made in heaven|An enemy for life||A business partner||A long distance
전문가|'꿀잼' (Kkul-jaem) means...|Honey fun (Super fun/cool)|Bitter jam||Bees in a jar||No fun
전문가|What does '엄친아' (Eom-chin-ah) refer to?|The perfect son (Mom's friend's son)|A lazy student||A noisy neighbor||A thief
전문가|'심쿵' (Sim-kung) is the sound of...|Heart skipping a beat (Heartthrob)|A heavy drum||A falling stone||A loud sneeze
전문가|What is '만사형통' (Man-sa-hyeong-tong)?|Everything goes smoothly|Traffic jam||Money loss||Broken heart
전문가|Meaning of '힐링' (Healing)?|Mental restoration/Relaxation|Going to the gym||Working overtime||Fighting
전문가|What does '인생샷' (In-saeng-syat) mean?|The best photo of your life|A bullet||A life insurance||A bad memory
전문가|'함박웃음' is a laughter that...|Is a big, wide smile (like snow)|Is sneaky||Is fake||Is loud and scary
전문가|What is '흥' (Heung)?|Joy / Excitement / High spirits|Sadness||Boredom||Hunger
전문가|Meaning of '행쇼' (Haeng-syo)?|Slang for 'Be happy'|Let's go shopping||Goodbye||I'm angry
전문가|What is '고진감래' (Go-jin-gam-rae)?|Sweetness comes after bitterness|Eat candy first||No gain, no pain||Life is bitter
전문가|'눈부셔요' (Nun-bu-syeo-yo) means...|You are dazzlingly bright|Close your eyes||It's too dark||You are ugly
전문가|What is '덕분에' (Deok-bun-e)?|Thanks to you|Because of you (badly)||I don't know||Later
전문가|Meaning of '불금' (Bul-geum)?|Fire Friday (Exciting weekend start)|Building fire||Sad Friday||Work Friday
전문가|What does '만수무강' mean?|Live a long, healthy life|Eat many noodles||Don't sleep||Work hard
전문가|'우분투' in a Korean context often means...|Sharing/Togetherness|Linux only||Solitude||Conflict
전문가|What is '다정다감' (Da-jeong-da-gam)?|Warm and full of affection|Cold and quiet||Mean and loud||Busy
전문가|Meaning of '칠전팔기' (Chil-jeon-pal-gi)?|Falling 7 times, rising 8|Sleeping 7 hours||Walking 8 miles||Giving up
전문가|What is '화기애애' (Hwa-gi-ae-ae)?|Warm and friendly atmosphere|Cold war||Quiet office||Empty street
전문가|'일취월장' (Il-chwi-wol-jang) is...|Making great progress daily|Staying the same||Going backward||Sleeping
전문가|What does '날아갈 것 같아요' mean?|I feel like I'm flying (Super happy)|I am a bird||I am falling||I am tired
전문가|Last one! '사랑해' is I love you, but '영원히 사랑해' is...|I love you forever|I love you today||I love you a little||I loved you`,
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
      utterance.lang = 'ko-KR';
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
            <h2>수고하셨습니다! (Great Job!)</h2>
            <div className="score" style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--primary-mint)', margin: '20px 0' }}>
              {score}/{questions.length}
            </div>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              {score > 80 ? "완벽해요! 한국어 전문가시네요! (Perfect! You are a Korean expert!)" : "참 잘했어요! 조금 더 연습해봐요. (Well done! Let's practice a bit more.)"}
            </p>
            <button type="button" onClick={restart} className="try-again">
              다시 하기 (Retry)
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
      <div className="container">
        <div className="question-box">
          <span className={`level-badge ${levelClass}`}>{q?.l}</span>
          <span className="qnum">문제 {currentQuestion + 1} / 100</span>
          <h2 style={{ fontSize: '1.25rem' }}>{q?.q}</h2>
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
          다음 문제 (Next) →
        </button>
      </div>
    </div>
  );
};

const voiceCss = `
  :root {
    --primary-mint: #3b82f6;
    --dark-mint: #2563eb;
    --light-pink: #eff6ff;
    --accent-pink: #2563eb;
    --white: #ffffff;
    --text-dark: #37474f;
  }

  .dark-mode {
    --primary-mint: #3b82f6;
    --light-pink: #1a1a1a;
    --accent-pink: #2563eb;
    --white: #0d0d0d;
    --text-dark: #ffffff;
    --bg-green: #000000;
  }

  .light-mode {
    --primary-mint: #3b82f6;
    --light-pink: #f5f5f5;
    --accent-pink: #2563eb;
    --white: #ffffff;
    --text-dark: #37474f;
    --bg-green: #fafafa;
  }

  .ht-voice {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
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
    background: var(--primary-mint);
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
    background: var(--dark-mint);
    transform: translateY(-2px);
  }

  .theme-buttons {
    display: flex;
    gap: 8px;
    background: var(--light-pink);
    padding: 4px;
    border-radius: 25px;
    border: 2px solid var(--accent-pink);
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
    background: var(--primary-mint);
    color: white;
  }

  .container {
    max-width: 650px;
    margin: 0 auto;
    background: var(--white);
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 15px 35px rgba(37, 99, 235, 0.15);
    position: relative;
    border-bottom: 8px solid var(--accent-pink);
    min-height: 600px;
    transition: all 0.3s ease;
  }

  .question-box {
    background: #eff6ff;
    border-radius: 20px;
    padding: 25px;
    margin-bottom: 20px;
    border: 1px solid #bfdbfe;
  }

  .qnum {
    color: var(--accent-pink);
    font-weight: 800;
    font-size: 0.9rem;
    display: block;
    margin-bottom: 8px;
  }

  .options {
    display: grid;
    gap: 12px;
  }

  .option {
    background: var(--white);
    border: 2px solid #e0f2f1;
    border-radius: 15px;
    padding: 18px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .option.correct {
    background: var(--primary-mint) !important;
    color: white !important;
    transform: scale(1.02);
  }
  .option.wrong {
    background: #ffebee !important;
    border-color: #ff8a80 !important;
    color: #c62828 !important;
  }

  button#nextBtn {
    background: var(--accent-pink);
    color: white;
    border: none;
    padding: 18px;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 15px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
  }
  button#nextBtn:disabled {
    background: #cfd8dc;
    cursor: not-allowed;
    box-shadow: none;
  }

  .result-screen {
    text-align: center;
    padding: 40px 10px;
  }

  .try-again {
    background: var(--dark-mint);
    color: white;
    border: none;
    padding: 15px 40px;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
  }

  .level-badge {
    display: inline-block;
    padding: 5px 15px;
    border-radius: 50px;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .초급 {
    background: #dbeafe;
    color: #1e3a8a;
  }
  .중급 {
    background: #bfdbfe;
    color: #1e3a8a;
  }
  .고급 {
    background: #60a5fa;
    color: #fff;
  }
  .전문가 {
    background: #2563eb;
    color: #fff;
  }
`;

export default KoreanQuiz;
