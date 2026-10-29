import React, { useEffect, useRef, useState } from 'react';
import { useMarketingCopy } from '../copy';
import chinese from './whitepaper-zh.json';
import english from './whitepaper-en.json';
import './Whitepaper.css';

type Block = { title: string; paragraphs: string[]; badge?: string };
type Chapter = {
  sourceSlide: number; id: string; title: string; eyebrow?: string;
  intro?: string[]; cards?: Block[]; extras?: Block[]; steps?: Block[];
  layers?: Block[]; comparisons?: Block[]; examples?: Block[];
  notes?: string[]; flow?: string[]; arrows?: string[];
  table?: { headers: string[]; rows: string[][] };
};

function Paragraphs({ items, list = false }: { items?: string[]; list?: boolean }) {
  if (!items?.length) return null;
  if (list && items.length > 1) return <ul className="bullets">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
  return <>{items.map((item, i) => <p key={i}>{item}</p>)}</>;
}

function Blocks({ items, className = '' }: { items?: Block[]; className?: string }) {
  if (!items?.length) return null;
  return <div className={`wp-blocks ${className}`} data-columns={items.length === 3 || items.length === 6 ? 3 : 2}>
    {items.map((block, i) => <div className="wp-block" key={i}>
      {block.badge && <span className="num-badge">{block.badge}</span>}
      <h3>{block.title}</h3><Paragraphs items={block.paragraphs} list />
    </div>)}
  </div>;
}

