import React, { useEffect } from "react";
import { Icon, Logo } from "./ui";

const APP_URL = (import.meta.env.VITE_APP_URL || "https://app.dimensia.com.br").replace(/\/$/, "");

function Link({ to, ...props }) {
  return <a href={`${APP_URL}${to}`} {...props} />;
}

const FEATURES = [
  [
    "face",
    "Rosto em 3D a partir de uma foto",
    "Uma fotografia frontal vira uma superfície 3D navegável, com 478 marcos faciais detectados.",
  ],
  [
    "target",
    "Pontos de aplicação precisos",
    "Marque cada ponto na superfície, com região, produto, quantidade, lote e validade.",
  ],
  [
    "file",
    "Relatório PDF profissional",
    "Documento claro e elegante com foto, pontos numerados, totais e vista 3D opcional.",
  ],
  [
    "users",
    "Cadastro de pacientes",
    "Histórico completo de mapeamentos por paciente, com busca por nome, CPF ou telefone.",
  ],
  [
    "shield",
    "Dados protegidos",
    "Fotos e planejamentos criptografados, isolados por clínica, com acesso por equipe.",
  ],
  [
    "sparkles",
    "Simulação visual opcional",
    "Gere uma simulação ilustrativa no PDF, com consentimento específico do paciente.",
  ],
];

const STEPS = [
  ["users", "Cadastre o paciente", "Centralize dados de contato e mantenha todo o histórico de planejamentos organizado."],
  ["camera", "Registre uma foto", "Escolha uma imagem existente ou fotografe na hora, direto pelo celular ou tablet."],
  ["target", "Planeje em 3D", "Navegue pela superfície facial e marque cada região, produto e quantidade com precisão."],
  ["file", "Compartilhe o relatório", "Gere um PDF profissional para documentação interna e apresentação ao paciente."],
];

const AUDIENCES = [
  ["sparkles", "Harmonização facial", "Planejamento visual e documentação de toxina botulínica, preenchedores e outros procedimentos."],
  ["user", "Profissionais e equipes", "Acesso compartilhado com responsáveis definidos em cada planejamento e histórico centralizado."],
  ["home", "Clínicas em crescimento", "Uma operação mais organizada, padronizada e preparada para atender mais pacientes."],
];

const FAQS = [
  ["Preciso instalar algum programa?", "Não. O Dimensia funciona diretamente no navegador e pode ser acessado pelo computador, tablet ou celular."],
  ["Consigo tirar a foto durante o atendimento?", "Sim. Em dispositivos compatíveis, você pode abrir a câmera e registrar a foto na hora ou escolher uma imagem existente."],
  ["O sistema substitui a avaliação profissional?", "Não. O Dimensia é uma ferramenta de planejamento e documentação. Toda decisão clínica continua sendo responsabilidade do profissional habilitado."],
  ["As imagens dos pacientes ficam protegidas?", "A plataforma utiliza controle de acesso por clínica e proteção dos dados armazenados. O uso das imagens deve seguir os consentimentos e as políticas de LGPD da clínica."],
  ["Posso cancelar quando quiser?", "Sim. Após os 14 dias de teste, a assinatura é mensal e pode ser cancelada sem fidelidade."],
];

export const PLAN_ITEMS = [
  "Pacientes e mapeamentos ilimitados",
  "Equipe com vários profissionais",
  "Relatórios PDF ilimitados",
  "Catálogo de produtos da clínica",
  "Dados criptografados e backup no seu servidor",
  "Cancele quando quiser",
];

