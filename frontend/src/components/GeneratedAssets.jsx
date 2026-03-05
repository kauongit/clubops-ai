function GeneratedAssets({ assets }) {
  if (!assets) return null;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Generated Assets</h2>

      <pre
        style={{
          background: "#f5f5f5",
          padding: "15px",
          borderRadius: "6px",
          overflow: "auto"
        }}
      >
        {JSON.stringify(assets, null, 2)}
      </pre>
    </div>
  );
}

export default GeneratedAssets;