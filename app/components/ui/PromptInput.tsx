export const PromptInput = () => {
  return (
    <form>
      <div className="mb-4 w-full max-w-3xl rounded-lg bg-slate-200 dark:bg-slate-900">
        <div className="rounded-lg rounded-b-none border border-slate-300 bg-slate-50 px-2 py-2 dark:border-slate-700 dark:bg-slate-800">
          <label htmlFor="prompt-input" className="sr-only">
            Enter your prompt
          </label>
          <textarea
            id="prompt-input"
            rows={4}
            className="w-full border-0 bg-slate-50 px-0 text-base text-slate-900 focus:outline-none dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400"
            placeholder="Enter your prompt"
            required
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-2 py-2">
          <button
            type="button"
            className="inline-flex cursor-pointer justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-50"
          >
            <span className="sr-only">Attach file</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"></path>
            </svg>
            <span className="px-2 text-sm">Attach a file</span>
          </button>
          <button
            type="submit"
            className="mr-1 inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-slate-50 hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 sm:text-base"
          >
            Generate
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 14l11 -11"></path>
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};