export function PlanCard({ action, compact = false }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-mint-500/30 bg-white p-7 shadow-2xl shadow-mint-900/10 sm:p-9">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-mint-400/20 blur-3xl" />
      <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em] text-mint-700">
        <Icon name="sparkles" className="h-3.5 w-3.5" /> 14 dias grátis
      </span>
      <h3 className="mt-5 text-lg font-semibold text-slate-900">
        Dimensia
      </h3>
      <div className="mt-2 flex items-end gap-1.5">
        <span className="text-5xl font-semibold tracking-tight text-slate-900">
          R$ 149
        </span>
        <span className="mb-1.5 text-sm text-slate-500">/mês</span>
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Teste completo sem cartão. Depois, uma assinatura simples por clínica.
      </p>
      {!compact && (
        <ul className="mt-6 space-y-3">
          {PLAN_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-slate-600"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-500 text-slate-950">
                <Icon name="check" className="h-3 w-3" strokeWidth={2.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-7">{action}</div>
    </div>
  );
}

export default function App() {
  const me = false;
  useEffect(() => {
    if (window.location.hash)
      document.querySelector(window.location.hash)?.scrollIntoView();
  }, []);
  const cta = me ? (
    <Link to="/inicio" className="btn-primary px-6! py-3!">
      Abrir o sistema <Icon name="arrow" />
    </Link>
  ) : (
    <Link to="/cadastro" className="btn-primary px-6! py-3!">
      Começar teste grátis <Icon name="arrow" />
    </Link>
  );
  const finalCta = (
    <Link
      to={me ? "/inicio" : "/cadastro"}
      className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-mint-900/20 transition hover:-translate-y-0.5 hover:bg-slate-900"
    >
      {me ? "Abrir o sistema" : "Começar teste grátis"}
      <Icon name="arrow" className="h-4 w-4" />
    </Link>
  );
  return (
    <div className="min-h-screen bg-[#f5f8f7]">
      <a href="#conteudo" className="sr-only z-[100] rounded-lg bg-white px-4 py-2 text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Ir para o conteúdo
      </a>
      <section className="hero relative overflow-hidden text-white">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Logo variant="light" className="h-10 sm:h-12" />
          <nav className="flex items-center gap-2 text-sm">
            <a href="#recursos" className="hidden rounded-lg px-3 py-2 text-slate-300 transition hover:text-white lg:block">Recursos</a>
            <a href="#como-funciona" className="hidden rounded-lg px-3 py-2 text-slate-300 transition hover:text-white lg:block">Como funciona</a>
            <a
              href="#planos"
              className="hidden rounded-lg px-3 py-2 text-slate-300 hover:text-white sm:block"
            >
              Planos
            </a>
            <Link
              to="/entrar"
              className="rounded-lg px-3 py-2 text-slate-300 hover:text-white"
            >
              Entrar
            </Link>
            <Link
              to="/cadastro"
              className="rounded-xl bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-mint-100"
            >
              Teste grátis
            </Link>
          </nav>
        </header>
        <div id="conteudo" className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint-400/25 bg-mint-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.18em] text-mint-300">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-400" /> Estúdio
              de harmonização facial
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Cada ponto,
              <br />
              <span className="text-mint-400">uma decisão precisa.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Planeje aplicações sobre o rosto do paciente em 3D, documente
              produtos e quantidades e entregue um relatório impecável em
              minutos.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {cta}
              <span className="text-sm text-slate-400">
                14 dias grátis · sem cartão
              </span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="hero-face relative aspect-[4/5] rounded-[32px] border border-white/10 bg-white/[.03] p-8 backdrop-blur">
              <svg
                viewBox="0 0 140 170"
                fill="none"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path d="M70 10C20 10 15 47 23 88C28 125 46 153 70 162C94 153 112 125 117 88C125 47 120 10 70 10Z" />
                <path d="M23 65L70 36L117 65L70 88Z M23 88L70 110L117 88 M40 132L70 110L100 132 M70 10V162 M28 42L45 65L35 100L70 145L105 100L95 65L112 42 M45 65H95 M50 124H90 M45 65L70 88L95 65 M35 100L70 88L105 100" />
              </svg>
              {[
                [38, 30],
                [62, 30],
                [50, 52],
                [34, 64],
                [66, 64],
                [50, 78],
              ].map(([x, y], i) => (
                <span
                  key={i}
                  className="hero-dot absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-mint-400 text-[11px] font-bold text-slate-950 ring-2 ring-white"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    animationDelay: `${i * 0.25}s`,
                  }}
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-2xl backdrop-blur sm:-left-10">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Total planejado
              </p>
              <p className="text-lg font-semibold">42 U · 2,5 ml</p>
            </div>
          </div>
        </div>
      </section>

      <section id="recursos" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-mint-700">
            Tudo em um só lugar
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Do cadastro do paciente ao relatório final.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-mint-400">
                <Icon name={icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-8 border-y border-slate-200/70 bg-white py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-mint-700">Simples do início ao fim</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Um fluxo pensado para o atendimento.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">Da primeira foto ao relatório final, o planejamento fica claro, organizado e acessível para toda a equipe.</p>
          </div>
          <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([icon, title, text], index) => (
              <li key={title} className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-mint-100 text-mint-700"><Icon name={icon} className="h-5 w-5" /></div>
                  <span className="text-4xl font-semibold text-slate-200">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-mint-700">Feito para a sua rotina</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Mais clareza para quem planeja. Mais confiança para quem acompanha.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500 lg:justify-self-end sm:text-base">O Dimensia transforma informações dispersas em um processo visual e consistente, sem tirar do profissional o controle sobre cada decisão.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map(([icon, title, text]) => (
            <article key={title} className="rounded-3xl bg-slate-900 p-7 text-white shadow-xl shadow-slate-900/10">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-mint-400 text-slate-950"><Icon name={icon} className="h-5 w-5" /></div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="hero relative overflow-hidden rounded-[2rem] px-6 py-10 text-white shadow-2xl shadow-slate-900/15 sm:px-10 lg:grid lg:grid-cols-[1fr_.8fr] lg:items-center lg:px-14 lg:py-14">
          <div className="hero-grid pointer-events-none absolute inset-0" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint-300/20 bg-mint-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[.16em] text-mint-300"><Icon name="shield" className="h-3.5 w-3.5" /> Segurança e responsabilidade</span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Dados clínicos merecem cuidado em cada etapa.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Acesso isolado por clínica, permissões para a equipe e consentimento específico para recursos de simulação ajudam sua operação a seguir boas práticas de privacidade e LGPD.</p>
          </div>
          <ul className="relative mt-8 space-y-3 lg:mt-0 lg:justify-self-end">
            {["Acesso individual por profissional", "Histórico centralizado por paciente", "Controle sobre fotos e relatórios", "Consentimento para simulações"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-200"><span className="grid h-6 w-6 place-items-center rounded-full bg-mint-400 text-slate-950"><Icon name="check" className="h-3.5 w-3.5" /></span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="planos"
        className="border-t border-slate-200/70 bg-white/60 py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-mint-700">
              Planos
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Um plano, tudo incluído.
            </h2>
            <p className="mt-4 max-w-md text-slate-500">
              Use o Dimensia por 14 dias sem compromisso. Se fizer sentido
              para sua clínica, continue por R$ 149 por mês, com pagamento
              seguro pelo Stripe.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
              <Icon name="shield" className="h-5 w-5 text-mint-600" /> Pagamento
              processado pelo Stripe. Cancele a qualquer momento.
            </div>
          </div>
          <PlanCard
            action={
              me ? (
                <Link
                  to="/assinatura"
                  className="btn-primary w-full justify-center py-3!"
                >
                  Ver minha assinatura
                </Link>
              ) : (
                <Link
                  to="/cadastro"
                  className="btn-primary w-full justify-center py-3!"
                >
                  Começar 14 dias grátis
                </Link>
              )
            }
          />
        </div>
      </section>

      <section id="faq" className="border-t border-slate-200/70 bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-mint-700">Perguntas frequentes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Tudo o que você precisa saber para começar.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-500">Ainda ficou alguma dúvida? Crie sua conta e conheça o fluxo completo durante o período de teste.</p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {FAQS.map(([question, answer]) => (
              <details key={question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-slate-800">
                  {question}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-45 group-open:bg-mint-100 group-open:text-mint-700"><Icon name="plus" className="h-4 w-4" /></span>
                </summary>
                <p className="max-w-2xl pb-5 pr-10 text-sm leading-6 text-slate-500">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mint-500 px-5 py-16 text-center text-slate-950 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-mint-900">Comece agora</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Dê uma nova dimensão ao seu planejamento facial.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-mint-900 sm:text-base">Experimente todos os recursos por 14 dias, sem cartão de crédito e sem compromisso.</p>
          <div className="mt-8 flex justify-center">{finalCta}</div>
        </div>
      </section>

      <footer className="bg-slate-950 px-5 py-12 text-sm text-slate-400 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="light" className="h-9 opacity-90" />
            <p className="mt-4 max-w-sm text-sm leading-6">Planejamento facial inteligente em 3D para clínicas que valorizam precisão, organização e uma apresentação profissional.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-white">Produto</p>
            <nav className="mt-4 flex flex-col items-start gap-3"><a href="#recursos" className="hover:text-white">Recursos</a><a href="#como-funciona" className="hover:text-white">Como funciona</a><a href="#planos" className="hover:text-white">Planos</a><a href="#faq" className="hover:text-white">Perguntas frequentes</a></nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-white">Acesso</p>
            <nav className="mt-4 flex flex-col items-start gap-3"><Link to="/entrar" className="hover:text-white">Entrar</Link><Link to="/cadastro" className="hover:text-white">Criar conta</Link></nav>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Dimensia. Todos os direitos reservados.</span><span>Planejamento facial inteligente</span></div>
      </footer>
    </div>
  );
}
