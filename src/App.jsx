import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Camera, Map, Phone, MessageSquare, Music, Compass, Image as ImageIcon, Calendar, Calculator, Cloud, Gamepad2, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

const AppIcon = ({ Icon, bgColor, label, onClick, customIcon }) => (
  <div className="app-icon-wrapper" onClick={onClick}>
    <div className="app-icon" style={{ background: bgColor }}>
      {customIcon ? customIcon : <Icon color="white" size={32} />}
    </div>
    <div className="app-label">{label}</div>
  </div>
);

// Games and Apps
const BirthdayApp = ({ onClose }) => {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-fullscreen birthday-app">
      <div className="game-container">
        <h1 className="birthday-title">🎉 İyi Ki Doğdun Eymen! 🎉</h1>
        <p className="birthday-message">
          Yeni yaşın sana sağlık, mutluluk ve bolca şans getirsin. <br/><br/>
          Seni çok seviyoruz! ❤️
        </p>
        <div style={{ fontSize: '100px', animation: 'pulse 2s infinite' }}>🎂</div>
      </div>
      <div className="back-button back-button-light" onClick={onClose} />
    </div>
  );
};

const TicTacToeApp = ({ onClose }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const calculateWinner = (squares) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };
  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  const winner = calculateWinner(board);
  const status = winner ? `Kazanan: ${winner}` : board.every(Boolean) ? 'Berabere!' : `Sıradaki: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="app-fullscreen tictactoe-app">
      <div className="game-container">
        <h2 style={{ marginBottom: 20 }}>XOX Oyunu</h2>
        <div style={{ marginBottom: 20, fontSize: 18 }}>{status}</div>
        <div className="board">
          {board.map((cell, i) => (
            <div key={i} className={`cell ${cell?.toLowerCase()}`} onClick={() => handleClick(i)}>{cell}</div>
          ))}
        </div>
        <button style={{ marginTop: 20, padding: '10px 20px', borderRadius: 8, border: 'none', background: '#ff4757', color: 'white', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setBoard(Array(9).fill(null))}>Yeniden Başlat</button>
      </div>
      <div className="back-button back-button-light" onClick={onClose} />
    </div>
  );
};

const MemoryGameApp = ({ onClose }) => {
  const emojis = ['🎈', '🎁', '🍰', '🏎️', '⚽', '🎮'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5).map((emoji, i) => ({ id: i, emoji }));
    setCards(shuffled);
  }, []);

  const handleClick = (id, emoji) => {
    if (disabled || flipped.some(c => c.id === id) || solved.includes(emoji)) return;
    const newFlipped = [...flipped, { id, emoji }];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setDisabled(true);
      if (newFlipped[0].emoji === newFlipped[1].emoji) {
        setSolved([...solved, newFlipped[0].emoji]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => { setFlipped([]); setDisabled(false); }, 1000);
      }
    }
  };

  return (
    <div className="app-fullscreen memory-app">
      <div className="game-container">
        <h2 style={{ marginBottom: 20 }}>Hafıza Oyunu</h2>
        {solved.length === emojis.length && <div style={{ fontSize: 24, color: '#2ed573', marginBottom: 20 }}>Tebrikler! 🎉</div>}
        <div className="memory-grid">
          {cards.map(card => {
            const isFlipped = flipped.some(c => c.id === card.id) || solved.includes(card.emoji);
            return (
              <div key={card.id} className={`memory-card ${isFlipped ? 'flipped' : ''}`} onClick={() => handleClick(card.id, card.emoji)}>
                <div className="memory-card-inner">
                  <div className="memory-card-front">❓</div>
                  <div className="memory-card-back">{card.emoji}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button style={{ marginTop: 30, padding: '10px 20px', borderRadius: 8, border: 'none', background: '#ffa502', color: 'white', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setSolved([]); setFlipped([]); const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5).map((emoji, i) => ({ id: i, emoji })); setCards(shuffled); }}>Yeniden Başlat</button>
      </div>
      <div className="back-button back-button-light" onClick={onClose} />
    </div>
  );
};

const CalculatorApp = ({ onClose }) => {
  const [num1, setNum1] = useState(50);
  const [num2, setNum2] = useState(50);
  const [op, setOp] = useState('+');

  const calculate = () => {
    switch(op) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num2 !== 0 ? (num1 / num2).toFixed(2) : 'Hata';
      default: return 0;
    }
  };

  return (
    <div className="app-fullscreen" style={{ backgroundColor: '#1e1e1e', color: 'white', padding: 20 }}>
      <h2 style={{marginTop: 60, textAlign: 'center'}}>Hesap Makinesi</h2>
      <div style={{ marginTop: 30, background: '#333', padding: '20px', borderRadius: '12px', fontSize: '40px', textAlign: 'right', minHeight: '90px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {calculate()}
      </div>
      <div style={{ marginTop: 40 }}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Sayı 1</span><span>{num1}</span></div>
        <input type="range" min="0" max="100" value={num1} onChange={e => setNum1(Number(e.target.value))} style={{ width: '100%', margin: '10px 0 30px' }} />
        <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Sayı 2</span><span>{num2}</span></div>
        <input type="range" min="0" max="100" value={num2} onChange={e => setNum2(Number(e.target.value))} style={{ width: '100%', margin: '10px 0 30px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        {['+', '-', '*', '/'].map(o => (
          <button key={o} onClick={() => setOp(o)} style={{ flex: 1, padding: '15px 0', fontSize: '24px', background: op === o ? '#ff9f0a' : '#555', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>{o}</button>
        ))}
      </div>
      <div className="back-button back-button-light" onClick={onClose} />
    </div>
  );
};

const WeatherApp = ({ onClose }) => (
  <div className="app-fullscreen weather-app">
    <h2 style={{ marginTop: 80, fontSize: 32, fontWeight: '400' }}>Bursa</h2>
    <div style={{ fontSize: 72, fontWeight: '200', margin: '10px 0' }}>18°</div>
    <div style={{ fontSize: 20 }}>Cumartesi</div>
    <div style={{ marginTop: 50 }}>
      <div className="weather-icon">🌩️🌧️</div>
      <h3 style={{ marginTop: 20, fontSize: 24 }}>Sağanak Yağmur ve Şimşek</h3>
    </div>
    <div className="back-button back-button-light" onClick={onClose} />
  </div>
);

const CalendarApp = ({ onClose }) => (
  <div className="app-fullscreen calendar-app">
    <div className="calendar-red-header">Temmuz 2013</div>
    <div style={{ marginTop: 40, fontSize: 24, fontWeight: 'bold' }}>Cumartesi</div>
    <div className="calendar-date">4</div>
    <div className="calendar-note">⭐ Önemli Tarih ⭐</div>
    <div className="back-button back-button-dark" onClick={onClose} style={{backgroundColor: '#000'}} />
  </div>
);

const CameraApp = ({ onClose }) => (
  <div className="app-fullscreen camera-app">
    <div>
      <span style={{ fontSize: '80px' }}>😎</span>
      <p style={{ marginTop: '20px' }}>Tamam en yakışıklı sensin</p>
    </div>
    <div className="back-button back-button-light" onClick={onClose} />
  </div>
);

const SettingsApp = ({ onClose }) => (
  <div className="app-fullscreen settings-app">
    <h1 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Ayarlar</h1>
    <div className="settings-list">
      <div className="settings-item">
        <span className="title">Sistem</span>
        <span className="desc">Versiyon 13</span>
      </div>
      <div className="settings-item">
        <span className="title">İşlemci</span>
        <span className="desc">Büyük işlemci</span>
      </div>
      <div className="settings-item">
        <span className="title">RAM</span>
        <span className="desc">Küçük RAM</span>
      </div>
      <div className="settings-item">
        <span className="title">Depolama</span>
        <span className="desc">Devasa bellek (hiçbir mağduriyet anısını unutmayacak şekilde)</span>
      </div>
    </div>
    <div className="back-button back-button-dark" onClick={onClose} style={{backgroundColor: '#000'}} />
  </div>
);

const MapApp = ({ onClose }) => (
  <div className="app-fullscreen map-app">
    <div className="map-bg"></div>
    <div className="map-pin-container">
      <div className="map-pin">📍</div>
      <h2 style={{ marginTop: 10, fontSize: 20, color: '#333' }}>Bursa Zübeyde Hanım<br/>Doğum Hastanesi</h2>
    </div>
    <div className="back-button back-button-dark" onClick={onClose} style={{backgroundColor: '#000'}} />
  </div>
);

const BrowserApp = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    const interval = setInterval(() => {
      setScore(s => s + 1);
      const trex = document.getElementById('trex');
      const cactus = document.getElementById('cactus');
      if (trex && cactus) {
        const trexRect = trex.getBoundingClientRect();
        const cactusRect = cactus.getBoundingClientRect();
        if (
          cactusRect.left < trexRect.right - 20 &&
          cactusRect.right > trexRect.left + 20 &&
          cactusRect.top < trexRect.bottom - 20
        ) {
          setIsGameOver(true);
          setIsPlaying(false);
        }
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying, isGameOver]);

  const handleInteraction = () => {
    if (!isPlaying && !isGameOver) {
      setIsPlaying(true);
    } else if (isGameOver) {
      setIsGameOver(false);
      setScore(0);
      setIsPlaying(true);
    } else {
      if (!isJumping) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
    }
  };

  return (
    <div className="app-fullscreen browser-app" onClick={handleInteraction}>
      <div style={{ position: 'absolute', top: 60, right: 20, fontSize: 24, fontWeight: 'bold' }}>Skor: {score}</div>
      {!isPlaying && !isGameOver && <div style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center', fontSize: 20, color: '#666' }}>Oynamak için ekrana dokun</div>}
      {isGameOver && <div style={{ position: 'absolute', top: 120, width: '100%', textAlign: 'center', fontSize: 28, color: 'red', fontWeight: 'bold' }}>Oyun Bitti!</div>}
      
      <div className="trex-game-area">
        <div id="trex" className={`trex-stickman ${isJumping ? 'jump' : ''}`}>👱‍♂️</div>
        {isPlaying && <div id="cactus" className="trex-cactus move-left">🌵</div>}
      </div>
      
      <div className="back-button back-button-dark" onClick={(e) => { e.stopPropagation(); onClose(); }} style={{backgroundColor: '#000'}} />
    </div>
  );
};

const MessagesApp = ({ onClose }) => (
  <div className="app-fullscreen messages-app">
    <div className="messages-header">Eymen ve Arkadaşları</div>
    <div className="messages-chat">
      <div className="msg-bubble msg-right">Hadi minecraft oynayalım</div>
      <div className="msg-bubble msg-left">Tamam kanka geliyorum</div>
      <div className="msg-bubble msg-left">Hadi oynayalım ben hazırım</div>
      <div className="msg-bubble msg-left">Tamamdır açıyorum ben de</div>
    </div>
    <div className="back-button back-button-dark" onClick={onClose} style={{backgroundColor: '#000'}} />
  </div>
);

const PhoneAlert = ({ onClose }) => (
  <div className="alert-overlay">
    <div className="alert-box">
      <div className="alert-content">
        <div style={{fontSize: 32, marginBottom: 10}}>⚠️</div>
        Zaten sessizde boşver
      </div>
      <button className="alert-button" onClick={onClose}>Tamam</button>
    </div>
  </div>
);

const MusicApp = ({ onClose }) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="app-fullscreen music-app">
      <div className="music-header">Müzik - Manifest</div>
      <div className="song-list">
        {['Hileli', 'Snap', 'Zehir'].map(song => (
          <div key={song} className="song-item" onClick={() => setShowAlert(true)}>
            <div className="song-cover">🎵</div>
            <div className="song-info">
              <div className="song-title">{song}</div>
              <div className="song-artist">Manifest</div>
            </div>
          </div>
        ))}
      </div>
      
      {showAlert && (
        <div className="alert-overlay" style={{zIndex: 200}}>
          <div className="alert-box">
            <div className="alert-content">
              <div style={{fontSize: 32, marginBottom: 10}}>❌</div>
              Manifest çalamıyoruz malesef
            </div>
            <button className="alert-button" onClick={() => { setShowAlert(false); onClose(); }}>Ana Ekrana Dön</button>
          </div>
        </div>
      )}
      <div className="back-button back-button-light" onClick={onClose} />
    </div>
  );
};

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeApp, setActiveApp] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (appId) => setActiveApp(appId);
  const closeApp = () => setActiveApp(null);

  const pages = [
    [
      { id: 'birthday', label: 'Eymen ❤️', icon: Gift, color: '#ff4757', custom: '🎁' },
      { id: 'tictactoe', label: 'XOX', icon: Gamepad2, color: '#2ed573' },
      { id: 'memory', label: 'Hafıza', icon: Gamepad2, color: '#ffa502' },
      { id: 'weather', label: 'Hava', icon: Cloud, color: '#1e90ff' },
      { id: 'calendar', label: 'Takvim', icon: Calendar, color: '#ff6348' },
      { id: 'calculator', label: 'Hesap', icon: Calculator, color: '#3742fa' },
      { id: 'camera', label: 'Kamera', icon: Camera, color: '#747d8c' },
      { id: 'settings', label: 'Ayarlar', icon: Settings, color: '#57606f' },
    ],
    [
      { id: 'map', label: 'Harita', icon: Map, color: '#2ed573' },
    ]
  ];

  const dockApps = [
    { id: 'phone', label: 'Telefon', icon: Phone, color: '#2ed573' },
    { id: 'messages', label: 'Mesajlar', icon: MessageSquare, color: '#2ed573' },
    { id: 'browser', label: 'Tarayıcı', icon: Compass, color: '#1e90ff' },
    { id: 'music', label: 'Müzik', icon: Music, color: '#ff4757' },
  ];

  return (
    <div className="iphone-container">
      {/* Top Bar / Notch */}
      <div className="notch-container">
        <div>{currentTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
        <div className="notch"></div>
        <div className="status-bar-right">
          <span>LTE</span>
          <span>100%</span>
        </div>
      </div>

      {/* Screen Content */}
      <div className="screen-content">
        <div className="pages-container">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentPage}
              className="page"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.2 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50 && currentPage < pages.length - 1) setCurrentPage(prev => prev + 1);
                else if (swipe > 50 && currentPage > 0) setCurrentPage(prev => prev - 1);
              }}
            >
              {pages[currentPage].map((app) => (
                <AppIcon key={app.id} Icon={app.icon} bgColor={app.color} label={app.label} onClick={() => openApp(app.id)} customIcon={app.custom ? <span style={{fontSize: 32}}>{app.custom}</span> : null} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page Indicators */}
        <div className="page-indicators">
          {pages.map((_, i) => (
            <div key={i} className={`dot ${i === currentPage ? 'active' : ''}`} />
          ))}
        </div>

        {/* Dock */}
        <div className="dock">
          {dockApps.map((app) => (
            <AppIcon key={app.id} Icon={app.icon} bgColor={app.color} label={app.label} onClick={() => openApp(app.id)} />
          ))}
        </div>
      </div>

      {/* App Overlays */}
      <AnimatePresence>
        {activeApp && activeApp !== 'phone' && (
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 20 }}
          >
            {activeApp === 'birthday' && <BirthdayApp onClose={closeApp} />}
            {activeApp === 'tictactoe' && <TicTacToeApp onClose={closeApp} />}
            {activeApp === 'memory' && <MemoryGameApp onClose={closeApp} />}
            {activeApp === 'calculator' && <CalculatorApp onClose={closeApp} />}
            {activeApp === 'weather' && <WeatherApp onClose={closeApp} />}
            {activeApp === 'calendar' && <CalendarApp onClose={closeApp} />}
            {activeApp === 'camera' && <CameraApp onClose={closeApp} />}
            {activeApp === 'settings' && <SettingsApp onClose={closeApp} />}
            {activeApp === 'map' && <MapApp onClose={closeApp} />}
            {activeApp === 'browser' && <BrowserApp onClose={closeApp} />}
            {activeApp === 'messages' && <MessagesApp onClose={closeApp} />}
            {activeApp === 'music' && <MusicApp onClose={closeApp} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone App Alert (renders over everything without sliding from bottom) */}
      {activeApp === 'phone' && <PhoneAlert onClose={closeApp} />}
    </div>
  );
}
