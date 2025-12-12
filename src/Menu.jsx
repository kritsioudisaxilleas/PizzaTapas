import React, { useEffect } from 'react';

export default function Menu() {
  useEffect(() => {
    const container = document.querySelector('.pizza-menu-page');
    if (!container) return;

    const handleClick = (event) => {
      const button = event.target.closest('.size-btn');
      if (!button) return;

      const card = button.closest('.menu-card');
      if (!card) return;

      const priceElement = card.querySelector('.menu-item-price');
      if (!priceElement) return;

      const size = button.getAttribute('data-size');          // "30" / "40" / "50"
      const newPrice = priceElement.getAttribute('data-' + size); // data-30, data-40, data-50
      if (!newPrice) return;

      // βγάζουμε active από όλα τα κουμπιά της κάρτας
      card.querySelectorAll('.size-btn').forEach((btn) => {
        btn.classList.remove('active');
      });

      // βάζουμε active στο πατημένο
      button.classList.add('active');

      // αλλάζουμε την τιμή
      priceElement.textContent = '€' + newPrice;
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      className="pizza-menu-page"
      dangerouslySetInnerHTML={{
        __html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pizzeria Pizza Tapas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" >
  <style>
    /* ===== CSS VARIABLES ===== */
    :root {
      --color-primary: #C41E3A;
      --color-primary-dark: #8B0000;
      --color-primary-light: #E85A6B;
      --color-cream: #FFF8F0;
      --color-white: #FFFFFF;
      --color-dark: #1A1A1A;
      --color-text: #333333;
      --color-text-light: #666666;
      --color-overlay: rgba(0, 0, 0, 0.55);
      --font-heading: 'Playfair Display', Georgia, serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
      --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.12);
      --shadow-lg: 0 8px 40px rgba(0, 0, 0, 0.16);
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      --border-radius: 12px;
    }

    /* ===== RESET & BASE ===== */
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }

    body {
      font-family: var(--font-body);
      color: var(--color-text);
      background-color: var(--color-cream);
      line-height: 1.6;
      overflow-x: hidden;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    a {
      text-decoration: none;
      color: inherit;
      transition: var(--transition);
    }

    ul {
      list-style: none;
    }

    /* ===== NAVIGATION ===== */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: var(--shadow-sm);
      padding: 0 2rem;
      transition: var(--transition);
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 72px;
    }

    .nav-logo {
     display: flex;
    align-items: center;
      gap: 10px;
      font-family: var(--font-heading);
      font-size: 1.9rem;
      font-weight: 700;
      color: var(--color-primary);
      letter-spacing: -0.02em;
    }

    .nav-logo span {
      color: #C11B1B;
    }
      .nav-logo-img {
  height: 64px;
  width: 64px;
  border-radius: 50%;
  object-fit: cover;
}


    .nav-menu {
      display: flex;
      gap: 2.5rem;
    }

    .nav-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 0.5rem 0;
      position: relative;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-primary);
      transition: var(--transition);
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .nav-link:hover {
      color: var(--color-primary);
    }

    .nav-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 0.5rem;
    }

    .nav-toggle span {
      width: 24px;
      height: 2px;
      background: var(--color-dark);
      transition: var(--transition);
    }

    /* ===== HERO SECTION ===== */
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80') center/cover no-repeat;
    }

    .hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.65),
    rgba(0, 0, 0, 0.85)
  );
}

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 2rem;
      max-width: 800px;
    }

    .hero-badge {
      display: inline-block;
      padding: 0.5rem 1.25rem;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 50px;
      color: var(--color-white);
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 1rem;
      backdrop-filter: blur(4px);
    }

    .hero-title {
      font-family: var(--font-heading);
      font-size: clamp(3rem, 8vw, 5.5rem);
      font-weight: 700;
      color: var(--color-white);
      line-height: 1.1;
      margin-bottom: 1.5rem;
      letter-spacing: -0.02em;
    }

    .hero-title span {
        color: #C11B1B;

    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-scroll {
  position: absolute;
  bottom: 2.2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

    .hero-scroll::after {
  content: '';
  width: 1.5px;
  height: 48px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.95), transparent);
  animation: scrollBounce 2s infinite;
}


    @keyframes scrollBounce {
      0%, 100% { transform: translateY(0); opacity: 1; }
      50% { transform: translateY(10px); opacity: 0.5; }
    }

    /* ===== SECTION STYLES ===== */
    .section {
      padding: 6rem 2rem;
    }

    .section-light {
      background: var(--color-white);
    }

    .section-cream {
      background: var(--color-cream);
    }

    .section-dark {
      background: var(--color-dark);
      color: var(--color-white);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: rgba(196, 30, 58, 0.1);
      color: var(--color-primary);
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      border-radius: 50px;
      margin-bottom: 1rem;
    }

    .section-title {
      font-family: var(--font-heading);
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      color: var(--color-dark);
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    .section-dark .section-title {
      color: var(--color-white);
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: var(--color-text-light);
      max-width: 500px;
      margin: 0 auto;
    }

    /* ===== MENU SECTION ===== */
    .menu-category {
      margin-bottom: 4rem;
    }

    .menu-category:last-child {
      margin-bottom: 0;
    }

    .category-title {
      font-family: var(--font-heading);
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--color-dark);
      margin-bottom: 2rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid var(--color-primary);
      display: inline-block;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .menu-card {
      background: var(--color-white);
      border-radius: var(--border-radius);
      padding: 1.75rem;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
      border: 1px solid rgba(0, 0, 0, 0.04);
      position: relative;
      overflow: hidden;
    }

    .menu-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 0;
      background: var(--color-primary);
      transition: var(--transition);
    }

    .menu-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
    }

    .menu-card:hover::before {
      height: 100%;
    }

    .menu-card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
      gap: 1rem;
    }

    .menu-item-name {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-dark);
    }

    .menu-item-price {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-primary);
      white-space: nowrap;
    }

    .menu-item-desc {
      font-size: 0.9rem;
      color: var(--color-text-light);
      line-height: 1.6;
    }

    .menu-item-tags {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .menu-tag {
      padding: 0.25rem 0.75rem;
      background: var(--color-cream);
      color: var(--color-text-light);
      font-size: 0.7rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-radius: 50px;
    }

    .menu-tag.popular {
      background: rgba(196, 30, 58, 0.1);
      color: var(--color-primary);
    }

    .menu-tag.vegetarian {
      background: rgba(34, 139, 34, 0.1);
      color: #228B22;
    }

    /* ===== PIZZA SIZE SELECTOR ===== */
    .pizza-sizes {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }

    .size-btn {
      flex: 1;
      padding: 0.5rem 0.75rem;
      background: var(--color-cream);
      border: 2px solid transparent;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text);
      cursor: pointer;
      transition: var(--transition);
    }

    .size-btn:hover {
      background: rgba(196, 30, 58, 0.1);
      border-color: var(--color-primary-light);
    }

    .size-btn.active {
      background: var(--color-primary);
      color: var(--color-white);
      border-color: var(--color-primary);
    }

    /* ===== GALLERY SECTION ===== */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .gallery-item {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: var(--border-radius);
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }

    .gallery-item::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
      opacity: 0;
      transition: var(--transition);
    }

    .gallery-item:hover img {
      transform: scale(1.08);
    }

    .gallery-item:hover::after {
      opacity: 1;
    }

    /* ===== SPECIAL OFFERS ===== */
    .offers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .offer-card {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
      border-radius: var(--border-radius);
      padding: 2.5rem;
      color: var(--color-white);
      position: relative;
      overflow: hidden;
      transition: var(--transition);
    }

    .offer-card::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    }

    .offer-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .offer-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50px;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
    }

    .offer-title {
      font-family: var(--font-heading);
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .offer-desc {
      font-size: 0.95rem;
      opacity: 0.9;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .offer-price {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
    }

    .offer-price-old {
      font-size: 1.25rem;
      text-decoration: line-through;
      opacity: 0.6;
    }

    .offer-price-new {
      font-size: 2.5rem;
      font-weight: 700;
    }

    /* ===== CONTACT SECTION ===== */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .contact-item {
      display: flex;
      gap: 1.25rem;
    }

    .contact-icon {
      width: 48px;
      height: 48px;
      background: rgba(196, 30, 58, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .contact-icon svg {
      width: 22px;
      height: 22px;
      stroke: var(--color-primary);
    }

    .contact-label {
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-light);
      margin-bottom: 0.25rem;
    }

    .contact-value {
      font-size: 1.1rem;
      color: var(--color-dark);
      font-weight: 500;
    }

    .contact-value a:hover {
      color: var(--color-primary);
    }

    .contact-map {
      border-radius: var(--border-radius);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      height: 100%;
      min-height: 350px;
    }

    .contact-map iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    /* ===== FOOTER ===== */
    .footer {
      background: var(--color-dark);
      color: var(--color-white);
      padding: 3rem 2rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    .footer-logo {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
    }

    .footer-logo span {
       color: #c41e3a;   
  font-weight: 800;   
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    .footer-links a {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
    }

    .footer-links a:hover {
      color: var(--color-white);
    }

    .footer-copyright {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.5);
    }

    .footer-social {
      display: flex;
      gap: 1rem;
    }

    .footer-social a {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
    }

    .footer-social a:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }

    .footer-social svg {
      width: 18px;
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 992px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }

      .contact-map {
        min-height: 300px;
      }

      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .nav-menu {
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        background: var(--color-white);
        flex-direction: column;
        padding: 2rem;
        gap: 1.5rem;
        box-shadow: var(--shadow-md);
        transform: translateY(-150%);
        opacity: 0;
        transition: var(--transition);
        pointer-events: none;
      }

      .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      .nav-toggle {
        display: flex;
      }

      .section {
        padding: 4rem 1.5rem;
      }

      .menu-grid {
        grid-template-columns: 1fr;
      }

      .offers-grid {
        grid-template-columns: 1fr;
      }

      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
      }

      .footer-content {
        flex-direction: column;
        text-align: center;
      }

      .footer-links {
        flex-direction: column;
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .hero-buttons {
        flex-direction: column;
        width: 100%;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }

      .gallery-grid {
        grid-template-columns: 1fr;
      }

      .offer-card {
        padding: 2rem;
      }
    }
      /* ===== HERO BUTTON WHITE STYLE ===== */
.hero-buttons .btn-primary {
background: rgba(255, 255, 255, 0.9);

  color: var(--color-primary);           /* κόκκινο κείμενο */
  padding: 1.3rem 3.2rem;
  border-radius: 40px;
  font-size: 1.15rem;       /* λίγο πιο μεγάλο */
font-weight: 700;         /* πιο έντονο */
letter-spacing: 0.05em;   /* πιο καθαρό, premium */
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 15px rgba(196, 30, 58, 0.7);
  transition: 0.25s ease-in-out;
}

.hero-buttons .btn-primary:hover {
  background: var(--color-primary);       /* κόκκινο στο hover */
  color: white !important;                /* άσπρο κείμενο στο hover */
  transform: translateY(-3px);
}



  .ingredients {
    font-size: 14px;
    color: #6b6b6b;
    line-height: 1.55;
    margin-top: 6px;
  }

  .ingredients::before {
    content: "Ingredients";
    display: block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #b0b0b0;
    margin-bottom: 2px;
  }

.hero-title {
  font-family: 'Playfair Display SC', serif;
  letter-spacing: 0.10em;
}
/* NAVBAR LOGO TEXT – CLEAN */
.nav-logo {
  font-family: 'Inter', sans-serif;
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: 0.025em;
}

.nav-logo span {
  color: var(--color-primary);
  font-weight: 800;
}


.hero-scroll {
  animation: fadePulse 2.5s infinite;
}

@keyframes fadePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}


  </style>
</head>
<body>
  <!-- NAVIGATION -->
  <nav class="navbar">
    <div class="nav-container">
      <a href="#hero" class="nav-logo">
  <img src="https://i.imgur.com/ssKw2PU.png" alt="logo" class="nav-logo-img">
  Pizza <span>Tapas</span>
</a>


      <ul class="nav-menu">
        <li><a href="#menu" class="nav-link">Menu</a></li>
        <li><a href="#gallery" class="nav-link">Gallery</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
      </ul>
      <div class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <section id="hero" class="hero">
    <div class="hero-content">
      <span class="hero-badge">EST. 2007 • AUTHENTIC ITALIAN</span>
      <h1 class="hero-title">Pizza <span>Tapas</span></h1>
      <div class="hero-buttons">
        <a href="#menu" class="btn btn-primary">View Our Menu</a>
      </div>
    </div>
    <div class="hero-scroll">
      <span>Scroll</span>
    </div>
  </section>

  <!-- MENU SECTION -->
  <section id="menu" class="section section-cream">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Our Menu</span>
        <h2 class="section-title">Delicious Creations</h2>
        <p class="section-subtitle">Each dish is crafted with passion using traditional recipes and the freshest ingredients</p>
      </div>

      <!-- PIZZAS -->
      <div class="menu-category">
        <h3 class="category-title">🍕 Pizzas</h3>
        <div class="menu-grid">
<div class="menu-card">
  <div class="menu-card-header">
    <h4 class="menu-item-name">Tapa's Pizza</h4>
    <span class="menu-item-price"
          data-30="14.00"
          data-40="17.00"
          data-50="19.00">€14.00</span>
  </div>

  <p class="menu-item-desc ingredients">
    Σάλτσα τομάτας, μοτσαρέλα, ρόκα, σαλάμι μπύρας, λουκάνικο πεπερόνι
  </p>

  <div class="pizza-sizes">
    <button class="size-btn active" data-size="30">30cm</button>
    <button class="size-btn" data-size="40">40cm</button>
    <button class="size-btn" data-size="50">50cm</button>
  </div>

  <div class="menu-item-tags">
    <span class="menu-tag popular">Popular</span>
  </div>
</div>


          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Margheritta </h4>
              <span class="menu-item-price" data-30="12.00" data-40="14.00" data-50="16.00">€12.00</span>
            </div>
            <p class="menu-item-desc ingredients">Σάλτσα τομάτας, γκούντα </p>
            <div class="pizza-sizes">
              <button class="size-btn active" data-size="30">30cm</button>
              <button class="size-btn" data-size="40">40cm</button>
              <button class="size-btn" data-size="50">50cm</button>
            </div>
            <div class="menu-item-tags">
    <span class="menu-tag popular">Popular</span>
    <span class="menu-tag vegetarian">Vegeterian</span>
  </div>
            </div>
 <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Special Pizza </h4>
              <span class="menu-item-price" data-30="13.00" data-40="16.00" data-50="18.00">€13.00</span>
            </div>
            <p class="menu-item-desc ingredients">Σάλτσα τομάτας, γκούντα,ζαμπόν, μπέικον, σαλάμι μπύρας, πεπερόνι, μανιτάρια,πιπεριά </p>
            <div class="pizza-sizes">
              <button class="size-btn active" data-size="30">30cm</button>
              <button class="size-btn" data-size="40">40cm</button>
              <button class="size-btn" data-size="50">50cm</button>
            </div>
            <div class="menu-item-tags">
              <span class="menu-tag popular">Popular</span>
            </div>
          </div>
          

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Tuna Pizza </h4>
              <span class="menu-item-price" data-30="13.00" data-40="16.00" data-50="18.00">€13.00</span>
            </div>
            <p class="menu-item-desc ingredients">Σάλτσα τομάτας, γκούντα, τόνος, κρεμμύδι, καλαμπόκι, πιπεριά </p>
            <div class="pizza-sizes">
              <button class="size-btn active" data-size="30">30cm</button>
              <button class="size-btn" data-size="40">40cm</button>
              <button class="size-btn" data-size="50">50cm</button>
            </div>
    
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Vegeterian's Pizza </h4>
              <span class="menu-item-price" data-30="13.00" data-40="16.00" data-50="18.00">€13.00</span>
            </div>
            <p class="menu-item-desc ingredients">Σάλτσα τομάτας, γκούντα, πιπεριές, μανιτάρια, τοματίνια, κολοκυθάκι, ελιές </p>
            <div class="pizza-sizes">
              <button class="size-btn active" data-size="30">30cm</button>
              <button class="size-btn" data-size="40">40cm</button>
              <button class="size-btn" data-size="50">50cm</button>
            </div>
            <div class="menu-item-tags">
              <span class="menu-tag vegetarian">Vegeterian </span>
            </div>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Quattro Formaggi</h4>
              <span class="menu-item-price" data-30="14.00" data-40="17.00" data-50="19.00">€14.00</span>
            </div>
            <p class="menu-item-desc ingredients">Σάλτσα τομάτας, γκούντα, έμενταλ, μπλε τυρί, παρμεζάνα</p>
            <div class="pizza-sizes">
              <button class="size-btn active" data-size="30">30cm</button>
              <button class="size-btn" data-size="40">40cm</button>
              <button class="size-btn" data-size="50">50cm</button>
            </div>
            </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Light Pizza</h4>
              <span class="menu-item-price" data-30="14.00" data-40="17.00" data-50="19.00">€14.00</span>
            </div>
            <p class="menu-item-desc ingredients">Σάλτσα τομάτας, κίτρινο τυρί με χαμηλά λιπαρά, γαλοπούλα κοτόπουλο, μανιτάρια, πιπεριά</p>
            <div class="pizza-sizes">
              <button class="size-btn active" data-size="30">30cm</button>
              <button class="size-btn" data-size="40">40cm</button>
              <button class="size-btn" data-size="50">50cm</button>
            </div>
            <div class="menu-item-tags">
              <span class="menu-tag">Light & Tasty</span>
            </div>
          </div>
        </div>
      </div>

      <!-- PASTA -->
      <div class="menu-category">
        <h3 class="category-title">🍝 Pasta</h3>
        <div class="menu-grid">
        <div class="menu-card">
  <div class="menu-card-header">
    <h4 class="menu-item-name">CACIO E PEPE </h4>
    <span class="menu-item-price">€12.50</span>
  </div>

  <p class="menu-item-desc">
   πεκορινο ρομανο βουτυρο πιπερι 
  </p>

  <div class="menu-item-tags">
    <span class="menu-tag popular">TASTY</span>
  </div>
</div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Spaghetti Carbonara</h4>
              <span class="menu-item-price">€14.00</span>
            </div>
            <p class="menu-item-desc">Guanciale, egg yolk, pecorino romano, black pepper, fresh parsley</p>
            <div class="menu-item-tags">
              <span class="menu-tag popular">Popular</span>
            </div>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Penne all'Arrabbiata</h4>
              <span class="menu-item-price">€11.50</span>
            </div>
            <p class="menu-item-desc">Spicy tomato sauce, garlic, red chili flakes, fresh basil, parmesan</p>
            <div class="menu-item-tags">
              <span class="menu-tag vegetarian">Vegetarian</span>
              <span class="menu-tag">Spicy</span>
            </div>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Tagliatelle al Ragù</h4>
              <span class="menu-item-price">€15.50</span>
            </div>
            <p class="menu-item-desc">Slow-cooked beef ragù, homemade tagliatelle, parmesan, fresh herbs</p>
            <div class="menu-item-tags">
              <span class="menu-tag">Traditional</span>
            </div>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Linguine ai Frutti di Mare</h4>
              <span class="menu-item-price">€18.00</span>
            </div>
            <p class="menu-item-desc">Mussels, clams, prawns, white wine, garlic, cherry tomatoes, parsley</p>
            <div class="menu-item-tags">
              <span class="menu-tag">Seafood</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SALADS -->
      <div class="menu-category">
        <h3 class="category-title">🥗 Salads</h3>
        <div class="menu-grid">
          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Insalata Caprese</h4>
              <span class="menu-item-price">€10.00</span>
            </div>
            <p class="menu-item-desc">Buffalo mozzarella, heirloom tomatoes, fresh basil, extra virgin olive oil, balsamic</p>
            <div class="menu-item-tags">
              <span class="menu-tag vegetarian">Vegetarian</span>
              <span class="menu-tag popular">Popular</span>
            </div>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Caesar Italiana</h4>
              <span class="menu-item-price">€11.50</span>
            </div>
            <p class="menu-item-desc">Romaine hearts, anchovy dressing, parmesan shavings, focaccia croutons</p>
            <div class="menu-item-tags">
              <span class="menu-tag">Classic</span>
            </div>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Rucola e Parmigiano</h4>
              <span class="menu-item-price">€9.50</span>
            </div>
            <p class="menu-item-desc">Wild arugula, aged parmesan, cherry tomatoes, pine nuts, lemon vinaigrette</p>
            <div class="menu-item-tags">
              <span class="menu-tag vegetarian">Vegetarian</span>
            </div>
          </div>
        </div>
      </div>

      <!-- DRINKS -->
      <div class="menu-category">
        <h3 class="category-title">🍷 Drinks</h3>
        <div class="menu-grid">
          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">House Red Wine</h4>
              <span class="menu-item-price">€6.00</span>
            </div>
            <p class="menu-item-desc">Glass of our carefully selected Montepulciano d'Abruzzo</p>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">House White Wine</h4>
              <span class="menu-item-price">€6.00</span>
            </div>
            <p class="menu-item-desc">Glass of crisp Pinot Grigio from the Veneto region</p>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Aperol Spritz</h4>
              <span class="menu-item-price">€8.50</span>
            </div>
            <p class="menu-item-desc">Aperol, Prosecco, soda water, orange slice</p>
            <div class="menu-item-tags">
              <span class="menu-tag popular">Popular</span>
            </div>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">San Pellegrino</h4>
              <span class="menu-item-price">€3.50</span>
            </div>
            <p class="menu-item-desc">Italian sparkling mineral water (750ml)</p>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Espresso</h4>
              <span class="menu-item-price">€2.50</span>
            </div>
            <p class="menu-item-desc">Authentic Italian espresso, rich and aromatic</p>
          </div>

          <div class="menu-card">
            <div class="menu-card-header">
              <h4 class="menu-item-name">Limonata Fresca</h4>
              <span class="menu-item-price">€4.00</span>
            </div>
            <p class="menu-item-desc">Fresh-squeezed lemonade with a hint of mint</p>
            <div class="menu-item-tags">
              <span class="menu-tag">Refreshing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GALLERY SECTION -->
  <section id="gallery" class="section section-light">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Gallery</span>
        <h2 class="section-title">Visual Feast</h2>
        <p class="section-subtitle">A glimpse of our culinary artistry and warm atmosphere</p>
      </div>
      <div class="gallery-grid">
        <div class="gallery-item">
          <img src="data:image/jpeg;base64,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" alt="Pizza being prepared">
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1585589197566-b482772f8831?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3VufGVufDB8fDB8fHww">
        </div>
        <div class="gallery-item">
          <img src="https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&dl=pexels-hsapir-1054655.jpg&fm=jpg" alt="Fresh pasta">
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80" alt="Restaurant interior">
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80" alt="Italian ingredients">
        </div>
        <div class="gallery-item">
          <img src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80" alt="Wood fired oven">
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT SECTION -->
  <section id="contact" class="section section-light">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Find Us</span>
        <h2 class="section-title">Visit Our Restaurant</h2>
        <p class="section-subtitle">We're located in the heart of the city, ready to welcome you</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info">
          <div class="contact-item">
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <p class="contact-label">Address</p>
              <p class="contact-value">Agios Nikolaos Xalkidiki<br>63078, Greece</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <p class="contact-label">Phone</p>
              <p class="contact-value"><a href="tel:+302375032050">+30 23750 32050</a></p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="contact-label">Opening Hours</p>
              <p class="contact-value">Every Day: 18:00 - 00:00</p>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p class="contact-label">Email</p>
              <p class="contact-value"><a href="mailto:pizzatapas75@gmail.com">pizzatapas75@gmail.com</a></p>
            </div>
          </div>
        </div>
        <div class="contact-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.9856841644856!2d23.749999999999996!3d40.82166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a838f41428e0a1%3A0x9867d13e4d5d3d0e!2sAgios%20Nikolaos%2C%20Xalkidiki!5e0!3m2!1sen!2sgr!4v1699999999999!5m2!1sen!2sgr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">Pizza <span>Tapas</span></div>
      <div class="footer-links">
        <a href="#menu">Menu</a>
        <a href="#contact">Contact</a>
      </div>
      <div class="footer-social">
      <a href="https://www.facebook.com/profile.php?id=100054329508560&locale=el_GR"
        aria-label="Facebook"
         target="_blank"
         rel="noopener noreferrer">

          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
        </a>
        <a href="https://www.instagram.com/_pizzatapas/"
   aria-label="Instagram"
   target="_blank"
   rel="noopener noreferrer">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
        <a href="https://www.tripadvisor.com.gr/Restaurant_Review-g2040823-d10720958-Reviews-Pizzeria_Tapas-Agios_Nikolaos_Sithonia_Halkidiki_Region_Central_Macedonia.html"
   aria-label="TripAdvisor"
   target="_blank"
   rel="noopener noreferrer">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 004.3 10.125 5.994 5.994 0 005.743-4.283 5.994 5.994 0 005.743 4.283 5.997 5.997 0 004.3-10.125L24 6.648h-4.361a13.573 13.573 0 00-7.633-2.353zM6.263 17.91a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm5.743-4.5a5.963 5.963 0 00-1.852-4.338 10.39 10.39 0 014.092 0 5.963 5.963 0 00-2.24 4.338zm5.743 4.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"/></svg>
        </a>
      </div>
      <p class="footer-copyright">© 2025 Pizza Tapas. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>
        `,
      }}
    />
  );
}
