export default function CopyFooter() {
  return (
    <div className="select-none mt-4 text-xs text-center text-white/70">
      <a
        className="cursor-pointer hover:text-white transition-all duration-100"
        href="//github.com/arudei-dev"
        target="_blank"
        rel="noreferrer,noopener"
      >
        Design &copy; {new Date().getFullYear()} Aldey Wahyu Putra.
      </a>

      <p>GitHub and its affiliates are a brand of Microsoft.</p>
    </div>
  );
}
