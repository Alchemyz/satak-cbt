import { useState, type KeyboardEvent } from "react";
import "./App.css";

type IconName =
  | "arrow"
  | "check"
  | "shield"
  | "lock"
  | "layers"
  | "chart"
  | "book"
  | "users"
  | "clock"
  | "menu"
  | "close"
  | "chevron";
type Role = "siswa" | "guru" | "proktor";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    arrow: "M5 12h14M13 6l6 6-6 6",
    check: "M5 12.5 9.5 17 19 7",
    shield:
      "M12 3 19 6v5c0 4.4-2.9 8.4-7 10-4.1-1.6-7-5.6-7-10V6l7-3Z M9.5 12.5 11.3 14 15 10",
    lock: "M7 10V7a5 5 0 0 1 10 0v3M5 10h14v10H5V10Z M12 14v2",
    layers: "m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
    chart: "M4 19V5M4 19h16M8 15v-3M12 15V8M16 15v-6",
    book: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5ZM4 5.5V21",
    users:
      "M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 4.5a3 3 0 0 1 0 5.8M20 20v-1.3a3.5 3.5 0 0 0-2.5-3.4",
    clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
    menu: "M4 7h16M4 12h16M4 17h16",
    close: "M6 6l12 12M18 6 6 18",
    chevron: "m6 9 6 6 6-6",
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

const features = [
  [
    "chart" as const,
    "Telemetri pengawasan",
    "Gerakan mencurigakan dari perangkat siswa dipantau secara waktu nyata oleh sistem.",
  ],
  [
    "book" as const,
    "Bank soal multi-format",
    "Susun materi evaluasi dengan klasifikasi tingkat kesulitan dan format yang fleksibel.",
  ],
  [
    "layers" as const,
    "Token dinamis & acak ganda",
    "Urutan soal dan akses berbeda untuk mengurangi peluang berbagi jawaban.",
  ],
  [
    "chart" as const,
    "Koreksi seketika",
    "Nilai dan distribusi hasil tersedia otomatis tanpa menunggu rekap manual.",
  ],
];

const protections = [
  [
    "lock" as const,
    "Karantina layar penuh",
    "Sistem mendeteksi perpindahan fokus pada browser selama ujian.",
  ],
  [
    "shield" as const,
    "Sensor tab switch",
    "Perpindahan tab dan jendela dicatat sebagai bagian dari audit sesi.",
  ],
  [
    "layers" as const,
    "Proteksi clipboard",
    "Penyalinan soal dan akses perangkat pengembang dibatasi selama ujian.",
  ],
  [
    "lock" as const,
    "Isolasi data sekolah",
    "Setiap sekolah memiliki ruang data terpisah berdasarkan School ID.",
  ],
];

const roles: Record<Role, { title: string; text: string; points: string[] }> = {
  siswa: {
    title: "Ujian yang fokus, nyaman, dan terarah",
    text: "Antarmuka siswa dibuat tanpa tombol berbelit agar konsentrasi tercurah pada butir soal.",
    points: [
      "Indikator waktu dan status soal yang jelas",
      "Jawaban tersimpan otomatis setiap beberapa detik",
      "Akses instruksi ujian tetap mudah ditemukan",
    ],
  },
  guru: {
    title: "Materi siap, penilaian lebih singkat",
    text: "Guru menyusun soal, mengatur bobot, dan membaca hasil tanpa proses manual berulang.",
    points: [
      "Bank soal terpusat dan mudah digunakan",
      "Koreksi otomatis untuk soal objektif",
      "Ringkasan performa setiap peserta",
    ],
  },
  proktor: {
    title: "Satu ruang kendali untuk seluruh sesi",
    text: "Proktor memantau status peserta, peringatan sistem, dan progres ujian dari satu dashboard.",
    points: [
      "Monitoring peserta secara real-time",
      "Log aktivitas dan peringatan terstruktur",
      "Kontrol sesi dan rekap siap ekspor",
    ],
  },
};

