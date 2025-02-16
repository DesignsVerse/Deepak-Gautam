export default function ZodiacDetails({ params }) {
    const {sign} = params;
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold text-red-800">This is {sign.toUpperCase()} Page</h1>
        <p className="text-lg text-red-600 mt-4">
          Here, you'll see all the personality traits, life predictions, and remedies of {sign}.
        </p>
        <a href="/" className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg">
          Go Back
        </a>
      </div>
    );
  }
  