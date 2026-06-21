import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMusic, FiVolumeX } from "react-icons/fi";
import Countdown from "./Countdown";
import ActionButtons from "./ActionButtons";
import Location from "./Location";

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleFlipComplete = () => {
    if (isFlipped && !isOpened) {
      setTimeout(() => setIsOpened(true), 150);
    }
  };

  useEffect(() => {
    if (isOpened) {
      const timer = setTimeout(() => {
        setShowInvitation(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpened]);

  const handleEnvelopeClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => console.log("Otomatik oynatma engellendi:", err));
      }
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#FAF5F0] via-white to-[#FDF4E3] overflow-x-hidden text-slate-700 px-4 py-32 md:py-40 relative font-['Playfair_Display']">
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* --- BLUR EFEKTİ --- */}
      <div
        className="fixed top-0 left-0 w-full h-32 md:h-48 z-[90] pointer-events-none backdrop-blur-[30px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 30%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 30%, transparent 100%)",
        }}
      ></div>

      <div
        className="fixed bottom-0 left-0 w-full h-32 md:h-48 z-[90] pointer-events-none backdrop-blur-[30px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, black 30%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
        }}
      ></div>

      {/* --- ÇİÇEK GÖRSELLERİ --- */}
      <div className="fixed top-0 left-0 w-full flex justify-center pointer-events-none z-[100]">
        <img
          src="/flower-top.png"
          alt=""
          className="w-full max-w-lg md:max-w-2xl h-auto drop-shadow-xl"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full flex justify-center pointer-events-none z-[100]">
        <img
          src="/flower-bottom.png"
          alt=""
          className="w-full max-w-lg md:max-w-2xl h-auto drop-shadow-xl"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>

      {/* Müzik Kontrol Butonu */}
      <AnimatePresence>
        {isFlipped && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={toggleMusic}
            className="fixed top-6 right-6 z-[150] w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-[#E8C2BA] text-[#C45B54] hover:bg-[#FDF4E3] transition-colors"
          >
            {isPlaying ? (
              <FiMusic className="animate-spin-slow text-xl" />
            ) : (
              <FiVolumeX className="text-xl" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showInvitation ? (
          <motion.div
            key="envelope-screen"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center w-full h-full absolute inset-0 z-40 p-4"
            style={{ perspective: "1500px" }}
          >
            {!isFlipped && (
              <p className="mb-12 text-[#C45B54] tracking-widest text-sm uppercase animate-pulse drop-shadow-sm font-sans font-medium">
                Zarfı açmak İçİn dokunun
              </p>
            )}

            <motion.div
              className="relative w-[320px] h-[200px] preserve-3d cursor-pointer shadow-2xl rounded-md"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              onAnimationComplete={handleFlipComplete}
              onClick={handleEnvelopeClick}
            >
              {/* --- 1. ZARFIN ÖN YÜZÜ --- */}
              <div className="absolute inset-0 bg-[#FDFBF7] rounded-md p-6 flex flex-col justify-between items-center text-center border border-[#E5D7C5] backface-hidden z-20 shadow-inner">
                <div className="absolute top-4 right-4 flex space-x-1 opacity-90">
                  <div className="w-10 h-10 border border-[#D96C60]/40 rounded-sm bg-white text-[7px] text-center pt-2 font-serif text-[#7A9E8D] leading-tight">
                    Z&M
                    <br />
                    <span className="text-slate-400">14.07.26</span>
                  </div>
                  <div className="w-10 h-10 bg-[#D96C60] rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-[8px] font-serif italic">
                      SSZM
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center mt-12 mb-auto">
                  <h2 className="text-4xl font-['Great_Vibes'] text-[#C45B54] mb-1">
                    Zeliha & Mehmet Ali
                  </h2>
                  <div className="w-16 h-px bg-[#E8C2BA] mx-auto my-3"></div>
                  <p className="font-['Playfair_Display'] text-sm italic text-slate-500">
                    Sayın Misafirimiz,
                  </p>
                  <p className="font-['Playfair_Display'] text-sm italic text-slate-500">
                    Davetlisiniz.
                  </p>
                </div>
              </div>

              {/* --- 2. ZARFIN ARKA YÜZÜ --- */}
              <div className="absolute inset-0 z-0 rotate-y-180 preserve-3d backface-hidden rounded-md">
                <div className="absolute inset-0 bg-[#EFE8DF] rounded-md shadow-inner z-0"></div>

                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={
                    isOpened ? { y: -100, opacity: 1 } : { y: 0, opacity: 0 }
                  }
                  transition={{
                    delay: isOpened ? 0.5 : 0,
                    duration: 0.8,
                    ease: "backOut",
                  }}
                  className="absolute top-2 left-2 right-2 bottom-2 bg-white rounded flex flex-col items-center justify-center shadow-lg p-4 text-center z-10 border border-[#F0E6D8]"
                >
                  <h2 className="text-3xl font-['Great_Vibes'] text-[#C45B54] mb-2">
                    Zeliha & Mehmet Ali
                  </h2>
                  <p className="text-xs text-[#7A9E8D] font-sans tracking-wide uppercase">
                    Bİrlİkte ve Sonsuzluğa
                  </p>
                  <p className="text-[10px] text-slate-400 font-sans mt-2 tracking-widest">
                    14 • 07 • 2026
                  </p>
                </motion.div>

                <div className="absolute top-0 left-0 w-0 h-0 border-t-[100px] border-b-[100px] border-l-[160px] border-t-transparent border-b-transparent border-l-[#F7F2EC] z-20 pointer-events-none drop-shadow-sm"></div>
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[100px] border-b-[100px] border-r-[160px] border-t-transparent border-b-transparent border-r-[#F7F2EC] z-20 pointer-events-none drop-shadow-sm"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[100px] border-l-transparent border-r-transparent border-b-[#FDFBF7] z-20 pointer-events-none drop-shadow-md"></div>

                <motion.div
                  className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-l-transparent border-r-transparent border-t-[#EFE8DF] origin-top z-5"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isOpened ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-l-transparent border-r-transparent border-t-[#F2EBE1] origin-top drop-shadow-lg z-30 backface-hidden"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isOpened ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // --- ASIL DAVETİYE EKRANI ---
          <motion.div
            key="invitation-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center bg-white/70 p-8 md:p-12 w-[90%] max-w-2xl rounded-3xl backdrop-blur-xl shadow-2xl border border-white relative z-10"
          >
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-6 text-[#7A9E8D] font-sans">
              Bİrlİkte Yenİ Bİr Hayata
            </p>

            <h1 className="text-6xl md:text-8xl font-['Great_Vibes'] text-[#C45B54] mb-6 drop-shadow-sm">
              Zeliha & Mehmet Ali
            </h1>

            <div className="w-24 h-px bg-[#E8C2BA] mx-auto mb-8"></div>

            <p className="text-2xl md:text-3xl italic mb-2 text-slate-700">
              14 Temmuz 2026
            </p>
            <p className="text-2xl md:text-3xl italic mb-2 text-slate-700">
              19:30
            </p>
            
            {/* --- AİLE İSİMLERİ --- */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16 mt-10 mb-10">
              <div className="text-center">
                <p className="font-['Playfair_Display'] text-xl md:text-2xl text-slate-700">Sevda & Mehmet</p>
                <p className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-[#7A9E8D] mt-1">Özmen Ailesi</p>
              </div>
              
              {/* Araya zarif bir dikey çizgi */}
              <div className="w-12 h-px sm:w-px sm:h-12 bg-[#E8C2BA] opacity-70"></div>
              
              <div className="text-center">
                <p className="font-['Playfair_Display'] text-xl md:text-2xl text-slate-700">Ayşe & Orhan</p>
                <p className="text-xs md:text-sm font-sans uppercase tracking-[0.2em] text-[#7A9E8D] mt-1">Değirmenci Ailesi</p>
              </div>
            </div>

            <p className="text-sm md:text-md text-slate-500 max-w-md mx-auto leading-relaxed">
              Bu özel günümüzde mutluluğumuzu paylaşmak üzere sizleri de
              aramızda görmekten onur duyarız.
            </p>

            <Countdown />
            <ActionButtons />
            <Location />

            <div className="mt-16 mb-4">
              <p className="font-['Great_Vibes'] text-4xl text-[#C45B54]">
                Sevgiyle kalın...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;