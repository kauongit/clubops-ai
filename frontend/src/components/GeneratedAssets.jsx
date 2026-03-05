function GeneratedAssets({ assets }) {
  if (!assets) return null;

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
      <h2>Generated Assets</h2>

      <div>
        <h3>Poster Text</h3>
        <pre>{assets.poster}</pre>
      </div>

      <div>
        <h3>Social Caption</h3>
        <pre>{assets.socialCaption}</pre>
      </div>

      <div>
        <h3>Email Invitation</h3>
        <pre>{assets.email}</pre>
      </div>

      <div>
        <h3>Certificate Text</h3>
        <pre>{assets.certificate}</pre>
      </div>

      <div>
        <h3>Event Summary</h3>
        <pre>{assets.summary}</pre>
      </div>
    </div>
  );
}

export default GeneratedAssets;