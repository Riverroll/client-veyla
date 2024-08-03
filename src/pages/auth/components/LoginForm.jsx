const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  errors,
  handleSubmit,
}) => {
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-brand-600 focus:border-brand-600 block w-full p-2.5"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-brand-600 focus:border-brand-600 block w-full p-2.5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-teal-500 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-brand-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
