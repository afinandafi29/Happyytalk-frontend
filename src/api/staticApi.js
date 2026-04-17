import { getRoomsApi } from './roomApi';

export const getStaticData = async () => {
  try {
    const rooms = await getRoomsApi();
    return {
      roomsData: rooms,
      languages: [
      'English', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Chinese', 'Hindi', 'Arabic', 
      'Portuguese', 'Russian', 'Italian', 'Turkish', 'Dutch', 'Vietnamese', 'Thai', 'Greek', 
      'Hebrew', 'Swedish', 'Polish', 'Czech', 'Romanian', 'Hungarian', 'Danish', 'Finnish', 
      'Norwegian', 'Indonesian', 'Malay', 'Tagalog', 'Ukrainian', 'Urdu', 'Persian', 'Bengali', 
      'Punjabi', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Kannada', 'Malayalam', 'Burmese', 
      'Khmer', 'Lao', 'Amharic', 'Swahili', 'Zulu', 'Xhosa', 'Afrikaans', 'Yoruba', 'Igbo',
      'Pashto', 'Kurdish', 'Azerbaijani', 'Uzbek', 'Kazakh', 'Kyrgyz', 'Tajik', 'Turkmen', 
      'Mongolian', 'Tibetan', 'Nepali', 'Sinhala', 'Somali', 'Oromo', 'Amharic', 'Tigrinya', 
      'Malagasy', 'Georgian', 'Armenian', 'Basque', 'Catalan', 'Galician', 'Welsh', 'Irish', 
      'Scottish Gaelic', 'Breton', 'Esperanto', 'Latin', 'Sanskrit', 'Ancient Greek', 'Old English',
      'Icelandic', 'Faroese', 'Greenlandic', 'Lithuanian', 'Latvian', 'Estonian', 'Slovenian', 
      'Croatian', 'Serbian', 'Bosnian', 'Macedonian', 'Bulgarian', 'Albanian', 'Luxembourgish', 
      'Maltese', 'Yiddish', 'Haitian Creole', 'Papiamento', 'Quechua', 'Guarani', 'Aymara', 
      'Nahuatl', 'Maya', 'Inuktitut', 'Maori', 'Hawaiian', 'Samoan', 'Tongan', 'Fijian'
    ],
      names: rooms.flatMap(r => r.people.map(p => p.avatar_url))
    };
  } catch (error) {
    console.error('Error fetching static data:', error);
    return null;
  }
};
