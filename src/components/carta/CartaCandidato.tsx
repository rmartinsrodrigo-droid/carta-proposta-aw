'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './CartaCandidato.module.css'

export type CartaDados = {
  nome: string
  candidato_email?: string | null
  candidato_telefone?: string | null
  cargo: string
  area?: string | null
  gestor?: string | null
  gestor_email?: string | null
  gestor_telefone?: string | null
  modelo: string
  salario: number
  jornada?: string | null
  local?: string | null
  inicio?: string | null
  validade: string
  beneficios: string[]
  remetente: string
}

const numerosAW: ReadonlyArray<[string, string]> = [
  ['30+', 'anos no mercado'],
  ['32M', 'm² implantados'],
  ['R$1,8B', 'em faturamento (2024)'],
  ['53%', 'market share em interiores corporativos'],
  ['+1.200', 'colaboradores diretos'],
  ['R$20M', 'seguro de responsabilidade civil'],
]

const valoresAW: ReadonlyArray<[string, string]> = [
  ['Não omissão', 'Não toleramos omissão, mentira ou displicência.'],
  ['Segurança em 1º lugar', 'Somos exemplo e zelamos pela segurança de todos.'],
  ['Entrega UAW', 'Trabalhamos com alma e profundidade.'],
  ['Obsessão por qualidade', 'Cumprimos com precisão o combinado.'],
  ['Orgulho a|w', 'Temos orgulho de ser e pertencer.'],
  ['Disciplina', 'Foco na meta para a entrega perfeita.'],
  ['Saímos na frente', 'Curiosos e inquietos, nos antecipamos às tendências.'],
  ['Somos um time', 'Nenhum de nós é tão bom quanto todos nós juntos.'],
  ['Gestão para resultados', 'Agimos com determinação para garantir nossos resultados.'],
  ['Desenvolvimento sustentável', 'Dentro e fora da a|w, a sustentabilidade é praticada.'],
]

const passos: ReadonlyArray<[string, string]> = [
  ['Aceite', 'Você confirma a proposta por aqui, no botão abaixo.'],
  ['Documentação', 'O RH envia a lista de documentos e conduz a admissão com você.'],
  ['Preparação', 'Deixamos acesso, equipamento e seu primeiro dia prontos antes de você chegar.'],
  ['Primeiro dia', 'Você começa sabendo pra onde ir, com quem falar e o que esperar.'],
]

const cartaCeo: ReadonlyArray<string> = [
  'A vida é feita de desafios e de pessoas capazes de transformá-los em legado. Poucas empresas conseguem construir, ao longo do tempo, uma trajetória sólida, admirada e verdadeiramente relevante.',
  'Na Athié Wohnrath, acreditamos que não existem atalhos para grandes conquistas. Há 30 anos, transformamos ideias e inspirações em espaços memoráveis, construindo lugares que inspiram pessoas, negócios e experiências. Foi assim que nos tornamos referência em arquitetura corporativa na América Latina e uma das maiores construtoras do Brasil.',
  'Ao longo dessa jornada, aprendemos que resultados consistentes exigem comprometimento, colaboração, visão de longo prazo e coragem para fazer diferente. Cada projeto entregue carrega o esforço de equipes que desafiam o óbvio diariamente para transformar possibilidades em realidade.',
  'Aqui, valorizamos pessoas inquietas, que buscam evolução constante, que entendem a importância dos detalhes e que desejam construir algo relevante junto a um time movido por excelência e inovação.',
  'Se você acredita nesses princípios e quer fazer parte de uma empresa que transforma espaços em experiências memoráveis, este é o seu lugar. A Athié Wohnrath é uma oportunidade para crescer, aprender e deixar sua marca.',
  'Construa sua trajetória com propósito. Aproveite cada desafio, evolua constantemente e faça parte dessa história.',
]

function brl(n: number): string {
  return Number.isFinite(n)
    ? n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
    : '…'
}

function dt(s?: string | null): string {
  if (!s) return '…'
  const [y, m, d] = s.split('-')
  if (!y || !m || !d) return s
  return `${d}/${m}/${y}`
}

function primeiro(n: string): string {
  return (n || '').trim().split(/\s+/)[0] || ''
}

function whatsappHref(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  const withCountry = digits.startsWith('55') && digits.length >= 12 ? digits : `55${digits}`
  return `https://wa.me/${withCountry}`
}

function PrinterIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  )
}

