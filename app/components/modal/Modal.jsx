import { FormattedMessage } from "~/components";

export const Modal = ({
  children,
  size,
  show = false,
  onHide,
  title,
  showCloseButton = true,
  header,
}) => {
  let headerComponent;
  if (header) {
    headerComponent = <div className="px-4 sm:px-6">{header}</div>;
  } else if (title) {
    headerComponent = (
      <div className="p-6 bg-primary">
        <span
          className="text-xl block text-white"
          id={title ?? "slide-over-title"}
        >
          <FormattedMessage id={title} />
        </span>
      </div>
    );
  } else {
    headerComponent = <div className="px-4 sm:px-6"></div>;
  }

  const modalSize = size === "large" ? "max-w-4xl" : "max-w-lg";

  return (
    <>
      {show && (
        <section
          className="fixed inset-0 overflow-hidden z-50"
          aria-labelledby={title ?? "slide-over-title"}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div className={`relative w-screen ${modalSize}`}>
                {showCloseButton && (
                  <div className="absolute top-0 left-0 -ml-8 pt-6 pr-4 flex sm:-ml-10 sm:pr-4">
                    <button
                      className="rounded-md text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={onHide}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  {headerComponent}
                  <div className="py-10 relative flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
