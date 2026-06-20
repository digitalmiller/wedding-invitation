import { FiMapPin, FiNavigation } from "react-icons/fi";

const Location = () => {
  // Google Maps'te aratılacak mekan ismi
  const venueName = "Hürel Davet, Adana";

  // Ücretsiz embed (gömülü harita) linki
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(venueName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // Tıklanınca haritalar uygulamasını (Navigasyonu) açacak link
  const directUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName)}`;

  return (
    <div className="flex flex-col items-center mt-12 w-full">
      {/* --- BAŞLIK --- */}
      <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase text-slate-500 mb-3">
        Konum & Ulaşım
      </h3>

      {/* --- ÇİZGİ --- */}
      <div className="w-16 h-px bg-slate-300 mb-6"></div>

      {/* --- MEKAN ADI VE ADRES --- */}
      <div className="flex items-center gap-2 text-blue-900 mb-2">
        <FiMapPin className="text-xl" />
        <h4 className="text-xl md:text-2xl font-['Playfair_Display']">
          Hürel Davet
        </h4>
      </div>
      <p className="text-sm text-slate-600 mb-6 text-center max-w-sm px-4">
        Seyhan, Adana
        <br />
        <span className="text-xs text-slate-400">
          (Açık adresi buraya yazabilirsiniz)
        </span>
      </p>

      {/* --- GÖMÜLÜ HARİTA (IFRAME) --- */}
      <div className="w-full max-w-md h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-200 mb-6">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hürel Davet Konum"
        ></iframe>
      </div>

      {/* --- YOL TARİFİ BUTONU --- */}
      <a
        href={directUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 px-8 py-3 rounded-full text-sm font-medium w-full max-w-xs mb-8"
      >
        <FiNavigation className="text-lg" />
        <span>Yol Tarifi Al</span>
      </a>
    </div>
  );
};

export default Location;
