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
        "text-muted": "var(--color-text-muted)",
        "cart-empty": "var(--color-cart-empty)",
        "cart-cta": "var(--color-cart-cta)",
        success: "var(--color-success)",
        "bg-primary": "var(--background-primary)",
        "header-bg": "var(--color-header-bg)",
        "border-primary": "var(--border-primary)",
        divider: "var(--border-divider)",
        focus: "var(--color-focus)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        brand: "var(--color-brand)",
        "brand-hover": "var(--color-brand-hover)",
        "deal-band": "var(--color-deal-band)",
        "carousel-bg": "var(--color-carousel-bg)",
        "product-card": "var(--color-product-card)",
        "product-card-hover": "var(--color-product-card-hover)",
        "product-title": "var(--color-product-title)",
        blue: "var(--color-blue)",
        timer: "var(--color-timer)",
        loader: "var(--loader-color)",
      },
      height: {
        field: "var(--field-height)",
      },
      borderRadius: {
        md: "var(--radius-md)",
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
