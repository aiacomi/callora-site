import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ComponentType } from "react";
import { Moon, Sun, PhoneCall, Bot, CheckCircle2, BarChart3, Store, ShieldCheck } from "lucide-react";

type Theme = "light" | "dark";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

type Feature = {
  title: string;
  text: string;
  icon: ComponentType<{ className?: string }>;
};

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  items: string[];
  featured: boolean;
};

const YOUTUBE_EMBED = "https://www.youtube-nocookie.com/embed/hYGILZXCRqY?rel=0";
const YOUTUBE_EMBED_AUTOPLAY = "https://www.youtube-nocookie.com/embed/hYGILZXCRqY?autoplay=1&rel=0";
const WEB3FORMS_ACCESS_KEY = "7b7fb09b-a7c3-4d3d-ac38-824d16ba823c";

export default function AIOrderConfirmationLanding() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const handleInputChange =
    (field: keyof FormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      company: formData.company.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedData.name || !trimmedData.company || !trimmedData.email || !trimmedData.phone || !trimmedData.message) {
      setStatusMessage("Completează toate câmpurile înainte să trimiți cererea.");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatusMessage("Se trimite cererea...");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Cerere demo Callora AI - ${trimmedData.company}`,
          from_name: trimmedData.name,
          name: trimmedData.name,
          company: trimmedData.company,
          email: trimmedData.email,
          phone: trimmedData.phone,
          message: trimmedData.message,
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Cererea nu a putut fi trimisă.");
      }

      setStatusMessage("Cererea a fost trimisă cu succes. Te vom contacta cât mai curând.");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "A apărut o eroare la trimiterea cererii.";
      setStatusMessage(`Cererea nu a putut fi trimisă. ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openVideoModal = () => {
    setIsVideoOpen(true);
    setStatusMessage("Am deschis demo-ul video Callora AI.");
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = window.localStorage.getItem("callora-theme") as Theme | null;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const nextTheme: Theme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("callora-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  const themeClasses = useMemo(
    () => ({
      page: isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900",
      softSection: isDark ? "bg-slate-900/60" : "bg-slate-50",
      hero: isDark ? "from-slate-950 via-slate-900 to-slate-950" : "from-slate-50 to-white",
      border: isDark ? "border-white/10" : "border-slate-200",
      card: isDark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200",
      mutedCard: isDark ? "bg-slate-900/80 border-white/10" : "bg-slate-50 border-slate-200",
      textMuted: isDark ? "text-slate-300" : "text-slate-600",
      textSoft: isDark ? "text-slate-400" : "text-slate-500",
      buttonPrimary: isDark ? "bg-white text-slate-900 hover:bg-slate-200" : "bg-slate-900 text-white hover:opacity-90",
      buttonSecondary: isDark
        ? "border-white/15 text-slate-100 hover:bg-white/5"
        : "border-slate-300 text-slate-700 hover:bg-slate-50",
      badge: isDark ? "border-white/10 bg-white/5 text-slate-200" : "border-slate-200 bg-white text-slate-600",
      iconWrap: isDark ? "bg-white text-slate-900" : "bg-slate-900 text-white",
      darkPanel: isDark ? "bg-slate-900 border-white/10" : "bg-slate-900 border-slate-900",
      input: isDark
        ? "border-white/10 bg-slate-950 text-slate-100 placeholder:text-slate-500"
        : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400",
    }),
    [isDark]
  );

  const features: Feature[] = [
    {
      title: "Confirmare automată",
      text: "Botul sună automat clienții și confirmă comenzile fără intervenție umană.",
      icon: PhoneCall,
    },
    {
      title: "Voce naturală",
      text: "Folosește audio realist pentru o experiență mai profesionistă și mai credibilă.",
      icon: Bot,
    },
    {
      title: "Răspuns simplu",
      text: "Clientul poate confirma sau anula comanda prin voce sau taste.",
      icon: CheckCircle2,
    },
    {
      title: "Raport clar",
      text: "Vezi rapid ce comenzi au fost confirmate, anulate sau au nevoie de operator.",
      icon: BarChart3,
    },
  ];

  const steps = [
    "Clientul plasează comanda",
    "Callora AI sună automat clientul",
    "Clientul spune confirm comanda sau anulez comanda",
    "Rezultatul este salvat instant",
  ];


  const pricing: PricingPlan[] = [
    {
      name: "Starter",
      price: "de la 99€/lună",
      description: "Pentru magazine mici care vor să automatizeze primele confirmări.",
      items: ["Script de bază", "1 scenariu de apel", "Raport simplu", "Setup rapid"],
      featured: false,
    },
    {
      name: "Growth",
      price: "de la 249€/lună",
      description: "Pentru magazine care au volum constant și vor automatizare serioasă.",
      items: ["Script personalizat", "Voce premium", "Mai multe flow-uri", "Integrare cu sistemul tău"],
      featured: true,
    },
    {
      name: "Custom",
      price: "Ofertă personalizată",
      description: "Pentru companii care vor integrare completă și logică dedicată.",
      items: ["White-label", "Logică avansată", "Dashboard custom", "Suport prioritar"],
      featured: false,
    },
  ];

  const useCases = ["Magazine Shopify", "Magazine WooCommerce", "Selleri marketplace", "E-commerce local"];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.page}`}>
      <section className={`border-b bg-gradient-to-b ${themeClasses.hero} ${themeClasses.border}`}>
        <div className="mx-auto max-w-6xl px-6 py-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm ${themeClasses.iconWrap}`}>
                <PhoneCall className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold">Callora AI</p>
                <p className={`text-sm ${themeClasses.textSoft}`}>Voice Bot pentru confirmare comenzi</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition ${themeClasses.badge}`}
              aria-label="Comută tema"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-8 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <div className={`inline-flex rounded-full border px-4 py-1 text-sm font-medium ${themeClasses.badge}`}>
                Demo produs • confirmare automată a comenzilor prin apel
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Callora AI confirmă comenzile automat, prin apeluri vocale inteligente
              </h1>
              <p className={`mt-6 max-w-2xl text-lg leading-8 ${themeClasses.textMuted}`}>
                Un voice bot pentru magazine online care sună clienții, confirmă comenzile și reduce munca manuală a echipei tale.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={openVideoModal}
                  className={`rounded-2xl px-6 py-3 text-sm font-semibold shadow-sm transition ${themeClasses.buttonPrimary}`}
                >
                  Vezi demo
                </button>
                <a
                  href="#pricing"
                  className={`rounded-2xl border px-6 py-3 text-sm font-semibold transition ${themeClasses.buttonSecondary}`}
                >
                  Vezi prețuri
                </a>
                <a
                  href="#contact"
                  className={`rounded-2xl border px-6 py-3 text-sm font-semibold transition ${themeClasses.buttonSecondary}`}
                >
                  Cere ofertă
                </a>
              </div>
            </div>

            <div className={`rounded-[28px] border p-6 shadow-xl ${themeClasses.card}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${themeClasses.iconWrap}`}>
                  <Store className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Demo flow</p>
                  <p className={`text-sm ${themeClasses.textSoft}`}>Exemplu de apel pentru un magazin online</p>
                </div>
              </div>

              <div className={`mt-6 rounded-3xl border p-5 text-sm leading-7 ${themeClasses.mutedCard}`}>
                „Bună ziua. Sunt asistentul virtual al magazinului. Vă sun pentru confirmarea comenzii dumneavoastră. Dacă doriți să confirmați comanda, spuneți confirm comanda sau apăsați 1. Dacă doriți să anulați comanda, spuneți anulez comanda sau apăsați 2.”
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className={`rounded-2xl border p-4 ${themeClasses.mutedCard}`}>
                  <p className="text-sm font-semibold">Confirmare</p>
                  <p className={`mt-1 text-sm ${themeClasses.textMuted}`}>„Confirm comanda” sau tasta 1</p>
                </div>
                <div className={`rounded-2xl border p-4 ${themeClasses.mutedCard}`}>
                  <p className="text-sm font-semibold">Anulare</p>
                  <p className={`mt-1 text-sm ${themeClasses.textMuted}`}>„Anulez comanda” sau tasta 2</p>
                </div>
              </div>

              <div className={`mt-5 rounded-2xl border p-4 ${themeClasses.mutedCard}`}>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5" />
                  <p className={`text-sm ${themeClasses.textMuted}`}>
                    Ideal pentru magazine care confirmă manual comenzile și vor să reducă timpul pierdut cu apeluri repetitive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className={`rounded-3xl border p-6 shadow-sm transition ${themeClasses.card}`}>
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${themeClasses.iconWrap}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className={`mt-3 text-sm leading-6 ${themeClasses.textMuted}`}>{feature.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="demo" className={`py-16 ${themeClasses.softSection}`}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Cum funcționează</h2>
              <div className="mt-8 space-y-4">
                {steps.map((step, index) => (
                  <div key={step} className={`flex items-start gap-4 rounded-2xl border p-4 shadow-sm ${themeClasses.card}`}>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${themeClasses.iconWrap}`}>
                      {index + 1}
                    </div>
                    <p className={`pt-1 ${themeClasses.textMuted}`}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-3xl border p-8 shadow-sm ${themeClasses.card}`}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Demo video</h3>
                  <p className={`mt-2 text-sm ${themeClasses.textMuted}`}>
                    Aici poți arăta exact cum sună botul și cum răspunde clientul în apel.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openVideoModal}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${themeClasses.buttonSecondary}`}
                >
                  Deschide video
                </button>
              </div>

              <div className={`mt-6 rounded-3xl border p-3 ${themeClasses.mutedCard}`}>
                <div className="aspect-video overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60">
                  <iframe
                    className="h-full w-full"
                    src={YOUTUBE_EMBED}
                    title="Demo video Callora AI"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className={`rounded-3xl border p-8 shadow-sm ${themeClasses.darkPanel}`}>
            <h3 className="text-2xl font-semibold text-white">Ideal pentru</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {useCases.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-300">
              Soluția poate fi personalizată cu voce, script, mesaj și integrare pentru fiecare business.
            </p>
          </div>

          <div className={`rounded-3xl border p-8 shadow-sm ${themeClasses.card}`}>
            <h3 className="text-2xl font-semibold">Ce primește clientul</h3>
            <div className="mt-6 space-y-4">
              {[
                "Script adaptat pentru magazinul lui",
                "Voce personalizată și flow de confirmare",
                "Integrare cu procesul de comandă",
                "Raport clar cu rezultate și statusuri",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
                  <p className={themeClasses.textMuted}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className={`border-y py-16 ${themeClasses.softSection} ${themeClasses.border}`}>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Pachete orientative</h2>
            <p className={`mt-4 ${themeClasses.textMuted}`}>
              Poți folosi secțiunea asta ca ofertă de pornire. Valorile pot fi ajustate în funcție de ce vrei să vinzi.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl border p-7 shadow-sm transition ${plan.featured ? "scale-[1.01]" : ""} ${
                  plan.featured ? (isDark ? "border-white/20 bg-slate-900" : "border-slate-900 bg-white") : themeClasses.card
                }`}
              >
                {plan.featured && (
                  <div
                    className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      isDark ? "bg-white text-slate-900" : "bg-slate-900 text-white"
                    }`}
                  >
                    Recomandat
                  </div>
                )}
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <p className="mt-3 text-2xl font-bold">{plan.price}</p>
                <p className={`mt-3 text-sm leading-6 ${themeClasses.textMuted}`}>{plan.description}</p>
                <div className="mt-6 space-y-3">
                  {plan.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
                      <p className={`text-sm ${themeClasses.textMuted}`}>{item}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className={`mt-8 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    plan.featured ? themeClasses.buttonPrimary : `${themeClasses.buttonSecondary} border`
                  }`}
                >
                  Discută oferta
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Vrei o versiune personalizată pentru magazinul tău?</h2>
            <p className={`mt-4 max-w-xl ${themeClasses.textMuted}`}>
              Pot configura un demo personalizat Callora AI pentru confirmarea automată a comenzilor, cu mesaj adaptat pentru compania ta.
            </p>
            <div className="mt-8 space-y-4">
              <div>
                <a href="mailto:callora.ai@outlook.com" className={`text-sm font-medium ${themeClasses.textMuted}`}>
                  Sau scrie direct: callora.ai@outlook.com
                </a>
              </div>
              <div>
                <a href="tel:+40748303977" className={`text-sm font-medium ${themeClasses.textMuted}`}>
                  Număr contact: +40 748 303 977
                </a>
              </div>
              {statusMessage ? <div className={`rounded-2xl border p-4 text-sm ${themeClasses.mutedCard}`}>{statusMessage}</div> : null}
            </div>
          </div>

          <form onSubmit={handleSubmit} className={`rounded-3xl border p-6 shadow-sm ${themeClasses.card}`}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Numele tău"
                value={formData.name}
                onChange={handleInputChange("name")}
                className={`rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-400 ${themeClasses.input}`}
              />
              <input
                type="text"
                placeholder="Compania"
                value={formData.company}
                onChange={handleInputChange("company")}
                className={`rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-400 ${themeClasses.input}`}
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange("email")}
                className={`rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-400 ${themeClasses.input}`}
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                className={`rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-400 ${themeClasses.input}`}
              />
            </div>
            <textarea
              placeholder="Spune pe scurt de ce ai nevoie"
              rows={5}
              value={formData.message}
              onChange={handleInputChange("message")}
              className={`mt-4 w-full rounded-2xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-slate-400 ${themeClasses.input}`}
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`rounded-2xl px-6 py-3 text-sm font-semibold shadow-sm transition ${themeClasses.buttonPrimary} ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
              >
                {isSubmitting ? "Se trimite..." : "Trimite cererea"}
              </button>
              <button
                type="button"
                onClick={openVideoModal}
                className={`rounded-2xl border px-6 py-3 text-sm font-semibold transition ${themeClasses.buttonSecondary}`}
              >
                Vezi demo video
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className={`border-t ${themeClasses.border}`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm ${themeClasses.iconWrap}`}>
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Callora AI</p>
              <p className={themeClasses.textMuted}>Voice Bot pentru confirmare comenzi</p>
            </div>
          </div>
          <div className={`flex flex-col gap-2 lg:items-end ${themeClasses.textMuted}`}>
            <a href="mailto:callora.ai@outlook.com">callora.ai@outlook.com</a>
            <a href="tel:+40748303977">+40 748 303 977</a>
            <p>© 2026 Callora AI. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>

      {isVideoOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
          <div className={`relative w-full max-w-5xl rounded-[28px] border p-4 shadow-2xl ${themeClasses.card}`}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Demo video Callora AI</h3>
                <p className={`mt-1 text-sm ${themeClasses.textMuted}`}>Demo-ul video oficial Callora AI este gata pentru prezentare.</p>
              </div>
              <button
                type="button"
                onClick={closeVideoModal}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${themeClasses.buttonSecondary}`}
              >
                Închide
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60">
              <iframe
                className="h-full w-full"
                src={YOUTUBE_EMBED_AUTOPLAY}
                title="Demo video Callora AI modal"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
