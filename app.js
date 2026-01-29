/**
 * ⚔️ Habit Battle Arena v1.0
 * © 2024 Hamza - Tous droits réservés
 * 
 * Usage personnel autorisé.
 * Redistribution commerciale interdite sans permission écrite.
 * Unauthorized copying, distribution or commercial use prohibited.
 * 
 * Contact: boudourhamza7@gmail.com
 */

// Habit Battle Arena - Main App Logic
// =====================================

// Global State
const state = {
    language: 'fr',
    heroHabits: [],
    villainHabits: [],
    army: [],
    stats: {
        totalBattles: 0,
        totalWins: 0,
        currentStreak: 0,
        bestStreak: 0
    },
    lastBattleDate: null,
    currentPage: 'arena',
    userId: null
};

// Translations
const translations = {
    fr: {
        goodHabits: 'BONNES HABITUDES',
        badHabits: 'MAUVAISES HABITUDES',
        budget: 'Budget:',
        power: 'Force:',
        addHabit: 'Ajouter habitude',
        arena: 'Arène',
        army: 'Armée',
        stats: 'Stats',
        victory: 'VICTOIRE !',
        defeat: 'DÉFAITE...',
        victoryMsg: 'Ton héros rejoint ton armée !',
        defeatMsg: 'Le démon était trop fort aujourd\'hui...',
        continue: 'Continuer',
        budgetFull: 'Budget complet (20 pts)',
        budgetError: 'Tu dois avoir exactement 20 pts de chaque côté',
        habitName: 'Nom de l\'habitude:',
        points: 'Points (1-5):',
        add: 'Ajouter',
        addHabitTitle: 'Ajouter une habitude',
        myArmy: 'MON ARMÉE',
        statistics: 'STATISTIQUES',
        totalBattles: 'Combats totaux',
        victories: 'Victoires',
        winRate: 'Taux de victoire',
        currentStreak: 'Série actuelle',
        armyEmpty: 'Gagne ton premier combat pour commencer ton armée !',
        battleIn: 'Combat dans:',
        settings: 'PARAMÈTRES',
        language: 'Langue',
        about: 'À propos',
        comingSoon: 'Prochainement',
        comingSoonFeatures: '• Combats entre amis\n• Ligues mondiales\n• Guerres d\'armées mensuelles'
    },
    en: {
        goodHabits: 'GOOD HABITS',
        badHabits: 'BAD HABITS',
        budget: 'Budget:',
        power: 'Power:',
        addHabit: 'Add habit',
        arena: 'Arena',
        army: 'Army',
        stats: 'Stats',
        victory: 'VICTORY!',
        defeat: 'DEFEAT...',
        victoryMsg: 'Your hero joins your army!',
        defeatMsg: 'The demon was too strong today...',
        continue: 'Continue',
        budgetFull: 'Budget full (20 pts)',
        budgetError: 'You must have exactly 20 pts on each side',
        habitName: 'Habit name:',
        points: 'Points (1-5):',
        add: 'Add',
        addHabitTitle: 'Add a habit',
        myArmy: 'MY ARMY',
        statistics: 'STATISTICS',
        totalBattles: 'Total battles',
        victories: 'Victories',
        winRate: 'Win rate',
        currentStreak: 'Current streak',
        armyEmpty: 'Win your first battle to start your army!',
        battleIn: 'Battle in:',
        settings: 'SETTINGS',
        language: 'Language',
        about: 'About',
        comingSoon: 'Coming Soon',
        comingSoonFeatures: '• Friend battles\n• World leagues\n• Monthly army wars'
    }
};

// Weapons and Powers (pour les assets PNG)
const weapons = ['sword', 'hammer', 'spear', 'axe', 'bow', 'staff'];
const powers = ['fire', 'lightning', 'ice', 'wind', 'shadow', 'light'];

// ==========================================
// DICEBEAR AVATAR GENERATION
// ==========================================

function initializeUserId() {
    if (!state.userId) {
        state.userId = localStorage.getItem('habitBattleUserId');
        if (!state.userId) {
            state.userId = 'user-' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('habitBattleUserId', state.userId);
        }
    }
    state.userId = state.userId || 'default';
}

