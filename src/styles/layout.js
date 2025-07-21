export const containerStyle = {
    padding: "40px",
    textAlign: "center",
    position: "relative",
    minHeight: "100vh",
};

export const gridStyle = (loading) => ({
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
    opacit: loading ? 0.5 : 1,
    pointerEvents: loading ? "none" : "auto",
})