"use client";

import { useEffect, useState } from "react";

export default function useDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/dashboard")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            });
    }, []);

    return { data, loading };
}