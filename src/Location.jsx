import { FiMapPin, FiNavigation } from "react-icons/fi";

const Location = () => {
  const venueName = "Hürel Davet, Adana";
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(venueName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directUrl = `https://maps.google.com/maps?q=${encodeURIComponent(venueName)}`;

  return (
    <div className="flex flex-col items-center mt-12 w-full font-sans">
      <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#7A9E8D] mb-3 font-medium">
        Konum & Ulaşım
      </h3>
      
      <div className="w-16 h-px bg-[#D96C60]/30 mb-6"></div>

      <div className="flex items-center gap-2 text-[#D96C60] mb-2">
        <FiMapPin className="text-xl" />
        <h4 className="text-xl md:text-2xl font-['Playfair_Display'] text-slate-700">Hürel Davet</h4>
      </div>
      <p className="text-sm text-slate-500 mb-6 text-center max-w-sm px-4">
        Seyhan, Adana
        <br />
        <span className="text-xs text-slate-400">Adnan Menderes Bulvarı, Aşıklar Blv No:85, 01100 Çukurova/Adana</span>
      </p>

      {/* Harita çerçevesi ferahlatıldı */}
      <div className="w-full max-w-md h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-[#E8C2BA]/50 mb-6 bg-white p-1">
        <iframe 
          src={embedUrl}
          width="100%" 
          height="100%" 
          style={{ border: 0, borderRadius: '0.75rem' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Hürel Davet Konum"
        ></iframe>
      </div>

      <a 
        href={directUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#7A9E8D] text-white hover:bg-[#557565] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 px-8 py-3 rounded-full text-sm font-medium w-full max-w-xs mb-4"
      >
        <FiNavigation className="text-lg" />
        <span>Yol Tarifi Al</span>
      </a>
    </div>
  );
};

export default Location;