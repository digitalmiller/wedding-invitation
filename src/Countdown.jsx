import { useState, useEffect } from "react";

const Countdown = () => {
  // Hedef tarih: 14 Temmuz 2026
  const targetDate = new Date("2026-07-14T00:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex flex-col items-center mt-10 mb-8">
      {/* --- BAŞLIK --- */}
      <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase text-slate-500 mb-3">
        Büyük Güne Kalan Süre
      </h3>

      {/* --- ÇİZGİ --- */}
      <div className="w-16 h-px bg-slate-300 mb-6"></div>

      {/* --- SAYAÇ --- */}
      <div className="flex justify-center space-x-4 md:space-x-8">
        {/* Gün */}
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-light text-blue-900 font-['Playfair_Display']">
            {formatNumber(timeLeft.days)}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 mt-1">
            Gün
          </div>
        </div>

        {/* Ayraç */}
        <div className="text-2xl md:text-4xl font-light text-blue-300 mt-1">
          :
        </div>

        {/* Saat */}
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-light text-blue-900 font-['Playfair_Display']">
            {formatNumber(timeLeft.hours)}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 mt-1">
            Saat
          </div>
        </div>

        {/* Ayraç */}
        <div className="text-2xl md:text-4xl font-light text-blue-300 mt-1">
          :
        </div>

        {/* Dakika */}
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-light text-blue-900 font-['Playfair_Display']">
            {formatNumber(timeLeft.minutes)}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 mt-1">
            Dakika
          </div>
        </div>

        {/* Ayraç */}
        <div className="text-2xl md:text-4xl font-light text-blue-300 mt-1">
          :
        </div>

        {/* Saniye */}
        <div className="flex flex-col items-center w-12 md:w-16">
          <div className="text-3xl md:text-5xl font-light text-blue-900 font-['Playfair_Display']">
            {formatNumber(timeLeft.seconds)}
          </div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 mt-1">
            Saniye
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