function iconeBeneficio(nome: string) {
  const n = nome.toLowerCase()
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  if (/sa[úu]de|m[ée]dic/.test(n)) {
    return (
      <svg {...props}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  }
  if (/odont|dent/.test(n)) {
    return (
      <svg {...props}>
        <path d="M12 5.5c-2 0-3-1-4.5-1-2 0-3.5 1.8-3.5 4.5 0 3 1 5 2 8s1.5 5 3 5 1.5-3 3-3 1.5 3 3 3 2-2 3-5 2-5 2-8c0-2.7-1.5-4.5-3.5-4.5-1.5 0-2.5 1-4.5 1z" />
      </svg>
    )
  }
  if (/refei[çc]/.test(n)) {
    return (
      <svg {...props}>
        <path d="M4 3v18M4 3c2 0 4 2 4 5s-2 5-4 5" />
        <path d="M16 3v18M20 3v6a4 4 0 0 1-4 4" />
      </svg>
    )
  }
  if (/transp/.test(n)) {
    return (
      <svg {...props}>
        <path d="M5 17h14M5 17v3M19 17v3M6 11l1-5h10l1 5M5 11h14v6H5z" />
        <circle cx="8" cy="14" r="1" />
        <circle cx="16" cy="14" r="1" />
      </svg>
    )
  }
  if (/celular|telefone|mobile/.test(n)) {
    return (
      <svg {...props}>
        <rect x="7" y="3" width="10" height="18" rx="1.5" />
        <path d="M11 18h2" />
      </svg>
    )
  }
  if (/gym|academia/.test(n)) {
    return (
      <svg {...props}>
        <path d="M5 8v8M9 6v12M15 6v12M19 8v8M3 10v4M21 10v4M9 12h6" />
      </svg>
    )
  }
  if (/seguro|vida/.test(n)) {
    return (
      <svg {...props}>
        <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z" />
      </svg>
    )
  }
  return (
    <svg {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function LockIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      style={{ flex: '0 0 auto' }}
      aria-hidden
    >
      <rect x="4" y="10" width="16" height="10" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

export function CartaCandidato({
  dados,
  mode = 'candidate',
}: {
  dados: CartaDados
  mode?: 'stage' | 'candidate'
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [msg, setMsg] = useState<string>('')

  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return

    const targets = scroller.querySelectorAll<HTMLElement>(`.${styles.rv}`)
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.in)
            obs.unobserve(entry.target)
          }
        }
      },
      { root: scroller, threshold: 0.12 }
    )
    targets.forEach((t) => obs.observe(t))

    const onScroll = () => {
      const total = scroller.scrollHeight - scroller.clientHeight
      const pct = total > 0 ? (scroller.scrollTop / total) * 100 : 0
      if (progressRef.current) {
        progressRef.current.style.width = `${Math.min(100, Math.max(0, pct))}%`
      }
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      obs.disconnect()
      scroller.removeEventListener('scroll', onScroll)
    }
  }, [])

  const rows: Array<[string, React.ReactNode]> = [
    ['Modelo', dados.modelo],
    ['Cargo', dados.cargo],
    ...(dados.area ? ([['Área', dados.area]] as Array<[string, React.ReactNode]>) : []),
    ...(dados.gestor ? ([['Gestor', dados.gestor]] as Array<[string, React.ReactNode]>) : []),
    ...(dados.gestor_email
      ? ([
          [
            'Email do gestor',
            <a key="ge" href={`mailto:${dados.gestor_email}`} className={styles.link}>
              {dados.gestor_email}
            </a>,
          ],
        ] as Array<[string, React.ReactNode]>)
      : []),
    ...(dados.gestor_telefone
      ? ([
          [
            'Celular do gestor',
            <a
              key="gt"
              href={whatsappHref(dados.gestor_telefone)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              title="Abrir no WhatsApp"
            >
              {dados.gestor_telefone}
            </a>,
          ],
        ] as Array<[string, React.ReactNode]>)
      : []),
    ...(dados.jornada ? ([['Jornada', dados.jornada]] as Array<[string, React.ReactNode]>) : []),
    ...(dados.local ? ([['Local / modelo', dados.local]] as Array<[string, React.ReactNode]>) : []),
    ...(dados.inicio ? ([['Início previsto', dt(dados.inicio)]] as Array<[string, React.ReactNode]>) : []),
  ]

  return (
    <div className={mode === 'candidate' ? styles.stageCandidate : styles.stage}>
      <div className={styles.phone}>
        <div className={styles.screen}>
          <div ref={progressRef} className={styles.progress} />
          <div ref={scrollRef} className={styles.scroll}>
            <div className={styles.c}>
              <section className={styles.hero}>
                <div className={styles.heroTop}>
                  <Image
                    src="/logos/logo-branco.png"
                    alt="athiē | wohnrath"
                    width={100}
                    height={22}
                    priority
                  />
                  <span className={styles.lock}>
                    <LockIcon color="var(--aw-tiffany)" /> Acesso exclusivo
                  </span>
                </div>
                <div className={styles.heroBottom}>
                  <div className={styles.heroDash} aria-hidden />
                  <div className={styles.heroSaudacao}>Parabéns,</div>
                  <h1 className={styles.h1}>{dados.nome || '…'}.</h1>
                  <div className={styles.heroSubtitle}>
                    Estamos felizes em ter você conosco.
                  </div>
                  <button
                    className={styles.heroCta}
                    onClick={() => {
                      const scroller = scrollRef.current
                      const target = scroller?.querySelector<HTMLElement>(
                        `.${styles.welcome}`
                      )
                      if (scroller && target) {
                        const sRect = scroller.getBoundingClientRect()
                        const tRect = target.getBoundingClientRect()
                        scroller.scrollTo({
                          top: scroller.scrollTop + tRect.top - sRect.top,
                          behavior: 'smooth',
                        })
                      }
                    }}
                    type="button"
                  >
                    Conhecer minha proposta
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      aria-hidden
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </section>

              <section className={`${styles.welcome} ${styles.rv}`}>
                <div className={styles.kicker}>Bem-vindo(a)</div>
                <h2 className={styles.welcomeH2}>
                  Olá, {dados.nome || '…'}.
                </h2>
                <p>
                  Parabéns pela sua aprovação no processo seletivo da Athié Wohnrath.
                </p>
                <p>
                  Este material foi preparado para apoiar o início da sua jornada conosco e
                  apresentar tudo o que você precisa para os seus primeiros passos na empresa.
                </p>
              </section>

              <section className={styles.ceo}>
                <div className={styles.ceoPhoto}>
                  <Image
                    src="/ivo-wohnrath.png"
                    alt="Ivo Wohnrath, CEO da Athié Wohnrath"
                    width={720}
                    height={900}
                    sizes="(max-width: 480px) 100vw, 460px"
                  />
                </div>
                <div className={styles.ceoBody}>
                  <div className={styles.ceoQuote} aria-hidden>&ldquo;</div>
                  {cartaCeo.map((paragrafo, i) => (
                    <p key={i} className={styles.rv}>
                      {paragrafo}
                    </p>
                  ))}
                  <div className={`${styles.ceoSign} ${styles.rv}`}>
                    <div className={styles.ceoNome}>Ivo Wohnrath</div>
                    <div className={styles.ceoCargo}>CEO do Grupo Athié Wohnrath</div>
                  </div>
                </div>
              </section>

              <section className={`${styles.about} ${styles.rv}`}>
                <div className={styles.kicker}>Quem é a a|w</div>
                <h2>Arquitetura e engenharia que constroem onde outras empresas crescem.</h2>
                <p>
                  A Athié Wohnrath é uma das principais empresas de arquitetura e engenharia do
                  Brasil. Do projeto à obra entregue, desenhamos e construímos os espaços onde
                  as pessoas trabalham, atendem e se encontram.
                </p>
                <div className={styles.stats}>
                  {numerosAW.map(([n, l]) => (
                    <div key={l}>
                      <div className={styles.statN}>{n}</div>
                      <div className={styles.statL}>{l}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.gptw}>
                <div className={styles.kicker}>GPTW · 2025</div>
                <h2 className={styles.rv}>Um dos melhores lugares pra trabalhar.</h2>
                <p className={`${styles.gptwIntro} ${styles.rv}`}>
                  Em 2025, a a|w foi oficialmente certificada como Great Place to Work. É o
                  reconhecimento formal de uma cultura que a gente pratica todo dia.
                </p>

                <div className={`${styles.gptwSelo} ${styles.rv}`} aria-label="Selo Great Place to Work Certificada Junho de 2025 a Junho de 2026 Brasil">
                  <div className={styles.seloTop}>
                    Great<br />Place<br />To<br />Work<sup>®</sup>
                  </div>
                  <div className={styles.seloBottom}>
                    <div className={styles.seloMid}>Certificada</div>
                    <div className={styles.seloData}>Jun/2025 – Jun/2026</div>
                    <div className={styles.seloPais}>BRASIL</div>
                  </div>
                </div>

                <div className={`${styles.gptwBlocos} ${styles.rv}`}>
                  <div className={styles.gptwBloco}>
                    <h3>Pilares da conquista</h3>
                    <p>
                      Escuta ativa, programas de desenvolvimento de lideranças e um
                      compromisso inabalável com transparência e respeito.
                    </p>
                  </div>
                  <div className={styles.gptwBloco}>
                    <h3>Compromisso contínuo</h3>
                    <p>
                      O selo não é ponto de chegada. É promessa de continuar evoluindo pra que
                      cada colaborador encontre aqui espaço de crescimento, segurança e
                      propósito.
                    </p>
                  </div>
                </div>
              </section>

              <section className={styles.premios}>
                <div className={styles.kicker}>Conquistas 2025</div>
                <h2 className={styles.rv}>Prêmios e certificações.</h2>
                <p className={`${styles.premiosIntro} ${styles.rv}`}>
                  Reconhecimentos que traduzem em números o que a gente entrega.
                </p>

                <div className={`${styles.premioBig} ${styles.rv}`}>
                  <div className={styles.premioLabel}>Selo Carbono Neutro 2024</div>
                  <div className={styles.premioValor}>63.000 kg</div>
                  <div className={styles.premioSub}>
                    de CO₂ neutralizados no escritório de São Paulo.
                  </div>
                </div>

                <div className={styles.premiosLista}>
                  <div className={`${styles.premioItem} ${styles.rv}`}>
                    <div className={styles.premioTitulo}>German Design Awards</div>
                    <div className={styles.premioDesc}>
                      Case Localiza Labs · Excellent Architecture
                    </div>
                  </div>
                  <div className={`${styles.premioItem} ${styles.rv}`}>
                    <div className={styles.premioTitulo}>International Property Awards</div>
                    <div className={styles.premioDesc}>
                      Case XP Inc (Mezanino) · Office Interior
                    </div>
                  </div>
                  <div className={`${styles.premioItem} ${styles.rv}`}>
                    <div className={styles.premioTitulo}>Abilux</div>
                    <div className={styles.premioDesc}>
                      Case Experience House · Interiores Corporativos
                    </div>
                  </div>
                </div>

                <div className={`${styles.leedGrid} ${styles.rv}`}>
                  <div className={styles.leedHeader}>Certificações LEED</div>
                  <div className={styles.leedRow}>
                    <div className={styles.leedNum}>1</div>
                    <div>
                      <div className={styles.leedTipo}>Platinum</div>
                      <div className={styles.leedProjetos}>Dow</div>
                    </div>
                  </div>
                  <div className={styles.leedRow}>
                    <div className={styles.leedNum}>4</div>
                    <div>
                      <div className={styles.leedTipo}>Gold</div>
                      <div className={styles.leedProjetos}>
                        CEF Vida Alphaville · Google · Eletrobrás SP · Titan Capital
                      </div>
                    </div>
                  </div>
                  <div className={styles.leedRow}>
                    <div className={styles.leedNum}>5</div>
                    <div>
                      <div className={styles.leedTipo}>Silver</div>
                      <div className={styles.leedProjetos}>
                        Indorama · CBRE RJ · Bradesco Paulista · Bradesco Itapeva · AstraZeneca
                      </div>
                    </div>
                  </div>
                  <div className={styles.leedRow}>
                    <div className={styles.leedNum}>2</div>
                    <div>
                      <div className={styles.leedTipo}>Certified</div>
                      <div className={styles.leedProjetos}>Ipiranga SP · Ipiranga RJ</div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.outrosCerts} ${styles.rv}`}>
                  <div className={styles.certItem}>
                    <div className={styles.certSigla}>WELL</div>
                    <div className={styles.certDesc}>
                      Platinum: Dow · Gold: JP Morgan Client Center
                    </div>
                  </div>
                  <div className={styles.certItem}>
                    <div className={styles.certSigla}>Fitwel</div>
                    <div className={styles.certDesc}>2 Stars: CBRE Sede Rio de Janeiro</div>
                  </div>
                  <div className={styles.certItem}>
                    <div className={styles.certSigla}>EDGE</div>
                    <div className={styles.certDesc}>Edifício Sereno</div>
                  </div>
                </div>
              </section>

              <section className={styles.offer}>
                <div className={styles.printLogo} aria-hidden>
                  <Image
                    src="/logos/logo-preto.png"
                    alt="athiē | wohnrath"
                    width={140}
                    height={30}
                  />
                </div>
                <div className={styles.offerHead}>
                  <div className={styles.kicker}>Sua proposta</div>
                  <button
                    className={styles.printBtn}
                    onClick={() => {
                      // TODO (fase backend): trocar por link pra /api/proposta/[id]/pdf
                      // que gera PDF server-side com layout único e headers HTTP corretos.
                      // Hoje: window.print() + @media print oculta o resto e imprime só a proposta.
                      window.print()
                    }}
                    type="button"
                    title="Imprimir ou salvar em PDF"
                  >
                    <PrinterIcon />
                    Imprimir
                  </button>
                </div>
                <h2 className={styles.rv}>Nosso acordo.</h2>
                <div className={`${styles.salary} ${styles.rv}`}>
                  <div className={styles.salaryL}>Salário mensal</div>
                  <div className={styles.salaryV}>{brl(dados.salario)}</div>
                  <div className={styles.salaryM}>{dados.modelo} · valores brutos</div>
                </div>
                <div className={`${styles.rows} ${styles.rv}`}>
                  {rows.map(([k, val], i) => (
                    <div key={i} className={styles.row}>
                      <span className={styles.rowK}>{k}</span>
                      <span className={styles.rowVal}>{val || '…'}</span>
                    </div>
                  ))}
                </div>
                <div className={`${styles.bens} ${styles.rv}`}>
                  <div className={styles.bensL}>Benefícios</div>
                  <ul>
                    {(dados.beneficios.length > 0 ? dados.beneficios : ['…']).map((b) => (
                      <li key={b}>
                        {iconeBeneficio(b)}
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className={styles.valores}>
                <div className={styles.kicker}>Nossos valores</div>
                <h2 className={styles.rv}>O que nos move todo dia.</h2>
                <div className={styles.valoresLista}>
                  {valoresAW.map(([h, p]) => (
                    <div key={h} className={`${styles.valorItem} ${styles.rv}`}>
                      <h3 className={styles.valorTitulo}>{h}</h3>
                      <p className={styles.valorDesc}>{p}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.steps}>
                <div className={styles.kicker}>Próximos passos</div>
                <h2 className={styles.rv}>Como segue daqui.</h2>
                {passos.map(([h, p], i) => (
                  <div key={h} className={`${styles.step} ${styles.rv}`}>
                    <div className={styles.stepNum}>{i + 1}</div>
                    <div>
                      <h3>{h}</h3>
                      {i === 3 && dados.inicio && (
                        <div className={styles.stepData}>{dt(dados.inicio)}</div>
                      )}
                      <p>{p}</p>
                    </div>
                  </div>
                ))}
              </section>

              <section className={`${styles.accept} ${styles.rv}`}>
                <div className={styles.kicker}>Aceite</div>
                <h2>
                  Vem pra AW{primeiro(dados.nome) ? `, ${primeiro(dados.nome)}` : ''}.
                </h2>
                <p>Ao aceitar, você confirma a proposta e o RH dá sequência à sua admissão.</p>
                <div className={styles.val}>Válida até {dt(dados.validade)}</div>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => {
                    // TODO (fase backend): POST /api/proposta/aceitar
                    //   1. Registra evento 'aceita' no Supabase (data + IP + UA).
                    //   2. Gera PDF do aceite (react-pdf ou puppeteer serverless).
                    //   3. Envia email pro candidato (dados.candidato_email) com o PDF anexo,
                    //      copiando recursoshumanos.aw@awnet.com.br.
                    //      Assunto: `Proposta do candidato ${dados.nome} - Aceita! Vamos iniciar a jornada.`
                    setMsg(
                      'Recebemos seu aceite. Em minutos você recebe o PDF por email e o RH entra em contato pra dar sequência.'
                    )
                  }}
                  type="button"
                >
                  Aceitar proposta
                </button>
                <button
                  className={`${styles.btn} ${styles.btnSec}`}
                  onClick={() => {
                    const assunto = encodeURIComponent(`Dúvida sobre proposta - ${dados.nome}`)
                    window.location.href = `mailto:recursoshumanos.aw@awnet.com.br?subject=${assunto}`
                  }}
                  type="button"
                >
                  Tenho uma dúvida antes
                </button>
                <div className={styles.msg}>{msg}</div>
              </section>

              <footer className={styles.foot}>
                <Image
                  src="/logos/logo-branco.png"
                  alt="athiē | wohnrath"
                  width={90}
                  height={18}
                />
                <div className={styles.socials}>
                  <a
                    href="https://www.instagram.com/athiewohnrath/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram da Athié Wohnrath"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/athiewohnrath/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn da Athié Wohnrath"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
                <div className={styles.conf}>
                  <LockIcon color="#94A3A9" />
                  <span>
                    Documento confidencial e de acesso exclusivo. As informações desta proposta
                    são pessoais e não devem ser compartilhadas.
                  </span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
