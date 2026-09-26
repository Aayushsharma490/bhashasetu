export interface CurriculumTopic {
  id: string;
  topic: string;
  topicSat: string;
  nipunCode: string;
  outcome: string;
  overview: string;
  objective: string;
  teacherScriptHi: string;
  teacherScriptSat: string;
  classroomActivityHi: string;
  classroomActivitySat: string;
  studentActivityHi: string;
  studentActivitySat: string;
  assessmentQuestions: Array<{ hi: string; sat: string }>;
  homeActivityHi: string;
  homeActivitySat: string;
  worksheet: {
    instructionsHi: string;
    instructionsSat: string;
    activityTitle: string;
    activityType: 'count' | 'fraction' | 'multiplication' | 'pattern' | 'reading' | 'matching';
    visualItems?: Array<{ label: string; count: number; satCount: string; satOlChiki: string }>;
    mathProblems?: Array<{ questionHi: string; questionSat: string; answer: string; satAnswer: string }>;
    matchingPairs: Array<{ left: string; right: string; rightOlChiki: string }>;
    fillBlanks: Array<{ questionHi: string; questionSat: string; answer: string }>;
    assessmentRubric: Array<{ criteriaHi: string; criteriaSat: string; level: string }>;
  };
}

export type GradeLevel = 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4' | 'Grade 5';
export type SubjectName = 'Mathematics' | 'Foundational Literacy' | 'Environmental Studies';

