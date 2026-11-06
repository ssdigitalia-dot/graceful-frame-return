// ============= Full file contents =============

import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowUp, Mic, Speaker, Ticket, Users, Building2, Sparkles, Phone, Mail, Instagram, MessageCircle, Play, CalendarDays, MapPin, SlidersVertical, Drama, Trophy, DoorOpen, Volume2, Projector } from "lucide-react";
const logo = { url: "/amorim-logo.png" };
import palcoShow from "@/assets/palco-show.jpg";
import publicoShow from "@/assets/publico-show.jpg";
import palcoTeatro from "@/assets/palco-teatro.jpg";
import heroVideo from "@/assets/studio-hero.mp4.asset.json";
import { useReveal, useScrollPhysics } from "@/hooks/useScrollPhysics";
import { enviarSolicitacaoAgenda } from "@/lib/agenda.functions";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amorim Consultoria e Produções — Sua ideia, nossa produção!" },
      { name: "description", content: "Produção de shows em São Paulo: palco, som, iluminação, bilheteria e agenda de datas em Sescs, teatros e casas de show." },
      { property: "og:title", content: "Amorim Consultoria e Produções" },
      { property: "og:description", content: "Sua ideia, nossa produção! Agende a data do seu show." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["Sobre", "#sobre"],
  ["Serviços", "#servicos"],
  ["Palcos", "#palcos"],
  ["Vídeo", "#video"],
  ["Agenda", "#agenda"],
  ["Galeria", "#galeria"],
  ["Contato", "#contato"],
];

const sonorizacao = [
  { icon: SlidersVertical, t: "Projeto e instalação de sistemas de som de chamadas e música para as atividades escolares." },
  { icon: Drama, t: "Sonorização de escolas, teatros e anfiteatros." },
  { icon: Trophy, t: "Sonorização de quadras poliesportivas." },
  { icon: DoorOpen, t: "Sonorização da área de portaria, entrada e saída de alunos." },
  { icon: Volume2, t: "Criação de sistema volante de som para ensaios, apresentações e festas." },
  { icon: Projector, t: "Instalação de projetores e telas de projeção." },
];

const services = [
  { icon: Speaker, t: "Produção de shows", d: "Do planejamento à noite do evento, com equipe e estrutura completas." },
  { icon: Mic, t: "Palco, som e iluminação", d: "Montagem profissional sob medida para cada casa e cada espetáculo." },
  { icon: Building2, t: "Booking de casas e teatros", d: "Buscamos datas em Sescs, teatros e casas de show de São Paulo." },
  { icon: Ticket, t: "Bilheteria e divulgação", d: "Ingressos, divulgação e gestão do público antes, durante e depois." },
  { icon: Users, t: "Produção executiva", d: "Contratos, logística, cronograma e equipe — sem improviso." },
  { icon: Sparkles, t: "Shows personalizados", d: "Espetáculos criados para festivais, marcas e eventos privados." },
];

const venues = [
  "Sesc Pompeia",
  "Sesc Consolação",
  "Sesc Pinheiros",
  "Sesc 24 de Maio",
  "Sesc Bom Retiro",
  "Sesc Interlagos",
  "Sesc Santo André",
  "Sesc Osasco",
  "Teatros e casas de show em SP",
  "Festivais e eventos corporativos",
];

