import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Camera, Map, Phone, MessageSquare, Music, Mail, Image as ImageIcon, Calendar, Calculator, Cloud, Gamepad2, Gift } from 'lucide-react';
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

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

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
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
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
            <div key={i} className={`cell ${cell?.toLowerCase()}`} onClick={() => handleClick(i)}>
              {cell}
            </div>
          ))}
        </div>
        <button 
          style={{ marginTop: 20, padding: '10px 20px', borderRadius: 8, border: 'none', background: '#ff4757', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => setBoard(Array(9).fill(null))}
        >
          Yeniden Başlat
        </button>
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
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji }));
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
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
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
              <div 
                key={card.id} 
                className={`memory-card ${isFlipped ? 'flipped' : ''}`}
                onClick={() => handleClick(card.id, card.emoji)}
              >
                <div className="memory-card-inner">
                  <div className="memory-card-front">❓</div>
                  <div className="memory-card-back">{card.emoji}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button 
          style={{ marginTop: 30, padding: '10px 20px', borderRadius: 8, border: 'none', background: '#ffa502', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => {
            setSolved([]);
            setFlipped([]);
            const shuffled = [...emojis, ...emojis]
              .sort(() => Math.random() - 0.5)
              .map((emoji, i) => ({ id: i, emoji }));
            setCards(shuffled);
          }}
        >
          Yeniden Başlat
        </button>
      </div>
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
      { id: 'photos', label: 'Fotoğraflar', icon: ImageIcon, color: '#eccc68' },
      { id: 'camera', label: 'Kamera', icon: Camera, color: '#747d8c' },
    ],
    [
      { id: 'settings', label: 'Ayarlar', icon: Settings, color: '#57606f' },
      { id: 'map', label: 'Harita', icon: Map, color: '#2ed573' },
    ]
  ];

  const dockApps = [
    { id: 'phone', label: 'Telefon', icon: Phone, color: '#2ed573' },
    { id: 'messages', label: 'Mesajlar', icon: MessageSquare, color: '#2ed573' },
    { id: 'mail', label: 'Mail', icon: Mail, color: '#1e90ff' },
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
                if (swipe < -50 && currentPage < pages.length - 1) {
                  setCurrentPage(prev => prev + 1);
                } else if (swipe > 50 && currentPage > 0) {
                  setCurrentPage(prev => prev - 1);
                }
              }}
            >
              {pages[currentPage].map((app) => (
                <AppIcon 
                  key={app.id} 
                  Icon={app.icon} 
                  bgColor={app.color} 
                  label={app.label} 
                  onClick={() => openApp(app.id)}
                  customIcon={app.custom ? <span style={{fontSize: 32}}>{app.custom}</span> : null}
                />
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
            <AppIcon 
              key={app.id} 
              Icon={app.icon} 
              bgColor={app.color} 
              label={app.label} 
              onClick={() => openApp(app.id)} 
            />
          ))}
        </div>
      </div>

      {/* Render Active App Overlay */}
      <AnimatePresence>
        {activeApp && (
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
            {/* Generic placeholder for other apps */}
            {!['birthday', 'tictactoe', 'memory'].includes(activeApp) && (
              <div className="app-fullscreen" style={{ backgroundColor: '#f5f6fa' }}>
                <div className="game-container">
                  <h2 style={{ color: '#333' }}>{activeApp.toUpperCase()}</h2>
                  <p style={{ color: '#666', marginTop: 10 }}>Bu uygulama şu anda yapım aşamasında!</p>
                </div>
                <div className="back-button" onClick={closeApp} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
