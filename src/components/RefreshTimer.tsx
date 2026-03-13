'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function RefreshTimer({ interval = 60000 }: { interval?: number }) {
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            router.refresh(); // Isso força o Next a rodar o Server Component de novo
        }, interval);

        return () => clearInterval(timer);
    }, [router, interval]);

    return null; // Não renderiza nada visualmente
}