export const CURRICULUM_MAP: Record<GradeLevel, Record<SubjectName, CurriculumTopic[]>> = {
  'Grade 1': {
    'Mathematics': [
      {
        id: 'g1-math-1',
        topic: 'Number Recognition 1–10 with Objects',
        topicSat: 'ᱮᱞ ᱩᱯᱨᱩᱢ ᱑–᱑᱐ (El Uprum 1–10)',
        nipunCode: 'NIPUN M1.1',
        outcome: 'Associates concrete classroom objects with numbers 1 to 10.',
        overview: 'Foundational numeracy module for Grade 1 introducing digits 1 to 10 through classroom pebbles, leaves, and Ol Chiki numbers.',
        objective: 'Students will count up to 10 objects, pronounce counts in Santali (mit’, bar, pe...), and write the numbers in Ol Chiki (᱑–᱑᱐) and Devanagari.',
        teacherScriptHi: 'बच्चों, अपनी मेज पर रखे कंकड़ देखिए। हम एक-एक करके गिनेंगे: एक, दो, तीन!',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱢᱮᱡᱽ ᱪᱮᱛᱟᱱ ᱨᱮ ᱢᱮᱱᱟᱜ ᱨᱩᱜᱽᱲᱤ ᱠᱚ ᱧᱮᱞ ᱯᱮ᱾ ᱢᱤᱫ-ᱢᱤᱫ ᱛᱮ ᱵᱚᱱ ᱞᱮᱠᱷᱟᱭᱟ: ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ!',
        classroomActivityHi: 'शिक्षक टोकरी से पत्ते निकालेंगे। बच्चे ताली बजाकर संताली में संख्या बोलेंगे (१: मिद, २: बार, ३: पे)।',
        classroomActivitySat: 'ᱢᱟᱹᱪᱮᱛ ᱴᱩᱠᱤ ᱠᱷᱚᱱ ᱥᱟᱠᱟᱢ ᱮ ᱚᱰᱚᱠᱟ᱾ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱷᱟᱹᱭᱟᱹ ᱛᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱮᱞ ᱠᱚ ᱞᱟᱹᱭᱟ (᱑: ᱢᱤᱫ, ᱒: ᱵᱟᱨ, ᱓: ᱯᱮ)᱾',
        studentActivityHi: 'विद्यार्थी अपनी स्लेट पर 1 से 5 तक बिंदियां बनाकर उनके आगे Ol Chiki अंक लिखेंगे।',
        studentActivitySat: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱥᱞᱮᱴ ᱨᱮ ᱑ ᱠᱷᱚᱱ ᱕ ᱫᱷᱟᱹᱵᱤᱡ ᱴᱩᱰᱟᱹᱜ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'यह कितने पत्ते हैं? संताली में बोलिए।', sat: 'ᱱᱚᱣᱟ ᱛᱤᱱᱟᱹᱜ ᱥᱟᱠᱟᱢ ᱠᱟᱱᱟ? ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱞᱟᱹᱭ ᱢᱮ᱾' },
          { hi: 'तीन को Ol Chiki में कैसे लिखते हैं?', sat: 'ᱯᱮ (3) ᱫᱚ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱪᱮᱫ ᱞᱮᱠᱟ ᱠᱚ ᱚᱞᱟ?' }
        ],
        homeActivityHi: 'घर जाकर रसोई में 5 कटोरियां या चम्मच गिनकर माता-पिता को संताली में सुनाएं।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱪᱟᱞᱟᱣ ᱠᱟᱛᱮ ᱚᱲᱟᱜ ᱨᱮ ᱕ ᱜᱚᱴᱟᱝ ᱵᱟᱹᱴᱤ ᱥᱮ ᱪᱟᱢᱚᱪ ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱟᱭᱳ-ᱵᱟᱵᱟ ᱞᱟᱹᱭ ᱟᱹᱠᱤᱱ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'चित्रों को ध्यान से गिनें और खाली बॉक्स में सही संख्या Ol Chiki (᱑–᱑᱐) में लिखें।',
          instructionsSat: 'ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱱᱟᱯᱟᱭ ᱛᱮ ᱞᱮᱠᱷᱟᱭ ᱯᱮ ᱟᱨ ᱠᱷᱟᱹᱞᱤ ᱵᱟᱠᱥᱟ ᱨᱮ ᱥᱟᱹᱨᱤ ᱮᱞ ᱚᱞ ᱪᱤᱠᱤ (᱑–᱑᱐) ᱛᱮ ᱚᱞ ᱯᱮ᱾',
          activityTitle: 'चित्र गणना एवं Ol Chiki अंक लेखन (Visual Object Count)',
          activityType: 'count',
          visualItems: [
            { label: 'आम (Ul / ᱩᱞ)', count: 3, satCount: 'ᱯᱮ', satOlChiki: '᱓' },
            { label: 'पत्तियां (Sakam / ᱥᱟᱠᱟᱢ)', count: 5, satCount: 'ᱢᱚᱬᱮ', satOlChiki: '᱕' },
            { label: 'चिड़िया (Cẽṛẽ / ᱪᱮᱬᱮ)', count: 2, satCount: 'ᱵᱟᱨ', satOlChiki: '᱒' },
            { label: 'मछली (Haku / ᱦᱟᱹᱠᱩ)', count: 4, satCount: 'ᱯᱩᱱ', satOlChiki: '᱔' }
          ],
          matchingPairs: [
            { left: '१ (एक)', right: 'mit’', rightOlChiki: 'ᱢᱤᱫ (᱑)' },
            { left: '२ (दो)', right: 'bar', rightOlChiki: 'ᱵᱟᱨ (᱒)' },
            { left: '३ (तीन)', right: 'pe', rightOlChiki: 'ᱯᱮ (᱓)' },
            { left: '४ (चार)', right: 'pun', rightOlChiki: 'ᱯᱩᱱ (᱔)' },
            { left: '५ (पाँच)', right: 'mõṛẽ', rightOlChiki: 'ᱢᱚᱬᱮ (᱕)' }
          ],
          fillBlanks: [
            { questionHi: '१, २, __, ४, ५ में खाली जगह पर क्या आएगा?', questionSat: '᱑, ᱒, __, ᱔, ᱕ ᱨᱮ ᱠᱷᱟᱹᱞᱤ ᱴᱷᱟᱶ ᱨᱮ ᱪᱮᱫ ᱦᱤᱡᱩᱜᱼᱟ?', answer: '३ (ᱯᱮ / ᱓)' },
            { questionHi: 'हाथ की उंगलियां एक हाथ में __ होती हैं।', questionSat: 'ᱢᱤᱫ ᱛᱤ ᱨᱮ __ ᱜᱚᱴᱟᱝ ᱠᱟᱹᱴᱩᱵ ᱢᱮᱱᱟᱜᱼᱟ᱾', answer: '५ (ᱢᱚᱬᱮ / ᱕)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'वस्तुओं को सही संख्या 1-10 तक गिनना', criteriaSat: 'ᱡᱤᱱᱤᱥ ᱠᱚ ᱑-᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱥᱟᱹᱨᱤ ᱞᱮᱠᱷᱟ', level: 'निपुण (Competent)' },
            { criteriaHi: 'Ol Chiki अंक पहचानना और बोलना', criteriaSat: 'ᱚᱞ ᱪᱤᱠᱤ ᱮᱞ ᱩᱯᱨᱩᱢ ᱟᱨ ᱨᱚᱲ', level: 'प्रगति पर (In Progress)' }
          ]
        }
      }
    ],
    'Foundational Literacy': [
      {
        id: 'g1-lit-1',
        topic: 'First Words & Vowel Sounds in Ol Chiki',
        topicSat: 'ᱯᱩᱭᱞᱩ ᱟᱹᱲᱟᱹ ᱟᱨ ᱨᱟᱦᱟ ᱟᱲᱟᱝ (Puylu Aṛạ ar Raha Aṛaṅ)',
        nipunCode: 'NIPUN L1.2',
        outcome: 'Recognizes initial vowel sounds (ᱚ, ᱟ, ᱤ, ᱩ, ᱮ, ᱳ) and simple words.',
        overview: 'Oral language and phonemic awareness connecting spoken Santali words to written Ol Chiki vowels.',
        objective: 'Students will pronounce 6 Ol Chiki vowels and name 3 familiar objects for each sound.',
        teacherScriptHi: 'बच्चों, सुनिए और मेरे पीछे बोलिए: ᱚ (अ), ᱟ (आ), ᱤ (इ), ᱩ (उ), ᱮ (ए), ᱳ (ओ)।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱸᱡᱚᱢ ᱯᱮ ᱟᱨ ᱤᱧ ᱛᱟᱭᱚᱢ ᱨᱚᱲ ᱯᱮ: ᱚ, ᱟ, ᱤ, ᱩ, ᱮ, ᱳ᱾',
        classroomActivityHi: 'ध्वनि पहचान खेल: जब शिक्षक "ᱟ" बोलें, तो बच्चे "ᱟᱭᱳ" (माँ) कहकर हाथ उठाएंगे।',
        classroomActivitySat: 'ᱟᱲᱟᱝ ᱩᱯᱨᱩᱢ ᱮᱱᱮᱡ: ᱡᱚᱠᱷᱚᱱ ᱢᱟᱹᱪᱮᱛ "ᱟ" ᱮ ᱢᱮᱱᱟ, ᱜᱤᱫᱽᱨᱟᱹ "ᱟᱭᱳ" ᱢᱮᱱ ᱠᱟᱛᱮ ᱛᱤ ᱠᱚ ᱛᱩᱞᱟ᱾',
        studentActivityHi: 'विद्यार्थी रेत या स्लेट पर "ᱟ" और "ᱚ" को उंगली से उकेरेंगे।',
        studentActivitySat: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱜᱤᱛᱤᱞ ᱥᱮ ᱥᱞᱮᱴ ᱨᱮ "ᱟ" ᱟᱨ "ᱚ" ᱠᱟᱹᱴᱩᱵ ᱛᱮ ᱠᱚ ᱚᱞᱟ᱾',
        assessmentQuestions: [
          { hi: '"ᱟᱭᱳ" (माँ) शब्द किस स्वर से शुरू होता है?', sat: '"ᱟᱭᱳ" ᱟᱹᱲᱟᱹ ᱫᱚ ᱚᱠᱟ ᱨᱟᱦᱟ ᱟᱲᱟᱝ ᱛᱮ ᱮᱦᱚᱵᱚᱜ ᱠᱟᱱᱟ?' }
        ],
        homeActivityHi: 'घर के सदस्यों से उनकी मातृभाषा में 3 शब्दों के पहले अक्षर पूछें।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱦᱚᱲ ᱴᱷᱮᱱ ᱠᱷᱚᱱ ᱟᱠᱚᱣᱟᱜ ᱟᱲᱟᱝ ᱛᱮ ᱓ ᱜᱚᱴᱟᱝ ᱟᱹᱲᱟᱹ ᱨᱮᱱᱟᱜ ᱯᱩᱭᱞᱩ ᱪᱤᱠᱤ ᱠᱩᱞᱤ ᱠᱚᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'दिए गए चित्रों को पहचानें और उनके पहले Ol Chiki स्वर को रेखा खींचकर जोड़ें।',
          instructionsSat: 'ᱮᱢ ᱟᱠᱟᱱ ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱩᱯᱨᱩᱢ ᱯᱮ ᱟᱨ ᱯᱩᱭᱞᱩ ᱚᱞ ᱪᱤᱠᱤ ᱨᱟᱦᱟ ᱟᱲᱟᱝ ᱥᱟᱶ ᱜᱟᱨ ᱴᱟᱱᱟᱣ ᱠᱟᱛᱮ ᱡᱚᱲᱟᱣ ᱯᱮ᱾',
          activityTitle: 'स्वर मिलान एवं शब्द पहचान (Vowel Matching)',
          activityType: 'reading',
          matchingPairs: [
            { left: 'माँ (Ayo)', right: 'ᱟ (A)', rightOlChiki: 'ᱟᱭᱳ' },
            { left: 'पानी (Dag)', right: 'ᱫ (Da)', rightOlChiki: 'ᱫᱟᱜ' },
            { left: 'पेड़ (Dare)', right: 'ᱫ (Da)', rightOlChiki: 'ᱫᱟᱨᱮ' },
            { left: 'घर (Oṛag)', right: 'ᱚ (O)', rightOlChiki: 'ᱚᱲᱟᱜ' }
          ],
          fillBlanks: [
            { questionHi: 'अ से __ (Ol Chiki: ᱚ)', questionSat: 'ᱚ ᱠᱷᱚᱱ __', answer: 'ᱚᱲᱟᱜ (घर)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'Ol Chiki स्वर ध्वनि उच्चारण', criteriaSat: 'ᱚᱞ ᱪᱤᱠᱤ ᱨᱟᱦᱟ ᱟᱲᱟᱝ ᱨᱚᱲ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ],
    'Environmental Studies': [
      {
        id: 'g1-evs-1',
        topic: 'My School & Village Surroundings',
        topicSat: 'ᱟᱵᱚᱣᱟᱜ ᱟᱥᱲᱟ ᱟᱨ ᱟᱹᱛᱩ ᱯᱚᱨᱤᱵᱮᱥ (Abowag Asṛa ar Atu)',
        nipunCode: 'NIPUN E1.1',
        outcome: 'Identifies familiar village objects, trees, and domestic animals in Hindi & Santali.',
        overview: 'Observational local environmental learning centered around the primary school yard and village.',
        objective: 'Students can name 5 village trees/animals in Santali and describe what they give us.',
        teacherScriptHi: 'बच्चों, स्कूल के आंगन में कौन-कौन से पेड़ दिख रहे हैं? महुआ, साल, नीम!',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱥᱲᱟ ᱨᱟᱪᱟ ᱨᱮ ᱪᱮᱫ-ᱪᱮᱫ ᱫᱟᱨᱮ ᱧᱮᱞᱚᱜ ᱠᱟᱱᱟ? ᱢᱟᱹᱛᱠᱚᱢ, ᱥᱟᱨᱡᱚᱢ, ᱱᱤᱢ!',
        classroomActivityHi: 'प्रकृति भ्रमण: बच्चे आंगन से गिरी हुई पत्तियां चुनेंगे और उनका संताली नाम बताएंगे।',
        classroomActivitySat: 'ᱫᱟᱬᱟᱱ ᱠᱟᱹᱢᱤ: ᱜᱤᱫᱽᱨᱟᱹ ᱨᱟᱪᱟ ᱠᱷᱚᱱ ᱧᱩᱨ ᱟᱠᱟᱱ ᱥᱟᱠᱟᱢ ᱠᱚ ᱦᱟᱞᱟᱝ ᱠᱟᱛᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱧᱩᱛᱩᱢ ᱠᱚ ᱞᱟᱹᱭᱟ᱾',
        studentActivityHi: 'पत्ते का चित्र बनाकर उसमें हरा रंग भरें और संताली में "ᱥᱟᱠᱟᱢ" लिखें।',
        studentActivitySat: 'ᱥᱟᱠᱟᱢ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ ᱨᱚᱝ ᱯᱮᱨᱮᱡᱽ ᱯᱮ ᱟᱨ "ᱥᱟᱠᱟᱢ" ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'गाय को संताली में क्या कहते हैं?', sat: 'ᱜᱟᱹᱭ (गाय) ᱫᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱪᱮᱫ ᱠᱚ ᱢᱮᱛᱟᱭᱟ?' }
        ],
        homeActivityHi: 'घर के आस-पास दिखने वाले 3 पालतू जानवरों के नाम कल कक्षा में बताएं।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱟᱰᱮ-ᱯᱟᱥᱮ ᱧᱮᱞᱚᱜ ᱠᱟᱱ ᱓ ᱜᱚᱴᱟᱝ ᱟᱹᱥᱩᱞ ᱡᱤᱭᱟᱹᱞᱤ ᱠᱚᱣᱟᱜ ᱧᱩᱛᱩᱢ ᱜᱟᱯᱟ ᱞᱟᱹᱭ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'चित्रों को देखें और सही संताली नाम के सामने सही (✓) का निशान लगाएं।',
          instructionsSat: 'ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱧᱮᱞ ᱯᱮ ᱟᱨ ᱥᱟᱹᱨᱤ ᱥᱟᱱᱛᱟᱲᱤ ᱧᱩᱛᱩᱢ ᱥᱟᱢᱟᱝ ᱨᱮ (✓) ᱪᱤᱱᱦᱟᱹ ᱮᱢ ᱯᱮ᱾',
          activityTitle: 'स्थानीय पर्यावरण एवं जीव-जंतु पहचान (Local Environment)',
          activityType: 'matching',
          matchingPairs: [
            { left: 'गाय (Cow)', right: 'Gại', rightOlChiki: 'ᱜᱟᱹᱭ' },
            { left: 'पेड़ (Tree)', right: 'Dare', rightOlChiki: 'ᱫᱟᱨᱮ' },
            { left: 'फूल (Flower)', right: 'Baha', rightOlChiki: 'ᱵᱟᱦᱟ' },
            { left: 'पानी (Water)', right: 'Dag', rightOlChiki: 'ᱫᱟᱜ' }
          ],
          fillBlanks: [
            { questionHi: 'पेड़ हमें __ (छाया / Umul) देते हैं।', questionSat: 'ᱫᱟᱨᱮ ᱟᱵᱚ __ (ᱩᱢᱩᱞ) ᱮ ᱮᱢᱟᱵᱚᱱᱟ᱾', answer: 'छाया (ᱩᱢᱩᱞ)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'स्थानीय पेड़-पौधों की मातृभाषा में पहचान', criteriaSat: 'ᱫᱟᱨᱮ-ᱱᱟᱹᱲᱤ ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱩᱯᱨᱩᱢ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ]
  },
  'Grade 2': {
    'Mathematics': [
      {
        id: 'g2-math-1',
        topic: 'Counting 1–20 & Concrete Addition',
        topicSat: 'ᱮᱞ ᱑–᱒᱐ ᱟᱨ ᱢᱮᱥᱟ ᱠᱟᱹᱢᱤ (El 1–20 ar Mesa)',
        nipunCode: 'NIPUN M2.1',
        outcome: 'Counts numbers up to 20 and performs single-digit concrete addition.',
        overview: 'Developing addition concepts using concrete village materials like tamarind seeds and beads.',
        objective: 'Students can solve 3 + 2 = 5 both verbally in Santali and in written Ol Chiki digits.',
        teacherScriptHi: 'बच्चों, यदि आपके पास 3 बेर हैं और मित्र ने 2 और दिए, तो कुल कितने हुए?',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱓ ᱡᱟᱹᱱᱩᱢ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱜᱟᱛᱮ ᱟᱨᱦᱚᱸ ᱒ ᱮᱢᱟᱫ ᱢᱮᱭᱟ, ᱛᱚᱵᱮ ᱡᱚᱛᱚ ᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱮᱱᱟ?',
        classroomActivityHi: 'कंकड़ खेल: दो बच्चे कंकड़ जोड़कर "ᱯᱮ (3) + ᱵᱟᱨ (2) = ᱢᱚᱬᱮ (5)" बोलेंगे।',
        classroomActivitySat: 'ᱨᱩᱜᱽᱲᱤ ᱮᱱᱮᱡ: ᱵᱟᱨᱭᱟ ᱜᱤᱫᱽᱨᱟᱹ ᱨᱩᱜᱽᱲᱤ ᱢᱮᱥᱟ ᱠᱟᱛᱮ "ᱯᱮ (᱓) + ᱵᱟᱨ (᱒) = ᱢᱚᱬᱮ (᱕)" ᱠᱚ ᱞᱟᱹᱭᱟ᱾',
        studentActivityHi: 'कार्यपत्रक पर दिए गए जोड़ के प्रश्नों को Ol Chiki में हल करें।',
        studentActivitySat: 'ᱠᱟᱹᱢᱤ ᱥᱟᱠᱟᱢ ᱨᱮ ᱮᱢ ᱟᱠᱟᱱ ᱢᱮᱥᱟ ᱠᱩᱠᱞᱤ ᱠᱚ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱥᱟᱹᱛ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: '4 और 3 मिलकर कितने होते हैं?', sat: '᱔ (ᱯᱩᱱ) ᱟᱨ ᱓ (ᱯᱮ) ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜᱼᱟ?' }
        ],
        homeActivityHi: 'घर पर बर्तनों या पत्तों को 10-10 के समूहों में गिनें।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱨᱮ ᱵᱟᱹᱴᱤ ᱥᱮ ᱥᱟᱠᱟᱢ ᱑᱐-᱑᱐ ᱜᱚᱴᱟᱝ ᱠᱟᱛᱮ ᱞᱮᱠᱷᱟ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'दिए गए जोड़ के प्रश्नों को हल करें और उत्तर Ol Chiki तथा देवनागरी दोनों में लिखें।',
          instructionsSat: 'ᱮᱢ ᱟᱠᱟᱱ ᱢᱮᱥᱟ ᱠᱩᱠᱞᱤ ᱠᱚ ᱥᱟᱹᱛ ᱯᱮ ᱟᱨ ᱛᱮᱞᱟ ᱚᱞ ᱪᱤᱠᱤ ᱟᱨ ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱵᱟᱱᱟᱨ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
          activityTitle: 'संख्या जोड़ एवं वस्तु गणना (Addition with Objects)',
          activityType: 'count',
          visualItems: [
            { label: '3 बेर + 2 बेर', count: 5, satCount: 'ᱢᱚᱬᱮ', satOlChiki: '᱕' },
            { label: '4 पत्तियां + 3 पत्तियां', count: 7, satCount: 'ᱮᱭᱟᱭ', satOlChiki: '᱗' },
            { label: '5 कंकड़ + 1 कंकड़', count: 6, satCount: 'ᱛᱩᱨᱩᱭ', satOlChiki: '᱖' }
          ],
          matchingPairs: [
            { left: '३ + २', right: '5 (Mõṛẽ)', rightOlChiki: '᱕ (ᱢᱚᱬᱮ)' },
            { left: '४ + २', right: '6 (Turuy)', rightOlChiki: '᱖ (ᱛᱩᱨᱩᱭ)' },
            { left: '५ + ३', right: '8 (Iral)', rightOlChiki: '᱘ (ᱤᱨᱟᱹᱞ)' },
            { left: '६ + ४', right: '10 (Gel)', rightOlChiki: '᱑᱐ (ᱜᱮᱞ)' }
          ],
          fillBlanks: [
            { questionHi: '२ + २ = __ (Ol Chiki में)', questionSat: '᱒ + ᱒ = __ (ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ)', answer: '४ (ᱯᱩᱱ / ᱔)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'वस्तुओं की सहायता से 10 तक जोड़', criteriaSat: 'ᱡᱤᱱᱤᱥ ᱜᱚᱲᱚ ᱛᱮ ᱑᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱢᱮᱥᱟ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ],
    'Foundational Literacy': [
      {
        id: 'g2-lit-1',
        topic: 'Sentence Formation & Daily Action Words',
        topicSat: 'ᱟᱹᱭᱟᱹᱛ ᱵᱮᱱᱟᱣ ᱟᱨ ᱠᱟᱹᱢᱤ ᱟᱹᱲᱟᱹ (Ayạt Benaw ar Kạmi Aṛạ)',
        nipunCode: 'NIPUN L2.3',
        outcome: 'Constructs 3-word simple sentences in Santali and translates to Hindi.',
        overview: 'Action-verb expansion for Grade 2 children using classroom daily routines.',
        objective: 'Students will combine Subject + Verb (e.g., "ᱤᱧ ᱯᱟᱲᱦᱟᱣ-ᱟᱧ" / मैं पढ़ता हूँ) correctly.',
        teacherScriptHi: 'बच्चों, जब हम कहते हैं "किताब खोलो", तो संताली में कहेंगे "ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ"।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱚᱠᱷᱚᱱ ᱵᱚᱱ ᱢᱮᱱᱟ "किताब खोलो", ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱵᱚᱱ ᱢᱮᱱᱟ "ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ"᱾',
        classroomActivityHi: 'क्रिया अभिनय: शिक्षक क्रिया बोलेंगे (दौड़ो, बैठो, लिखो) और बच्चे संताली में बोलकर करेंगे।',
        classroomActivitySat: 'ᱠᱟᱹᱢᱤ ᱩᱫᱩᱜ: ᱢᱟᱹᱪᱮᱛ ᱮ ᱢᱮᱱᱟ (ᱫᱟᱹᱲ ᱯᱮ, ᱫᱩᱲᱩᱵ ᱯᱮ, ᱚᱞ ᱯᱮ) ᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ ᱠᱟᱹᱢᱤᱭᱟ᱾',
        studentActivityHi: 'स्लेट पर 3 सरल वाक्य संताली में लिखें।',
        studentActivitySat: 'ᱥᱞᱮᱴ ᱨᱮ ᱓ ᱜᱚᱴᱟᱝ ᱟᱞᱜᱟ ᱟᱹᱭᱟᱹᱛ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: '"मैं स्कूल जाता हूँ" का संताली क्या है?', sat: '"ᱤᱧ ᱟᱥᱲᱟᱧ ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ" ᱨᱮᱭᱟᱜ ᱢᱮᱱᱮᱛ ᱫᱚ ᱪᱮᱫ?' }
        ],
        homeActivityHi: 'घर जाकर अपने छोटे भाई-बहन को एक संताली बालगीत सिखाएं।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱪᱟᱞᱟᱣ ᱠᱟᱛᱮ ᱟᱯᱱᱟᱨ ᱦᱩᱰᱤᱧ ᱵᱚᱭᱦᱟ ᱢᱤᱫᱴᱟᱝ ᱥᱟᱱᱛᱟᱲᱤ ᱥᱮᱨᱮᱧ ᱪᱮᱫ ᱟᱭ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'शब्दों को सही क्रम में रखकर सही वाक्य बनाएं।',
          instructionsSat: 'ᱟᱹᱲᱟᱹ ᱠᱚ ᱥᱟᱹᱨᱤ ᱛᱷᱟᱨ ᱨᱮ ᱫᱚᱦᱚ ᱠᱟᱛᱮ ᱥᱟᱹᱨᱤ ᱟᱹᱭᱟᱹᱛ ᱵᱮᱱᱟᱣ ᱯᱮ᱾',
          activityTitle: 'वाक्य निर्माण एवं क्रिया शब्द (Sentence Formation)',
          activityType: 'reading',
          matchingPairs: [
            { left: 'किताब (Book)', right: 'Puthi', rightOlChiki: 'ᱯᱩᱛᱷᱤ' },
            { left: 'पानी पियो (Drink water)', right: 'Dag ñuy pe', rightOlChiki: 'ᱫᱟᱜ ᱧᱩᱭ ᱯᱮ' },
            { left: 'पढ़ो (Read)', right: 'Paṛhaw me', rightOlChiki: 'ᱯᱟᱲᱦᱟᱣ ᱢᱮ' }
          ],
          fillBlanks: [
            { questionHi: 'हम सब स्कूल __ (जाते हैं / जाते)', questionSat: 'ᱟᱵᱚ ᱡᱚᱛᱚ ᱟᱥᱲᱟ ᱵᱚᱱ __ (ᱪᱟᱞᱟᱜ-ᱟ)', answer: 'ᱪᱟᱞᱟᱜ-ᱟ (जाते हैं)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'सरल वाक्य संरचना समझना', criteriaSat: 'ᱟᱞᱜᱟ ᱟᱹᱭᱟᱹᱛ ᱜᱚᱲᱦᱚᱱ ᱵᱩᱡᱷᱟᱹᱣ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ],
    'Environmental Studies': [
      {
        id: 'g2-evs-1',
        topic: 'Water Sources & Clean Habits in the Village',
        topicSat: 'ᱫᱟᱜ ᱨᱮᱱᱟᱜ ᱩᱛᱱᱟᱹᱣ ᱟᱨ ᱥᱟᱯᱷᱟ ᱦᱮᱣᱟ (Dag ar Sapha Hewa)',
        nipunCode: 'JCERT EVS Gr2',
        outcome: 'Understands clean water, wells, handpumps, and hygiene practices.',
        overview: 'Environmental sanitation and water conservation in tribal village communities.',
        objective: 'Students can describe why water is life ("ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ") and 3 ways to keep it clean.',
        teacherScriptHi: 'बच्चों, जल ही जीवन है। हमें कुएं और चापाकल का पानी साफ रखना चाहिए।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ᱾ ᱟᱵᱚ ᱠᱩᱸᱭ ᱟᱨ ᱪᱟᱯᱟᱠᱚᱞ ᱨᱮᱱᱟᱜ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱫᱚᱦᱚ ᱦᱩᱭᱩᱜ ᱛᱟᱵᱚᱱᱟ᱾',
        classroomActivityHi: 'चित्र चर्चा: स्वच्छ जल स्रोत बनाम दूषित जल स्रोत के चित्रों पर चर्चा।',
        classroomActivitySat: 'ᱪᱤᱛᱟᱹᱨ ᱜᱟᱯᱟᱞᱢᱟᱨᱟᱣ: ᱥᱟᱯᱷᱟ ᱫᱟᱜ ᱟᱨ ᱵᱟᱹᱲᱤᱡ ᱫᱟᱜ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱪᱮᱛᱟᱱ ᱨᱮ ᱨᱚᱯᱚᱲ᱾',
        studentActivityHi: 'पानी के 3 उपयोग (पीना, नहाना, पेड़ सींचना) संताली में लिखें।',
        studentActivitySat: 'ᱫᱟᱜ ᱨᱮᱱᱟᱜ ᱓ ᱜᱚᱴᱟᱝ ᱵᱮᱵᱷᱟᱨ (ᱧᱩ, ᱛᱩᱯᱩ, ᱫᱟᱨᱮ ᱫᱩᱞ) ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'पानी को संताली में क्या कहते हैं?', sat: 'ᱫᱟᱜ (पानी) ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?' }
        ],
        homeActivityHi: 'घर में पानी ढककर रखने की आदत अपने परिवार को समझाएं।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱨᱮ ᱫᱟᱜ ᱯᱚᱴᱚᱢ ᱠᱟᱛᱮ ᱫᱚᱦᱚ ᱨᱮᱱᱟᱜ ᱠᱟᱛᱷᱟ ᱟᱭᱳ-ᱵᱟᱵᱟ ᱞᱟᱹᱭ ᱟᱹᱠᱤᱱ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'पानी के सही उपयोगों पर सही (✓) लगाएं।',
          instructionsSat: 'ᱫᱟᱜ ᱨᱮᱱᱟᱜ ᱥᱟᱹᱨᱤ ᱵᱮᱵᱷᱟᱨ ᱪᱮᱛᱟᱱ ᱨᱮ (✓) ᱪᱤᱱᱦᱟᱹ ᱮᱢ ᱯᱮ᱾',
          activityTitle: 'जल संरक्षण एवं स्वच्छता (Water Hygiene)',
          activityType: 'matching',
          matchingPairs: [
            { left: 'पीने का पानी', right: 'Ñu dag', rightOlChiki: 'ᱧᱩ ᱫᱟᱜ' },
            { left: 'कुआँ (Well)', right: 'Kũy', rightOlChiki: 'ᱠᱩᱸᱭ' },
            { left: 'नदी (River)', right: 'Gada', rightOlChiki: 'ᱜᱟᱰᱟ' }
          ],
          fillBlanks: [
            { questionHi: 'जल ही __ है (Santali: ᱫᱟᱜ ᱜᱮ __ ᱠᱟᱱᱟ)᱾', questionSat: 'ᱫᱟᱜ ᱜᱮ __ ᱠᱟᱱᱟ᱾', answer: 'ᱡᱤᱣᱤ (जीवन)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'पानी के महत्व को समझना', criteriaSat: 'ᱫᱟᱜ ᱨᱮᱭᱟᱜ ᱜᱚᱱᱚᱝ ᱵᱩᱡᱷᱟᱹᱣ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ]
  },
  'Grade 3': {
    'Mathematics': [
      {
        id: 'g3-math-1',
        topic: 'Numbers up to 100 & 2-Digit Addition with Regrouping',
        topicSat: '᱑᱐᱐ ᱫᱷᱟᱹᱵᱤᱡ ᱮᱞ ᱟᱨ ᱵᱟᱨ-ᱟᱸᱠ ᱢᱮᱥᱟ (El 100 ar Bar-Ank Mesa)',
        nipunCode: 'NIPUN M3.2',
        outcome: 'Reads, writes 2-digit numbers up to 100 and solves addition problems.',
        overview: 'Expanding place value (দহাই / একাই, Ten & Units) through bundling sticks into bundles of ten (ᱜᱮᱞ).',
        objective: 'Students can bundle 10 sticks into "ᱢᱤᱫ ᱜᱮᱞ" (one ten) and solve 24 + 15 in Ol Chiki.',
        teacherScriptHi: 'बच्चों, 10 तीलियों का एक बंडल बनता है। 2 बंडल और 4 तीलियां मिलकर 24 (ᱵᱟᱨ ᱜᱮᱞ ᱯᱩᱱ) बनती हैं।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱑᱐ ᱜᱚᱴᱟᱝ ᱠᱟᱹᱴᱤ ᱨᱮᱱᱟᱜ ᱢᱤᱫ ᱢᱩᱴᱷᱟᱹ ᱵᱮᱱᱟᱜᱼᱟ᱾ ᱒ ᱢᱩᱴᱷᱟᱹ ᱟᱨ ᱔ ᱠᱟᱹᱴᱤ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱒᱔ (ᱵᱟᱨ ᱜᱮᱞ ᱯᱩᱱ) ᱦᱩᱭᱩᱜᱼᱟ᱾',
        classroomActivityHi: 'तीलियों का बंडल खेल: बच्चे बंडल और खुली तीलियां गिनकर संख्या बनाएंगे।',
        classroomActivitySat: 'ᱠᱟᱹᱴᱤ ᱢᱩᱴᱷᱟᱹ ᱮᱱᱮᱡ: ᱜᱤᱫᱽᱨᱟᱹ ᱢᱩᱴᱷᱟᱹ ᱟᱨ ᱡᱷᱤᱡ ᱠᱟᱹᱴᱤ ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱮᱞ ᱠᱚ ᱵᱮᱱᱟᱣᱟ᱾',
        studentActivityHi: 'कॉपी पर 35 + 23 का जोड़ हल करें और उत्तर Ol Chiki में लिखें।',
        studentActivitySat: 'ᱠᱷᱟᱛᱟ ᱨᱮ ᱓᱕ + ᱒᱓ ᱨᱮᱱᱟᱜ ᱢᱮᱥᱟ ᱠᱟᱹᱢᱤ ᱥᱟᱹᱛ ᱯᱮ ᱟᱨ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: '4 दहाई और 5 इकाई मिलकर क्या संख्या बनती है?', sat: '᱔ ᱜᱮᱞ ᱟᱨ ᱕ ᱠᱟᱹᱴᱤ ᱢᱮᱥᱟ ᱠᱟᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱮᱞ ᱦᱩᱭᱩᱜᱼᱟ?' }
        ],
        homeActivityHi: 'घर पर माचिस की 50 तीलियों के 5 बंडल बनाकर माता-पिता को दिखाएं।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱨᱮ ᱫᱤᱭᱟᱹᱥᱤᱞᱟᱹᱭ ᱨᱮᱱᱟᱜ ᱕᱐ ᱠᱟᱹᱴᱤ ᱛᱮ ᱕ ᱢᱩᱴᱷᱟᱹ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱟᱭᱳ-ᱵᱟᱵᱟ ᱩᱫᱩᱜ ᱟᱹᱠᱤᱱ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'दहाई और इकाई को ध्यान में रखकर जोड़ हल करें और उत्तर देवनागरी तथा Ol Chiki में लिखें।',
          instructionsSat: 'ᱜᱮᱞ ᱟᱨ ᱢᱤᱫ ᱫᱷᱮᱭᱟᱱ ᱨᱮ ᱫᱚᱦᱚ ᱠᱟᱛᱮ ᱢᱮᱥᱟ ᱥᱟᱹᱛ ᱯᱮ ᱟᱨ ᱛᱮᱞᱟ ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱟᱨ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
          activityTitle: 'दो अंकों का जोड़ एवं स्थानीय मान (2-Digit Addition)',
          activityType: 'count',
          mathProblems: [
            { questionHi: '25 + 14 = ?', questionSat: '᱒᱕ + ᱑᱔ = ?', answer: '39 (Thirty-nine)', satAnswer: '᱓᱙ (ᱯᱮ ᱜᱮᱞ ᱟᱨᱮ)' },
            { questionHi: '42 + 23 = ?', questionSat: '᱔᱒ + ᱒᱓ = ?', answer: '65 (Sixty-five)', satAnswer: '᱖᱕ (ᱛᱩᱨᱩᱭ ᱜᱮᱞ ᱢᱚᱬᱮ)' },
            { questionHi: '50 + 30 = ?', questionSat: '᱕᱐ + ᱓᱐ = ?', answer: '80 (Eighty)', satAnswer: '᱘᱐ (ᱤᱨᱟᱹᱞ ᱜᱮᱞ)' }
          ],
          matchingPairs: [
            { left: '20 (Twenty)', right: 'Bar gel', rightOlChiki: '᱒᱐ (ᱵᱟᱨ ᱜᱮᱞ)' },
            { left: '30 (Thirty)', right: 'Pe gel', rightOlChiki: '᱓᱐ (ᱯᱮ ᱜᱮᱞ)' },
            { left: '50 (Fifty)', right: 'Mõṛẽ gel', rightOlChiki: '᱕᱐ (ᱢᱚᱬᱮ ᱜᱮᱞ)' },
            { left: '100 (Hundred)', right: 'Mit’ sae', rightOlChiki: '᱑᱐᱐ (ᱢᱤᱫ ᱥᱟᱭ)' }
          ],
          fillBlanks: [
            { questionHi: '10 दहाई मिलकर __ (100 / ᱢᱤᱫ ᱥᱟᱭ) बनाती हैं।', questionSat: '᱑᱐ ᱜᱮᱞ ᱢᱮᱥᱟ ᱠᱟᱛᱮ __ ᱵᱮᱱᱟᱜᱼᱟ᱾', answer: '100 (ᱢᱤᱫ ᱥᱟᱭ)' }
          ],
          assessmentRubric: [
            { criteriaHi: '2 अंकों का जोड़ सही करना', criteriaSat: '᱒-ᱟᱸᱠ ᱢᱮᱥᱟ ᱥᱟᱹᱨᱤ ᱠᱟᱹᱢᱤ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ],
    'Foundational Literacy': [
      {
        id: 'g3-lit-1',
        topic: 'Short Paragraph Reading & Comprehension',
        topicSat: 'ᱦᱩᱰᱤᱧ ᱚᱱᱚᱞ ᱯᱟᱲᱦᱟᱣ ᱟᱨ ᱵᱩᱡᱷᱟᱹᱣ (Short Paragraph Reading)',
        nipunCode: 'NIPUN L3.1',
        outcome: 'Reads a 4-5 line bilingual narrative and answers simple factual questions.',
        overview: 'Reading fluency development bridging oral storytelling to written comprehension.',
        objective: 'Students can read a short paragraph about a village festival and answer 2 factual questions.',
        teacherScriptHi: 'बच्चों, आज हम सोहराय पर्व के बारे में पढ़ेंगे। ध्यान से सुनिए।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱥᱚᱦᱨᱟᱭ ᱯᱚᱨᱚᱵᱽ ᱵᱟᱵᱚᱛ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱼᱟ᱾ ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱟᱸᱡᱚᱢ ᱯᱮ᱾',
        classroomActivityHi: 'सामूहिक वाचन: पहले शिक्षक पढ़ेंगे, फिर बच्चे साथ मिलकर संताली और हिंदी में पढ़ेंगे।',
        classroomActivitySat: 'ᱢᱤᱫ ᱛᱮ ᱯᱟᱲᱦᱟᱣ: ᱯᱩᱭᱞᱩ ᱢᱟᱹᱪᱮᱛ ᱮ ᱯᱟᱲᱦᱟᱣᱟ, ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ ᱜᱤᱫᱽᱨᱟᱹ ᱢᱤᱫ ᱛᱮ ᱠᱚ ᱯᱟᱲᱦᱟᱣᱟ᱾',
        studentActivityHi: 'अनुच्छेद से 3 कठिन शब्द छांटकर उनके अर्थ संताली में लिखें।',
        studentActivitySat: 'ᱚᱱᱚᱞ ᱠᱷᱚᱱ ᱓ ᱜᱚᱴᱟᱝ ᱟᱸᱴ ᱟᱹᱲᱟᱹ ᱵᱟᱪᱷᱟᱣ ᱠᱟᱛᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱢᱮᱱᱮᱛ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'सोहराय पर्व में किनकी पूजा की जाती है?', sat: 'ᱥᱚᱦᱨᱟᱭ ᱯᱚᱨᱚᱵᱽ ᱨᱮ ᱠᱚᱭ ᱠᱚ ᱵᱚᱸᱜᱟ ᱟᱠᱚᱣᱟ?' }
        ],
        homeActivityHi: 'घर के बुजुर्गों से सोहराय के गीतों की 2 पंक्तियां सीखकर आएं।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱦᱟᱲᱟᱢ-ᱵᱩᱰᱷᱤ ᱴᱷᱮᱱ ᱠᱷᱚᱱ ᱥᱚᱦᱨᱟᱭ ᱥᱮᱨᱮᱧ ᱨᱮᱱᱟᱜ ᱒ ᱛᱷᱟᱨ ᱪᱮᱫ ᱠᱟᱛᱮ ᱦᱤᱡᱩᱜ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'अनुच्छेद को पढ़ें और नीचे दिए प्रश्नों के उत्तर लिखें।',
          instructionsSat: 'ᱚᱱᱚᱞ ᱯᱟᱲᱦᱟᱣ ᱯᱮ ᱟᱨ ᱞᱟᱛᱟᱨ ᱨᱮ ᱮᱢ ᱟᱠᱟᱱ ᱠᱩᱠᱞᱤ ᱠᱚ ᱨᱮᱱᱟᱜ ᱛᱮᱞᱟ ᱚᱞ ᱯᱮ᱾',
          activityTitle: 'पठन बोध एवं प्रश्नोत्तर (Reading Comprehension)',
          activityType: 'reading',
          matchingPairs: [
            { left: 'पर्व / त्योहार', right: 'Porob', rightOlChiki: 'ᱯᱚᱨᱚᱵᱽ' },
            { left: 'गीत / गाना', right: 'Sereñ', rightOlChiki: 'ᱥᱮᱨᱮᱧ' },
            { left: 'नृत्य / नाच', right: 'Enej', rightOlChiki: 'ᱮᱱᱮᱡ' }
          ],
          fillBlanks: [
            { questionHi: 'सोहराय आदिवासियों का बड़ा __ है।', questionSat: 'ᱥᱚᱦᱨᱟᱭ ᱫᱚ ᱥᱟᱱᱛᱟᱲ ᱠᱚᱣᱟᱜ ᱢᱟᱨᱟᱝ __ ᱠᱟᱱᱟ᱾', answer: 'ᱯᱚᱨᱚᱵᱽ (त्योहार)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'अनुच्छेद पढ़कर सही उत्तर देना', criteriaSat: 'ᱚᱱᱚᱞ ᱯᱟᱲᱦᱟᱣ ᱠᱟᱛᱮ ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ],
    'Environmental Studies': [
      {
        id: 'g3-evs-1',
        topic: 'Parts of Plants & Forest Trees of Jharkhand',
        topicSat: 'ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱟᱨ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱵᱤᱨ ᱫᱟᱨᱮ (Parts of Plants)',
        nipunCode: 'JCERT EVS Gr3',
        outcome: 'Identifies root, stem, leaf, flower, fruit and knows Sal (Sarjom) and Mahua (Matkom).',
        overview: 'Botanical and ecological exploration of local trees central to Santhal tribal culture.',
        objective: 'Students can label 5 parts of a plant in Ol Chiki and explain why Sal is the sacred state tree.',
        teacherScriptHi: 'बच्चों, साल (सखुआ) झारखंड का राजकीय वृक्ष है। इसे संताली में "ᱥᱟᱨᱡᱚᱢ" कहते हैं।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱫᱚ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱨᱟᱡᱽ ᱫᱟᱨᱮ ᱠᱟᱱᱟ᱾ ᱱᱚᱣᱟ ᱫᱚ ᱟᱹᱰᱤ ᱫᱟᱢᱟᱱ ᱫᱟᱨᱮ ᱠᱟᱱᱟ᱾',
        classroomActivityHi: 'पौधे का अवलोकन: गमले में लगे पौधे की जड़, तना, पत्ती, फूल को देखकर संताली में नाम लिखना।',
        classroomActivitySat: 'ᱫᱟᱨᱮ ᱧᱮᱞ: ᱴᱚᱵᱽ ᱨᱮ ᱛᱟᱦᱮᱸᱱ ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱨᱮᱦᱮᱫ, ᱰᱟᱹᱨ, ᱥᱟᱠᱟᱢ, ᱵᱟᱦᱟ ᱧᱮᱞ ᱠᱟᱛᱮ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱧᱩᱛᱩᱢ ᱚᱞ᱾',
        studentActivityHi: 'एक पेड़ का सुंदर चित्र बनाएं और उसके भागों को Ol Chiki में नामांकित करें।',
        studentActivitySat: 'ᱢᱤᱫ ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱚᱱᱟ ᱨᱮᱱᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱠᱚ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'पत्ती और जड़ को संताली में क्या कहते हैं?', sat: 'ᱥᱟᱠᱟᱢ (पत्ती) ᱟᱨ ᱨᱮᱦᱮᱫ (जड़) ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?' }
        ],
        homeActivityHi: 'अपने घर के पास से महुआ या साल के पत्तों से बने दाने या पत्तल देखकर आएं।',
        homeActivitySat: 'ᱟᱯᱱᱟᱨ ᱚᱲᱟᱜ ᱥᱩᱨ ᱠᱷᱚᱱ ᱥᱟᱨᱡᱚᱢ ᱥᱟᱠᱟᱢ ᱯᱷᱩᱲᱩᱜ ᱧᱮᱞ ᱠᱟᱛᱮ ᱦᱤᱡᱩᱜ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'पौधे के अंगों को उनके सही संताली (Ol Chiki) नाम से सुमेलित करें।',
          instructionsSat: 'ᱫᱟᱨᱮ ᱨᱮᱱᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱠᱚ ᱥᱟᱹᱨᱤ ᱚᱞ ᱪᱤᱠᱤ ᱧᱩᱛᱩᱢ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱯᱮ᱾',
          activityTitle: 'पादप अंग एवं स्थानीय वृक्ष पहचान (Plant Anatomy)',
          activityType: 'matching',
          matchingPairs: [
            { left: 'जड़ (Root)', right: 'Rehed', rightOlChiki: 'ᱨᱮᱦᱮᱫ' },
            { left: 'तना (Stem / Branch)', right: 'Ḍạr', rightOlChiki: 'ᱰᱟᱹᱨ' },
            { left: 'पत्ती (Leaf)', right: 'Sakam', rightOlChiki: 'ᱥᱟᱠᱟᱢ' },
            { left: 'फूल (Flower)', right: 'Baha', rightOlChiki: 'ᱵᱟᱦᱟ' },
            { left: 'फल (Fruit)', right: 'Jo', rightOlChiki: 'ᱡᱚ' }
          ],
          fillBlanks: [
            { questionHi: 'झारखंड का राजकीय वृक्ष __ (साल / Sarjom) है।', questionSat: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱨᱟᱡᱽ ᱫᱟᱨᱮ ᱫᱚ __ ᱠᱟᱱᱟ᱾', answer: 'ᱥᱟᱨᱡᱚᱢ (साल)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'पौधे के भागों का सटीक ज्ञान', criteriaSat: 'ᱫᱟᱨᱮ ᱦᱟᱹᱴᱤᱧ ᱠᱚ ᱵᱩᱡᱷᱟᱹᱣ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ]
  },
  'Grade 4': {
    'Mathematics': [
      {
        id: 'g4-math-1',
        topic: 'Multiplication Tables (2–10) & Measurement Basics',
        topicSat: 'ᱜᱩᱬᱟᱹᱱ ᱯᱟᱦᱟᱲᱟ (᱒–᱑᱐) ᱟᱨ ᱡᱚᱠᱷᱟ (Multiplication & Measure)',
        nipunCode: 'JCERT Math Gr4',
        outcome: 'Recites multiplication tables 2 to 10 and solves practical measurement problems.',
        overview: 'Concept of repeated addition transforming into multiplication using rows and columns of seeds.',
        objective: 'Students understand that 4 × 3 means 4 groups of 3 (12) and can express tables in Santali.',
        teacherScriptHi: 'बच्चों, यदि 4 बच्चों को 3-3 बेर दिए जाएं, तो कुल 4 × 3 = 12 बेर होंगे।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱩᱫᱤ ᱔ ᱜᱤᱫᱽᱨᱟᱹ ᱓-᱓ ᱡᱟᱹᱱᱩᱢ ᱮᱢᱟ ᱠᱚᱣᱟ, ᱛᱚᱵᱮ ᱡᱚᱛᱚ ᱛᱮ ᱔ × ᱓ = ᱑᱒ ᱡᱟᱹᱱᱩᱢ ᱦᱩᱭᱩᱜᱼᱟ᱾',
        classroomActivityHi: 'ग्रिड गतिविधि: चौकोर ग्रिड में कंकड़ रखकर 3 × 5 = 15 को दर्शाना।',
        classroomActivitySat: 'ᱜᱽᱨᱤᱰ ᱠᱟᱹᱢᱤ: ᱪᱚᱣᱠᱟᱹ ᱨᱮ ᱨᱩᱜᱽᱲᱤ ᱫᱚᱦᱚ ᱠᱟᱛᱮ ᱓ × ᱕ = ᱑᱕ ᱩᱫᱩᱜ᱾',
        studentActivityHi: 'अपनी कॉपी में 4 और 5 का पहाड़ा Ol Chiki अंकों में लिखें।',
        studentActivitySat: 'ᱟᱯᱱᱟᱨ ᱠᱷᱟᱛᱟ ᱨᱮ ᱔ ᱟᱨ ᱕ ᱨᱮᱱᱟᱜ ᱯᱟᱦᱟᱲᱟ ᱚᱞ ᱪᱤᱠᱤ ᱮᱞ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: '6 × 4 कितना होता है?', sat: '᱖ × ᱔ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜᱼᱟ? ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱞᱟᱹᱭ ᱯᱮ᱾' }
        ],
        homeActivityHi: 'घर पर 1 मीटर धागा या लकड़ी का पैमाना बनाकर 3 चीजों की लंबाई नापें।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱨᱮ ᱑ ᱢᱤᱴᱟᱨ ᱥᱩᱛᱟᱹᱢ ᱛᱮ ᱓ ᱜᱚᱴᱟᱝ ᱡᱤᱱᱤᱥ ᱨᱮᱱᱟᱜ ᱡᱤᱞᱤᱧ ᱡᱚᱠᱷᱟᱭ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'गुणा के प्रश्नों को हल करें और रिक्त स्थानों को सही Ol Chiki अंकों से भरें।',
          instructionsSat: 'ᱜᱩᱬᱟᱹᱱ ᱠᱩᱠᱞᱤ ᱠᱚ ᱥᱟᱹᱛ ᱯᱮ ᱟᱨ ᱠᱷᱟᱹᱞᱤ ᱴᱷᱟᱶ ᱨᱮ ᱥᱟᱹᱨᱤ ᱚᱞ ᱪᱤᱠᱤ ᱮᱞ ᱯᱮᱨᱮᱡᱽ ᱯᱮ᱾',
          activityTitle: 'गुणन पहाड़ा एवं व्यावहारिक मापन (Multiplication & Measurement)',
          activityType: 'multiplication',
          mathProblems: [
            { questionHi: '3 × 4 = ?', questionSat: '᱓ × ᱔ = ?', answer: '12 (Twelve)', satAnswer: '᱑᱒ (ᱜᱮᱞ ᱵᱟᱨ)' },
            { questionHi: '5 × 6 = ?', questionSat: '᱕ × ᱖ = ?', answer: '30 (Thirty)', satAnswer: '᱓᱐ (ᱯᱮ ᱜᱮᱞ)' },
            { questionHi: '8 × 3 = ?', questionSat: '᱘ × ᱓ = ?', answer: '24 (Twenty-four)', satAnswer: '᱒᱔ (ᱵᱟᱨ ᱜᱮᱞ ᱯᱩᱱ)' },
            { questionHi: '7 × 5 = ?', questionSat: '᱗ × ᱕ = ?', answer: '35 (Thirty-five)', satAnswer: '᱓᱕ (ᱯᱮ ᱜᱮᱞ ᱢᱚᱬᱮ)' }
          ],
          matchingPairs: [
            { left: '4 × 2', right: '8 (Iral)', rightOlChiki: '᱘ (ᱤᱨᱟᱹᱞ)' },
            { left: '5 × 4', right: '20 (Bar gel)', rightOlChiki: '᱒᱐ (ᱵᱟᱨ ᱜᱮᱞ)' },
            { left: '6 × 3', right: '18 (Gel iral)', rightOlChiki: '᱑᱘ (ᱜᱮᱞ ᱤᱨᱟᱹᱞ)' },
            { left: '9 × 2', right: '18', rightOlChiki: '᱑᱘' }
          ],
          fillBlanks: [
            { questionHi: '1 मीटर = __ सेंटीमीटर (Santali: ᱢᱤᱫ ᱥᱟᱭ ᱥᱮᱢᱤ)᱾', questionSat: '᱑ ᱢᱤᱴᱟᱨ = __ ᱥᱮᱱᱴᱤᱢᱤᱴᱟᱨ᱾', answer: '100 (ᱢᱤᱫ ᱥᱟᱭ)' }
          ],
          assessmentRubric: [
            { criteriaHi: '2 से 10 तक गुणा की समझ', criteriaSat: '᱒ ᱠᱷᱚᱱ ᱑᱐ ᱜᱩᱬᱟᱹᱱ ᱵᱩᱡᱷᱟᱹᱣ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ],
    'Foundational Literacy': [
      {
        id: 'g4-lit-1',
        topic: 'Reading Comprehension & Folk Narratives',
        topicSat: 'ᱠᱟᱹᱦᱱᱤ ᱯᱟᱲᱦᱟᱣ ᱟᱨ ᱢᱮᱱᱮᱛ ᱵᱩᱡᱷᱟᱹᱣ (Folk Tale Comprehension)',
        nipunCode: 'JCERT Lit Gr4',
        outcome: 'Reads folklore stories fluently and explains character motivations and morals.',
        overview: 'Rich traditional Santali folk story emphasizing courage, community sharing, and nature care.',
        objective: 'Students can narrate the main sequence of events in a 1-minute oral summary in both languages.',
        teacherScriptHi: 'बच्चों, आज हम सिदो-कान्हू और बिरसा मुंडा के जीवन की वीरगाथा संताली और हिंदी में पढ़ेंगे।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱥᱤᱫᱚ-ᱠᱟᱹᱱᱦᱩ ᱟᱨ ᱵᱤᱨᱥᱟᱹ ᱢᱩᱱᱰᱟ ᱛᱟᱹᱠᱤᱱᱟᱜ ᱫᱤᱞᱜᱟᱹᱨ ᱠᱟᱛᱷᱟ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱼᱟ᱾',
        classroomActivityHi: 'कहानी मंचन: बच्चे कहानी के पात्र बनकर 2 मिनट का संवाद बोलेंगे।',
        classroomActivitySat: 'ᱠᱟᱹᱦᱱᱤ ᱩᱫᱩᱜ: ᱜᱤᱫᱽᱨᱟᱹ ᱠᱟᱹᱦᱱᱤ ᱨᱤᱱ ᱦᱚᱲ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱨᱚᱯᱚᱲ ᱠᱚ ᱞᱟᱹᱭᱟ᱾',
        studentActivityHi: 'कहानी के मुख्य संदेश को एक सुंदर वाक्य में अपनी कॉपी में लिखें।',
        studentActivitySat: 'ᱠᱟᱹᱦᱱᱤ ᱨᱮᱱᱟᱜ ᱢᱟᱨᱟᱝ ᱥᱟᱸᱫᱮᱥ ᱢᱤᱫ ᱟᱹᱭᱟᱹᱛ ᱛᱮ ᱠᱷᱟᱛᱟ ᱨᱮ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'कहानी से हमें क्या सीख मिलती है?', sat: 'ᱱᱚᱣᱟ ᱠᱟᱹᱦᱱᱤ ᱠᱷᱚᱱ ᱟᱵᱚ ᱪᱮᱫ ᱥᱤᱠᱷᱱᱟᱹᱛ ᱵᱚᱱ ᱧᱟᱢ ᱠᱮᱫᱼᱟ?' }
        ],
        homeActivityHi: 'अपने दादा-दादी से गांव के इतिहास की कोई एक पुरानी बात सुनकर कल कक्षा में साझा करें।',
        homeActivitySat: 'ᱟᱯᱱᱟᱨ ᱜᱚᱲᱚᱢ ᱦᱟᱲᱟᱢ ᱴᱷᱮᱱ ᱠᱷᱚᱱ ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱢᱟᱨᱮ ᱠᱟᱛᱷᱟ ᱟᱸᱡᱚᱢ ᱠᱟᱛᱮ ᱜᱟᱯᱟ ᱞᱟᱹᱭ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'कहानी के आधार पर सही विकल्प चुनें और प्रश्नों के उत्तर संताली में लिखें।',
          instructionsSat: 'ᱠᱟᱹᱦᱱᱤ ᱞᱮᱠᱟᱛᱮ ᱥᱟᱹᱨᱤ ᱵᱟᱪᱷᱟᱣ ᱯᱮ ᱟᱨ ᱠᱩᱠᱞᱤ ᱠᱚ ᱨᱮᱱᱟᱜ ᱛᱮᱞᱟ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
          activityTitle: 'लोककथा पठन एवं चरित्र विश्लेषण (Folk Narrative Analysis)',
          activityType: 'reading',
          matchingPairs: [
            { left: 'वीर / साहसी', right: 'Dilgạr', rightOlChiki: 'ᱫᱤᱞᱜᱟᱹᱨ' },
            { left: 'सत्य / सच', right: 'Sạri', rightOlChiki: 'ᱥᱟᱹᱨᱤ' },
            { left: 'लड़ाई / संग्राम', right: 'Lạṛhại', rightOlChiki: 'ᱞᱟᱹᱲᱦᱟᱹᱭ' }
          ],
          fillBlanks: [
            { questionHi: 'सिदो-कान्हू ने __ (संथाल हूल / Santal Hul) का नेतृत्व किया।', questionSat: 'ᱥᱤᱫᱚ-ᱠᱟᱹᱱᱦᱩ ᱫᱚ __ ᱨᱤᱱ ᱟᱹᱭᱩᱨᱤᱭᱟᱹ ᱠᱤᱱ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾', answer: 'ᱥᱟᱱᱛᱟᱲ ᱦᱩᱞ (हूल)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'कहानी के मुख्य विचारों की अभिव्यक्ति', criteriaSat: 'ᱠᱟᱹᱦᱱᱤ ᱨᱮᱱᱟᱜ ᱢᱩᱬ ᱠᱟᱛᱷᱟ ᱞᱟᱹᱭ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ],
    'Environmental Studies': [
      {
        id: 'g4-evs-1',
        topic: 'Forest Ecosystem & Community Heritage of Jharkhand',
        topicSat: 'ᱵᱤᱨ ᱯᱚᱨᱤᱵᱮᱥ ᱟᱨ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱟᱹᱨᱤᱪᱟᱹᱞᱤ (Forest Ecosystem)',
        nipunCode: 'JCERT EVS Gr4',
        outcome: 'Explains forest benefits, wildlife habitats, and tribal ecological balance.',
        overview: 'Deep ecological understanding of how tribal culture protects forests (Jahir Than, sacred groves).',
        objective: 'Students can describe the sacred grove (Jahir Than) and list 5 medicinal forest plants.',
        teacherScriptHi: 'बच्चों, जाहेर थान हमारे गांव का पवित्र स्थल है, जहाँ साल के वृक्षों की रक्षा की जाती है।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ ᱫᱚ ᱟᱵᱚ ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱯᱩᱱᱟᱹᱭ ᱴᱷᱟᱶ ᱠᱟᱱᱟ, ᱡᱟᱦᱟᱸᱨᱮ ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱠᱚ ᱡᱚᱛᱚᱱ ᱫᱚᱦᱚᱭᱟ᱾',
        classroomActivityHi: 'नक्शा निर्माण: कक्षा में गांव के जाहेर थान, तालाब और जंगल का स्केच मैप बनाएं।',
        classroomActivitySat: 'ᱱᱚᱠᱥᱟ ᱵᱮᱱᱟᱣ: ᱠᱞᱟᱥ ᱨᱮ ᱟᱹᱛᱩ ᱨᱮᱱᱟᱜ ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ, ᱯᱩᱠᱷᱨᱤ ᱟᱨ ᱵᱤᱨ ᱨᱮᱱᱟᱜ ᱱᱚᱠᱥᱟ ᱵᱮᱱᱟᱣ ᱯᱮ᱾',
        studentActivityHi: 'जंगल से मिलने वाली 5 चीजों (महुआ, केंदू पत्ता, दातून, गोंद, फल) के संताली नाम लिखें।',
        studentActivitySat: 'ᱵᱤᱨ ᱠᱷᱚᱱ ᱧᱟᱢᱚᱜ ᱕ ᱡᱤᱱᱤᱥ (ᱢᱟᱹᱛᱠᱚᱢ, ᱛᱮᱨᱮᱞ ᱥᱟᱠᱟᱢ, ᱫᱟᱹᱛᱩᱱ, ᱞᱟᱴᱷᱟ, ᱡᱚ) ᱨᱮᱱᱟᱜ ᱧᱩᱛᱩᱢ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'जंगल हमें किस प्रकार स्वच्छ हवा और पानी देते हैं?', sat: 'ᱵᱤᱨ ᱠᱷᱚᱱ ᱟᱵᱚ ᱪᱮᱫ ᱞᱮᱠᱟ ᱛᱮ ᱥᱟᱯᱷᱟ ᱦᱚᱭ ᱟᱨ ᱫᱟᱜ ᱵᱚᱱ ᱧᱟᱢᱟ?' }
        ],
        homeActivityHi: 'घर जाकर अपने माता-पिता से महुआ बीनने के समय के बारे में जानकारी लें।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱪᱟᱞᱟᱣ ᱠᱟᱛᱮ ᱟᱭᱳ-ᱵᱟᱵᱟ ᱴᱷᱮᱱ ᱠᱷᱚᱱ ᱢᱟᱹᱛᱠᱚᱢ ᱦᱟᱞᱟᱝ ᱚᱠᱛᱚ ᱵᱟᱵᱚᱛ ᱠᱩᱞᱤ ᱵᱩᱡᱷᱟᱹᱣ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'वन उत्पादों को उनके संताली नाम और उपयोग से सुमेलित करें।',
          instructionsSat: 'ᱵᱤᱨ ᱡᱤᱱᱤᱥ ᱠᱚ ᱥᱟᱱᱛᱟᱲᱤ ᱧᱩᱛᱩᱢ ᱟᱨ ᱵᱮᱵᱷᱟᱨ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱯᱮ᱾',
          activityTitle: 'वन संपदा एवं जनजातीय धरोहर (Forest Resources)',
          activityType: 'matching',
          matchingPairs: [
            { left: 'महुआ (Mahua)', right: 'Mạtkom', rightOlChiki: 'ᱢᱟᱹᱛᱠᱚᱢ' },
            { left: 'केंदू पत्ता (Kendu Leaf)', right: 'Terel Sakam', rightOlChiki: 'ᱛᱮᱨᱮᱞ ᱥᱟᱠᱟᱢ' },
            { left: 'पवित्र स्थल (Sacred Grove)', right: 'Jahir Than', rightOlChiki: 'ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ' },
            { left: 'जंगल (Forest)', right: 'Bir', rightOlChiki: 'ᱵᱤᱨ' }
          ],
          fillBlanks: [
            { questionHi: 'महुआ के फूल से __ बनता है।', questionSat: 'ᱢᱟᱹᱛᱠᱚᱢ ᱵᱟᱦᱟ ᱠᱷᱚᱱ __ ᱵᱮᱱᱟᱜᱼᱟ᱾', answer: 'ᱡᱚᱢᱟᱜ (खाद्य/मीठा)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'पर्यावरण और वन संरक्षण की समझ', criteriaSat: 'ᱵᱤᱨ ᱡᱚᱛᱚᱱ ᱵᱩᱡᱷᱟᱹᱣ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ]
  },
  'Grade 5': {
    'Mathematics': [
      {
        id: 'g5-math-1',
        topic: 'Basics of Fractions (1/2, 1/3, 1/4) & Practical Word Problems',
        topicSat: 'ᱦᱟᱹᱴᱤᱧ ᱮᱞᱠᱷᱟ (᱑/᱒, ᱑/᱓, ᱑/᱔) ᱟᱨ ᱠᱩᱠᱞᱤ ᱥᱟᱹᱛ (Fractions & Word Problems)',
        nipunCode: 'JCERT Math Gr5',
        outcome: 'Understands halves (आधा / ᱛᱟᱞᱟ), thirds, fourths (चौथाई / ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ) and solves real-life fraction word problems.',
        overview: 'Concrete fraction mastery using rotis, fruit sharing, and geometric paper folding in the classroom.',
        objective: 'Students can identify 1/2, 1/4, and 3/4 of a whole shape, express them in Santali ("ᱛᱟᱞᱟ ᱦᱟᱹᱴᱤᱧ", "ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱱᱟᱜ ᱢᱤᱫ"), and solve sharing problems.',
        teacherScriptHi: 'बच्चों, यदि एक रोटी को दो बराबर भागों में बांटें, तो प्रत्येक भाग आधा (1/2) कहलाएगा। संताली में इसे "ᱛᱟᱞᱟ" या "ᱵᱟᱨ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱱᱟᱜ ᱢᱤᱫ ᱦᱟᱹᱴᱤᱧ" कहते हैं।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱩᱫᱤ ᱢᱤᱫᱴᱟᱝ ᱯᱤᱴᱷᱟᱹ ᱵᱟᱨ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱵᱚᱱ ᱦᱟᱹᱴᱤᱧᱟ, ᱛᱚᱵᱮ ᱡᱚᱛᱚ ᱦᱟᱹᱴᱤᱧ ᱛᱟᱞᱟ (᱑/᱒) ᱠᱚ ᱢᱮᱛᱟᱜᱼᱟ᱾',
        classroomActivityHi: 'कागज मोड़ने की गतिविधि: आयताकार कागज को मोड़कर 1/2, 1/4 और 3/4 भाग दर्शाना और रंग भरना।',
        classroomActivitySat: 'ᱠᱟᱜᱚᱡᱽ ᱯᱷᱚᱞᱰ ᱠᱟᱹᱢᱤ: ᱪᱚᱣᱠᱟᱹ ᱠᱟᱜᱚᱡᱽ ᱯᱷᱚᱞᱰ ᱠᱟᱛᱮ ᱑/᱒, ᱑/᱔ ᱟᱨ ᱓/᱔ ᱦᱟᱹᱴᱤᱧ ᱩᱫᱩᱜ ᱟᱨ ᱨᱚᱝ ᱯᱮᱨᱮᱡᱽ᱾',
        studentActivityHi: '12 आमों का 1/2 और 1/4 कितना होगा? हल अपनी कॉपी में Ol Chiki में लिखें।',
        studentActivitySat: '᱑᱒ ᱜᱚᱴᱟᱝ ᱩᱞ ᱨᱮᱱᱟᱜ ᱑/᱒ ᱟᱨ ᱑/᱔ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜᱼᱟ? ᱛᱮᱞᱟ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'यदि एक खेत के 4 बराबर हिस्से किए जाएं और 1 हिस्सा बोया जाए, तो वह कितना भिन्न है?', sat: 'ᱡᱩᱫᱤ ᱢᱤᱫ ᱵᱟᱹᱫᱽ ᱔ ᱦᱟᱹᱴᱤᱧ ᱠᱟᱛᱮ ᱑ ᱦᱟᱹᱴᱤᱧ ᱨᱚᱦᱚᱭ ᱮᱱᱟ, ᱛᱚᱵᱮ ᱚᱱᱟ ᱫᱚ ᱛᱤᱱᱟᱹᱜ ᱦᱟᱹᱴᱤᱧ ᱠᱟᱱᱟ?' },
          { hi: 'आधा को भिन्न में 1/2 लिखते हैं, एक चौथाई को क्या लिखते हैं?', sat: 'ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮᱱᱟᱜ ᱢᱤᱫ ᱦᱟᱹᱴᱤᱧ ᱫᱚ ᱪᱮᱫ ᱞᱮᱠᱟ ᱠᱚ ᱚᱞᱟ? (᱑/᱔)' }
        ],
        homeActivityHi: 'घर पर रोटी या फल को बराबर बांटते समय 1/2 और 1/4 का अभ्यास करें।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱨᱮ ᱯᱤᱴᱷᱟᱹ ᱥᱮ ᱡᱚ ᱦᱟᱹᱴᱤᱧ ᱡᱚᱠᱷᱚᱱ ᱑/᱒ ᱟᱨ ᱑/᱔ ᱨᱮᱱᱟᱜ ᱠᱟᱹᱢᱤ ᱟᱭᱳ-ᱵᱟᱵᱟ ᱩᱫᱩᱜ ᱟᱹᱠᱤᱱ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'छायांकित भागों के लिए सही भिन्न लिखें और शब्द समस्याओं को Ol Chiki में हल करें।',
          instructionsSat: 'ᱨᱚᱝ ᱟᱠᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱠᱚ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱹᱨᱤ ᱦᱟᱹᱴᱤᱧ ᱮᱞ ᱚᱞ ᱯᱮ ᱟᱨ ᱠᱩᱠᱞᱤ ᱠᱚ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱥᱟᱹᱛ ᱯᱮ᱾',
          activityTitle: 'भिन्न अवधारणा एवं व्यावहारिक प्रश्न (Fractions & Word Problems)',
          activityType: 'fraction',
          mathProblems: [
            { questionHi: 'एक वृत्त के 4 बराबर भागों में से 2 भाग रंगे हैं। भिन्न क्या है?', questionSat: 'ᱢᱤᱫ ᱜᱩᱞᱟᱹᱭ ᱨᱮᱱᱟᱜ ᱔ ᱦᱟᱹᱴᱤᱧ ᱠᱷᱚᱱ ᱒ ᱦᱟᱹᱴᱤᱧ ᱨᱚᱝ ᱟᱠᱟᱱᱟ᱾ ᱛᱤᱱᱟᱹᱜ ᱦᱟᱹᱴᱤᱧ?', answer: '2/4 = 1/2 (आधा)', satAnswer: '᱒/᱔ = ᱑/᱒ (ᱛᱟᱞᱟ / Tala)' },
            { questionHi: '20 अमरूदों में से 1/4 अमरूद कितने होंगे?', questionSat: '᱒᱐ ᱜᱚᱴᱟᱝ ᱛᱟᱨᱵᱩᱡ ᱠᱷᱚᱱ ᱑/᱔ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱩᱜᱼᱟ?', answer: '5 अमरूद (Five)', satAnswer: '᱕ ᱜᱚᱴᱟᱝ (ᱢᱚᱬᱮ)' },
            { questionHi: 'रामू के पास 100 रुपये थे, उसने आधा खर्च कर दिया। कितने बचे?', questionSat: 'ᱨᱟᱢᱩ ᱴᱷᱮᱱ ᱑᱐᱐ ᱴᱟᱠᱟ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ, ᱛᱟᱞᱟ ᱠᱷᱚᱨᱪᱟ ᱠᱮᱫᱼᱟ᱾ ᱛᱤᱱᱟᱹᱜ ᱥᱟᱨᱮᱡ ᱮᱱᱟ?', answer: '50 रुपये (Fifty)', satAnswer: '᱕᱐ ᱴᱟᱠᱟ (ᱢᱚᱬᱮ ᱜᱮᱞ)' }
          ],
          matchingPairs: [
            { left: '1/2 (आधा)', right: 'Tala / Mit’ ba-bar hatin', rightOlChiki: '᱑/᱒ (ᱛᱟᱞᱟ)' },
            { left: '1/4 (एक चौथाई)', right: 'Mit’ pun hatin', rightOlChiki: '᱑/᱔ (ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ ᱢᱤᱫ)' },
            { left: '3/4 (तीन चौथाई)', right: 'Pe pun hatin', rightOlChiki: '᱓/᱔ (ᱯᱩᱱ ᱦᱟᱹᱴᱤᱧ ᱯᱮ)' },
            { left: '1 (एक पूरा)', right: 'Gota mit’', rightOlChiki: '᱑ (ᱜᱚᱴᱟ ᱢᱤᱫ)' }
          ],
          fillBlanks: [
            { questionHi: 'किसी वस्तु का आधा भाग भिन्न में __ (1/2 / ᱑/᱒) कहलाता है।', questionSat: 'ᱡᱟᱦᱟᱸᱱ ᱡᱤᱱᱤᱥ ᱨᱮᱱᱟᱜ ᱛᱟᱞᱟ ᱦᱟᱹᱴᱤᱧ ᱫᱚ __ ᱠᱚ ᱢᱮᱛᱟᱜᱼᱟ᱾', answer: '1/2 (᱑/᱒)' },
            { questionHi: '1/2 और 1/2 मिलकर __ (एक पूरा / 1) बनता है।', questionSat: '᱑/᱒ ᱟᱨ ᱑/᱒ ᱢᱮᱥᱟ ᱠᱟᱛᱮ __ ᱦᱩᱭᱩᱜᱼᱟ᱾', answer: '1 (ᱜᱚᱴᱟ ᱑)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'भिन्न की समझ और चित्र निरूपण', criteriaSat: 'ᱦᱟᱹᱴᱤᱧ ᱮᱞᱠᱷᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱟᱨ ᱪᱤᱛᱟᱹᱨ ᱩᱫᱩᱜ', level: 'निपुण (Competent)' },
            { criteriaHi: 'व्यावहारिक प्रश्नों में भिन्न का प्रयोग', criteriaSat: 'ᱫᱤᱱᱟᱹᱢ ᱠᱩᱠᱞᱤ ᱨᱮ ᱦᱟᱹᱴᱤᱧ ᱮᱞ ᱞᱟᱜᱟᱣ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ],
    'Foundational Literacy': [
      {
        id: 'g5-lit-1',
        topic: 'Analytical Reading, Dialogues & Tribal Literature',
        topicSat: 'ᱜᱟᱯᱟᱞᱢᱟᱨᱟᱣ, ᱚᱱᱚᱞ ᱟᱨ ᱥᱟᱶᱦᱮᱫ (Dialogue & Tribal Literature)',
        nipunCode: 'JCERT Lit Gr5',
        outcome: 'Reads higher-order texts, extracts arguments, and participates in bilingual debates.',
        overview: 'Advanced language mastery exploring tribal rights, education, and language pride in Ol Chiki.',
        objective: 'Students can compose a 5-sentence dialogue about attending school in Santali and Hindi.',
        teacherScriptHi: 'बच्चों, पंडित रघुनाथ मुर्मू जी ने Ol Chiki लिपि का आविष्कार 1925 में किया था ताकि हमारी भाषा जीवित रहे।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱜᱩᱨᱩ ᱜᱚᱢᱠᱮ ᱯᱚᱸᱰᱮᱛ ᱨᱟᱹᱜᱷᱩᱱᱟᱛᱷ ᱢᱩᱨᱢᱩ ᱑᱙᱒᱕ ᱥᱟᱞ ᱨᱮ ᱚᱞ ᱪᱤᱠᱤ ᱞᱤᱯᱤ ᱮ ᱵᱮᱱᱟᱣ ᱞᱮᱫᱼᱟ ᱡᱮᱢᱚᱱ ᱟᱵᱚᱣᱟᱜ ᱯᱟᱹᱨᱥᱤ ᱡᱤᱣᱤᱫ ᱛᱟᱦᱮᱸᱱ ᱢᱟ᱾',
        classroomActivityHi: 'संवाद वाचन: दो छात्र पंडित रघुनाथ मुर्मू और छात्र की भूमिका में संताली में संवाद प्रस्तुत करेंगे।',
        classroomActivitySat: 'ᱨᱚᱯᱚᱲ ᱩᱫᱩᱜ: ᱵᱟᱨᱭᱟ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱜᱩᱨᱩ ᱜᱚᱢᱠᱮ ᱟᱨ ᱪᱮᱞᱟ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱨᱚᱯᱚᱲ ᱠᱤᱱ ᱞᱟᱹᱭᱟ᱾',
        studentActivityHi: 'अपनी मातृभाषा के महत्व पर 5 पंक्तियां संताली में लिखें।',
        studentActivitySat: 'ᱟᱯᱱᱟᱨ ᱟᱭᱳ ᱟᱲᱟᱝ ᱨᱮᱱᱟᱜ ᱜᱚᱱᱚᱝ ᱪᱮᱛᱟᱱ ᱨᱮ ᱕ ᱛᱷᱟᱨ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'Ol Chiki लिपि का आविष्कार किसने और कब किया?', sat: 'ᱚᱞ ᱪᱤᱠᱤ ᱪᱤᱠᱤ ᱫᱚ ᱚᱠᱚᱭ ᱟᱨ ᱛᱤᱥ ᱮ ᱵᱮᱱᱟᱣ ᱞᱮᱫᱼᱟ?' }
        ],
        homeActivityHi: 'अपने गांव के पुस्तकालय या शिक्षक से संताली भाषा की कोई पत्रिका या पुस्तक पढ़कर आएं।',
        homeActivitySat: 'ᱟᱹᱛᱩ ᱯᱩᱛᱷᱤ ᱜᱟᱲ ᱠᱷᱚᱱ ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ ᱨᱮᱱᱟᱜ ᱯᱩᱛᱷᱤ ᱯᱟᱲᱦᱟᱣ ᱠᱟᱛᱮ ᱦᱤᱡᱩᱜ ᱯᱮ᱾',
        worksheet: {
          instructionsHi: 'अनुच्छेद को पढ़कर प्रश्नों के उत्तर पूर्ण वाक्यों में Ol Chiki में लिखें।',
          instructionsSat: 'ᱚᱱᱚᱞ ᱯᱟᱲᱦᱟᱣ ᱠᱟᱛᱮ ᱠᱩᱠᱞᱤ ᱠᱚ ᱨᱮᱱᱟᱜ ᱛᱮᱞᱟ ᱜᱚᱴᱟ ᱟᱹᱭᱟᱹᱛ ᱛᱮ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
          activityTitle: 'साहित्यिक बोध एवं संवाद लेखन (Literary Analysis & Dialogue)',
          activityType: 'reading',
          matchingPairs: [
            { left: 'गुरु गोमके (Guru Gomke)', right: 'Pt. Raghunath Murmu', rightOlChiki: 'ᱯᱚᱸᱰᱮᱛ ᱨᱟᱹᱜᱷᱩᱱᱟᱛᱷ ᱢᱩᱨᱢᱩ' },
            { left: 'मातृभाषा (Mother Tongue)', right: 'Ayo Aṛaṅ', rightOlChiki: 'ᱟᱭᱳ ᱟᱲᱟᱝ' },
            { left: 'लिपि (Script)', right: 'Chiki', rightOlChiki: 'ᱪᱤᱠᱤ' },
            { left: 'शिक्षा (Education)', right: 'Sikhnạt / Cedo’', rightOlChiki: 'ᱥᱤᱠᱷᱱᱟᱹᱛ' }
          ],
          fillBlanks: [
            { questionHi: 'संताली भाषा की लिपि का नाम __ (Ol Chiki / ᱚᱞ ᱪᱤᱠᱤ) है।', questionSat: 'ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ ᱨᱮᱱᱟᱜ ᱪᱤᱠᱤ ᱧᱩᱛᱩᱢ ᱫᱚ __ ᱠᱟᱱᱟ᱾', answer: 'ᱚᱞ ᱪᱤᱠᱤ (Ol Chiki)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'मातृभाषा और लिपि के इतिहास की समझ', criteriaSat: 'ᱟᱭᱳ ᱟᱲᱟᱝ ᱟᱨ ᱪᱤᱠᱤ ᱱᱟᱜᱟᱢ ᱵᱩᱡᱷᱟᱹᱣ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ],
    'Environmental Studies': [
      {
        id: 'g5-evs-1',
        topic: 'Natural Resources, Minerals & Tribal Heritage of Jharkhand',
        topicSat: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱠᱷᱟᱹᱫᱟᱱ, ᱠᱩᱭᱞᱟᱹ ᱟᱨ ᱥᱟᱪᱟᱨᱦᱮ (Resources of Jharkhand)',
        nipunCode: 'JCERT EVS Gr5',
        outcome: 'Understands mineral resources, water conservation, and sustainable tribal lifestyle.',
        overview: 'Study of Jharkhand’s rich minerals (iron, coal, bauxite), rivers (Subarnarekha, Damodar), and green conservation.',
        objective: 'Students can name 3 minerals found in Jharkhand, 2 major rivers, and describe how sacred traditions preserve water.',
        teacherScriptHi: 'बच्चों, झारखंड का अर्थ है "झाड़ियों और वनों की भूमि"। हमारे राज्य में लोहा, तांबा और कोयला प्रचुर मात्रा में है।',
        teacherScriptSat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱭᱟᱜ ᱢᱮᱱᱮᱛ ᱫᱚ "ᱵᱤᱨ-ᱵᱩᱨᱩ ᱟᱨ ᱡᱷᱟᱲ-ᱡᱷᱟᱸᱠᱷᱟᱲ ᱨᱮᱱᱟᱜ ᱫᱤᱥᱚᱢ" ᱠᱟᱱᱟ᱾ ᱟᱵᱚ ᱴᱷᱮᱱ ᱢᱮᱬᱦᱮᱫ, ᱛᱟᱸᱵᱟ ᱟᱨ ᱠᱩᱭᱞᱟᱹ ᱟᱹᱰᱤ ᱵᱟᱹᱲᱛᱤ ᱢᱮᱱᱟᱜᱼᱟ᱾',
        classroomActivityHi: 'नक्शा अध्ययन: झारखंड के मानचित्र पर जादूगोड़ा, धनबाद, जमशेदपुर और प्रमुख नदियों को चिन्हित करना।',
        classroomActivitySat: 'ᱢᱮᱯ ᱯᱟᱲᱦᱟᱣ: ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱱᱚᱠᱥᱟ ᱨᱮ ᱫᱷᱟᱱᱵᱟᱫᱽ, ᱡᱟᱢᱥᱮᱫᱽᱯᱩᱨ ᱟᱨ ᱢᱟᱨᱟᱝ ᱜᱟᱰᱟ ᱠᱚ ᱪᱤᱱᱦᱟᱹᱣ ᱯᱮ᱾',
        studentActivityHi: 'अपने क्षेत्र की नदी या तालाब के संरक्षण पर 3 उपाय संताली में लिखें।',
        studentActivitySat: 'ᱟᱯᱱᱟᱨ ᱴᱚᱴᱷᱟ ᱨᱮᱱᱟᱜ ᱜᱟᱰᱟ ᱥᱮ ᱯᱩᱠᱷᱨᱤ ᱡᱚᱛᱚᱱ ᱫᱚᱦᱚ ᱨᱮᱱᱟᱜ ᱓ ᱦᱚᱨ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
        assessmentQuestions: [
          { hi: 'झारखंड की सबसे प्रमुख दो नदियों के नाम बताइए।', sat: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱵᱟᱨᱭᱟ ᱢᱟᱨᱟᱝ ᱜᱟᱰᱟ ᱨᱮᱱᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱮᱫ?' },
          { hi: 'कोयला और लोहा को संताली में क्या कहते हैं?', sat: 'ᱠᱩᱭᱞᱟᱹ (कोयला) ᱟᱨ ᱢᱮᱬᱦᱮᱫ (लोहा) ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?' }
        ],
        homeActivityHi: 'घर के बुजुर्गों से पता करें कि पुराने समय में लोग पानी को कैसे स्वच्छ और संरक्षित रखते थे।',
        homeActivitySat: 'ᱚᱲᱟᱜ ᱦᱟᱲᱟᱢ ᱴᱷᱮᱱ ᱠᱷᱚᱱ ᱠᱩᱞᱤ ᱵᱩᱡᱷᱟᱹᱣ ᱯᱮ ᱥᱮᱫᱟᱭ ᱦᱚᱲ ᱪᱮᱫ ᱞᱮᱠᱟ ᱛᱮ ᱫᱟᱜ ᱥᱟᱯᱷᱟ ᱠᱚ ᱫᱚᱦᱚᱭ ᱛᱟᱦᱮᱸᱫ᱾',
        worksheet: {
          instructionsHi: 'झारखंड के प्राकृतिक संसाधनों और नदियों को उनके सही विवरण से मिलाएं।',
          instructionsSat: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱠᱷᱟᱹᱫᱟᱱ ᱟᱨ ᱜᱟᱰᱟ ᱠᱚ ᱥᱟᱹᱨᱤ ᱵᱤᱵᱚᱨᱚᱬ ᱥᱟᱶ ᱡᱚᱲᱟᱣ ᱯᱮ᱾',
          activityTitle: 'झारखंड की प्राकृतिक संपदा एवं नदियाँ (Jharkhand Natural Resources)',
          activityType: 'matching',
          matchingPairs: [
            { left: 'कोयला (Coal)', right: 'Kuylạ', rightOlChiki: 'ᱠᱩᱭᱞᱟᱹ' },
            { left: 'लोहा (Iron)', right: 'Mẽṇhed', rightOlChiki: 'ᱢᱮᱬᱦᱮᱫ' },
            { left: 'नदी (River)', right: 'Gada', rightOlChiki: 'ᱜᱟᱰᱟ' },
            { left: 'पहाड़ (Mountain)', right: 'Buru', rightOlChiki: 'ᱵᱩᱨᱩ' },
            { left: 'जंगल (Forest)', right: 'Bir', rightOlChiki: 'ᱵᱤᱨ' }
          ],
          fillBlanks: [
            { questionHi: 'सुवर्णरेखा और दामोदर झारखंड की प्रमुख __ हैं।', questionSat: 'ᱥᱩᱵᱚᱨᱱᱚᱨᱮᱠᱷᱟ ᱟᱨ ᱫᱟᱢᱳᱫᱚᱨ ᱫᱚ ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱢᱟᱨᱟᱝ __ ᱠᱟᱱᱟ᱾', answer: 'ᱜᱟᱰᱟ (नदियाँ / Rivers)' }
          ],
          assessmentRubric: [
            { criteriaHi: 'झारखंड के प्राकृतिक संसाधनों की पहचान', criteriaSat: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱠᱷᱟᱹᱫᱟᱱ ᱟᱨ ᱜᱟᱰᱟ ᱩᱯᱨᱩᱢ', level: 'निपुण (Competent)' }
          ]
        }
      }
    ]
  }
};

export function getCurriculumTopics(grade: string, subject: string): CurriculumTopic[] {
  const g = grade as GradeLevel;
  const s = subject as SubjectName;
  if (CURRICULUM_MAP[g] && CURRICULUM_MAP[g][s]) {
    return CURRICULUM_MAP[g][s];
  }
  return [];
}
