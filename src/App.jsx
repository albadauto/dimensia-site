import React, { useEffect, useState } from "react";
import { Icon, Logo } from "./ui";
import { NeuralField, FaceScan, Scramble, Terminal, useGlobalFx } from "./fx";

const APP = (
  import.meta.env.VITE_APP_URL || "https://app.dimensia.com.br"
).replace(/\/$/, "");
const SITE = "https://dimensia.com.br";
const posts = [
  {
    slug: "planejamento-facial-3d-na-pratica",
    category: "Planejamento 3D",
    title: "Planejamento facial 3D na prática: do registro ao acompanhamento",
    description:
      "Entenda como fotografias padronizadas se transformam em uma visualização tridimensional útil para organizar o planejamento e melhorar a comunicação.",
    date: "5 de outubro de 2026",
    read: "7 min",
    icon: "cube",
    sections: [
      [
        "O que é o planejamento facial 3D?",
        "É uma forma visual de organizar a avaliação do rosto e registrar pontos de interesse sobre uma superfície tridimensional. A tecnologia não substitui o exame clínico nem decide o tratamento: ela ajuda o profissional a documentar, revisar e comunicar seu próprio planejamento.",
      ],
      [
        "Por que a padronização importa",
        "Enquadramento, iluminação, distância e posição da cabeça influenciam a reconstrução. Uma captura guiada reduz variações e cria registros mais consistentes entre consultas.",
      ],
      [
        "Da captura ao modelo",
        "O sistema identifica referências faciais, estima a geometria e combina os ângulos disponíveis. Depois apresenta uma superfície navegável onde o profissional confere contornos e registra as regiões planejadas.",
      ],
      [
        "Uso responsável",
        "O modelo é um apoio visual. Medidas, doses, indicação e execução permanecem sob responsabilidade do profissional habilitado. Consentimento e políticas compatíveis com a LGPD são essenciais.",
      ],
    ],
  },
  {
    slug: "fotos-clinicas-padronizadas",
    category: "Boas práticas",
    title: "Como produzir fotos clínicas mais consistentes",
    description:
      "Um guia simples de iluminação, enquadramento e posicionamento para melhorar o histórico visual dos pacientes.",
    date: "2 de outubro de 2026",
    read: "5 min",
    icon: "camera",
    sections: [
      [
        "Crie um padrão repetível",
        "Defina um local fixo, uma distância aproximada e uma sequência de ângulos. O objetivo é tornar os registros comparáveis entre diferentes momentos.",
      ],
      [
        "Prefira luz uniforme",
        "Sombras duras escondem contornos e alteram a percepção de volume. Use luz frontal suave, evite contraluz e mantenha a mesma condição sempre que possível.",
      ],
      [
        "Oriente a posição",
        "Peça expressão neutra, cabelo afastado e cabeça alinhada. Nas vistas laterais, gire a cabeça sem inclinar o queixo.",
      ],
      [
        "Revise antes de salvar",
        "Confira nitidez, presença de apenas um rosto, enquadramento completo e ausência de objetos cobrindo regiões importantes.",
      ],
    ],
  },
  {
    slug: "lgpd-imagens-de-pacientes",
    category: "Privacidade",
    title: "LGPD e imagens de pacientes: cuidados essenciais",
    description:
      "Consentimento, acesso e armazenamento: pontos fundamentais para tratar registros faciais com responsabilidade.",
    date: "28 de setembro de 2026",
    read: "6 min",
    icon: "shield",
    sections: [
      [
        "Por que essas imagens merecem atenção",
        "Fotografias clínicas podem identificar uma pessoa e revelar informações relacionadas à saúde. A clínica deve definir finalidade clara, limitar o acesso e adotar medidas proporcionais ao risco.",
      ],
      [
        "Consentimento e transparência",
        "O paciente precisa saber por que a imagem será utilizada, por quanto tempo ficará armazenada e quem poderá acessá-la.",
      ],
      [
        "Controle de acesso",
        "Cada profissional deve utilizar seu próprio acesso. Evite senhas compartilhadas e revise permissões quando alguém muda de função ou deixa a equipe.",
      ],
      [
        "Políticas internas",
        "Treinamento, rotinas de descarte e um canal para solicitações dos titulares completam uma prática responsável. Consulte apoio jurídico para adequar seus documentos.",
      ],
    ],
  },
  {
    slug: "relatorio-facial-comunicacao-paciente",
    category: "Experiência do paciente",
    title: "Como um relatório visual melhora a comunicação",
    description:
      "Organize o planejamento em um documento claro, profissional e fácil de consultar antes e depois do atendimento.",
    date: "22 de setembro de 2026",
    read: "4 min",
    icon: "file",
    sections: [
      [
        "Clareza reduz ruído",
        "Um relatório reúne regiões, produtos, quantidades e observações em uma estrutura única, evitando informações espalhadas.",
      ],
      [
        "Uma conversa mais visual",
        "Pontos numerados e vistas do rosto ajudam a explicar o planejamento sem depender apenas de termos técnicos. O documento apoia a conversa, sem prometer resultados.",
      ],
      [
        "Continuidade do atendimento",
        "No retorno, a equipe recupera o contexto rapidamente. Isso favorece consistência mesmo quando mais de um profissional participa da jornada.",
      ],
    ],
  },
];
const features = [
  [
    "camera",
    "Captura guiada",
    "Orientações de enquadramento, posição e estabilidade para registros mais consistentes.",
  ],
  [
    "cube",
    "Visualização facial 3D",
    "Explore volume, relevo e textura a partir de diferentes ângulos.",
  ],
  [
    "target",
    "Mapeamento de aplicações",
    "Associe região, produto, quantidade, lote, validade e observações a cada ponto.",
  ],
  [
    "sparkles",
    "Apoio de IA",
    "Automatize qualidade e reconstrução mantendo a decisão clínica com o profissional.",
  ],
  [
    "users",
    "Histórico por paciente",
    "Centralize fotografias, planejamentos e relatórios em uma linha do tempo.",
  ],
  [
    "file",
    "Relatórios profissionais",
    "Gere documentos claros com pontos numerados, totais e vistas selecionadas.",
  ],
];

