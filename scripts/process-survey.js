const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'file.csv');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'surveyData.ts');

if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

const content = fs.readFileSync(csvPath, 'utf8');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function mapToIsland(domicile) {
  if (!domicile) return 'Tidak Diketahui';
  const val = domicile.toLowerCase().trim();
  if (
    val.includes('libya') || val.includes('tripoli') || 
    val.includes('cairo') || val.includes('kairo') || 
    val.includes('mesir') || val.includes('jepang')
  ) {
    return 'Luar Negeri';
  }
  if (
    val.includes('sulawesi') || val.includes('sulawei') || 
    val.includes('sulteng') || val.includes('sulsel') || 
    val.includes('sultra') || val.includes('sulbar') ||
    val.includes('poso') || val.includes('palu') || 
    val.includes('kendari') || val.includes('makassar') || 
    val.includes('luwu') || val.includes('bone') || 
    val.includes('enrekang') || val.includes('gowa') || 
    val.includes('jeneponto') || val.includes('maros') || 
    val.includes('parepare') || val.includes('wajo') || 
    val.includes('baebunta') || val.includes('banggai') || 
    val.includes('muna') || val.includes('toli toli') ||
    val.includes('toli-toli')
  ) {
    return 'Sulawesi';
  }
  if (
    val.includes('kalimantan') || val.includes('kaltim') || 
    val.includes('kalsel') || val.includes('kalbar') ||
    val.includes('kaltara') || val.includes('samarinda') || 
    val.includes('banjarbaru') || val.includes('lempake') || 
    val.includes('kutai')
  ) {
    return 'Kalimantan';
  }
  if (
    val.includes('sumatera') || val.includes('sumbar') || 
    val.includes('sumut') || val.includes('sumsel') ||
    val.includes('riau') || val.includes('aceh') || 
    val.includes('medan') || val.includes('pagaralam') || 
    val.includes('palembang') || val.includes('bangkala') || 
    val.includes('batusangka') || val.includes('lampung') || 
    val.includes('bengkulu') || val.includes('jambi')
  ) {
    return 'Sumatera';
  }
  if (
    val.includes('bali') || val.includes('denpasar') || 
    val.includes('ntb') || val.includes('lombok') || 
    val.includes('ntt') || val.includes('kupang')
  ) {
    return 'Bali & Nusa Tenggara';
  }
  if (val.includes('papua')) {
    return 'Papua';
  }
  if (val.includes('maluku') || val.includes('ambon')) {
    return 'Maluku';
  }
  if (
    val.includes('jakarta') || val.includes('jkt') || 
    val.includes('bogor') || val.includes('depok') || 
    val.includes('bekasi') || val.includes('tangerang') || 
    val.includes('banten') || val.includes('bandung') || 
    val.includes('cianjur') || val.includes('cirebon') || 
    val.includes('sumedang') || val.includes('karawang') || 
    val.includes('garut') || val.includes('majalengka') || 
    val.includes('sukabumi') || val.includes('yogyakarta') || 
    val.includes('diy') || val.includes('palagan') || 
    val.includes('salatiga') || val.includes('semarang') || 
    val.includes('solo') || val.includes('boyolali') || 
    val.includes('sukaharjo') || val.includes('bekonang') || 
    val.includes('polokarto') || val.includes('tegalmade') || 
    val.includes('joho') || val.includes('karanganyar') || 
    val.includes('pemalang') || val.includes('brebes') || 
    val.includes('demak') || val.includes('banjarnegara') || 
    val.includes('gresik') || val.includes('sidayu') || 
    val.includes('sidoarjo') || val.includes('surabaya') || 
    val.includes('malang') || val.includes('blitar') || 
    val.includes('jember') || val.includes('jombang') || 
    val.includes('pamekasan') || val.includes('madura') || 
    val.includes('sumenep') || val.includes('tuban') || 
    val.includes('sda') || val.includes('jatim') || 
    val.includes('jabar') || val.includes('jateng') || 
    val.includes('jawa') || val.includes('bintaro') ||
    val.includes('indramayu') || val.includes('ciangsana')
  ) {
    return 'Jawa';
  }
  return 'Lainnya';
}

