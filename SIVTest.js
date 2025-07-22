import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SIVTest() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    naissance: "",
    adresse: "",
    immat: "",
    vin: "",
    marque: "",
    modele: "",
    fichiers: [],
    signature: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, fichiers: Array.from(e.target.files) });
  };

  const signatureRef = useRef(null);

  const handleSaveSignature = () => {
    if (signatureRef.current) {
      const dataUrl = signatureRef.current.getTrimmedCanvas().toDataURL("image/png");
      setForm({ ...form, signature: dataUrl });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label>Nom</label>
            <input name="nom" value={form.nom} onChange={handleInputChange} />
            <label>Prénom</label>
            <input name="prenom" value={form.prenom} onChange={handleInputChange} />
            <label>Date de naissance</label>
            <input type="date" name="naissance" value={form.naissance} onChange={handleInputChange} />
            <label>Adresse</label>
            <textarea name="adresse" value={form.adresse} onChange={handleInputChange} />
          </div>
        );
      case 2:
        return (
          <div>
            <label>Immatriculation</label>
            <input name="immat" value={form.immat} onChange={handleInputChange} />
            <label>VIN (châssis)</label>
            <input name="vin" value={form.vin} onChange={handleInputChange} />
            <label>Marque</label>
            <input name="marque" value={form.marque} onChange={handleInputChange} />
            <label>Modèle</label>
            <input name="modele" value={form.modele} onChange={handleInputChange} />
          </div>
        );
      case 3:
        return (
          <div>
            <label>Documents justificatifs</label>
            <input type="file" multiple onChange={handleFileChange} />
          </div>
        );
      case 4:
        return (
          <div>
            <label>Signature du mandat (avec le doigt)</label>
            <SignatureCanvas
              penColor="black"
              canvasProps={{ width: 500, height: 200, className: "border" }}
              ref={signatureRef}
            />
            <button onClick={handleSaveSignature}>Enregistrer la signature</button>
          </div>
        );
      case 5:
        return (
          <div>
            <h3>Récapitulatif</h3>
            <pre>{JSON.stringify(form, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Simulation SIV – Mode Test</h2>
      {renderStep()}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        {step > 1 && <button onClick={() => setStep(step - 1)}>Précédent</button>}
        {step < 5 ? (
          <button onClick={() => setStep(step + 1)}>Suivant</button>
        ) : (
          <button onClick={() => alert("Simulation soumise !")}>Soumettre</button>
        )}
      </div>
    </div>
  );
}