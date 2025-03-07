import { useState } from "react";

interface PostRequestState {
    loading: boolean;
    error: string;
}

export const usePostRequest = () => {
    const [state, setState] = useState<PostRequestState>({
        loading: false,
        error: '',
    });

    const httpPost = async (url: string, data: any) => {
        setState({ loading: true, error: '' });
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setState({ loading: false, error: '' });
            return result;
        } catch (error) {
            setState({ loading: false, error: (error as Error).message });
            return null;
        }
    };

    return { ...state, httpPost };
};
