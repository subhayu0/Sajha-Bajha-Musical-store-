export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col justify-center items-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center drop-shadow-lg">
         Welcome to Sajha-Bajha
      </h1>

      <p className="text-lg md:text-xl text-center max-w-xl mb-8 opacity-90">
        Your one-stop shop for Musical-Instruments
      </p>

      <a
        href="/shop" // Update with your actual shop route
        className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-purple-100 transition duration-300"
      >
        Explore the Store
      </a>

      <div className="mt-12 text-sm opacity-80">
        Already have an account?{" "}
        <a href="/login" className="underline hover:text-white">
          Log in
        </a>{" "}
        or{" "}
        <a href="/register" className="underline hover:text-white">
          Sign up
        </a>
      </div>
    </div>
  );
}
