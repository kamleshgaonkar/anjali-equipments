export default function ContactPage() {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-5xl font-bold">Contact Us</h1>
  
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold">
              Get in Touch
            </h2>
  
            <div className="space-y-5 text-slate-600">
              <p><strong>Phone:</strong> +91 86570 03003</p>
              <p><strong>Email:</strong> info@anjaliequipments.com</p>
              <p>
                <strong>Head Office:</strong><br />
                Plot - B, A wing, 201, <br />
                Govardhan Compelex, Caves Road <br />
                Jogeshwari East,<br />
                Mumbai - 400060, Maharashtra.
              </p>
              <p>
                <strong>Registerd Office:</strong><br />
                01, Dashrath Singh Estate,<br />
                Jogeshwari East,<br />
                Mumbai - 400060, Maharashtra.
              </p>
              <p>
                <strong>Factory:</strong><br />
                Gala No. 01, Umar Compound, <br />
                Nalasopara Phata, <br />
                Mumbai - 401 208, Maharashtra.
              </p>
            </div>
          </div>
  
          <form className="space-y-5">
            <input
              className="w-full rounded-lg border p-4"
              placeholder="Name"
            />
  
            <input
              className="w-full rounded-lg border p-4"
              placeholder="Email"
            />
  
            <input
              className="w-full rounded-lg border p-4"
              placeholder="Phone"
            />
  
            <textarea
              rows={6}
              className="w-full rounded-lg border p-4"
              placeholder="Message"
            />
  
            <button className="rounded-xl bg-red-700 px-8 py-4 text-white">
              Send Enquiry
            </button>
          </form>
        </div>
      </main>
    );
  }