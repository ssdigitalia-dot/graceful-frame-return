import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUp, Mic, Headphones, SlidersHorizontal, Disc3, Lightbulb, Sparkles, Phone, Mail, Instagram, MessageCircle, Play, CalendarDays } from "lucide-react";
import logo from "@/assets/amorim-logo.png.asset.json";
import studio from "@/assets/studio-about.jpg";
import heroVideo from "@/assets/studio-hero.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amorim Consultoria e Produções — Sua ideia, nossa produção!" },
      { name: "description", content: "Produção musical, gravação, edição, mixagem e masterização com qualidade e paixão pela música." },
      { property: "og:title", content: "Amorim Consultoria e Produções" },
      { property: "og:description", content: "Sua ideia, nossa produção! Agende sua data de gravação." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["Sobre", "#sobre"],
  ["Serviços", "#servicos"],
  ["Vídeo", "#video"],
  ["Agenda", "#agenda"],
  ["Galeria", "#galeria"],
  ["Contato", "#contato"],
];

const services = [
  { icon: Disc3, t: "Produção musical", d: "Do arranjo ao resultado final, com identidade e qualidade." },
  { icon: Mic, t: "Gravação de áudio", d: "Voz e instrumentos captados com equipamentos profissionais." },
  { icon: SlidersHorizontal, t: "Edição e mixagem", d: "Equilíbrio, clareza e impacto em cada faixa." },
  { icon: Headphones, t: "Masterização", d: "Sua música pronta para todas as plataformas." },
  { icon: Lightbulb, t: "Consultoria musical", d: "Orientação para carreira, projetos e lançamentos." },
  { icon: Sparkles, t: "Produções especiais", d: "Projetos personalizados para eventos e marcas." },
];

