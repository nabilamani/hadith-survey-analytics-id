"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  BookOpen, 
  Users, 
  Globe, 
  AlertTriangle, 
  Award, 
  CheckCircle, 
  TrendingUp, 
  Info, 
  BarChart3, 
  Sparkles,
  Calendar,
  Layers,
  ArrowUpDown,
  BookOpenCheck,
  Download
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie, 
  Legend 
} from "recharts";

import { surveyData } from "@/data/surveyData";
import { HadithRecord } from "@/data/types";
import { uiTranslations } from "@/data/uiTranslations";

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [globalLanguage, setGlobalLanguage] = useState<"id" | "ar" | "en">("ar");
  const [selectedGroup, setSelectedGroup] = useState<number>(0); // 0 = Semua, 1-5 = Group 1-5
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"percentage-desc" | "percentage-asc" | "col-index">("percentage-desc");
  const [cardLanguages, setCardLanguages] = useState<Record<number, "id" | "ar" | "en">>({});

  // Recharts hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const t = uiTranslations[globalLanguage];
  const isRTL = globalLanguage === "ar";

  // Dynamic localization mapping for hadith groups
  const groupNamesMap = {
    id: ["Semua Bab", "Aqidah & Tanda Kiamat", "Ibadah & Ramadhan", "Fadhilah Amal & Doa", "Akhlak & Sosial", "Tazkiyah & Kehidupan"],
    ar: ["جميع المجموعات", "العقيدة وأشراط الساعة", "العبادة وأعمال رمضان", "فضائل الأعمال والأدعية", "الأخلاق والعلاقات", "تزكية النفوس والحياة"],
    en: ["All Groups", "Creed & Signs of Hour", "Worship & Ramadan", "Virtues & Supplications", "Ethics & Social", "Purification & Life"]
  };

  const hadithGroups = [
    { num: 0, name: groupNamesMap[globalLanguage][0] },
    { num: 1, name: groupNamesMap[globalLanguage][1] },
    { num: 2, name: groupNamesMap[globalLanguage][2] },
    { num: 3, name: groupNamesMap[globalLanguage][3] },
    { num: 4, name: groupNamesMap[globalLanguage][4] },
    { num: 5, name: groupNamesMap[globalLanguage][5] }
  ];

  // Dynamic Domicile Translation Helper
  const translateIsland = (island: string) => {
    if (globalLanguage === "id") return island;
    const map: Record<string, { ar: string; en: string }> = {
      "Jawa": { ar: "جاوا", en: "Java" },
      "Sulawesi": { ar: "سولاويسي", en: "Sulawesi" },
      "Kalimantan": { ar: "كاليمانتان", en: "Kalimantan" },
      "Sumatera": { ar: "سومطرة", en: "Sumatra" },
      "Luar Negeri": { ar: "خارج البلاد", en: "Abroad" },
      "Bali & Nusa Tenggara": { ar: "بالي ونوسا تينجارا", en: "Bali & Nusa Tenggara" },
      "Papua": { ar: "بابوا", en: "Papua" },
      "Lainnya": { ar: "أخرى", en: "Others" }
    };
    return map[island] ? map[island][globalLanguage] : island;
  };

  // Dynamic Age Range Translation Helper
  const translateAge = (age: string) => {
    if (globalLanguage === "id") return age;
    return age
      .replace("tahun", globalLanguage === "ar" ? "سنة" : "years")
      .replace("kurang dari", globalLanguage === "ar" ? "أقل من" : "under")
      .replace("lebih dari", globalLanguage === "ar" ? "أكثر من" : "over");
  };

  // Dynamic Source Translation Helper
  const translateSource = (src: string) => {
    if (globalLanguage === "id") return src;
    const map: Record<string, { ar: string; en: string }> = {
      "Pengajian": { ar: "محاضرات مجالس العلم", en: "Study Gatherings" },
      "Sekolah/Kampus": { ar: "المدرسة/الجامعة", en: "School/Campus" },
      "Instagram": { ar: "إنستغرام", en: "Instagram" },
      "YouTube": { ar: "يوتيوب", en: "YouTube" },
      "WhatsApp": { ar: "واتساب", en: "WhatsApp" },
      "TikTok": { ar: "تيك توك", en: "TikTok" },
      "Keluarga": { ar: "العائلة", en: "Family" },
      "Kajian & Lainnya": { ar: "ندوات وأخرى", en: "Lectures & Others" }
    };
    return map[src] ? map[src][globalLanguage] : src;
  };

  // Localized translated demographics lists for charts
  const localizedAgeData = surveyData.demographics.age.map(d => ({
    ...d,
    name: translateAge(d.name)
  }));

  const localizedIslandData = surveyData.demographics.island.map(d => ({
    ...d,
    name: translateIsland(d.name)
  }));

  const localizedGenderData = surveyData.demographics.gender.map(d => {
    const isFemale = d.name.toLowerCase().includes("perempuan");
    return {
      ...d,
      name: isFemale 
        ? (globalLanguage === "ar" ? "إناث" : "Female") 
        : (globalLanguage === "ar" ? "ذكور" : "Male")
    };
  });

  const localizedSourcesData = surveyData.sources.map(d => ({
    ...d,
    name: translateSource(d.name)
  }));

  // Filtering and Sorting Hadith
  const filteredHadiths = surveyData.hadiths.filter((h) => {
    const matchesGroup = selectedGroup === 0 || h.groupNum === selectedGroup;
    
    // Search can match text in Indonesian or translated strings
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      h.text.toLowerCase().includes(query) || 
      (h.arabicText && h.arabicText.toLowerCase().includes(query)) ||
      (h.englishText && h.englishText.toLowerCase().includes(query)) ||
      h.groupName.toLowerCase().includes(query);
      
    return matchesGroup && matchesSearch;
  });

  const sortedHadiths = [...filteredHadiths].sort((a, b) => {
    if (sortBy === "percentage-desc") {
      return b.percentage - a.percentage;
    } else if (sortBy === "percentage-asc") {
      return a.percentage - b.percentage;
    } else {
      return a.colIndex - b.colIndex;
    }
  });

  // Recharts color palettes (Wardah Inspired Teals & Accent Browns)
  const COLORS_GENDER = ["#006F79", "#67C7C6"]; // Dark Teal & Soft Teal
  const COLORS_AGE = ["#00575F", "#006F79", "#48B9C7", "#67C7C6", "#70CACB", "#8B7F71"]; // Various Teals + Brown Accent
  const COLORS_ISLAND = ["#006F79", "#008793", "#48B9C7", "#67C7C6", "#8B7F71", "#A39788", "#C0B7AC", "#E0DCD5"];

  return (
    <div className="min-h-screen bg-off-white pb-16 flex flex-col font-sans" dir={isRTL ? "rtl" : "ltr"}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          nav, 
          button, 
          .no-print,
          input,
          select,
          .sticky,
          .language-bar {
            display: none !important;
          }
          body, 
          html, 
          main {
            background: #FFFFFF !important;
            color: #1A1A1A !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          .bg-pure-white,
          .rounded-card,
          section,
          div[role="region"],
          .border {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .grid-cols-5 {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
          }
          .lg\\:grid-cols-12 {
            grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
          }
          .lg\\:col-span-8 {
            grid-column: span 8 / span 8 !important;
          }
          .lg\\:col-span-7 {
            grid-column: span 7 / span 7 !important;
          }
          .lg\\:col-span-5 {
            grid-column: span 5 / span 5 !important;
          }
          .lg\\:col-span-4 {
            grid-column: span 4 / span 4 !important;
          }
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .h-64 {
            height: 220px !important;
          }
          .h-48 {
            height: 160px !important;
          }
          .hadith-print-grid {
            max-height: none !important;
            overflow: visible !important;
          }
          .hadith-print-grid > *:nth-child(n+6) {
            display: none !important;
          }
        }
      `}} />
      
      {/* GLOBAL STICKY HEADER / LANGUAGE BAR */}
      <nav className="w-full bg-pure-white border-b border-gray-border/60 py-3 sticky top-0 z-50 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-primary-dark" />
            <span className="font-semibold text-xs text-charcoal-dark tracking-wide uppercase hidden sm:inline">
              {t.footerTitle}
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Premium Download PDF Button */}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-pure-white border border-gray-border hover:border-primary-dark/40 hover:bg-primary/5 text-charcoal-dark p-2 sm:px-3 sm:py-1.5 rounded-badge text-xs font-semibold shadow-raised cursor-pointer transition-all active:scale-95 duration-200"
            >
              <Download className="w-3.5 h-3.5 text-primary-dark" />
              <span className="hidden sm:inline">{t.downloadPdf}</span>
            </button>

            {/* Global Language Selector */}
            <div className="flex items-center gap-1 bg-gray-border/30 p-0.5 rounded-badge border border-gray-border/40">
              {(["id", "ar", "en"] as const).map((lang) => {
                const labelsFull = { id: "Indonesia", ar: "العربية", en: "English" };
                const labelsShort = { id: "ID", ar: "AR", en: "EN" };
                return (
                  <button
                    key={lang}
                    onClick={() => setGlobalLanguage(lang)}
                    className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-badge transition-all cursor-pointer ${
                      globalLanguage === lang 
                        ? "bg-primary-dark text-pure-white shadow-xs" 
                        : "text-gray-medium hover:text-charcoal-dark"
                    }`}
                  >
                    <span className="hidden sm:inline">{labelsFull[lang]}</span>
                    <span className="inline sm:hidden">{labelsShort[lang]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="relative w-full bg-gradient-to-b from-primary/15 via-primary/5 to-off-white pt-12 pb-8 border-b border-gray-border/50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-primary/20 text-primary-dark text-xs font-semibold px-3 py-1 rounded-badge tracking-wider uppercase">
              {t.reportTag}
            </span>
            <span className="flex items-center gap-1 text-gray-medium text-xs font-medium">
              <Calendar className="w-3.5 h-3.5" /> 2026
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-light text-charcoal-dark leading-tight tracking-tight mb-4">
            {t.titleMain} <br className="hidden md:inline" />
            <span className="font-semibold text-primary-dark">{t.titleSub}</span>
          </h1>
          
          <p className="max-w-[800px] text-gray-medium text-sm md:text-base font-light leading-relaxed mb-6">
            {t.description}
          </p>

          <div className="flex flex-wrap gap-3 items-center text-xs text-charcoal font-medium">
            <span className="flex items-center gap-1.5 bg-pure-white border border-gray-border py-1.5 px-3 rounded-card shadow-raised">
              <Users className="w-4 h-4 text-primary-dark" />
              <strong>{surveyData.summary.totalRespondents}</strong> {t.respondentsInvolved}
            </span>
            <span className="flex items-center gap-1.5 bg-pure-white border border-gray-border py-1.5 px-3 rounded-card shadow-raised">
              <Layers className="w-4 h-4 text-primary-dark" />
              <strong>123</strong> {t.hadithsTested}
            </span>
            <span className="flex items-center gap-1.5 bg-pure-white border border-gray-border py-1.5 px-3 rounded-card shadow-raised">
              <BookOpenCheck className="w-4 h-4 text-primary-dark" />
              <strong>5</strong> {t.mainCategories}
            </span>
          </div>
        </div>
      </header>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <main className="max-w-[1200px] mx-auto w-full px-4 md:px-6 mt-8 flex flex-col gap-8 flex-1">
        
        {/* 3. KEY STATISTICS OVERVIEW (KPI CARDS) */}
        <section aria-label="Summary KPI Metrics">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* KPI 1: Responden */}
            <div className="bg-pure-white border border-gray-border rounded-card p-5 shadow-raised hover:shadow-elevated transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-medium text-[11px] font-semibold uppercase tracking-wider">{t.kpiTotalRespondents}</span>
                <div className="p-2 bg-primary/10 text-primary-dark rounded-card">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-charcoal-dark">{surveyData.summary.totalRespondents}</div>
              <div className="text-xs text-success font-medium mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> {t.kpiDataValid}
              </div>
            </div>

            {/* KPI 2: Usia Dominan */}
            <div className="bg-pure-white border border-gray-border rounded-card p-5 shadow-raised hover:shadow-elevated transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-medium text-[11px] font-semibold uppercase tracking-wider">{t.kpiDominantAge}</span>
                <div className="p-2 bg-primary/10 text-primary-dark rounded-card">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-bold text-charcoal-dark truncate">{translateAge(surveyData.summary.topAgeGroup)}</div>
              <div className="text-[11px] text-primary-dark font-medium mt-1">
                {globalLanguage === "ar" ? "النسبة:" : "Share:"} <span className="font-semibold">{surveyData.summary.topAgePercentage}%</span> {t.kpiOfRespondents}
              </div>
            </div>

            {/* KPI 3: Gender Dominan */}
            <div className="bg-pure-white border border-gray-border rounded-card p-5 shadow-raised hover:shadow-elevated transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-medium text-[11px] font-semibold uppercase tracking-wider">{t.kpiDominantGender}</span>
                <div className="p-2 bg-primary/10 text-primary-dark rounded-card">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-charcoal-dark">
                {surveyData.summary.topGender.toLowerCase().includes("perempuan") 
                  ? (globalLanguage === "ar" ? "إناث" : "Female") 
                  : (globalLanguage === "ar" ? "ذكور" : "Male")}
              </div>
              <div className="text-[11px] text-primary-dark font-medium mt-1">
                {globalLanguage === "ar" ? "النسبة:" : "Share:"} <span className="font-semibold">{surveyData.summary.topGenderPercentage}%</span> {t.kpiOfRespondents}
              </div>
            </div>

            {/* KPI 4: Geografi Utama */}
            <div className="bg-pure-white border border-gray-border rounded-card p-5 shadow-raised hover:shadow-elevated transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-medium text-[11px] font-semibold uppercase tracking-wider">{t.kpiDominantRegion}</span>
                <div className="p-2 bg-primary/10 text-primary-dark rounded-card">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-bold text-charcoal-dark">
                {globalLanguage === "ar" 
                  ? `${t.kpiPulau} ${translateIsland(surveyData.summary.topIsland)}` 
                  : `${translateIsland(surveyData.summary.topIsland)} ${t.kpiPulau}`}
              </div>
              <div className="text-[11px] text-primary-dark font-medium mt-1">
                {globalLanguage === "ar" ? "النسبة:" : "Share:"} <span className="font-semibold">{surveyData.summary.topIslandPercentage}%</span> {t.kpiOfRespondents}
              </div>
            </div>

            {/* KPI 5: Sumber Dominan */}
            <div className="bg-pure-white border border-gray-border rounded-card p-5 shadow-raised hover:shadow-elevated transition-shadow duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-medium text-[11px] font-semibold uppercase tracking-wider">{t.kpiPrimarySource}</span>
                <div className="p-2 bg-primary/10 text-primary-dark rounded-card">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-bold text-charcoal-dark truncate">{translateSource(surveyData.summary.topSource)}</div>
              <div className="text-[11px] text-amber-600 font-semibold mt-1">
                {t.kpiOfflineCategory}
              </div>
            </div>

          </div>
        </section>

        {/* 4. VISUALIZATION DASHBOARD (CHARTS SECTION) */}
        <section aria-label="Visualizations Panel" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: GENDER & AGE DEMOGRAPHICS */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* CARD: USIA DISTRIBUTION & GEOGRAPHY MAP SIDE-BY-SIDE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* AGE CHART */}
              <div className="bg-pure-white border border-gray-border rounded-card p-5 shadow-raised">
                <div className="flex items-center justify-between mb-4 border-b border-gray-border pb-3">
                  <div>
                    <h3 className="font-semibold text-sm text-charcoal-dark tracking-tight">{t.chartAgeTitle}</h3>
                    <p className="text-xs text-gray-light">{t.chartAgeSubtitle}</p>
                  </div>
                  <BarChart3 className="w-4 h-4 text-primary-dark" />
                </div>
                <div className="h-64" dir="ltr">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={localizedAgeData}
                        layout="vertical"
                        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                      >
                        <XAxis type="number" stroke="#8C8E90" fontSize={11} />
                        <YAxis type="category" dataKey="name" stroke="#8C8E90" fontSize={10} width={85} orientation="left" />
                        <Tooltip 
                          formatter={(value: any) => [`${value} ${t.sourceOrang}`, ""]}
                          contentStyle={{ 
                            fontFamily: "var(--font-sans)", 
                            fontSize: "12px",
                            borderRadius: "4px",
                            border: "1px solid #E0E0E0",
                            textAlign: "left"
                          }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {localizedAgeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_AGE[index % COLORS_AGE.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-gray-medium">{t.chartLoad}</div>
                  )}
                </div>
              </div>

              {/* DOMICILE / ISLAND CHART */}
              <div className="bg-pure-white border border-gray-border rounded-card p-5 shadow-raised">
                <div className="flex items-center justify-between mb-4 border-b border-gray-border pb-3">
                  <div>
                    <h3 className="font-semibold text-sm text-charcoal-dark tracking-tight">{t.chartIslandTitle}</h3>
                    <p className="text-xs text-gray-light">{t.chartIslandSubtitle}</p>
                  </div>
                  <Globe className="w-4 h-4 text-primary-dark" />
                </div>
                <div className="h-64" dir="ltr">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={localizedIslandData}
                        margin={{ top: 5, right: 10, left: -20, bottom: 25 }}
                      >
                        <XAxis 
                          dataKey="name" 
                          stroke="#8C8E90" 
                          fontSize={9} 
                          interval={0} 
                          angle={-35} 
                          textAnchor="end" 
                          height={50}
                        />
                        <YAxis stroke="#8C8E90" fontSize={10} orientation="left" />
                        <Tooltip 
                          formatter={(value: any) => [`${value} ${t.sourceOrang}`, ""]}
                          contentStyle={{ 
                            fontFamily: "var(--font-sans)", 
                            fontSize: "12px",
                            borderRadius: "4px",
                            border: "1px solid #E0E0E0",
                            textAlign: "left"
                          }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {localizedIslandData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_ISLAND[index % COLORS_ISLAND.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-gray-medium">{t.chartLoad}</div>
                  )}
                </div>
              </div>

            </div>

            {/* INTEGRATED GENDER CHART & EXPLANATION */}
            <div className="bg-pure-white border border-gray-border rounded-card p-5 shadow-raised">
              <div className="flex items-center justify-between mb-4 border-b border-gray-border pb-3">
                <div>
                  <h3 className="font-semibold text-sm text-charcoal-dark tracking-tight">{t.chartGenderTitle}</h3>
                  <p className="text-xs text-gray-light">{t.chartGenderSubtitle}</p>
                </div>
                <Users className="w-4 h-4 text-primary-dark" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2 h-48 flex justify-center" dir="ltr">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={localizedGenderData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {localizedGenderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS_GENDER[index % COLORS_GENDER.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => [`${value} ${t.sourceOrang}`, ""]}
                          contentStyle={{ fontFamily: "var(--font-sans)", fontSize: "12px", borderRadius: "4px" }}
                        />
                        <Legend 
                          verticalAlign="middle" 
                          align="right" 
                          layout="vertical"
                          wrapperStyle={{ fontFamily: "var(--font-sans)", fontSize: "12.5px" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-gray-medium">{t.chartLoad}</div>
                  )}
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                  <div className="bg-off-white border border-gray-border/60 rounded-card p-4">
                    <h4 className="text-xs font-bold uppercase text-primary-dark tracking-wider mb-2">{t.genderWhyTitle}</h4>
                    <p className="text-xs text-charcoal font-light leading-relaxed">
                      {t.genderWhyDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: INFORMATION SOURCES */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <div className="bg-pure-white border border-gray-border rounded-card p-5 shadow-raised flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4 border-b border-gray-border pb-3">
                <div>
                  <h3 className="font-semibold text-sm text-charcoal-dark tracking-tight">{t.sourceTitle}</h3>
                  <p className="text-xs text-gray-light">{t.sourceSubtitle}</p>
                </div>
                <BookOpen className="w-4 h-4 text-primary-dark" />
              </div>

              {/* DIGITAL VS OFFLINE BAR COMPONENT */}
              <div className="mb-6 bg-off-white border border-gray-border/60 rounded-card p-4">
                <h4 className="text-xs font-semibold text-charcoal-dark mb-3">{t.sourceRatioTitle}</h4>
                
                <div className="space-y-4">
                  {/* Digital */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-primary-dark">{t.sourceDigital}</span>
                      <span>{surveyData.sourcesTypeComparison.digital} {t.sourceKlik}</span>
                    </div>
                    <div className="w-full bg-gray-border h-2.5 rounded-card overflow-hidden">
                      <div 
                        className="bg-primary-dark h-full transition-all duration-500" 
                        style={{ width: `${(surveyData.sourcesTypeComparison.digital / (surveyData.sourcesTypeComparison.digital + surveyData.sourcesTypeComparison.offline)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Offline */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-amber-700">{t.sourceOffline}</span>
                      <span>{surveyData.sourcesTypeComparison.offline} {t.sourceKlik}</span>
                    </div>
                    <div className="w-full bg-gray-border h-2.5 rounded-card overflow-hidden">
                      <div 
                        className="bg-amber-600 h-full transition-all duration-500" 
                        style={{ width: `${(surveyData.sourcesTypeComparison.offline / (surveyData.sourcesTypeComparison.digital + surveyData.sourcesTypeComparison.offline)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-light leading-relaxed mt-3 border-t border-gray-border/50 pt-2">
                  {t.sourceDisclaimer}
                </p>
              </div>

              {/* RANKED LIST OF SOURCE STATS */}
              <h4 className="text-xs font-bold uppercase text-charcoal-dark tracking-wider mb-3">{t.sourceRankTitle}</h4>
              <div className="flex-1 overflow-y-auto max-h-[260px] pr-1 space-y-2.5">
                {localizedSourcesData.slice(0, 8).map((src, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs text-charcoal">
                      <span className="font-medium flex items-center gap-1.5 truncate max-w-[190px]">
                        <span className="text-[10px] w-4.5 h-4.5 bg-primary/15 text-primary-dark font-bold rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>
                        {src.name}
                      </span>
                      <span className="font-semibold text-charcoal-dark">{src.value} {t.sourceOrang} ({src.percentage}%)</span>
                    </div>
                    <div className="w-full bg-off-white h-1.5 rounded-card">
                      <div 
                        className={`h-full rounded-card ${src.isDigital ? "bg-primary" : "bg-brown-deep"}`}
                        style={{ width: `${src.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </section>

        {/* 5. INTERACTIVE HADITH BROWSER */}
        <section aria-label="Dynamic Hadith Browser" className="bg-pure-white border border-gray-border rounded-card p-6 shadow-raised flex flex-col gap-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-border pb-4 gap-4">
            <div>
              <h2 className="text-xl font-light text-charcoal-dark">
                {globalLanguage === "ar" ? "" : t.browserTitle.split(" ")[0] + " "}
                <span className="font-semibold text-primary-dark">
                  {globalLanguage === "ar" ? t.browserTitle : t.browserTitle.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <p className="text-xs text-gray-light mt-0.5">{t.browserSubtitle}</p>
            </div>
            
            {/* SEARCH AND SORT BAR */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 no-print">
              
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-medium`} />
                <input 
                  type="text"
                  placeholder={t.browserSearchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full ${isRTL ? "pr-9 pl-4" : "pl-9 pr-4"} py-2 border border-gray-border focus:border-primary focus:outline-none text-xs rounded-xs placeholder-gray-light bg-off-white/40`}
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-1 border border-gray-border rounded-xs px-2.5 py-2 bg-off-white/40 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-medium" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent focus:outline-none font-medium cursor-pointer text-charcoal"
                >
                  <option value="percentage-desc">{t.browserSortHigh}</option>
                  <option value="percentage-asc">{t.browserSortLow}</option>
                  <option value="col-index">{t.browserSortOrder}</option>
                </select>
              </div>

            </div>
          </div>

          {/* GROUP FILTER TABS */}
          <div className="flex flex-wrap gap-1.5 border-b border-gray-border/50 pb-3 no-print">
            {hadithGroups.map((grp) => (
              <button
                key={grp.num}
                onClick={() => setSelectedGroup(grp.num)}
                className={`py-2 px-4 text-xs rounded-badge font-medium transition-colors border duration-200 ${
                  selectedGroup === grp.num 
                    ? "bg-primary-dark border-primary-dark text-pure-white" 
                    : "bg-off-white border-gray-border hover:bg-gray-border/40 text-charcoal"
                }`}
              >
                {grp.name}
              </button>
            ))}
          </div>

          {/* COUNT OF FILTERED RESULTS */}
          <div className="flex justify-between items-center text-xs text-gray-medium">
            <span>
              {t.browserShowing} <strong>{sortedHadiths.length}</strong> {t.browserOf} <strong>123</strong> {t.browserHadiths}
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-primary-dark hover:underline font-semibold"
              >
                {t.browserResetSearch}
              </button>
            )}
          </div>

          {/* HADITH SCROLLABLE LIST GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[550px] overflow-y-auto pr-1 hadith-print-grid">
            {sortedHadiths.map((hadith) => {
              const activeLang = cardLanguages[hadith.colIndex] || globalLanguage;
              return (
                <div 
                  key={hadith.colIndex}
                  className="border border-gray-border rounded-card p-4 hover:border-primary/50 transition-colors bg-off-white/10 hover:bg-pure-white flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-primary/10 border border-primary/20 text-primary-dark font-bold px-2 py-0.5 rounded-badge">
                          {t.browserRank} {hadith.rank}
                        </span>
                        <span className="text-[10px] text-gray-light font-medium truncate max-w-[120px] md:max-w-[160px]">
                          {groupNamesMap[globalLanguage][hadith.groupNum]}
                        </span>
                      </div>
                      
                      {/* Translate Pill Selector */}
                      <div className="flex items-center gap-0.5 bg-gray-border/30 p-0.5 rounded-badge border border-gray-border/40 no-print" dir="ltr">
                        {(["id", "ar", "en"] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setCardLanguages(prev => ({ ...prev, [hadith.colIndex]: lang }))}
                            className={`px-1.5 py-0.5 text-[9px] font-semibold rounded-badge transition-all cursor-pointer uppercase ${
                              activeLang === lang 
                                ? "bg-primary-dark text-pure-white shadow-xs" 
                                : "text-gray-medium hover:text-charcoal-dark"
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <p className={`text-charcoal-dark leading-relaxed mb-4 ${
                      activeLang === "ar" 
                        ? "font-serif text-right text-[15.5px] font-semibold leading-loose mt-2 bg-primary/5 p-3 rounded-card border border-primary/10" 
                        : "text-xs font-normal italic"
                    }`}>
                      {activeLang === "id" ? `“${hadith.text}”` : 
                       activeLang === "ar" ? `${hadith.arabicText || "لا توجد ترجمة"}` : 
                       `${hadith.englishText || "Translation not available"}`}
                    </p>
                  </div>

                  <div>
                    {/* Progress Bar Popularity */}
                    <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
                      <span className="text-gray-medium">{t.browserPopularityRate}</span>
                      <span className={`font-bold ${hadith.isPopular ? "text-primary-dark" : "text-error"}`}>
                        {hadith.percentage}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-border h-2 rounded-card overflow-hidden mb-2">
                      <div 
                        className={`h-full rounded-card ${hadith.isPopular ? "bg-primary-dark" : "bg-error"}`}
                        style={{ width: `${hadith.percentage}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-medium border-t border-gray-border/30 pt-2">
                      <span>{t.browserHeard}: <strong>{hadith.recognizedCount}</strong> {t.browserPeople}</span>
                      <span>{t.browserNeverHeard}: <strong>{hadith.unrecognizedCount}</strong> {t.browserPeople}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* 6. CRITICAL ACADEMIC FINDINGS & WARNINGS (< 50% POPULARITY) */}
        <section aria-label="Critical Research Findings" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: WARNING BANNER & HADITHS BELOW 50% LIST */}
          <div className="lg:col-span-7 bg-pure-white border border-gray-border rounded-card p-6 shadow-raised flex flex-col gap-5">
            <div className="flex items-center gap-2 text-error border-b border-gray-border pb-3.5">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm text-charcoal-dark tracking-tight">
                  {t.warningTitle}
                </h3>
                <p className="text-xs text-gray-light">{t.warningSubtitle}</p>
              </div>
            </div>

            <div className="space-y-3.5 flex-1">
              {surveyData.hadiths.filter(h => h.percentage < 50).map((hadith, index) => {
                const activeLang = cardLanguages[hadith.colIndex] || globalLanguage;
                return (
                  <div key={index} className="bg-red-50/30 border border-error/20 rounded-card p-3.5 flex flex-col gap-2 shadow-xs">
                    <div className="flex justify-between items-start text-[10px] font-semibold text-gray-light gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-error bg-red-100/60 py-0.5 px-2 rounded-badge flex items-center gap-1 font-bold">
                          <AlertTriangle className="w-3 h-3" /> {t.warningPeringkat} {hadith.rank} {t.warningOf}
                        </span>
                        <span className="text-amber-800 truncate max-w-[120px]">{groupNamesMap[globalLanguage][hadith.groupNum]}</span>
                      </div>

                      {/* Translate Pill Selector */}
                      <div className="flex items-center gap-0.5 bg-gray-border/30 p-0.5 rounded-badge border border-gray-border/40 no-print" dir="ltr">
                        {(["id", "ar", "en"] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setCardLanguages(prev => ({ ...prev, [hadith.colIndex]: lang }))}
                            className={`px-1.5 py-0.5 text-[9px] font-semibold rounded-badge transition-all cursor-pointer uppercase ${
                              activeLang === lang 
                                ? "bg-primary-dark text-pure-white shadow-xs" 
                                : "text-gray-medium hover:text-charcoal-dark"
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <p className={`text-charcoal leading-relaxed ${
                      activeLang === "ar" 
                        ? "font-serif text-right text-[15.5px] font-semibold leading-loose mt-2 bg-red-50/50 p-3 rounded-card border border-error/10" 
                        : "text-xs font-light italic"
                    }`}>
                      {activeLang === "id" ? `“${hadith.text}”` : 
                       activeLang === "ar" ? `${hadith.arabicText || "لا توجد ترجمة"}` : 
                       `${hadith.englishText || "Translation not available"}`}
                    </p>
                    
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-error/10">
                      <span className="text-gray-medium">{t.warningPublicRate}</span>
                      <span className="font-bold text-error">{hadith.percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: ANALYTICAL COMMENTARY */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* ANALYTICAL REPORT CARD */}
            <div className="bg-pure-white border border-gray-border rounded-card p-6 shadow-raised flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3.5 border-b border-gray-border pb-3">
                  <Sparkles className="w-4 h-4 text-primary-dark" />
                  <h4 className="font-semibold text-sm text-charcoal-dark">{t.analysisTitle}</h4>
                </div>
                
                <div className="space-y-4 text-xs text-charcoal font-light leading-relaxed">
                  
                  <div>
                    <strong className="text-primary-dark block mb-1">{t.analysisPoint1Title}</strong>
                    <p>{t.analysisPoint1Desc}</p>
                  </div>

                  <div>
                    <strong className="text-primary-dark block mb-1">{t.analysisPoint2Title}</strong>
                    <p>{t.analysisPoint2Desc}</p>
                  </div>

                  <div>
                    <strong className="text-primary-dark block mb-1">{t.analysisPoint3Title}</strong>
                    <p>{t.analysisPoint3Desc}</p>
                  </div>

                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-card p-3 text-[11px] text-primary-dark leading-relaxed font-medium mt-4">
                <strong>{t.analysisAdviceLabel}</strong> {t.analysisAdviceDesc}
              </div>
            </div>

          </div>

        </section>

      </main>

      {/* 7. FOOTER */}
      <footer className="w-full border-t border-gray-border/60 bg-pure-white py-8 mt-16 text-center text-xs text-gray-medium font-light">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className={`text-${isRTL ? "right" : "left"}`}>
            <p className="font-semibold text-charcoal-dark">{t.footerTitle}</p>
            <p className="text-[11px]">{t.footerCopyright} &copy; 2026</p>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-charcoal" dir="ltr">
            <span>{t.footerBuiltWith}</span>
            <span className="text-primary-dark font-semibold">Next.js 15 (App Router)</span>
            <span>&bull;</span>
            <span className="text-primary-dark font-semibold">TypeScript</span>
            <span>&bull;</span>
            <span className="text-primary-dark font-semibold">Tailwind CSS v4</span>
            <span>&bull;</span>
            <span className="text-primary-dark font-semibold">Recharts</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
