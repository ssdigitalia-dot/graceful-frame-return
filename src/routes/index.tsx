// ============= Full file contents =============

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowUp, Mic, Headphones, SlidersHorizontal, Disc3, Lightbulb, Sparkles, Phone, Mail, Instagram, MessageCircle, Play, CalendarDays } from "lucide-react";
import logo from "@/assets/amorim-logo.png.asset.json";
import studio from "@/assets/studio-about.jpg";
import heroVideo from "@/assets/studio-hero.mp4.asset.json";
import { useReveal, useScrollPhysics } from "@/hooks/useScrollPhysics";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Index() {
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const field = "rounded-lg border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-3 text-ink-foreground placeholder:text-ink-foreground/50 outline-none focus:border-primary";

  useScrollPhysics();
  useReveal();

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
      {/* Scroll progress: a line with its echo, drawn as the page moves */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div className="fx-wave h-full w-full origin-left bg-gradient-primary" />
        <div className="fx-echo absolute inset-0 origin-left bg-gradient-primary blur-[3px]" />
      </div>

      {/* Air streaks: only visible while the page is in motion */}
      <div aria-hidden className="fx-sonic pointer-events-none fixed inset-0 z-[55] overflow-hidden">
        {[18, 38, 58, 78].map((top) => (
          <i key={top} className="absolute left-0 h-px w-full" style={{ top: `${top}%` }} />
        ))}
      </div>

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
        <video src={heroVideo.url} poster={studio} autoPlay muted loop playsInline preload="auto" className="fx-video absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/25" />
        <div aria-hidden className="fx-parallax absolute inset-x-0 bottom-24 flex items-end justify-center">
          <div className="fx-eq flex items-end justify-center gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} className="eq-bar w-1 rounded-full bg-gradient-primary" style={{ animationDelay: `${(i * 137) % 1000}ms`, animationDuration: `${900 + ((i * 53) % 700)}ms` }} />
            ))}
          </div>
        </div>
        <div aria-hidden className="fx-parallax pointer-events-none absolute inset-0">
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
          <div data-reveal className="reveal fx-drag">
            <img src={studio} alt="Estúdio Amorim" loading="lazy" width={1280} height={960} className="rounded-2xl shadow-glow" />
          </div>
          <div data-reveal className="reveal" style={delay(140)}>
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
        <div data-reveal className="reveal text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Serviços</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">NOSSA PRODUÇÃO, SEU TALENTO!</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: I, t, d }, i) => (
            <div key={t} data-reveal className="reveal group rounded-2xl border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-glow" style={delay(i * 90)}>
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
          <div data-reveal className="reveal">
            <h2 className="text-3xl font-extrabold md:text-4xl">CONHEÇA A <span className="text-gradient-primary">AMORIM!</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-foreground/70">Conheça nosso trabalho, nossa estrutura e a dedicação que colocamos em cada produção.</p>
          </div>
          <div data-reveal className="reveal fx-drag" style={delay(160)}>
            <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-ink-foreground/10">
              <img src={studio} alt="" loading="lazy" className="h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-glow"><Play className="ml-1 h-9 w-9 text-primary-foreground" /></span>
              </div>
            </div>
          </div>
          <a href="#video" className="mt-8 inline-block rounded-full bg-gradient-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow">ASSISTA AO VÍDEO</a>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="relative overflow-hidden bg-ink py-24 text-ink-foreground">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5">
        <div data-reveal className="reveal text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Agenda</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">SEU PRÓXIMO PROJETO <span className="text-gradient-primary">COMEÇA AQUI!</span></h2>
          <p className="mt-3 text-ink-foreground/70">Escolha a data no calendário e envie sua solicitação.</p>
        </div>
        {sent ? (
          <div className="mt-10 rounded-2xl border border-primary bg-ink-foreground/5 p-8 text-center">
            <h3 className="text-xl font-bold text-primary">Solicitação recebida!</h3>
            <p className="mt-2 text-ink-foreground/70">Obrigado! Vamos analisar a disponibilidade para {date ? format(date, "dd 'de' MMMM", { locale: ptBR }) : "sua data"} e entraremos em contato.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { if (!date) { e.preventDefault(); return; } submit(e); }} data-reveal className="reveal mt-12 grid gap-8 rounded-3xl border border-primary/40 bg-ink-foreground/5 p-6 shadow-glow md:grid-cols-[auto_1fr] md:p-8" style={delay(120)}>
            <div className="mx-auto rounded-2xl border border-ink-foreground/10 bg-ink p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                disabled={{ before: new Date() }}
                className="pointer-events-auto bg-transparent p-3 text-ink-foreground [&_.rdp-caption_label]:text-ink-foreground [&_button]:text-ink-foreground [&_.rdp-today_button]:!text-primary-foreground [&_.rdp-today_button]:!bg-primary/60 [&_button[aria-selected=true]]:!bg-primary [&_button[aria-selected=true]]:!text-primary-foreground"
              />
              <p className="px-3 pb-2 text-center text-sm font-semibold text-primary">
                {date ? format(date, "EEEE, dd 'de' MMMM", { locale: ptBR }) : "Selecione uma data"}
              </p>
            </div>
            <div className="grid content-start gap-4 sm:grid-cols-2">
              <input required placeholder="Nome" className={field} />
              <input required placeholder="Telefone / WhatsApp" className={field} />
              <select required defaultValue="" className={`${field} sm:col-span-2`}>
                <option value="" disabled>Serviço desejado</option>
                {services.map((s) => <option key={s.t} className="text-foreground">{s.t}</option>)}
              </select>
              <select required defaultValue="" className={`${field} sm:col-span-2`}>
                <option value="" disabled>Horário</option>
                {["09:00", "11:00", "14:00", "16:00", "19:00"].map((h) => <option key={h} className="text-foreground">{h}</option>)}
              </select>
              <textarea rows={4} placeholder="Descreva seu projeto" className={`${field} sm:col-span-2`} />
              <button disabled={!date} className="rounded-full bg-gradient-primary px-7 py-4 font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-50 sm:col-span-2">
                {date ? "SOLICITAR AGENDAMENTO" : "ESCOLHA UMA DATA NO CALENDÁRIO"}
              </button>
            </div>
          </form>
        )}
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="bg-secondary py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 data-reveal className="reveal text-center text-3xl font-extrabold md:text-4xl">BASTIDORES E RESULTADOS</h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} data-reveal className={`reveal ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} style={delay(i * 80)}>
                <img src={studio} alt="Bastidores" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h2 data-reveal className="reveal text-3xl font-extrabold md:text-4xl">VAMOS PRODUZIR ALGO <span className="text-gradient-primary">INCRÍVEL?</span></h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[[MessageCircle, "WhatsApp", "(00) 00000-0000"], [Phone, "Telefone", "(00) 0000-0000"], [Mail, "E-mail", "contato@amorim.com.br"], [Instagram, "Instagram", "@amorimproducoes"]].map(([I, l, v], i) => {
            const Icon = I as typeof Phone;
            return (
              <div key={l as string} data-reveal className="reveal flex items-center gap-4 rounded-2xl border bg-card p-5 text-left" style={delay(i * 80)}>
                <Icon className="h-6 w-6 text-primary" />
                <div><p className="text-xs font-bold uppercase text-muted-foreground">{l as string}</p><p className="font-semibold">{v as string}</p></div>
              </div>
            );
          })}
        </div>
        <a href="#agenda" data-reveal className="reveal mt-10 inline-block rounded-full bg-gradient-primary px-8 py-4 font-bold text-primary-foreground shadow-glow" style={delay(200)}>FALE COM A AMORIM</a>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-14 text-ink-foreground">
        <div data-reveal className="reveal mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center">
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
