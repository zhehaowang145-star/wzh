import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "./components/BorderGlow";
import FluxLines from "./components/FluxLines";

gsap.registerPlugin(ScrollTrigger);

const mediaUrl = (file) => `${import.meta.env.BASE_URL}media/optimized/${file}`;

const navItems = [
  { label: "首页", id: "home", index: "00" },
  { label: "关于", id: "about", index: "01" },
  { label: "项目", id: "work", index: "02" },
  { label: "能力", id: "expertise", index: "03" },
  { label: "联系", id: "contact", index: "04" },
];

const projects = [
  {
    id: "01",
    title: "静安公园改造",
    english: "Jing'an Park Renovation",
    type: "景观设计 / 城市更新",
    year: "2026",
    image: mediaUrl("jingan-analysis.webp"),
    images: [mediaUrl("jingan-analysis.webp"), mediaUrl("jingan-results.webp")],
    size: "wide",
    summary: "以“静安”为核心理念，融合历史文脉、生态修复与公共活动，重塑一座兼具文化体验与日常活力的城市绿洲。",
    detail:
      "项目从区位、场地现状与人群行为分析出发，针对入口空间单一、植被层次不足、活动设施老化等问题，提出生态优先、文化传承、多元共享与活力激发四项策略。设计成果涵盖总平面、鸟瞰、功能分区、种植配置、剖面、夜景及景观节点，并以统一的版式与图像语言完成从分析到方案的视觉表达。",
    deliverables: ["区位与场地分析", "设计策略", "总平面与鸟瞰", "节点与夜景表达"],
  },
  {
    id: "02",
    title: "再生·共生",
    english: "Reborn · Symbiosis",
    type: "工业遗址 / 景观更新",
    year: "2026",
    image: mediaUrl("reborn-symbiosis.webp"),
    size: "narrow",
    summary: "以工业遗址为载体，将生态修复、社区活力与文化记忆组织为可持续的空间系统。",
    detail:
      "项目以闵行工业遗址公园为背景，通过区位、交通、气候、SWOT 与场地问题分析建立设计依据，提出生态修复、健康环境、低碳景观、生物多样性与文化传承等策略，并进一步落实到总平面、雨水收集、可再生能源、剖面、爆炸轴测与场景效果中。",
    deliverables: ["场地分析", "可持续系统", "总平面与剖面", "效果表达"],
  },
  {
    id: "03",
    title: "泡泡花园",
    english: "Bubble Garden",
    type: "校园微更新 / 景观设计",
    year: "2026",
    image: mediaUrl("bubble-garden.webp"),
    size: "narrow",
    summary: "以泡泡的聚合与叠加为空间原型，打造一座融合自然、交流与休憩的校园微型花园。",
    detail:
      "项目位于上海建桥学院图书馆南侧，以低碳生态和气泡主题为设计线索，通过元素提取、空间演绎、植物配置与铺装分析，形成入口、特色花境、休憩座椅与微地形等多层次节点，并用夜景与剖立面强化空间的体验感。",
    deliverables: ["空间原型", "种植配置", "平面与剖面", "场景效果"],
  },
  {
    id: "04",
    title: "薪火雷锋·临港筑梦",
    english: "Campus Memory Plaza",
    type: "文化景观 / 校园广场",
    year: "2026",
    image: mediaUrl("lingang-plaza.webp"),
    size: "wide",
    longTitle: true,
    summary: "将雷锋文化、校园记忆与滨海植物融入公共广场，重塑具有精神识别度的校园核心空间。",
    detail:
      "以上海建桥学院雷锋广场为设计对象，结合红色文化、育人理念与临港地域特征，梳理场地活动、交通流线、植物与景观小品。通过奉献广场、互助花园、交流走廊与常青林带等节点组织完整场景，并以统一图面呈现设计分析与更新成果。",
    deliverables: ["文化叙事", "场地与流线", "植物分析", "效果表达"],
  },
  {
    id: "05",
    title: "夜幕降临",
    english: "After Dark · Not Hopeless",
    type: "平面设计 / 视觉档案",
    year: "2026",
    image: mediaUrl("poster-not-hopeless.webp"),
    images: [
      mediaUrl("poster-not-hopeless.webp"),
      mediaUrl("night-archive-01-winged.webp"),
      mediaUrl("night-archive-02-afterglow.webp"),
      mediaUrl("night-archive-03-romantic.webp"),
      mediaUrl("night-archive-04-watcher.webp"),
    ],
    galleryLayout: "grid",
    category: "graphic",
    visualLabel: "NIGHT ARCHIVE / 05 PAGES",
    summary: "制作时先用 PS 完成夜景调色、蒙版合成与颗粒质感处理，再在 Illustrator 中用网格搭建超大日期、标题与细线的版式层级，统一四幅海报的节奏与夜行叙事。",
    detail:
      "「夜幕降临」以「NOT HOPELESS」总览海报开启，随后延展为「白翼降临」「一瞬焰火」「浪漫为证」「暗中窥视」四幅篇章，编号 155–158。系列通过高对比超大日期、压缩无衬线标题与纪实图像建立统一而克制的夜间叙事；不对称分区将影像、留白与分散文字重新组织，在冷黑底色与暖白信息层之间形成节奏，捕捉黑夜中转瞬即逝的微光、偶遇与情绪。",
    deliverables: ["系列概念", "字体编排", "图像组织", "总览与四幅篇章"],
  },
  {
    id: "06",
    title: "开心果系列",
    english: "Pistachio Campaign",
    type: "平面设计 / 电商视觉",
    year: "2026",
    image: mediaUrl("pistachio-01.webp"),
    images: [
      mediaUrl("pistachio-01.webp"),
      mediaUrl("pistachio-02.webp"),
      mediaUrl("pistachio-03.webp"),
      mediaUrl("pistachio-04.webp"),
      mediaUrl("pistachio-05.webp"),
      mediaUrl("pistachio-06.webp"),
      mediaUrl("pistachio-07.webp"),
    ],
    category: "graphic",
    visualLabel: "SERIES / 07 PAGES",
    summary: "制作时先用 PS 完成产品修图、抠图与黄蓝色块合成，统一光影和材质；再在 Illustrator 中建立七页版式网格、标题层级与参数图表，让卖点和使用场景形成连贯节奏。",
    detail:
      "系列以“美味每刻”为传播线索，在明黄与湖水蓝之间切换阅读节奏。通过产品特写、信息图解、参数表格和家庭分享场景，逐步建立从主视觉、品质卖点到购买决策的完整信息路径；统一的标题层级与细线装饰保证多页面之间的一致识别。",
    deliverables: ["主视觉", "卖点信息图", "产品详情", "系列延展"],
  },
  {
    id: "07",
    title: "ChatAI",
    english: "AI Chat Mobile App",
    type: "UI / UX 设计 · 移动应用",
    year: "2026",
    image: mediaUrl("chatai-ui-02-login.webp"),
    images: [
      mediaUrl("chatai-ui-01-splash.webp"),
      mediaUrl("chatai-ui-02-login.webp"),
      mediaUrl("chatai-ui-03-home.webp"),
      mediaUrl("chatai-ui-04-chat.webp"),
      mediaUrl("chatai-ui-05-travel.webp"),
      mediaUrl("chatai-ui-06-subscription.webp"),
    ],
    galleryLayout: "grid",
    category: "ui",
    visualLabel: "UI SYSTEM / 06 SCREENS",
    summary: "制作时先用 PS 完成深色背景、界面素材与光影效果处理，再在 AI（Illustrator）中绘制应用图标、统一紫色品牌色、字体层级和组件规范。通过网格对齐与多页面对照，完善启动、登录、对话和订阅页面的视觉一致性。",
    detail:
      "ChatAI 是一款面向日常咨询与内容创作场景的智能对话应用。项目以低干扰的深色界面承载长时间阅读，用高饱和紫色建立品牌识别，并围绕分类入口、历史记录、语音输入、对话状态和订阅权益梳理完整使用路径。六张高保真页面共同呈现从首次进入到持续使用的界面系统。",
    deliverables: ["产品定位", "信息架构", "视觉系统", "六页高保真界面"],
  },
  {
    id: "08",
    title: "日常观看",
    english: "Everyday Observations",
    type: "摄影 / 生活观察",
    year: "2026",
    image: mediaUrl("photo-04-watertown-reflection.webp"),
    previewImages: [
      mediaUrl("photo-04-watertown-reflection.webp"),
      mediaUrl("photo-07-beach-sunset.webp"),
      mediaUrl("photo-09-fumi-storefront.webp"),
    ],
    images: [
      mediaUrl("photo-01-roses-candle.webp"),
      mediaUrl("photo-02-pepsi-leaves.webp"),
      mediaUrl("photo-03-flower.webp"),
      mediaUrl("photo-04-watertown-reflection.webp"),
      mediaUrl("photo-05-red-photo-wall.webp"),
      mediaUrl("photo-06-bar-night.webp"),
      mediaUrl("photo-07-beach-sunset.webp"),
      mediaUrl("photo-08-still-life-apple.webp"),
      mediaUrl("photo-09-fumi-storefront.webp"),
      mediaUrl("photo-10-roses-window.webp"),
    ],
    galleryLayout: "photo",
    category: "other",
    visualLabel: "PHOTO SERIES / 10 FRAMES",
    summary: "从静物、花卉、夜间街景到海边日落，以自然光和现场氛围记录日常生活里容易被忽略的片刻。",
    detail:
      "「日常观看」是一组围绕光线、材质与生活场景展开的摄影练习。作品在静物、植物、店铺、酒吧与海边之间切换，通过自然光、夜间灯光和反射建立温度与层次。十张照片保留了日常场景的真实感，也尝试从普通事物中寻找颜色、质地与情绪之间的关系。",
    deliverables: ["摄影取景", "自然光观察", "夜间拍摄", "系列编辑"],
  },
];

