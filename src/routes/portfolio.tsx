import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import pdf from "@/assets/amorim-casting-de-artistas.pdf.asset.json";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfólio Artístico — Amorim Consultoria e Produções" },
      { name: "description", content: "Casting de artistas da Amorim: conheça os shows e artistas disponíveis para Sescs, teatros e casas de show." },
      { property: "og:title", content: "Portfólio Artístico — Amorim" },
      { property: "og:description", content: "Casting de artistas e shows disponíveis para a sua agenda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const pages = Array.from({ length: 18 }, (_, i) => `/portfolio/pagina-${String(i + 1).padStart(2, "0")}.jpg`);

function Portfolio() {
  return (
    <div className="min-h-screen bg-ink text-ink-foreground">
      <header className="sticky top-0 z-50 bg-ink/90 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5">
          <Link to="/" aria-label="Início">
            <img src="/amorim-logo.png" alt="Amorim Consultoria e Produções" className="h-12 w-auto" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Voltar ao site
          </Link>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-5 py-14 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Portfólio artístico</p>
        <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">CASTING DE <span className="text-gradient-primary">ARTISTAS</span></h1>
        <a href={pdf.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 font-bold text-primary-foreground shadow-glow">
          <Download className="h-5 w-5" /> BAIXAR PDF
        </a>
      </section>
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-5 pb-24">
        {pages.map((src, i) => (
          <img key={src} src={src} alt={`Portfólio artístico — página ${i + 1}`} loading={i < 2 ? "eager" : "lazy"} width={910} height={1287} className="w-full rounded-xl shadow-glow" />
        ))}
      </div>
    </div>
  );
}
