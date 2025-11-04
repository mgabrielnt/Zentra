"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { motion, useScroll, useSpring } from "motion/react";

// Fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

// Data artikel lengkap
const articlesData: Record<string, any> = {
  "ai-agents-2025": {
    slug: "ai-agents-2025",
    title: "AI Agents: The Next Revolution in Enterprise Automation",
    excerpt: "Exploring how autonomous AI agents are transforming business operations and decision-making in 2025.",
    date: "2025-11-01",
    category: "Artificial Intelligence",
    author: "Sarah Chen",
    readTime: "8 min read",
    content: `
      <p>The landscape of enterprise automation is undergoing a fundamental shift. Autonomous AI agents are no longer a futuristic concept—they're actively transforming how businesses operate, make decisions, and scale their operations in 2025.</p>

      <h2>What Are AI Agents?</h2>
      <p>AI agents are autonomous systems that can perceive their environment, make decisions, and take actions to achieve specific goals without constant human intervention. Unlike traditional automation tools that follow predefined rules, AI agents can adapt, learn, and handle complex, multi-step tasks.</p>

      <h2>Key Capabilities</h2>
      <p>Modern AI agents possess several groundbreaking capabilities:</p>
      <ul>
        <li><strong>Autonomous Decision-Making:</strong> Agents can analyze data, evaluate options, and make decisions independently</li>
        <li><strong>Multi-Tool Integration:</strong> They can interact with various APIs, databases, and enterprise systems seamlessly</li>
        <li><strong>Natural Language Understanding:</strong> Advanced NLP allows agents to understand context and intent</li>
        <li><strong>Continuous Learning:</strong> Machine learning enables agents to improve performance over time</li>
      </ul>

      <h2>Real-World Applications</h2>
      <p>Companies across industries are deploying AI agents for:</p>
      <ul>
        <li>Customer service automation with contextual understanding</li>
        <li>Supply chain optimization and predictive maintenance</li>
        <li>Financial analysis and fraud detection</li>
        <li>Software development and code review</li>
        <li>Research and data synthesis</li>
      </ul>

      <h2>Implementation Challenges</h2>
      <p>While promising, AI agent deployment comes with challenges. Organizations must address security concerns, ensure data privacy, maintain human oversight, and manage the complexity of agent orchestration.</p>

      <h2>The Future Outlook</h2>
      <p>As AI agents become more sophisticated, we'll see increased adoption across enterprises. The key will be finding the right balance between automation and human judgment, ensuring these powerful tools augment rather than replace human decision-making.</p>
    `
  },
  "quantum-computing-breakthrough": {
    slug: "quantum-computing-breakthrough",
    title: "Quantum Computing Achieves Commercial Viability",
    excerpt: "Major tech companies announce breakthrough in error correction, bringing quantum computing to mainstream applications.",
    date: "2025-10-28",
    category: "Quantum Computing",
    author: "Dr. James Morrison",
    readTime: "6 min read",
    content: `
      <p>After decades of research and development, quantum computing has reached a pivotal milestone: commercial viability. Recent breakthroughs in error correction have solved one of the field's most persistent challenges, opening doors to practical applications.</p>

      <h2>The Error Correction Breakthrough</h2>
      <p>Quantum computers are notoriously fragile, with quantum states easily disrupted by environmental interference. The latest advances in quantum error correction codes have achieved error rates below the threshold needed for reliable computation, marking a turning point for the industry.</p>

      <h2>Commercial Applications</h2>
      <p>Several companies are already leveraging quantum computing for:</p>
      <ul>
        <li><strong>Drug Discovery:</strong> Simulating molecular interactions to accelerate pharmaceutical development</li>
        <li><strong>Financial Modeling:</strong> Portfolio optimization and risk analysis at unprecedented scales</li>
        <li><strong>Cryptography:</strong> Developing quantum-resistant security protocols</li>
        <li><strong>Materials Science:</strong> Designing new materials with specific properties</li>
      </ul>

      <h2>Industry Impact</h2>
      <p>Major tech companies have announced significant investments in quantum infrastructure. Cloud-based quantum computing services are becoming more accessible, allowing businesses to experiment without massive capital investments.</p>

      <h2>What This Means for Developers</h2>
      <p>The quantum computing ecosystem is rapidly maturing. New programming frameworks and tools are making quantum algorithms more accessible to classical programmers. Understanding quantum principles is becoming an increasingly valuable skill.</p>

      <h2>Challenges Ahead</h2>
      <p>Despite progress, challenges remain. Quantum computers still require extreme cooling, specialized facilities, and significant expertise to operate. The transition from laboratory to widespread commercial use will take time.</p>

      <h2>Looking Forward</h2>
      <p>The next five years will be critical for quantum computing. As error correction improves and systems scale, we'll see quantum advantage—where quantum computers outperform classical systems—in more domains.</p>
    `
  },
  "web-assembly-future": {
    slug: "web-assembly-future",
    title: "WebAssembly 2.0: Redefining Web Performance",
    excerpt: "How the latest WebAssembly update is enabling near-native performance for complex web applications.",
    date: "2025-10-25",
    category: "Web Development",
    author: "Alex Rivera",
    readTime: "7 min read",
    content: `
      <p>WebAssembly 2.0 represents a quantum leap in web performance capabilities. This major update brings features that enable developers to build web applications with performance approaching native desktop software.</p>

      <h2>What's New in WebAssembly 2.0</h2>
      <p>The latest specification introduces several game-changing features:</p>
      <ul>
        <li><strong>Exception Handling:</strong> Native support for try-catch patterns, improving code portability</li>
        <li><strong>SIMD Operations:</strong> Enhanced parallel processing for computationally intensive tasks</li>
        <li><strong>Reference Types:</strong> Better garbage collection integration with JavaScript</li>
        <li><strong>Tail Calls:</strong> Optimization for functional programming patterns</li>
      </ul>

      <h2>Performance Benchmarks</h2>
      <p>Early benchmarks show impressive results. WebAssembly 2.0 applications are achieving 80-95% of native performance across various workloads, a significant improvement over previous versions.</p>

      <h2>Use Cases Transforming</h2>
      <p>WebAssembly 2.0 is enabling new categories of web applications:</p>
      <ul>
        <li>Professional video and audio editing in browsers</li>
        <li>3D CAD and modeling tools</li>
        <li>Real-time data analysis and visualization</li>
        <li>Game engines with console-quality graphics</li>
        <li>Scientific computing and simulations</li>
      </ul>

      <h2>Developer Experience</h2>
      <p>Tooling has matured significantly. Modern frameworks now provide seamless WebAssembly integration, and languages like Rust, C++, and Go have excellent WebAssembly compilation support.</p>

      <h2>Browser Support</h2>
      <p>All major browsers have implemented WebAssembly 2.0 features, with consistent behavior across platforms. This unified support accelerates adoption and reduces development complexity.</p>

      <h2>The Future of Web Applications</h2>
      <p>As WebAssembly capabilities expand, the distinction between web and native applications continues to blur. We're entering an era where high-performance computing is truly platform-agnostic.</p>
    `
  },
  "edge-computing-iot": {
    slug: "edge-computing-iot",
    title: "Edge Computing Powers Next-Gen IoT Solutions",
    excerpt: "Understanding the shift from cloud-centric to edge-first architectures in IoT ecosystems.",
    date: "2025-10-20",
    category: "Cloud & Edge",
    author: "Maria Santos",
    readTime: "9 min read",
    content: `
      <p>The Internet of Things landscape is experiencing a fundamental architectural shift. Edge computing is moving from complementary technology to primary infrastructure, fundamentally changing how IoT systems process and respond to data.</p>

      <h2>Why Edge-First Architecture?</h2>
      <p>Traditional cloud-centric IoT architectures face inherent limitations. Latency, bandwidth costs, and connectivity reliability issues have driven the evolution toward edge computing, where data processing happens close to its source.</p>

      <h2>Key Advantages of Edge Computing</h2>
      <ul>
        <li><strong>Reduced Latency:</strong> Real-time processing enables immediate response to critical events</li>
        <li><strong>Bandwidth Efficiency:</strong> Only essential data is transmitted to the cloud</li>
        <li><strong>Enhanced Privacy:</strong> Sensitive data can be processed locally without cloud transmission</li>
        <li><strong>Improved Reliability:</strong> Systems remain functional even with intermittent connectivity</li>
        <li><strong>Cost Optimization:</strong> Reduced data transfer and cloud computing expenses</li>
      </ul>

      <h2>Industrial Applications</h2>
      <p>Manufacturing facilities are deploying edge computing for:</p>
      <ul>
        <li>Predictive maintenance using real-time sensor analysis</li>
        <li>Quality control with computer vision at production lines</li>
        <li>Safety monitoring with instant alert systems</li>
        <li>Autonomous robotics requiring split-second decisions</li>
      </ul>

      <h2>Smart Cities and Infrastructure</h2>
      <p>Urban environments leverage edge computing for traffic management, public safety systems, energy distribution optimization, and environmental monitoring—all requiring real-time processing at scale.</p>

      <h2>Technical Architecture</h2>
      <p>Modern edge computing architectures typically include edge gateways processing data from multiple sensors, local machine learning inference capabilities, selective cloud synchronization, and distributed management systems.</p>

      <h2>Implementation Challenges</h2>
      <p>Organizations must address device management at scale, security across distributed systems, software updates and maintenance, and integration with existing infrastructure.</p>

      <h2>The Road Ahead</h2>
      <p>As 5G networks expand and edge hardware becomes more powerful, we'll see increasingly sophisticated processing at the network edge. The future is distributed intelligence working seamlessly across edge and cloud.</p>
    `
  },
  "sustainable-tech-practices": {
    slug: "sustainable-tech-practices",
    title: "Green Code: Sustainable Development Practices",
    excerpt: "Best practices for reducing carbon footprint in software development and data center operations.",
    date: "2025-10-15",
    category: "Sustainability",
    author: "David Kim",
    readTime: "5 min read",
    content: `
      <p>The tech industry's environmental impact is under increasing scrutiny. As developers and organizations, we have a responsibility and opportunity to reduce our carbon footprint through sustainable development practices.</p>

      <h2>Understanding Tech's Carbon Footprint</h2>
      <p>Software development and data centers contribute significantly to global carbon emissions. From energy-intensive training of AI models to inefficient code consuming unnecessary compute resources, every line of code has an environmental cost.</p>

      <h2>Efficient Code Practices</h2>
      <p>Writing sustainable code starts with efficiency:</p>
      <ul>
        <li><strong>Algorithm Optimization:</strong> Choose algorithms with better time and space complexity</li>
        <li><strong>Resource Management:</strong> Properly manage memory and avoid resource leaks</li>
        <li><strong>Lazy Loading:</strong> Load data and assets only when needed</li>
        <li><strong>Caching Strategies:</strong> Reduce redundant computations and API calls</li>
      </ul>

      <h2>Green Infrastructure Choices</h2>
      <p>Infrastructure decisions significantly impact environmental footprint. Choose cloud providers using renewable energy, implement auto-scaling to minimize idle resources, use CDNs to reduce data transfer distances, and opt for energy-efficient server configurations.</p>

      <h2>Sustainable AI/ML Practices</h2>
      <p>Machine learning has particularly high environmental costs. Use pre-trained models when possible, optimize hyperparameters to reduce training iterations, implement early stopping to prevent unnecessary training, and choose efficient model architectures.</p>

      <h2>Measuring Impact</h2>
      <p>Tools and frameworks now exist to measure software carbon footprint. Carbon-aware programming allows applications to schedule intensive tasks during periods of high renewable energy availability.</p>

      <h2>Organizational Culture</h2>
      <p>Sustainability must be embedded in development culture. Include energy efficiency in code reviews, track and report carbon metrics, educate teams on sustainable practices, and set reduction targets.</p>

      <h2>The Business Case</h2>
      <p>Sustainable development isn't just ethical—it's economical. Efficient code reduces infrastructure costs, improves performance, and enhances brand reputation. Green practices often align with good engineering practices.</p>
    `
  },
  "blockchain-real-world": {
    slug: "blockchain-real-world",
    title: "Blockchain Beyond Crypto: Real-World Applications",
    excerpt: "How blockchain technology is solving practical problems in supply chain, healthcare, and identity verification.",
    date: "2025-10-10",
    category: "Blockchain",
    author: "Jennifer Lee",
    readTime: "10 min read",
    content: `
      <p>While cryptocurrency captured headlines, blockchain technology's true potential lies in solving real-world business problems. From supply chain transparency to healthcare data management, blockchain is proving its value beyond digital currencies.</p>

      <h2>Supply Chain Transformation</h2>
      <p>Supply chain management represents one of blockchain's most successful applications. Companies use blockchain to track products from manufacture to delivery, verify authenticity, prevent counterfeiting, and ensure ethical sourcing.</p>

      <h2>Healthcare Data Management</h2>
      <p>Healthcare systems leverage blockchain for:</p>
      <ul>
        <li><strong>Medical Records:</strong> Secure, interoperable patient data across providers</li>
        <li><strong>Drug Traceability:</strong> Preventing counterfeit pharmaceuticals</li>
        <li><strong>Clinical Trials:</strong> Transparent, tamper-proof trial data</li>
        <li><strong>Insurance Claims:</strong> Automated, fraud-resistant claim processing</li>
      </ul>

      <h2>Digital Identity Solutions</h2>
      <p>Blockchain-based identity systems offer individuals control over their personal data. Self-sovereign identity allows users to selectively share verified credentials, reducing identity fraud, streamlining KYC processes, and enabling privacy-preserving verification.</p>

      <h2>Real Estate and Asset Management</h2>
      <p>Property transactions benefit from blockchain through tokenization of real estate assets, transparent title management, automated smart contract escrows, and fractional ownership opportunities.</p>

      <h2>Intellectual Property Protection</h2>
      <p>Creators use blockchain for timestamped proof of creation, transparent licensing and royalty distribution, protection against plagiarism, and automated rights management.</p>

      <h2>Implementation Considerations</h2>
      <p>Successful blockchain implementations require understanding when blockchain adds value, choosing appropriate consensus mechanisms, ensuring scalability for use cases, and addressing regulatory compliance.</p>

      <h2>Beyond the Hype</h2>
      <p>Not every problem needs blockchain. The technology shines where you need immutable records, multiple parties requiring shared trust, transparent audit trails, and reduced intermediary dependence.</p>

      <h2>Future Outlook</h2>
      <p>As blockchain technology matures, we'll see increased integration with existing systems, improved scalability solutions, clearer regulatory frameworks, and wider enterprise adoption. The focus is shifting from speculative applications to practical, value-adding implementations.</p>
    `
  }
};

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params menggunakan React.use()
  const { slug } = use(params);
  
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 18, mass: 0.2 });

  const article = articlesData[slug];

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2 text-white/60">Article not found</p>
          <Link href="/insight" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main
      className={`min-h-screen bg-black ${inter.variable} ${spaceGrotesk.variable}`}
      aria-label={article.title}
    >
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 transform-gpu will-change-transform"
        aria-hidden="true"
      />

      {/* Back button */}
      <div className="fixed left-6 top-20 z-40 hidden lg:block">
        <Link
          href="/insight"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm text-white/70 backdrop-blur transition hover:border-purple-500/30 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Insights
        </Link>
      </div>

      {/* Article Header */}
      <article className="relative">
        <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-purple-500/10 to-transparent pt-24 pb-12 md:pt-32 md:pb-16">
          {/* Background gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(124,58,237,0.2)_0%,rgba(0,0,0,0)_100%)]" />
          
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block rounded-full bg-purple-500/20 px-4 py-1 text-sm font-medium text-purple-300 backdrop-blur">
                {article.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 bg-gradient-to-b from-white to-white/80 bg-clip-text font-inter text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent"
            >
              {article.title}
            </motion.h1>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60"
            >
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                <span className="font-medium text-white/90">{article.author}</span>
              </div>
              <span>•</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>•</span>
              <span>{article.readTime}</span>
            </motion.div>
          </div>
        </header>

        {/* Article Content */}
        <div className="mx-auto max-w-3xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 border-t border-white/10 pt-8"
          >
            <p className="text-sm text-white/50">Share this article</p>
            <div className="mt-4 flex gap-3">
              <button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10">
                Twitter
              </button>
              <button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10">
                LinkedIn
              </button>
              <button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10">
                Copy Link
              </button>
            </div>
          </motion.div>
        </div>

        {/* Back to Insights CTA */}
        <div className="border-t border-white/10 bg-gradient-to-b from-transparent to-purple-500/5 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Link
              href="/insight"
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-purple-500/20"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all insights
            </Link>
          </div>
        </div>
      </article>

      {/* Custom styles for article content */}
      <style jsx global>{`
        .article-content {
          color: rgba(255, 255, 255, 0.8);
        }
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          font-family: var(--font-space-grotesk);
        }
        .article-content h2 {
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          font-size: 1.875rem;
          font-weight: 600;
          color: white;
          font-family: var(--font-inter);
        }
        .article-content ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .article-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
        }
        .article-content strong {
          color: rgba(168, 85, 247, 1);
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}