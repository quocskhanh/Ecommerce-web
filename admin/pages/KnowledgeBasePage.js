import React from "react";
import LayoutDashboard from "../layout/LayoutDashboard";

const KnowledgeBasePage = () => {
    return (
        <LayoutDashboard>
            <div className=" bg-[#F8F9FB] w-full overflow-y-auto h-screen p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-[#131523] text-2xl font-bold leading-9">Knowledge Base</h1>
                </div>

                {/* Search Bar */}
                <div className="mb-8 relative">
                <span className="absolute top-2/4 left-4 transform -translate-y-2/4 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                        <div className="flex items-center mb-4">
                            <div className=" p-3 rounded-full">
                                <span className="text-blue-600">
                                    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="pages">
<rect id="bg" opacity="0.01" width="140" height="140" fill="white"/>
<g id="illustration">
<path id="Rectangle" fill-rule="evenodd" clip-rule="evenodd" d="M24 15H102V111H24V15Z" fill="#D7DBEC"/>
<path id="Rectangle_2" fill-rule="evenodd" clip-rule="evenodd" d="M38 33C38 30.7909 39.7909 29 42 29H102L116 43V99H38V33Z" fill="#B6CBFF"/>
<path id="Rectangle_3" fill-rule="evenodd" clip-rule="evenodd" d="M38 29H102V43H116V125H38V29Z" fill="#3A4788"/>
<rect id="Rectangle_4" x="52" y="56" width="50" height="4" fill="white"/>
<rect id="Rectangle_5" x="52" y="68" width="50" height="4" fill="white"/>
<rect id="Rectangle_6" x="52" y="80" width="50" height="4" fill="white"/>
<rect id="Rectangle_7" x="52" y="92" width="20" height="4" fill="white"/>
</g>
</g>
</svg>
                                </span>
                            </div>
                            <h2 className="ml-4 text-lg font-semibold text-[#131523]">Getting Started</h2>
                        </div>
                        <ul className="text-sm text-gray-600 flex-grow">
                            <li>Guide to get started faster</li>
                            <li>Video tutorials for beginners</li>
                            <li>Moving to Bolt system</li>
                        </ul>
                        <a
                            href="#"
                            className="text-blue-500 text-sm font-medium hover:underline mt-4"
                        >
                            More Tutorials
                        </a>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                        <div className="flex items-center mb-4">
                            <div className=" p-3 rounded-full">
                                <span className="text-green-600">
<svg
    width={140}
    height={140}
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g id="users">
      <rect
          id="bg"
          opacity={0.01}
          width={140}
          height={140}
          style={{ fill: "white" }}
      />
      <g id="illustration">
        <g id="Oval + Combined Shape Mask">
          <circle
              id="Mask"
              cx={40}
              cy={50}
              r={24}
              style={{ fill: "#D7DBEC" }}
          />
          <mask
              id="mask0_118_3069"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x={16}
              y={26}
              width={48}
              height={48}
          >
            <circle
                id="Mask_2"
                cx={40}
                cy={50}
                r={24}
                style={{ fill: "white" }}
            />
          </mask>
          <g mask="url(#mask0_118_3069)">
            <circle
                id="Oval"
                cx={40}
                cy={44}
                r={8}
                style={{ fill: "#131523" }}
            />
            <path
                id="Combined Shape"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.0012 67.7938C25.6737 60.887 32.2774 56 40.0006 56C47.7238 56 54.3276 60.8872 57 67.7942C52.6944 72.2385 46.6693 75 40.0008 75C33.3321 75 27.3069 72.2384 23.0012 67.7938Z"
                style={{ fill: "#131523" }}
            />
          </g>
        </g>
        <g id="Oval + Combined Shape Mask_2">
          <circle
              id="Mask_3"
              cx={83.5}
              cy={73.5}
              r={40.5}
              style={{ fill: "#3A4788" }}
          />
          <mask
              id="mask1_118_3069"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x={43}
              y={33}
              width={81}
              height={81}
          >
            <circle
                id="Mask_4"
                cx={83.5}
                cy={73.5}
                r={40.5}
                style={{ fill: "white" }}
            />
          </mask>
          <g mask="url(#mask1_118_3069)">
            <circle
                id="Oval_2"
                cx={83.5}
                cy={63.5}
                r={13.5}
                style={{ fill: "#B6CBFF" }}
            />
            <path
                id="Combined Shape_2"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M53.8604 103.313C58.604 91.3867 69.8645 83 83.0005 83C96.6918 83 108.346 92.1108 112.707 104.844C105.311 112.363 95.1778 117 84 117C72.082 117 61.3517 111.729 53.8604 103.313Z"
                style={{ fill: "#B6CBFF" }}
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
                              </span>
                            </div>
                            <h2 className="ml-4 text-lg font-semibold text-[#131523]">Personal Settings</h2>
                        </div>
                        <ul className="text-sm text-gray-600 flex-grow">
                            <li>Setting up your profile</li>
                            <li>Changing business name</li>
                            <li>Changing email address</li>
                        </ul>
                        <a
                            href="#"
                            className="text-blue-500 text-sm font-medium hover:underline mt-4"
                        >
                            More Tutorials
                        </a>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                        <div className="flex items-center mb-4">
                            <div className="p-3 rounded-full">
                                <span className="text-purple-600">
                                    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="credit card">
<rect id="bg" opacity="0.01" width="140" height="140" fill="white"/>
<g id="illustration">
<g id="Group 29">
<rect id="Rectangle" x="3.83276" y="69.5195" width="102" height="60" rx="4" transform="rotate(-30 3.83276 69.5195)" fill="#D7DBEC"/>
<rect id="Rectangle_2" x="9.83276" y="79.9121" width="102" height="12" transform="rotate(-30 9.83276 79.9121)" fill="#131523"/>
</g>
<g id="Group 31">
<rect id="Rectangle_3" x="34" y="61" width="102" height="60" rx="4" fill="#3A4788"/>
<g id="Group 30">
<rect id="Rectangle_4" x="112" y="73" width="12" height="12" rx="6" fill="#B6CBFF"/>
<rect id="Rectangle_5" x="103" y="73" width="12" height="12" rx="6" fill="#B6CBFF"/>
</g>
<rect id="Rectangle_6" x="46" y="101" width="50" height="8" fill="#B6CBFF"/>
<rect id="Rectangle_7" x="46" y="81" width="15" height="12" fill="#B6CBFF"/>
</g>
</g>
</g>
</svg>
                                </span>
                            </div>
                            <h2 className="ml-4 text-lg font-semibold text-[#131523]">Billing</h2>
                        </div>
                        <ul className="text-sm text-gray-600 flex-grow">
                            <li>Payment declined</li>
                            <li>Get a refund</li>
                            <li>Subscriptions</li>
                        </ul>
                        <a
                            href="#"
                            className="text-blue-500 text-sm font-medium hover:underline mt-4"
                        >
                            More Tutorials
                        </a>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                        <div className="flex items-center mb-4">
                            <div className=" p-3 rounded-full">
                                <span className="text-yellow-600">
<svg
    width={140}
    height={140}
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <g id="statistics">
      <rect
          id="bg"
          opacity={0.01}
          width={140}
          height={140}
          style={{ fill: "white" }}
      />
      <g id="illustration">
        <path
            id="Rectangle"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 70.2C22 69.0799 22 68.5198 22.218 68.092C22.4097 67.7157 22.7157 67.4097 23.092 67.218C23.5198 67 24.0799 67 25.2 67H48V99H22L22 70.2Z"
            style={{ fill: "#3A4788" }}
        />
        <path
            id="Rectangle_2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48 50.2C48 49.0799 48 48.5198 48.218 48.092C48.4097 47.7157 48.7157 47.4097 49.092 47.218C49.5198 47 50.0799 47 51.2 47H74V99H48V50.2Z"
            style={{ fill: "#B6CBFF" }}
        />
        <path
            id="Rectangle_3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M74 32.2C74 31.0799 74 30.5198 74.218 30.092C74.4097 29.7157 74.7157 29.4097 75.092 29.218C75.5198 29 76.0799 29 77.2 29H96.8C97.9201 29 98.4802 29 98.908 29.218C99.2843 29.4097 99.5903 29.7157 99.782 30.092C100 30.5198 100 31.0799 100 32.2V95.8C100 96.9201 100 97.4802 99.782 97.908C99.5903 98.2843 99.2843 98.5903 98.908 98.782C98.4802 99 97.9201 99 96.8 99H74V32.2Z"
            style={{ fill: "#3A4788" }}
        />
        <g id="Rectangle_4">
          <path
              id="Mask"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M99 73C88.5066 73 80 81.5066 80 92C80 102.493 88.5066 111 99 111C109.493 111 118 102.493 118 92C118 81.5066 109.493 73 99 73Z"
              style={{ fill: "#D7DBEC" }}
          />
          <mask
              id="mask0_118_3130"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x={80}
              y={73}
              width={38}
              height={38}
          >
            <path
                id="Mask_2"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M99 73C88.5066 73 80 81.5066 80 92C80 102.493 88.5066 111 99 111C109.493 111 118 102.493 118 92C118 81.5066 109.493 73 99 73Z"
                style={{ fill: "white" }}
            />
          </mask>
          <g mask="url(#mask0_118_3130)">
            <path
                id="Rectangle_5"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M120 68H99V93.8824L120 108V68Z"
                style={{ fill: "#A1A7C4" }}
            />
          </g>
        </g>
      </g>
    </g>
  </svg>                                </span>
                            </div>
                            <h2 className="ml-4 text-lg font-semibold text-[#131523]">Commerce</h2>
                        </div>
                        <ul className="text-sm text-gray-600 flex-grow">
                            <li>Add products</li>
                            <li>Selling guide</li>
                            <li>Create categories</li>
                        </ul>
                        <a
                            href="#"
                            className="text-blue-500 text-sm font-medium hover:underline mt-4"
                        >
                            More Tutorials
                        </a>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                        <div className="flex items-center mb-4">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <span className="text-indigo-600">👥</span>
                            </div>
                            <h2 className="ml-4 text-lg font-semibold text-[#131523]">Community Forum</h2>
                        </div>
                        <p className="text-sm text-gray-600 flex-grow">
                            Get help from community members, ask any questions and get answers faster.
                        </p>
                        <a
                            href="#"
                            className="text-blue-500 text-sm font-medium hover:underline mt-4"
                        >
                            Join Community
                        </a>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                        <div className="flex items-center mb-4">
                            <div className="bg-red-100 p-3 rounded-full">
                                <span className="text-red-600">📅</span>
                            </div>
                            <h2 className="ml-4 text-lg font-semibold text-[#131523]">Webinars</h2>
                        </div>
                        <p className="text-sm text-gray-600 flex-grow">
                            Join our series of webinars where you can ask questions live and see a presentation.
                        </p>
                        <a
                            href="#"
                            className="text-blue-500 text-sm font-medium hover:underline mt-4"
                        >
                            Register
                        </a>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-10 text-center">
                    <p className="text-gray-600 mb-4">
                        Still Need Help? Get in touch with us and we will be happy to help you out!
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Contact Support
                    </button>
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default KnowledgeBasePage;
