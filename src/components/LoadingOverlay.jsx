export default function LoadingOverlay(){
    return(
        <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
        }}>
            <div className="spinner" />
            <style>{`
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 5px solid #ccc;
                    border-top: 5px solid #007bff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin{
                    0% { transform: rotate(0deg) }
                    100% { transform:rotate(360deg) }
                }
            `}</style>
        </div>
    )
}