function getDailySeed() {
    return new Date().toDateString();
}

function generateAvatarUrl(type) {
    initializeUserId();
    const dailySeed = getDailySeed();
    const seed = `${dailySeed}-${type}-${state.userId}`;
    const bgColor = type === 'hero' ? 'ff8c00' : 'dc143c';
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=${bgColor}&size=180`;
}

function loadDailyAvatars() {
    console.log('🎨 Loading daily avatars...');
    
    const heroAvatar = document.getElementById('heroAvatar');
    const villainAvatar = document.getElementById('villainAvatar');
    
    if (!heroAvatar || !villainAvatar) {
        console.error('❌ Avatar elements not found!');
        return;
    }
    
    const heroUrl = generateAvatarUrl('hero');
    const villainUrl = generateAvatarUrl('villain');
    
    console.log('🦸 Hero URL:', heroUrl);
    console.log('👹 Villain URL:', villainUrl);
    
    heroAvatar.src = heroUrl;
    heroAvatar.onerror = () => {
        console.error('❌ Failed to load hero avatar');
    };
    heroAvatar.onload = () => {
        console.log('✅ Hero avatar loaded!');
    };
    
    villainAvatar.src = villainUrl;
    villainAvatar.onerror = () => {
        console.error('❌ Failed to load villain avatar');
    };
    villainAvatar.onload = () => {
        console.log('✅ Villain avatar loaded!');
    };
}

function updateCharacterProgression(type, points) {
    const character = document.getElementById(type === 'hero' ? 'heroCharacter' : 'villainCharacter');
    if (!character) return;
    
    const powerLevel = Math.min(Math.floor(points / 5) * 5, 20);
    character.setAttribute('data-power', powerLevel);
    
    character.classList.add('transforming');
    setTimeout(() => character.classList.remove('transforming'), 600);
    
    // Arme à 10+ pts
    const weaponImg = document.getElementById(type === 'hero' ? 'heroWeaponImg' : 'villainWeaponImg');
    if (weaponImg) {
        if (points >= 10) {
            const weaponIndex = (state.userId + getDailySeed() + type).length % weapons.length;
            weaponImg.src = `assets/weapons/${weapons[weaponIndex]}.png`;
            weaponImg.style.display = 'block';
        } else {
            weaponImg.style.display = 'none';
        }
    }
    
    // Pouvoir à 15+ pts
    const powerImg = document.getElementById(type === 'hero' ? 'heroPowerImg' : 'villainPowerImg');
    if (powerImg) {
        if (points >= 15) {
            const powerIndex = (state.userId + getDailySeed() + type + 'power').length % powers.length;
            powerImg.src = `assets/powers/${powers[powerIndex]}.png`;
            powerImg.style.display = 'block';
        } else {
            powerImg.style.display = 'none';
        }
    }
    
    updateStatBar(type, points);
}

function updateStatBar(type, points) {
    const statBar = document.getElementById(type === 'hero' ? 'heroStatBar' : 'villainStatBar');
    if (!statBar) return;
    
    const percentage = Math.min((points / 20) * 100, 100);
    const styleId = `stat-${type}`;
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
    }
    styleEl.textContent = `#${statBar.id}::after { width: ${percentage}% !important; }`;
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Load saved data
    loadState();
    
    // Show loading screen, then language selector, then demo
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        
        if (!localStorage.getItem('hasSeenDemo')) {
            document.getElementById('languageSelector').classList.remove('hidden');
        } else {
            startApp();
        }
    }, 2500);
    
    // Language selector
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.language = btn.dataset.lang;
            saveState();
            updateLanguage();
            document.getElementById('languageSelector').classList.add('hidden');
            
            if (!localStorage.getItem('hasSeenDemo')) {
                showDemo();
            } else {
                startApp();
            }
        });
    });
    
    // Demo start button
    document.querySelector('.demo-start-btn').addEventListener('click', () => {
        localStorage.setItem('hasSeenDemo', 'true');
        document.getElementById('demoMode').classList.add('hidden');
        startApp();
    });
    
    // Add habit buttons
    document.getElementById('addHeroHabit').addEventListener('click', () => openHabitModal('hero'));
    document.getElementById('addVillainHabit').addEventListener('click', () => openHabitModal('villain'));
    
    // Habit form
    document.getElementById('habitForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addHabit();
    });
    
    // Close modals
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // Points slider
    document.getElementById('habitPoints').addEventListener('input', (e) => {
        document.getElementById('pointsValue').textContent = e.target.value;
    });
    
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showPage(btn.dataset.page);
        });
    });
    
    // Settings
    document.getElementById('settingsBtn').addEventListener('click', () => {
        document.getElementById('settingsModal').classList.remove('hidden');
    });
    
    document.getElementById('languageSelect').addEventListener('change', (e) => {
        state.language = e.target.value;
        saveState();
        updateLanguage();
    });
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Check for midnight battle
    checkMidnightBattle();
    setInterval(checkMidnightBattle, 60000); // Check every minute
});