function Link({ href, children, ...p }) {
  const go = (e) => {
    if (/^(https?:|mailto:|tel:)/.test(href) || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    history.pushState({}, "", href);
    dispatchEvent(new PopStateEvent("popstate"));
    scrollTo(0, 0);
  };
  return (
    <a href={href} onClick={go} {...p}>
      {children}
    </a>
  );
}
function Seo({ title, description, path = "/", type = "website" }) {
  useEffect(() => {
    const t =
      title === "Dimensia"
        ? "Dimensia | Planejamento facial 3D para clínicas"
        : `${title} | Dimensia`;
    document.title = t;
    const m = {
      description,
      "og:title": t,
      "og:description": description,
      "og:url": SITE + path,
      "og:type": type,
      "twitter:title": t,
      "twitter:description": description,
    };
    Object.entries(m).forEach(([k, v]) => {
      const a = k.startsWith("og:") ? "property" : "name";
      let x = document.head.querySelector(`meta[${a}="${k}"]`);
      if (!x) {
        x = document.createElement("meta");
        x.setAttribute(a, k);
        document.head.appendChild(x);
      }
      x.content = v;
    });
    document.querySelector('link[rel="canonical"]').href = SITE + path;
  }, [title, description, path, type]);
  return null;
}

const NAV = [
  ["/produto", "Produto"],
  ["/como-funciona", "Como funciona"],
  ["/seguranca", "Segurança"],
  ["/planos", "Planos"],
  ["/blog", "Blog"],
];

function Header() {
  const [o, setO] = useState(false);
  const here = location.pathname.replace(/\/$/, "") || "/";
  return (
    <header className="site-header">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Dimensia — início">
          <Logo variant="light" className="h-9 sm:h-10" />
        </Link>
        <nav className="hidden items-center lg:flex">
          {NAV.map(([h, l]) => (
            <Link
              key={h}
              href={h}
              className={`nav-link ${here.startsWith(h) ? "active" : ""}`}
            >
              {l}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <span className="mono mr-2 hidden items-center gap-2 text-[10px] uppercase tracking-[.18em] text-slate-500 xl:inline-flex">
            <span className="status-dot" /> IA online
          </span>
          <a href={APP + "/entrar"} className="nav-link">
            Entrar
          </a>
          <a href={APP + "/cadastro"} className="btn-primary">
            Teste grátis <Icon name="arrow" />
          </a>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
          onClick={() => setO(!o)}
          aria-label={o ? "Fechar menu" : "Abrir menu"}
        >
          <Icon name={o ? "x" : "menu"} />
        </button>
      </div>
      {o && (
        <div className="border-t border-white/10 bg-void/95 px-5 pb-5 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col py-3">
            {NAV.map(([h, l], i) => (
              <Link
                key={h}
                href={h}
                onClick={() => setO(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-200"
              >
                <span className="mono text-[10px] text-cyan-400">0{i + 1}</span>
                {l}
              </Link>
            ))}
          </nav>
          <div className="grid grid-cols-2 gap-2">
            <a href={APP + "/entrar"} className="btn-ghost">
              Entrar
            </a>
            <a href={APP + "/cadastro"} className="btn-primary">
              Teste grátis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
function Footer() {
  const group = (t, a) => (
    <div>
      <p className="footer-title">{t}</p>
      <nav className="mt-5 flex flex-col items-start gap-3">
        {a.map(([h, l]) => (
          <Link key={h} href={h} className="transition hover:text-cyan-300">
            {l}
          </Link>
        ))}
      </nav>
    </div>
  );
  return (
    <footer className="overflow-hidden border-t border-white/[.06] bg-void/80 px-5 pt-16 text-sm text-slate-400 backdrop-blur sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" className="h-9" />
          <p className="mt-5 max-w-sm leading-6">
            Planejamento facial inteligente em 3D para clínicas que valorizam
            organização, clareza e apresentação profissional.
          </p>
          <p className="mono mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-slate-500">
            <span className="status-dot" /> Todos os sistemas operacionais
          </p>
        </div>
        {group("Produto", [
          ["/produto", "Recursos"],
          ["/como-funciona", "Como funciona"],
          ["/planos", "Planos"],
          ["/seguranca", "Segurança"],
        ])}
        {group("Dimensia", [
          ["/blog", "Blog"],
          ["/sobre", "Sobre nós"],
          ["/contato", "Contato"],
        ])}
        <div>
          <p className="footer-title">Acesso</p>
          <div className="mt-5 flex flex-col items-start gap-3">
            <a href={APP + "/entrar"} className="transition hover:text-cyan-300">
              Entrar no sistema
            </a>
            <a href={APP + "/cadastro"} className="transition hover:text-cyan-300">
              Criar conta grátis
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/[.06] pt-7 text-xs sm:flex-row sm:justify-between">
        <span className="mono">
          © {new Date().getFullYear()} DIMENSIA VISAO COMPUTACIONAL E IA I.S · CNPJ 69.533.366/0001-22
        </span>
        <span>Ferramenta de apoio — não substitui avaliação profissional.</span>
      </div>
      <div className="footer-word mt-6" aria-hidden="true">
        DIMENSIA
      </div>
    </footer>
  );
}
function WhatsAppButton() {
  const message = encodeURIComponent(
    "Olá! Conheci a Dimensia pelo site e gostaria de saber mais sobre a plataforma.",
  );
  return (
    <a
      href={`https://wa.me/5511990029866?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Conversar com a Dimensia pelo WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.05 3.2A12.7 12.7 0 0 0 5.28 22.63L3.6 28.8l6.3-1.65A12.74 12.74 0 1 0 16.05 3.2Zm0 2.15a10.58 10.58 0 1 1-5.4 19.67l-.38-.23-3.73.98 1-3.63-.25-.4a10.56 10.56 0 0 1 8.76-16.39Zm-4.54 4.7c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.14.2 2.09 3.34 5.17 4.55 2.55 1 3.08.8 3.64.75.56-.05 1.8-.74 2.06-1.45.25-.72.25-1.33.18-1.46-.08-.12-.28-.2-.59-.35-.3-.15-1.8-.9-2.08-.99-.28-.1-.48-.15-.68.15-.2.3-.79.99-.96 1.2-.18.2-.36.23-.66.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.51-1.8-1.69-2.1-.18-.3-.02-.46.13-.61.14-.13.3-.35.46-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.93-2.22-.24-.58-.5-.5-.68-.51h-.58Z" />
      </svg>
    </a>
  );
}

function Layout({ children }) {
  useGlobalFx(location.pathname);
  return (
    <div className="app-shell">
      <NeuralField />
      <div id="cursor-glow" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function Hero({ eyebrow, title, text, code, children }) {
  return (
    <section className="relative overflow-hidden border-b border-white/[.05]">
      <div className="hero-grid absolute inset-0" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 text-white sm:px-8 sm:pb-24 sm:pt-28">
        <p className="mono mb-6 text-[10px] uppercase tracking-[.25em] text-slate-500">
          sys://dimensia/{code || eyebrow.toLowerCase().replace(/\s+/g, "-")}
        </p>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-.03em] sm:text-6xl">
          <span className="text-chrome">
            <Scramble text={title} />
          </span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">{text}</p>
        {children}
      </div>
    </section>
  );
}

const Cta = () => (
  <section className="px-5 py-24 sm:px-8">
    <div
      data-reveal
      className="conic relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#04120e] px-6 py-20 text-center"
    >
      <div className="hero-grid absolute inset-0 opacity-70" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-500/20 blur-[90px]" />
      <div className="relative">
        <p className="eyebrow">Comece agora</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-.03em] text-white sm:text-6xl">
          Dê uma <span className="text-gradient">nova dimensão</span> ao seu
          planejamento.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-slate-400">
          Conheça todos os recursos por 14 dias, sem cartão.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={APP + "/cadastro"} className="btn-primary px-7! py-4! text-sm!">
            Começar teste grátis <Icon name="arrow" />
          </a>
          <Link href="/contato" className="btn-ghost px-7! py-4! text-sm!">
            Falar com a equipe
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Card = ({ icon, title, text, index, reveal }) => (
  <article className="content-card spot h-full" data-reveal={reveal}>
    {index && <span className="card-index">{index}</span>}
    <div className="icon-box">
      <Icon name={icon} className="h-5 w-5" />
    </div>
    <h3 className="mt-6 text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
  </article>
);

function Scanner() {
  return (
    <div className="scanner" data-reveal="2">
      <div className="scanlines absolute inset-0 rounded-[2rem]" />
      <div className="hud-ring" />
      <div className="hud-ring r2" />
      <FaceScan />
      <span className="hud-corner tl" />
      <span className="hud-corner tr" />
      <span className="hud-corner bl" />
      <span className="hud-corner br" />
      <span className="hud-chip left-6 top-6 flex items-center gap-2">
        <span className="status-dot" /> Escaneando
      </span>
      <span className="hud-chip right-6 top-6">Mesh 3D · ativo</span>
      <div className="hud-chip bottom-6 left-6 right-6 py-3!">
        <div className="mb-2 flex justify-between">
          <span>Reconstrução facial</span>
          <span className="text-mint-300">8 marcos</span>
        </div>
        <div className="hud-bar">
          <i />
        </div>
      </div>
    </div>
  );
}

const TICKER = [
  "Visão computacional",
  "Reconstrução 3D",
  "Referências faciais",
  "Captura guiada",
  "Mapeamento de aplicações",
  "Relatórios inteligentes",
  "Histórico do paciente",
  "LGPD by design",
];

function Home() {
  return (
    <Layout>
      <Seo
        title="Dimensia"
        description="Planejamento facial 3D, captura guiada e relatórios profissionais para clínicas."
      />
      <section className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-floor" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pb-32 lg:pt-24">
          <div className="text-white">
            <span className="pill-dark" data-reveal>
              <Icon name="sparkles" /> Inteligência artificial · Harmonização facial
            </span>
            <h1 className="hero-title mt-8">
              <span className="text-chrome block">
                <Scramble text="Planeje com clareza." />
              </span>
              <span
                className="glitch text-gradient block"
                data-text="Apresente com confiança."
              >
                <Scramble text="Apresente com confiança." delay={500} />
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400" data-reveal="2">
              Transforme registros faciais em visualizações 3D com apoio de IA,
              organize pontos de aplicação e entregue relatórios profissionais.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal="3">
              <a href={APP + "/cadastro"} className="btn-primary px-7! py-4! text-sm!">
                Testar grátis <Icon name="arrow" />
              </a>
              <Link href="/como-funciona" className="btn-ghost px-7! py-4! text-sm!">
                <Icon name="cube" /> Ver como funciona
              </Link>
            </div>
            <div className="mono mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[11px] uppercase tracking-[.18em] text-slate-500" data-reveal="4">
              <span className="flex items-center gap-2">
                <Icon name="check" className="h-3.5 w-3.5 text-mint-400" /> 14 dias grátis
              </span>
              <span className="flex items-center gap-2">
                <Icon name="check" className="h-3.5 w-3.5 text-mint-400" /> Sem cartão
              </span>
              <span className="flex items-center gap-2">
                <Icon name="check" className="h-3.5 w-3.5 text-mint-400" /> 100% na nuvem
              </span>
            </div>
          </div>
          <Scanner />
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="marquee-item">
              <b>◆</b> {t}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <div className="glass grid grid-cols-2 divide-white/[.06] lg:grid-cols-4 lg:divide-x" data-reveal>
          {[
            ["3D", "Visualização navegável"],
            ["IA", "Validação da captura"],
            ["14", "Dias de teste grátis"],
            ["0", "Instalação · 100% web"],
          ].map(([n, l]) => (
            <div key={l} className="stat">
              <strong className="text-gradient">{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Plataforma completa</p>
            <h2>
              Do primeiro registro <span className="text-gradient">ao relatório final.</span>
            </h2>
          </div>
          <p>
            Menos informações espalhadas e mais consistência na rotina da
            clínica.
          </p>
        </div>
        <div className="card-grid mt-14">
          {features.map(([i, t, d], k) => (
            <Card
              key={t}
              icon={i}
              title={t}
              text={d}
              index={`0${k + 1}`}
              reveal={String((k % 3) + 1)}
            />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/[.05]">
        <div className="orb orb-b" />
        <div className="section relative z-10 grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow">Motor de IA</p>
            <h2 className="section-title">
              Da foto ao modelo 3D <span className="text-gradient">em um fluxo.</span>
            </h2>
            <p className="section-copy">
              A inteligência artificial valida a qualidade da captura, identifica
              referências faciais e reconstrói a superfície — você só revisa e
              planeja.
            </p>
            <div className="mt-10">
              <Terminal />
            </div>
          </div>
          <div data-reveal="2">
            <ol className="workflow-list">
              {[
                ["01", "users", "Cadastre e fotografe", "Organize os dados do paciente e faça a captura guiada pelo celular ou tablet."],
                ["02", "cube", "Explore e planeje", "Revise a visualização 3D e registre cada ponto com produto, região e quantidade."],
                ["03", "file", "Documente e acompanhe", "Gere um relatório profissional e mantenha todo o histórico centralizado."],
              ].map(([n, icon, title, text]) => (
                <li key={n} className="workflow-card spot">
                  <span className="workflow-number">{n}</span>
                  <span className="workflow-icon">
                    <Icon name={icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <strong className="font-display block text-base text-white">{title}</strong>
                    <span className="mt-1.5 block text-sm leading-6 text-slate-400">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link href="/como-funciona" className="btn-ghost mt-8">
              Ver o passo a passo <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <BlogPreview />
      <Cta />
    </Layout>
  );
}

function Product() {
  return (
    <Layout>
      <Seo
        title="Produto"
        path="/produto"
        description="Recursos da plataforma Dimensia para captura, planejamento 3D e relatórios."
      />
      <Hero
        eyebrow="Produto"
        title="Uma visão completa do planejamento facial."
        text="Captura, visualização, mapeamento, documentação e gestão em uma experiência construída para a rotina clínica."
      />
      <section className="section">
        <div className="card-grid">
          {features.map(([i, t, d], k) => (
            <Card key={t} icon={i} title={t} text={d} index={`0${k + 1}`} reveal={String((k % 3) + 1)} />
          ))}
        </div>
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {[
            ["camera", "Captura e qualidade", "A câmera orienta posição, enquadramento e estabilidade. A revisão acontece antes de salvar."],
            ["cube", "Reconstrução e visualização", "A superfície 3D oferece volume, relevo e textura para explorar o registro."],
            ["target", "Pontos e produtos", "Cada marcação carrega região, produto, quantidade, lote, validade e observações."],
            ["file", "Relatório e histórico", "O PDF organiza os pontos e tudo permanece associado ao paciente."],
          ].map(([ic, t, d], k) => (
            <div key={t} className="glass spot flex gap-6 p-8" data-reveal={String((k % 2) + 1)}>
              <span className="mono text-sm text-cyan-400">/0{k + 1}</span>
              <div>
                <div className="flex items-center gap-3">
                  <Icon name={ic} className="h-5 w-5 text-mint-300" />
                  <h2 className="text-xl font-semibold text-white">{t}</h2>
                </div>
                <p className="mt-3 leading-7 text-slate-400">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Cta />
    </Layout>
  );
}

function How() {
  const a = [
    ["users", "Organize o paciente", "Centralize dados e histórico."],
    ["camera", "Faça a captura guiada", "Siga instruções de alinhamento e estabilidade."],
    ["sparkles", "Processe as imagens", "A qualidade é avaliada antes da reconstrução."],
    ["cube", "Explore o modelo 3D", "Gire, aproxime e alterne a visualização."],
    ["target", "Registre o planejamento", "Informe região, produto, quantidade e observações."],
    ["file", "Gere o relatório", "Crie um PDF claro para documentação e comunicação."],
  ];
  return (
    <Layout>
      <Seo
        title="Como funciona"
        path="/como-funciona"
        description="Passo a passo do planejamento facial 3D no Dimensia."
      />
      <Hero
        eyebrow="Como funciona"
        title="Um processo claro, do registro ao relatório."
        text="O fluxo reduz tarefas manuais e mantém o profissional no controle."
      />
      <section className="section">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <ol className="grid gap-5 sm:grid-cols-2">
            {a.map(([i, t, d], k) => (
              <li key={t}>
                <Card icon={i} title={t} text={d} index={`ETAPA 0${k + 1}`} reveal={String((k % 2) + 1)} />
              </li>
            ))}
          </ol>
          <div className="lg:sticky lg:top-28" data-reveal="2">
            <Terminal />
          </div>
        </div>
        <div className="mt-14 flex gap-5 rounded-3xl border border-amber-400/25 bg-amber-400/[.05] p-7 backdrop-blur" data-reveal>
          <Icon name="info" className="mt-0.5 h-6 w-6 shrink-0 text-amber-300" />
          <div>
            <b className="font-display text-amber-100">Tecnologia de apoio, decisão profissional</b>
            <p className="mt-2 text-sm leading-6 text-amber-100/60">
              O Dimensia não realiza diagnóstico, não prescreve procedimentos e
              não substitui avaliação presencial ou responsabilidade profissional.
            </p>
          </div>
        </div>
      </section>
      <Cta />
    </Layout>
  );
}

function Security() {
  return (
    <Layout>
      <Seo
        title="Segurança e LGPD"
        path="/seguranca"
        description="Princípios de segurança, privacidade e LGPD no Dimensia."
      />
      <Hero
        eyebrow="Segurança e privacidade"
        code="seguranca"
        title="Confiança também é parte do planejamento."
        text="Proteção de dados orienta a forma como acessos, pacientes, imagens e documentos são organizados."
      />
      <section className="section">
        <div className="card-grid">
          {[
            ["lock", "Acesso individual", "Credenciais próprias para cada membro."],
            ["home", "Isolamento por clínica", "Dados separados entre organizações."],
            ["shield", "Proteção de dados", "Camadas de proteção no armazenamento e comunicação."],
            ["users", "Permissões de equipe", "Controle sobre quem participa da operação."],
            ["archive", "Histórico centralizado", "Menos cópias espalhadas em dispositivos pessoais."],
            ["check", "Consentimento consciente", "Autorizações adequadas à finalidade de uso."],
          ].map(([i, t, d], k) => (
            <Card key={t} icon={i} title={t} text={d} index={`0${k + 1}`} reveal={String((k % 3) + 1)} />
          ))}
        </div>
        <div className="glass mt-16 grid gap-10 p-8 sm:p-12 lg:grid-cols-2" data-reveal>
          <div>
            <p className="eyebrow">Responsabilidade compartilhada</p>
            <h2 className="section-title">
              A rotina da clínica <span className="text-gradient">completa o cuidado.</span>
            </h2>
          </div>
          <div className="space-y-5 text-slate-400">
            {[
              ["Finalidade clara.", "Explique como fotografias e dados serão usados."],
              ["Acessos individuais.", "Não compartilhe senhas e revise permissões."],
              ["Políticas internas.", "Treine a equipe e defina retenção e descarte."],
              ["Orientação especializada.", "Adeque documentos à realidade da clínica."],
            ].map(([b, t]) => (
              <p key={b} className="flex gap-3">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-mint-400" />
                <span>
                  <b className="text-white">{b}</b> {t}
                </span>
              </p>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </Layout>
  );
}

function Pricing() {
  return (
    <Layout>
      <Seo
        title="Planos"
        path="/planos"
        description="Plano do Dimensia com 14 dias grátis, sem cartão."
      />
      <Hero
        eyebrow="Planos"
        title="Simples para começar. Completo para crescer."
        text="Um plano transparente por clínica com os recursos essenciais para organizar o planejamento facial."
      />
      <section className="section">
        <div className="relative mx-auto max-w-xl" data-reveal>
          <div className="absolute inset-x-10 -inset-y-6 rounded-full bg-mint-500/20 blur-[80px]" />
          <div className="conic relative rounded-[2rem] bg-[#04120e]/95 p-8 sm:p-10">
            <div className="flex items-center justify-between">
              <span className="pill-light">14 dias grátis</span>
              <span className="mono text-[10px] uppercase tracking-[.2em] text-slate-500">plano/único</span>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-white">Dimensia completo</h2>
            <div className="mt-4 flex items-end gap-2">
              <b className="font-display text-6xl tracking-tight text-gradient">R$ 149</b>
              <span className="mb-2 text-slate-500">/ mês</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Uma assinatura por clínica. Sem fidelidade.
            </p>
            <ul className="mt-8 space-y-3.5 border-t border-white/[.07] pt-8">
              {[
                "Pacientes e planejamentos ilimitados",
                "Captura guiada e visualização 3D",
                "Equipe com múltiplos profissionais",
                "Relatórios PDF ilimitados",
                "Catálogo de produtos",
                "Histórico e suporte",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border border-mint-400/40 bg-mint-400/10">
                    <Icon name="check" className="h-3.5 w-3.5 text-mint-300" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <a href={APP + "/cadastro"} className="btn-primary mt-9 w-full py-4! text-sm!">
              Começar teste grátis <Icon name="arrow" />
            </a>
          </div>
        </div>
      </section>
      <Cta />
    </Layout>
  );
}

function PostCard({ p, reveal }) {
  return (
    <article
      className="group spot h-full overflow-hidden rounded-3xl border border-white/[.07] bg-white/[.02] backdrop-blur transition hover:-translate-y-1"
      data-reveal={reveal}
    >
      <div className="blog-cover">
        <Icon name={p.icon} className="h-12 w-12" strokeWidth={1.3} />
        <span className="mono absolute bottom-3 left-4 text-[10px] uppercase tracking-[.2em] text-cyan-300/70">
          {p.category}
        </span>
      </div>
      <div className="p-6">
        <p className="mono text-[10px] uppercase tracking-[.18em] text-slate-500">
          {p.date} · {p.read}
        </p>
        <h3 className="mt-3 text-lg font-semibold leading-6 text-white transition group-hover:text-cyan-300">
          {p.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">{p.description}</p>
        <Link
          href={"/blog/" + p.slug}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint-300"
        >
          Ler artigo <Icon name="arrow" />
        </Link>
      </div>
    </article>
  );
}
function BlogPreview() {
  return (
    <section className="section">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">Conteúdo para clínicas</p>
          <h2>Conhecimento para uma rotina consistente.</h2>
        </div>
        <Link href="/blog" className="btn-ghost">
          Ver todos <Icon name="arrow" />
        </Link>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((p, k) => (
          <PostCard key={p.slug} p={p} reveal={String(k + 1)} />
        ))}
      </div>
    </section>
  );
}
function Blog() {
  return (
    <Layout>
      <Seo
        title="Blog"
        path="/blog"
        description="Conteúdos sobre planejamento facial 3D, fotografia clínica e gestão."
      />
      <Hero
        eyebrow="Blog Dimensia"
        code="blog"
        title="Tecnologia e boas práticas para a rotina clínica."
        text="Conteúdo direto sobre planejamento, fotografia, privacidade, documentação e experiência do paciente."
      />
      <section className="section">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, k) => (
            <PostCard key={p.slug} p={p} reveal={String((k % 3) + 1)} />
          ))}
        </div>
      </section>
      <Cta />
    </Layout>
  );
}
function Article({ p }) {
  if (!p) return <NotFound />;
  return (
    <Layout>
      <Seo
        title={p.title}
        path={"/blog/" + p.slug}
        description={p.description}
        type="article"
      />
      <article>
        <header className="relative overflow-hidden border-b border-white/[.05]">
          <div className="hero-grid absolute inset-0" />
          <div className="orb orb-a" />
          <div className="relative mx-auto max-w-4xl px-5 py-20 text-white sm:py-28">
            <Link href="/blog" className="mono text-xs uppercase tracking-[.18em] text-cyan-300 hover:text-white">
              ← Voltar ao blog
            </Link>
            <p className="eyebrow mt-10">{p.category}</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.02em] sm:text-5xl">
              <span className="text-chrome">
                <Scramble text={p.title} speed={18} />
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">{p.description}</p>
            <p className="mono mt-8 text-[11px] uppercase tracking-[.18em] text-slate-500">
              {p.date} · {p.read} de leitura
            </p>
          </div>
        </header>
        <div className="prose-dark mx-auto max-w-3xl px-5 py-20">
          {p.sections.map(([t, d], k) => (
            <section key={t} className="mb-12" data-reveal>
              <p className="mono mb-2 text-[11px] text-cyan-400">/{String(k + 1).padStart(2, "0")}</p>
              <h2>{t}</h2>
              <p>{d}</p>
            </section>
          ))}
        </div>
      </article>
      <Cta />
    </Layout>
  );
}
function About() {
  return (
    <Layout>
      <Seo
        title="Sobre"
        path="/sobre"
        description="Conheça a visão e a proposta da Dimensia."
      />
      <Hero
        eyebrow="Sobre a Dimensia"
        code="sobre"
        title="Tecnologia para tornar o planejamento mais claro."
        text="A Dimensia aproxima visão computacional, organização clínica e comunicação visual da rotina profissional."
      />
      <section className="section grid gap-12 lg:grid-cols-2">
        <div data-reveal>
          <p className="eyebrow">Nossa visão</p>
          <h2 className="section-title">
            O profissional decide.{" "}
            <span className="text-gradient">A tecnologia amplia a perspectiva.</span>
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-slate-400" data-reveal="2">
          <p>
            Inovação útil melhora o processo sem esconder sua complexidade. O
            Dimensia combina automação com revisão humana.
          </p>
          <p>
            Nosso objetivo é reduzir informações dispersas, facilitar a
            documentação e criar uma experiência mais visual.
          </p>
          <p>
            Construímos uma plataforma que evolui ouvindo clínicas e
            aperfeiçoando capturas e reconstruções.
          </p>
        </div>
      </section>
      <Cta />
    </Layout>
  );
}
function Contact() {
  return (
    <Layout>
      <Seo
        title="Contato"
        path="/contato"
        description="Fale com a equipe Dimensia."
      />
      <Hero
        eyebrow="Contato"
        title="Vamos conversar sobre sua clínica?"
        text="Tire dúvidas, compartilhe sua necessidade ou peça ajuda para começar."
      />
      <section className="section grid gap-6 lg:grid-cols-2">
        <Card
          icon="mail"
          title="Atendimento e suporte"
          text="Escreva para contato@dimensia.com.br com seu nome, clínica e dúvida."
          reveal="1"
        />
        <div className="content-card spot" data-reveal="2">
          <div className="icon-box">
            <Icon name="sparkles" className="h-5 w-5" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">Quer conhecer agora?</h2>
          <p className="mt-3 text-slate-400">
            Explore o fluxo completo por 14 dias, sem cartão.
          </p>
          <a href={APP + "/cadastro"} className="btn-primary mt-6">
            Criar conta grátis <Icon name="arrow" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
function NotFound() {
  return (
    <Layout>
      <section className="section py-36! text-center">
        <p className="eyebrow">Erro 404</p>
        <h1 className="mt-6 text-7xl font-semibold text-gradient sm:text-9xl">
          <Scramble text="404" />
        </h1>
        <p className="mt-4 text-lg text-slate-400">Página não encontrada.</p>
        <Link href="/" className="btn-primary mt-10">
          Voltar ao início
        </Link>
      </section>
    </Layout>
  );
}
function Router() {
  const [p, setP] = useState(location.pathname.replace(/\/$/, "") || "/");
  useEffect(() => {
    const f = () => setP(location.pathname.replace(/\/$/, "") || "/");
    addEventListener("popstate", f);
    return () => removeEventListener("popstate", f);
  }, []);
  if (p === "/") return <Home />;
  if (p === "/produto") return <Product />;
  if (p === "/como-funciona") return <How />;
  if (p === "/seguranca") return <Security />;
  if (p === "/planos") return <Pricing />;
  if (p === "/blog") return <Blog />;
  if (p.startsWith("/blog/"))
    return <Article p={posts.find((x) => "/blog/" + x.slug === p)} />;
  if (p === "/sobre") return <About />;
  if (p === "/contato") return <Contact />;
  return <NotFound />;
}
export default Router;
