import { FiCalendar, FiShare2 } from "react-icons/fi";

const ActionButtons = () => {
  const addToCalendar = () => {
    const text = "Zeliha & Mehmet Ali Düğün";
    const details = "Bu mutlu günümüzde sizleri de aramızda görmekten onur duyarız.";
    const location = "Adana"; 
    const dates = "20260714T160000Z/20260714T203000Z";
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(googleCalendarUrl, "_blank");
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Zeliha & Mehmet Ali Düğün Davetiyesi',
      text: '14 Temmuz 2026 tarihinde gerçekleşecek düğünümüze davetlisiniz!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Paylaşım kapatıldı.');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Davetiye linki kopyalandı! İstediğiniz kişiye gönderebilirsiniz.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 w-full font-sans">
      <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#7A9E8D] mb-3 font-medium">
        Planlama & Paylaşım
      </h3>
      
      <div className="w-16 h-px bg-[#D96C60]/30 mb-6"></div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm mx-auto">
        <button
          onClick={addToCalendar}
          className="flex items-center justify-center gap-2 flex-1 bg-white border border-[#7A9E8D] text-[#557565] hover:bg-[#7A9E8D] hover:text-white transition-all duration-300 px-6 py-3 rounded-full text-sm font-medium shadow-sm hover:shadow-md"
        >
          <FiCalendar className="text-lg" />
          <span>Takvime Ekle</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 flex-1 bg-[#D96C60] text-white hover:bg-[#C45B54] transition-all duration-300 px-6 py-3 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <FiShare2 className="text-lg" />
          <span>Davetiyeyi Paylaş</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;