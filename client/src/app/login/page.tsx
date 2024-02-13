

export default function Login() {
  return (
    <div>
      <div className="flex justify-center items-center my-[1.5rem] md:my-[1.5rem]">
        <div className="bg-[#1E1E1F] md:w-[30%] mt-5 rounded-2xl border-[#303030] border-[1px]">
          <div className="md:p-8 p-2">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
                Join Chat
            </h2>
            <label
              htmlFor="username"
              className="block text-[#868686] mb-2"
            >
                Enter Your Name:
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 bg-[#222222] rounded mb-4 text-white"
            />
            <div className="items-center flex justify-center">
              <button className="py-2 px-8 hover:scale-90 transition-all duration-500 bg-[#383839] rounded-xl text-[#FFDB70]">
                    Enter Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
