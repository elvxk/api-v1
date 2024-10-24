import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <img
          className="-ms-6 hover:-rotate-6"
          width={180}
          height={38}
          src="https://i.ibb.co.com/Ny3LFmB/newlogo.webp"
          alt="ELVXK Logo"
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">My learning journey has begun.</li>
          <li className="mb-2">
            My first API project. Check out the{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              /v1
            </code>
            .
          </li>
          <li>See more about my work.</li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/elvxk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://linkedin.com/in/elvxk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://sandri.my.id"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGlobe />
          sandri.my.id →
        </a>
      </footer>
    </div>
  );
}
