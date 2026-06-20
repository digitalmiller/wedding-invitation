import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Countdown from "./Countdown";
import ActionButtons from "./ActionButtons";
import Location from "./Location";
import RsvpForm from "./RsvpForm";

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  // Zarf döndükten çok kısa bir süre sonra kapağı aç
  const handleFlipComplete = () => {
    if (isFlipped && !isOpened) {
      setTimeout(() => setIsOpened(true), 150);
    }
  };

  // Kart çıktıktan 3 saniye sonra ana ekrana geç
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-slate-50 to-blue-100 overflow-hidden text-slate-800 p-4 relative">
      <AnimatePresence mode="wait">
        {!showInvitation ? (
          <motion.div
            key="envelope-screen"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center w-full h-full absolute inset-0 z-50 p-4"
            style={{ perspective: "1500px" }}
          >
            {!isFlipped && (
              <p className="mb-12 text-slate-500 tracking-widest text-sm uppercase animate-pulse">
                Döndürmek İçin Zarfa Dokunun
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
              <div className="absolute inset-0 bg-slate-100 rounded-md p-6 flex flex-col justify-between items-center text-center border border-slate-300 backface-hidden z-20">
                <div className="absolute top-4 right-4 flex space-x-1 opacity-80">
                  <div className="w-10 h-10 border-2 border-dashed border-blue-400 rounded-sm bg-white text-[7px] text-center pt-2 font-serif text-blue-900 leading-tight">
                    Z&M
                    <br />
                    14.07.26
                  </div>
                  <div className="w-10 h-10 border-2 border-dashed border-slate-400 rounded-full bg-slate-300"></div>
                </div>

                <p className="font-['Playfair_Display'] italic text-xs tracking-wider text-slate-500 mt-2">
                  Düğün Davetiyesi
                </p>

                <div className="flex-1 flex flex-col justify-center items-center mt-6 mb-auto">
                  <h2 className="text-4xl font-['Great_Vibes'] text-blue-950 mb-1">
                    Zeliha & Mehmet Ali
                  </h2>
                  <div className="w-16 h-px bg-slate-300 mx-auto my-3"></div>
                  <p className="font-['Playfair_Display'] text-sm italic text-slate-600 max-w-[200px]">
                    Sayın Misafirimiz,
                  </p>
                  <p className="font-['Playfair_Display'] text-sm italic text-slate-600">
                    Davetlisiniz.
                  </p>
                </div>

                {!isFlipped && (
                  <p className="font-sans text-[10px] text-blue-500 mt-auto animate-pulse">
                    Dokun
                  </p>
                )}
              </div>

              {/* --- 2. ZARFIN ARKA YÜZÜ --- */}
              <div className="absolute inset-0 z-0 rotate-y-180 preserve-3d backface-hidden rounded-md">
                {/* Zarfın İç Arka Planı (z-0) */}
                <div className="absolute inset-0 bg-slate-300 rounded-md shadow-inner z-0"></div>

                {/* İÇİNDEN ÇIKAN KART (z-10) */}
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={
                    isOpened ? { y: -100, opacity: 1 } : { y: 0, opacity: 0 }
                  }
                  transition={{
                    // Dış kapak yok olduktan hemen sonra (0.5s) hareket başlar
                    delay: isOpened ? 0.5 : 0,
                    duration: 0.8,
                    ease: "backOut",
                  }}
                  className="absolute top-2 left-2 right-2 bottom-2 bg-white rounded flex flex-col items-center justify-center shadow-md p-4 text-center z-10"
                >
                  <h2 className="text-3xl font-['Great_Vibes'] text-blue-950 mb-2">
                    Zeliha & Mehmet Ali
                  </h2>
                  <p className="text-xs text-slate-500 font-sans tracking-wide">
                    Birlikte & Sonsuzluğa
                  </p>
                  <p className="text-[10px] text-slate-400 font-sans mt-1">
                    14.07.2026
                  </p>
                </motion.div>

                {/* ALT VE YAN KAPAKLAR (z-20) - Kağıdın (z-10) hep önünde durur */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[100px] border-b-[100px] border-l-[160px] border-t-transparent border-b-transparent border-l-slate-200 z-20 pointer-events-none drop-shadow-sm"></div>
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[100px] border-b-[100px] border-r-[160px] border-t-transparent border-b-transparent border-r-slate-200 z-20 pointer-events-none drop-shadow-sm"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[100px] border-l-transparent border-r-transparent border-b-slate-100 z-20 pointer-events-none drop-shadow-md"></div>

                {/* --- YENİ ÜST KAPAK YAPISI (Çift Katmanlı, Kusursuz Çözüm) --- */}

                {/* 1. İÇ KAPAK (z-5): Her zaman kağıdın (z-10) arkasındadır. Kapak açıldığında arka planı oluşturur. */}
                <motion.div
                  className="absolute top-0 left-0 w-0 h-0 border-l-160 border-r-160 border-t-[100px] border-l-transparent border-r-transparent border-t-slate-200 origin-top z-5"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isOpened ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                {/* 2. DIŞ KAPAK (z-30): Zarf kapalıyken kağıdı gizler. Açılırken 90 dereceyi geçtiği an 'backface-hidden' ile fiziksel olarak görünmez olur! Kağıt rahatça yukarı çıkar. */}
                <motion.div
                  className="absolute top-0 left-0 w-0 h-0 border-l-160 border-r-160 border-t-100 border-l-transparent border-r-transparent border-t-slate-300 origin-top drop-shadow-lg z-30 backface-hidden"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isOpened ? 180 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
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
            className="text-center bg-white/40 p-8 md:p-12 w-[90%] max-w-2xl rounded-3xl backdrop-blur-md shadow-2xl border border-white/60 relative z-10"
          >
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-6 text-slate-500">
              Birlikte Yeni Bir Hayata
            </p>

            <h1 className="text-6xl md:text-8xl font-['Great_Vibes'] text-blue-950 mb-6 drop-shadow-sm">
              Zeliha & Mehmet Ali
            </h1>

            <div className="w-24 h-px bg-blue-300 mx-auto mb-8"></div>

            <p className="text-2xl md:text-3xl italic mb-4 text-slate-700">
              14 Temmuz 2026
            </p>
            <p className="text-sm md:text-md text-slate-600 max-w-md mx-auto leading-relaxed">
              Bu özel günümüzde mutluluğumuzu paylaşmak üzere sizleri de
              aramızda görmekten onur duyarız.
            </p>
            <Countdown />
            <ActionButtons />
            <Location />
            <RsvpForm />
            <div className="mt-12 mb-4">
              <p className="font-['Great_Vibes'] text-3xl text-slate-400">
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