const gallery = [publicoShow, palcoShow, palcoTeatro, palcoShow, palcoTeatro, publicoShow];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Index() {
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [heroReady, setHeroReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const heroRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLVideoElement>(null);
  const field = "rounded-lg border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-3 text-ink-foreground placeholder:text-ink-foreground/50 outline-none focus:border-primary";

  useScrollPhysics();
  useReveal();

  // Make sure the hero video really starts (muted autoplay), and only reveal it once a frame is painted.
  useEffect(() => {
    const v = heroRef.current;
    if (!v) return;
    v.muted = true;
    const start = v.play();
    if (start && typeof start.catch === "function") start.catch(() => {});
    const done = () => setHeroReady(true);
    if (v.readyState >= 2) done();
    else {
      v.addEventListener("loadeddata", done, { once: true });
      v.addEventListener("playing", done, { once: true });
    }
    return () => {
      v.removeEventListener("loadeddata", done);
      v.removeEventListener("playing", done);
    };
  }, []);

  // The video in the Vídeo section follows the play/pause state.
  useEffect(() => {
    const v = sectionRef.current;
    if (!v) return;
    v.muted = true;
    if (playing) {
      const start = v.play();
      if (start && typeof start.catch === "function") start.catch(() => {});
    } else {
      v.pause();
    }
  }, [playing]);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enviar = useServerFn(enviarSolicitacaoAgenda);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) return;
    const f = new FormData(e.currentTarget);
    const get = (n: string) => String(f.get(n) ?? "");
    setSending(true);
    setErro(null);
    try {
      await enviar({
        data: {
          nome: get("nome"),
          telefone: get("telefone"),
          tipoProducao: get("tipoProducao"),
          localDesejado: get("localDesejado"),
          horario: get("horario"),
          dataShow: format(date, "yyyy-MM-dd"),
          mensagem: get("mensagem"),
        },
      });
      setSent(true);
    } catch (err) {
      setErro(
        err instanceof Error && err.message
          ? err.message
          : "Não foi possível enviar sua solicitação. Tente novamente.",
      );
    } finally {
      setSending(false);
    }
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
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="text-sm font-semibold text-ink-foreground/85 transition-colors hover:text-primary">{l}</a>
            ))}
            <Link to="/portfolio" className="text-sm font-semibold text-ink-foreground/85 transition-colors hover:text-primary">Portfólio artístico</Link>
            <a href="#agenda" className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow">Agende</a>
          </nav>
        </div>
      </header>

      {/* Hero: full-bleed media to the very top, no text over it */}
      <section id="topo" className="relative h-screen min-h-[560px] w-full overflow-hidden bg-ink">
        <video
          ref={heroRef}
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onCanPlay={() => setHeroReady(true)}
          onPlaying={() => setHeroReady(true)}
          className={`fx-video absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${heroReady ? "opacity-100" : "opacity-0"}`}
        />
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
          Transformamos talento, criatividade e boas ideias em noites inesquecíveis — do primeiro encontro até a luz do palco.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a href="#agenda" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
            <CalendarDays className="h-5 w-5" /> AGENDE SEU SHOW
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
            <img src={palcoShow} alt="Banda em palco durante show produzido pela Amorim" loading="lazy" width={1280} height={864} className="rounded-2xl shadow-glow" />
          </div>
          <div data-reveal className="reveal" style={delay(140)}>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Sobre nós</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">MUITO MAIS QUE PRODUÇÃO, UMA PAIXÃO PELO PALCO!</h2>
            <p className="mt-5 text-muted-foreground">
              A Amorim Consultoria e Produções existe para tirar shows do papel. Cuidamos de data, casa, equipe, estrutura e público,
              para que o artista se preocupe apenas em brilhar quando a luz acender.
            </p>
            <p className="mt-4 text-muted-foreground">Confiança, profissionalismo e cuidado em cada detalhe da noite.</p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="mx-auto max-w-6xl px-5 py-24">
        <div data-reveal className="reveal text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Serviços</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">NOSSA PRODUÇÃO, SEU SHOW!</h2>
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

      {/* Sonorização de ambientes */}
      <section id="sonorizacao" className="relative overflow-hidden bg-ink py-24 text-ink-foreground">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div data-reveal className="reveal text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Serviços</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">SONORIZAÇÃO DE AMBIENTES</h2>
          </div>
          <div className="mt-12 flex items-end justify-center gap-6 md:gap-16">
            {[0, 1, 2].map((s) => (
              <div key={s} className={`relative flex flex-col items-center gap-3 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-5 ${s === 1 ? "md:scale-125" : ""}`}>
                {[0, 1].map((c) => (
                  <div key={c} className="relative flex items-center justify-center">
                    {[0, 1, 2].map((w) => (
                      <span key={w} className="speaker-wave absolute h-16 w-16 rounded-full border-2 border-primary" style={{ animationDelay: `${w * 0.5 + s * 0.2}s` }} />
                    ))}
                    <div className="speaker-cone flex h-16 w-16 items-center justify-center rounded-full border-4 border-ink-foreground/30 bg-ink" style={{ animationDelay: `${s * 0.15}s` }}>
                      <div className="h-6 w-6 rounded-full bg-gradient-primary shadow-glow" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {sonorizacao.map(({ icon: I, t }, i) => (
              <div key={t} data-reveal className="reveal flex items-center gap-4 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 transition-all hover:border-primary hover:shadow-glow" style={delay(i * 80)}>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground"><I className="h-6 w-6" /></div>
                <p className="border-l-2 border-primary pl-4 text-sm md:text-base">{t}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#agenda" className="inline-block rounded-full bg-gradient-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-glow">SOLICITAR ORÇAMENTO</a>
          </div>
        </div>
      </section>

      {/* Palcos */}
      <section id="palcos" className="bg-secondary py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div data-reveal className="reveal text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Palcos</p>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">A GENTE LEVA SEU SHOW AOS PALCOS MAIS PEDIDOS DE SÃO PAULO</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Trabalhamos com a agenda dos espaços mais disputados da cidade — com destaque para as unidades do Sesc — e para teatros,
              casas de show e festivais.
            </p>
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {venues.map((v, i) => (
              <li key={v} data-reveal className="reveal flex items-center gap-2 rounded-full border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-primary" style={delay(i * 70)}>
                <MapPin className="h-4 w-4 text-primary" /> {v}
              </li>
            ))}
          </ul>
          <div data-reveal className="reveal mt-10 text-center" style={delay(200)}>
            <a href="#agenda" className="inline-block rounded-full bg-gradient-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow">CONSULTAR DISPONIBILIDADE DE DATA</a>
          </div>
        </div>
      </section>

      {/* Vídeo */}
      <section id="video" className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-5xl px-5 text-center">
          <div data-reveal className="reveal">
            <h2 className="text-3xl font-extrabold md:text-4xl">CONHEÇA A <span className="text-gradient-primary">AMORIM!</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-foreground/70">Conheça nosso trabalho, nossa estrutura e a dedicação que colocamos em cada espetáculo.</p>
          </div>
          <div data-reveal className="reveal fx-drag" style={delay(160)}>
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? "Pausar o vídeo" : "Reproduzir o vídeo"}
              className="relative mt-10 block aspect-video w-full overflow-hidden rounded-2xl border border-ink-foreground/10 bg-ink"
            >
              <video
                ref={sectionRef}
                src={heroVideo.url}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                className="h-full w-full object-cover"
              />
              <span className={`absolute inset-0 flex items-center justify-center bg-ink/45 transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`}>
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-glow"><Play className="ml-1 h-9 w-9 text-primary-foreground" /></span>
              </span>
            </button>
          </div>
          <button type="button" onClick={() => setPlaying((v) => !v)} className="mt-8 inline-block rounded-full bg-gradient-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow">
            {playing ? "PAUSAR O VÍDEO" : "ASSISTA AO VÍDEO"}
          </button>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="relative overflow-hidden bg-ink py-24 text-ink-foreground">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5">
        <div data-reveal className="reveal text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Agenda</p>
          <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">SEU PRÓXIMO SHOW <span className="text-gradient-primary">COMEÇA AQUI!</span></h2>
          <p className="mt-3 text-ink-foreground/70">Escolha a data no calendário e envie sua solicitação.</p>
        </div>
        {sent ? (
          <div className="mt-10 rounded-2xl border border-primary bg-ink-foreground/5 p-8 text-center">
            <h3 className="text-xl font-bold text-primary">Solicitação recebida!</h3>
            <p className="mt-2 text-ink-foreground/70">Obrigado! Vamos analisar a disponibilidade para {date ? format(date, "dd 'de' MMMM", { locale: ptBR }) : "sua data"} e entraremos em contato.</p>
          </div>
        ) : (
          <form onSubmit={submit} data-reveal className="reveal mt-12 grid gap-8 rounded-3xl border border-primary/40 bg-ink-foreground/5 p-6 shadow-glow md:grid-cols-[auto_1fr] md:p-8" style={delay(120)}>
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
              <input required name="nome" placeholder="Nome" className={field} />
              <input required name="telefone" placeholder="Telefone / WhatsApp" className={field} />
              <select required name="tipoProducao" defaultValue="" className={`${field} sm:col-span-2`}>
                <option value="" disabled>Tipo de produção</option>
                {services.map((s) => <option key={s.t} className="text-foreground">{s.t}</option>)}
              </select>
              <select required name="localDesejado" defaultValue="" className={`${field} sm:col-span-2`}>
                <option value="" disabled>Local desejado</option>
                {venues.map((v) => <option key={v} className="text-foreground">{v}</option>)}
                <option className="text-foreground">Outro local</option>
              </select>
              <select required name="horario" defaultValue="" className={`${field} sm:col-span-2`}>
                <option value="" disabled>Horário</option>
                {["09:00", "11:00", "14:00", "16:00", "19:00", "21:00"].map((h) => <option key={h} className="text-foreground">{h}</option>)}
              </select>
              <textarea rows={4} name="mensagem" placeholder="Conte sobre o seu show" className={`${field} sm:col-span-2`} />
              <button disabled={!date || sending} className="rounded-full bg-gradient-primary px-7 py-4 font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-50 sm:col-span-2">
                {sending ? "ENVIANDO..." : date ? "SOLICITAR AGENDAMENTO" : "ESCOLHA UMA DATA NO CALENDÁRIO"}
              </button>
              {erro && <p role="alert" className="text-sm font-semibold text-primary sm:col-span-2">{erro}</p>}
            </div>
          </form>
        )}
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="bg-secondary py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 data-reveal className="reveal text-center text-3xl font-extrabold md:text-4xl">NOSSOS PALCOS, NOSSO PÚBLICO</h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((img, i) => (
              <div key={i} data-reveal className={`reveal ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} style={delay(i * 80)}>
                <img src={img} alt="Show produzido pela Amorim" loading="lazy" width={1280} height={864} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h2 data-reveal className="reveal text-3xl font-extrabold md:text-4xl">VAMOS SUBIR NESSE <span className="text-gradient-primary">PALCO JUNTOS?</span></h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[[MessageCircle, "WhatsApp", "(11) 95303-8954"], [Phone, "Telefone", "(11) 95303-8954"], [Mail, "E-mail", "contato@amorim.com.br"], [Instagram, "Instagram", "@amorimproducoes"]].map(([I, l, v], i) => {
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
        <div data-reveal className="reveal mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-2">
          <div className="flex justify-center md:justify-start">
            <img src={logo.url} alt="Amorim Consultoria e Produções" loading="lazy" className="h-24 w-auto" />
          </div>
          <div className="flex flex-col items-center gap-4 text-center md:items-end md:text-right">
            <p className="font-display font-bold tracking-wide">AMORIM CONSULTORIA E PRODUÇÕES</p>
            <nav className="flex flex-wrap justify-center gap-5 text-sm text-ink-foreground/70 md:justify-end">
              {nav.map(([l, h]) => <a key={h} href={h} className="hover:text-primary">{l}</a>)}
              <Link to="/portfolio" className="hover:text-primary">Portfólio artístico</Link>
              <a href="#" className="hover:text-primary">Política de Privacidade</a>
            </nav>
            <p className="text-xs text-ink-foreground/50">© {new Date().getFullYear()} Amorim Consultoria e Produções. Todos os direitos reservados.</p>
          </div>
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