function ChapterBody({ chapter }: { chapter: Chapter }) {
  const { text } = useMarketingCopy();
  return <>
    {chapter.steps && <ol className="wp-checks">{chapter.steps.map((step, i) => <li key={step.title}>
      <h3>{step.title}</h3><Paragraphs items={step.paragraphs} />
      {i < chapter.steps!.length - 1 && <span className="wp-step-arrow" aria-hidden="true">{chapter.arrows?.[i]}</span>}
    </li>)}</ol>}
    <Blocks items={chapter.cards} />
    {chapter.layers && <div className="wp-layers">{chapter.layers.map(layer => <div className="wp-layer" key={layer.title}>
      <h3>{layer.title}</h3><div><Paragraphs items={layer.paragraphs} /></div>
    </div>)}</div>}
    {chapter.flow && <ol className="wp-flow" aria-label={text('开发与运行反馈循环', 'Development and runtime feedback loop')}>
      {chapter.flow.map((step, i) => <li key={step}><span className="num-badge">{i + 1}</span>{step}<span aria-hidden="true">{i === chapter.flow!.length - 1 ? '↺' : '→'}</span></li>)}
    </ol>}
    {chapter.extras?.map((block, i) => <div className="wp-extra" key={i}><h3>{block.title}</h3><Paragraphs items={block.paragraphs} list /></div>)}
    <Blocks items={chapter.comparisons} className="wp-comparisons" />
    <Blocks items={chapter.examples} />
    {chapter.table && <div className="table-wrap" tabIndex={0} role="region" aria-label={chapter.title}>
      <table className="data"><thead><tr>{chapter.table.headers.map((label, i) => <th key={i} scope="col" className={i === 4 ? 'col-us' : undefined}>{label}</th>)}</tr></thead>
        <tbody>{chapter.table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{cell}</th> : <td key={j} className={j === 4 ? 'col-us' : undefined}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>}
    {chapter.notes && <div className="wp-conclusion"><Paragraphs items={chapter.notes} /></div>}
    {chapter.sourceSlide === 21 && <aside className="wp-extension" aria-labelledby="self-evolution-title">
      <p className="kicker">{text('延伸说明', 'Further perspective')}</p>
      <h3 id="self-evolution-title">{text('从双线闭环到系统自生长', 'From a connected feedback loop to an evolving system')}</h3>
      <p>{text('在这套开发与运行闭环之上，“自生长”可以理解为：运行状态、异常与日志持续回流，结合人工反馈和新业务需求，由开发 AI 在元素规范与验证机制约束下修正、扩展系统，再进入运行验证。', 'On this shared development and runtime foundation, an evolving system uses execution states, exceptions, logs, human feedback and new requirements to guide development AI. Element specifications and validation constrain each correction or extension before it returns to runtime validation.')}</p>
      <p>{text('自生长延续的是原有双主线与统一契约：系统随业务变化持续迭代，人的目标设定、授权、验收与最终责任仍然保留。', 'This evolution follows the same two tracks and shared contract. The system adapts as the business changes, while people retain goal-setting, authorization, acceptance and final responsibility.')}</p>
    </aside>}
  </>;
}

export default function Whitepaper() {
  const { isZh, text, path } = useMarketingCopy();
  const chapters: Chapter[] = isZh ? chinese : english;
  const [active, setActive] = useState(0);
  const contents = useRef<HTMLDetailsElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const groups = [
    { start: 0, end: 7, label: text('理念与基础', 'Principles & foundations') },
    { start: 7, end: 13, label: text('元素开发侧', 'Element development') },
    { start: 13, end: 20, label: text('元素运行侧', 'Element runtime') },
    { start: 20, end: 25, label: text('闭环、部署与演进', 'Feedback, deployment & evolution') },
  ];
  useEffect(() => {
    const sections = chapters.map(chapter => document.getElementById(chapter.id));
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = window.matchMedia('(max-width: 1100px)').matches ? 180 : 140;
      let current = 0;
      sections.forEach((section, i) => { if (section && section.getBoundingClientRect().top <= offset) current = i; });
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); window.cancelAnimationFrame(frame); };
  }, [chapters]);
  useEffect(() => {
    const nav = sidebar.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !link) return;
    const navBounds = nav.getBoundingClientRect();
    const bounds = link.getBoundingClientRect();
    if (bounds.top < navBounds.top || bounds.bottom > navBounds.bottom) nav.scrollTop += bounds.top - navBounds.top - nav.clientHeight / 2 + bounds.height / 2;
  }, [active]);
  const followLink = (id: string) => {
    if (contents.current) contents.current.open = false;
    window.requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  };
  const toc = <>{groups.map(group => <div className="wp-toc-group" key={group.start}>
    <p className="wp-toc-group-label">{group.label}</p>
    <ol start={group.start + 1}>{chapters.slice(group.start, group.end).map((chapter, i) => <li key={chapter.id}>
      <a href={`#${chapter.id}`} aria-current={active === group.start + i ? 'location' : undefined} onClick={() => followLink(chapter.id)}>
        <span>{String(chapter.sourceSlide).padStart(2, '0')}</span><span>{chapter.title}</span>
      </a>
    </li>)}</ol>
  </div>)}</>;
  const cover = chapters[0];
  return <div className="wp-reader">
    <header className="wp-cover" id={cover.id} data-source-slide={1} tabIndex={-1}>
      <div className="wrap">
        <p className="kicker">{cover.title}</p>
        <h1>{cover.intro?.[0]}</h1>
        <div className="wp-cover-description"><Paragraphs items={cover.intro?.slice(1)} /></div>
        <div className="wp-cover-bottom">
          <p>{text('理念 · 开发 · 运行 · 演进', 'Principles · Development · Runtime · Evolution')}</p>
          <div className="btn-row"><a className="btn btn-primary" href="#chapter-02">{text('开始阅读', 'Start reading')} <span aria-hidden="true">↓</span></a>
            <a className="textlink" href="#architecture">{text('查看五层架构', 'Explore the five-layer architecture')} <span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
    </header>
    <details className="wp-toc-mobile" ref={contents} onKeyDown={event => {
      if (event.key === 'Escape' && contents.current?.open) { contents.current.open = false; contents.current.querySelector('summary')?.focus(); event.preventDefault(); }
    }}>
      <summary><span>{text('目录', 'Contents')}</span><span className="wp-current-chapter">{String(active + 1).padStart(2, '0')} · {chapters[active].title}</span><span className="wp-toc-chevron" aria-hidden="true">⌄</span></summary>
      <nav className="wp-toc" aria-label={text('白皮书目录', 'Whitepaper contents')}>{toc}</nav>
    </details>
    <div className="wrap wp-reading-layout">
      <aside className="wp-toc-desktop">
        <div className="wp-toc-heading"><span>{text('本篇目录', 'In this whitepaper')}</span><span>{String(active + 1).padStart(2, '0')} / 25</span></div>
        <nav ref={sidebar} className="wp-toc" aria-label={text('白皮书目录', 'Whitepaper contents')}>{toc}</nav>
        <a className="wp-back-top" href="#chapter-01">↑ {text('回到开篇', 'Back to the beginning')}</a>
      </aside>
      <article className="wp-article" aria-label={text('技术白皮书正文', 'Technical whitepaper')}>
        {chapters.slice(1).map(chapter => <section className="wp-chapter" id={chapter.id} data-source-slide={chapter.sourceSlide} key={chapter.id} tabIndex={-1} aria-labelledby={`chapter-title-${chapter.sourceSlide}`}>
          <header className="wp-chapter-heading">
            <div className="wp-chapter-meta"><span>{String(chapter.sourceSlide).padStart(2, '0')}</span><span>{chapter.eyebrow || groups.find(group => chapter.sourceSlide > group.start && chapter.sourceSlide <= group.end)?.label}</span></div>
            <h2 id={`chapter-title-${chapter.sourceSlide}`}>{chapter.title}</h2>
            <Paragraphs items={chapter.intro} />
          </header>
          <ChapterBody chapter={chapter} />
        </section>)}
        <div className="wp-reading-end"><div><p className="kicker">{text('继续交流', 'Continue the conversation')}</p><h2>{text('把架构理念带入你的业务场景', 'Connect the architecture to your business')}</h2></div>
          <a className="btn btn-primary" href={path('/contact')}>{text('预约技术交流', 'Discuss the technology')} <span aria-hidden="true">↗</span></a>
        </div>
      </article>
    </div>
  </div>;
}
