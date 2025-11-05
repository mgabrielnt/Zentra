import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden bg-black">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const marqueeContentRef = React.useRef<HTMLDivElement>(null);
  const marqueeAnimRef = React.useRef<gsap.core.Tween | null>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  // Setup marquee animation dengan GSAP
  useEffect(() => {
    if (!marqueeContentRef.current) return;
    
    // Kill animation lama kalau ada
    if (marqueeAnimRef.current) {
      marqueeAnimRef.current.kill();
    }

    // Buat infinite loop animation
    marqueeAnimRef.current = gsap.to(marqueeContentRef.current, {
      x: '-50%',
      duration: 15,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      if (marqueeAnimRef.current) {
        marqueeAnimRef.current.kill();
      }
    };
  }, [text, image]);

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, '<');
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    // Duplikasi 2x untuk seamless loop (total 12 items)
    return Array.from({ length: 12 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="text-[#060010] uppercase font-semibold text-[2.2vh] leading-[1.2] px-[2vw] whitespace-nowrap">
          {text}
        </span>
        <div
          className="w-[140px] h-[60px] mx-[1.5vw] rounded-[20px] bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url(${image})` }}
        />
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div 
      className="h-[12vh] md:h-[15vh] relative overflow-hidden text-center border-b border-white/20" 
      ref={itemRef}
    >
      <Link
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[2.5vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010] transition-colors duration-300"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </Link>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-full flex overflow-hidden" ref={marqueeInnerRef}>
          <div 
            className="flex items-center h-full will-change-transform"
            ref={marqueeContentRef}
          >
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;