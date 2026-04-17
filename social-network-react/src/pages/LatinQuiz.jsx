import React from 'react';
import QuizPage from '../components/QuizPage';

const LatinQuiz = () => (
  <QuizPage
    language="la"
    languageCode="la"
    pageTitle="HappyTalk Latin 🏛️"
    subtitle="Disce linguam Latinam cum gaudio! (Learn Latin with joy!)"
    rawData={`Tiro|How do you say 'Happy' in Latin?|Laetus|Tristis||Iratus||Fessus
Tiro|The standard greeting for 'Hello':|Salvē|Valē||Grātiās agō||Quaesō
Tiro|How do you say 'Thank you'?|Grātiās agō|Sī vīs||Ita vērō||Minimē
Tiro|Word for 'Friend':|Amīcus|Hostis||Vicīnus||Aliēnus
Tiro|What does 'Valē' mean?|Farewell / Goodbye|Hello||Please||Today
Tiro|Translate 'Sun':|Sōl|Lūna||Stella||Terra
Tiro|Which word means 'Smile' or 'Laugh'?|Rīsus|Fletus||Somnus||Cibus
Tiro|How to say 'I love'?|Amō|Videō||Audiō||Maneō
Tiro|What is 'Success' or 'Victory'?|Victōria|Clādēs||Metus||Finis
Tiro|Translate 'Good':|Bonus|Malus||Magnus||Antīquus
Tiro|Word for 'Water':|Aqua|Ignis||Terra||Aer
Tiro|What is 'Cibus'?|Food|Water||Sleep||Play
Tiro|Translate 'Star':|Stella|Sōl||Lūna||Aura
Tiro|How to say 'Mother'?|Māter|Pater||Frāter||Soror
Tiro|What is 'Pater'?|Father|Māter||Frāter||Soror
Tiro|Word for 'Brother':|Frāter|Soror||Māter||Pater
Tiro|Word for 'Sister':|Soror|Frāter||Māter||Pater
Tiro|How to say 'Small'?|Parvus|Magnus||Altus||Lātus
Tiro|What is 'Magnus'?|Great / Large|Parvus||Paucus||Bonus
Tiro|Translate 'House':|Domus|Templum||Forum||Via
Tiro|Word for 'Way/Road':|Via|Mare||Flūmen||Mons
Tiro|How to say 'One' (numerical)?|Unus|Duo||Trēs||Quattuor
Tiro|What is 'Duo'?|Two|Unus||Trēs||Quattuor
Tiro|Translate 'God':|Deus|Vir||Fēmina||Puer
Tiro|Word for 'Boy':|Puer|Puella||Vir||Fēmina
Tiro|How to say 'Girl'?|Puella|Puer||Vir||Fēmina
Tiro|Translate 'Man':|Vir|Fēmina||Puer||Puella
Tiro|Word for 'Woman':|Fēmina|Vir||Puer||Puella
Tiro|What is 'Canis'?|Dog|Fēles||Equus||Avis
Tiro|Word for 'Cat':|Fēles|Canis||Avis||Mūs
Tiro|How to say 'Yes'?|Ita|Minimē||Fortasse||Numquam
Tiro|What is 'Minimē'?|No / Not at all|Ita||Saepe||Semper
Tiro|Translate 'Time':|Tempus|Locus||Nōmen||Rēs
Tiro|Word for 'Name':|Nōmen|Tempus||Locus||Corpus
Tiro|How to say 'Head'?|Caput|Manus||Pēs||Oculus
Tiro|What is 'Oculus'?|Eye|Auris||Nāsus||Os
Discipulus|How do you say 'Good luck'?|Bona fortūna|Iter bonum||Bene sapiat||Cura ut valeās
Discipulus|What is 'Hope' in Latin?|Spēs|Amor||Pāx||Gaudium
Discipulus|Translate: 'Everything is well.'|Omnia bene sunt|Nihil scio||Hodiē nōn||Venī hūc
Discipulus|Meaning of 'Carpe Diem'?|Seize the day|Love conquers all||Peace be with you||Always faithful
Discipulus|How to say 'I am happy'?|Laetus sum|Tristis sum||Aeger sum||Fessus sum
Discipulus|What is 'Sapientia'?|Wisdom|Stultitia||Ira||Metus
Discipulus|Translate 'Nature':|Nātūra|Ars||Labor||Otium
Discipulus|Word for 'Truth':|Vēritās|Mendācium||Silentium||Vōx
Discipulus|How to say 'I speak'?|Loquor|Audiō||Scribō||Legō
Discipulus|What is 'Libertās'?|Freedom|Servitūs||Lex||Iūs
Discipulus|Translate 'Justice':|Iūstitia|Iniūria||Bellum||Pāx
Discipulus|Word for 'Courage':|Fortitūdō|Timor||Pigritia||Superbia
Discipulus|How to say 'To learn'?|Discere|Docēre||Ludere||Cantāre
Discipulus|What is 'Magister'?|Teacher|Discipulus||Socius||Hostis
Discipulus|Translate 'School':|Schola|Forum||Cūria||Castra
Discipulus|Meaning of 'Festīnā lentē'?|Make haste slowly|Run fast||Wait here||Go away
Discipulus|How to say 'Always'?|Semper|Numquam||Saepe||Rārō
Discipulus|What is 'Numquam'?|Never|Semper||Saepe||Rārō
Discipulus|Translate 'Everything':|Omnia|Nihil||Aliquis||Quīdam
Discipulus|Word for 'Nothing':|Nihil|Omnia||Aliquis||Pauca
Discipulus|How to say 'Where are you?'|Ubi es?|Quis es?||Quid agis?||Quō vādis?
Discipulus|What is 'Quid agis?'|How are you doing?|What is your name?||Where are you from?||Who are you?
Discipulus|Translate 'I understand':|Intellegō|Nesciō||Putō||Crēdō
Discipulus|Word for 'Book':|Liber|Charta||Stilus||Mensa
Discipulus|How to say 'Light'?|Lūx|Tenebrae||Umbra||Nox
Discipulus|What is 'Nox'?|Night|Diēs||Vesper||Māne
Discipulus|Translate 'Day':|Diēs|Nox||Hodiē||Crās
Discipulus|Word for 'World':|Mundus|Caelum||Terra||Infernus
Discipulus|How to say 'Life'?|Vīta|Mors||Somnus||Spīritus
Discipulus|What is 'Mors'?|Death|Vīta||Salūs||Spēs
Discipulus|Translate 'Soul':|Anima|Corpus||Animus||Mens
Discipulus|Word for 'Heart':|Cor|Caput||Pectus||Sanguis
Discipulus|How to say 'Beautiful'?|Pulcher|Turpis||Malus||Foulis
Discipulus|What is 'Grātia'?|Grace / Thanks|Ira||Odius||Invidia
Magister|What is 'Gaudium'?|Joy / Delight|Sadness||Boredom||Anger
Magister|Translate 'Freedom':|Lībertās|Servitūs||Labor||Pecūnia
Magister|What is 'Amicitia'?|Friendship|Inimicitia||Sapientia||Fortitūdō
Magister|Meaning of 'Alma Mater'?|Nourishing mother|Primus puer||Altus mons||Magnus mare
Magister|Final one! How do you say 'Peace'?|Pāx|Bellum||Rīxa||Strepitus
Magister|What is 'Humanitās'?|Humanity / Culture|Fera||Barbariēs||Crūdēlitās
Magister|Translate 'Virtue':|Virtūs|Vitium||Culpa||Error
Magister|Meaning of 'E pluribus unum'?|Out of many, one|One for all||Many are call||One is enough
Magister|What is 'Amor fātī'?|Love of fate|Fear of death||Hate of life||Hope for future
Magister|Translate 'Eternity':|Aeternitās|Tempus||Aevum||Hodiē
Magister|Meaning of 'Vēnī, vīdī, vīcī'?|I came, I saw, I conquered|I went, I saw, I lost||I am here to stay||I follow the light
Magister|What is 'Sapere aude'?|Dare to know|Dare to speak||Dare to do||Dare to live
Magister|Translate 'Philosophy':|Philosophia|Scientia||Religiō||Ars
Magister|Meaning of 'Cogito ergo sum'?|I think, therefore I am|I speak, therefore I live||I am, therefore I think||I do, therefore I grow
Magister|What is 'Per aspera ad astra'?|Through hardships to the stars|Through the forest to the sea||Under the sun we dance||On the road to home
Magister|Translate 'Consilience':|Concordia|Discordia||Bellum||Silentium
Magister|Meaning of 'Memento morī'?|Remember that you must die|Remember to live||Remember the past||Remember me
Magister|What is 'Dūcit amor patriae'?|The love of country leads|The love of family stays||The road is long||The leader is here
Magister|Translate 'Dignity':|Dignitās|Humiitas||Turpitūdō||Fāma
Magister|Meaning of 'Nōsce tē ipsum'?|Know thyself|Love thyself||Fix thyself||Speak for thyself
Magister|What is 'Audācēs fortūna iuvat'?|Fortune favors the bold|Victory is for the fast||Bold are the brave||Fortune is blind
Magister|Translate 'Integrity':|Integritās|Fraus||Mendācium||Lapsus
Magister|Meaning of 'In varietāte concordia'?|Unity in diversity|Many paths, one road||Diversity is strength||Discord in unity
Magister|What is 'Aequanimitās'?|Equanimity / Calmness|Ira||Furor||Metus
Magister|Translate 'Benevolence':|Benevolentia|Malevolentia||Odius||Invidia
Magister|Meaning of 'Labor omnia vincit'?|Hard work conquers all|Love is everything||Work is life||Everything is hard
Magister|What is 'Pietās'?|Dutifulness / Piety|Impietās||Lex||Mōs
Magister|Translate 'Magnanimity':|Magnanimitās|Pusillanimitās||Avaritia||Invidia
Magister|Meaning of 'Sine qua non'?|Without which not (Essential)|Without end||Always there||Nothing else
Magister|What is 'Pax vobiscum'?|Peace be with you|Grace to all||Hello friends||God bless`}
    speechLocale="it-IT"
    primaryColor="#3b82f6"
    primaryHover="#2563eb"
    resultTitle="Optime! (Excellent!)"
    resultMessage="Linguam Latīnam optē tenēs!"
    retryLabel="Iterum Tentare"
    levelLabels={{
      Tiro: 'Beginner',
      Discipulus: 'Intermediate',
      Magister: 'Advanced'
    }}
  />
);

export default LatinQuiz;
