// Contenido de la fase A1.
// Vocabulario: "inglés|español|frase de ejemplo|frase en español". Si empieza con "T:" es vocabulario técnico.
// quiz: preguntas propias de gramática; la app genera además preguntas a partir del vocabulario.
// answer: índice (0 a 3) de la opción correcta.

function parseVocab(list) {
  return list.map(s => {
    const tech = s.startsWith("T:");
    const [en, es, ex, exEs] = (tech ? s.slice(2) : s).split("|");
    return { en, es, ex, exEs, tech };
  });
}

const UNITS = [
  // ------------------------------------------------------------------ 1
  {
    id: 1, phase: "A1", title: "Hello! Saludos y presentaciones",
    goal: "Saludar, decir tu nombre y presentarte con el verbo to be (I am, you are).",
    grammar: [
      { title: "Saludos",
        text: "Se usa «Good morning» hasta el mediodía, «Good afternoon» por la tarde y «Good evening» al llegar por la noche. «Hi» es el saludo informal. Para despedirte: «Goodbye», «Bye» o «See you tomorrow».",
        examples: [["Good morning, Luis.", "Buenos días, Luis."], ["Hi, Ana!", "¡Hola, Ana!"], ["See you tomorrow.", "Nos vemos mañana."]] },
      { title: "I am / You are",
        text: "El verbo to be significa «ser» o «estar». Con I se usa am y con you se usa are. Casi siempre se dice en forma corta: I am = I'm, you are = you're. En inglés el pronombre siempre se escribe: no se dice «Am student», sino «I'm a student».",
        examples: [["I'm Luis.", "Soy Luis."], ["You're a student.", "Eres estudiante."], ["I'm an engineer.", "Soy ingeniero."]] },
      { title: "Preguntar y decir el nombre",
        text: "Pregunta: «What's your name?» (What's = What is). Respuesta: «My name is Luis» o «I'm Luis». Al conocer a alguien: «Nice to meet you» y la respuesta «Nice to meet you, too».",
        examples: [["What's your name?", "¿Cómo te llamas?"], ["My name is Luis.", "Me llamo Luis."], ["Nice to meet you, too.", "Mucho gusto también."]] }
    ],
    vocab: parseVocab([
      "hello|hola|Hello, I'm Ana.|Hola, soy Ana.",
      "hi|hola (informal)|Hi, Luis!|¡Hola, Luis!",
      "good morning|buenos días|Good morning, teacher.|Buenos días, maestro.",
      "good afternoon|buenas tardes|Good afternoon, Ana.|Buenas tardes, Ana.",
      "good evening|buenas noches (al llegar)|Good evening, everyone.|Buenas noches a todos.",
      "goodbye|adiós|Goodbye, Luis.|Adiós, Luis.",
      "please|por favor|Sit down, please.|Siéntate, por favor.",
      "thank you|gracias|Thank you, Ana.|Gracias, Ana.",
      "sorry|perdón|Sorry, I'm late.|Perdón, llego tarde.",
      "yes|sí|Yes, I am.|Sí, lo soy.",
      "no|no|No, I'm not.|No, no lo soy.",
      "name|nombre|My name is Luis.|Me llamo Luis.",
      "student|estudiante|I'm a student.|Soy estudiante.",
      "nice to meet you|mucho gusto|Nice to meet you.|Mucho gusto.",
      "engineer|ingeniero|I'm an engineer.|Soy ingeniero.",
      "T:computer|computadora|The computer is new.|La computadora es nueva.",
      "T:robot|robot|The robot is small.|El robot es pequeño.",
      "T:sensor|sensor|The sensor is on.|El sensor está encendido."
    ]),
    dialogue: [
      ["Ana", "Hello! I'm Ana. What's your name?", "Hola, soy Ana. ¿Cómo te llamas?"],
      ["Luis", "Hi, Ana. My name is Luis.", "Hola, Ana. Me llamo Luis."],
      ["Ana", "Nice to meet you, Luis.", "Mucho gusto, Luis."],
      ["Luis", "Nice to meet you, too. Are you a student?", "Mucho gusto también. ¿Eres estudiante?"],
      ["Ana", "Yes, I am. I'm a student.", "Sí. Soy estudiante."],
      ["Luis", "Good. See you tomorrow!", "Bien. ¡Nos vemos mañana!"]
    ],
    quiz: [
      { q: "I ___ a student.", options: ["am", "is", "are", "be"], answer: 0, explain: "Con I se usa am: I am = I'm." },
      { q: "You ___ Luis.", options: ["am", "is", "are", "be"], answer: 2, explain: "Con you se usa are: you are = you're." },
      { q: "¿Cuál es la forma corta de «I am»?", options: ["I's", "I'm", "Im'", "I're"], answer: 1, explain: "I am = I'm." },
      { q: "¿Cómo se pregunta el nombre de alguien?", options: ["How are you?", "Where are you?", "What's your name?", "Who are you name?"], answer: 2, explain: "What's your name? = ¿Cómo te llamas?" },
      { q: "Alguien dice «Nice to meet you». ¿Qué respondes?", options: ["Goodbye.", "Nice to meet you, too.", "Yes, I am.", "Sorry."], answer: 1, explain: "Se responde Nice to meet you, too." },
      { q: "¿Cuál oración es correcta?", options: ["Am student.", "I student.", "I'm a student.", "I'm student a."], answer: 2, explain: "En inglés siempre va el pronombre y el artículo: I'm a student." }
    ],
    talk: {
      es: "Preséntense como si fuera la primera vez que se conocen. Habla despacio, repite lo que no entienda y corrígelo con calma, una cosa a la vez.",
      questions: [["Hello! What's your name?", "Hola, ¿cómo te llamas?"], ["Nice to meet you. Are you a student?", "Mucho gusto. ¿Eres estudiante?"], ["Good morning! Are you an engineer?", "Buenos días, ¿eres ingeniero?"], ["Is the computer new?", "¿La computadora es nueva?"], ["Goodbye! See you tomorrow.", "Adiós, nos vemos mañana."]]
    }
  },

  // ------------------------------------------------------------------ 2
  {
    id: 2, phase: "A1", title: "Numbers & letters: números y letras",
    goal: "Contar hasta 100, decir tu edad, deletrear palabras y dar un teléfono o correo.",
    grammar: [
      { title: "Los números",
        text: "0 zero, 1 one, 2 two, 3 three, 4 four, 5 five, 6 six, 7 seven, 8 eight, 9 nine, 10 ten. Del 13 al 19 terminan en -teen (thirteen, fourteen…). Las decenas terminan en -ty (twenty, thirty, forty, fifty). Del 21 al 99 se unen con guion: twenty-one, thirty-five.",
        examples: [["I have two sensors.", "Tengo dos sensores."], ["Twenty-one.", "Veintiuno."], ["One hundred.", "Cien."]] },
      { title: "La edad",
        text: "En inglés se usa el verbo to be, no «tener». Se pregunta «How old are you?» y se responde «I'm 17» o «I'm 17 years old».",
        examples: [["How old are you?", "¿Cuántos años tienes?"], ["I'm seventeen years old.", "Tengo diecisiete años."]] },
      { title: "El alfabeto y deletrear",
        text: "A (ei), B (bi), C (si), D (di), E (i), F (ef), G (yi), H (eich), I (ai), J (yei), K (kei), L (el), M (em), N (en), O (ou), P (pi), Q (kiú), R (ar), S (es), T (ti), U (iú), V (vi), W (dábol-iú), X (eks), Y (uai), Z (zi). Se pide así: «How do you spell it?». Para el correo, @ se dice «at» y el punto se dice «dot».",
        examples: [["How do you spell LED?", "¿Cómo se deletrea LED?"], ["L, E, D.", "L, E, D."], ["My email is luis at mail dot com.", "Mi correo es luis arroba mail punto com."]] }
    ],
    vocab: parseVocab([
      "zero|cero|Zero volts.|Cero voltios.",
      "one|uno|I have one phone.|Tengo un teléfono.",
      "two|dos|Two students are here.|Dos estudiantes están aquí.",
      "three|tres|Three LEDs are on.|Tres LED están encendidos.",
      "four|cuatro|I have four books.|Tengo cuatro libros.",
      "five|cinco|Five minutes, please.|Cinco minutos, por favor.",
      "six|seis|It is six o'clock.|Son las seis.",
      "seven|siete|Seven days.|Siete días.",
      "eight|ocho|Eight bits.|Ocho bits.",
      "nine|nueve|Nine students.|Nueve estudiantes.",
      "ten|diez|Ten minutes.|Diez minutos.",
      "twenty|veinte|I'm twenty years old.|Tengo veinte años.",
      "thirty|treinta|Thirty students.|Treinta estudiantes.",
      "fifty|cincuenta|Fifty pesos.|Cincuenta pesos.",
      "one hundred|cien|One hundred percent.|Cien por ciento.",
      "age|edad|What's your age?|¿Cuál es tu edad?",
      "phone number|número de teléfono|My phone number is five five one two.|Mi número de teléfono es cinco cinco uno dos.",
      "email|correo electrónico|What's your email?|¿Cuál es tu correo?",
      "letter|letra|A is the first letter.|A es la primera letra.",
      "spell|deletrear|Can you spell it, please?|¿Puedes deletrearlo, por favor?",
      "T:pin|terminal, pin|Connect pin thirteen.|Conecta el pin trece.",
      "T:bit|bit|A bit is zero or one.|Un bit es cero o uno.",
      "T:volt|voltio|Five volts.|Cinco voltios."
    ]),
    dialogue: [
      ["Ana", "How old are you, Luis?", "¿Cuántos años tienes, Luis?"],
      ["Luis", "I'm seventeen. And you?", "Tengo diecisiete. ¿Y tú?"],
      ["Ana", "I'm eighteen. What's your phone number?", "Tengo dieciocho. ¿Cuál es tu teléfono?"],
      ["Luis", "It's five, five, one, two, three, four.", "Es cinco, cinco, uno, dos, tres, cuatro."],
      ["Ana", "How do you spell your name?", "¿Cómo se deletrea tu nombre?"],
      ["Luis", "L, U, I, S.", "L, U, I, S."]
    ],
    quiz: [
      { q: "¿Qué número es «fifteen»?", options: ["50", "15", "5", "55"], answer: 1, explain: "Fifteen = 15. Fifty = 50." },
      { q: "¿Cómo se dice 21 en inglés?", options: ["twenty-one", "two-one", "twenty and one", "one-twenty"], answer: 0, explain: "Del 21 al 99 se usa decena + guion + unidad." },
      { q: "¿Cómo se pregunta la edad?", options: ["How many years are you?", "How old are you?", "What age have you?", "How are old you?"], answer: 1, explain: "How old are you? y se responde I'm 17." },
      { q: "«I'm seventeen.» significa…", options: ["Tengo 17 años.", "Tengo 70 años.", "Soy el número 17.", "Vivo en el 17."], answer: 0, explain: "Con la edad se usa to be, no «have»." },
      { q: "¿Cómo se lee el símbolo @ en un correo?", options: ["dot", "at", "plus", "line"], answer: 1, explain: "@ se dice at y el punto se dice dot." },
      { q: "Escuchas «L, E, D». ¿Qué palabra se deletrea?", options: ["LID", "LED", "LAD", "LEAD"], answer: 1, explain: "L-E-D se pronuncia «el, i, di»." }
    ],
    talk: {
      es: "Practiquen números: edad, teléfono y deletreo de nombres. Pídele que te deletree su nombre completo y el de un componente (LED, motor, sensor).",
      questions: [["How old are you?", "¿Cuántos años tienes?"], ["What's your phone number?", "¿Cuál es tu número de teléfono?"], ["How do you spell your last name?", "¿Cómo se deletrea tu apellido?"], ["Count from one to twenty.", "Cuenta del uno al veinte."], ["How many fingers do I have?", "¿Cuántos dedos tengo?"]]
    }
  },

  // ------------------------------------------------------------------ 3
  {
    id: 3, phase: "A1", title: "About me & you: el verbo to be completo",
    goal: "Hablar de quién eres y de dónde eres; negar y preguntar con to be.",
    grammar: [
      { title: "To be con todas las personas",
        text: "I am (I'm) · you are (you're) · he is (he's) · she is (she's) · it is (it's) · we are (we're) · they are (they're). He se usa para hombres, she para mujeres e it para cosas y animales.",
        examples: [["She's an engineer.", "Ella es ingeniera."], ["We're students.", "Somos estudiantes."], ["It's a sensor.", "Es un sensor."]] },
      { title: "Negativas: not",
        text: "Se agrega not después de to be: I am not (I'm not), he is not (he isn't), they are not (they aren't).",
        examples: [["I'm not tired.", "No estoy cansado."], ["He isn't a teacher.", "Él no es maestro."], ["They aren't here.", "Ellos no están aquí."]] },
      { title: "Preguntas y respuestas cortas",
        text: "Para preguntar se invierte el orden: Are you…? Is he…? Se responde corto: «Yes, I am» / «No, I'm not». Para el origen: «Where are you from?» → «I'm from Mexico».",
        examples: [["Are you tired?", "¿Estás cansado?"], ["Yes, I am.", "Sí."], ["Where are you from?", "¿De dónde eres?"], ["I'm from Mexico.", "Soy de México."]] }
    ],
    vocab: parseVocab([
      "Mexico|México|I'm from Mexico.|Soy de México.",
      "Mexican|mexicano|He's Mexican.|Él es mexicano.",
      "American|estadounidense|She's American.|Ella es estadounidense.",
      "country|país|Mexico is a big country.|México es un país grande.",
      "city|ciudad|It's a big city.|Es una ciudad grande.",
      "from|de (origen)|I'm from Puebla.|Soy de Puebla.",
      "where|dónde|Where are you?|¿Dónde estás?",
      "who|quién|Who is she?|¿Quién es ella?",
      "teacher|maestro, maestra|She's a teacher.|Ella es maestra.",
      "friend|amigo, amiga|He's my friend.|Él es mi amigo.",
      "boy|niño, chico|He's a boy.|Es un niño.",
      "girl|niña, chica|She's a girl.|Es una niña.",
      "man|hombre|He's a man.|Es un hombre.",
      "woman|mujer|She's a woman.|Es una mujer.",
      "happy|feliz|We're happy.|Estamos felices.",
      "tired|cansado|I'm tired.|Estoy cansado.",
      "here|aquí|They're here.|Están aquí.",
      "T:technician|técnico|He's a technician.|Él es técnico.",
      "T:programmer|programador|She's a programmer.|Ella es programadora."
    ]),
    dialogue: [
      ["Ana", "Where are you from, Luis?", "¿De dónde eres, Luis?"],
      ["Luis", "I'm from Puebla. I'm Mexican. And you?", "Soy de Puebla. Soy mexicano. ¿Y tú?"],
      ["Ana", "I'm from Chicago. I'm American.", "Soy de Chicago. Soy estadounidense."],
      ["Luis", "Is your teacher American, too?", "¿Tu maestro también es estadounidense?"],
      ["Ana", "No, he isn't. He's Mexican.", "No. Es mexicano."],
      ["Luis", "Are you tired?", "¿Estás cansada?"]
    ],
    quiz: [
      { q: "She ___ a programmer.", options: ["am", "is", "are", "be"], answer: 1, explain: "Con he, she e it se usa is." },
      { q: "We ___ students.", options: ["is", "am", "are", "be"], answer: 2, explain: "Con we, you y they se usa are." },
      { q: "Forma negativa de «He is a teacher»:", options: ["He not is a teacher.", "He isn't a teacher.", "He no is a teacher.", "He don't a teacher."], answer: 1, explain: "Se agrega not después de is: isn't." },
      { q: "¿Cómo se pregunta «¿Eres ingeniero?»?", options: ["You are an engineer?", "Are you an engineer?", "Do you an engineer?", "Is you an engineer?"], answer: 1, explain: "En la pregunta se invierte el orden: Are you…?" },
      { q: "«Where are you from?» significa…", options: ["¿Dónde vives?", "¿A dónde vas?", "¿De dónde eres?", "¿Quién eres?"], answer: 2, explain: "from indica origen." },
      { q: "Responde «Is she a teacher?» (sí):", options: ["Yes, she is.", "Yes, she does.", "Yes, she are.", "Yes, is."], answer: 0, explain: "Respuesta corta: Yes, she is." }
    ],
    talk: {
      es: "Pregunten de dónde es cada quien, a qué se dedica y cómo se siente. Usa he, she, we y they hablando de personas de la familia.",
      questions: [["Where are you from?", "¿De dónde eres?"], ["Are you tired today?", "¿Estás cansado hoy?"], ["Is your mother a teacher?", "¿Tu mamá es maestra?"], ["Who is your best friend?", "¿Quién es tu mejor amigo?"], ["Are you happy today?", "¿Estás feliz hoy?"]]
    }
  },

  // ------------------------------------------------------------------ 4
  {
    id: 4, phase: "A1", title: "My family & my things: familia y objetos",
    goal: "Hablar de tu familia y tus cosas con my, your, his, her; usar a/an, plurales y this/that.",
    grammar: [
      { title: "Posesivos",
        text: "my (mi), your (tu), his (su, de él), her (su, de ella), our (nuestro), their (su, de ellos). Van antes del sustantivo y no cambian con el plural: my brother, my brothers.",
        examples: [["This is my sister.", "Ella es mi hermana."], ["His phone is new.", "Su teléfono (de él) es nuevo."], ["Their house is big.", "Su casa (de ellos) es grande."]] },
      { title: "A y an",
        text: "a va antes de sonido de consonante (a book, a phone) y an antes de sonido de vocal (an engineer, an LED). Se usa con un solo objeto.",
        examples: [["It's a laptop.", "Es una laptop."], ["It's an engineer.", "Es un ingeniero."], ["It's an LED.", "Es un LED."]] },
      { title: "Plurales",
        text: "Normalmente se agrega -s: book → books. Si termina en s, x, ch o sh se agrega -es: box → boxes. Algunos son irregulares: man → men, woman → women, child → children.",
        examples: [["Two books.", "Dos libros."], ["Three boxes.", "Tres cajas."], ["Two women and three men.", "Dos mujeres y tres hombres."]] },
      { title: "This, that, these, those",
        text: "this (este, cerca) y that (ese, lejos) para uno; these (estos, cerca) y those (esos, lejos) para varios. Para la posesión se usa 's: Ana's phone = el teléfono de Ana.",
        examples: [["This is my phone.", "Este es mi teléfono."], ["Those are my books.", "Esos son mis libros."], ["It's Ana's laptop.", "Es la laptop de Ana."]] }
    ],
    vocab: parseVocab([
      "mother|madre|My mother is a teacher.|Mi mamá es maestra.",
      "father|padre|My father is tall.|Mi papá es alto.",
      "brother|hermano|His brother is here.|Su hermano está aquí.",
      "sister|hermana|Her sister is happy.|Su hermana está feliz.",
      "parents|padres (mamá y papá)|My parents are at home.|Mis papás están en casa.",
      "uncle|tío|My uncle is American.|Mi tío es estadounidense.",
      "aunt|tía|My aunt is a teacher.|Mi tía es maestra.",
      "cousin|primo, prima|Her cousin is tired.|Su primo está cansado.",
      "family|familia|This is my family.|Esta es mi familia.",
      "phone|teléfono|This is my phone.|Este es mi teléfono.",
      "book|libro|That's her book.|Ese es su libro.",
      "bag|mochila, bolsa|My bag is blue.|Mi mochila es azul.",
      "pen|pluma|It's a pen.|Es una pluma.",
      "laptop|laptop|Is that your laptop?|¿Esa es tu laptop?",
      "table|mesa|The book is on the table.|El libro está en la mesa.",
      "T:cable|cable|This cable is short.|Este cable es corto.",
      "T:battery|batería|The battery is empty.|La batería está vacía.",
      "T:screen|pantalla|The screen is big.|La pantalla es grande."
    ]),
    dialogue: [
      ["Ana", "Who is this?", "¿Quién es este?"],
      ["Luis", "This is my brother. His name is Mario.", "Es mi hermano. Se llama Mario."],
      ["Ana", "And who are those people?", "¿Y quiénes son esas personas?"],
      ["Luis", "Those are my parents. My father is an engineer.", "Son mis papás. Mi papá es ingeniero."],
      ["Ana", "Is that your laptop?", "¿Esa es tu laptop?"],
      ["Luis", "No, it's my brother's laptop.", "No, es la laptop de mi hermano."]
    ],
    quiz: [
      { q: "This is ___ sister. (de ella)", options: ["his", "her", "their", "my's"], answer: 1, explain: "her = su (de ella)." },
      { q: "It's ___ LED.", options: ["a", "an", "the a", "two"], answer: 1, explain: "LED empieza con sonido de vocal (el), así que se usa an." },
      { q: "Plural de «box»:", options: ["boxs", "boxes", "boxies", "boxen"], answer: 1, explain: "Las palabras que terminan en x llevan -es." },
      { q: "Plural de «woman»:", options: ["womans", "womanes", "women", "womens"], answer: 2, explain: "woman → women es irregular." },
      { q: "___ are my books. (varios, lejos)", options: ["This", "That", "These", "Those"], answer: 3, explain: "those = esos (varios y lejos)." },
      { q: "«Ana's phone» significa…", options: ["Ana es un teléfono.", "El teléfono de Ana.", "Ana tiene teléfonos.", "Teléfono para Ana."], answer: 1, explain: "'s indica posesión." }
    ],
    talk: {
      es: "Hablen de la familia de ambos usando my, his y her. Enséñale objetos de la casa y pregúntale qué son.",
      questions: [["Who is this? (señala a un familiar)", "¿Quién es este?"], ["What's your mother's name?", "¿Cómo se llama tu mamá?"], ["Is this your phone?", "¿Este es tu teléfono?"], ["Are those your books?", "¿Esos son tus libros?"], ["Is your father an engineer?", "¿Tu papá es ingeniero?"]]
    }
  },

  // ------------------------------------------------------------------ 5
  {
    id: 5, phase: "A1", title: "The lab: herramientas, componentes y lugares",
    goal: "Describir qué hay en un laboratorio: there is/are, colores, tamaños y preposiciones de lugar.",
    grammar: [
      { title: "There is / There are",
        text: "There is se usa con uno (singular): There is a motor. There are se usa con varios: There are two LEDs. Negativo: There isn't… / There aren't… Pregunta: Is there…? / Are there…?",
        examples: [["There is a motor on the table.", "Hay un motor en la mesa."], ["There are three resistors.", "Hay tres resistencias."], ["Is there a switch?", "¿Hay un interruptor?"]] },
      { title: "Adjetivos y colores",
        text: "El adjetivo va antes del sustantivo y no cambia de forma: a red wire, two red wires. No se usa «de» ni se pone al final como en español.",
        examples: [["A small motor.", "Un motor pequeño."], ["Two black wires.", "Dos cables negros."], ["The green LED is on.", "El LED verde está encendido."]] },
      { title: "Preposiciones de lugar",
        text: "in (dentro de), on (sobre), under (debajo de), next to (junto a), between (entre), in front of (enfrente de), behind (detrás de).",
        examples: [["The tool is in the box.", "La herramienta está en la caja."], ["The LED is next to the resistor.", "El LED está junto a la resistencia."], ["The laptop is on the table.", "La laptop está sobre la mesa."]] }
    ],
    vocab: parseVocab([
      "lab|laboratorio|We are in the lab.|Estamos en el laboratorio.",
      "tool|herramienta|This tool is new.|Esta herramienta es nueva.",
      "screwdriver|desarmador|The screwdriver is on the table.|El desarmador está sobre la mesa.",
      "pliers|pinzas|Where are the pliers?|¿Dónde están las pinzas?",
      "hammer|martillo|The hammer is heavy.|El martillo es pesado.",
      "T:wire|cable, alambre|There is a red wire.|Hay un cable rojo.",
      "T:resistor|resistencia|There are two resistors.|Hay dos resistencias.",
      "T:LED|LED, diodo emisor de luz|The LED is green.|El LED es verde.",
      "T:switch|interruptor|The switch is off.|El interruptor está apagado.",
      "T:motor|motor|The motor is small.|El motor es pequeño.",
      "T:breadboard|protoboard|The wires are on the breadboard.|Los cables están en el protoboard.",
      "T:microcontroller|microcontrolador|The microcontroller is in the box.|El microcontrolador está en la caja.",
      "T:button|botón|Press the red button.|Presiona el botón rojo.",
      "red|rojo|A red wire.|Un cable rojo.",
      "blue|azul|A blue LED.|Un LED azul.",
      "green|verde|The green light is on.|La luz verde está encendida.",
      "black|negro|The black wire is short.|El cable negro es corto.",
      "white|blanco|A white button.|Un botón blanco.",
      "yellow|amarillo|A yellow cable.|Un cable amarillo.",
      "small|pequeño|A small motor.|Un motor pequeño.",
      "big|grande|A big table.|Una mesa grande.",
      "next to|junto a|The LED is next to the button.|El LED está junto al botón.",
      "under|debajo de|The box is under the table.|La caja está debajo de la mesa.",
      "between|entre|The resistor is between two wires.|La resistencia está entre dos cables."
    ]),
    dialogue: [
      ["Teacher", "Welcome to the lab. There is a table here.", "Bienvenidos al laboratorio. Aquí hay una mesa."],
      ["Luis", "What's on the table?", "¿Qué hay sobre la mesa?"],
      ["Teacher", "There are two LEDs, three resistors and a small motor.", "Hay dos LED, tres resistencias y un motor pequeño."],
      ["Luis", "Where is the screwdriver?", "¿Dónde está el desarmador?"],
      ["Teacher", "It's in the blue box, next to the pliers.", "Está en la caja azul, junto a las pinzas."],
      ["Luis", "Thank you. Is there a breadboard?", "Gracias. ¿Hay un protoboard?"]
    ],
    quiz: [
      { q: "___ two LEDs on the table.", options: ["There is", "There are", "It is", "They is"], answer: 1, explain: "Con varios (two LEDs) se usa There are." },
      { q: "¿Cuál oración es correcta?", options: ["A wire red.", "A red wire.", "A wire of red.", "Red a wire."], answer: 1, explain: "El adjetivo va antes del sustantivo." },
      { q: "«The box is under the table.» significa…", options: ["La caja está sobre la mesa.", "La caja está debajo de la mesa.", "La caja está junto a la mesa.", "La caja es la mesa."], answer: 1, explain: "under = debajo de." },
      { q: "Pregunta: «¿Hay un motor?»", options: ["There is a motor?", "Is there a motor?", "Are there motor?", "Has a motor?"], answer: 1, explain: "Is there a…? para singular." },
      { q: "The LED is ___ the resistor. (junto a)", options: ["between", "under", "next to", "in"], answer: 2, explain: "next to = junto a." },
      { q: "Plural correcto:", options: ["a resistors", "two resistor", "two resistors", "two resistores"], answer: 2, explain: "Después de un número mayor que uno el sustantivo va en plural." }
    ],
    talk: {
      es: "Escojan un lugar de la casa (cocina, cuarto, patio) y descríbanlo con there is / there are, colores y lugares. Después busquen en casa herramientas y dirijan con in, on y next to.",
      questions: [["What is on the table?", "¿Qué hay sobre la mesa?"], ["Is there a screwdriver in the house?", "¿Hay un desarmador en la casa?"], ["Where is your phone?", "¿Dónde está tu teléfono?"], ["What color is your bag?", "¿De qué color es tu mochila?"], ["How many chairs are there?", "¿Cuántas sillas hay?"]]
    }
  },

  // ------------------------------------------------------------------ 6
  {
    id: 6, phase: "A1", title: "My day: tu rutina con presente simple",
    goal: "Decir qué haces cada día y a qué hora, con el presente simple afirmativo.",
    grammar: [
      { title: "Presente simple (afirmativo)",
        text: "Se usa para rutinas y hechos. Con I, you, we y they el verbo no cambia: I study. Con he, she e it se agrega -s: he studies. Si termina en s, sh, ch, x u o se agrega -es: she watches, he goes. Si termina en consonante + y, cambia a -ies: study → studies.",
        examples: [["I work in the lab.", "Trabajo en el laboratorio."], ["He works at home.", "Él trabaja en casa."], ["She studies at night.", "Ella estudia en la noche."]] },
      { title: "La hora y los días",
        text: "Para la hora se usa at: at seven o'clock (a las siete), at half past seven (a las siete y media). Los días llevan on: on Monday. Partes del día: in the morning, in the afternoon, in the evening, at night.",
        examples: [["I get up at six o'clock.", "Me levanto a las seis."], ["I study on Monday.", "Estudio los lunes."], ["He goes home in the afternoon.", "Él se va a casa en la tarde."]] }
    ],
    vocab: parseVocab([
      "wake up|despertarse|I wake up at six.|Me despierto a las seis.",
      "get up|levantarse|He gets up at seven.|Él se levanta a las siete.",
      "have breakfast|desayunar|We have breakfast at home.|Desayunamos en casa.",
      "have lunch|comer (almuerzo)|I have lunch at two.|Como a las dos.",
      "go to school|ir a la escuela|She goes to school at eight.|Ella va a la escuela a las ocho.",
      "study|estudiar|I study English every day.|Estudio inglés todos los días.",
      "work|trabajar|My father works in a lab.|Mi papá trabaja en un laboratorio.",
      "go home|irse a casa|They go home at five.|Se van a casa a las cinco.",
      "sleep|dormir|I sleep at eleven.|Duermo a las once.",
      "Monday|lunes|On Monday I study.|Los lunes estudio.",
      "Tuesday|martes|Tuesday is a lab day.|El martes es día de laboratorio.",
      "Wednesday|miércoles|On Wednesday I work.|Los miércoles trabajo.",
      "Thursday|jueves|Thursday is my favorite day.|El jueves es mi día favorito.",
      "Friday|viernes|On Friday I go home early.|Los viernes me voy temprano a casa.",
      "Saturday|sábado|On Saturday I rest.|Los sábados descanso.",
      "Sunday|domingo|Sunday is a family day.|El domingo es día familiar.",
      "morning|mañana (parte del día)|I study in the morning.|Estudio por la mañana.",
      "afternoon|tarde|We work in the afternoon.|Trabajamos por la tarde.",
      "night|noche|I sleep at night.|Duermo por la noche.",
      "T:code|código|I write code every day.|Escribo código todos los días.",
      "T:program|programar|She programs a robot.|Ella programa un robot.",
      "T:test|probar|He tests the motor.|Él prueba el motor."
    ]),
    dialogue: [
      ["Ana", "What time do you get up, Luis?", "¿A qué hora te levantas, Luis?"],
      ["Luis", "I get up at six o'clock.", "Me levanto a las seis."],
      ["Ana", "Do you have breakfast at home?", "¿Desayunas en casa?"],
      ["Luis", "Yes, I do. Then I go to school.", "Sí. Luego voy a la escuela."],
      ["Ana", "What do you do in the afternoon?", "¿Qué haces por la tarde?"],
      ["Luis", "I study English and I write code.", "Estudio inglés y escribo código."]
    ],
    quiz: [
      { q: "He ___ in a lab.", options: ["work", "works", "working", "is work"], answer: 1, explain: "Con he, she e it el verbo lleva -s: works." },
      { q: "She ___ TV. (watch)", options: ["watchs", "watchies", "watches", "watch"], answer: 2, explain: "Los verbos que terminan en -ch llevan -es." },
      { q: "I get up ___ six o'clock.", options: ["in", "on", "at", "to"], answer: 2, explain: "Para la hora se usa at." },
      { q: "I study ___ Monday.", options: ["in", "on", "at", "of"], answer: 1, explain: "Con días se usa on." },
      { q: "He ___ to school. (go)", options: ["go", "gos", "goes", "going"], answer: 2, explain: "go → goes." },
      { q: "She ___ English. (study)", options: ["studys", "studies", "study", "studyes"], answer: 1, explain: "Consonante + y cambia a -ies." }
    ],
    talk: {
      es: "Cada quien cuenta su día de mañana a noche, con horas. Después él cuenta el día de otra persona usando he o she.",
      questions: [["What time do you get up?", "¿A qué hora te levantas?"], ["What do you have for breakfast?", "¿Qué desayunas?"], ["What time do you go to school?", "¿A qué hora vas a la escuela?"], ["What do you do on Saturday?", "¿Qué haces los sábados?"], ["What time do you sleep?", "¿A qué hora duermes?"]]
    }
  },

  // ------------------------------------------------------------------ 7
  {
    id: 7, phase: "A1", title: "Habits: hábitos, negativas y preguntas",
    goal: "Decir qué haces y qué no haces; preguntar con do/does; usar adverbios de frecuencia.",
    grammar: [
      { title: "Negativas: don't / doesn't",
        text: "Con I, you, we y they se usa don't (do not): I don't work on Sunday. Con he, she e it se usa doesn't (does not) y el verbo vuelve a su forma básica, sin -s: He doesn't work.",
        examples: [["I don't like coffee.", "No me gusta el café."], ["She doesn't work on Sunday.", "Ella no trabaja los domingos."]] },
      { title: "Preguntas: do / does",
        text: "Do you…? Do they…? Does he…? Does she…? Respuesta corta: Yes, I do. / No, she doesn't. Con preguntas de información: What do you study? Where does he work? What time do you get up?",
        examples: [["Do you study every day?", "¿Estudias todos los días?"], ["Yes, I do.", "Sí."], ["Does he play videogames?", "¿Él juega videojuegos?"], ["Where does she work?", "¿Dónde trabaja ella?"]] },
      { title: "Adverbios de frecuencia",
        text: "always (siempre), usually (normalmente), often (a menudo), sometimes (a veces), never (nunca). Van antes del verbo principal: I always study. Con to be van después: I am always tired. Para preguntar: «How often…?»",
        examples: [["I usually have lunch at two.", "Normalmente como a las dos."], ["He never works on Sunday.", "Él nunca trabaja el domingo."], ["How often do you study?", "¿Con qué frecuencia estudias?"]] }
    ],
    vocab: parseVocab([
      "always|siempre|I always study at night.|Siempre estudio de noche.",
      "usually|normalmente|She usually works at home.|Ella normalmente trabaja en casa.",
      "often|a menudo|We often play football.|A menudo jugamos futbol.",
      "sometimes|a veces|I sometimes watch videos.|A veces veo videos.",
      "never|nunca|He never eats late.|Él nunca come tarde.",
      "every day|todos los días|I practice every day.|Practico todos los días.",
      "weekend|fin de semana|I rest on the weekend.|Descanso el fin de semana.",
      "like|gustar|I like music.|Me gusta la música.",
      "play|jugar, tocar|He plays videogames.|Él juega videojuegos.",
      "watch|ver, mirar|I watch videos in English.|Veo videos en inglés.",
      "read|leer|She reads every night.|Ella lee todas las noches.",
      "listen|escuchar|I listen to music.|Escucho música.",
      "music|música|I like rock music.|Me gusta el rock.",
      "eat|comer|We eat at two.|Comemos a las dos.",
      "drink|beber|I drink water.|Bebo agua.",
      "T:measure|medir|I measure the voltage.|Mido el voltaje.",
      "T:check|revisar|He checks the cable.|Él revisa el cable.",
      "T:update|actualizar|We update the program.|Actualizamos el programa."
    ]),
    dialogue: [
      ["Ana", "Do you play videogames, Luis?", "¿Juegas videojuegos, Luis?"],
      ["Luis", "Yes, I do. I play on the weekend.", "Sí. Juego el fin de semana."],
      ["Ana", "How often do you study English?", "¿Con qué frecuencia estudias inglés?"],
      ["Luis", "I study every day. I never miss a day.", "Estudio todos los días. Nunca falto un día."],
      ["Ana", "Does your sister study English too?", "¿Tu hermana también estudia inglés?"],
      ["Luis", "No, she doesn't. She studies French.", "No. Ella estudia francés."]
    ],
    quiz: [
      { q: "He ___ like coffee.", options: ["don't", "doesn't", "isn't", "not"], answer: 1, explain: "Con he se usa doesn't." },
      { q: "She doesn't ___ on Sunday.", options: ["works", "work", "working", "worked"], answer: 1, explain: "Después de doesn't el verbo va en su forma básica." },
      { q: "___ you study every day?", options: ["Does", "Do", "Are", "Is"], answer: 1, explain: "Con you se usa Do." },
      { q: "___ he play videogames?", options: ["Do", "Is", "Does", "Are"], answer: 2, explain: "Con he se usa Does." },
      { q: "Where does the adverb go? «I ___ study at night.»", options: ["study always", "always", "study", "always study"], answer: 1, explain: "El adverbio va antes del verbo: I always study." },
      { q: "«How often do you study?» pregunta por…", options: ["la hora", "el lugar", "la frecuencia", "la persona"], answer: 2, explain: "How often = con qué frecuencia." }
    ],
    talk: {
      es: "Pregúntense hábitos con Do/Does y How often. Incluye al menos una pregunta con never y una con always.",
      questions: [["Do you play videogames?", "¿Juegas videojuegos?"], ["How often do you study English?", "¿Con qué frecuencia estudias inglés?"], ["Does your family eat together?", "¿Tu familia come junta?"], ["What do you usually do on the weekend?", "¿Qué haces normalmente el fin de semana?"], ["Do you always sleep eight hours?", "¿Siempre duermes ocho horas?"]]
    }
  },

  // ------------------------------------------------------------------ 8
  {
    id: 8, phase: "A1", title: "Abilities & instructions: can, can't y órdenes",
    goal: "Decir lo que puedes hacer, pedir ayuda y dar o entender instrucciones y avisos de seguridad.",
    grammar: [
      { title: "Can y can't",
        text: "can expresa habilidad o permiso («puedo» o «sé»). Es igual para todas las personas y el verbo que sigue no cambia: I can program, she can program. Negativo: can't (cannot). Pregunta: Can you…? Respuesta: Yes, I can. / No, I can't.",
        examples: [["I can program a robot.", "Sé programar un robot."], ["He can't swim.", "Él no sabe nadar."], ["Can you help me?", "¿Puedes ayudarme?"]] },
      { title: "Instrucciones (imperativo)",
        text: "Para dar una orden se usa el verbo sin sujeto: Turn on the motor. Para prohibir se usa Don't: Don't touch the wire. Con please se vuelve amable: Please connect the cable.",
        examples: [["Turn off the power.", "Apaga la energía."], ["Don't touch the motor.", "No toques el motor."], ["Please press the button.", "Por favor presiona el botón."]] },
      { title: "Avisos de seguridad",
        text: "Danger = peligro (hay riesgo serio). Warning = advertencia. Caution = precaución. Hot = caliente. En un laboratorio estas palabras salvan vidas: aprende a reconocerlas rápido.",
        examples: [["Danger! High voltage.", "¡Peligro! Alto voltaje."], ["Caution: hot surface.", "Precaución: superficie caliente."], ["Wear safety glasses.", "Usa lentes de seguridad."]] }
    ],
    vocab: parseVocab([
      "can|poder, saber hacer|I can help you.|Puedo ayudarte.",
      "help|ayudar, ayuda|Can you help me?|¿Puedes ayudarme?",
      "open|abrir|Open the box.|Abre la caja.",
      "close|cerrar|Close the door.|Cierra la puerta.",
      "turn on|encender|Turn on the motor.|Enciende el motor.",
      "turn off|apagar|Turn off the lamp.|Apaga la lámpara.",
      "connect|conectar|Connect the red wire.|Conecta el cable rojo.",
      "disconnect|desconectar|Disconnect the battery.|Desconecta la batería.",
      "press|presionar|Press the green button.|Presiona el botón verde.",
      "touch|tocar|Don't touch the wire.|No toques el cable.",
      "hot|caliente|The motor is hot.|El motor está caliente.",
      "careful|cuidadoso|Be careful!|¡Ten cuidado!",
      "danger|peligro|Danger! High voltage.|¡Peligro! Alto voltaje.",
      "warning|advertencia|Read the warning.|Lee la advertencia.",
      "T:power|energía, alimentación|Turn off the power.|Apaga la energía.",
      "T:safety glasses|lentes de seguridad|Wear safety glasses.|Usa lentes de seguridad.",
      "T:wear|usar, llevar puesto|Wear gloves.|Usa guantes.",
      "T:high voltage|alto voltaje|Danger! High voltage.|¡Peligro! Alto voltaje."
    ]),
    dialogue: [
      ["Teacher", "Luis, can you connect the red wire?", "Luis, ¿puedes conectar el cable rojo?"],
      ["Luis", "Yes, I can. Where?", "Sí puedo. ¿Dónde?"],
      ["Teacher", "To pin five. But first, turn off the power.", "Al pin cinco. Pero primero apaga la energía."],
      ["Luis", "OK. Is the motor hot?", "Está bien. ¿El motor está caliente?"],
      ["Teacher", "Yes. Don't touch it. Be careful.", "Sí. No lo toques. Ten cuidado."],
      ["Luis", "I can't open the box. Can you help me, please?", "No puedo abrir la caja. ¿Puedes ayudarme, por favor?"]
    ],
    quiz: [
      { q: "She ___ program a robot.", options: ["cans", "can", "can to", "is can"], answer: 1, explain: "can no cambia con ninguna persona." },
      { q: "Forma negativa de «I can swim»:", options: ["I don't can swim.", "I can't swim.", "I not can swim.", "I can no swim."], answer: 1, explain: "can't = cannot." },
      { q: "«Turn off the power» significa…", options: ["Enciende la energía.", "Apaga la energía.", "Conecta la energía.", "Toca la energía."], answer: 1, explain: "turn off = apagar." },
      { q: "¿Cuál es una prohibición?", options: ["Press the button.", "Connect the cable.", "Don't touch the wire.", "Please open the box."], answer: 2, explain: "Don't + verbo prohíbe." },
      { q: "«Danger! High voltage.» indica…", options: ["Un descuento.", "Un riesgo serio por alto voltaje.", "Un horario.", "Una ayuda."], answer: 1, explain: "Danger = peligro." },
      { q: "¿Cómo pides ayuda amablemente?", options: ["Help me now.", "Can you help me, please?", "You help me.", "Do help me?"], answer: 1, explain: "Can you…, please? es una petición amable." }
    ],
    talk: {
      es: "Jueguen a dar órdenes: uno da instrucciones (turn on the lamp, open the door, close the window) y el otro las hace. Después pregúntense qué saben hacer con can.",
      questions: [["Can you cook?", "¿Sabes cocinar?"], ["Can you help me, please?", "¿Puedes ayudarme, por favor?"], ["What can you do with a computer?", "¿Qué puedes hacer con una computadora?"], ["Turn on the light, please.", "Enciende la luz, por favor."], ["What does «Danger» mean?", "¿Qué significa «Danger»?"]]
    }
  },

  // ------------------------------------------------------------------ 9
  {
    id: 9, phase: "A1", title: "Right now: lo que pasa ahora (presente continuo)",
    goal: "Decir lo que está pasando en este momento y describir una máquina funcionando.",
    grammar: [
      { title: "Presente continuo",
        text: "Se forma con to be + verbo con -ing: I am working, he is working, they are working. Se usa para lo que pasa ahora o en este momento. Reglas: run → running (se duplica la consonante), make → making (se quita la e), study → studying.",
        examples: [["I'm studying English.", "Estoy estudiando inglés."], ["The motor is running.", "El motor está funcionando."], ["They are testing the robot.", "Están probando el robot."]] },
      { title: "Negativas y preguntas",
        text: "Negativo: I'm not working, he isn't working. Pregunta: Are you working? What are you doing? Respuesta corta: Yes, I am. / No, I'm not.",
        examples: [["The LED isn't blinking.", "El LED no está parpadeando."], ["What are you doing?", "¿Qué estás haciendo?"], ["Is the motor running?", "¿El motor está funcionando?"]] },
      { title: "Presente simple o continuo",
        text: "Presente simple: lo que siempre o habitualmente pasa (I study every day). Presente continuo: lo que pasa ahora (I'm studying now). Palabras clave: now, at the moment, right now.",
        examples: [["I work in the lab every day.", "Trabajo en el laboratorio todos los días."], ["I'm working in the lab now.", "Ahora estoy trabajando en el laboratorio."]] }
    ],
    vocab: parseVocab([
      "now|ahora|I'm studying now.|Ahora estoy estudiando.",
      "at the moment|en este momento|She's working at the moment.|Ella está trabajando en este momento.",
      "right now|ahora mismo|It's raining right now.|Está lloviendo ahora mismo.",
      "run|correr, funcionar|The motor is running.|El motor está funcionando.",
      "stop|detener, parar|The robot is stopping.|El robot se está deteniendo.",
      "move|mover|The arm is moving.|El brazo se está moviendo.",
      "wait|esperar|Please wait.|Por favor espera.",
      "write|escribir|I'm writing code.|Estoy escribiendo código.",
      "listen to|escuchar a|I'm listening to the teacher.|Estoy escuchando al maestro.",
      "T:rotate|girar|The motor is rotating.|El motor está girando.",
      "T:blink|parpadear|The LED is blinking.|El LED está parpadeando.",
      "T:charge|cargar (batería)|The battery is charging.|La batería se está cargando.",
      "T:load|cargar (programa)|The program is loading.|El programa se está cargando.",
      "T:current|corriente|The current is low.|La corriente es baja.",
      "T:voltage|voltaje|The voltage is high.|El voltaje es alto.",
      "T:speed|velocidad|The speed is slow.|La velocidad es lenta.",
      "T:temperature|temperatura|The temperature is rising.|La temperatura está subiendo.",
      "T:fast|rápido|The motor is fast.|El motor es rápido.",
      "T:slow|lento|The computer is slow.|La computadora es lenta."
    ]),
    dialogue: [
      ["Ana", "Luis, what are you doing?", "Luis, ¿qué estás haciendo?"],
      ["Luis", "I'm testing a small robot.", "Estoy probando un robot pequeño."],
      ["Ana", "Is the motor running?", "¿El motor está funcionando?"],
      ["Luis", "Yes, it is. The LED is blinking.", "Sí. El LED está parpadeando."],
      ["Ana", "Is the battery charging?", "¿La batería se está cargando?"],
      ["Luis", "No, it isn't. I'm charging it now.", "No. La estoy cargando ahora."]
    ],
    quiz: [
      { q: "I ___ studying English now.", options: ["am", "is", "are", "do"], answer: 0, explain: "I am + verbo con -ing." },
      { q: "The motor ___ running.", options: ["are", "am", "is", "do"], answer: 2, explain: "Con it se usa is." },
      { q: "«Run» en presente continuo:", options: ["runing", "running", "runninging", "runs"], answer: 1, explain: "Se duplica la n: running." },
      { q: "«Make» en presente continuo:", options: ["makeing", "making", "makking", "makes"], answer: 1, explain: "Se quita la e: making." },
      { q: "¿Cuál oración es del presente continuo?", options: ["I study every day.", "I'm studying now.", "I studied yesterday.", "I'll study."], answer: 1, explain: "am/is/are + verbo con -ing." },
      { q: "Pregunta correcta:", options: ["What you are doing?", "What are you doing?", "What do you doing?", "What you do?"], answer: 1, explain: "What + are + sujeto + verbo-ing." }
    ],
    talk: {
      es: "Describan qué está haciendo cada uno en este momento y qué hace el resto de la familia. Que mire por la ventana o a su alrededor y narre lo que ve: The dog is running, my mother is cooking…",
      questions: [["What are you doing now?", "¿Qué estás haciendo ahora?"], ["What is your mother doing?", "¿Qué está haciendo tu mamá?"], ["Is it raining?", "¿Está lloviendo?"], ["Are you listening to music?", "¿Estás escuchando música?"], ["What is the computer doing?", "¿Qué está haciendo la computadora?"]]
    }
  }
];

