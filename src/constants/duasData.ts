export interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export interface DuaTopic {
  id: string;
  title: string;
  duas: Dua[];
}

export interface CategoryData {
  categoryId: string;
  categoryTitle: string;
  topics: DuaTopic[];
}

export const duasData: CategoryData[] = [
  {
    categoryId: '1',
    categoryTitle: 'Salah',
    topics: [
      {
        id: '1',
        title: 'Before Salah',
        duas: [
          {
            id: 1,
            arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
            transliteration: 'A\'oodhu billaahi minash-shaytaanir-rajeem',
            translation: 'I seek refuge in Allah from Satan, the accursed.',
            reference: 'Quran 16:98'
          },
          {
            id: 2,
            arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
            transliteration: 'Bismillahir-Rahmanir-Raheem',
            translation: 'In the name of Allah, the Most Gracious, the Most Merciful.',
            reference: 'Quran'
          }
        ]
      },
      {
        id: '2',
        title: 'After Salah',
        duas: [
          {
            id: 1,
            arabic: 'أَسْتَغْفِرُ اللَّهَ',
            transliteration: 'Astaghfirullah',
            translation: 'I seek forgiveness from Allah.',
            reference: 'Sunnah'
          },
          {
            id: 2,
            arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
            transliteration: 'Allahumma antas-salam wa minkas-salam, tabarakta ya dhal-jalali wal-ikram',
            translation: 'O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.',
            reference: 'Muslim'
          }
        ]
      }
    ]
  },
  {
    categoryId: '2',
    categoryTitle: 'Morning',
    topics: [
      {
        id: '1',
        title: 'Upon waking up',
        duas: [
          {
            id: 1,
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ',
            transliteration: 'Alhamdu lillahi-lathee AAafnee fee jasadee waradda AAalayya roohhee wa-athina lee bithikrih',
            translation: 'All praise for Allah who restored to me my health and returned my soul and has allowed me to remember him.',
            reference: 'At-Tirmidhi 5:473'
          },
          {
            id: 2,
            arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
            transliteration: 'Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namootu wa ilaykan-nushoor',
            translation: 'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.',
            reference: 'At-Tirmidhi'
          }
        ]
      },
      {
        id: '2',
        title: 'Morning Dhikr',
        duas: [
          {
            id: 1,
            arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
            transliteration: 'Subhanallahi wa bihamdihi',
            translation: 'Glory be to Allah and praise be to Him.',
            reference: 'Muslim'
          }
        ]
      }
    ]
  },
  {
    categoryId: '3',
    categoryTitle: 'Evening',
    topics: [
      {
        id: '1',
        title: 'Evening Dhikr',
        duas: [
          {
            id: 1,
            arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
            transliteration: 'Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namootu wa ilaykal-maseer',
            translation: 'O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the return.',
            reference: 'At-Tirmidhi'
          }
        ]
      }
    ]
  },
  {
    categoryId: '5',
    categoryTitle: 'Before Sleep',
    topics: [
      {
        id: '1',
        title: 'Before going to bed',
        duas: [
          {
            id: 1,
            arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
            transliteration: 'Bismika allahumma amootu wa ahya',
            translation: 'In Your name, O Allah, I die and I live.',
            reference: 'Al-Bukhari'
          },
          {
            id: 2,
            arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
            transliteration: 'Allahumma qinee AAathabaka yawma tabAAathu AAibadak',
            translation: 'O Allah, protect me from Your punishment on the day You resurrect Your servants.',
            reference: 'At-Tirmidhi'
          }
        ]
      }
    ]
  },
  {
    categoryId: '6',
    categoryTitle: 'Home & Family',
    topics: [
      {
        id: '1',
        title: 'Entering home',
        duas: [
          {
            id: 1,
            arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ',
            transliteration: 'Allahumma innee as-aluka khayral-mawliji wa khayral-makhraji',
            translation: 'O Allah, I ask You for the best entry and the best exit.',
            reference: 'Ibn Majah'
          }
        ]
      }
    ]
  },
  {
    categoryId: '7',
    categoryTitle: 'Ruqyah & illness',
    topics: [
      {
        id: '1',
        title: 'For healing',
        duas: [
          {
            id: 1,
            arabic: 'أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ وَاشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا',
            transliteration: 'Adhhibil-ba\'sa rabban-nasi washfi antash-shafi la shifa\'a illa shifa\'uka shifa\'an la yughadiru saqaman',
            translation: 'Remove the harm, O Lord of mankind, and heal, You are the Healer. There is no healing except Your healing, a healing that leaves no illness.',
            reference: 'Al-Bukhari and Muslim'
          }
        ]
      }
    ]
  },
  {
    categoryId: '8',
    categoryTitle: 'Sunnah Duas',
    topics: [
      {
        id: '1',
        title: 'General Sunnah Duas',
        duas: [
          {
            id: 1,
            arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
            transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina AAathaban-nar',
            translation: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
            reference: 'Quran 2:201'
          }
        ]
      }
    ]
  },
  {
    categoryId: '9',
    categoryTitle: 'Dhikr for All Time',
    topics: [
      {
        id: '1',
        title: 'General Dhikr',
        duas: [
          {
            id: 1,
            arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
            transliteration: 'Subhanallahi wal-hamdu lillahi wa la ilaha illallahu wallahu akbar',
            translation: 'Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest.',
            reference: 'Sunnah'
          }
        ]
      }
    ]
  },
  {
    categoryId: '10',
    categoryTitle: 'Food & Drinks',
    topics: [
      {
        id: '1',
        title: 'Before eating',
        duas: [
          {
            id: 1,
            arabic: 'بِسْمِ اللَّهِ',
            transliteration: 'Bismillah',
            translation: 'In the name of Allah.',
            reference: 'Al-Bukhari and Muslim'
          }
        ]
      },
      {
        id: '2',
        title: 'After eating',
        duas: [
          {
            id: 1,
            arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
            transliteration: 'Alhamdu lillahi allathee atAAamana wa saqana wa jaAAalana muslimeen',
            translation: 'Praise be to Allah who fed us and gave us drink and made us Muslims.',
            reference: 'Abu Dawud'
          }
        ]
      }
    ]
  },
  {
    categoryId: '11',
    categoryTitle: 'Quranic Duas',
    topics: [
      {
        id: '1',
        title: 'Quranic Supplications',
        duas: [
          {
            id: 1,
            arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
            transliteration: 'Rabbana la tuzigh quloobana ba\'da idh hadaytana wa hab lana min ladunka rahmatan innaka antal-wahhab',
            translation: 'Our Lord, do not let our hearts deviate after You have guided us. Grant us Your mercy. You are indeed the Bestower.',
            reference: 'Quran 3:8'
          }
        ]
      }
    ]
  },
  {
    categoryId: '12',
    categoryTitle: 'Home & Family',
    topics: [
      {
        id: '1',
        title: 'Leaving home',
        duas: [
          {
            id: 1,
            arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
            transliteration: 'Bismillahi tawakkaltu AAalallahi wa la hawla wa la quwwata illa billah',
            translation: 'In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.',
            reference: 'At-Tirmidhi'
          }
        ]
      }
    ]
  }
];