const faqs = [
  "Bagaimana sistem mendeteksi dan mencegah kecurangan siswa saat ujian?",
  "Perangkat apa saja yang kompatibel untuk mengikuti ujian?",
  "Apakah data dan hasil soal sekolah tersimpan dengan aman?",
  "Apa yang terjadi jika koneksi internet siswa terputus?",
  "Bagaimana mekanisme penilaian untuk soal esai atau uraian?",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<Role>("siswa");
  const [faq, setFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleStepKeyDown = (event: KeyboardEvent<HTMLLIElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveStep(index);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#beranda">
          <span className="brand-mark">
            <Icon name="shield" size={16} />
          </span>
          <span>
            <b>Sistem CBT</b>
            <small>Computer Based Test</small>
          </span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#fitur" onClick={() => setMenuOpen(false)}>
            Fitur
          </a>
          <a href="#keamanan" onClick={() => setMenuOpen(false)}>
            Keamanan
          </a>
          <a href="#alur" onClick={() => setMenuOpen(false)}>
            Alur ujian
          </a>
          <a href="#peran" onClick={() => setMenuOpen(false)}>
            Pengguna
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>
            FAQ
          </a>
        </nav>
        <div className="header-actions">
          <a className="login-link" href="#peran">
            Masuk portal
          </a>
          <a className="button small" href="#kontak">
            Mulai sekarang <Icon name="arrow" size={14} />
          </a>
        </div>
        <button
          className="menu-button"
          type="button"
          aria-label="Buka menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </header>

      <section className="hero" id="beranda">
        <div className="hero-copy">
          <span className="eyebrow">
            <i /> Infrastruktur asesmen digital
          </span>
          <h1>
            Asesmen digital
            <br />
            presisi tinggi,
            <br />
            <em>bebas kecurangan.</em>
          </h1>
          <p>
            Solusi ujian online sekolah dan madrasah terintegrasi. Hadirkan
            telemetri pengawasan waktu nyata, pengacakan butir soal dinamis,
            serta rekapitulasi penilaian seketika.
          </p>
          <div className="hero-actions">
            <a className="button" href="#kontak">
              Masuk ke portal ujian <Icon name="arrow" size={17} />
            </a>
            <a className="text-action" href="#keamanan">
              <span>↗</span> Pelajari sistem proteksi
            </a>
          </div>
          <small className="hero-note">
            Dibangun untuk sekolah yang mengutamakan integritas proses.
          </small>
          <div className="metrics">
            <div>
              <b>99.8%</b>
              <span>Reliabilitas server</span>
            </div>
            <div>
              <b>&lt; 35ms</b>
              <span>Latensi instruksi</span>
            </div>
            <div>
              <b>4 lapis</b>
              <span>Audit &amp; control</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-shape" />
          <div className="exam-window">
            <div className="window-bar">
              <span>
                <i />
                <i />
                <i />
              </span>
              <small>ruang-ujian / asesmen-sumatif</small>
              <b>
                <i /> Aktif
              </b>
            </div>
            <div className="exam-body">
              <div className="exam-heading">
                <div>
                  <small>Asesmen Sumatif CBT</small>
                  <b>Matematika · Kelas IX</b>
                </div>
                <span>
                  <Icon name="clock" size={12} /> 00:43:30
                </span>
              </div>
              <div className="exam-progress">
                <span>
                  Soal 11 <b>/ 30</b>
                </span>
                <i>
                  <b />
                </i>
              </div>
              <p>
                Seorang siswa sedang menyiapkan respons terhadap pesan berbasis
                teks dengan pertimbangan yang tepat.
              </p>
              <div className="choice-list">
                <span>
                  A <b>42.8 ms</b>
                </span>
                <span className="selected">
                  B <b>43.7 ms</b>
                  <Icon name="check" size={13} />
                </span>
                <span>
                  C <b>45.2 ms</b>
                </span>
                <span>
                  D <b>48.0 ms</b>
                </span>
              </div>
              <div className="exam-footer">
                <span>Soal 11 dari 30</span>
                <div>
                  <i className="current">1</i>
                  <i>2</i>
                  <i>3</i>
                  <i>…</i>
                </div>
                <b>
                  <Icon name="check" size={11} /> Tersimpan
                </b>
              </div>
            </div>
          </div>
          <div className="live-card">
            <span>
              <Icon name="chart" size={15} />
            </span>
            <b>
              Live monitoring<small>Semua sistem normal</small>
            </b>
          </div>
        </div>
      </section>

      <section className="intro-strip">
        <span>Arsitektur ujian terintegrasi</span>
        <i />
        <b>Rancang · Jalankan · Tinjau</b>
      </section>

      <section className="section features" id="fitur">
        <div className="section-head">
          <span className="eyebrow">Kapabilitas ujian</span>
          <h2>
            Dirancang untuk
            <br />
            <em>integritas akademik total.</em>
          </h2>
          <p>
            Setiap instrumen pengujian membantu proktor bekerja lebih tenang dan
            sekolah mendapatkan hasil evaluasi yang akurat secara instan.
          </p>
        </div>
        <div className="feature-grid">
          {features.map(([icon, title, text]) => (
            <article className="feature-card" key={title}>
              <span className="feature-icon">
                <Icon name={icon as IconName} size={20} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#kontak">
                Pelajari <Icon name="arrow" size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="security-section" id="keamanan">
        <div className="security-copy">
          <span className="eyebrow">Standar keamanan digital</span>
          <h2>
            Empat lapis
            <br />
            <em>benteng proteksi.</em>
          </h2>
          <p>
            Pengawasan sisi klien dan verifikasi sesi server bekerja bersama
            tanpa perlu memasang aplikasi berat yang membebani perangkat siswa.
          </p>
          <small>
            <Icon name="shield" size={15} /> Enkripsi TLS 1.3 &amp; HTTPS
            terstandar
          </small>
        </div>
        <div className="protection-grid">
          {protections.map(([icon, title, text], index) => (
            <article className="protection-card" key={title}>
              <div>
                <span className="feature-icon">
                  <Icon name={icon as IconName} size={18} />
                </span>
                <small>LAPIS 0{index + 1}</small>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#faq">
                Verifikasi terpasang <Icon name="arrow" size={13} />
              </a>
            </article>
          ))}
          <div className="offline-note">
            <Icon name="shield" size={16} />
            <span>
              <b>Tahan gangguan koneksi internet</b>
              <small>
                Auto-save lokal menjaga jawaban tetap tersimpan sementara.
              </small>
            </span>
          </div>
        </div>
      </section>

      <section className="section flow" id="alur">
        <div className="section-head">
          <span className="eyebrow">Alur kerja terstruktur</span>
          <h2>
            Siklus ujian yang mudah
            <br />
            <em>dioperasikan.</em>
          </h2>
          <p>
            Dari persiapan akademik hingga validasi akhir, semua proses
            berlangsung dalam satu ekosistem.
          </p>
        </div>
        <ol className="steps">
          <li className={activeStep === 0 ? "is-active" : ""} tabIndex={0} onClick={() => setActiveStep(0)} onKeyDown={(event) => handleStepKeyDown(event, 0)}>
            <div className="step-marker"><span>01</span><Icon name="book" size={22} /></div>
            <div className="step-detail">
              <small>Guru &amp; pembuat soal</small>
              <h3>Penyusunan materi</h3>
              <p>Guru menyusun materi dan bank soal dengan format konsisten.</p>
            </div>
          </li>
          <li className={activeStep === 1 ? "is-active" : ""} tabIndex={0} onClick={() => setActiveStep(1)} onKeyDown={(event) => handleStepKeyDown(event, 1)}>
            <div className="step-marker"><span>02</span><Icon name="clock" size={22} /></div>
            <div className="step-detail">
              <small>Administrator sekolah</small>
              <h3>Jadwal &amp; distribusi token</h3>
              <p>Admin menentukan waktu, peserta, serta token akses.</p>
            </div>
          </li>
          <li className={activeStep === 2 ? "is-active" : ""} tabIndex={0} onClick={() => setActiveStep(2)} onKeyDown={(event) => handleStepKeyDown(event, 2)}>
            <div className="step-marker"><span>03</span><Icon name="shield" size={22} /></div>
            <div className="step-detail">
              <small>Siswa &amp; proktor</small>
              <h3>Pengerjaan terpantau</h3>
              <p>Siswa mengerjakan ujian dalam sesi aman dengan monitoring.</p>
            </div>
          </li>
          <li className={activeStep === 3 ? "is-active" : ""} tabIndex={0} onClick={() => setActiveStep(3)} onKeyDown={(event) => handleStepKeyDown(event, 3)}>
            <div className="step-marker"><span>04</span><Icon name="chart" size={22} /></div>
            <div className="step-detail">
              <small>Guru &amp; admin</small>
              <h3>Penilaian &amp; rekap</h3>
              <p>Nilai dan laporan tersedia otomatis untuk ditinjau.</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="section roles" id="peran">
        <div className="section-head">
          <span className="eyebrow">Ekosistem pengguna</span>
          <h2>
            Satu sistem untuk setiap
            <br />
            <em>pemangku kepentingan.</em>
          </h2>
          <p>
            Hak akses terpisah dan dashboard yang disesuaikan dengan tanggung
            jawab setiap peran.
          </p>
        </div>
        <div className="role-tabs">
          {(["siswa", "guru", "proktor"] as Role[]).map((item) => (
            <button
              className={role === item ? "active" : ""}
              key={item}
              onClick={() => setRole(item)}
            >
              {item === "siswa"
                ? "Portal siswa"
                : item === "guru"
                  ? "Guru & pembuat soal"
                  : "Proktor & admin"}
            </button>
          ))}
        </div>
        <div className="role-panel">
          <div>
            <span className="role-label">Portal {role}</span>
            <h3>{roles[role].title}</h3>
            <p>{roles[role].text}</p>
            <ul>
              {roles[role].points.map((point) => (
                <li key={point}>
                  <Icon name="check" size={14} /> {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="role-screen">
            <div className="screen-top">
              <b>Set ujian aktif</b>
              <span>Live sync</span>
            </div>
            <h4>
              Biologi Molekuler <small>12:45:00</small>
            </h4>
            <div className="screen-stats">
              <span>
                <small>SOAL</small>
                <b>04</b>
              </span>
              <span>
                <small>STATUS</small>
                <b className="green">Disimpan</b>
              </span>
              <span>
                <small>KODE</small>
                <b>CBT-4894</b>
              </span>
            </div>
            <div className="screen-question">
              Manakah yang termasuk komponen utama sel?
              <div>
                <span>A. Dinding sel</span>
                <span className="correct">B. Membran sel ✓</span>
                <span>C. Kloroplas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="section-head">
          <span className="eyebrow">Seputar pertanyaan</span>
          <h2>
            Keandalan yang bisa
            <br />
            <em>dipahami semua orang.</em>
          </h2>
          <p>
            Jawaban singkat mengenai keamanan, perangkat, koneksi, dan tata
            kelola ujian sekolah.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((question, index) => (
            <div
              className={faq === index ? "faq-row open" : "faq-row"}
              key={question}
            >
              <button
                onClick={() => setFaq(faq === index ? null : index)}
                aria-expanded={faq === index}
              >
                <span>{question}</span>
                <Icon name="chevron" size={16} />
              </button>
              {faq === index && (
                <p>
                  Setiap sesi memiliki kontrol akses, pencatatan aktivitas, dan
                  penyimpanan otomatis. Konfigurasi dapat disesuaikan dengan
                  kebijakan sekolah dan perangkat peserta.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="cta" id="kontak">
        <div>
          <span className="eyebrow">Penyelenggaraan asesmen terintegrasi</span>
          <h2>
            Siap menyelenggarakan ujian bebas <em>manipulasi?</em>
          </h2>
          <p>
            Akses portal pengelolaan untuk siswa, guru, pembuat soal, maupun
            proktor sekolah Anda.
          </p>
        </div>
        <a className="button light" href="mailto:admin@cbt.sch.id">
          Mulai percakapan <Icon name="arrow" size={16} />
        </a>
      </section>

      <footer className="footer">
        <a className="brand" href="#beranda">
          <span className="brand-mark">
            <Icon name="shield" size={15} />
          </span>
          <span>
            <b>Sistem CBT</b>
            <small>Computer Based Test</small>
          </span>
        </a>
        <span>Ujian digital yang aman dan terintegrasi.</span>
        <span>© 2025 Sistem CBT</span>
      </footer>
    </main>
  );
}

export default App;
