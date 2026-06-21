import { useState, useEffect } from 'react';

const Countdown = () => {
  const targetDate = new Date('2026-07-14T19:30:00+03:00');

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
      } else {
        // Süre dolduğunda sayacın 0'da kalmasını sağlar
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="flex flex-col items-center mt-12 mb-8">
      <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#7A9E8D] mb-3 font-sans font-medium">
        Büyük Güne Kalan Süre
      </h3>
      
      <div className="w-16 h-px bg-[#D96C60]/30 mb-6"></div>

      <div className="flex justify-center space-x-4 md:space-x-8">
        {[
          { label: 'Gün', value: timeLeft.days },
          { label: 'Saat', value: timeLeft.hours },
          { label: 'Dakika', value: timeLeft.minutes },
          { label: 'Saniye', value: timeLeft.seconds }
        ].map((item, index) => (
          <div key={item.label} className="flex items-center">
            <div className="flex flex-col items-center w-12 md:w-16">
              <div className="text-3xl md:text-5xl font-light text-[#C45B54] font-['Playfair_Display']">
                {formatNumber(item.value)}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400 mt-1 font-sans">
                {item.label}
              </div>
            </div>
            {index < 3 && (
              <div className="text-2xl md:text-4xl font-light text-[#7A9E8D]/50 mx-2 md:mx-4 mt-[-15px]">:</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;