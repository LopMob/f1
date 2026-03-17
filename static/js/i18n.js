const TRANSLATIONS = {
  en: {
    // Nav
    nav_home: "Home", nav_tracks: "Tracks", nav_drivers: "Drivers",
    nav_races: "Races", nav_standings: "Standings", nav_compare: "Compare",
    footer_copy: "Data for entertainment purposes · Season 2024",

    // Index
    hero_subtitle: "History, circuits, records and interactive track visualization.",
    btn_explore_tracks: "Explore Tracks",
    btn_standings: "2024 Standings",
    btn_start: "Start Exploring Tracks",
    stat_races: "Races", stat_pts: "Leader PTS", stat_drivers: "Drivers",
    stat_teams: "Teams", stat_lap: "Fastest Lap",
    section_explore: "Explore F1 Motion Lab",
    card_tracks_title: "Tracks", card_tracks_desc: "Iconic circuits with animated laps, racing lines and corner-by-corner guides.",
    card_drivers_title: "Drivers", card_drivers_desc: "Full 2024 grid — wins, podiums, poles and career bios for every driver.",
    card_standings_title: "Standings", card_standings_desc: "Driver and constructor championship tables with visual point bars.",
    card_races_title: "Race Results", card_races_desc: "Full 2024 calendar with winners, fastest laps and race details.",
    card_compare_title: "Compare", card_compare_desc: "Head-to-head driver comparison with visual stat bars and career notes.",

    // Tracks
    tracks_title: "Formula 1 Circuits",
    tracks_subtitle: "Select a circuit to explore its layout, corner guides and race strategy.",
    filter_all: "All Circuits", filter_street: "Street", filter_permanent: "Permanent",
    sort_by: "Sort by:", sort_name: "Name", sort_length: "Length", sort_diff: "Difficulty",
    label_km: "km", label_corners: "corners", label_drs: "DRS zones", label_overtaking: "Overtaking",
    open_circuit: "Open Circuit Guide →",

    // Track detail
    label_circuit_length: "Circuit Length", label_lap_record: "Lap Record",
    label_record_holder: "Record Holder", label_difficulty: "Difficulty",
    track_layout: "Track Layout", racing_line: "Racing line", corner_markers: "Corner markers",
    replay_lap: "↺ Replay Lap", running: "Running…",
    click_hint: "Click markers to highlight corners",
    about_circuit: "About This Circuit",
    corner_guide: "Corner-by-Corner Guide",
    corner_subtitle: "Click a marker on the track or a corner below to highlight it.",
    strategy_title: "Race Strategy Guide",
    back_tracks: "← Back to All Circuits",
    back_link: "← All Tracks",

    // Drivers
    drivers_title: "2024 Drivers",
    drivers_subtitle: "All competitors in the Formula 1 World Championship.",
    label_pts: "PTS", label_wins: "Wins", label_podiums: "Podiums", label_poles: "Poles",

    // Races
    races_title: "2024 Race Results",
    races_subtitle: "Full calendar with winners and fastest lap times.",
    col_rd: "Rd", col_gp: "Grand Prix", col_circuit: "Circuit",
    col_date: "Date", col_winner: "Winner", col_team: "Team",
    col_fastest: "Fastest Lap", col_laps: "Laps",

    // Standings
    standings_title: "Championship Standings",
    standings_subtitle: "2024 Formula 1 World Championship — Drivers & Constructors.",
    tab_drivers: "Drivers", tab_constructors: "Constructors",
    label_wins_podiums: "wins · podiums",

    // Compare
    compare_title: "Driver Comparison",
    compare_subtitle: "Head-to-head stats for any two drivers in 2024.",
    stat_points: "Points", stat_wins: "Wins", stat_podiums: "Podiums",
    stat_poles: "Pole Positions", stat_fastest: "Fastest Laps",
  },

  ru: {
    nav_home: "Главная", nav_tracks: "Трассы", nav_drivers: "Пилоты",
    nav_races: "Гонки", nav_standings: "Турнир", nav_compare: "Сравнение",
    footer_copy: "Данные в развлекательных целях · Сезон 2024",

    hero_subtitle: "Трассы, рекорды и интерактивная визуализация кругов.",
    btn_explore_tracks: "Смотреть трассы",
    btn_standings: "Турнирная таблица 2024",
    btn_start: "Начать изучение трасс",
    stat_races: "Гонки", stat_pts: "Лидер PTS", stat_drivers: "Пилоты",
    stat_teams: "Команды", stat_lap: "Быстрый круг",
    section_explore: "Исследуй F1 Motion Lab",
    card_tracks_title: "Трассы", card_tracks_desc: "Легендарные трассы с анимацией круга и гидом по поворотам.",
    card_drivers_title: "Пилоты", card_drivers_desc: "Полный состав 2024 — победы, подиумы, поулы и биографии.",
    card_standings_title: "Турнирная таблица", card_standings_desc: "Зачёт пилотов и команд с визуальными барами очков.",
    card_races_title: "Результаты гонок", card_races_desc: "Полный календарь 2024 с победителями и быстрыми кругами.",
    card_compare_title: "Сравнение", card_compare_desc: "Сравнение двух пилотов лицом к лицу по всей статистике.",

    tracks_title: "Трассы Формулы 1",
    tracks_subtitle: "Выбери трассу — изучи схему, гид по поворотам и стратегию.",
    filter_all: "Все трассы", filter_street: "Городские", filter_permanent: "Стационарные",
    sort_by: "Сортировка:", sort_name: "Название", sort_length: "Длина", sort_diff: "Сложность",
    label_km: "км", label_corners: "поворотов", label_drs: "зон DRS", label_overtaking: "Обгоны",
    open_circuit: "Открыть гид →",

    label_circuit_length: "Длина трассы", label_lap_record: "Рекорд круга",
    label_record_holder: "Рекордсмен", label_difficulty: "Сложность",
    track_layout: "Схема трассы", racing_line: "Линия прохода", corner_markers: "Маркеры поворотов",
    replay_lap: "↺ Повторить круг", running: "Едет…",
    click_hint: "Нажми на маркер чтобы выделить поворот",
    about_circuit: "О трассе",
    corner_guide: "Гид по поворотам",
    corner_subtitle: "Нажми на маркер или на поворот ниже чтобы выделить его.",
    strategy_title: "Гид по стратегии гонки",
    back_tracks: "← Все трассы",
    back_link: "← Все трассы",

    drivers_title: "Пилоты 2024",
    drivers_subtitle: "Все участники Чемпионата мира Формулы 1.",
    label_pts: "ОЧК", label_wins: "Победы", label_podiums: "Подиумы", label_poles: "Поулы",

    races_title: "Результаты гонок 2024",
    races_subtitle: "Полный календарь с победителями и быстрыми кругами.",
    col_rd: "Кр", col_gp: "Гран-при", col_circuit: "Трасса",
    col_date: "Дата", col_winner: "Победитель", col_team: "Команда",
    col_fastest: "Быстрый круг", col_laps: "Кругов",

    standings_title: "Турнирная таблица",
    standings_subtitle: "Чемпионат мира Формулы 1 2024 — Пилоты и Команды.",
    tab_drivers: "Пилоты", tab_constructors: "Команды",
    label_wins_podiums: "побед · подиумов",

    compare_title: "Сравнение пилотов",
    compare_subtitle: "Статистика лицом к лицу для любых двух пилотов 2024.",
    stat_points: "Очки", stat_wins: "Победы", stat_podiums: "Подиумы",
    stat_poles: "Поул-позиции", stat_fastest: "Быстрых кругов",
  }
};

// Current language
let currentLang = localStorage.getItem('f1_lang') || 'en';

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('f1_lang', lang);
  applyTranslations();
  // Update button states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Dispatch event for pages that need extra logic
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
});
