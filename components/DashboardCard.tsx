type Props = {
  title: string;
  value: string;
};

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-black">
        {title}
      </h2>

      <p className="text-2xl font-bold mt-2 text-black">
        {value}
      </p>
    </div>
  );
}