import Link from "next/link";


const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">GearUp</h2>
            <p className="text-sm text-muted-foreground">
              Rent high-quality outdoor and sports gear for your next adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 font-semibold">Quick Links</h3>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/gears"
                  className="hover:text-primary transition-colors"
                >
                  Gears
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 font-semibold">Support</h3>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          {/* <div>
            <h3 className="mb-3 font-semibold">Follow Us</h3>

            <div className="flex gap-4">
              <Link
                href="https://github.com"
                target="_blank"
                className="rounded-full border p-2 hover:bg-muted transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>

              <Link
                href="https://facebook.com"
                target="_blank"
                className="rounded-full border p-2 hover:bg-muted transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                className="rounded-full border p-2 hover:bg-muted transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                className="rounded-full border p-2 hover:bg-muted transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div> */}
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} GearUp. All rights reserved.
          </p>

          <p>
            Built with ❤️ using Next.js & Shadcn UI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;