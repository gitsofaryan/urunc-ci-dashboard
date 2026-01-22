export default function WorkflowTable({ jobs }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "pass":
      case "success":
        return "text-green-500";
      case "fail":
      case "failure":
        return "text-red-500";
      case "skip":
      case "skipped":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pass":
      case "success":
        return "Pass";
      case "fail":
      case "failure":
        return "Fail";
      case "skip":
      case "skipped":
        return "Skip";
      default:
        return status;
    }
  };

  const calculatePassRate = (runs) => {
    if (!runs || runs.length === 0) return "0.00%";
    const validRuns = runs.filter(
      (r) => r.status !== "skip" && r.status !== "skipped",
    );
    if (validRuns.length === 0) return "0.00%";
    const passes = validRuns.filter(
      (r) => r.status === "pass" || r.status === "success",
    ).length;
    return ((passes / validRuns.length) * 100).toFixed(2) + "%";
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
        No jobs found
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-700">
            <th className="text-left px-4 py-3 text-gray-300 font-semibold">
              Job Name
            </th>
            <th className="text-left px-4 py-3 text-gray-300 font-semibold w-28">
              Pass Rate
            </th>
            <th className="text-left px-4 py-3 text-gray-300 font-semibold">
              Last 10 Runs
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr
              key={job.name}
              className={`border-t border-gray-700 hover:bg-gray-750 ${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
              }`}
            >
              <td className="px-4 py-3">
                <a
                  href={job.url || `https://github.com/urunc-dev/urunc/actions`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  {job.name}
                </a>
              </td>
              <td className="px-4 py-3 text-gray-300">
                {calculatePassRate(job.runs)}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1 flex-wrap">
                  {(job.runs || []).slice(0, 10).map((run, runIndex) => (
                    <span
                      key={runIndex}
                      className={`${getStatusColor(run.status)} font-medium text-sm`}
                      title={run.url ? `Click to view run` : undefined}
                    >
                      {run.url ? (
                        <a
                          href={run.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {getStatusLabel(run.status)}
                        </a>
                      ) : (
                        getStatusLabel(run.status)
                      )}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
