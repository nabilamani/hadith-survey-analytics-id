# Product Requirements Document (PRD)

## Dashboard Analisis Statistik
### Penelitian: Survei Hadis-Hadis Populer di Masyarakat Indonesia

---

# 1. Overview

Dashboard ini merupakan aplikasi visualisasi data statistik berbasis web yang digunakan untuk menampilkan hasil penelitian “Survei Hadis-Hadis Populer di Masyarakat Indonesia”. Sistem akan membaca data dari file CSV yang sudah tersedia dan menampilkan berbagai insight statistik secara interaktif, modern, dan responsif.

Dashboard dirancang menggunakan pendekatan desain modern yang terinspirasi dari Wardah Beauty Design System dengan nuansa clean, elegan, ringan, dan mudah dibaca.

---

# 2. Goals

## Tujuan Utama
- Menampilkan hasil statistik penelitian secara visual dan mudah dipahami.
- Membantu peneliti menganalisis persebaran responden dan popularitas hadis.
- Menyediakan insight cepat mengenai hadis yang populer maupun kurang dikenal masyarakat.
- Menampilkan dashboard modern yang nyaman digunakan di desktop maupun mobile.

---

# 3. Data Source

## Sumber Data
Data berasal dari file CSV hasil survei penelitian.

### Format Input
- `.csv`

### Mekanisme
- Sistem membaca file CSV secara otomatis.
- Parsing data dilakukan di frontend/backend.
- Data akan diproses menjadi statistik dan visualisasi chart.

---

# 4. Features

# 4.1 Statistik Jumlah Responden

## Deskripsi
Menampilkan total keseluruhan responden survei.

## Visualisasi
- Statistic Card
- Angka besar (highlight)

## Informasi
- Total responden
- Timestamp terakhir update data

---

# 4.2 Statistik Usia

## Deskripsi
Menampilkan distribusi usia responden.

## Visualisasi
- Bar Chart
- Pie Chart (opsional)

## Kelompok Umur
- < 17 tahun
- 17–20 tahun
- 21–25 tahun
- 26–30 tahun
- > 30 tahun

## Insight
- Kelompok usia dominan
- Persentase tiap kelompok usia

---

# 4.3 Statistik Jenis Kelamin

## Deskripsi
Menampilkan komposisi gender responden.

## Visualisasi
- Doughnut Chart
- Progress Indicator

## Kategori
- Laki-laki
- Perempuan

## Insight
- Persentase gender dominan

---

# 4.4 Statistik Domisili Responden

## Deskripsi
Menampilkan persebaran responden berdasarkan pulau di Indonesia.

## Visualisasi
- Indonesia Region Chart
- Horizontal Bar Chart

## Kategori Pulau
- Jawa
- Sumatera
- Kalimantan
- Sulawesi
- Bali & Nusa Tenggara
- Papua
- Maluku

## Insight
- Pulau dengan responden terbanyak
- Distribusi nasional responden

---

# 4.5 Sumber Informasi Keagamaan

## Deskripsi
Menampilkan dari mana responden paling sering mendapatkan informasi keagamaan.

## Visualisasi
- Horizontal Bar Chart
- Ranking List

## Kategori Contoh
- Media Sosial
- YouTube
- TikTok
- Instagram
- Pengajian
- Masjid
- Sekolah/Kampus
- Keluarga
- Teman
- Website
- Buku

## Insight
- Media paling dominan
- Perbandingan sumber digital vs offline

---

# 4.6 Persentase Hadis Populer

## Deskripsi
Menampilkan tingkat popularitas hadis berdasarkan jawaban responden.

## Visualisasi
- Progress Bar
- Ranking Chart
- Heatmap (opsional)

## Mekanisme
Persentase dihitung dari:
- Jumlah responden yang mengenali hadis
dibagi
- Total seluruh responden

## Output
- Nama hadis
- Persentase popularitas
- Ranking popularitas

---

# 4.7 Hadis dengan Persentase < 50%

## Deskripsi
Menampilkan daftar hadis yang tingkat popularitasnya kurang dari 50%.

