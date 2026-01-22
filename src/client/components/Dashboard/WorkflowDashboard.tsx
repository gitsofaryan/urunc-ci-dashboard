import React, { useState, useMemo } from 'react';

// Types
interface JobRun {
    status: 'pass' | 'fail' | 'skip';
    url?: string;
}

interface Job {
    name: string;
    runs: JobRun[];
}

interface Workflow {
    name: string;
    jobs: Job[];
}

// Mock data for urunc CI workflows
const mockWorkflows: Workflow[] = [
    {
        name: 'CI Workflow',
        jobs: [
            {
                name: 'Lint code / lint (amd64)',
                runs: [
                    { status: 'fail' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'Unit tests / unit-test (amd64)',
                runs: [
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'Build / build (amd64)',
                runs: [
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'Lint Files & commits / Lint Commit Messages (amd64)',
                runs: [
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }, { status: 'fail' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'Build / build (arm64)',
                runs: [
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'fail' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'Lint Files & commits / Check License Headers (amd64)',
                runs: [
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'Lint Files & commits / Spell Check Repo (amd64)',
                runs: [
                    { status: 'fail' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'E2E test / VM test (amd64)',
                runs: [
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'fail' }, { status: 'fail' }, { status: 'fail' }, { status: 'fail' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'Build',
                runs: [
                    { status: 'skip' }, { status: 'skip' }, { status: 'skip' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }, { status: 'skip' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }
                ]
            },
            {
                name: 'Unit tests',
                runs: [
                    { status: 'skip' }, { status: 'skip' }, { status: 'skip' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }, { status: 'skip' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }
                ]
            },
            {
                name: 'Lint Files & commits',
                runs: [
                    { status: 'skip' }, { status: 'skip' }, { status: 'skip' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }, { status: 'skip' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }
                ]
            },
            {
                name: 'Lint code',
                runs: [
                    { status: 'skip' }, { status: 'skip' }, { status: 'skip' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }, { status: 'skip' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }
                ]
            },
            {
                name: 'E2E test',
                runs: [
                    { status: 'skip' }, { status: 'skip' }, { status: 'skip' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }, { status: 'fail' }, { status: 'skip' },
                    { status: 'skip' }, { status: 'skip' }
                ]
            }
        ]
    },
    {
        name: 'Nightly Tests',
        jobs: [
            {
                name: 'Nightly E2E / Full Suite (amd64)',
                runs: [
                    { status: 'pass' }, { status: 'pass' }, { status: 'fail' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'fail' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'Nightly E2E / Full Suite (arm64)',
                runs: [
                    { status: 'pass' }, { status: 'fail' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'fail' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            },
            {
                name: 'Nightly Performance / Benchmark',
                runs: [
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }, { status: 'pass' }, { status: 'pass' },
                    { status: 'pass' }, { status: 'pass' }
                ]
            }
        ]
    }
];

const StatusBadge: React.FC<{ status: 'pass' | 'fail' | 'skip' }> = ({ status }) => {
    const colors = {
        pass: 'text-green-500',
        fail: 'text-red-500',
        skip: 'text-orange-400'
    };

    const labels = {
        pass: 'Pass',
        fail: 'Fail',
        skip: 'Skip'
    };

    return (
        <span className={`${colors[status]} font-medium text-sm`}>
            {labels[status]}
        </span>
    );
};

const calculatePassRate = (runs: JobRun[]): string => {
    const validRuns = runs.filter(r => r.status !== 'skip');
    if (validRuns.length === 0) return '0.00%';
    const passes = validRuns.filter(r => r.status === 'pass').length;
    return ((passes / validRuns.length) * 100).toFixed(2) + '%';
};

const WorkflowDashboard: React.FC = () => {
    const [selectedWorkflow, setSelectedWorkflow] = useState<string>(mockWorkflows[0].name);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const currentWorkflow = useMemo(() => {
        return mockWorkflows.find(w => w.name === selectedWorkflow) || mockWorkflows[0];
    }, [selectedWorkflow]);

    const filteredJobs = useMemo(() => {
        return currentWorkflow.jobs.filter(job =>
            job.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [currentWorkflow, searchQuery]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-4">Workflow Dashboard</h1>

                {/* Controls */}
                <div className="flex flex-wrap gap-4 items-center mb-4">
                    <div className="flex items-center gap-2">
                        <label className="text-gray-300 font-medium">Select Workflow:</label>
                        <select
                            value={selectedWorkflow}
                            onChange={(e) => setSelectedWorkflow(e.target.value)}
                            className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        >
                            {mockWorkflows.map(workflow => (
                                <option key={workflow.name} value={workflow.name}>
                                    {workflow.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-gray-300 font-medium">Search Jobs:</label>
                        <input
                            type="text"
                            placeholder="Search by job name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="text-left px-4 py-3 text-gray-300 font-semibold">Job Name</th>
                            <th className="text-left px-4 py-3 text-gray-300 font-semibold w-28">Pass Rate</th>
                            <th className="text-left px-4 py-3 text-gray-300 font-semibold">Last 10 Runs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.map((job, index) => (
                            <tr
                                key={job.name}
                                className={`border-t border-gray-700 hover:bg-gray-750 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-850'
                                    }`}
                            >
                                <td className="px-4 py-3">
                                    <a
                                        href={`https://github.com/urunc-dev/urunc/actions`}
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
                                    <div className="flex gap-1">
                                        {job.runs.map((run, runIndex) => (
                                            <StatusBadge key={runIndex} status={run.status} />
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-gray-400 text-sm">Total Jobs</div>
                    <div className="text-2xl font-bold text-white">{currentWorkflow.jobs.length}</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-gray-400 text-sm">Passing Jobs</div>
                    <div className="text-2xl font-bold text-green-500">
                        {currentWorkflow.jobs.filter(j => {
                            const validRuns = j.runs.filter(r => r.status !== 'skip');
                            return validRuns.length > 0 && validRuns.every(r => r.status === 'pass');
                        }).length}
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-gray-400 text-sm">Failing Jobs</div>
                    <div className="text-2xl font-bold text-red-500">
                        {currentWorkflow.jobs.filter(j => j.runs.some(r => r.status === 'fail')).length}
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-gray-400 text-sm">Skipped Jobs</div>
                    <div className="text-2xl font-bold text-orange-400">
                        {currentWorkflow.jobs.filter(j => j.runs.every(r => r.status === 'skip')).length}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-gray-500 text-sm">
                <p>Data fetched from GitHub Actions API • Last updated: {new Date().toLocaleString()}</p>
                <p className="mt-1">
                    <a
                        href="https://github.com/urunc-dev/urunc/actions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        View all workflows on GitHub →
                    </a>
                </p>
            </div>
        </div>
    );
};

export default WorkflowDashboard;
