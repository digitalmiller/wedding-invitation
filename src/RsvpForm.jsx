import { useState } from "react";
// Firebase kütüphanelerini import et
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"; // Az önce oluşturduğumuz dosya

const RsvpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    isAttending: "yes",
    guestCount: "1",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null); // Hata durumu için

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // "lcv_yanitlari" adında bir koleksiyona veri ekliyoruz
      await addDoc(collection(db, "lcv_yanitlari"), {
        name: formData.name,
        isAttending: formData.isAttending === "yes",
        guestCount: formData.isAttending === "yes" ? parseInt(formData.guestCount) : 0,
        message: formData.message,
        createdAt: serverTimestamp() // Gönderim zamanı
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Firebase Hatası: ", err);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (Geri kalan return kısmı aynı kalıyor)
  return (
    <div className="flex flex-col items-center mt-12 mb-8 w-full max-w-md mx-auto px-4">
      <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase text-slate-500 mb-3">
        L.C.V
      </h3>
      
      <div className="w-16 h-px bg-slate-300 mb-8"></div>

      {isSubmitted ? (
        <div className="bg-white/60 border border-green-200 rounded-2xl p-6 text-center shadow-sm w-full">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ✓
          </div>
          <h4 className="text-xl font-['Playfair_Display'] text-slate-800 mb-2">
            Teşekkür Ederiz!
          </h4>
          <p className="text-sm text-slate-600">
            Yanıtınız tarafımıza başarıyla iletildi.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full bg-white/50 backdrop-blur-sm border border-white/60 p-6 md:p-8 rounded-3xl shadow-lg">
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-slate-500 mb-2">
              İsim Soyisim
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-sm text-slate-700"
              placeholder="Adınız ve Soyadınız"
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">
              Katılım Durumu
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/80 border border-slate-200 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="isAttending"
                  value="yes"
                  checked={formData.isAttending === "yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 font-medium">Katılıyorum</span>
              </label>
              
              <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/80 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:border-slate-400 has-[:checked]:bg-slate-100">
                <input
                  type="radio"
                  name="isAttending"
                  value="no"
                  checked={formData.isAttending === "no"}
                  onChange={handleChange}
                  className="w-4 h-4 text-slate-600 border-gray-300 focus:ring-slate-500"
                />
                <span className="text-sm text-slate-700 font-medium">Katılamıyorum</span>
              </label>
            </div>
          </div>

          {formData.isAttending === "yes" && (
            <div className="mb-5">
              <label htmlFor="guestCount" className="block text-xs uppercase tracking-wider text-slate-500 mb-2">
                Kaç Kişi Katılacaksınız?
              </label>
              <select
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-sm text-slate-700"
              >
                <option value="1">1 Kişi</option>
                <option value="2">2 Kişi</option>
                <option value="3">3 Kişi</option>
                <option value="4">4 Kişi</option>
                <option value="5">5 veya daha fazla</option>
              </select>
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-slate-500 mb-2">
              Notunuz (Opsiyonel)
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-sm text-slate-700 resize-none"
              placeholder="Eklemek istediğiniz bir not var mı?"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              isSubmitting 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gönderiliyor...
              </>
            ) : (
              "Lütfen Cevap Veriniz"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default RsvpForm;