const FAMOUS_TRANSLATIONS = {
  "cinta tanah air adalah sebagian dari iman": {
    ar: "«حُبُّ الْوَطَنِ مِنَ الإِيمَانِ»",
    en: "“Love of one's homeland is a part of faith.” (Popular weak hadith/saying)"
  },
  "sesungguhnya amal itu tergantung pada niatnya": {
    ar: "«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى»",
    en: "“Indeed, actions are determined by intentions, and every person will have only what they intended.” (Sahih al-Bukhari)"
  },
  "barang siapa meninggal pada hari jumat atau malam jumat": {
    ar: "«مَا مِنْ مُسْلِمٍ يَمُوتُ يَوْمَ الْجُمُعَةِ أَوْ لَيْلَةَ الْجُمُعَةِ إِلَّا وَقَاهُ اللَّهُ فِتْنَةَ الْقَبْرِ»",
    en: "“No Muslim dies on the day of Friday or the night of Friday except that Allah protects him from the trial of the grave.” (Sunan al-Tirmidhi)"
  },
  "amal itu tergantung pada penutupnya": {
    ar: "«وَإِنَّمَا الأَعْمَالُ بِالْخَوَاتِيمِ»",
    en: "“Indeed, actions are judged by their final states.” (Sahih al-Bukhari)"
  },
  "penyakit 'ain itu benar adanya": {
    ar: "«الْعَيْنُ حَقٌّ»",
    en: "“The evil eye is real.” (Sahih al-Bukhari)"
  },
  "puasa itu untuk-ku, dan aku sendiri yang akan membalasnya": {
    ar: "«كُلُّ عَمَلِ ابْنِ آدَمَ لَهُ إِلَّا الصِّيَامَ، فَإِنَّهُ لِي وَأَنَا أَجْزِي بِهِ»",
    en: "“Every deed of the son of Adam is for him, except for fasting, which is for Me, and I will reward it.” (Sahih al-Bukhari)"
  },
  "allah turun ke langit dunia setiap malam": {
    ar: "«يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الآخِرِ»",
    en: "“Our Lord, the Blessed and Exalted, descends every night to the lowest heaven when the last third of the night remains...” (Sahih al-Bukhari)"
  },
  "rukun iman adalah": {
    ar: "«أَنْ تُؤْمِنَ بِاللَّهِ، وَمَلَائِكَتِهِ، وَكُتُبِهِ، وَرُسُلِهِ، وَالْيَوْمِ الْآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ»",
    en: "“Belief is to believe in Allah, His angels, His books, His messengers, the Last Day, and to believe in the divine decree (Qadar), both its good and its bad.” (Sahih Muslim)"
  },
  "rukun islam adalah": {
    ar: "«بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ»",
    en: "“Islam is built upon five: testifying that there is no deity worthy of worship except Allah and that Muhammad is His Messenger, establishing prayer, paying Zakat, performing pilgrimage to the House, and fasting Ramadan.” (Sahih al-Bukhari)"
  },
  "menuntut ilmu itu wajib bagi setiap muslim": {
    ar: "«طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ»",
    en: "“Seeking knowledge is an obligation upon every Muslim.” (Sunan Ibn Majah)"
  },
  "berkatalah baik atau diam": {
    ar: "«مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ»",
    en: "“Whoever believes in Allah and the Last Day should speak good or remain silent.” (Sahih al-Bukhari)"
  },
  "dunia adalah penjara bagi orang mukmin": {
    ar: "«الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ»",
    en: "“The world is a prison for the believer and a paradise for the disbeliever.” (Sahih Muslim)"
  },
  "tidurnya orang yang berpuasa adalah ibadah": {
    ar: "«نَوْمُ الصَّائِمِ عِبَادَةٌ»",
    en: "“The sleep of a fasting person is worship.” (Weak Hadith)"
  },
  "sedekah dapat menolak bala": {
    ar: "«الصَّدَقَةُ تَدْفَعُ الْبَلَاءِ»",
    en: "“Charity wards off tribulation.” (Popular saying/hadith)"
  },
  "batal wudhu jika sudah tertawa": {
    ar: "«مَنْ ضَحِكَ مِنْكُمْ فِي الصَّلَاةِ قَهْقَهَةً فَلْيُعِدِ الْوُضُوءَ وَالصَّلَاةَ»",
    en: "“Whoever among you laughs loudly during the prayer, let him repeat both the wudu and the prayer.” (Weak Hadith/Fiqh ruling)"
  },
  "perbedaan pendapat itu rahmat": {
    ar: "«اخْتِلافُ أُمَّتِي رَحْمَةٌ»",
    en: "“The disagreement of my community is a mercy.” (Weak/Fabricated Hadith)"
  },
  "surat al-fatihah adalah penawar dari segala penyakit": {
    ar: "«فَاتِحَةُ الْكِتَابِ شِفَاءٌ مِنْ كُلِّ دَاءٍ»",
    en: "“The opening of the Book (Al-Fatihah) is a cure for every disease.” (Sunan al-Darimi)"
  },
  "kunci masuk syurga adalah kalimat": {
    ar: "«مَنْ كَانَ آخِرُ كَلَامِهِ لَا إِلَهَ إِلَّا اللَّهُ دَخَلَ الْجَنَّةَ»",
    en: "“He whose last words are 'There is no deity worthy of worship except Allah' will enter Paradise.” (Sunan Abi Dawud)"
  },
  "riya' merupakan syirik kecil": {
    ar: "«إِنَّ أَخْوَفَ مَا أَخَافُ عَلَيْكُمُ الشِّرْكُ الْأَصْغَرُ: الرِّيَاءُ»",
    en: "“Indeed, what I fear most for you is the lesser shirk: riya' (showing off).” (Musnad Ahmad)"
  },
  "dunia itu kesenangan, dan sebaik-baik kesenangannya adalah wanita shalihah": {
    ar: "«الدُّنْيَا مَتَاعٌ وَخَيْرُ مَتَاعِ الدُّنْيَا الْمَرْأَةُ الصَّالِحَةُ»",
    en: "“The world is enjoyment, and the best enjoyment of the world is a righteous woman.” (Sahih Muslim)"
  }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchTranslation(text, targetLang) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data[0][0][0];
  } catch (err) {
    console.error(`Failed to fetch translation for lang ${targetLang}:`, err.message);
    return text; // fallback to original
  }
}

