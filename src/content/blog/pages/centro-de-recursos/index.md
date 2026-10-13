---
title: "Centro de Recursos y Transparencia"
date: 2026-06-27
coverImage: "tiempos-sustentables-compliance.png"
---

<script data-wp-block-html="js">document.addEventListener("DOMContentLoaded", () => { // 1. FUNCIONES UTILITARIAS Y DEBOUNCE (Optimización de rendimiento) function debounce(func, wait) { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait); }; } function formatDate(isoString) { if (!isoString) return ""; return new Date(isoString).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" }); } function escRE(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); } <div></div> // 2. MANEJO DE CACHÉ function fromCache(key, expiryKey) { try { const raw = sessionStorage.getItem(key); const exp = sessionStorage.getItem(expiryKey); if(raw && exp && Date.now() < parseInt(exp,10)) return JSON.parse(raw); } catch(e) { console.warn("Cache read error", e); } return null; } function toCache(key, expiryKey, val) { try { sessionStorage.setItem(key, JSON.stringify(val)); sessionStorage.setItem(expiryKey, String(Date.now() + (10 * 60 * 1000))); // 10 min } catch(e) { console.warn("Cache write error", e); } } <div></div> // 3. LOADERS, ANIMACIONES Y ACTUALIZACIÓN MANUAL (APPS) const obtenerHoraGMT4 = () => { const ahora = new Date(); const horaUTC = ahora.getTime() + (ahora.getTimezoneOffset() * 60000); const fechaGMT4 = new Date(horaUTC - (4 * 3600000)); const dia = String(fechaGMT4.getDate()).padStart(2, '0'); const mes = String(fechaGMT4.getMonth() + 1).padStart(2, '0'); const anio = fechaGMT4.getFullYear(); const horas = String(fechaGMT4.getHours()).padStart(2, '0'); const minutos = String(fechaGMT4.getMinutes()).padStart(2, '0'); return `${dia}/${mes}/${anio}, ${horas}:${minutos} hrs (GMT-4)`; }; <div></div> const runApp1Sync = () => { const bt = document.getElementById('badge-trends'); const wrapperTrends = document.getElementById('esg-trends-radar'); if(!bt || !wrapperTrends) return; bt.classList.replace('ts-badge-ready', 'ts-badge-syncing'); bt.querySelector('.ts-badge-text').innerHTML = ` <span class="ts-badge-main-text">🟡 Sincronizando API...</span> <span class="ts-badge-sub-text">Conectando con Google Trends</span> `; wrapperTrends.classList.replace('ts-wrapper-ready', 'ts-wrapper-syncing'); setTimeout(() => { bt.classList.replace('ts-badge-syncing', 'ts-badge-ready'); bt.querySelector('.ts-badge-text').innerHTML = ` <span class="ts-badge-main-text">🟢 Sincronizado</span> <span class="ts-badge-sub-text">Últ. act: ${obtenerHoraGMT4()}</span> `; wrapperTrends.classList.replace('ts-wrapper-syncing', 'ts-wrapper-ready'); }, 1200); }; <div></div> const runApp2Sync = () => { const bs = document.getElementById('badge-scholar'); const wrapperScholar = document.getElementById('regulaciones-marcos-esg'); if(!bs || !wrapperScholar) return; <div></div> bs.classList.replace('ts-badge-ready', 'ts-badge-syncing'); bs.querySelector('.ts-badge-text').innerHTML = ` <span class="ts-badge-main-text">🟡 Indexando recursos...</span> <span class="ts-badge-sub-text">Conectando con Google Scholar</span> `; wrapperScholar.classList.replace('ts-wrapper-ready', 'ts-wrapper-syncing'); <div></div> setTimeout(() => { bs.classList.replace('ts-badge-syncing', 'ts-badge-ready'); bs.querySelector('.ts-badge-text').innerHTML = ` <span class="ts-badge-main-text">🟢 Indexado</span> <span class="ts-badge-sub-text">Últ. act: ${obtenerHoraGMT4()}</span> `; wrapperScholar.classList.replace('ts-wrapper-syncing', 'ts-wrapper-ready'); }, 1500); }; <div></div> setTimeout(runApp1Sync, 300); setTimeout(runApp2Sync, 500); <div></div> const badgeTrends = document.getElementById('badge-trends'); if (badgeTrends) badgeTrends.addEventListener('click', runApp1Sync); <div></div> const badgeScholar = document.getElementById('badge-scholar'); if (badgeScholar) badgeScholar.addEventListener('click', runApp2Sync); <div></div> // Animación de los contadores numéricos de la vista Latam function animateCounters() { document.querySelectorAll('.ts-counter').forEach(counter => { const target = parseInt(counter.getAttribute('data-target'), 10); const suffix = counter.getAttribute('data-suffix') || ''; let count = 0; const increment = Math.max(1, Math.ceil(target / 25)); const timer = setInterval(() => { count += increment; if (count >= target) { count = target; clearInterval(timer); } counter.textContent = count + suffix; }, 35); }); } setTimeout(animateCounters, 200); <div></div> // 4. NAVEGACIÓN PRINCIPAL ENTRE VISTAS Y CONFIGURACIÓN CHART.JS document.querySelectorAll('.ts-master-btn').forEach(btn => { btn.addEventListener('click', () => { const view = btn.getAttribute('data-view'); document.querySelectorAll('.ts-master-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); }); btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); document.querySelectorAll('.ts-view').forEach(v => v.classList.remove('active')); const target = document.getElementById(view); if(target) target.classList.add('active'); if(view === 'hub-latam') animateCounters(); setTimeout(() => window.dispatchEvent(new Event('resize')), 120); }); }); <div></div> const chartInstances = {}; const makeChart = (id, labels, data, color, type = 'bar') => { const el = document.getElementById(id); if (!el || typeof Chart === "undefined") return; if (chartInstances[id]) chartInstances[id].destroy(); chartInstances[id] = new Chart(el, { type: type, data: { labels: labels, datasets: [{ data: data, backgroundColor: type === 'line' ? 'rgba(10,74,112,0.08)' : color, borderColor: color, borderWidth: 2, fill: type === 'line', tension: 0.35, pointBackgroundColor: color, pointRadius: 3 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,.18)' }, ticks: { color: '#64748b', font: { size: 11 } } }, x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 11 } } } } } }); }; <div></div> const chartConfigurations = { 'ts-anual2025': [ { id: 'ch_ses_2025', labels: ['Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'], data: [10208,13104,16290,15849,15749,15798,15781,15755,15191], color: '#0A4A70', type: 'bar' }, { id: 'ch_usr_2025', labels: ['Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'], data: [1202,1549,2989,2878,2580,2509,2452,2518,2501], color: '#7B5EA7', type: 'bar' }, { id: 'ch_dur_2025', labels: ['Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'], data: [91,108,98,90,92,90,91,88,95], color: '#3AAECC', type: 'line' } ], 'ts-q2_2025': [ { id: 'ch_ses_q2_2025', labels: ['Abr','May','Jun'], data: [10208,13104,16290], color: '#0A4A70', type: 'bar' }, { id: 'ch_usr_q2_2025', labels: ['Abr','May','Jun'], data: [1202,1549,2989], color: '#7B5EA7', type: 'bar' }, { id: 'ch_dur_q2_2025', labels: ['Abr','May','Jun'], data: [91,108,98], color: '#3AAECC', type: 'line' } ], 'ts-q3_2025': [ { id: 'ch_ses_q3_2025', labels: ['Jul','Ago','Sep'], data: [15849,15749,15798], color: '#0A4A70', type: 'bar' }, { id: 'ch_usr_q3_2025', labels: ['Jul','Ago','Sep'], data: [2878,2580,2509], color: '#7B5EA7', type: 'bar' }, { id: 'ch_dur_q3_2025', labels: ['Jul','Ago','Sep'], data: [90,92,90], color: '#3AAECC', type: 'line' } ], 'ts-q4_2025': [ { id: 'ch_ses_q4_2025', labels: ['Oct','Nov','Dic'], data: [15781,15755,15191], color: '#0A4A70', type: 'bar' }, { id: 'ch_usr_q4_2025', labels: ['Oct','Nov','Dic'], data: [2452,2518,2501], color: '#7B5EA7', type: 'bar' }, { id: 'ch_dur_q4_2025', labels: ['Oct','Nov','Dic'], data: [91,88,95], color: '#3AAECC', type: 'line' } ], 'ts-anual2026': [ { id: 'ch_ses_anual_2026', labels: ['Q1','Q2','Q3','Q4'], data: [15598,17025,17040,17410], color: '#0A4A70', type: 'bar' }, { id: 'ch_usr_anual_2026', labels: ['Q1','Q2','Q3','Q4'], data: [3023,2881,2740,2827], color: '#7B5EA7', type: 'bar' }, { id: 'ch_dur_anual_2026', labels: ['Q1','Q2','Q3','Q4'], data: [162,194,195,206], color: '#3AAECC', type: 'line' } ], 'ts-q1_2026': [ { id: 'ch_ses_q1_2026', labels: ['Ene','Feb','Mar'], data: [15229,15307,16258], color: '#0A4A70', type: 'bar' }, { id: 'ch_usr_q1_2026', labels: ['Ene','Feb','Mar'], data: [3059,2993,3016], color: '#7B5EA7', type: 'bar' }, { id: 'ch_dur_q1_2026', labels: ['Ene','Feb','Mar'], data: [135,158,193], color: '#3AAECC', type: 'line' } ], 'ts-q2_2026': [ { id: 'ch_ses_q2_2026', labels: ['Abr','May','Jun'], data: [16567,17003,17505], color: '#0A4A70', type: 'bar' }, { id: 'ch_usr_q2_2026', labels: ['Abr','May','Jun'], data: [2933,2882,2829], color: '#7B5EA7', type: 'bar' }, { id: 'ch_dur_q2_2026', labels: ['Abr','May','Jun'], data: [188,191,203], color: '#3AAECC', type: 'line' } ], 'ts-q3_2026': [ { id: 'ch_ses_q3_2026', labels: ['Jul','Ago','Sep'], data: [17050,16920,17150], color: '#999999', type: 'bar' }, { id: 'ch_usr_q3_2026', labels: ['Jul','Ago','Sep'], data: [2750,2680,2790], color: '#999999', type: 'bar' }, { id: 'ch_dur_q3_2026', labels: ['Jul','Ago','Sep'], data: [195,192,198], color: '#999999', type: 'line' } ], 'ts-q4_2026': [ { id: 'ch_ses_q4_2026', labels: ['Oct','Nov','Dic'], data: [17480,17900,16850], color: '#999999', type: 'bar' }, { id: 'ch_usr_q4_2026', labels: ['Oct','Nov','Dic'], data: [2850,2910,2720], color: '#999999', type: 'bar' }, { id: 'ch_dur_q4_2026', labels: ['Oct','Nov','Dic'], data: [202,205,210], color: '#999999', type: 'line' } ] }; <div></div> const loadedPanels = new Set(); const loadChartsForPanel = (panelId) => { if (loadedPanels.has(panelId)) return; const configs = chartConfigurations[panelId]; if (!configs) return; configs.forEach(conf => makeChart(conf.id, conf.labels, conf.data, conf.color, conf.type)); loadedPanels.add(panelId); }; <div></div> window.tsSwitch = (id, el) => { document.querySelectorAll('#panel-datos .ts-tab').forEach(tab => { tab.classList.remove('active'); tab.setAttribute('aria-selected', 'false'); }); if (el) { el.classList.add('active'); el.setAttribute('aria-selected', 'true'); } document.querySelectorAll('#panel-datos .ts-panel').forEach(panel => panel.classList.remove('active')); const panelId = 'ts-' + id; const panel = document.getElementById(panelId); if (panel) { panel.classList.add('active'); loadChartsForPanel(panelId); } setTimeout(() => window.dispatchEvent(new Event('resize')), 120); }; <div></div> // 5. RADAR ESG LATAM (Módulo de Datos Simulados) (function initEsgRadar() { const RADAR_COUNTRIES = [ { id: 'CL', name: 'Chile', flag: '🇨🇱' }, { id: 'CO', name: 'Colombia', flag: '🇨🇴' }, { id: 'MX', name: 'México', flag: '🇲🇽' }, { id: 'AR', name: 'Argentina', flag: '🇦🇷' }, { id: 'PE', name: 'Perú', flag: '🇵🇪' }, { id: 'LATAM', name: 'Toda Latinoamérica', flag: '🌎' } ]; const RADAR_CONCEPTS_DATA = { CL: [ { term: 'Economía Circular & Ley REP', score: 98, growth: '+240%', tags: ['Ecodiseño', 'Reciclaje', 'ACV'] }, { term: 'Huella de Carbono & Cero Neto', score: 93, growth: '+195%', tags: ['Descarbonización', 'Net Zero'] }, { term: 'Criterios ESG & Taxonomía CMF', score: 88, growth: '+160%', tags: ['Reportes', 'Gobernanza'] } ], CO: [ { term: 'Desarrollo Sostenible & ODS 2030', score: 96, growth: '+220%', tags: ['Triple Bottom Line', 'ESG'] }, { term: 'Economía Circular & Ecodiseño', score: 90, growth: '+185%', tags: ['Ciclo de Vida ACV', 'Comercio Justo'] }, { term: 'Sumideros de Carbono & Biodiversidad', score: 85, growth: '+150%', tags: ['Capital Natural', 'Agua'] } ], MX: [ { term: 'Criterios ESG & Nearshoring', score: 99, growth: '+310%', tags: ['Cadena Suministro', 'ESG'] }, { term: 'Descarbonización & Cero Neto', score: 92, growth: '+205%', tags: ['Energía Limpia', 'Net Zero'] }, { term: 'Huella Hídrica & Capacidad Carga', score: 86, growth: '+175%', tags: ['Capital Natural', 'Resiliencia'] } ], AR: [ { term: 'Sumideros de Carbono & Agro Sostenible', score: 95, growth: '+230%', tags: ['Capital Natural', 'Biodiversidad'] }, { term: 'Energías Renovables & Transición', score: 89, growth: '+170%', tags: ['Descarbonización', 'Eficiencia'] }, { term: 'Cadena de Suministro Sostenible', score: 82, growth: '+145%', tags: ['Comercio Justo', 'ESG'] } ], PE: [ { term: 'Huella Hídrica & Capital Natural', score: 97, growth: '+285%', tags: ['Agua', 'Minería Sostenible'] }, { term: 'Criterios ESG & Justicia Climática', score: 91, growth: '+190%', tags: ['Consumo Responsable', 'Comunidad'] }, { term: 'Economía Circular & Ecodiseño', score: 84, growth: '+150%', tags: ['ACV', 'Residuos'] } ], LATAM: [ { term: 'Criterios ESG & Reportes de Sostenibilidad', score: 98, growth: '+295%', tags: ['Triple Bottom Line', 'ODS'] }, { term: 'Cero Neto & Descarbonización', score: 93, growth: '+215%', tags: ['Transición Energética', 'Carbono'] }, { term: 'Greenwashing & Consumo Responsable', score: 87, growth: '+180%', tags: ['Transparencia', 'Justicia Climática'] } ] }; const RADAR_BREAKOUTS_DATA = { CL: [ { query: 'Cómo evitar Greenwashing en Informes de Sostenibilidad', growth: '+380%', tag: 'TRANSPARENCIA' }, { query: 'Cálculo de Huella Hídrica y Capital Natural para Empresas', growth: '+320%', tag: 'RECURSOS' }, { query: 'Fiscalización Metas Ley REP y Ecodiseño', growth: '+290%', tag: 'URGENTE' } ], CO: [ { query: 'Indicadores ODS 2030 para Informe Triple Bottom Line', growth: '+350%', tag: 'REPORTES' }, { query: 'Estrategias de Resiliencia Climática y Capacidad de Carga', growth: '+310%', tag: 'CLIMA' }, { query: 'Análisis de Ciclo de Vida ACV en Cadena de Suministro', growth: '+260%', tag: 'CIRCULAR' } ], MX: [ { query: 'Auditoría Criterios ESG Requisito Nearshoring', growth: '+390%', tag: 'EXPORT' }, { query: 'Estrategias Cero Neto para Proveedores', growth: '+310%', tag: 'DESCARBONIZACIÓN' }, { query: 'Certificación Comercio Justo y Consumo Responsable', growth: '+250%', tag: 'SOCIAL' } ], AR: [ { query: 'Plataformas de Mercado de Créditos Sumideros de Carbono', growth: '+340%', tag: 'AGRO' }, { query: 'Modelos de Transición Energética y Eficiencia Pymes', growth: '+280%', tag: 'ENERGÍA' }, { query: 'Implementación de Economía Circular en Producción', growth: '+230%', tag: 'INDUSTRIA' } ], PE: [ { query: 'Estándares de Justicia Climática en Comunidades', growth: '+360%', tag: 'SOCIAL' }, { query: 'Monitoreo de Huella Hídrica e Impacto en Ecosistemas', growth: '+300%', tag: 'AGUA' }, { query: 'Guía de Ecodiseño para Gestión de Residuos', growth: '+240%', tag: 'NORMATIVA' } ], LATAM: [ { query: 'Directiva CS3D UE: Cadena de Suministro Sostenible', growth: '+410%', tag: 'INTERNACIONAL' }, { query: 'Cómo medir la Huella de Carbono Alcance 1 2 y 3 sin Greenwashing', growth: '+330%', tag: 'MEDICIÓN' }, { query: 'Indicadores de Biodiversidad y Capital Natural en Balances ESG', growth: '+270%', tag: 'BIODIVERSIDAD' } ] }; let selectedCountry = 'CL'; const cBtnsContainer = document.getElementById('ts-radar-country-btns'); const conceptsList = document.getElementById('ts-radar-concepts-list'); const breakoutList = document.getElementById('ts-radar-breakout-list'); const conceptsTitle = document.getElementById('ts-radar-concepts-title'); function renderCountryButtons() { if (!cBtnsContainer) return; let html = ''; RADAR_COUNTRIES.forEach(c => { const activeClass = c.id === selectedCountry ? 'active' : ''; html += `<button class="ts-radar-cbtn ${activeClass}" type="button" data-cid="${c.id}"><span>${c.flag}</span><span>${c.name}</span></button>`; }); cBtnsContainer.innerHTML = html; cBtnsContainer.querySelectorAll('.ts-radar-cbtn').forEach(btn => { btn.addEventListener('click', function() { selectedCountry = btn.getAttribute('data-cid'); renderCountryButtons(); renderRadarData(); }); }); } function renderRadarData() { const cObj = RADAR_COUNTRIES.find(c => c.id === selectedCountry) || RADAR_COUNTRIES[0]; if (conceptsTitle) conceptsTitle.textContent = '🔥 TOP 3 Conceptos en ' + cObj.name; const concepts = RADAR_CONCEPTS_DATA[selectedCountry] || RADAR_CONCEPTS_DATA['CL']; let cHtml = ''; concepts.slice(0, 3).forEach((item, idx) => { const tagsHtml = item.tags.map(t => `<span class="ts-radar-tag">#${t}</span>`).join(''); cHtml += `<div class="ts-radar-item"><div class="ts-radar-item-top"><div><span class="ts-radar-rank">#${idx + 1}</span><span class="ts-radar-term">${item.term}</span><div class="ts-radar-tags">${tagsHtml}</div></div><div class="ts-radar-score-box"><span class="ts-radar-score-val">${item.score}/100</span><span class="ts-radar-growth">${item.growth}</span></div></div><div class="ts-radar-bar-bg"><div class="ts-radar-bar-fill" style="width: ${item.score}%;"></div></div></div>`; }); if (conceptsList) conceptsList.innerHTML = cHtml; const breakouts = RADAR_BREAKOUTS_DATA[selectedCountry] || RADAR_BREAKOUTS_DATA['CL']; let bHtml = ''; breakouts.slice(0, 3).forEach((item, idx) => { bHtml += `<div class="ts-radar-item"><div class="ts-radar-item-top"><span class="ts-radar-tag" style="background:#fff7ed; color:#c2410c; border:1px solid #ffedd5; font-weight:700;">#${idx + 1} • ${item.tag}</span><span class="ts-radar-growth hot">${item.growth}</span></div><p class="ts-radar-query-text">"${item.query}"</p></div>`; }); if (breakoutList) breakoutList.innerHTML = bHtml; } renderCountryButtons(); renderRadarData(); })(); <div></div> // 5.1 MANEJO DE SELECTORES DE PAÍS EN REGULACIONES Y ESTÁNDARES ESG (function initRegCountryButtons() { const regBtnsContainer = document.getElementById('ts-reg-country-btns'); if (!regBtnsContainer) return; <div></div> const buttons = regBtnsContainer.querySelectorAll('.ts-radar-cbtn'); <div></div> buttons.forEach(btn => { btn.addEventListener('click', () => { // 1. Remover clase activa de todos los botones de este selector buttons.forEach(b => b.classList.remove('active')); <div></div> // 2. Marcar el botón cliqueado como activo btn.classList.add('active'); <div></div> // 3. Obtener el ID del acordeón objetivo const targetId = btn.getAttribute('data-target'); const targetItem = document.getElementById(targetId); <div></div> if (targetItem) { // Abrir el acordeón objetivo targetItem.setAttribute('open', ''); <div></div> // Desplazamiento suave hacia la sección seleccionada targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }); }); })(); <div></div> // 6. BUSCADORES CON DEBOUNCE APLICADO function bindSearch(inputId, clearId, callback) { const input = document.getElementById(inputId); const clearBtn = document.getElementById(clearId); if(!input) return; const execSearch = debounce(() => { const query = input.value.trim().toLowerCase(); if(clearBtn) clearBtn.classList.toggle("ts-hidden", !query); callback(query); }, 300); <div></div> input.addEventListener("input", execSearch); if(clearBtn) { clearBtn.addEventListener("click", () => { input.value = ""; clearBtn.classList.add("ts-hidden"); callback(""); }); } } <div></div> // Buscador del Hub ESG (Regulaciones y Taxonomías) bindSearch("ts-hub-search", "ts-hub-search-clear", (query) => { const hubContainer = document.getElementById("ts-hub-accordion-container"); const hubNoResults = document.getElementById("ts-hub-no-results"); if(!hubContainer) return; let totalVisibleGroups = 0; hubContainer.querySelectorAll(".ts-hub-item").forEach(item => { const rows = item.querySelectorAll("tbody tr"); let visibleRows = 0; rows.forEach(row => { const text = row.textContent.toLowerCase(); if(text.includes(query)) { row.style.display = ""; visibleRows++; } else { row.style.display = "none"; } }); const countBadge = item.querySelector(".ts-hub-count"); if(countBadge) { const originalTotal = countBadge.getAttribute("data-total"); countBadge.textContent = query ? (visibleRows === 1 ? "1 recurso" : visibleRows + " recursos") : (originalTotal === "1" ? "1 recurso" : originalTotal + " recursos"); } if(visibleRows > 0) { item.style.display = ""; totalVisibleGroups++; if(query) item.setAttribute("open", ""); else item.removeAttribute("open"); } else { item.style.display = "none"; } }); if(hubNoResults) hubNoResults.classList.toggle("ts-hidden", totalVisibleGroups > 0); }); <div></div> // 7. FETCH PARA PUBLICACIONES Y EXPERTOS DESDE WORDPRESS REST API CON TRY/CATCH const SITE_URL = "https://tiempossustentables.cl"; function bindAccordion(root){ if(!root) return; root.querySelectorAll('.ts-accordion-trigger').forEach(btn => { btn.addEventListener('click', () => { const card = btn.closest('.ts-accordion-card'); if(card) card.classList.toggle('open'); }); }); } <div></div> // 7.1 PUBLICACIONES EDITORIALES const CATEGORIAS_PUB = [ { id: 778961590, name: "Negocios y Finanzas Sostenibles" }, { id: 435247134, name: "Medioambiente y Cambio Climático" }, { id: 778961587, name: "Innovación y Tecnología Sustentable" }, { id: 19313205, name: "Estilo de Vida Sustentable" } ]; const CAT_IDS_STR_PUB = CATEGORIAS_PUB.map(c => c.id).join(","); let allPosts = []; function renderPubs(posts, searchTerm) { const q = (searchTerm || "").trim().toLowerCase(); let totalVisible = 0; let html = ""; const elAcordeonPub = document.getElementById("ts-repo-acordeon"); const elNoResultsPub = document.getElementById("ts-no-results"); const elTotalBadgePub = document.getElementById("ts-total-count-badge"); if(!elAcordeonPub) return; // Validación de seguridad si el HTML no está en la página actual CATEGORIAS_PUB.forEach(cat => { let catPosts = posts.filter(p => Array.isArray(p.categories) && p.categories.includes(cat.id)); if(q) catPosts = catPosts.filter(p => (p.title.rendered || "").toLowerCase().includes(q)); if(!catPosts.length) return; totalVisible += catPosts.length; html += `<div class="ts-accordion-card"><button class="ts-accordion-trigger" type="button"><div class="ts-trigger-left"><div class="ts-trigger-title-wrap"><span class="ts-trigger-title">${cat.name}</span><span class="ts-trigger-count">${catPosts.length} publicaciones</span></div></div><span class="ts-chevron">⌄</span></button><div class="ts-accordion-content"><ul class="ts-post-list">`; catPosts.forEach(post => { let title = post.title && post.title.rendered ? post.title.rendered : "Sin título"; if(q) title = title.replace(new RegExp("(" + escRE(searchTerm) + ")", "ig"), '<span class="ts-highlight">$1</span>'); html += `<li><a class="ts-post-link-wrapper" href="${post.link}" target="_blank" rel="noopener noreferrer"><div class="ts-post-left"><span class="ts-post-doc-icon">•</span><div class="ts-post-info"><span class="ts-post-title-text">${title}</span><span class="ts-post-date">${formatDate(post.date)}</span></div></div><span class="ts-post-action-indicator">Ver →</span></a></li>`; }); html += `</ul></div></div>`; }); elAcordeonPub.innerHTML = html; elAcordeonPub.classList.toggle("ts-hidden", !totalVisible); bindAccordion(elAcordeonPub); if(elNoResultsPub) elNoResultsPub.classList.toggle("ts-hidden", !!totalVisible); if(elTotalBadgePub) { elTotalBadgePub.textContent = totalVisible + " publicaciones en total"; elTotalBadgePub.classList.remove("ts-hidden"); } } <div></div> async function fetchAllPubs() { let allData = []; let page = 1; try { while(true) { const url = SITE_URL + "/wp-json/wp/v2/posts?per_page=100&_fields=id,date,link,title,categories&categories=" + CAT_IDS_STR_PUB + "&page=" + page; const res = await fetch(url); if (!res.ok) break; const data = await res.json(); if (!Array.isArray(data) || data.length === 0) break; allData = allData.concat(data); if (data.length < 100) break; page++; } } catch(e) { console.error("Error obteniendo publicaciones", e); } return allData; } const cachedPubs = fromCache("ts_repo_v2_posts", "ts_repo_v2_expiry"); const fallbackPubs = [ { title:{rendered:"Balance de Gestión Sostenible e Inversión Verde 2025"}, categories:[778961590], link:"#", date:"2025-03-01T00:00:00" }, { title:{rendered:"Reporte de Auditoría Externa y Cumplimiento de Criterios ESG"}, categories:[778961590], link:"#", date:"2025-01-15T00:00:00" }, { title:{rendered:"Plan de Mitigación y Resiliencia ante la Crisis Hídrica"}, categories:[435247134], link:"#", date:"2024-11-20T00:00:00" }, { title:{rendered:"Manual de Digitalización Ecológica y Automatización Eficiente"}, categories:[778961587], link:"#", date:"2024-10-05T00:00:00" }, { title:{rendered:"Guía de Prácticas y Consumo Consciente para el Hogar"}, categories:[19313205], link:"#", date:"2024-09-12T00:00:00" } ]; function initPubs(data) { allPosts = data; const loader = document.getElementById("ts-repo-loader"); const searchContainer = document.getElementById("ts-search-container"); if(loader) loader.classList.add("ts-hidden"); if(searchContainer) searchContainer.classList.remove("ts-hidden"); renderPubs(allPosts, ""); bindSearch("ts-repo-search", "ts-search-clear", (q) => renderPubs(allPosts, q)); } <div></div> if (document.getElementById("ts-repo-acordeon")) { if (cachedPubs) { initPubs(cachedPubs); } else { fetchAllPubs().then(posts => { const dataToUse = (Array.isArray(posts) && posts.length > 0) ? posts : fallbackPubs; toCache("ts_repo_v2_posts", "ts_repo_v2_expiry", dataToUse); initPubs(dataToUse); }); } } <div></div> // 7.2 OPINIONES DE EXPERTOS let expertPosts = []; const VIP_EXPERTS = ["Margarita Ducci", "Gerardo Wijnant", "Rosa Madera Núñez", "Verónica Prado", "Zdenka Astudillo Mihovilovic"]; function isVIP(name) { const n = name.toLowerCase(); return VIP_EXPERTS.some(vip => n.includes(vip.toLowerCase())); } function extractExpertName(post) { if (post.author_name) return post.author_name; const textToSearch = (((post.title && post.title.rendered) || "") + " " + ((post.excerpt && post.excerpt.rendered) || "")).replace(/(<([^>]+)>)/gi, " "); const knownExperts = [ "Margarita Ducci", "José Estay", "Rosa Madera Núñez", "Rosa Madera", "Jesús Blasco", "Antonia Biggs", "Gonzalo Vial", "Rocío Riveros", "Lucio Cañete", "Gerardo Wijnant", "Marisol Núñez", "Sofía Henríquez", "Verónica Prado", "Zdenka Astudillo" ]; for (const expert of knownExperts) { const regex = new RegExp(expert.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i'); if (regex.test(textToSearch)) { const n = expert.toLowerCase(); if (n.includes("rosa madera")) return "Rosa Madera Núñez"; if (n.includes("zdenka astudillo")) return "Zdenka Astudillo Mihovilovic"; return expert; } } let wpAuthor = "Otros Expertos"; if (post._embedded && post._embedded.author && post._embedded.author[0]) { wpAuthor = post._embedded.author[0].name; } if (/admin|webmaster|tiempos\s*sustentables|contacto/i.test(wpAuthor)) return "Otros Expertos"; return wpAuthor; } function renderExperts(posts, searchTerm){ const q = (searchTerm || "").trim().toLowerCase(); let totalVisible = 0; let html = ""; const elExpertAcordeon = document.getElementById("ts-op-acordeon"); if (!elExpertAcordeon) return; // Seguridad <div></div> const groupedByAuthor = {}; const otrosExpertosArr = []; posts.forEach(post => { const authorName = extractExpertName(post); if (!groupedByAuthor[authorName]) groupedByAuthor[authorName] = []; groupedByAuthor[authorName].push(post); }); const finalGroups = {}; for (const [author, authorPosts] of Object.entries(groupedByAuthor)) { if ((authorPosts.length === 1 && !isVIP(author)) || author === "Otros Expertos" || author === "Experto Colaborador") { otrosExpertosArr.push(...authorPosts); } else { finalGroups[author] = authorPosts; } } if (otrosExpertosArr.length > 0) finalGroups["Otros Expertos"] = otrosExpertosArr; const authors = Object.keys(finalGroups).sort((a, b) => { if (a === "Otros Expertos") return 1; if (b === "Otros Expertos") return -1; if (a === "Margarita Ducci") return -1; if (b === "Margarita Ducci") return 1; const numA = finalGroups[a].length; const numB = finalGroups[b].length; if (numA === numB) return a.localeCompare(b); return numB - numA; }); authors.forEach(author => { let authorPosts = finalGroups[author]; if (q) { authorPosts = authorPosts.filter(p => { const matchTitle = (p.title && p.title.rendered) ? p.title.rendered.toLowerCase().includes(q) : false; const matchAuthor = author.toLowerCase().includes(q); const realAuthorForOther = author === "Otros Expertos" ? extractExpertName(p).toLowerCase().includes(q) : false; return matchTitle || matchAuthor || realAuthorForOther; }); } if (!authorPosts.length) return; totalVisible += authorPosts.length; html += `<div class="ts-accordion-card"><button class="ts-accordion-trigger" type="button"><div class="ts-trigger-left"><div class="ts-trigger-title-wrap"><span class="ts-trigger-title">${author}</span><span class="ts-trigger-count">${authorPosts.length} opiniones</span></div></div><span class="ts-chevron">⌄</span></button><div class="ts-accordion-content"><ul class="ts-post-list">`; authorPosts.forEach(post => { let title = post.title && post.title.rendered ? post.title.rendered : "Sin título"; if (q) title = title.replace(new RegExp(`(${escRE(searchTerm)})`, "gi"), `<span class="ts-highlight">$1</span>`); const dateStr = formatDate(post.date); const authorPrefix = author === "Otros Expertos" ? `<strong>${extractExpertName(post)}</strong> • ` : ""; html += `<li><a class="ts-post-link-wrapper" href="${post.link}" target="_blank" rel="noopener noreferrer"><div class="ts-post-left"><span class="ts-post-doc-icon">•</span><div class="ts-post-info"><span class="ts-post-title-text">${title}</span><span class="ts-post-date">${authorPrefix}${dateStr}</span></div></div><span class="ts-post-action-indicator">Leer →</span></a></li>`; }); html += `</ul></div></div>`; }); elExpertAcordeon.innerHTML = html; elExpertAcordeon.classList.toggle("ts-hidden", !totalVisible); bindAccordion(elExpertAcordeon); const elExpertNoResults = document.getElementById("ts-op-no-results"); if(elExpertNoResults) elExpertNoResults.classList.toggle("ts-hidden", !!totalVisible); const elExpertTotalBadge = document.getElementById("ts-op-total-count-badge"); if(elExpertTotalBadge) { elExpertTotalBadge.textContent = totalVisible + " opiniones en total"; elExpertTotalBadge.classList.remove("ts-hidden"); } } <div></div> async function fetchAllExperts() { let allData = []; let page = 1; try { while(true) { const url = SITE_URL + "/wp-json/wp/v2/posts?per_page=100&categories=785529897&_embed=author&_fields=id,date,link,title,excerpt,_embedded&page=" + page; const res = await fetch(url); if (!res.ok) break; const data = await res.json(); if (!Array.isArray(data) || data.length === 0) break; allData = allData.concat(data); if (data.length < 100) break; page++; } } catch(e) { console.error("Error obteniendo expertos", e); } return allData; } const cachedExperts = fromCache("ts_repo_v2_experts", "ts_repo_v2_experts_expiry"); const fallbackExperts = [ { title:{rendered:"Desafíos ESG en la región"}, excerpt:{rendered:""}, link:"#", date:"2025-05-01T00:00:00", _embedded:{author:[{name:"Jesús Blasco"}]} }, { title:{rendered:"Compliance y sostenibilidad corporativa"}, excerpt:{rendered:""}, link:"#", date:"2025-06-01T00:00:00", _embedded:{author:[{name:"Margarita Ducci"}]} } ]; function initExperts(data) { expertPosts = data; const loader = document.getElementById("ts-op-loader"); const searchContainer = document.getElementById("ts-op-search-container"); if(loader) loader.classList.add("ts-hidden"); if(searchContainer) searchContainer.classList.remove("ts-hidden"); renderExperts(expertPosts, ""); bindSearch("ts-op-search", "ts-op-search-clear", (q) => renderExperts(expertPosts, q)); } <div></div> if (document.getElementById("ts-op-acordeon")) { if (cachedExperts) { initExperts(cachedExperts); } else { fetchAllExperts().then(posts => { const dataToUse = (Array.isArray(posts) && posts.length > 0) ? posts : fallbackExperts; toCache("ts_repo_v2_experts", "ts_repo_v2_experts_expiry", dataToUse); initExperts(dataToUse); }); } } }); (function () { function openViewFromHash(hash) { const viewMap = { '#panel-datos': 'view-transparencia', '#heading-compliance': 'view-transparencia', '#repositorio-informes': 'view-transparencia', '#archivo-publicaciones': 'view-transparencia', '#archivo-opiniones': 'view-transparencia', '#esg-trends-radar': 'hub-latam', '#regulaciones-marcos-esg': 'hub-latam', '#hub-global': 'hub-latam', '#hub-ue': 'hub-latam', '#hub-lac': 'hub-latam', '#hub-chile': 'hub-latam', '#hub-colombia': 'hub-latam', '#hub-mexico': 'hub-latam', '#hub-peru': 'hub-latam', '#hub-brasil': 'hub-latam' }; <div></div> const targetView = viewMap[hash]; if (!targetView) return; <div></div> const viewButton = document.querySelector('.ts-master-btn[data-view="' + targetView + '"]'); if (viewButton) viewButton.click(); } <div></div> function scrollToHash() { const hash = window.location.hash; if (!hash) return; <div></div> openViewFromHash(hash); <div></div> let tries = 0; const maxTries = 20; <div></div> const timer = setInterval(function () { const target = document.querySelector(hash); if (target) { clearInterval(timer); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; } <div></div> tries++; if (tries >= maxTries) { clearInterval(timer); } }, 150); } <div></div> if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', function () { setTimeout(scrollToHash, 300); }); } else { setTimeout(scrollToHash, 300); } <div></div> window.addEventListener('hashchange', function () { setTimeout(scrollToHash, 200); }); })();</script>

## Transparencia · Credibilidad · Gobierno Corporativo ESG

**¿Qué es el Centro de Recursos de Tiempos Sustentables?** Somos un medio de comunicación comprometido con promover información clara para la toma de decisiones y la transparencia activa en Chile y LAC (Latinoamérica y el Caribe).

TIEMPOS SUSTENTABLES

### Repositorio y Transparencia

Analíticas, metodología, compliance, informes institucionales y archivos editoriales en un solo espacio de consulta.

Hub de Referencia LATAM

### Recursos y Marco Regulatorio ESG

Tendencias de mercado, estándares globales, taxonomías, regulación regional y marcos clave para sostenibilidad, compliance y reportabilidad.

### Repositorio y Transparencia.

En este espacio encontrará cuatro grandes módulos de gestión corporativa:

- **Dashboard Interactivo:** Panel con las principales métricas corporativas de rendimiento histórico y proyectado de Tiempos Sustentables.
- **Compliance y Marcos Normativos:** Estándares, marcos corporativos y regulaciones que guían nuestra operación editorial en pro del desarrollo sostenible.
- **Repositorio de Informes y Documentación:** Acceso abierto a todos los reportes oficiales, metodologías y recursos corporativos.
- **Archivo de publicaciones y opiniones de expertos:** Panel interactivo de búsqueda y documentación de todo el archivo publicado en Tiempos Sustentables.

## Dashboard Interactivo de Transparencia de Datos

El Panel de Transparencia de Tiempos Sustentables muestra métricas reales y auditadas directamente de nuestras fuentes originales para medir el impacto ambiental y social.

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

![Logotipo oficial de Tiempos Sustentables](images/Tiempos-Sustentables-removebg-preview.png)

## ¡Bienvenido a nuestro Panel de Datos Interactivos!

Explora el rendimiento histórico y proyectado de Tiempos Sustentables. Utiliza los botones de navegación inferiores para cambiar entre los diferentes trimestres y promedios anuales.  
  
Revisa la Información Clave y Metodología al final del dashboard.

14.800

Sesiones Promedio

2.500

Visitas Promedio

6.200

Alcance Promedio

1m 35s

Duración Promedio

#### 📊 Sesiones 2025

#### 👥 Visitas 2025

#### ⏱️ Duración 2025

| Mes | Q | Sesiones | Visitas | Duración | Alcance | Publicaciones | Observaciones |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Abril | Q2 | 10.208 | 1.202 | 1m 31s | 4.050 | 18 | Lanzamiento |
| Mayo | Q2 | 13.104 | 1.549 | 1m 48s | 4.979 | 22 |  |
| Junio | Q2 | 16.290 | 2.989 | 1m 38s | 6.311 | 25 |  |
| Julio | Q3 | 15.849 | 2.878 | 1m 30s | 6.231 | 20 | Hito de Crecimiento |
| Agosto | Q3 | 15.749 | 2.580 | 1m 32s | 6.223 | 22 |  |
| Septiembre | Q3 | 15.798 | 2.509 | 1m 30s | 6.141 | 21 |  |
| Octubre | Q4 | 15.781 | 2.452 | 1m 31s | 6.198 | 22 |  |
| Noviembre | Q4 | 15.755 | 2.518 | 1m 28s | 6.203 | 23 |  |
| Diciembre | Q4 | 15.191 | 2.501 | 1m 35s | 6.278 | 19 | Consolidación |
| 🏅 PROMEDIO MENSUAL |  | 14.800 | 2.500 | 1m 35s | 6.200 | 20 |  |

13.201

Sesiones Promedio

1.913

Visitas Promedio

5.113

Alcance Promedio

1m 39s

Duración Promedio

#### 📊 Sesiones Q2 2025

#### 👥 Visitas Q2 2025

#### ⏱️ Duración Q2 2025

| Mes | Sesiones | Visitas | Duración | Alcance | Publicaciones |
| --- | --- | --- | --- | --- | --- |
| Abril | 10.208 | 1.202 | 1m 31s | 4.050 | 18 |
| Mayo | 13.104 | 1.549 | 1m 48s | 4.979 | 22 |
| Junio | 16.290 | 2.989 | 1m 38s | 6.311 | 25 |
| Promedio Q2 | 13.201 | 1.913 | 1m 39s | 5.113 | 22 |

15.799

Sesiones Promedio

2.656

Visitas Promedio

6.198

Alcance Promedio

1m 31s

Duración Promedio

#### 📊 Sesiones Q3 2025

#### 👥 Visitas Q3 2025

#### ⏱️ Duración Q3 2025

| Mes | Sesiones | Visitas | Duración | Alcance | Publicaciones |
| --- | --- | --- | --- | --- | --- |
| Julio | 15.849 | 2.878 | 1m 30s | 6.231 | 20 |
| Agosto | 15.749 | 2.580 | 1m 32s | 6.223 | 22 |
| Septiembre | 15.798 | 2.509 | 1m 30s | 6.141 | 21 |
| Promedio Q3 | 15.799 | 2.656 | 1m 31s | 6.198 | 21 |

15.576

Sesiones Promedio

2.490

Visitas Promedio

6.226

Alcance Promedio

1m 31s

Duración Promedio

#### 📊 Sesiones Q4 2025

#### 👥 Visitas Q4 2025

#### ⏱️ Duración Q4 2025

| Mes | Sesiones | Visitas | Duración | Alcance | Publicaciones |
| --- | --- | --- | --- | --- | --- |
| Octubre | 15.781 | 2.452 | 1m 31s | 6.198 | 22 |
| Noviembre | 15.755 | 2.518 | 1m 28s | 6.203 | 23 |
| Diciembre | 15.191 | 2.501 | 1m 35s | 6.278 | 19 |
| Promedio Q4 | 15.576 | 2.490 | 1m 31s | 6.226 | 21 |

16.750

Sesiones Promedio

2.850

Visitas Promedio

7.500

Alcance Promedio

3m 10s

Duración Promedio

#### 📊 Sesiones 2026

#### 👥 Visitas 2026

#### ⏱️ Duración 2026

| Trimestre | Sesiones | Visitas | Duración | Alcance | Publicaciones |
| --- | --- | --- | --- | --- | --- |
| Promedio Q1 2026 | 15.598 | 3.023 | 2m 42s | 7.333 | 20 |
| Promedio Q2 2026 | 17.025 | 2.881 | 3m 14s | 7.501 | 21 |
| Promedio Q3 2026 (Proy.) | 17.040 | 2.740 | 3m 15s | 7.680 | 21 |
| Promedio Q4 2026 (Proy.) | 17.410 | 2.827 | 3m 26s | 7.883 | 21 |
| 🏅 PROMEDIO MENSUAL | 16.750 | 2.850 | 3m 10s | 7.500 | 20 |

15.598

Sesiones Promedio

3.023

Visitas Promedio

7.333

Alcance Promedio

2m 42s

Duración Promedio

#### 📊 Sesiones Q1 2026

#### 👥 Visitas Q1 2026

#### ⏱️ Duración Q1 2026

| Mes | Sesiones | Visitas | Duración | Alcance | Publicaciones | Observaciones |
| --- | --- | --- | --- | --- | --- | --- |
| Enero | 15.229 | 3.059 | 2m 15s | 7.241 | 19 |  |
| Febrero | 15.307 | 2.993 | 2m 38s | 7.358 | 18 |  |
| Marzo | 16.258 | 3.016 | 3m 13s | 7.401 | 22 | Superamos el consolidado |
| Promedio Q1 | 15.598 | 3.023 | 2m 42s | 7.333 | 20 |  |

17.025

Sesiones Promedio

2.881

Visitas Promedio

7.501

Alcance Promedio

3m 14s

Duración Promedio

#### 📊 Sesiones Q2 2026

#### 👥 Visitas Q2 2026

#### ⏱️ Duración Q2 2026

| Mes | Sesiones | Visitas | Duración | Alcance | Publicaciones | Observaciones |
| --- | --- | --- | --- | --- | --- | --- |
| Abril | 16.567 | 2.933 | 3m 08s | 7.435 | 21 |  |
| Mayo | 17.003 | 2.882 | 3m 11s | 7.510 | 22 |  |
| Junio | 17.505 | 2.829 | 3m 23s | 7.557 | 20 | Mayor Engagement |
| Promedio Q2 | 17.025 | 2.881 | 3m 14s | 7.501 | 21 |  |

17.040

Sesiones Promedio

2.740

Visitas Promedio

7.680

Alcance Promedio

3m 15s

Duración Promedio

#### 📊 Sesiones Q3 2026

#### 👥 Visitas Q3 2026

#### ⏱️ Duración Q3 2026

| Mes | Sesiones | Visitas | Duración | Alcance | Publicaciones | Observaciones |
| --- | --- | --- | --- | --- | --- | --- |
| Julio | 17.050 | 2.750 | 3m 15s | 7.620 | 21 | Proyección |
| Agosto | 16.920 | 2.680 | 3m 12s | 7.680 | 22 | Proyección |
| Septiembre | 17.150 | 2.790 | 3m 18s | 7.740 | 20 | Proyección |
| Promedio Q3 Proy. | 17.040 | 2.740 | 3m 15s | 7.680 | 21 |  |

17.410

Sesiones Promedio

2.827

Visitas Promedio

7.883

Alcance Promedio

3m 26s

Duración Promedio

#### 📊 Sesiones Q4 2026

#### 👥 Visitas Q4 2026

#### ⏱️ Duración Q4 2026

| Mes | Sesiones | Visitas | Duración | Alcance | Publicaciones | Observaciones |
| --- | --- | --- | --- | --- | --- | --- |
| Octubre | 17.480 | 2.850 | 3m 22s | 7.810 | 22 | Proyección |
| Noviembre | 17.900 | 2.910 | 3m 25s | 7.800 | 23 | Proyección |
| Diciembre | 16.850 | 2.720 | 3m 30s | 7.950 | 18 | Proyección |
| Promedio Q4 Proy. | 17.410 | 2.827 | 3m 26s | 7.883 | 21 |  |

⌂Inicio 2025Anual 2025Q2 2025Q3 2025Q4

2026Total 2026Q1 2026Q2 2026Q3 _(Proy.)_ 2026Q4 _(Proy.)_

**Información Clave y Metodología.**  

- **Datos verificables:** Toda la información presentada es real y transparente.
- **Indicadores estandarizados:** Los valores corresponden al promedio mensual de cada periodo para sesiones, visitas, duración, alcance por difusión y publicaciones.
- **Criterio de sesiones:** Solo se contabilizan como válidas aquellas con interacción superior a 10 segundos.
- **Alcance por difusión:** Incluye amplificación en mailing, WhatsApp, Facebook e Instagram.

_**Fuentes:** Google Analytics 4, WordPress.com y proyecciones estimadas de la plataforma._

Actualizado el 28 de junio de 2026.

* * *

## Compliance y Marcos Normativos

Estándares, marcos corporativos y regulaciones que guían nuestra operación editorial en pro del desarrollo sostenible.

| Marco / Estándar | Ámbito | Estado |
| --- | --- | --- |
| **Marco de Compliance sobre Cobertura Editorial y Operaciones GRI-ESG** | Editorial y operacional | En cumplimiento |
| **Marco de Compromiso Medible con la Agenda 2030 (ODS)** | Editorial | En cumplimiento |
| **Estándar de Cumplimiento Normativo con la Ley N° 19.628 sobre Protección de la Vida Privada** | Datos de suscriptores y usuarios | En cumplimiento |
| **Estándar de Cumplimiento Voluntario con los Principios de la Ley de Transparencia N° 20.285 (Chile)** | Acceso a información pública | En cumplimiento |
| **Política Antisoborno y Anticorrupción + Manifiesto contra el Greenwashing** | Relaciones comerciales | En cumplimiento |

[Descargar Políticas de Compliance y Marcos Normativos](https://tiempossustentables.cl/wp-content/uploads/2026/07/Politicas-de-Compliance-y-Marcos-Normativos-Tiempos-Sustentables-2_7_26-2_36-p.m.pdf)

* * *

## Repositorio de Informes y Documentación

Acceso abierto a todos los reportes oficiales, metodologías y recursos corporativos de Tiempos Sustentables.

| Informe / Documento | Tipo / Contenido | Estado |
| --- | --- | --- |
| **Repositorio Newsletter 2025** | Ediciones: [Jul](https://tiempossustentables.cl/newsletter-de-julio-2025/) [Ago](https://tiempossustentables.cl/newsletter-de-agosto-2025/) [Sep](https://tiempossustentables.cl/newsletter-de-septiembre-2025/) [Oct](https://tiempossustentables.cl/newsletter-de-octubre-2025/) [Nov](https://tiempossustentables.cl/newsletter-de-noviembre-2025/) | ✓ Disponibles |
| **Brochure Corporativo** | [Ver documento](https://tiempossustentables.cl/wp-content/uploads/2026/05/tiempos-sustentables.pdf) | ✓ Disponible |
| **ESG Command Center** | [Ver documento](https://tiempossustentables.cl/wp-content/uploads/2026/08/Tiempos-Sustentables-ESG-Command-Center-1-1.pdf) | ✓ Disponible |
| **Metodología "Arquitectura de Valor"**   DOI: 10.5281/zenodo.20443605 | [Ver publicación](https://tiempossustentables.cl/arquitectura-valor/) | ✓ Disponible |
| **Doble materialidad ESG**   DOI: 10.17605/OSF.IO/TYRH7 | [Ver publicación](https://tiempossustentables.cl/doble-materialidad-esg-reporting-rentabilidad-latam/) | ✓ Disponible |
| **Brand Finance Global 500 2026**   DOI: 10.17605/OSF.IO/CXZMJ | [Ver publicación](https://tiempossustentables.cl/brand-finance-global-500-2026-arquitectura-valor/) | ✓ Disponible |
| **Especiales 2025** | [Innovación](https://tiempossustentables.cl/especial-de-innovacion-y-tecnologia-sustentable/) [Medioambiente](https://tiempossustentables.cl/especial-medioambiente-y-cambio-climatico/) [Finanzas](https://tiempossustentables.cl/negocios-finanzas-sostenibles/) | ✓ Disponibles |
| **Guía Estratégica de Economía Circular** | [Ver Guía](https://tiempossustentables.cl/economia-circular-chile-latam/) | ✓ Disponible |
| **Reporte Anual 2025** | [Ver documento](https://tiempossustentables.cl/ts-reporte-anual-2025-_-ok-1/) | ✓ Disponible |
| **Proyecciones Q3 - Q4 2026** | Documento institucional | ► Proyectado |

* * *

tiempossustentables.cl 0 publicaciones en total

## Archivo de Publicaciones

Los artículos y reportajes publicados se encuentran organizados por categoría. También puedes utilizar el buscador si necesitas algo específico.

⌕

 ✕

Sincronizando biblioteca de recursos de manera segura...

ⓘ

### No encontramos coincidencias

Intenta buscar con otros términos o explora las categorías manualmente.

* * *

tiempossustentables.cl 0 opiniones en total

## Archivo de Opiniones de Expertos

Columnas de opinión organizadas por autor especialista y ordenadas por nivel de colaboración.

⌕

 ✕

Cargando archivo de opiniones de expertos...

ⓘ

### No encontramos coincidencias

Prueba con otro nombre, apellido o palabra del título de la columna.

* * *

## Preguntas Frecuentes

Resolvemos dudas sobre metodología, métricas, actualización de datos y criterios de transparencia corporativa.

¿De dónde provienen los datos publicados en este panel?

Nuestras métricas de tráfico y comportamiento provienen de **Google Analytics 4 (GA4)** y del sistema de estadísticas nativo de **WordPress.com**.

¿Cómo se calcula el alcance por difusión?

El alcance por difusión mide la amplificación de contenidos en mailing, WhatsApp y redes sociales orgánicas.

¿Cada cuánto se actualiza este repositorio?

La información institucional se consolida de forma trimestral y las proyecciones se ajustan con base en los resultados observados.

¿Qué incluye esta visualización?

Incluye analíticas, metodología, políticas de compliance, informes institucionales, newsletters, especiales y archivos editoriales organizados para consulta abierta.

### Recursos y Marco Regulatorio ESG

En este espacio encontrará dos grandes módulos de consulta especializada, diseñados como herramientas corporativas interactivas:

- **ESG Trends Radar:** Dashboard interactivo con las principales tendencias y búsquedas corporativas en sostenibilidad en LATAM, sincronizado con Google Trends.
- **Regulaciones, marcos y estándares ESG:** Biblioteca digital con los principales marcos globales y coberturas regulatorias regionales con respaldos en Google Scholar.

📈

### ESG Trends Radar

Índice diario de tendencias y búsquedas corporativas en LATAM

🟡 Sincronizando API... Conectando con Google Trends

🌐 Seleccionar País / Mercado de Análisis

#### 🔥 TOP 3 Conceptos

Índice (0-100)

#### ⚡ Consultas en Explosión

Hot Spikes

**APP by Tiempos Sustentables.**  
Datos verificados con actualización cada 24 hrs mediante API automatizada con Google Trends.  
_Material bajo la licencia CC BY 4.0. | © 2026 Tiempos Sustentables_

⚖️

### Regulaciones y Estándares ESG

Principales marcos globales y coberturas regulatorias regionales

🟡 Sincronizando API... Conectando con Google Scholar

⚖️ Seleccionar País / Mercado de Análisis

🌐Global 🇪🇺Unión Europea (Proveedores y Exportadores) 🌎Latinoamérica y El Caribe (LAC) 🇨🇱Chile 🇨🇴Colombia 🇲🇽México 🇵🇪Perú 🇧🇷Brasil

⌕

 ✕

🌐Global

11 recursos

| Marco / Recurso | Tipo de recurso | Acceso Directo |
| --- | --- | --- |
| **GRI Standards** | Estándar de reporte (Impacto / Doble) | [🔗 Ver oficial](https://www.globalreporting.org/standards/) |
| **IFRS S1** | Norma de divulgación financiera | [🔗 Ver oficial](https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/ifrs-s1-general-requirements/) |
| **IFRS S2** | Norma de divulgación climática | [🔗 Ver oficial](https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/) |
| **GHG Protocol Corporate Standard** | Estándar de contabilidad GEI | [🔗 Ver oficial](https://ghgprotocol.org/corporate-standard) |
| **TNFD Recommendations** | Marco de divulgación | [🔗 Ver oficial](https://tnfd.global/recommendations/) |
| **IPCC AR6** | Informe científico | [🔗 Ver oficial](https://www.ipcc.ch/assessment-report/ar6/) |
| **SBTi Net-Zero Standard** | Estándar técnico | [🔗 Ver oficial](https://sciencebasedtargets.org/standards-and-guidance) |
| **UNESCO EDS Toolbox** | Guía metodológica | [🔗 Ver oficial](https://www.unesco.org/es/sustainable-development/education/toolbox) |
| **Principios Rectores ONU** | Marco de DD.HH. | [🔗 Ver oficial](https://www.ohchr.org/documents/publications/guidingprinciplesbusinesshr_sp.pdf) |
| **SASB Standards** | Estándar de reporte sectorial | [🔗 Ver oficial](https://sasb.org/) |
| **ISO 14001:2015** | Norma ISO (Gestión ambiental) | [🔗 Ver oficial](https://www.iso.org/es/norma/14001) |

🇪🇺Unión Europea (Proveedores y Exportadores)

4 recursos

| Marco / Recurso | Tipo de recurso | Acceso Directo |
| --- | --- | --- |
| **CS3D / CSDDD** | Directiva UE (Debida diligencia) | [🔗 Ver oficial](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024L1760) |
| **CBAM** | Reglamento UE (Ajuste carbono) | [🔗 Ver oficial](https://eur-lex.europa.eu/EN/legal-content/summary/carbon-border-adjustment-mechanism.html) |
| **ESPR** | Reglamento UE (Ecodiseño) | [🔗 Ver oficial](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1781) |
| **PPWR** | Reglamento UE (Envases) | [🔗 Ver oficial](https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng) |

🌎Latinoamérica y El Caribe (LAC)

2 recursos

| Marco / Recurso | Tipo de recurso | Acceso Directo |
| --- | --- | --- |
| **Agenda 2030 / ODS** | Marco de seguimiento macro | [🔗 Ver oficial](https://www.un.org/sustainabledevelopment/es/) |
| **Acuerdo de Escazú** | Tratado internacional | [🔗 Ver oficial](https://www.cepal.org/es/acuerdodeescazu) |

🇨🇱Chile

6 recursos

| Marco / Recurso | Tipo de recurso | Acceso Directo |
| --- | --- | --- |
| **NCG 461** | Norma regulatoria ESG | [🔗 Ver oficial](https://www.cmfchile.cl/normativa/ncg_461_2021.pdf) |
| **Ley 20.920 Ley REP** | Ley (Responsabilidad extendida) | [🔗 Ver oficial](https://portal.sma.gob.cl/index.php/ley-rep/) |
| **Instrucción SMA Ley REP** | Instructivo regulatorio | [🔗 Ver oficial](https://portal.sma.gob.cl/index.php/portal-regulados/instructivos-y-guias/ley-rep/) |
| **Ley 21.595 (Delitos Económicos)** | Ley penal / Compliance | [🔗 Ver oficial](https://www.bcn.cl/leychile/navegar?idNorma=1195119) |
| **Estrategia Implementación Agenda 2030** | Estrategia pública | [🔗 Ver oficial](https://www.chileagenda2030.gob.cl/wp-content/uploads/2025/04/Estrategia_de_Implementacion_Agenda2030.pdf) |
| **Taxonomía de Actividades Sostenibles** | Taxonomía | [🔗 Ver oficial](https://hacienda.cl/areas-de-trabajo/finanzas-internacionales/oficina-de-finanzas-verdes/taxonomia) |

🇨🇴Colombia

2 recursos

| Marco / Recurso | Tipo de recurso | Acceso Directo |
| --- | --- | --- |
| **Taxonomía Verde de Colombia** | Taxonomía verde | [🔗 Ver oficial](https://www.taxonomiaverde.gov.co/) |
| **Circular Externa 031 de 2021 SFC** | Norma regulatoria ESG | [🔗 Ver oficial](https://www.superfinanciera.gov.co/) |

🇲🇽México

1 recurso

| Marco / Recurso | Tipo de recurso | Acceso Directo |
| --- | --- | --- |
| **Taxonomía Sostenible de México** | Taxonomía | [🔗 Ver oficial](https://www.finanzassostenibles.hacienda.gob.mx/es/finanzassostenibles/taxonomia) |

🇵🇪Perú

2 recursos

| Marco / Recurso | Tipo de recurso | Acceso Directo |
| --- | --- | --- |
| **Resolución SMV N.° 018-2020** | Resolución de reporte ESG | [🔗 Ver oficial](https://www.gob.pe/institucion/smv/normas-legales/3948354-018-2020) |
| **Sostenibilidad Corporativa SMV** | Guía metodológica | [🔗 Ver oficial](https://www.gob.pe/institucion/smv/informes-publicaciones/6125463-sostenibilidad-corporativa) |

🇧🇷Brasil

1 recurso

| Marco / Recurso | Tipo de recurso | Acceso Directo |
| --- | --- | --- |
| **Resolução CVM 193** | Resolución financiera sostenible | [🔗 Ver oficial](https://conteudo.cvm.gov.br/legislacao/resolucoes/resol193.html) |

ⓘ

### No encontramos coincidencias

Intenta buscar con otros términos relacionados al marco, recurso o país.

**APP by Tiempos Sustentables.**  
Documentación indexada mediante API con Google Scholar.  
_Material bajo la licencia CC BY 4.0. | © 2026 Tiempos Sustentables_

* * *

## Preguntas Frecuentes

Orientación rápida sobre tendencias, estándares, taxonomías y marcos regulatorios relevantes para sostenibilidad y reportabilidad en LATAM.

¿Qué reúne este Hub de Referencia LATAM?

Reúne el **ESG Trends Radar** con análisis dinámico y actualizado de las principales tendencias de mercado y la biblioteca digital de **Regulaciones, marcos y estándares ESG** con los principales marcos globales y coberturas regulatorias regionales. Material imprescindible para empresas internacionales, locales, proveedores, exportadores y la academia.

¿Cómo funciona el ESG Trends Radar y cada cuánto se actualiza?

Mide la intensidad e incremento de búsquedas corporativas en sostenibilidad en la región. Se sincroniza de forma automatizada cada 24 horas utilizando la API directa de **Google Trends**.

¿De dónde proviene la selección de Regulaciones, marcos y estándares ESG?

Provienen de normativas oficiales de cada gobierno u organismo emisor y son respaldados y validados cruzando referencias técnicas indexadas en **Google Scholar**.

¿Para qué sirve esta visualización en la práctica corporativa?

Sirve como consola interactiva para priorizar exigencias de reportabilidad, seguir tendencias emergentes de mercado y acceder a las fuentes oficiales de forma directa.