// Show Demo
function showDemo() {
    document.getElementById('demoMode').classList.remove('hidden');
    updateLanguage();
}

// Start Main App
function startApp() {
    console.log('🚀 Starting app...');
    const mainApp = document.getElementById('mainApp');
    console.log('📱 Main app element:', mainApp);
    
    mainApp.classList.remove('hidden');
    console.log('✅ Main app visible');
    
    loadDailyAvatars(); // Charger les avatars uniques du jour
    updateLanguage();
    renderHabits();
    updateCharacters();
    updateStats();
    
    console.log('✅ App started successfully');
}

// Update Language
function updateLanguage() {
    const lang = state.language;
    const t = translations[lang];
    
    document.querySelectorAll('[data-fr]').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'BUTTON') {
            el.textContent = el.dataset[lang] || el.dataset.fr;
        } else {
            el.innerHTML = el.dataset[lang] || el.dataset.fr;
        }
    });
    
    document.getElementById('languageSelect').value = lang;
}

// Habit Modal
let currentHabitType = 'hero';

function openHabitModal(type) {
    currentHabitType = type;
    const budget = calculateBudget(type === 'hero' ? state.heroHabits : state.villainHabits);
    
    if (budget >= 20) {
        alert(translations[state.language].budgetFull);
        return;
    }
    
    document.getElementById('habitName').value = '';
    document.getElementById('habitPoints').value = 3;
    document.getElementById('pointsValue').textContent = '3';
    
    const modalTitle = type === 'hero' 
        ? translations[state.language].addHabitTitle 
        : translations[state.language].addHabitTitle;
    
    document.getElementById('modalTitle').textContent = modalTitle;
    document.getElementById('habitModal').classList.remove('hidden');
    
    // Focus input
    setTimeout(() => document.getElementById('habitName').focus(), 100);
}

function closeModal() {
    document.getElementById('habitModal').classList.add('hidden');
}

function addHabit() {
    const name = document.getElementById('habitName').value.trim();
    const points = parseInt(document.getElementById('habitPoints').value);
    
    if (!name) return;
    
    const habits = currentHabitType === 'hero' ? state.heroHabits : state.villainHabits;
    const currentBudget = calculateBudget(habits);
    
    if (currentBudget + points > 20) {
        alert(`${translations[state.language].budget} ${currentBudget}/20 - ${translations[state.language].budgetError}`);
        return;
    }
    
    const habit = {
        id: Date.now(),
        name,
        points,
        checked: false,
        streak: 0
    };
    
    if (currentHabitType === 'hero') {
        state.heroHabits.push(habit);
    } else {
        state.villainHabits.push(habit);
    }
    
    saveState();
    renderHabits();
    updateCharacters();
    closeModal();
    playSound('add');
}

function deleteHabit(id, type) {
    if (confirm('Supprimer cette habitude ?')) {
        if (type === 'hero') {
            state.heroHabits = state.heroHabits.filter(h => h.id !== id);
        } else {
            state.villainHabits = state.villainHabits.filter(h => h.id !== id);
        }
        
        saveState();
        renderHabits();
        updateCharacters();
        playSound('delete');
    }
}

function toggleHabit(id, type) {
    const habits = type === 'hero' ? state.heroHabits : state.villainHabits;
    const habit = habits.find(h => h.id === id);
    
    if (habit) {
        habit.checked = !habit.checked;
        saveState();
        renderHabits();
        updateCharacters();
        playSound('check');
    }
}