async function run() {
  const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
  const headers = parseCSVLine(lines[0]);
  const totalResponded = lines.length - 1;

  // Distributions
  const genderCounts = {};
  const ageCounts = {};
  const islandCounts = {};
  const infoSources = {};

  let digitalSourceCount = 0;
  let offlineSourceCount = 0;

  function categorizeSource(src) {
    const s = src.toLowerCase().trim();
    if (s.includes('instagram') || s.includes('tiktok') || s.includes('youtube') || 
        s.includes('facebook') || s.includes('sosial media') || s.includes('media sosial') || 
        s.includes('whatsapp') || s.includes('website')) {
      return 'digital';
    }
    return 'offline';
  }

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    
    // Gender
    const gender = row[4] ? row[4].trim() : 'Tidak Diketahui';
    genderCounts[gender] = (genderCounts[gender] || 0) + 1;
    
    // Age
    const age = row[3] ? row[3].trim() : 'Tidak Diketahui';
    ageCounts[age] = (ageCounts[age] || 0) + 1;
    
    // Island
    const domicile = row[5];
    const island = mapToIsland(domicile);
    islandCounts[island] = (islandCounts[island] || 0) + 1;
    
    // Sources
    const sourceRaw = row[6] ? row[6].trim() : '';
    if (sourceRaw) {
      const parts = sourceRaw.split(',').map(p => p.trim());
      parts.forEach(part => {
        if (!part) return;
        let norm = part;
        const lower = part.toLowerCase();
        if (lower.includes('instagram')) norm = 'Instagram';
        else if (lower.includes('tiktok')) norm = 'TikTok';
        else if (lower.includes('youtube') || lower.includes('you tube')) norm = 'YouTube';
        else if (lower.includes('whatsapp')) norm = 'WhatsApp';
        else if (lower.includes('facebook')) norm = 'Facebook';
        else if (lower.includes('pengajian') || lower.includes('kajian') || lower.includes('taklim')) norm = 'Pengajian';
        else if (lower.includes('sekolah') || lower.includes('kampus') || lower.includes('pesantren')) norm = 'Sekolah/Kampus';
        else if (lower.includes('masjid')) norm = 'Masjid';
        else if (lower.includes('keluarga')) norm = 'Keluarga';
        else if (lower.includes('teman')) norm = 'Teman';
        else if (lower.includes('buku')) norm = 'Buku';
        else if (lower.includes('website')) norm = 'Website';
        
        if (norm === part && part.length > 25) {
          norm = 'Kajian & Lainnya';
        }
        
        infoSources[norm] = (infoSources[norm] || 0) + 1;
        
        const type = categorizeSource(norm);
        if (type === 'digital') digitalSourceCount++;
        else offlineSourceCount++;
      });
    }
  }

  // Map distributions
  const genderData = Object.keys(genderCounts).map(name => ({
    name,
    value: genderCounts[name],
    percentage: parseFloat(((genderCounts[name] / totalResponded) * 100).toFixed(2))
  }));

  const ageData = Object.keys(ageCounts).map(name => ({
    name,
    value: ageCounts[name],
    percentage: parseFloat(((ageCounts[name] / totalResponded) * 100).toFixed(2))
  })).sort((a,b) => {
    const getMinAge = (str) => {
      const m = str.match(/^(\d+)/);
      return m ? parseInt(m[1]) : 0;
    };
    return getMinAge(a.name) - getMinAge(b.name);
  });

  const islandData = Object.keys(islandCounts).map(name => ({
    name,
    value: islandCounts[name],
    percentage: parseFloat(((islandCounts[name] / totalResponded) * 100).toFixed(2))
  })).sort((a,b) => b.value - a.value);

  const sourceData = Object.keys(infoSources).map(name => ({
    name,
    value: infoSources[name],
    percentage: parseFloat(((infoSources[name] / totalResponded) * 100).toFixed(2)),
    isDigital: categorizeSource(name) === 'digital'
  })).sort((a,b) => b.value - a.value);

  // Hadiths & Async Translation Loop
  const hadiths = [];
  const groupRanges = [
    { groupNum: 1, start: 7, end: 28, name: "Aqidah & Tanda Kiamat" },
    { groupNum: 2, start: 29, end: 52, name: "Ibadah & Amalan Ramadhan" },
    { groupNum: 3, start: 53, end: 77, name: "Fadhilah Amal & Doa Harian" },
    { groupNum: 4, start: 78, end: 106, name: "Akhlak & Hubungan Sosial" },
    { groupNum: 5, start: 107, end: 129, name: "Tazkiyatun Nufus & Kehidupan" }
  ];

  console.log("Starting Hadith Parsing and Translation Pipeline...");
  
  for (let index = 0; index < headers.length; index++) {
    const header = headers[index];
    if (index < 7) continue;
    
    const grpInfo = groupRanges.find(r => index >= r.start && index <= r.end) || { groupNum: 0, name: "Lainnya" };
    
    let recognizedCount = 0;
    let unrecognizedCount = 0;
    
    for (let i = 1; i < lines.length; i++) {
      const row = parseCSVLine(lines[i]);
      const val = row[index] ? row[index].trim() : '';
      
      if (val === 'Pernah mendengar / melihat' || val === 'Ya, pernah mendengar') {
        recognizedCount++;
      } else {
        unrecognizedCount++;
      }
    }
    
    const percentage = (recognizedCount / totalResponded) * 100;
    const match = header.match(/^(\d+)\.\s*(.*)/);
    const itemNum = match ? parseInt(match[1]) : 0;
    const hadithText = match ? match[2].replace(/^“|”|"$|^"|""/g, '').trim() : header;
    
    // Translation Logic
    let arabicText = '';
    let englishText = '';
    
    const lowerText = hadithText.toLowerCase();
    
    // Check hand-curated famous translation dictionary first
    let foundFamous = false;
    for (const key of Object.keys(FAMOUS_TRANSLATIONS)) {
      if (lowerText.includes(key) || key.includes(lowerText)) {
        arabicText = FAMOUS_TRANSLATIONS[key].ar;
        englishText = FAMOUS_TRANSLATIONS[key].en;
        foundFamous = true;
        break;
      }
    }
    
    if (foundFamous) {
      console.log(`Hadith [${index}]: Using hand-curated translation for: "${hadithText.substring(0, 40)}..."`);
    } else {
      // Dynamic fallback via Google Translate API
      console.log(`Hadith [${index}]: Translating dynamically via API: "${hadithText.substring(0, 40)}..."`);
      
      arabicText = await fetchTranslation(hadithText, 'ar');
      await sleep(150); // rate-limiting prevention
      
      englishText = await fetchTranslation(hadithText, 'en');
      await sleep(150); // rate-limiting prevention
    }
    
    hadiths.push({
      colIndex: index,
      groupNum: grpInfo.groupNum,
      groupName: grpInfo.name,
      itemNum,
      text: hadithText,
      fullHeader: header,
      recognizedCount,
      unrecognizedCount,
      percentage: parseFloat(percentage.toFixed(2)),
      rank: 0, // set below
      isPopular: percentage >= 50,
      arabicText,
      englishText
    });
  }

  // Sort and assign ranks
  hadiths.sort((a, b) => b.percentage - a.percentage);
  hadiths.forEach((h, i) => {
    h.rank = i + 1;
  });

  const originalOrderHadiths = [...hadiths].sort((a, b) => a.colIndex - b.colIndex);
  const below50Count = hadiths.filter(h => h.percentage < 50).length;

  const topAge = ageData.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  const topGender = genderData.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  const topIsland = islandData.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  const topSource = sourceData.reduce((prev, current) => (prev.value > current.value) ? prev : current);

  const summary = {
    totalRespondents: totalResponded,
    topAgeGroup: topAge.name,
    topAgePercentage: topAge.percentage,
    topGender: topGender.name,
    topGenderPercentage: topGender.percentage,
    topIsland: topIsland.name,
    topIslandPercentage: topIsland.percentage,
    topSource: topSource.name,
    hadithsBelow50Count: below50Count
  };

  const finalData = {
    summary,
    hadiths: originalOrderHadiths,
    demographics: {
      gender: genderData,
      age: ageData,
      island: islandData
    },
    sources: sourceData,
    sourcesTypeComparison: {
      digital: digitalSourceCount,
      offline: offlineSourceCount
    }
  };

  const tsContent = `import { SurveyData } from "./types";

export const surveyData: SurveyData = ${JSON.stringify(finalData, null, 2)};
`;

  fs.writeFileSync(outputPath, tsContent, 'utf8');

  console.log("\nSUCCESS: Compiled data with translation pipeline!");
  console.log(`Processed: ${totalResponded} respondents.`);
  console.log(`Translated: ${hadiths.length} hadiths into English & Arabic.`);
}

run().catch(console.error);
