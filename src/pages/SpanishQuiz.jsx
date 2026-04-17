import React from 'react';
import QuizPage from '../components/QuizPage';

const SpanishQuiz = () => (
  <QuizPage
    language="es"
    languageCode="es"
    pageTitle="HappyTalk Spanish 🇪🇸"
    subtitle="¡Aprende español con alegría! (Learn Spanish with joy!)"
    rawData={`Principiante|¿Cómo se dice 'Happy' en español?|Feliz|Triste||Enojado||Cansado
Principiante|Una respuesta positiva a '¿Cómo estás?'|¡Muy bien, gracias!|Mal||Más o menos||No sé
Principiante|¿Qué haces cuando algo es gracioso?|Reír|Llorار||Dormir||Comer
Principiante|El sol es...|Brillante|Oscuro||Frío||Triste
Principiante|Color de la alegría:|Amarillo|Gris||Negro||Marrón
Principiante|¿Cómo saludas positivamente?|¡Hola, buen día!|Adiós||Cállate||¿Qué quieres?
Principiante|Un amigo es...|Especial|Feo||Malo||Aburrido
Principiante|Opuesto de 'triste':|Alegre|Lento||Alto||Rojo
Principiante|Me gusta mucho el...|Helado|Dolor||Humo||Ruido
Principiante|¡___ cumpleaños!|Feliz|Triste||Viejo||Mal
Principiante|Dar un ___ es amoroso.|Abrazo|Grito||Golpe||Susto
Principiante|La música es...|Fantástica|Horrible||Sorda||Rara
Principiante|¡Qué ___ día hace!|Bonito|Fó||Gris||Sucio
Principiante|Los dulces son...|Ricos|Amargos||Salados||Feos
Principiante|Mi familia me ___.|Ama|Odia||Olvida||Pega
Principiante|Una fiesta es...|Divertida|Seria||Larga||Triste
Principiante|¡___ gracias!|Muchas|Pocas||Nada||Cero
Principiante|Yo quiero ___.|Jugar|Llorar||Pelear||Gritar
Principiante|El cielo está...|Azul|Negro||Roto||Sucio
Principiante|Las flores son...|Hermosas|Malas||Tristes||Gris
Principiante|¡Te ___ mucho!|Quiero|Muerdo||Miro||Llamo
Principiante|Hoy es un día ___.|Genial|Malo||Peور||Normal
Principiante|Dormir bien es...|Bueno|Malo||Raro||Feo
Principiante|¡Eres muy ___!|Simpático|Pesado||Tonto||Gritón
Principiante|La paz هو ___.|Linda|Mala||Ruidosa||Dura
Intermedio|Yo ___ muy feliz hoy.|Estoy|Soy||Tengo||Hago
Intermedio|Espero que tú ___ un buen día.|Tengas|Tienes||Tuviste||Tenía
Intermedio|Nosotros nos ___ mucho en la fiesta.|Divertimos|Aburrimos||Dormimos||Fuimos
Intermedio|¡___ suerte!|Buena|Mala||Bien||Mejor
Intermedio|Ella siempre ___ una sonrisa.|Tiene|Llorar||Dice||Hace
Intermedio|Si ganamos, ___ muy felices.|Estaremos|Estuvimos||Estamos||Estaban
Intermedio|Me ___ mucho bailar.|Encanta|Odia||Dolió||Parece
Intermedio|Tú eres la persona ___ amable del mundo.|Más|Menos||Tan||Muy
Intermedio|¡Qué alegría ___!|Verte|Mirar||Visto||Viendo
Intermedio|Gracias por ___.|Ayudarme|Pegarme||Irme||Gritar
Intermedio|Estamos ___ por las noticias.|Emocionados|Tristes||Enojados||Cansados
Intermedio|Siempre ___ lo positivo.|Busco|Pierdo||Huyo||Miro
Intermedio|¡Lo ___ muy bien!|Hiciste|Haces||Hacer||Haciendo
Intermedio|Este regalo es ___ ti.|Para|Por||Con||De
Intermedio|Me siento ___ en casa.|Cómodo|Mal||Raro||Lejos
Intermedio|¡Eres el ___!|Mejor|Peor||Medio||Último
Intermedio|Me ___ que estés aquí.|Alegra|Triste||Enoja||Duele
Intermedio|Mañana ___ un día excelente.|Será|Fue||Era||Es
Intermedio|Tengo mucha ___ por el viaje.|Ilusión|Miedo||Hambre||Sueño
Intermedio|¡Sigue ___!|Así|No||Mal||Atrás
Intermedio|Es un placer ___.|Conocerte|Odiarte||Irse||Ver
Intermedio|¡Qué sorpresa tan ___!|Grata|Mala||Fea||Triste
Intermedio|Todo va a salir ___.|Bien|Mal||Peor||Lento
Intermedio|Me gusta tu ___ de ser.|Forma|Cosa||Día||Pelo
Intermedio|¡___ por tu éxito!|Felicidades|Lo siento||Hola||Nada
Avanzado|Sinónimo de 'muy feliz':|Radiante|Apático||Melancólico||Severo
Avanzado|¿Qué es estar 'Eufórico'?|Extremadamente alegre|Muy cansado||Con mucho miedo||Sin hambre
Avanzado|Una persona llena de vida es...|Vivaz|Inerte||Lenta||Triste
Avanzado|La 'plenitud' es un estado de...|Felicidad total|Vacío||Hambre||Duda
Avanzado|Sentir 'regocijo' es sentir...|Gran alegría|Gran dolor||Mucho frío||Envidia
Avanzado|Un momento 'inolvidable' es...|Que se recuerda con cariño|Que se olvida rápido||Que es aburrido||Malo
Avanzado|Ser 'optimista' significa...|Ver el lado bueno|Ver el lado oscuro||Ser realista||Estar enojado
Avanzado|La 'gratitud' es...|Saber dar las gracias|Saber pedir dinero||Tener orgullo||Estar solo
Avanzado|Un clima 'apacible' es...|Tranquilo y agradable|Tormentoso||Muy caluroso||Horrible
Avanzado|Estar 'fascinado' es...|Muy impresionado y feliz|Muy aburrido||Dormido||Perdido
Avanzado|La 'bondad' es una virtud...|Positiva|Negativa||Extraña||Rara
Avanzado|Un 'agasajo' es...|Una muestra de afectه|Un insulto||Un grito||Un robo
Avanzado|Estar 'contento' es estar...|Satisfecho|Enojado||Hambriento||Loco
Avanzado|La 'armonía' es...|Equilibrio y paz|Guerra||Ruido||Caos
Avanzado|Ser 'altruista' es...|Ayudar a los demás|Pensar en uno mismo||Ser egoísta||Ser rico
Avanzado|Una sonrisa 'sincera' es...|Honesta|Falsa||Fea||Rápida
Avanzado|El 'bienestar' es importante para...|La salud|La guerra||El dolor||Nadie
Avanzado|Tener 'esperanza' es...|Confiar en el futuro|Tener miedo||Llorar||Rendirse
Avanzado|Un 'brindis' se hace para...|Celebrar algo bueno|Pelear||Dormir||Comer solo
Avanzado|Ser 'hospitalario' es...|Recibir bien a la gente|Estar enfermo||Ser malo||Cerrar la puerta
Avanzado|La 'amistad' es un tesoro ___.|Invaluable|Barato||Malo||Sucio
Avanzado|Un éxito 'rotundo' es...|Un gran éxito|Un fracaso||Algo pequeño||Una duda
Avanzado|Estar 'maravillado' es...|Lleno de asombro positivo|Asustado||Cansado||Hambriento
Avanzado|El 'entusiasmo' nos ayuda a...|Lograr metas|Fallar||Dormir||Rendirse
Avanzado|Vivir في 'paz' هو...|Lo ideal|Imposible||Malo||Aburrido
Experto|¿Qué significa 'Estar en las nubes'?|Estar muy feliz o distraído|Tener frío||Ser un avión||Estar mojado
Experto|'Ser un sol' significa que eres...|Una persona excelente|Muy caliente||Amarillo||Muy redondo
Experto|'Estar como un niño con zapatos nuevos' es...|Estar muy ilusionado|Necesitar ropa||Tener feet pequeños||Estar cansado
Experto|'Hacer buenas migas' significa...|Llevarse muy bien con alguien|Cocinar pan||Pelear||Limpiar la mesa
Experto|¿Qué es 'Ver la vida de color de rosa'?|Ser muy optimista|Tener problemas de vista||Pintar la casa||Estar triste
Experto|'Dar en el clavo' significa...|Acertar perfectamente|Construir algo||Lastimarse la mano||Perder un juego
Experto|'Estar de un humor de perros' es el opuesto de...|Estar feliz|Estar cansado||Tener mascotas||Tener hambre
Experto|'Miel sobre hojuelas' significa...|Algo que está excelente|Mucha azúcar||Comida mala||Tener abejas
Experto|'Estar en su salsa' significa...|Estar en un lugar donde eres feliz|Estar cocinando||Estar sucio||Tener calor
Experto|'Tirar la casa por la ventana' se hace para...|Celebrar a lo grande|Limpiar||Mudarse||Enojarse
Experto|'Pan comido' significa que algo هو...|Muy fácil y agradable|Hora de comer||Muy duro||Caro
Experto|'Estar como pez en el agua' es...|Sentirse muy cómodo|Estar mojado||Tener frío||No poder respirar
Experto|'Pedir boca' significa...|Que algo salió perfecto|Tener hambre||Hablar mucho||Ir al médico
Experto|'Quedarse con la boca abierta' es por...|Asombro positivo|Sueño||Hambre||Dolor
Experto|'Sacار pecho' es sentirse...|Orgulloso de algo bueno|Enfermo||Cansado||Con frío
Experto|'Tener un corazón de oro' es ser...|Muy buena persona|Muy rico||Estar enfermo||Ser un robot
Experto|'Ir sobre ruedas' significa que todo va...|Excelente|Muy rápido||En coche||Lento
Experto|'Hacer el agosto' significa...|Tener mucho éxito|Ir de vacaciones||Tener calor||Esperar un شهر
Experto|'A pedir de boca' significa...|Exactamente como querías|Que tienes hambre||Que hablas mucho||Mal
Experto|'No caber en sí de gozo' es...|Estar inmensamente feliz|Estar gordo||Estar apreتado||Estar triste
Experto|'Estar de racha' هو...|Tener muchos éxitos seguidos|Tener mucho viento||Tener mala suerte||Estar cansado
Experto|'Ponerse las botas' suele ser...|Disfrutar mucho de algo|Tener frío||Caminار mucho||Comprar zapatos
Experto|'Saltar de alegría' es...|Estar muy emocionado|Hacer ejercicio||Tener miedo||Estar loco
Experto|'Tener ángel' هو...|Tener un encanto especial|Ser un pájaro||Estar muerto||Ser invisible
Experto|'Dormir como un tronco' هو...|Descansar perfectamente|Ser de madera||Estar muerto||Tener pesadillas`}
    speechLocale="es-ES"
    primaryColor="#3b82f6"
    secondaryColor="#2563eb"
    primaryHover="#1d4ed8"
    resultTitle="¡Fantástico! (Fantastic!)"
    resultMessage="¡Tu español es increíble! Your Spanish is incredible!"
    levelLabels={{
      Principiante: 'Principiante',
      Intermedio: 'Intermedio',
      Avanzado: 'Avanzado',
      Experto: 'Experto',
    }}
  />
);

export default SpanishQuiz;
