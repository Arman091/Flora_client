module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "text-primary": "#333333",
        "text-secondary": "#666666",
        "bg-primary": "#ffffff",
        loader: "#FFB7CE",
        "border-primary": "rgba(0,0,0,0.23)",
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
