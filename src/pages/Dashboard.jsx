
import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Info,
  Activity,
  HeartPulse,
  Stethoscope,
  Pill,
  ArrowUpRight,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import DonutChart from "../components/DonutChart";
import ChartLegend from "../components/ChartLegend";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

const clinicData = [
  { name: "Klinik Lee Healthcare", value: 19, color: "#8b5cf6" },
  { name: "Klinik Bandar Baru Nilai", value: 4, color: "#3b82f6" },
  { name: "Klinik Mediviron Giant Nilai", value: 10, color: "#f59e0b" },
  { name: "Klinik Nilai Impian", value: 21, color: "#10b981" },
  { name: "Klinik Mediviron", value: 2, color: "#64748b" },
];

const pharmacyData = [
  { name: "ALPRO PHARMACY NILAI", value: 15, color: "#8b5cf6" },
  { name: "ALPRO PHARMACY PEKAN NILAI", value: 12, color: "#3b82f6" },
  { name: "OK PHARMACY", value: 5, color: "#10b981" },
  { name: "PHARMART PHARMACY NILAI", value: 9, color: "#f59e0b" },
  { name: "Health Lane Family Pharmacy", value: 14, color: "#64748b" },
];

const marketData = [
  { name: "Food Panda", value: 25, color: "#8b5cf6" },
  { name: "Grab Food", value: 3, color: "#3b82f6" },
  { name: "Zomato", value: 12, color: "#f59e0b" },
  { name: "Lazada", value: 7, color: "#10b981" },
  { name: "Uber Eats", value: 10, color: "#64748b" },
];

const healthData = [
  { month: "Jan", value: 60 },
  { month: "Feb", value: 65 },
  { month: "Mar", value: 62 },
  { month: "Apr", value: 70 },
  { month: "May", value: 68 },
  { month: "Jun", value: 75 },
  { month: "Jul", value: 72 },
  { month: "Aug", value: 78 },
  { month: "Sep", value: 74 },
  { month: "Oct", value: 80 },
  { month: "Nov", value: 78 },
  { month: "Dec", value: 100 },
];

const symptomsData = [
  { month: "Jan", value: 55 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 58 },
  { month: "Apr", value: 65 },
  { month: "May", value: 62 },
  { month: "Jun", value: 70 },
  { month: "Jul", value: 68 },
  { month: "Aug", value: 75 },
  { month: "Sep", value: 72 },
  { month: "Oct", value: 78 },
  { month: "Nov", value: 82 },
  { month: "Dec", value: 100 },
];

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <div className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
          {value}
        </h3>
      </div>

      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
        <Icon size={23} />
      </div>
    </div>

    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      <span className="flex items-center gap-1 font-semibold text-emerald-600">
        <TrendingUp size={14} />
        {subtitle}
      </span>
      <span>Sample dashboard data</span>
    </div>
  </div>
);

const Panel = ({ title, subtitle, children, action }) => (
  <section className="min-w-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6 dark:border-slate-700 dark:bg-slate-900">
    <div className="mb-5 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-base font-bold text-slate-800 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action || (
        <Info
          size={18}
          className="shrink-0 text-slate-400"
          aria-label="Information"
        />
      )}
    </div>

    {children}
  </section>
);

const DistributionPanel = ({ title, subtitle, data, buttonText }) => (
  <Panel title={title} subtitle={subtitle}>
    <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
      <div className="mx-auto min-h-[190px] w-full max-w-[250px]">
        <DonutChart data={data} />
      </div>

      <div className="min-w-0">
        <ChartLegend items={data} />
      </div>
    </div>

    <button
      type="button"
      className="mt-5 w-full rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300 dark:hover:bg-violet-900"
    >
      {buttonText}
      <ArrowUpRight size={15} className="ml-2 inline" />
    </button>
  </Panel>
);

const TrendPanel = ({
  title,
  description,
  value,
  icon: Icon,
  data,
  color,
  chartType = "line",
}) => (
  <Panel
    title={title}
    subtitle={description}
    action={
      <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
        <Icon size={20} />
      </div>
    }
  >
    <div className="mb-2 flex items-end justify-between gap-3">
      <div className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
        {value}
      </div>
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        Sample trend
      </span>
    </div>

    <div className="h-36 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "area" ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.28} />
                <stop offset="95%" stopColor={color} stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" hide />
            <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "12px",
              }}
              formatter={(v) => [v, title]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              fill="url(#healthGradient)"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="month" hide />
            <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "12px",
              }}
              formatter={(v) => [v, title]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>

    <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <span>January – December</span>
      <span className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300">
        <Activity size={13} />
        Overview
      </span>
    </div>
  </Panel>
);

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8 dark:bg-slate-950">
        {/* Welcome header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-violet-600 dark:text-violet-400">
              PATIENT MANAGEMENT OVERVIEW
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Welcome to MyPatientHUB!
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Your healthcare dashboard, with clinic, pharmacy and health
              overview information in one place.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <CalendarDays size={17} className="text-violet-500" />
            Dashboard Overview
          </div>
        </header>

        
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Clinic Promotions"
            value="56"
            subtitle="Clinic overview"
            icon={Stethoscope}
            color="bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
          />

          <StatCard
            title="Pharmacy Listings"
            value="55"
            subtitle="Pharmacy overview"
            icon={Pill}
            color="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          />

          <StatCard
            title="Marketplace Apps"
            value="57"
            subtitle="App overview"
            icon={Activity}
            color="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
          />

          <StatCard
            title="Health Index"
            value="70%"
            subtitle="Sample indicator"
            icon={HeartPulse}
            color="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
          />
        </div>

        
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <DistributionPanel
            title="Promotion by Clinics"
            subtitle="Distribution across clinic listings"
            data={clinicData}
            buttonText="MORE DETAILS"
          />

          <DistributionPanel
            title="Promotion by Pharmacies"
            subtitle="Distribution across pharmacy listings"
            data={pharmacyData}
            buttonText="MORE DETAILS"
          />

          <DistributionPanel
            title="Smart Market Usage by App"
            subtitle="Marketplace app distribution"
            data={marketData}
            buttonText="SEE ALL REFERRALS"
          />

          <div className="grid grid-cols-1 gap-6">
            <TrendPanel
              title="Health Index"
              description="Illustrative health trend"
              value="70%"
              icon={HeartPulse}
              data={healthData}
              color="#8b5cf6"
              chartType="area"
            />

            <TrendPanel
              title="Symptoms Overview"
              description="Illustrative symptom trend"
              value="70%"
              icon={Activity}
              data={symptomsData}
              color="#0ea5e9"
            />
          </div>
        </div>

        
        <footer className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p>
            © 2026 MyPatientHUB. Healthcare information in one place.
          </p>
          <p>Dashboard · Clinics · Pharmacy</p>
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