## Tujuan
- Mengidentifikasi hadis yang kurang dikenal masyarakat.
- Menjadi insight utama penelitian.

## Visualisasi
- Table
- Alert Card
- Highlight khusus

## Informasi
- Nama hadis
- Persentase
- Status “Kurang Populer”

---

# 5. Dashboard Sections

# 5.1 Hero Section

## Isi
- Judul dashboard
- Subjudul penelitian
- Ringkasan singkat penelitian

## Komponen
- Heading besar
- Background soft teal gradient
- Statistik singkat

---

# 5.2 Statistik Ringkasan

## Komponen
Grid card berisi:
- Total responden
- Usia dominan
- Gender dominan
- Pulau dominan
- Sumber informasi dominan

---

# 5.3 Visualisasi Data

## Isi
- Semua chart utama
- Interaktif
- Responsive

---

# 5.4 Insight Section

## Isi
- Kesimpulan otomatis berdasarkan data
- Highlight hadis populer
- Highlight hadis kurang populer

---

# 5.5 Footer

## Isi
- Nama penelitian
- Tahun penelitian
- Copyright
- Teknologi yang digunakan

---

# 6. User Flow

1. User membuka dashboard
2. Sistem membaca file CSV
3. Sistem memproses data statistik
4. Dashboard menampilkan visualisasi otomatis
5. User dapat melihat insight dan grafik

---

# 7. Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Sistem dapat membaca file CSV |
| FR-02 | Sistem dapat menghitung total responden |
| FR-03 | Sistem dapat mengelompokkan usia |
| FR-04 | Sistem dapat menghitung persentase gender |
| FR-05 | Sistem dapat menghitung domisili per pulau |
| FR-06 | Sistem dapat menghitung sumber informasi keagamaan |
| FR-07 | Sistem dapat menghitung persentase popularitas hadis |
| FR-08 | Sistem dapat memfilter hadis < 50% |
| FR-09 | Sistem menampilkan chart interaktif |
| FR-10 | Dashboard responsive di mobile dan desktop |

---

# 8. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | Responsive Design |
| NFR-02 | Loading data cepat |
| NFR-03 | Modern UI/UX |
| NFR-04 | Accessibility friendly |
| NFR-05 | Clean data visualization |
| NFR-06 | Mobile friendly |

---

# 9. Tech Stack Recommendation

## Frontend
- Next.js
- React.js
- TypeScript

## Styling
- Tailwind CSS

## Chart Library
- Recharts
- ApexCharts
- Chart.js

## Data Processing
- PapaParse (CSV parser)

## Icons
- Lucide React

---

# 10. Design Direction

## Design Style
Menggunakan pendekatan:
- Clean
- Elegant
- Soft modern
- Minimalis
- Feminine-neutral
- High readability

Terinspirasi dari Wardah Beauty Design System.

---

# 11. UI Design Guidelines

# Color Palette

| Role | Color |
|---|---|
| Primary | #67C7C6 |
| Primary Dark | #006F79 |
| Secondary | #48B9C7 |
| Background | #FFFFFF |
| Soft Background | #F8F9FA |
| Border | #E0E0E0 |
| Text Primary | #212529 |
| Text Secondary | #8C8E90 |
| Success | #00B233 |
| Warning | #FFC107 |
| Error | #DC3545 |

---

# Typography

## Font
Montserrat

## Hierarchy
| Element | Size | Weight |
|---|---|---|
| H1 | 40px | 300 |
| H2 | 20px | 300 |
| Body | 14px | 300 |
| Label | 22px | 700 |

---

# Card Style

## Default Card
- Background putih
- Border radius 4px
- Shadow soft
- Padding 24px

---

# Spacing

## Base Unit
8px

## Section Padding
48px vertical
40px horizontal

---

# 12. Responsive Behavior

## Desktop
- 4 column grid
- Full chart layout

## Tablet
- 2 column grid

## Mobile
- Single column
- Scrollable chart

---

# 13. Data Processing Logic

## Persentase Hadis

Formula:

```text
(Jumlah responden mengenali hadis / Total responden) × 100%