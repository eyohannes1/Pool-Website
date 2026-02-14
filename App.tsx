import React, { useState, useEffect } from 'react';
import { Menu, X, Star, ShieldCheck, Award, ArrowRight, Droplets, Wrench, Hammer, Phone, Moon, Sun, CheckCircle2, AlertCircle, ChevronRight, Building2 } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- Reusable UI Components ---

const RevealText = ({ children, className = "", delay = 0, key }: { children?: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => {
  return (
    <div key={key} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const FadeIn = ({ children, className = "", delay = 0, key }: { children?: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => {
  return (
    <motion.div
      key={key}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

const ScrollRevealImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  return (
    <div className={`overflow-hidden relative bg-secondary-light dark:bg-secondary-dark ${className}`}>
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{
          scale: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
          opacity: { duration: 0.8, ease: "linear" },
          default: { duration: 0.6, ease: "easeOut" }
        }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-primary/5 mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

const Logo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 300 125" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    {/* Top Text: COMPLETE */}
    <text x="150" y="45" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="42" letterSpacing="2">
      COMPLETE
    </text>

    {/* Wave Graphic - Positioned at y=58-68 to be evenly spaced */}
    <path d="M20,58 C60,43 90,73 150,58 C210,43 240,73 280,58 L280,68 C240,83 210,53 150,68 C90,83 60,53 20,68 Z" />

    {/* Bottom Text: POOL CARE - Moved slightly down to 112 */}
    <text x="150" y="112" textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="42" letterSpacing="2">
      POOL CARE
    </text>
    <text x="290" y="112" textAnchor="end" fontFamily="Arial, sans-serif" fontSize="10">®</text>
  </svg>
);

// --- Page Sections ---

const Header = ({ isDark, setIsDark, currentPage, setCurrentPage }: { isDark: boolean, setIsDark: (v: boolean) => void, currentPage: string, setCurrentPage: (p: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md py-2 border-b border-gray-100 dark:border-gray-900 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }} className="z-50 relative group">
            <Logo className={`h-16 w-auto transition-colors duration-300 ${scrolled || isOpen ? 'text-primary' : 'text-white'}`} />
          </a>

          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${scrolled || isOpen ? 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'}`}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`z-50 relative flex items-center gap-2 font-montserrat font-medium text-sm tracking-widest uppercase cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${scrolled || isOpen ? 'text-black dark:text-white' : 'text-white'}`}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
            >
              <span className="hidden sm:inline">{isOpen ? 'Close' : 'Menu'}</span>
              <div className="relative w-6 h-6">
                <AnimatePresence mode='wait'>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      className="absolute inset-0"
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      className="absolute inset-0"
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {['Home', 'Services', 'About', 'Contact'].map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    if (item === 'Contact') {
                      setIsOpen(false);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      handleNav(item.toLowerCase());
                    }
                  }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className={`font-playfair text-5xl md:text-7xl hover:text-primary transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${currentPage === item.toLowerCase() ? 'text-primary' : 'text-black dark:text-white'}`}
                  aria-label={`Navigate to ${item} page`}
                  aria-current={currentPage === item.toLowerCase() ? 'page' : undefined}
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HomeHero = ({ setCurrentPage }: { setCurrentPage: (p: string) => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop"
          alt="Pristine swimming pool"
          className="w-full h-full object-cover brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <RevealText className="mb-4">
          <span className="font-cormorant text-xl md:text-2xl italic tracking-wider text-white/90">
            Certified • Licensed • Insured
          </span>
        </RevealText>

        <RevealText delay={0.1}>
          <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl mb-8 leading-none">
            Deep Blue
          </h1>
        </RevealText>

        <RevealText delay={0.2}>
          <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl mb-8 leading-none text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
            Perfection.
          </h1>
        </RevealText>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="w-24 h-2 bg-primary mx-auto mb-10"
        />

        <FadeIn delay={0.5} className="max-w-xl mx-auto flex justify-center flex-col items-center">
          <p className="font-montserrat font-light text-lg md:text-xl leading-relaxed mb-10 text-white/80">
            Premium care for the modern aquatic lifestyle. We bring clarity and architectural sophistication to your backyard sanctuary.
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block bg-primary text-white border border-primary px-10 py-5 font-montserrat text-sm tracking-widest uppercase hover:bg-transparent hover:text-white transition-all duration-300 shadow-2xl shadow-primary/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Get your free pool service quote"
          >
            GET YOUR FREE QUOTE
          </button>
        </FadeIn>
      </div>

      <motion.div
        className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="font-cormorant italic text-lg text-white/40">Scroll to explore</span>
      </motion.div>
    </section>
  );
};

const PageHero = ({ title, subtitle, src }: { title: string, subtitle: string, src: string }) => {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center bg-black">
      <div className="absolute inset-0 z-0">
        <img src={src} alt={title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      </div>
      <div className="relative z-10 text-center text-white px-6 mt-20">
        <RevealText>
          <h1 className="font-playfair text-5xl md:text-7xl mb-6">{title}</h1>
        </RevealText>
        <FadeIn delay={0.2}>
          <p className="font-montserrat text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        </FadeIn>
      </div>
    </section>
  );
};

const HomeFeatures = ({ setCurrentPage }: { setCurrentPage: (p: string) => void }) => {
  const features = [
    {
      title: "Weekly Service",
      desc: "Professional weekly pool service with uniformed and trained technicians providing the highest quality service in the industry.",
      icon: <Droplets className="w-8 h-8 text-primary" />,
      img: "/assets/images/pool_service_professional_1771034110381.png"
    },
    {
      title: "Repairs",
      desc: "Factory trained and experienced repair technicians providing you with prompt and reliable repair service.",
      icon: <Wrench className="w-8 h-8 text-primary" />,
      img: "/assets/images/complete_pool_care_tech_1771034574498.png"
    },
    {
      title: "Products",
      desc: "We offer the most dependable pool products in the industry that includes an unparalleled warranty.",
      icon: <Hammer className="w-8 h-8 text-primary" />,
      img: "/assets/images/Beige pool pump by clear blue water.png"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 border-b border-gray-100 dark:border-gray-900 pb-8">
          <div className="max-w-2xl">
            <RevealText>
              <h2 className="font-playfair text-5xl md:text-6xl mb-4 dark:text-white">Professional Services</h2>
            </RevealText>
            <FadeIn delay={0.2}>
              <p className="font-montserrat font-light text-gray-500 dark:text-gray-400 text-lg">
                Delivering excellence through meticulous craftsmanship and deep technical expertise.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} className="hidden md:block">
            <span className="font-cormorant text-2xl italic text-primary">Precision Care Since 1988</span>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((item, idx) => (
            <div key={idx} onClick={() => setCurrentPage('services')} className="group cursor-pointer">
              <div className="mb-8 aspect-[4/5] w-full">
                <ScrollRevealImage src={item.img} alt={item.title} className="w-full h-full rounded-sm" />
              </div>
              <div className="flex items-start justify-between border-t border-gray-100 dark:border-gray-900 pt-6 group-hover:border-primary transition-colors duration-500">
                <div>
                  <h3 className="font-playfair text-2xl md:text-3xl mb-3 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">{item.desc}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <ArrowRight className="text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-20 bg-secondary-light dark:bg-secondary-dark border-y border-gray-100 dark:border-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-10 md:gap-12 opacity-40 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-3">
            <ShieldCheck size={40} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl dark:text-white">Licensed & Insured</span>
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] dark:text-gray-400">Security & Peace of Mind</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} className="fill-primary text-primary" />)}
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-xl dark:text-white">3.6 Google Rating</span>
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] dark:text-gray-400">Based on 120+ Verifications</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award size={40} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl dark:text-white">Master Technicians</span>
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] dark:text-gray-400">Certified APSP Professionals</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building2 size={40} className="text-primary" />
            <div className="flex flex-col">
              <span className="font-playfair text-xl dark:text-white">Better Business Bureau®</span>
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] dark:text-gray-400">Accredited Business</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EditorialHighlight = () => {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <RevealText>
              <span className="font-cormorant text-2xl text-primary italic block mb-4">A Legacy of Clarity</span>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-7xl mb-8 leading-[1.1] dark:text-white">
                We don't just fix pools. <br /> We restore <span className="text-primary italic">serenity.</span>
              </h2>
            </RevealText>
            <FadeIn delay={0.3}>
              <div className="font-montserrat font-light text-gray-600 dark:text-gray-400 text-lg space-y-6 leading-relaxed">
                <p>
                  Water is dynamic. It requires more than a casual glance—it demands an understanding of the entire aquatic ecosystem. Our philosophy centers on preventive mastery rather than reactive maintenance.
                </p>
                <p>
                  At Complete Pool Care, we approach every project with an editorial eye. From the chemical composition of the water to the mechanical sound of the pump, we tune your environment to perfection.
                </p>
              </div>
              <div className="mt-10">
                <a href="#about" className="group inline-flex items-center gap-2 text-primary font-montserrat font-bold text-sm tracking-widest uppercase pb-1 border-b-2 border-primary/20 hover:border-primary transition-all">
                  Explore Our Process <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeIn>
          </div>
          <div className="order-1 lg:order-2 relative group">
            <div className="aspect-[4/5] relative z-10 shadow-2xl">
              <ScrollRevealImage src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=2072&auto=format&fit=crop" alt="Pristine coastal pool" className="rounded-sm" />
            </div>
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -bottom-10 -left-10 w-2/3 aspect-[4/3] z-20 hidden md:block border-[12px] border-white dark:border-gray-900 shadow-2xl overflow-hidden"
            >
              <ScrollRevealImage src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop" alt="Water detail" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      text: "Exceptional technical expertise. They resolved a complex heating issue that three other companies couldn't figure out.",
      author: "Sarah Jenkins",
      loc: "Highland Park Estate"
    },
    {
      text: "The reliability is what sets them apart. My pool has never looked better, and I never have to check the chemical levels myself.",
      author: "Michael Sterling",
      loc: "Beverly Hills Residence"
    }
  ];

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          <div>
            <span className="font-cormorant text-3xl italic opacity-80 mb-6 block">Refinement in Every Drop</span>
            <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl mb-8 leading-tight">Elite service for elite properties.</h2>
          </div>
          <div className="space-y-16">
            {reviews.map((r, i) => (
              <FadeIn key={i} delay={i * 0.2} className="border-l-2 border-white/20 pl-10">
                <p className="font-playfair text-2xl md:text-3xl leading-relaxed mb-8 font-light italic">"{r.text}"</p>
                <div>
                  <div className="font-montserrat font-bold uppercase tracking-[0.2em] text-xs mb-1">{r.author}</div>
                  <div className="font-cormorant italic text-xl opacity-70">{r.loc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      {/* Dynamic Background Element */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/2 -right-1/4 w-full h-full bg-white/5 rounded-full blur-[120px] pointer-events-none"
      />
    </section>
  );
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Refs for address input fields
  const addressInputRef = React.useRef<HTMLInputElement>(null);
  const cityInputRef = React.useRef<HTMLInputElement>(null);
  const stateInputRef = React.useRef<HTMLInputElement>(null);
  const zipInputRef = React.useRef<HTMLInputElement>(null);

  // State for address fields
  const [addressFields, setAddressFields] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  // Initialize Google Maps Autocomplete
  useEffect(() => {
    const initAutocomplete = () => {
      if (!addressInputRef.current || !window.google?.maps?.places) return;

      try {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'us' }
        });

        // Listen for place selection
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();

          if (!place.address_components) return;

          // Extract address components
          let street = '';
          let city = '';
          let state = '';
          let zip = '';

          place.address_components.forEach((component) => {
            const types = component.types;

            if (types.includes('street_number')) {
              street = component.long_name + ' ';
            }
            if (types.includes('route')) {
              street += component.long_name;
            }
            if (types.includes('locality')) {
              city = component.long_name;
            }
            if (types.includes('administrative_area_level_1')) {
              state = component.short_name;
            }
            if (types.includes('postal_code')) {
              zip = component.long_name;
            }
          });

          // Update state and input fields
          setAddressFields({ street, city, state, zip });

          if (addressInputRef.current) addressInputRef.current.value = street;
          if (cityInputRef.current) cityInputRef.current.value = city;
          if (stateInputRef.current) stateInputRef.current.value = state;
          if (zipInputRef.current) zipInputRef.current.value = zip;
        });
      } catch (error) {
        console.error("Error initializing Google Maps Autocomplete:", error);
      }
    };

    // Dynamically load Google Maps script if not present
    const loadGoogleMapsScript = () => {
      if (window.google?.maps?.places) {
        initAutocomplete();
        return;
      }

      const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (existingScript) {
        existingScript.addEventListener('load', initAutocomplete);
        return;
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.warn('Google Maps API key not found in environment variables');
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <section id="contact" className="py-24 md:py-32 bg-secondary-light dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-secondary-dark shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] dark:shadow-none p-8 md:p-20 border border-gray-100 dark:border-gray-900 relative rounded-sm">
          <div className="absolute top-0 left-0 w-full h-2 bg-primary" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <RevealText>
                <h2 className="font-playfair text-4xl md:text-5xl mb-6 dark:text-white leading-tight break-words hyphens-auto">Get Started Today</h2>
              </RevealText>
              <FadeIn>
                <p className="font-montserrat font-light text-gray-500 dark:text-gray-400 mb-10 text-lg leading-relaxed">
                  Experience the luxury of professional water management. Our consultants are ready to design a plan that matches your lifestyle.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Phone size={20} className="text-primary group-hover:text-white" />
                    </div>
                    <div className="dark:text-white font-montserrat font-semibold">480-948-2001</div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Droplets size={20} className="text-primary group-hover:text-white" />
                    </div>
                    <div className="dark:text-white font-montserrat font-semibold">mypool@mycompletepoolcare.net</div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-3">
              <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); setFormStatus('success'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Full Name</label>
                    <input required type="text" className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700" placeholder="Johnathan Sterling" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Phone</label>
                    <input required type="tel" className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700" placeholder="(555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Email</label>
                    <input required type="email" className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Street Address</label>
                    <input
                      ref={addressInputRef}
                      required
                      type="text"
                      className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                      placeholder="Start typing your address..."
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2 grid grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2 md:col-span-1">
                      <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">City</label>
                      <input
                        ref={cityInputRef}
                        required
                        type="text"
                        className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6 col-span-2 md:col-span-1">
                      <div className="space-y-2">
                        <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">State</label>
                        <input
                          ref={stateInputRef}
                          required
                          type="text"
                          className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                          placeholder="CA"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Zip</label>
                        <input
                          ref={zipInputRef}
                          required
                          type="text"
                          className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-700"
                          placeholder="90210"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Service Frequency</label>
                  <select className="w-full border-b-2 border-gray-200 dark:border-gray-800 py-4 focus:outline-none focus:border-primary transition-colors bg-transparent font-playfair text-xl dark:text-white">
                    <option className="dark:bg-black">Weekly Concierge Maintenance</option>
                    <option className="dark:bg-black">Critical Systems Repair</option>
                    <option className="dark:bg-black">Bespoke Renovation Consultation</option>
                    <option className="dark:bg-black">Energy Efficiency Audit</option>
                  </select>
                </div>

                <div className="pt-6">
                  <button type="submit" className="group relative bg-primary text-white px-12 py-5 font-montserrat text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 w-full md:w-auto rounded-sm">
                    <span className="relative z-10">GET YOUR FREE QUOTE</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>

                {formStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-success font-montserrat font-semibold">
                    <CheckCircle2 size={20} /> Request received. We will contact you shortly.
                  </motion.div>
                )}
                {formStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-error font-montserrat font-semibold">
                    <AlertCircle size={20} /> There was an error. Please call us directly.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: string) => void }) => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 border-b border-white/10 pb-20">
          <div className="col-span-1 md:col-span-1">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo(0, 0); }} className="block mb-8">
              <Logo className="h-16 w-auto text-white" />
            </a>
            <p className="font-montserrat font-light text-sm text-gray-500 leading-relaxed max-w-xs">
              Redefining aquatic maintenance through high-precision standards and exceptional client relations.
            </p>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-primary">Capabilities</h4>
            <ul className="space-y-5 font-montserrat text-sm text-gray-400">
              <li><button onClick={() => setCurrentPage('services')} className="hover:text-primary transition-colors">Residential Maintenance</button></li>
              <li><button onClick={() => setCurrentPage('services')} className="hover:text-primary transition-colors">Commercial Repair</button></li>
              <li><button onClick={() => setCurrentPage('services')} className="hover:text-primary transition-colors">Eco-Retrofits</button></li>
              <li><button onClick={() => setCurrentPage('services')} className="hover:text-primary transition-colors">Equipment Design</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-primary">Identity</h4>
            <ul className="space-y-5 font-montserrat text-sm text-gray-400">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-primary transition-colors">Our History</button></li>
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-primary transition-colors">Master Portfolio</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-primary transition-colors">Team Credentials</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-primary transition-colors">Philanthropy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-[10px] uppercase tracking-[0.3em] mb-8 text-primary">Headquarters</h4>
            <ul className="space-y-5 font-montserrat text-sm text-gray-400">
              <li className="flex items-center gap-3"><Phone size={14} className="text-primary" /> 480-948-2001</li>
              <li className="hover:text-white transition-colors cursor-pointer">mypool@mycompletepoolcare.net</li>
              <li>Serving Scottsdale, Paradise Valley,<br />Fountain Hills, Cave Creek & North Phoenix</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-montserrat text-gray-600 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Complete Pool Care. Technical Excellence in Aquatics.</p>
          <div className="flex gap-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">Privacy Standards</a>
            <a href="#" className="hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">Terms of Engagement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- New Pages ---

const ServicesPage = () => {
  const serviceCategories = [
    {
      title: "Pool Services",
      description: "Professional weekly pool service with uniformed and trained technicians.",
      items: ["Weekly Service", "Vacation Service", "One-time Clean-up"],
      image: "/assets/images/ChatGPT Image Feb 13, 2026, 07_16_32 PM.png"
    },
    {
      title: "Pool Products",
      description: "We offer the most dependable pool products in the industry with unparalleled warranty.",
      items: ["Energy Efficient Pumps", "DE, Cartridge & Sand Filters", "Pool & Spa Heaters", "Auto Pool Cleaners", "Salt Systems"],
      image: "/assets/images/pool_products_equipment_1771034124083.png"
    },
    {
      title: "Pool Repairs",
      description: "Factory trained and experienced repair technicians providing prompt and reliable service.",
      items: ["Pool Pumps", "Pool Filters", "Pool Heater Repairs", "Automated Pool Controls", "Tile Cleaning & Washing"],
      image: "/assets/images/pool_services_truck_1771034329842.png"
    }
  ];

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <PageHero
        title="Aquatic Mastery"
        subtitle="A comprehensive suite of services tailored to the most demanding aquatic environments."
        src="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="container mx-auto px-6 py-24">
        <div className="space-y-32">
          {serviceCategories.map((category, idx) => (
            <div key={idx} className={`flex flex-col gap-12 lg:gap-20 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}>
              <div className="flex-1">
                <RevealText>
                  <h2 className="font-playfair text-4xl md:text-5xl mb-6 dark:text-white">{category.title}</h2>
                </RevealText>
                <FadeIn delay={0.2}>
                  <p className="font-montserrat text-gray-500 dark:text-gray-400 text-lg mb-10 leading-relaxed border-l-2 border-primary pl-6">
                    {category.description}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-montserrat text-sm md:text-base dark:text-gray-300">
                        <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-[4/3] shadow-2xl relative group">
                  <div className="absolute top-4 left-4 w-full h-full border-2 border-gray-100 dark:border-gray-800 -z-10 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />
                  <ScrollRevealImage src={category.image} alt={category.title} className="w-full h-full rounded-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <PageHero
        title="Our Philosophy"
        subtitle="Since 1988, we have defined the standard for luxury pool care."
        src="/assets/images/nano-banana-1eTrnFewJSE4H716MsH7EWcVPGaELrgh5wq.png"
      />
      <div className="container mx-auto px-6 py-24">

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <RevealText>
            <h2 className="font-playfair text-4xl md:text-5xl mb-8 dark:text-white leading-tight">
              "Perfection is not an act, but a habit."
            </h2>
          </RevealText>
          <FadeIn delay={0.2}>
            <p className="font-montserrat text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              Complete Pool Care provides quality pool and spa maintenance service. Our repair services are predicated on using only the finest parts and equipment available on the market today. This ensures long-term service and satisfaction for our customers.
            </p>
          </FadeIn>
        </div>

        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative h-[600px]">
            <ScrollRevealImage src="https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=1974&auto=format&fit=crop" alt="Technical expertise" className="h-full object-cover" />
            <div className="absolute bottom-8 right-8 bg-white dark:bg-gray-900 p-6 shadow-xl max-w-xs">
              <p className="font-cormorant italic text-xl dark:text-white">"We treat every pool as if it were our own private resort."</p>
            </div>
          </div>
          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <h3 className="font-playfair text-3xl dark:text-white">The Complete Standard</h3>
              <p className="font-montserrat text-gray-500 dark:text-gray-400 leading-relaxed mt-4">
                Established in 1988, Complete Pool Care has been serving customers based on the principle of quality and dependability which places us at the forefront of our industry. We proudly service Scottsdale, Paradise Valley, Fountain Hills, Cave Creek, and North Phoenix with professional pool and spa maintenance.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <h3 className="font-playfair text-3xl dark:text-white">Licensed & Certified</h3>
              <p className="font-montserrat text-gray-500 dark:text-gray-400 leading-relaxed mt-4">
                Our repair services are predicated on using only the finest parts and equipment available on the market today. This ensures long-term service and satisfaction for our customers. Competitive prices and reliable service will make your pool or spa a worry-free place to enjoy for years to come.
              </p>
            </FadeIn>
            <div className="pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-primary transition-colors">
                  <div className="font-playfair text-4xl text-primary mb-2">35+</div>
                  <div className="font-montserrat text-xs uppercase tracking-widest dark:text-white">Years Experience</div>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 p-6 text-center hover:border-primary transition-colors">
                  <div className="font-playfair text-4xl text-primary mb-2">100%</div>
                  <div className="font-montserrat text-xs uppercase tracking-widest dark:text-white">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-secondary-light dark:bg-secondary-dark p-12 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <Award size={48} className="text-primary mx-auto mb-6" />
              <h3 className="font-playfair text-2xl mb-4 dark:text-white">Excellence</h3>
              <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400">Uncompromising quality in every service visit and repair.</p>
            </div>
            <div>
              <ShieldCheck size={48} className="text-primary mx-auto mb-6" />
              <h3 className="font-playfair text-2xl mb-4 dark:text-white">Integrity</h3>
              <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400">Transparent pricing and honest recommendations, always.</p>
            </div>
            <div>
              <Star size={48} className="text-primary mx-auto mb-6" />
              <h3 className="font-playfair text-2xl mb-4 dark:text-white">Reliability</h3>
              <p className="font-montserrat text-sm text-gray-500 dark:text-gray-400">We show up when we say we will. Consistency is our hallmark.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Logic ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="antialiased selection:bg-primary selection:text-white">
      <Header isDark={isDark} setIsDark={setIsDark} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main id="main-content">
        {currentPage === 'home' && (
          <>
            <HomeHero setCurrentPage={setCurrentPage} />
            <HomeFeatures setCurrentPage={setCurrentPage} />
            <SocialProof />
            <EditorialHighlight />
            <Testimonials />
          </>
        )}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'about' && <AboutPage />}

        {/* Contact section is always visible at the bottom of all pages for conversion */}
        <Contact />
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
