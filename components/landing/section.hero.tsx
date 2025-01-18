export function HeroSection() {
  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
          Welcome to the <span className="text-indigo-600">Next.js</span>{" "}
          Starter
        </h2>
        <h3 className="text-2xl text-center text-gray-600 dark:text-gray-300">
          A simple and easy way to get started with your next project.
        </h3>

        <div className="flex items-center justify-center mt-6">
          <a
            href="#"
            className="bg-indigo-600 text-white px-6 py-4 font-medium rounded-md"
          >
            Get started
          </a>
          <a href="#" className="mx-4 text-gray-600 dark:text-gray-300">
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