const experiences = [
  {
    date: "2024.06 — 2024.09",
    title: "视觉设计",
    place: "上海张苍生物有限公司",
    text: "负责产品海报、包装与传播物料设计，参与多轮方案迭代与客户对接。",
  },
  {
    date: "2024.10 — 2026.09",
    title: "楼长 / 文化宣发",
    place: "上海建桥学院",
    text: "负责安全宣传海报、红黑榜、迎新展板与节日活动视觉。",
  },
  {
    date: "2024.12 — 2025.03",
    title: "规划设计师",
    place: "九汇智城",
    text: "完成规划总平、结构分析及图面后期美化，强化信息传达与视觉质感。",
  },
  {
    date: "2025.03 — 2025.06",
    title: "设计师",
    place: "上海杰西高尔夫有限公司",
    text: "参与 600㎡ 景墙项目，覆盖概念、图纸、视觉输出与客户沟通。",
  },
];

const strengths = [
  {
    id: "A",
    title: "版式与信息",
    english: "Typography & Layout",
    text: "以网格、字体层级与留白组织复杂信息，让内容在第一时间被理解、被记住。",
    tools: "Photoshop / Illustrator",
    index: "01",
    coverWord: "TYPE",
  },
  {
    id: "B",
    title: "品牌视觉",
    english: "Visual Identity",
    text: "从关键词与品牌气质出发，建立图形、色彩和版式之间可持续延展的统一秩序。",
    tools: "Identity / Color / Graphic",
    index: "02",
    coverWord: "BRAND",
  },
  {
    id: "C",
    title: "图像与传播",
    english: "Image & Campaign",
    text: "围绕海报、包装、社交传播与活动物料构建完整画面，兼顾概念表达与落地执行。",
    tools: "Poster / Packaging / Campaign",
    index: "03",
    coverWord: "IMAGE",
  },
  {
    id: "D",
    title: "AI 视觉工作流",
    english: "AI Visual Workflow",
    text: "将生成式工具嵌入构思、图像生成与多轮迭代，用人工判断保持视觉系统的准确性。",
    tools: "GPT / Codex / Generative AI",
    index: "04",
    coverWord: "AI",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

function GlowPanel({ children, className = "" }) {
  return (
    <BorderGlow
      className={`section-glow-panel ${className}`.trim()}
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#120F17"
      borderRadius={28}
      glowRadius={40}
      glowIntensity={1.0}
      coneSpread={25}
      animated={false}
      colors={["#c084fc", "#f472b6", "#38bdf8"]}
    >
      {children}
    </BorderGlow>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return undefined;

    let frame = 0;
    let x = -100;
    let y = -100;
    let ringX = -100;
    let ringY = -100;

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const animate = () => {
      ringX += (x - ringX) * 0.13;
      ringY += (y - ringY) * 0.13;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      if (Math.abs(x - ringX) > 0.08 || Math.abs(y - ringY) > 0.08) {
        frame = requestAnimationFrame(animate);
      } else {
        ringX = x;
        ringY = y;
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        frame = 0;
      }
    };

    const setHover = (event) => {
      const interactive = event.target.closest("a, button, [data-cursor]");
      cursorRef.current?.classList.toggle("is-active", Boolean(interactive));
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", setHover);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", setHover);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(selectedProject));
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.08,
      });

      intro
        .from(".site-header", {
          y: -42,
          autoAlpha: 0,
          duration: 1.15,
          ease: "expo.out",
        })
        .from(
          ".hero-panel",
          {
            clipPath: "inset(100% 0% 0% 0%)",
            y: 54,
            duration: 1.8,
            stagger: 0.12,
            ease: "expo.inOut",
          },
          0.05,
        )
        .from(
          ".hero-panel img",
          {
            scale: 1.16,
            filter: "blur(10px) brightness(0.5)",
            duration: 2.2,
            stagger: 0.1,
            ease: "power2.out",
          },
          0.18,
        )
        .from(
          ".hero-kicker",
          { x: -38, autoAlpha: 0, duration: 1.15, ease: "expo.out" },
          0.42,
        )
        .from(
          ".hero-role",
          { x: 38, autoAlpha: 0, duration: 1.15, ease: "expo.out" },
          0.52,
        )
        .from(
          ".hero-title-primary",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            yPercent: 72,
            scaleX: 1.22,
            scaleY: 1.12,
            transformOrigin: "left bottom",
            duration: 1.7,
            ease: "expo.out",
          },
          0.56,
        )
        .from(
          ".hero-title-secondary",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            yPercent: 92,
            scaleX: 1.16,
            scaleY: 1.1,
            transformOrigin: "left bottom",
            duration: 1.7,
            ease: "expo.out",
          },
          0.78,
        )
        .from(
          ".hero-bottom",
          { y: 48, autoAlpha: 0, duration: 1.25, ease: "expo.out" },
          1.16,
        )
        .from(
          ".hero-index, .hero-rail",
          { autoAlpha: 0, duration: 1, stagger: 0.08 },
          1.34,
        );

      gsap.utils.toArray(".site-main > section:not(.hero)").forEach((section) => {
        const panel = section.querySelector(".section-glow-panel");
        const englishTitle = section.querySelector(
          ".section-heading-english, .contact-english-title",
        );
        const heading = section.querySelector(
          ".section-heading h2, .contact-main h2",
        );
        const items = section.querySelectorAll(
          ".about-layout, .about-stats, .project-category-heading, .project-card, .graphic-card, .skill-card, .toolkit, .contact-main, .contact-bottom, .site-footer",
        );
        const images = section.querySelectorAll(
          ".section-glow-panel img",
        );
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            once: true,
          },
        });

        if (panel) {
          timeline.fromTo(
            panel,
            { clipPath: "inset(5% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.6,
              ease: "expo.out",
            },
          );
          timeline.set(panel, { clearProps: "clipPath" });
        }

        if (englishTitle) {
          timeline.fromTo(
            englishTitle,
            {
              yPercent: 120,
              scaleX: 1.32,
              autoAlpha: 0,
              transformOrigin: "left bottom",
            },
            {
              yPercent: 0,
              scaleX: 1,
              autoAlpha: 1,
              duration: 1.55,
              ease: "expo.out",
            },
            0.12,
          );
        }

        if (heading) {
          timeline.fromTo(
            heading,
            {
              yPercent: 54,
              scaleY: 1.13,
              autoAlpha: 0,
              transformOrigin: "left bottom",
            },
            {
              yPercent: 0,
              scaleY: 1,
              autoAlpha: 1,
              duration: 1.35,
              ease: "power4.out",
            },
            0.34,
          );
        }

        if (items.length) {
          timeline.fromTo(
            items,
            { y: 72, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1.15,
              stagger: 0.14,
              ease: "power3.out",
              onComplete: () => gsap.set(items, { clearProps: "transform" }),
            },
            0.7,
          );
        }

        if (images.length) {
          timeline.fromTo(
            images,
            { clipPath: "inset(0% 0% 100% 0%)", scale: 1.06 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.45,
              stagger: 0.07,
              ease: "expo.out",
              onComplete: () =>
                gsap.set(images, { clearProps: "transform,clipPath" }),
            },
            0.78,
          );
        }
      });
    });

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 821px)",
      () => {
        gsap.fromTo(
          ".hero-image-stage",
          { yPercent: 0 },
          {
            yPercent: 4.5,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );

        gsap.utils
          .toArray(
            ".section-glow-panel .portrait-frame img",
          )
          .forEach((element) => {
            gsap.fromTo(
              element,
              { yPercent: -2 },
              {
                yPercent: 2,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.4,
                },
              },
            );
          });
      },
    );

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const landscapeProjects = projects.filter((project) => !project.category || project.category === "landscape");
  const graphicProjects = projects.filter((project) => project.category === "graphic");
  const uiProjects = projects.filter((project) => project.category === "ui");
  const otherProjects = projects.filter((project) => project.category === "other");

  return (
    <div className="site-shell">
      <div className="cursor-ring" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="回到首页">
          <span className="brand-mark">W·ZH</span>
          <span className="brand-slash">/</span>
          <span className="brand-year">26</span>
        </a>

        <nav className="main-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? "is-active" : ""}
              href={`#${item.id}`}
            >
              <span>{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-meta">
          <span>SHANGHAI, CN</span>
          <span className="status"><i /> AVAILABLE FOR WORK</span>
        </div>
      </header>

      <main className="site-main">
        <section className="hero" id="home">
          <div className="hero-light" aria-hidden="true" />
          <div className="hero-image-stage" aria-hidden="true">
            <figure className="hero-panel hero-panel-main">
              <span className="hero-panel-image">
                <img
                  src={mediaUrl("hero-monument.webp")}
                  alt=""
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </span>
              <figcaption>
                <span>01 / VOLUME</span>
                <span>LIGHT FROM ABOVE</span>
              </figcaption>
            </figure>
            <figure className="hero-panel hero-panel-ascent">
              <span className="hero-panel-image">
                <img
                  src={mediaUrl("hero-ascent.webp")}
                  alt=""
                  loading="eager"
                  fetchPriority="auto"
                  decoding="async"
                />
              </span>
              <figcaption>
                <span>02 / ASCENT</span>
                <span>SEQUENCE</span>
              </figcaption>
            </figure>
            <figure className="hero-panel hero-panel-maze">
              <span className="hero-panel-image">
                <img
                  src={mediaUrl("hero-maze.webp")}
                  alt=""
                  loading="eager"
                  fetchPriority="auto"
                  decoding="async"
                />
              </span>
              <figcaption>
                <span>03 / SYSTEM</span>
                <span>LOGIC OF SPACE</span>
              </figcaption>
            </figure>
          </div>
          <div className="hero-noise" aria-hidden="true" />

          <div className="hero-content page-width">
            <div className="hero-copy">
              <div className="hero-meta-row">
                <p className="hero-kicker">
                  <span>WANG ZHEHAO</span>
                  <span>/</span>
                  <span>PORTFOLIO 2026</span>
                </p>
                <p className="hero-role">
                  GRAPHIC DESIGNER
                  <br />
                  BRAND &amp; AI VISUAL
                </p>
              </div>

              <div className="hero-title-stage">
                <h1 className="hero-title">
                  <span className="hero-title-primary">让视觉</span>
                  <span className="hero-title-secondary">成为表达。</span>
                </h1>
              </div>

              <div className="hero-bottom">
                <p className="hero-intro">
                  我是王哲豪，来自上海建桥学院环境设计系，一名以平面设计为主攻方向的视觉设计师。
                  我从版式、图像与品牌语言出发，将复杂信息整理成清晰而有辨识度的视觉表达。
                </p>
                <button className="primary-cta" onClick={() => scrollTo("contact")}>
                  <span>开始一场合作</span>
                  <span className="cta-icon"><ArrowIcon /></span>
                </button>
              </div>
            </div>
          </div>

          <div className="hero-rail">
            <span>PORTFOLIO / 2026</span>
            <i />
            <span>SCROLL TO EXPLORE</span>
          </div>
          <div className="hero-index">
            <span>01</span>
            <span>/ 05</span>
          </div>
        </section>

        <div className="main-flux-background" aria-hidden="true">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            {activeSection !== "home" && (
              <FluxLines
                colors={["#ec4899", "#5700aa", "#06b6d4"]}
                glow={2}
                rimWidth={0.2}
                lineWidth={1}
                flowDirection="down"
                mouseInteraction
                clickSwirl
                transparent={false}
                backgroundColor="#080b09"
                dpr={1}
              />
            )}
          </div>
        </div>

        <section className="about section-pad" id="about">
          <GlowPanel>
            <div className="page-width">
            <SectionHeading
              index="01"
              label="ABOUT / PROFILE"
              title={<>以版式与图像，<br />建立清晰的视觉秩序。</>}
            />

            <div className="about-layout">
              <div className="portrait-column">
                <div className="portrait-frame">
                  <img
                    src={mediaUrl("profile.webp")}
                    alt="王哲豪海边照片"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="portrait-corner portrait-corner-a" />
                  <div className="portrait-corner portrait-corner-b" />
                  <div className="portrait-label">
                    <span>WANG ZHEHAO</span>
                    <span>GRAPHIC DESIGNER / 2026</span>
                  </div>
                </div>
                <div className="portrait-caption">
                  <span>BASED IN SHANGHAI</span>
                  <span>OPEN TO OPPORTUNITIES</span>
                </div>
              </div>

              <div className="about-content">
                <div className="about-lead-row">
                  <p className="about-lead">
                    以平面设计为主攻方向，具备环境设计专业背景。
                    擅长海报、包装、文化物料与项目图面表达，能够把复杂内容整理为有层级的视觉系统。
                  </p>
                  <div className="profile-seal">
                    <span>W</span>
                    <small>ZH</small>
                  </div>
                </div>

                <p className="about-copy">
                  我的工作从信息结构开始：先判断内容主次，再用字体、色彩、图像与网格建立观看节奏。
                  空间设计训练让我更关注比例、尺度与观看路径；AI 则帮助我在概念阶段更快拓宽视觉可能。
                </p>

                <div className="contact-strip">
                  <a href="mailto:2391401130@qq.com">
                    <span>EMAIL</span>
                    2391401130@qq.com
                  </a>
                  <a href="tel:+8619512215250">
                    <span>PHONE</span>
                    +86 195 1221 5250
                  </a>
                </div>

                <div className="experience-list">
                  {experiences.map((exp) => (
                    <article className="experience-item" key={`${exp.place}-${exp.date}`}>
                      <span className="experience-date">{exp.date}</span>
                      <div>
                        <h3>{exp.title}</h3>
                        <p>{exp.place}</p>
                      </div>
                      <p className="experience-text">{exp.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-stats">
              <Stat value="01" label="主攻方向" note="平面 / 视觉 / 环境设计" />
              <Stat value="02" label="相关实习" note="上海张苍生物 / 九汇智城" />
              <Stat value="03" label="600㎡空间项目" note="视觉转译经验" />
              <Stat value="04" label="设计工具" note="PS / AI / CAD / SU / D5 / DeepSeek / ChatGPT / Codex" />
            </div>
            </div>
          <div className="section-marquee" aria-hidden="true">
            GRAPHIC <i /> LAYOUT <i /> IDENTITY <i /> IMAGE <i /> INTELLIGENCE
          </div>
          </GlowPanel>
        </section>

        <section className="work section-pad" id="work">
          <GlowPanel>
            <div className="page-width">
            <SectionHeading
              index="02"
              label="SELECTED / WORK"
              title={<>精选项目</>}
              aside={<>2023 — 2026<br />08 PROJECTS</>}
            />

            <div className="project-category-heading">
              <span>01</span>
              <h3>景观设计</h3>
              <p>LANDSCAPE / 04 PROJECTS</p>
            </div>

            <div className="project-grid">
              {landscapeProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + 1}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>

            <div className="project-category-heading project-category-heading-graphic">
              <span>02</span>
              <h3>平面设计</h3>
              <p>GRAPHIC / 02 PROJECTS</p>
            </div>

            <div className="graphic-project-list">
              {graphicProjects.map((project) => (
                <GraphicCard
                  key={project.id}
                  project={project}
                  index={project.id}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>

            <div className="project-category-heading project-category-heading-ui">
              <span>03</span>
              <h3>界面设计</h3>
              <p>UI / UX / 01 PROJECT</p>
            </div>

            <div className="graphic-project-list">
              {uiProjects.map((project) => (
                <GraphicCard
                  key={project.id}
                  project={project}
                  index={project.id}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>

            <div className="project-category-heading project-category-heading-other">
              <span>04</span>
              <h3>其他设计</h3>
              <p>OTHER / PHOTOGRAPHY / 01 PROJECT</p>
            </div>

            <div className="graphic-project-list">
              {otherProjects.map((project) => (
                <GraphicCard
                  key={project.id}
                  project={project}
                  index={project.id}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>
            </div>
          </GlowPanel>
        </section>

        <section className="expertise section-pad" id="expertise">
          <GlowPanel>
            <div className="page-width">
            <SectionHeading
              index="03"
              label="CAPABILITIES / METHOD"
              title={<>以平面设计，组织复杂信息。</>}
              aside={<>品牌视觉 / 版式设计<br />AI 视觉表达</>}
            />

            <div className="skill-grid">
              {strengths.map((item) => (
                <article className="skill-card" key={item.id}>
                  <div className="skill-card-top">
                    <span className="skill-code">{item.id}</span>
                    <span className="skill-index">/{item.index}</span>
                  </div>
                  <div className={`skill-cover skill-cover-${item.id.toLowerCase()}`} aria-hidden="true">
                    <div className="skill-cover-meta">
                      <span>CAP. / {item.index}</span>
                      <span>2026</span>
                    </div>
                    <span className="skill-cover-pattern" />
                    <strong>{item.coverWord}</strong>
                    <span className="skill-cover-caption">VISUAL METHOD</span>
                    <div className="skill-cover-footer">
                      <span>{item.id} / SIGNAL</span>
                      <i><ArrowIcon /></i>
                    </div>
                  </div>
                  <div className="skill-card-copy">
                    <p>{item.english}</p>
                    <h3>{item.title}</h3>
                    <span>{item.text}</span>
                  </div>
                  <div className="skill-card-bottom">
                    <span>{item.tools}</span>
                    <ArrowIcon />
                  </div>
                </article>
              ))}
            </div>

            <div className="toolkit">
              <div className="toolkit-label">
                <span>VISUAL TOOLKIT</span>
                <small>从内容梳理到视觉落地，用工具服务清晰的表达。</small>
              </div>
              <div className="toolkit-tags">
                {["Photoshop", "Illustrator", "Brand Visual", "Poster", "Packaging", "Layout", "GPT", "Codex"].map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
            </div>
          </GlowPanel>
        </section>

        <section className="contact-section" id="contact">
          <GlowPanel className="section-glow-contact">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-grid" aria-hidden="true" />
          <div className="page-width contact-inner">
            <span className="contact-english-title" aria-hidden="true">CONTACT</span>
            <div className="contact-topline">
              <span>04 / CONTACT</span>
              <span>LET'S CREATE SOMETHING MEANINGFUL</span>
            </div>

            <div className="contact-main">
              <p className="contact-kicker">有一个品牌、一套内容，或一个需要被清晰表达的想法？</p>
              <h2>
                下一件
                <em>好设计</em>
                <br />
                一起完成。
              </h2>
              <a className="contact-circle" href="mailto:2391401130@qq.com">
                <span>LET'S<br />TALK</span>
                <ArrowIcon />
              </a>
            </div>

            <div className="contact-bottom">
              <a className="contact-email" href="mailto:2391401130@qq.com">
                2391401130@qq.com
              </a>
              <div className="contact-links">
                <a href="tel:+8619512215250">+86 195 1221 5250</a>
                <span>SHANGHAI / CHINA</span>
              </div>
            </div>

            <footer className="site-footer">
              <span>© 2026 WANG ZHEHAO</span>
              <span>DESIGNED WITH CURIOSITY & CODE</span>
              <a href="#home">BACK TO TOP ↑</a>
            </footer>
          </div>
          </GlowPanel>
        </section>
      </main>

      {selectedProject && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} 项目详情`}
          onClick={() => setSelectedProject(null)}
        >
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="关闭项目详情"
            >
              <CrossIcon />
            </button>
            <div className={`modal-visual ${selectedProject.images?.length > 1 ? "is-gallery" : ""} ${selectedProject.images?.length > 2 ? "is-many" : ""}`}>
              {selectedProject.images?.length > 1 ? (
                <div className={`modal-gallery-grid ${selectedProject.galleryLayout ? `is-${selectedProject.galleryLayout}` : ""}`}>
                  {selectedProject.images.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${selectedProject.title}项目作品 ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={selectedProject.image}
                  alt={`${selectedProject.title}项目作品`}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              )}
              <span>
                {selectedProject.visualLabel ?? `${selectedProject.id} / ${String(selectedProject.images?.length ?? 1).padStart(2, "0")}`}
              </span>
            </div>
            <div className="modal-copy">
              <p className="modal-type">{selectedProject.type} · {selectedProject.year}</p>
              <h2>{selectedProject.title}</h2>
              <span className="modal-english">{selectedProject.english}</span>
              <p className="modal-summary">{selectedProject.detail}</p>
              <div className="modal-deliverables">
                {selectedProject.deliverables.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeading({ index, label, title, aside }) {
  return (
    <div className="section-heading">
      <span className="section-heading-english" aria-hidden="true">
        {label.split("/")[0].trim()}
      </span>
      <div className="section-heading-label">
        <span>{index}</span>
        <p>{label}</p>
      </div>
      <h2>{title}</h2>
      {aside && <p className="section-aside">{aside}</p>}
    </div>
  );
}

function Stat({ value, suffix = "", label, note }) {
  return (
    <div className="stat">
      <div className="stat-value">
        {value}<sup>{suffix}</sup>
      </div>
      <div className="stat-copy">
        <span>{label}</span>
        <small>{note}</small>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onOpen }) {
  const projectImages = project.images ?? [project.image];

  return (
    <button
      className={`project-card project-card-${project.size} ${project.longTitle ? "project-card-long-title" : ""}`}
      type="button"
      onClick={onOpen}
      data-cursor="view"
    >
      <span className={`project-media ${projectImages.length > 1 ? "is-duo" : "is-board"}`}>
        {projectImages.map((image, imageIndex) => (
          <img
            key={image}
            src={image}
            alt={`${project.title} — ${project.english} ${imageIndex + 1}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </span>
      <span className="project-shade" />
      <span className="project-number">{String(index).padStart(2, "0")}</span>
      <span className="project-year">{project.year}</span>
      <span className="project-open"><ArrowIcon /></span>
      <span className="project-copy">
        <small>{project.type}</small>
        <span className="project-title-row">
          <strong>{project.title}</strong>
          <em>{project.english}</em>
        </span>
        <span className="project-summary">{project.summary}</span>
      </span>
      <span className="project-view">OPEN CASE ↗</span>
    </button>
  );
}

function GraphicCard({ project, index, onOpen }) {
  const previewImages = project.previewImages ?? [project.image];

  return (
    <button
      className="graphic-card"
      type="button"
      onClick={onOpen}
      data-cursor="view"
    >
      <span className={`graphic-card-visual ${previewImages.length > 1 ? "is-multi-preview" : ""}`}>
        {previewImages.map((image, imageIndex) => (
          <img
            key={image}
            src={image}
            alt={`${project.title} — ${project.english} ${imageIndex + 1}`}
            loading="lazy"
            decoding="async"
          />
        ))}
        <span>{project.visualLabel ?? "ISSUE / 158"}</span>
      </span>
      <span className="graphic-card-copy">
        <small>{project.type} · {project.year}</small>
        <span className="graphic-card-title">
          <strong>{project.title}</strong>
          <em>{project.english}</em>
        </span>
        <span className="graphic-card-summary">{project.summary}</span>
        <span className="graphic-card-tags">
          {project.deliverables.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
        <span className="graphic-card-action">
          <span>{index} / OPEN CASE</span>
          <ArrowIcon />
        </span>
      </span>
    </button>
  );
}

export default App;
