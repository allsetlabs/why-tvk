import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#1B4FD8', '#F5C518', '#DC2626', '#6366f1', '#22c55e'];

const AXIS_STYLE = { fill: '#ffffff80', fontSize: 12 };
const GRID_STYLE = { stroke: '#ffffff15' };

interface BarLineProps {
  data: Array<Record<string, unknown>>;
  xKey: string;
  yKey: string;
  title?: string;
  dark?: boolean;
}

interface PieProps {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  nameKey: string;
  title?: string;
}

function ChartContainer({
  title,
  dark,
  children,
}: {
  title?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        dark ? 'bg-tvk-dark border border-tvk-fire/30' : 'bg-[#111827] border border-tvk-blue/30'
      }`}
    >
      {title && (
        <h4 className="text-tvk-white font-semibold text-base mb-4">{title}</h4>
      )}
      <div className="w-full h-64">{children}</div>
    </div>
  );
}

export function TVKBarChart({ data, xKey, yKey, title, dark }: BarLineProps) {
  return (
    <ChartContainer title={title} dark={dark}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid {...GRID_STYLE} vertical={false} />
          <XAxis dataKey={xKey} tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} width={40} />
          <Tooltip
            contentStyle={{
              background: '#0A0A0A',
              border: '1px solid #1B4FD880',
              borderRadius: 8,
              color: '#fff',
            }}
          />
          <Bar dataKey={yKey} fill={COLORS[0]} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function TVKLineChart({ data, xKey, yKey, title, dark }: BarLineProps) {
  return (
    <ChartContainer title={title} dark={dark}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey={xKey} tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} width={40} />
          <Tooltip
            contentStyle={{
              background: '#0A0A0A',
              border: '1px solid #1B4FD880',
              borderRadius: 8,
              color: '#fff',
            }}
          />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={COLORS[1]}
            strokeWidth={2.5}
            dot={{ fill: COLORS[1], r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function TVKPieChart({ data, dataKey, nameKey, title }: PieProps) {
  return (
    <ChartContainer title={title}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={90}
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#0A0A0A',
              border: '1px solid #1B4FD880',
              borderRadius: 8,
              color: '#fff',
            }}
          />
          <Legend
            wrapperStyle={{ color: '#ffffff80', fontSize: 12 }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