// Render Habits
function renderHabits() {
    renderHabitList('hero', state.heroHabits, document.getElementById('heroHabits'));
    renderHabitList('villain', state.villainHabits, document.getElementById('villainHabits'));
    
    updateBudgetDisplay();
}

function renderHabitList(type, habits, container) {
    container.innerHTML = '';
    
    habits.forEach(habit => {
        const card = document.createElement('div');
        card.className = 'habit-card';
        
        card.innerHTML = `
            <div class="habit-checkbox ${habit.checked ? 'checked' : ''}" onclick="toggleHabit(${habit.id}, '${type}')"></div>
            <div class="habit-info">
                <div class="habit-name">${habit.name}</div>
                <div class="habit-points">
                    <span class="points-value">${habit.points}</span> pts
                    ${habit.streak > 0 ? `<span style="margin-left: 0.5rem;">🔥 ${habit.streak}</span>` : ''}
                </div>
            </div>
            <button class="habit-delete" onclick="deleteHabit(${habit.id}, '${type}')">×</button>
        `;
        
        container.appendChild(card);
    });
}

function updateBudgetDisplay() {
    const heroBudget = calculateBudget(state.heroHabits);
    const villainBudget = calculateBudget(state.villainHabits);
    
    document.getElementById('heroBudgetUsed').textContent = heroBudget;
    document.getElementById('villainBudgetUsed').textContent = villainBudget;
    
    // Update budget colors
    const heroDisplay = document.querySelector('.hero-budget');
    const villainDisplay = document.querySelector('.villain-budget');
    
    if (heroBudget === 20) {
        heroDisplay.style.color = 'var(--hero-primary)';
    } else if (heroBudget > 20) {
        heroDisplay.style.color = '#ff4444';
    } else {
        heroDisplay.style.color = 'var(--text-dim)';
    }
    
    if (villainBudget === 20) {
        villainDisplay.style.color = 'var(--villain-primary)';
    } else if (villainBudget > 20) {
        villainDisplay.style.color = '#ff4444';
    } else {
        villainDisplay.style.color = 'var(--text-dim)';
    }
}

function calculateBudget(habits) {
    return habits.reduce((sum, h) => sum + h.points, 0);
}

// Update Characters
function updateCharacters() {
    updateCharacter('hero', state.heroHabits);
    updateCharacter('villain', state.villainHabits);
}

function updateCharacter(type, habits) {
    const totalPoints = habits.filter(h => h.checked).reduce((sum, h) => sum + h.points, 0);
    updateCharacterProgression(type, totalPoints);
}

// Countdown
function updateCountdown() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    
    const diff = midnight - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('countdownTime').textContent = timeString;
}

// Check Midnight Battle
function checkMidnightBattle() {
    const now = new Date();
    const today = now.toDateString();
    
    // If it's past midnight and we haven't battled today
    if (state.lastBattleDate !== today) {
        const heroBudget = calculateBudget(state.heroHabits);
        const villainBudget = calculateBudget(state.villainHabits);
        
        // Only auto-battle if both sides have exactly 20 points
        if (heroBudget === 20 && villainBudget === 20) {
            // Check if it's close to midnight (within 1 minute)
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            
            if (currentHour === 23 && currentMinute === 59) {
                // Trigger battle
                setTimeout(() => startBattle(), 60000 - now.getSeconds() * 1000);
            }
        }
    }
}

// Manual Battle Trigger (for testing)
function triggerManualBattle() {
    const heroBudget = calculateBudget(state.heroHabits);
    const villainBudget = calculateBudget(state.villainHabits);
    
    if (heroBudget !== 20 || villainBudget !== 20) {
        alert(translations[state.language].budgetError);
        return;
    }
    
    startBattle();
}

