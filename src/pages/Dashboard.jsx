import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import totalCustomersIcon from "../assets/totalCustomers.png";
import membersIcon from "../assets/members.png";
import activeNowIcon from "../assets/activeNow.png";
import avatar from "../assets/Avatar.png";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.png";
import settings from "../assets/setting.png";
import dashboardIcon from "../assets/dashboard.png";
import productIcon from "../assets/product.png";
import customersIcon from "../assets/customers.png";
import incomeIcon from "../assets/income.png";
import promoteIcon from "../assets/promote.png";
import helpIcon from "../assets/help.png";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ✅ ADD THIS HERE
  const navIcons = [
    dashboardIcon,
    productIcon,
    customersIcon,
    incomeIcon,
    promoteIcon,
    helpIcon,
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FD] flex flex-col lg:flex-row">
      {/* ✅ Mobile Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-20 bg-white shadow-lg flex flex-col items-center justify-between py-6 z-50 lg:hidden">
        <div className="flex flex-col gap-6 items-center">
          <img src={settings} alt="settings" className="w-6 h-6" />
          {navIcons.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt={`icon-${i}`}
              className={`w-6 h-6 opacity-50 ${
                i === 2 ? "opacity-100 bg-[#5932EA] p-2 rounded-lg" : ""
              }`}
            />
          ))}
        </div>
        <img src={avatar} alt="user" className="w-10 h-10 rounded-full" />
      </aside>

      {/* ✅ Desktop Sidebar */}
      <aside className="hidden lg:block  top-0 left-0 z-50 h-full w-64 bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <img src={settings} alt="logo" className="w-6 h-6" />
            <h2 className="text-xl font-bold text-[#000]">
              Dashboard <span className="text-sm text-[#838383]">v.01</span>
            </h2>
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          {[
            { icon: dashboardIcon, label: "Dashboard" },
            { icon: productIcon, label: "Product", showArrow: true },
            {
              icon: customersIcon,
              label: "Customers",
              active: true,
              showArrow: true,
            },
            { icon: incomeIcon, label: "Income", showArrow: true },
            { icon: promoteIcon, label: "Promote", showArrow: true },
            { icon: helpIcon, label: "Help", showArrow: true },
          ].map(({ icon, label, active, showArrow }, i) => (
            <button
              key={i}
              className={`flex justify-between items-center px-4 py-2 rounded-full ${
                active
                  ? "bg-[#5932EA] text-white"
                  : "text-gray-600 hover:text-[#5932EA]"
              }`}
            >
              <span className="flex items-center gap-3">
                <img src={icon} alt={label} className="w-5 h-5" />
                {label}
              </span>
              {showArrow && <span className="text-base font-bold">{">"}</span>}
            </button>
          ))}
        </nav>

        <div className="mt-[15rem] pt-10">
          <div className="bg-gradient-to-r from-[#EAABF0] to-[#4623E9] p-4 text-center text-white rounded-2xl">
            <p className="font-semibold mb-2">
              Upgrade to PRO to get access to all Features!
            </p>
            <button className="bg-white text-[#4925E9] px-4 py-2 rounded-full text-sm font-semibold">
              Get Pro Now!
            </button>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <img
              src={avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{user?.displayName || "Evano"}</p>
              <p className="text-sm text-gray-500">Project Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="hidden lg:block flex-1 lg:ml-[1rem]">
        <div className="max-w-[1120px] mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-[24px] font-semibold text-[#000]">
              Hello {user?.displayName || "Evano"} 👋
            </h1>
            <div className="relative w-60">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 text-sm border bg-[#FFFFFF] border-[#F0F0F0] rounded-lg w-full focus:outline-none focus:border-[#5932EA]"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
            </div>
          </div>

          {/* Info Cards */}
          <div className="bg-white rounded-2xl p-6 shadow flex justify-between items-center mb-8">
            {/* Total Customers */}
            <div className="flex items-center gap-4 border-r border-[#F0F0F0] mr-[7rem] flex-1">
              <div className="bg-[#D3FFE7] p-4 rounded-full">
                <img src={totalCustomersIcon} className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-[#ACACAC]">Total Customers</p>
                <h3 className="text-xl font-semibold text-[#333333]">5,423</h3>
                <p className="text-xs font-medium text-black mt-1 flex items-center gap-1">
                  <span className="text-[#00AC4F]">▲ 16%</span> this month
                </p>
              </div>
            </div>

            {/* Members */}
            <div className="flex items-center gap-4 flex-1 border-r last:border-none border-[#F0F0F0] mr-[3rem]">
              <div className="bg-[#D3FFE7] p-4 rounded-full">
                <img src={membersIcon} alt="Members" className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-[#ACACAC]">Members</p>
                <h3 className="text-xl font-semibold text-[#333333]">1,893</h3>
                <p className="text-xs font-medium text-black mt-1 flex items-center gap-1">
                  <span className="text-[#D0004B]">▼ 1%</span> this month
                </p>
              </div>
            </div>

            {/* Active Now */}
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-[#E0F3FF] p-4 rounded-full">
                <img src={activeNowIcon} alt="Active Now" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-[#ACACAC]">Active Now</p>
                <h3 className="text-xl font-semibold">189</h3>
                <div className="flex -space-x-2 mt-2">
                  {[avatar1, avatar2, avatar3, avatar4, avatar5].map(
                    (src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`User ${i}`}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Table */}
          <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold">All Customers</h3>
            <p className="text-sm font-medium text-[#16C098] mb-4">
              Active Members
            </p>

            <div className="flex justify-between items-center mb-4">
              <div className="relative w-48">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 ml-[40rem] py-2 border bg-[#F9FBFF] border-[#F9FBFF] rounded-lg w-full focus:outline-none focus:border-[#5932EA]"
                />
                <MagnifyingGlassIcon className="absolute left-[41rem] top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
              </div>
              <div className="flex items-center bg-[#F9FBFF] text-sm text-gray-500 gap-1 cursor-pointer">
                <span>Sort by:</span>
                <span className="font-semibold">Newest</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[#EEEEEE] text-left text-gray-500">
                    <th className="py-3">Customer Name</th>
                    <th>Company</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Jane Cooper",
                      "Microsoft",
                      "(225) 555-0118",
                      "jane@microsoft.com",
                      "United States",
                      "Active",
                    ],
                    [
                      "Floyd Miles",
                      "Yahoo",
                      "(205) 555-0100",
                      "floyd@yahoo.com",
                      "Kiribati",
                      "Inactive",
                    ],
                    [
                      "Ronald Richards",
                      "Adobe",
                      "(302) 555-0107",
                      "ronald@adobe.com",
                      "Israel",
                      "Inactive",
                    ],
                    [
                      "Marvin McKinney",
                      "Tesla",
                      "(252) 555-0126",
                      "marvin@tesla.com",
                      "Iran",
                      "Active",
                    ],
                    [
                      "Jerome Bell",
                      "Google",
                      "(629) 555-0129",
                      "jerome@google.com",
                      "Réunion",
                      "Active",
                    ],
                    [
                      "Kathryn Murphy",
                      "Microsoft",
                      "(406) 555-0120",
                      "kathryn@microsoft.com",
                      "Curaçao",
                      "Inactive",
                    ],
                    [
                      "Jacob Jones",
                      "Yahoo",
                      "(208) 555-0112",
                      "jacob@yahoo.com",
                      "Brazil",
                      "Active",
                    ],
                    [
                      "Kristin Watson",
                      "Facebook",
                      "(704) 555-0127",
                      "kristin@facebook.com",
                      "Åland Islands",
                      "Inactive",
                    ],
                  ].map(([name, company, phone, email, country, status], i) => (
                    <tr key={i} className="border-b border-[#EEEEEE]">
                      <td className="py-3">{name}</td>
                      <td>{company}</td>
                      <td>{phone}</td>
                      <td>{email}</td>
                      <td>{country}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <p>Showing data 1 to 8 of 256K entries</p>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded hover:bg-gray-100">
                  &lt;
                </button>
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    className={`px-3 py-1 rounded ${
                      n === 1
                        ? "bg-[#5932EA] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <span className="text-gray-400">...</span>
                <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded">
                  40
                </button>
                <button className="px-2 py-1 rounded hover:bg-gray-100">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* ✅ Mobile Main */}
     <main className="block lg:hidden ml-20 px-4 pt-6 pb-10 bg-[#F4F7FD] min-h-screen">
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-lg font-semibold text-[#000]">
      Hello {user?.displayName || "Evano"} 
    </h1>
    {/* Replace Avatar with Search */}
    <div className="relative w-1/2">
      <input
        type="text"
        placeholder="Search"
        className="pl-10 pr-3 mr-[2rem] py-2 text-sm border bg-white border-gray-200 rounded-lg w-full focus:outline-none focus:border-[#5932EA]"
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
    </div>
  </div>

  {/* KPI Cards */}
  <div className="space-y-4 mb-6">
    {[
      {
        title: "Total Customers",
        value: "5,423",
        change: "▲ 16%",
        color: "text-[#00AC4F]",
        icon: totalCustomersIcon,
        bg: "bg-[#D3FFE7]",
      },
      {
        title: "Members",
        value: "1,893",
        change: "▼ 1%",
        color: "text-[#D0004B]",
        icon: membersIcon,
        bg: "bg-[#D3FFE7]",
      },
      {
        title: "Active Now",
        value: "189",
        icon: activeNowIcon,
        bg: "bg-[#E0F3FF]",
        avatars: [avatar1, avatar2, avatar3, avatar4, avatar5],
      },
    ].map((card, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-md p-4 flex items-start gap-4"
      >
        <div className={`p-2 rounded-full ${card.bg}`}>
          <img src={card.icon} alt={card.title} className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-[#ACACAC]">{card.title}</p>
          <h3 className="text-xl font-semibold text-[#333333]">{card.value}</h3>
          {card.change && (
            <p className={`text-xs font-medium mt-1 ${card.color}`}>
              {card.change} this month
            </p>
          )}
          {card.avatars && (
            <div className="flex -space-x-2 mt-2">
              {card.avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Avatar ${i}`}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Mobile Table View */}
  <div className="bg-white rounded-2xl shadow-md p-4">
    <h3 className="text-base font-semibold mb-1">All Customers</h3>
    <p className="text-sm text-[#16C098] mb-4">Active Members</p>

    <div className="overflow-x-auto">
      <table className="min-w-[600px] w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2 px-2">Name</th>
            <th className="px-2">Company</th>
            <th className="px-2">Phone</th>
            <th className="px-2">Email</th>
            <th className="px-2">Country</th>
            <th className="px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Jane Cooper", "Microsoft", "(225) 555-0118", "jane@microsoft.com", "USA", "Active"],
            ["Floyd Miles", "Yahoo", "(205) 555-0100", "floyd@yahoo.com", "Kiribati", "Inactive"],
            ["Ronald Richards", "Adobe", "(302) 555-0107", "ronald@adobe.com", "Israel", "Inactive"],
            ["Marvin McKinney", "Tesla", "(252) 555-0126", "marvin@tesla.com", "Iran", "Active"],
            ["Jerome Bell", "Google", "(629) 555-0129", "jerome@google.com", "Réunion", "Active"],
            ["Kathryn Murphy", "Microsoft", "(406) 555-0120", "kathryn@microsoft.com", "Curaçao", "Inactive"],
            ["Jacob Jones", "Yahoo", "(208) 555-0112", "jacob@yahoo.com", "Brazil", "Active"],
            ["Kristin Watson", "Facebook", "(704) 555-0127", "kristin@facebook.com", "Åland Islands", "Inactive"],
          ].map(([name, company, phone, email, country, status], i) => (
            <tr key={i} className="border-t">
              <td className="py-2 px-2">{name}</td>
              <td className="px-2">{company}</td>
              <td className="px-2">{phone}</td>
              <td className="px-2">{email}</td>
              <td className="px-2">{country}</td>
              <td className="px-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</main>

    </div>
  );
}
