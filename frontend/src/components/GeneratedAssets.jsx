function GeneratedAssets({ assets }) {

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <div>

      <div className="card">
        <h3>Poster Text</h3>
        <p>{assets.poster}</p>
        <button onClick={() => copyText(assets.poster)}>Copy</button>
      </div>

      <div className="card">
        <h3>Social Media Caption</h3>
        <p>{assets.socialCaption}</p>
        <button onClick={() => copyText(assets.socialCaption)}>Copy</button>
      </div>

      <div className="card">
        <h3>Email Invitation</h3>
        <p>{assets.email}</p>
        <button onClick={() => copyText(assets.email)}>Copy</button>
      </div>

      <div className="card">
        <h3>Certificate Text</h3>
        <p>{assets.certificate}</p>
        <button onClick={() => copyText(assets.certificate)}>Copy</button>
      </div>

      <div className="card">
        <h3>Event Summary</h3>
        <p>{assets.summary}</p>
        <button onClick={() => copyText(assets.summary)}>Copy</button>
      </div>

    </div>
  );
}

export default GeneratedAssets;