// Battle System
function startBattle() {
    const heroPoints = state.heroHabits.filter(h => h.checked).reduce((sum, h) => sum + h.points, 0);
    const villainPoints = state.villainHabits.filter(h => h.checked).reduce((sum, h) => sum + h.points, 0);
    
    const victory = heroPoints > villainPoints;
    
    // Show combat screen
    document.getElementById('combatScreen').classList.remove('hidden');
    
    // Animate battle
    animateBattle(heroPoints, villainPoints, victory);
    
    // Update stats
    state.stats.totalBattles++;
    if (victory) {
        state.stats.totalWins++;
        state.stats.currentStreak++;
        if (state.stats.currentStreak > state.stats.bestStreak) {
            state.stats.bestStreak = state.stats.currentStreak;
        }
        
        // Add hero to army
        const hero = {
            date: new Date().toLocaleDateString(),
            power: heroPoints,
            weapon: heroPoints >= 10 ? weapons[Math.floor(Math.random() * weapons.length)] : null,
            power: heroPoints >= 15 ? powers[Math.floor(Math.random() * powers.length)] : null
        };
        state.army.push(hero);
    } else {
        state.stats.currentStreak = 0;
    }
    
    // Mark battle as done for today
    state.lastBattleDate = new Date().toDateString();
    
    // Reset habits for tomorrow
    state.heroHabits.forEach(h => {
        if (h.checked) h.streak++;
        else h.streak = 0;
        h.checked = false;
    });
    
    state.villainHabits.forEach(h => {
        h.checked = false;
    });
    
    saveState();
}

function animateBattle(heroPoints, villainPoints, victory) {
    const combatHero = document.getElementById('combatHero');
    const combatVillain = document.getElementById('combatVillain');
    const effectsContainer = document.getElementById('combatEffects');
    
    // Copy character styles
    combatHero.querySelector('.character-body').style.cssText = 
        document.querySelector('.hero-character .body-torso').style.cssText;
    combatVillain.querySelector('.character-body').style.cssText = 
        document.querySelector('.villain-character .body-torso').style.cssText;
    
    // Animate characters moving toward each other
    setTimeout(() => {
        combatHero.style.transition = 'all 1s ease';
        combatVillain.style.transition = 'all 1s ease';
        combatHero.style.right = '40%';
        combatVillain.style.left = '40%';
        playSound('clash');
    }, 500);
    
    // Create impact effects
    setTimeout(() => {
        createImpactEffect(effectsContainer);
        playSound('hit');
    }, 1500);
    
    // Show loser fading
    setTimeout(() => {
        if (victory) {
            combatVillain.style.opacity = '0';
            combatVillain.style.transform = 'translateY(-50%) scale(0.5)';
            combatHero.style.transform = 'translateY(-50%) scale(1.3)';
            playSound('victory');
        } else {
            combatHero.style.opacity = '0';
            combatHero.style.transform = 'translateY(-50%) scale(0.5)';
            combatVillain.style.transform = 'translateY(-50%) scale(1.3)';
            playSound('defeat');
        }
    }, 2000);
    
    // Show result
    setTimeout(() => {
        showBattleResult(victory);
    }, 3000);
}

