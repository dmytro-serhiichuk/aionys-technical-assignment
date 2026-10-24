const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5074/";

type ProblemDetails = {
    code: string;
    title?: string;
    traceId?: string;
    errors?: Record<string, string[]>;
};

export class ApiError extends Error {
    public status: number;
    public code: string;
    public traceId?: string;
    public errors?: Record<string, string[]>;      

    constructor(
        status: number,
        problem?: ProblemDetails
    ) {
        super(problem?.title ?? `API request failed: ${status}`);
        this.status = status;
        this.code = problem?.code ?? "UNKNOWN_ERROR";
        this.traceId = problem?.traceId;
        this.errors = problem?.errors;
    }
}

export default async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = new URL(endpoint.replace(/^\//, ""), API_URL);

    try {
        const response = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options?.headers
            },
            signal: AbortSignal.timeout(5000)
        });

        const text = await response.text();

        let body: unknown;

        if (text) {
            const contentType = response.headers.get("content-type");

            if (contentType?.includes("json")) {
                try {
                    body = JSON.parse(text);
                } catch {
                    body = undefined;
                }
            }
        }

        if (!response.ok) {
            throw new ApiError(response.status, body as ProblemDetails | undefined);
        }

        return body as T;
    } catch (error) {
        if (error instanceof DOMException && error.name === "TimeoutError") {
            throw new Error("Server takes too long to respond");
        }
        if (error instanceof ApiError) {
            throw error;
        }
        throw new Error("Server is not responding", {
            cause: error
        });
    }
}