function Index() {
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-ink/85 backdrop-blur-md py-2" : "bg-transparent py-4"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
          <a href="#topo" aria-label="Início">
            <img src={logo.url} alt="Amorim Consultoria e Produções" className={`w-auto transition-all duration-500 ${scrolled ? "h-12" : "h-16 md:h-20"}`} />
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="text-sm font-semibold text-ink-foreground/85 transition-colors hover:text-primary">{l}</a>
            ))}
            <a href="#agenda" className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow">Agende</a>
          </nav>
        </div>
      </header>

      {/* Hero: full-bleed media to the very top, no text over it */}
      <section id="topo" className="relative h-screen min-h-[560px] w-full overflow-hidden bg-ink">
        <video src={heroVideo.url} poster={studio} autoPlay muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/25" />
        <div aria-hidden className="absolute inset-x-0 bottom-24 flex items-end justify-center gap-1.5 opacity-70">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className="eq-bar w-1 rounded-full bg-gradient-primary" style={{ animationDelay: `${(i * 137) % 1000}ms`, animationDuration: `${900 + ((i * 53) % 700)}ms` }} />
          ))}
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {["♪", "♫", "♩", "♬", "♪", "♫"].map((n, i) => (
            <span key={i} className="music-note absolute text-2xl text-primary" style={{ left: `${10 + i * 15}%`, animationDelay: `${i * 1.7}s` }}>{n}</span>
          ))}
        </div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center animate-rise">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          SUA IDEIA, <span className="text-gradient-primary">NOSSA PRODUÇÃO!</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Transformamos talento, criatividade e boas ideias em experiências musicais de qualidade.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a href="#agenda" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
            <CalendarDays className="h-5 w-5" /> AGENDE SUA DATA
          </a>
          <a href="#video" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-7 py-3.5 font-bold transition-colors hover:bg-foreground hover:text-background">
            <Play className="h-5 w-5" /> ASSISTA AO NOSSO VÍDEO
          </a>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="bg-secondary py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <img src={studio} alt="Estúdio Amorim" loading="lazy" width={1280} height={960} className="rounded-2xl shadow-glow" />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Sobre nós</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">MUITO MAIS QUE PRODUÇÃO, UMA PAIXÃO PELA MÚSICA!</h2>
            <p className="mt-5 text-muted-foreground">
              A Amorim Consultoria e Produções nasceu para dar vida a projetos musicais com qualidade, criatividade e excelência.
              Cada artista recebe atenção próxima, do primeiro contato à entrega final.
            </p>
            <p className="mt-4 text-muted-foreground">Confiança, profissionalismo e cuidado em cada detalhe sonoro.</p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="mx-auto max-w-6xl px-5 py-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Serviços</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">NOSSA PRODUÇÃO, SEU TALENTO!</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: I, t, d }) => (
            <div key={t} className="group rounded-2xl border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-glow">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground"><I className="h-6 w-6" /></div>
              <h3 className="mt-5 text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              <a href="#agenda" className="mt-5 inline-block text-sm font-bold text-primary">Solicitar informações →</a>
            </div>
          ))}
        </div>
      </section>

      {/* Vídeo */}
      <section id="video" className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">CONHEÇA A <span className="text-gradient-primary">AMORIM!</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-foreground/70">Conheça nosso trabalho, nossa estrutura e a dedicação que colocamos em cada produção.</p>
          <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-ink-foreground/10">
            <img src={studio} alt="" loading="lazy" className="h-full w-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-glow"><Play className="ml-1 h-9 w-9 text-primary-foreground" /></span>
            </div>
          </div>
          <a href="#video" className="mt-8 inline-block rounded-full bg-gradient-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow">ASSISTA AO VÍDEO</a>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="mx-auto max-w-3xl px-5 py-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Agenda</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">SEU PRÓXIMO PROJETO COMEÇA AQUI!</h2>
        </div>
        {sent ? (
          <div className="mt-10 rounded-2xl border border-primary bg-accent p-8 text-center">
            <h3 className="text-xl font-bold text-accent-foreground">Solicitação recebida!</h3>
            <p className="mt-2 text-muted-foreground">Obrigado! Vamos analisar a disponibilidade e entraremos em contato para confirmar sua data.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10 grid gap-4 rounded-2xl border bg-card p-7 sm:grid-cols-2">
            <input required placeholder="Nome" className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-ring" />
            <input required placeholder="Telefone / WhatsApp" className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-ring" />
            <select required defaultValue="" className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-ring sm:col-span-2">
              <option value="" disabled>Serviço desejado</option>
              {services.map((s) => <option key={s.t}>{s.t}</option>)}
            </select>
            <input required type="date" className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-ring" />
            <input required type="time" className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-ring" />
            <textarea rows={4} placeholder="Descreva seu projeto" className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:border-ring sm:col-span-2" />
            <button className="rounded-full bg-gradient-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow sm:col-span-2">SOLICITAR AGENDAMENTO</button>
          </form>
        )}
      </section>

      {/* Galeria */}
      <section id="galeria" className="bg-secondary py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-3xl font-extrabold md:text-4xl">BASTIDORES E RESULTADOS</h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <img src={studio} alt="Bastidores" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h2 className="text-3xl font-extrabold md:text-4xl">VAMOS PRODUZIR ALGO <span className="text-gradient-primary">INCRÍVEL?</span></h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[[MessageCircle, "WhatsApp", "(00) 00000-0000"], [Phone, "Telefone", "(00) 0000-0000"], [Mail, "E-mail", "contato@amorim.com.br"], [Instagram, "Instagram", "@amorimproducoes"]].map(([I, l, v]) => {
            const Icon = I as typeof Phone;
            return (
              <div key={l as string} className="flex items-center gap-4 rounded-2xl border bg-card p-5 text-left">
                <Icon className="h-6 w-6 text-primary" />
                <div><p className="text-xs font-bold uppercase text-muted-foreground">{l as string}</p><p className="font-semibold">{v as string}</p></div>
              </div>
            );
          })}
        </div>
        <a href="#agenda" className="mt-10 inline-block rounded-full bg-gradient-primary px-8 py-4 font-bold text-primary-foreground shadow-glow">FALE COM A AMORIM</a>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-14 text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center">
          <img src={logo.url} alt="Amorim Consultoria e Produções" loading="lazy" className="h-28 w-auto" />
          <p className="font-display font-bold tracking-wide">AMORIM CONSULTORIA E PRODUÇÕES</p>
          <nav className="flex flex-wrap justify-center gap-5 text-sm text-ink-foreground/70">
            {nav.map(([l, h]) => <a key={h} href={h} className="hover:text-primary">{l}</a>)}
            <a href="#" className="hover:text-primary">Política de Privacidade</a>
          </nav>
          <p className="text-xs text-ink-foreground/50">© {new Date().getFullYear()} Amorim Consultoria e Produções. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Back to top */}
      <button
        aria-label="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition-all duration-300 ${showTop ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