function createImpactEffect(container) {
    const impact = document.createElement('div');
    impact.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        animation: impactExpand 0.5s ease forwards;
    `;
    container.appendChild(impact);
    
    setTimeout(() => impact.remove(), 500);
}

function showBattleResult(victory) {
    const resultDiv = document.getElementById('combatResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultBtn = document.getElementById('resultBtn');
    
    resultTitle.textContent = victory ? translations[state.language].victory : translations[state.language].defeat;
    resultTitle.className = `result-title ${victory ? 'victory' : 'defeat'}`;
    resultMessage.textContent = victory ? translations[state.language].victoryMsg : translations[state.language].defeatMsg;
    resultBtn.textContent = translations[state.language].continue;
    
    resultDiv.classList.remove('hidden');
    
    resultBtn.onclick = () => {
        document.getElementById('combatScreen').classList.add('hidden');
        resultDiv.classList.add('hidden');
        renderHabits();
        updateCharacters();
        updateStats();
    };
}

// Navigation
function showPage(page) {
    // Hide all pages
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('armyPage').classList.add('hidden');
    document.getElementById('statsPage').classList.add('hidden');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });
    
    // Show requested page
    if (page === 'arena') {
        document.getElementById('mainApp').classList.remove('hidden');
    } else if (page === 'army') {
        document.getElementById('armyPage').classList.remove('hidden');
        renderArmy();
    } else if (page === 'stats') {
        document.getElementById('statsPage').classList.remove('hidden');
        updateStats();
    }
    
    state.currentPage = page;
}

window.showPage = showPage; // Make available globally

// Render Army
function renderArmy() {
    const armyGrid = document.getElementById('armyGrid');
    
    if (state.army.length === 0) {
        armyGrid.innerHTML = `<div class="army-empty">${translations[state.language].armyEmpty}</div>`;
        return;
    }
    
    armyGrid.innerHTML = '';
    
    state.army.forEach((hero, index) => {
        const card = document.createElement('div');
        card.className = 'army-card';
        
        card.innerHTML = `
            <div class="army-character">
                <div class="character-body" style="width: 50px; height: 60px; position: absolute; bottom: 15px; left: 15px;">
                    <div style="width: 100%; height: 60%; background: linear-gradient(135deg, var(--hero-dark), #2a1a00); border-radius: 12px;"></div>
                </div>
                <div class="character-head" style="width: 35px; height: 35px; position: absolute; top: 5px; left: 22px;">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--hero-dark), #3a2000); border-radius: 50%;"></div>
                </div>
                ${hero.weapon ? `<div style="position: absolute; right: 5px; top: 40%; font-size: 1.5rem;">${hero.weapon}</div>` : ''}
                ${hero.power ? `<div style="position: absolute; left: 5px; top: 25%; font-size: 1.5rem;">${hero.power}</div>` : ''}
            </div>
            <div class="army-info">
                <div class="army-date">${hero.date}</div>
                <div class="army-power">${hero.power} pts</div>
            </div>
        `;
        
        armyGrid.appendChild(card);
    });
}

// Update Stats
function updateStats() {
    document.getElementById('totalBattles').textContent = state.stats.totalBattles;
    document.getElementById('totalWins').textContent = state.stats.totalWins;
    
    const winRate = state.stats.totalBattles > 0 
        ? Math.round((state.stats.totalWins / state.stats.totalBattles) * 100)
        : 0;
    document.getElementById('winRate').textContent = `${winRate}%`;
    
    document.getElementById('currentStreak').textContent = state.stats.currentStreak;
}

// Settings
function closeSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

window.closeSettings = closeSettings; // Make available globally

// Sound Effects
function playSound(type) {
    // Create simple beep sounds using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'check':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'add':
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.15;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
        case 'delete':
            oscillator.frequency.value = 400;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'clash':
            oscillator.frequency.value = 150;
            gainNode.gain.value = 0.2;
            oscillator.type = 'square';
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'hit':
            oscillator.frequency.value = 100;
            gainNode.gain.value = 0.25;
            oscillator.type = 'sawtooth';
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
        case 'victory':
            oscillator.frequency.value = 880;
            gainNode.gain.value = 0.2;
            oscillator.start();
            setTimeout(() => {
                oscillator.frequency.value = 1100;
            }, 100);
            setTimeout(() => {
                oscillator.frequency.value = 1320;
            }, 200);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
        case 'defeat':
            oscillator.frequency.value = 440;
            gainNode.gain.value = 0.2;
            oscillator.start();
            setTimeout(() => {
                oscillator.frequency.value = 330;
            }, 100);
            setTimeout(() => {
                oscillator.frequency.value = 220;
            }, 200);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
    }
}

// Local Storage
function saveState() {
    localStorage.setItem('habitBattleState', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('habitBattleState');
    if (saved) {
        try {
            const loaded = JSON.parse(saved);
            Object.assign(state, loaded);
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    }
}

// Export functions to global scope
window.toggleHabit = toggleHabit;
window.deleteHabit = deleteHabit;
window.triggerManualBattle = triggerManualBattle;

// CSS Animation Keyframes (inject dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes weaponAppear {
        from { opacity: 0; transform: translateY(-50%) rotate(-45deg) scale(0); }
        to { opacity: 1; transform: translateY(-50%) rotate(-45deg) scale(1); }
    }
    
    @keyframes powerPulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.2); opacity: 1; }
    }
    
    @keyframes impactExpand {
        from { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        to { transform: translate(-50%, -50%) scale(3); opacity: 0; }
    }
`;
document.head.appendChild(style);
