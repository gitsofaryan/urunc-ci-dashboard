export default function StatusSummary({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return null;
  }

  const totalJobs = jobs.length;

  const passingJobs = jobs.filter((j) => {
    const validRuns = (j.runs || []).filter(
      (r) => r.status !== "skip" && r.status !== "skipped",
    );
    return (
      validRuns.length > 0 &&
      validRuns.every((r) => r.status === "pass" || r.status === "success")
    );
  }).length;

  const failingJobs = jobs.filter((j) =>
    (j.runs || []).some((r) => r.status === "fail" || r.status === "failure"),
  ).length;

  const skippedJobs = jobs.filter((j) =>
    (j.runs || []).every((r) => r.status === "skip" || r.status === "skipped"),
  ).length;

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm">Total Jobs</div>
        <div className="text-2xl font-bold text-white">{totalJobs}</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm">Passing Jobs</div>
        <div className="text-2xl font-bold text-green-500">{passingJobs}</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm">Failing Jobs</div>
        <div className="text-2xl font-bold text-red-500">{failingJobs}</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="text-gray-400 text-sm">Skipped Jobs</div>
        <div className="text-2xl font-bold text-orange-400">{skippedJobs}</div>
      </div>
    </div>
  );
}
