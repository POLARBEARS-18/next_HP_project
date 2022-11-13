import Head from 'next/head';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

interface Project2LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout: FC<Project2LayoutProps> = ({ children, title = 'Default title' }) => (
  <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
    <Head>
      <title>{title}</title>
    </Head>
    <main className="flex flex-1 justify-center items-center w-screen flex-col">{children}</main>
    <footer className="w-full h-12 flex justify-center items-center border-t">
      <a
        className="flex items-center"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by
        <Image className="bg-white" src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </a>
    </footer>
  </div>
);

export default Layout;
