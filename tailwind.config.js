module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      // All color classes map to design tokens defined in src/index.css.
      // Add the token in :root first, then expose it here.
      colors: {
        white: "var(--color-white)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-label": "var(--color-text-label)",
        "bg-primary": "var(--background-primary)",
        "header-bg": "var(--color-header-bg)",
        "border-primary": "var(--border-primary)",
        focus: "var(--color-focus)",
        error: "var(--color-error)",
        brand: "var(--color-brand)",
        "brand-hover": "var(--color-brand-hover)",
        loader: "var(--loader-color)",
      },
      height: {
        field: "var(--field-height)",
      },
    },
    // Match MUI breakpoints so max-* variants align with legacy styles
    screens: {
      xs: "0px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },
  },
  plugins: [],
};
