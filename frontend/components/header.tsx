import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export function Header() {
  const navLinks = [
    {
      name: "Explore events",
      href: "/events",
    },
    {
      name: "Create event",
      href: "/create-event",
    },
    {
      name: "My events",
      href: "/my-events",
    },
  ];

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-2xl lg:text-3xl font-bold" href="/">
              <span className="sr-only">Home</span>
              <Image
               width={200}
               height={100}
               src="/static/images/logo/logo-no-background.png"
               alt="Logo"
               className="hidden sm:block"
              />
              <Image
               width={150}
               height={100}
               src="/static/images/logo/logo-no-background.png"
               alt="Logo"
               className="sm:hidden"
              />
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden lg:block">
              <ul className="flex items-center gap-6 text-sm">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75 hover:underline"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden sm:block md:gap-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
