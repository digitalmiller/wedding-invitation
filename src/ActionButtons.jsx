import { FiCalendar, FiShare2 } from "react-icons/fi";

const ActionButtons = () => {
  // Google Takvim linki oluşturma (Adana yerel saati ile 19:00 - 23:30 arası varsayılan)
  const addToCalendar = () => {
    const text = "Zeliha & Mehmet Ali Düğün";
    const details =
      "Bu mutlu günümüzde sizleri de aramızda görmekten onur duyarız.";
    const location = "Adana"; // Mekan netleştiğinde buraya tam adresi girebilirsin
    // 14 Temmuz 2026 UTC saatleri (Türkiye için UTC+3 hesaplanmıştır: 16:00 = 19:00 TRT)
    const dates = "20260714T160000Z/20260714T203000Z";

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  // Modern tarayıcılar için yerel paylaşım menüsünü açma
  const handleShare = async () => {
    const shareData = {
      title: "Zeliha & Mehmet Ali Düğün Davetiyesi",
      text: "14 Temmuz 2026 tarihinde gerçekleşecek düğünümüze davetlisiniz!",
      url: window.location.href, // Sitenin mevcut linkini otomatik alır
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Paylaşım penceresi kapatıldı.");
      }
    } else {
      // Eğer eski bir tarayıcıdan girilmişse linki panoya kopyala
      navigator.clipboard.writeText(window.location.href);
      alert("Davetiye linki kopyalandı! İstediğiniz kişiye gönderebilirsiniz.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 mb-4 w-full">
      {/* --- BAŞLIK --- */}
      <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase text-slate-500 mb-3">
        Planlama & Paylaşım
      </h3>

      {/* --- ÇİZGİ --- */}
      <div className="w-16 h-px bg-slate-300 mb-6"></div>

      {/* --- BUTONLAR --- */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm mx-auto">
        {/* Takvime Ekle Butonu */}
        <button
          onClick={addToCalendar}
          className="flex items-center justify-center gap-2 flex-1 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all duration-300 px-6 py-3 rounded-full text-sm font-medium"
        >
          <FiCalendar className="text-lg" />
          <span>Takvime Ekle</span>
        </button>

        {/* Siteyi Paylaş Butonu */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 flex-1 bg-slate-800 text-white hover:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 px-6 py-3 rounded-full text-sm font-medium"
        >
          <FiShare2 className="text-lg" />
          <span>Davetiyeyi Paylaş</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
