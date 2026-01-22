import axios from 'axios';
import { GitHubWorkflow, GitHubRepository } from '../types/github';

export class GitHubService {
    private readonly baseUrl: string;
    private readonly token: string;

    constructor(token: string) {
        this.baseUrl = 'https://api.github.com';
        this.token = token;
    }

    private async request<T>(url: string): Promise<T> {
        const response = await axios.get<T>(url, {
            headers: {
                Authorization: `token ${this.token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        return response.data;
    }

    public async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
        const url = `${this.baseUrl}/repos/${owner}/${repo}`;
        return this.request<GitHubRepository>(url);
    }

    public async getWorkflows(owner: string, repo: string): Promise<GitHubWorkflow[]> {
        const url = `${this.baseUrl}/repos/${owner}/${repo}/actions/workflows`;
        return this.request<GitHubWorkflow[]>(url);
    }

    public async getWorkflowRuns(owner: string, repo: string, workflowId: string): Promise<any> {
        const url = `${this.baseUrl}/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`;
        return this.request<any>(url);
    }
}