// Textos cortos tipo avisos (formato Cambridge A1–A2, parte de lectura de carteles).
const NOTICES = [
  { text: "DANGER – HIGH VOLTAGE. Do not touch.", options: ["You can touch the wires.", "It is dangerous to touch this.", "The lab is closed.", "Turn on the lights."], answer: 1, explain: "Danger indica riesgo serio y Do not touch prohíbe tocar." },
  { text: "Lab open Monday to Friday, 9:00–15:00.", options: ["The lab is open on Saturday.", "The lab is open on weekdays.", "The lab is closed in the morning.", "The lab is open at night."], answer: 1, explain: "Monday to Friday son los días entre semana." },
  { text: "Please turn off the computers before you leave.", options: ["Turn on the computers.", "Turn off the computers when you go.", "Do not use the computers.", "Take the computers home."], answer: 1, explain: "Turn off = apagar; before you leave = antes de irte." },
  { text: "Wear safety glasses in this area.", options: ["Glasses are not allowed.", "You must wear safety glasses.", "Glasses are for sale.", "This area is closed."], answer: 1, explain: "Wear = usar; es una obligación en esta zona." },
  { text: "CAUTION: Hot surface.", options: ["The surface is very cold.", "The surface can be hot.", "The surface is new.", "Sit here, please."], answer: 1, explain: "Caution = precaución; hot = caliente." },
  { text: "No food or drink in the lab.", options: ["You can eat here.", "You can drink water here.", "You can't eat or drink here.", "Food is free."], answer: 2, explain: "No food or drink = prohibido comer o beber." },
  { text: "Back in 10 minutes.", options: ["The person is here now.", "The person is going to return soon.", "The person is not coming back.", "It is ten o'clock."], answer: 1, explain: "Back in 10 minutes = regreso en 10 minutos." },
  { text: "Battery charging. Do not disconnect.", options: ["Disconnect the battery now.", "The battery is full.", "Do not unplug it yet.", "The battery is broken."], answer: 2, explain: "Do not disconnect = no desconectes." }
];
