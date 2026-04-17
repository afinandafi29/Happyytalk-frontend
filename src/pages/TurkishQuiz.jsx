import React from 'react';
import QuizPage from '../components/QuizPage';

const TurkishQuiz = () => (
  <QuizPage
    language="tr"
    languageCode="tr-TR"
    pageTitle="HappyTalk Turkish 🇹🇷"
    subtitle="Türkçeyi neşeyle öğrenin! (Learn with joy!)"
    rawData={`başlangıç|How do you say 'Happy' in Turkish?|Mutlu|Üzgün||Kızgın||Yorgun
başlangıç|The most common way to say 'Hello':|Merhaba|Güle güle||Teşekkürler||Lütfen
başlangıç|How do you say 'Thank you'?|Teşekkür ederim|Rica ederim||Özür dilerim||Pardon
başlangıç|What is 'Friend' in Turkish?|Arkadaş|Düşman||Komşu||Yabancı
başlangıç|How do you say 'Good morning'?|Günaydın|İyi akşamlar||İyi geceler||Selam
başlangıç|What does 'Güzel' mean?|Beautiful|Çirkin||Soğuk||Uzak
başlangıç|Which word means 'Smile'?|Gülümseme|Ağlama||Uyku||Yemek
başlangıç|How to say 'I love you'?|Seni seviyorum|Seni görüyorum||Seni duyuyorum||Bekliyorum
başlangıç|What is 'Success'?|Başarı|Başarısızlık||Korku||Son
başlangıç|How to say 'Welcome'?|Hoş geldiniz|Güle güle||Affedersiniz||Evet
başlangıç|Word for 'Sun':|Güneş|Ay||Yıldız||Bulut
başlangıç|How do you say 'Water'?|Su|Ateş||Toprak||Hava
başlangıç|What is 'Yemek'?|Food / To eat|İçmek||Uyumak||Oynamak
başlangıç|Word for 'Big':|Büyük|Küçük||Yüksek||Alçak
başlangıç|How do you say 'House'?|Ev|Okul||Ofis||Dükkan
başlangıç|What is 'Aşk'?|Love|Nefret||Umut||Barış
başlangıç|Translate 'Today':|Bugün|Yarın||Dün||Bu akşam
başlangıç|How to say '1'?|Bir|İki||Üç||Dört
başlangıç|What is 'Okul'?|School|Hastane||Kütüphane||Park
başlangıç|Word for 'Dog':|Köpek|Kedi||Kuş||Balık
başlangıç|How to say 'I'm sorry'?|Özür dilerim|Merhaba||Teşekkürler||Lütfen
başlangıç|What does 'Soğuk' mean?|Cold|Sıcak||Ilık||Kuru
başlangıç|Word for 'Child':|Çocuk|Yetişkin||Amca||Teyze
başlangıç|How to say 'Yes' in Turkish?|Evet|Hayır||Belki||Asla
başlangıç|What is 'Gece'?|Night|Gündüz||Sabah||Akşam
başlangıç|Word for 'Strong':|Güçlü|Zayıf||Hızlı||Yavaş
başlangıç|How to say 'No'?|Hayır|Evet||Sık sık||Her zaman
başlangıç|What is 'Balık'?|Fish|Kuş||Kedi||Köpek
başlangıç|Word for 'White':|Beyaz|Siyah||Gri||Kahverengi
başlangıç|How to say 'Please'?|Lütfen|Teşekkür ederim||Evet||Hayır
başlangıç|What does 'Işık' mean?|Light|Karanlık||Gölge||Gece
başlangıç|Word for 'Life':|Hayat|Ölüm||Uyku||Rüya
başlangıç|How do you say 'Book'?|Kitap|Kalem||Kağıt||Masa
başlangıç|What is 'Ay'?|Moon / Month|Güneş||Yıldız||Gökyüzü
başlangıç|Word for 'Green':|Yeşil|Kırmızı||Mavi||Sarı
başlangıç|How to say 'Mother'?|Anne|Baba||Kardeş||Abla
orta|How do you say 'Good luck'?|Bol şans|İyi yolculuk||Afiyet olsun||Geçmiş olsun
orta|What is 'Hope' in Turkish?|Umut|Umutsuzluk||Neşe||Barış
orta|Translate: 'Everything is fine.'|Her şey yolunda|Her şey bitti||Bilmiyorum||Bekle
orta|What does 'Yavaş' mean?|Slowly|Hızlı||Sert||Sessiz
orta|How to say 'I am proud of you'?:|Seninle gurur duyuyorum|Sana kızgınım||Seni bekliyorum||Seni görüyorum
orta|What is 'Sürpriz' in English?|Surprise|Sıkıntı||Üzüntü||Öfke
orta|Translate 'Experience':|Tecrübe|Umut||Rüya||Görev
orta|How do you say 'Opportunity'?|Fırsat|Engel||Problem||Hata
orta|What does 'Dikkat et' mean?|Be careful|Mutlu ol||Hızlı ol||Sessiz ol
orta|Translate 'Important':|Önemli|Kolay||Hızlı||Ucuz
orta|How do you say 'Health'?|Sağlık|Güç||Zenginlik||Güzellik
orta|What is 'Özgüven'?|Self-confidence|Utangaç||Korkak||Tembel
orta|Translate 'Environment':|Çevre|Oda||Ev||Sokak
orta|How do you say 'Challenge'?|Zorluk|Hediye||Yardım||Destek
orta|What is 'Sıkı çalışma'?|Hard work|Tembel gün||Kolay görev||Boş zaman
orta|Translate 'Progress':|İlerleme|Gerileme||Ölüm||Doğum
orta|How to say 'I agree'?|Katılıyorum|İstemiyorum||Kafam karıştı||Gidiyorum
orta|What does 'Farklı' mean?|Different|Aynı||Eşit||Benzer
orta|Translate 'Respect':|Saygı|Nefret||Korku||Öfke
orta|How to say 'Believe'?|İnanmak|Şüphelenmek||Sormak||Susmak
orta|What is 'Gelecek'?|Future|Geçmiş||Şu an||Bugün
orta|Translate 'Create':|Yaratmak|Yok etmek||Beklemek||Aramak
orta|How do you say 'Freedom'?|Özgürlük|Bağımlılık||Görev||Yük
orta|What is 'İşbirliği'?|Collaboration|Rekabet||Çatışma||Kaçınma
orta|Translate 'Change':|Değişim|Düzen||Sessizlik||Son
orta|How to say 'Happy' (formal)?|Mutlu|Mutsuz||Hayal kırıklığı||Kızgın
orta|What is 'Duygular'?|Feelings|Düşünceler||Eylemler||Vizyon
orta|Translate 'Grateful':|Minnettar|Şikayetçi||Kızgın||Üzgün
orta|How to say 'Celebrate'?|Kutlamak|Ağlamak||Ayrılmak||Unutmak
orta|What is 'İlham'?|Inspiration|Sıkıntı||Sessizlik||Korku
orta|Translate 'Honest':|Dürüst|Yalancı||Korkak||Şüpheli
orta|How to say 'Beautiful' (scenery)?|Harika|Çirkin||Tamam||Kirli
orta|What is 'İletişim'?|Communication|Sessizlik||Tartışma||Kavga
orta|Translate 'Kindness':|İyilik|Kötülük||Nefret||Öfke
orta|How to say 'Patience'?|Sabır|Öfke||Endişe||Korku
uzman|What is 'Huzur'?|Inner peace / Serenity|Chaos||Wealth||Fast music
uzman|Meaning of 'Nazarlık'?|Evil eye bead|Yemek||Dans||Şapka
uzman|What is 'Keyif'?|Enjoyment / Leisurely pleasure|Work||Sadness||Speed
uzman|Translate 'Peace':|Barış|Savaş||Öfke||Gürültü
uzman|Final one! How do you say 'Stay happy'?|Mutlu kal|Üzgün kal||Git||Çok çalış
uzman|What is 'Çeşitlilik'?|Diversity|Tekdüzelik||Benzerlik||Aynı
uzman|Translate 'Dürüstlük':|Integrity / Honesty|İhmal||Yalan||Dolandırıcılık
uzman|Meaning of 'Refah'?|Prosperity / Welfare|Fakirlik||Sefalet||Zorluk
uzman|What is 'Bağımsızlık'?|Independence|Bağımlılık||Zayıflık||Korku
uzman|Translate 'Dayanışma':|Solidarity|Bölünme||Nefret||Kıskançlık
uzman|What is 'Bilgelik'?|Wisdom|Ahmaklık||Cahillik||Açgözlülük
uzman|Translate 'Merhamet':|Compassion|Zulüm||Nefret||Öfke
uzman|Meaning of 'Sürdürülebilirlik'?|Sustainability|Yıkım||Kirlilik||İsraf
uzman|What is 'Adalet'?|Justice|Adaletsizlik||Kaos||Yolsuzluk
uzman|Translate 'Uyum':|Harmony|Çatışma||Gürültü||Öfke
uzman|Meaning of 'Egemenlik'?|Sovereignty|Esaret||Sömürgecilik||Yönetim
uzman|What is 'Zerafet'?|Elegance|Beceriksizlik||Çirkinlik||Kabalık
uzman|Translate 'Kütüphane':|Library|Kitapçı||Okul||Sınıf
uzman|Meaning of 'Sadakat'?|Loyalty|İhanet||Nefret||Öfke
uzman|What is 'Yaratıcılık'?|Creativity|Taklit||Sıkıntı||Tembellik
uzman|Translate 'Cesaret':|Courage|Korku||Korkaklık||Utangaçlık
uzman|Meaning of 'Samimiyet'?|Sincerity|İkiyüzlülük||Yalan||Açgözlülük
uzman|What is 'Görkem'?|Glory / Splendor|Utanç||Yenilgi||Kayıp
uzman|Translate 'Ruh sağlığı':|Mental health|Fiziksel acı||Hasta vücut||Zayıf ruh
uzman|Meaning of 'Misafirperverlik'?|Hospitality|Kabalık||Soğukluk||Öfke
uzman|What is 'Mucize'?|Miracle|Felaket||Kaza||Sıradan
uzman|Translate 'Güçlendirme':|Empowerment|Kısıtlama||Zayıflık||Korku
uzman|Meaning of 'Azim'?|Perseverance / Determination|Son||Durma||İsraf
uzman|What is 'Cömertlik'?|Generosity|Açgözlülük||Bencillik||Kötülük
uzman|Translate 'İnovasyon':|Innovation|Durgunluk||Gelenek||Eski`}
    speechLocale="tr-TR"
    primaryColor="#008B8B"
    primaryHover="#006B6B"
    resultTitle="Harika! (Wonderful!)"
    resultMessage="Türkçede harikasın!"
    retryLabel="Tekrar Dene"
    levelLabels={{
      başlangıç: 'Beginner',
      orta: 'Intermediate',
      uzman: 'Expert'
    }}
  />
);

export default TurkishQuiz;
