const footerLinks = {
  Support: ["Tearms", "Careers", "Blog", "Security"],
  Products: ["Clinical Board", "News", "Events", "Service"],
  Security: ["privacy Policy", "Terms & Conditions", "Reviews", "FAQ"],
};

const socialIcons = [
  {
    label: "Facebook",
    path: "M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h5v-7H9v-3h3V9.5A3.5 3.5 0 0 1 15.5 6H18v3h-1.5c-.83 0-1 .4-1 1v2H18l-.5 3H15.5v7H17a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4Z",
  },
  {
    label: "Instagram",
    path: "M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5ZM3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7Zm14.5-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  },
  {
    label: "Twitter",
    path: "M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z",
  },
  {
    label: "LinkedIn",
    path: "M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.5A1.9 1.9 0 1 0 5.3 7.3 1.9 1.9 0 0 0 5.3 3.5ZM20.4 20h-3.3v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.6-2.3 3.1V20h-3.3V8.4h3.2v1.6h.1a3.5 3.5 0 0 1 3.1-1.7c3.4 0 4 2.2 4 5.1V20Z",
  },
];

export default function Footer() {
  return (
<footer style={{ backgroundColor: "#1a331b" }} className="pt-24 sm:pt-32 md:pt-40 pb-6 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div
                className="w-14 h-14 shrink-0"
                style={{
                  clipPath:
                    "path('M31,48 C12,35 7,22 15,14 C22,7 30,13 30,20 C30,13 38,7 45,14 C53,22 48,35 31,48 Z')",
                }}
              >
                <img
                  src="/images/icon.jpeg"
                  alt="DentCare"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-extrabold font-heading">
                Dent<span style={{ color: "#A6CE39" }}>C</span>are
              </span>
            </div>
            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-xs">
              During the encounter, properly informing the patient of all relevant facts.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialIcons.map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  aria-label={icon.label}
                  className="group w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-brand-green transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-brand-green group-hover:text-white transition-colors">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-base font-bold font-heading mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-base font-bold font-heading mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
                </svg>
                +1 123 123 1122
              </li>
              <li className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
                dentcare@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                  <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                9WX2+JM Thornton, United Kingdom
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
          <p>© Yoursitename 2023 | All Right Reserved</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Trams & Condition</a>
          </div>
        </div>
      </div>
    </footer>
  );
}