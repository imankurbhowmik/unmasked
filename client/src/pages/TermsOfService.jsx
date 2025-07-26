import Header from "../components/Header";

export const TermsOfService = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
  <div className="max-w-3xl mx-auto space-y-6">
    <h1 className="text-3xl font-bold text-blue-400">Terms of Service</h1>
      <p>Welcome to Unmasked. By using our platform, you agree to these terms.</p>

      <h2 className="text-xl font-semibold">1. Use of the Platform</h2>
      <ul className="list-disc list-inside text-gray-300">
        <li>You are responsible for the content you post.</li>
        <li>Content must not be abusive, illegal, or infringe others' rights.</li>
      </ul>

      <h2 className="text-xl font-semibold">2. Intellectual Property</h2>
      <p>
        All content and branding of Aarthik are protected under intellectual property laws. Unauthorized use is prohibited.
      </p>

      <h2 className="text-xl font-semibold">3. Termination</h2>
      <p>
        We reserve the right to suspend or terminate access for violating terms without prior notice.
      </p>

      <h2 className="text-xl font-semibold">4. Modifications</h2>
      <p>
        These terms may be updated. Continued use of the platform indicates your agreement to the latest version.
      </p>
  </div>
</div>
</>
  );
};



